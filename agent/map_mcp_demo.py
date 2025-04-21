import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.tools.mcp import StdioServerParams, mcp_server_tools
from travel_plan.prompt_utils import build_mcp_prompt
from model_output.daily_plan import DailyPlans

async def main() -> None:
    plan = [
        ["武侯祠", "锦里古街", "宽窄巷子", "太古里"],
        ["成都大熊猫基地", "昭觉寺", "东郊记忆"],
        ["黄龙溪古镇", "文殊院"]
    ]

    user_input = build_mcp_prompt(plan)
    model_client = OpenAIChatCompletionClient(
        base_url="https://api.siliconflow.cn/v1",
        api_key="",
        model="Qwen/Qwen2.5-72B-Instruct-128K",
        model_info={
            "vision": False,
            "function_calling": True,
            "structured_output": True,
            "json_output": True,
            "family": "unknown"
        },
        timeout=1000
    )

    fetch_mcp_server = StdioServerParams(
        command="npx",
        args=["-y", "@amap/amap-maps-mcp-server"],
        env={
            "AMAP_MAPS_API_KEY": "78ff14f1339197bf2657158ffe706377"
        }
    )

    tools = await mcp_server_tools(fetch_mcp_server)

    # 构建地图 Agent
    agent = AssistantAgent(
        name="amap_assistant",
        model_client=model_client,
        tools=tools,
        system_message="""You are a helpful map assistant powered by AMap. You can:
        1. Search places (POI) in cities
        2. Plan routes from A to B
        3. Do geocoding and reverse geocoding
        """,
        reflect_on_tool_use=True,
        model_client_stream=True,
        # output_content_type=DailyPlans,
    )
    
    await Console(agent.run_stream(task=build_mcp_prompt(plan)))
        
    await model_client.close()

if __name__ == "__main__":
    asyncio.run(main())