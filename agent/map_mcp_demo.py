import asyncio
import json
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.tools.mcp import StdioServerParams, mcp_server_tools, SseServerParams, SseMcpToolAdapter
from travel_plan.prompt_utils import build_travel_plan_prompt
from model_output.daily_plan import DailyPlans
from autogen_core.models import UserMessage

async def main() -> None:
    plan = [
        ["武侯祠", "锦里古街", "宽窄巷子", "太古里"],
        ["成都大熊猫基地", "昭觉寺", "东郊记忆"],
        ["黄龙溪古镇", "文殊院"]
    ]

    model_client = OpenAIChatCompletionClient(
        api_key="",
        model="gpt-4o-mini",
        model_info={
            "vision": False,
            "function_calling": True,
            "structured_output": True,
            "json_output": True,
            "family": "unknown"
        },
        timeout=1000
    )


    server_params = SseServerParams(
        url="https://mcp.amap.com/sse?key=",
        headers={"Content-Type": "application/json"},
        timeout=30,  # Connection timeout in seconds
    )

    tools = await mcp_server_tools(server_params)


    # extract_response = await model_client.create(
    #     [UserMessage(content=build_travel_plan_prompt(plan), source="user")],
    #     tools=tools,
    #     json_output=DailyPlans
    # )

    # print(extract_response)

    agent = AssistantAgent(
        name="amap_assistant",
        model_client=model_client,
        tools=tools,
        reflect_on_tool_use=True,
        model_client_stream=True,
    )
    
    result = await agent.run(task=build_travel_plan_prompt(plan))

    extract_response = await model_client.create(
        [UserMessage(content=result.messages[-1].content, source="user")],
        json_output=DailyPlans
    )
    print(extract_response.content)
        
    await model_client.close()

if __name__ == "__main__":
    asyncio.run(main())