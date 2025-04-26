import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.tools.mcp import StdioServerParams, mcp_server_tools
from model_output.daily_plan import DailyPlans, Detail
from autogen_core.models import UserMessage



async def main() -> None:
    # 初始化模型客户端
    model_client = OpenAIChatCompletionClient(
        # base_url="https://api.siliconflow.cn/v1",
        model="gpt-4o-mini",
        model_info={
            "vision": False,
            "function_calling": True,
            "structured_output": True,
            "json_output": True,
            "family": "unknown"
        },
    )


    messages = [
        UserMessage(content="今天的北京的天气怎么样?", source="user"),
    ]
    # # 启动 MCP 工具服务器
    fetch_mcp_server = StdioServerParams(
        command="py",
        args=["C:\\Users\\v-huyon\\Data\\Weather-MCP-ClaudeDesktop\\main.py"]
    )
    tools = await mcp_server_tools(fetch_mcp_server)

    response = await model_client.create(messages=messages, extra_create_args={"response_format": Detail}, tools=tools)
    print(response.content)
                                   
    await model_client.close()


if __name__ == "__main__":
    asyncio.run(main())