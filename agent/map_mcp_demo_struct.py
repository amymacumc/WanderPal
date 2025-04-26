import asyncio
import json
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.tools.mcp import StdioServerParams, mcp_server_tools, SseServerParams, SseMcpToolAdapter
from travel_plan.prompt_utils import build_travel_plan_prompt
from model_output.daily_plan import DailyPlans, Detail
from autogen_core.models import UserMessage

async def main() -> None:
    model_client = OpenAIChatCompletionClient(
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


    # server_params = SseServerParams(
    #     url="https://mcp.amap.com/sse?key=78ff14f1339197bf2657158ffe706377",
    #     timeout=30,
    # )

    # tools = await mcp_server_tools(server_params)

    fetch_mcp_server = StdioServerParams(
        command="py",
        args=["-3.13", "C:\\Users\\v-huyon\\Data\\Weather-MCP-ClaudeDesktop\\main.py"]
    )
    tools = await mcp_server_tools(fetch_mcp_server)


    agent = AssistantAgent(
        name="amap_assistant",
        model_client=model_client,
        tools=tools,
        reflect_on_tool_use=True,
    )
    
    result = await agent.run(task='告诉北京今天的天气')
    output_json = json.loads(result.messages[-1].content)  
        
    await model_client.close()

if __name__ == "__main__":
    asyncio.run(main())