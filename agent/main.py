import asyncio
import json
import os
import sys
from uuid import uuid4
import uuid
import aiohttp
import uvicorn
from fastapi import FastAPI, Request, Response
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from recommend.recommend_travel_agent import RecommendTravelAgent
from collect_info.collect_info_agent_wrapper import CollectionInfoAgentWrapper
from collect_info.prompt_utils import build_greet_prompt
from models.user import User
from models.user_info import UserInfo
from fastapi.middleware.cors import CORSMiddleware
from utils.uitls import get_first_photo_url_async
from travel_plan.travel_plan_agent import get_plan_detail
from map_mcp_demo import main

load_dotenv()
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

API_KEY = os.getenv("API_KEY")
MODEL = os.getenv("MODEL")
GAODE_API_KEY = os.getenv("GAODE_API_KEY")
AMAP_MAPS_API_KEY = os.getenv("AMAP_MAPS_API_KEY")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  # 允许 POST
    allow_headers=["*"],  # 允许 Content-Type 等请求头
)

user_agents = {}
users = {} 
chat_history = {}
tarvel_plans = {}
travel_plan_details = {}
user_map_travel = {}

def response_success(message="Success", code=0, data=None):
    return {
        "code": code,
        "message": message,
        "data": data
    }

def response_error(message="Error", code=1, data=None):
    return {
        "code": code,
        "message": message,
        "data": data
    }

@app.post("/user/create")
async def create_user(user: User, response: Response):
    if user.user_id in users:
        return JSONResponse(response_error("User ID already exists"))

    users[user.user_id] = user
    response.set_cookie(key="user_id", value=user.user_id, max_age=60 * 60 * 24 * 7)

    return JSONResponse(response_success(data={"user": user.dict()}), status_code=200, headers=dict(response.headers))

@app.get("/user")
async def get_user(request: Request):
    user_id = request.cookies.get("user_id")
    if not user_id or user_id not in users:
        return JSONResponse(response_error("user_id is required or not found"))
    
    return JSONResponse(response_success(data={"user": users[user_id].dict()}))

@app.post("/history")
async def get_history(request: Request):
    user_id = request.cookies.get("user_id")
    if not user_id or user_id not in users:
        return JSONResponse(response_error("user_id is required or not found"))

    if user_id not in chat_history:
        chat_history[user_id] = [{
            "role": "assistant",
            "type": "message",
            "content": build_greet_prompt()
        }]
    history = chat_history.get(user_id)
    return JSONResponse(response_success(data={"history": history}),)

@app.post("/chat")
async def chat(request: Request):
    user_id = request.cookies.get("user_id")
    if not user_id or user_id not in users:
        return JSONResponse(response_error("user_id is required or not found"))

    body = await request.json()
    message = body.get("message")
    
    if user_id not in chat_history:
        chat_history[user_id] = [{
            "role": "assistant",
            "type": "message",
            "content": build_greet_prompt()
        }]

    if user_id not in user_agents:
        agent = CollectionInfoAgentWrapper(API_KEY, MODEL)
        await agent.start()
        user_agents[user_id] = agent

    chat_history[user_id].append({"role": "user", "type": "message", "content": message})

    async def event_stream():
        full_reply = ""
        try:
            agent = user_agents[user_id]
            reply = await agent.send(message)
            if isinstance(reply, UserInfo):
                chat_history[user_id].append({"role": "user", "type": "message", "content": "感谢您提供的信息！我们已经整理好了您的资料，现在正在为您精心设计一个专属的旅行计划。请稍等片刻，我们会根据您的兴趣和需求，推荐一条完美的旅行路线！"})

                yield json.dumps(response_success(data={"role": "assistant", "type": "message", "content": "感谢您提供的信息！我们已经整理好了您的资料，现在正在为您精心设计一个专属的旅行计划。请稍等片刻，我们会根据您的兴趣和需求，推荐一条完美的旅行路线！"}), ensure_ascii=False) + "\n"
                recommend_agent= RecommendTravelAgent(API_KEY, MODEL)
                recommend_travels = await recommend_agent.recommend(user_info=reply)
                async with aiohttp.ClientSession() as session:
                    tasks = []
                    for travel in recommend_travels.recommend_travels:
                        task = get_first_photo_url_async(session, travel.location, GAODE_API_KEY)
                        tasks.append(task)

                    results = await asyncio.gather(*tasks)

                    for travel, image_url in zip(recommend_travels.recommend_travels, results):
                        travel.id = str(uuid4())
                        travel.image = image_url
                        tarvel_plans[travel.id] = travel
                chat_history[user_id].append({"role": "user", "type": "message", "content": recommend_travels.dict()})
                yield json.dumps(response_success(data={"role": "assistant", "type": "plan", "content": recommend_travels.dict()}), ensure_ascii=False) + "\n"
                recommend_agent.close()
                if user_id in user_agents:
                    user_agents[user_id].close()
                    del user_agents[user_id]
            else:
                while reply:
                    full_reply += reply
                    yield json.dumps(response_success(data={"role": "assistant", "type": "chunk", "content": reply}), ensure_ascii=False) + "\n"
                    await asyncio.sleep(0)
                    reply = await agent.send("")
                    if reply == None:
                        break
                print('reply', full_reply)
        except Exception as e:
            yield json.dumps(response_error(f"Streaming error: {str(e)}")) + "\n"

        chat_history[user_id].append({"role": "assistant", "content": full_reply})

    return StreamingResponse(event_stream(), media_type="application/json")

