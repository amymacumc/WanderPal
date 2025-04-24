import asyncio
import json
import os
import uvicorn
from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from recommend.recommend_travel_agent import RecommendTravelAgent
from collect_info.collect_info_agent_wrapper import CollectionInfoAgentWrapper
from collect_info.prompt_utils import build_greet_prompt
from models.user import User
from models.user_info import UserInfo

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

users = {} 
chat_history = {}
user_agents = {}

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
    if not user_id:
        return JSONResponse(response_error("user_id is required"))
    
    if user_id not in users:
        return JSONResponse(response_error("User not found"))
    
    return JSONResponse(response_success(data={"user": users[user_id].dict()}))

@app.post("/history")
async def get_history(request: Request):
    user_id = request.cookies.get("user_id")
    if not user_id:
        return JSONResponse(response_error("user_id is required"))

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
    if not user_id:
        return JSONResponse(response_error("user_id is required"))

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
            while reply:
                full_reply += reply
                yield json.dumps(response_success(data={"role": "assistant", "type": "chunk", "content": reply}), ensure_ascii=False) + "\n"
                await asyncio.sleep(0)
                reply = await agent.send("")
                if reply == None:
                    break
                elif isinstance(reply, UserInfo):
                    yield json.dumps(response_success(data={"role": "assistant", "type": "message", "content": "感谢您提供的信息！我们已经整理好了您的资料，现在正在为您精心设计一个专属的旅行计划。请稍等片刻，我们会根据您的兴趣和需求，推荐一条完美的旅行路线！"}), ensure_ascii=False) + "\n"
                    

        except Exception as e:
            yield json.dumps(response_error(f"Streaming error: {str(e)}")) + "\n"

        chat_history[user_id].append({"role": "assistant", "content": full_reply})

    return StreamingResponse(event_stream(), media_type="application/json")

async def main():
    agent = RecommendTravelAgent(api_key="")

    # 示例用户信息（你可以改成动态传参或用户输入）
    user_info = UserInfo(
        available_time="后天出发，大概4天时间",
        destination="成都",
        budget="5000元以内",
        travel_purpose="自然景观、拍照出片",
        intensity="佛系出行，睡到自然醒",
        mood="放松解压",
        other="不想安排太紧凑，最好有时间喝咖啡逛小店"
    )

    await agent.recommend(user_info=user_info)


# # 启动主函数
# if __name__ == "__main__":
#     asyncio.run(main())

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)