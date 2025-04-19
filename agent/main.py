import asyncio
import json
import os
import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse, JSONResponse
from dotenv import load_dotenv
from collect_info.collect_info_agent_wrapper import CollectionInfoAgentWrapper
from collect_info.prompt_utils import build_greet_prompt
load_dotenv()
app = FastAPI()

API_KEY = os.getenv("API_KEY")
MODEL = os.getenv("MODEL")

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

@app.post("/history")
async def get_history(request: Request):
    body = await request.json()
    username = body.get("username")
    if not username:
        return JSONResponse(response_error("Username is required", code=1), status_code=400)

    if username not in chat_history:
        chat_history[username] = [{
            "role": "assistant",
            "content": build_greet_prompt()
        }]
    history = chat_history.get(username)
    return JSONResponse(response_success(data={"history": history}),)

@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    username = body.get("username")
    message = body.get("message")

    if not username:
        return JSONResponse(response_error(code=1, message="Username is required"), status_code=400)

    if username not in chat_history:
        chat_history[username] = [{
            "role": "assistant",
            "content": build_greet_prompt()
        }]

    if username not in user_agents:
        agent = CollectionInfoAgentWrapper(API_KEY, MODEL)
        await agent.start()
        user_agents[username] = agent

    chat_history[username].append({"role": "user", "content": message})

    async def event_stream():
        full_reply = ""
        try:
            agent = user_agents[username]
            reply = await agent.send(message)
            while reply:
                full_reply += reply
                yield json.dumps(response_success(code=0, data={"chunk": reply}), ensure_ascii=False) + "\n"
                await asyncio.sleep(0)
                reply = await agent.send("")
                if reply == None:
                    break
        except Exception as e:
            yield json.dumps(response_error(f"Streaming error: {str(e)}", code=1)) + "\n"

        chat_history[username].append({"role": "assistant", "content": full_reply})

    return StreamingResponse(event_stream(), media_type="application/json")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)