import asyncio
import json
import os
import uvicorn
from fastapi import FastAPI, Request, Response
from fastapi.responses import StreamingResponse, JSONResponse
from dotenv import load_dotenv
from collect_info.collect_info_agent_wrapper import CollectionInfoAgentWrapper
from collect_info.prompt_utils import build_greet_prompt
from models.user import User

load_dotenv()
app = FastAPI()

API_KEY = os.getenv("API_KEY")
MODEL = os.getenv("MODEL")

chat_history = {}
user_agents = {}
users = {} 

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

@app.post("/history")
async def get_history(request: Request):
    body = await request.json()
    user_id = body.get("user_id")
    if not user_id:
        return JSONResponse(response_error("user_id is required", code=1))

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
    body = await request.json()
    user_id = body.get("user_id")
    message = body.get("message")

    if not user_id:
        return JSONResponse(response_error(code=1, message="user_id is required"))

    if user_id not in chat_history:
        chat_history[user_id] = [{
            "role": "assistant",
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
                yield json.dumps(response_success(data={"chunk": reply}), ensure_ascii=False) + "\n"
                await asyncio.sleep(0)
                reply = await agent.send("")
                if reply == None:
                    break
        except Exception as e:
            yield json.dumps(response_error(f"Streaming error: {str(e)}")) + "\n"

        chat_history[user_id].append({"role": "assistant", "content": full_reply})

    return StreamingResponse(event_stream(), media_type="application/json")

@app.post("/user/create")
async def create_user(user: User, response: Response):
    if user.user_id in users:
        return JSONResponse(response_error("User ID already exists"))
    users[user.user_id] = user

      # 设置 cookie：user_id，有效期7天（单位秒）
    response.set_cookie(key="user_id", value=user.user_id, max_age=60 * 60 * 24 * 7)

    return JSONResponse(response_success(data={"user": user.dict()}))

@app.get("/user/{user_id}")
async def get_user(user_id: str):
    if user_id not in users:
        return JSONResponse(response_error("User not found"))
    return JSONResponse(response_success(data={"user": users[user_id].dict()}))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)