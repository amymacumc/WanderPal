import asyncio
import json
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.tools.mcp import mcp_server_tools, SseServerParams, SseMcpToolAdapter
from travel_plan.prompt_utils import build_travel_plan_prompt
from model_output.daily_plan import DailyPlans
from autogen_core.models import UserMessage

async def get_plan_detail(daily_plan, api_key, gaode_mcp_key, model) -> None:
    model_client = OpenAIChatCompletionClient(
        api_key=api_key,
        model=model,
        model_info={
            "vision": False,
            "function_calling": True,
            "structured_output": True,
            "json_output": True,
            "family": "unknown"
        },
        timeout=300
    )

    url = 'https://mcp.amap.com/sse?key=' + gaode_mcp_key
    server_params = SseServerParams(
        url=url,
        headers={"Content-Type": "application/json"},
        timeout=300,  # Connection timeout in seconds
    )

    tools = await mcp_server_tools(server_params)


    agent = AssistantAgent(
        name="amap_assistant",
        model_client=model_client,
        tools=tools,
        reflect_on_tool_use=True,
        model_client_stream=True,   
    )
    
    result = await agent.run(task=build_travel_plan_prompt(daily_plan))

    extract_response = await model_client.create(
        [UserMessage(content=result.messages[-1].content, source="user")],
        json_output=DailyPlans
    )
    res = DailyPlans.parse_raw(extract_response.content)  
    
    await model_client.close()

    return res