@app.post("/plan/detail")
async def detail(request: Request):
    user_id = request.cookies.get("user_id")
    if not user_id or user_id not in users:
        return JSONResponse(response_error("user_id is required or not found"))

    body = await request.json()
    travel_plan_id = body.get("travel_plan_id")

    if not travel_plan_id or travel_plan_id not in tarvel_plans:
        return JSONResponse(response_error("travel_plan_id is required or not found"))
    
    if travel_plan_id in travel_plan_details:
        return JSONResponse(response_success(data={
            "travel_plan" : travel_plan_details[travel_plan_id]
        }))

    try:
        travel_plan = tarvel_plans[travel_plan_id]

        travel_plan_detail = await get_plan_detail(travel_plan.daily_plan, API_KEY, AMAP_MAPS_API_KEY, MODEL)
        travel_plan_detail['id'] = travel_plan.id
        travel_plan_detail['title'] = travel_plan.title

        async with aiohttp.ClientSession() as session:
            for daily_plan in travel_plan_detail['daily_plans']:
                tasks = []
                for activity in daily_plan['activities']:
                    task = get_first_photo_url_async(session, activity['name'], GAODE_API_KEY)
                    tasks.append(task)
                results = await asyncio.gather(*tasks)

                for activity, image_url in zip(daily_plan['activities'], results):
                    activity['iamge'] = image_url
                    activity['id'] = str(uuid.uuid4())


        travel_plan_details[travel_plan_id] = travel_plan_detail
        return JSONResponse(response_success(data={
            "travel_plan" : travel_plan_detail
        }))
    except Exception as e:
        return JSONResponse(response_error("Query failed, please query again"))


@app.post("/plan/save")
async def save(request: Request):
    user_id = request.cookies.get("user_id")
    if not user_id or user_id not in users:
        return JSONResponse(response_error("user_id is required or not found"))
    
    body = await request.json()
    travel_plan_id = body.get("travel_plan_id")
    
    if not travel_plan_id or travel_plan_id not in tarvel_plans:
        return JSONResponse(response_error("travel_plan_id is required or not found"))
    
    if user_id not in user_map_travel:
        user_map_travel[user_id] = []

    if travel_plan_id not in user_map_travel[user_id]:
        user_map_travel[user_id].append(travel_plan_id)
    
    return JSONResponse(response_success("Saved success"))


@app.post("/plan/list")
async def list(request: Request):
    user_id = request.cookies.get("user_id")
    if not user_id or user_id not in users:
        return JSONResponse(response_error("user_id is required or not found"))
    
    if user_id not in user_map_travel:
        return JSONResponse(response_success(data={
            "travel_plans": []
        }))
    else:
        return JSONResponse(response_success(data={
            "travel_plans": [tarvel_plans[pid].dict() for pid in user_map_travel[user_id] if pid in tarvel_plans]
        }))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)