import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.tools.mcp import StdioServerParams, mcp_server_tools


async def main() -> None:
    # 初始化模型客户端
    model_client = OpenAIChatCompletionClient(
        base_url="https://api.siliconflow.cn/v1",
        model="deepseek-ai/DeepSeek-V3",
        api_key="sk-wkpqphmwkojyvjdnokoaqvruujfitmzlnmwvsvxcwdinhbrh",
        model_info={
            "vision": False,
            "function_calling": True,
            "json_output": True,
            "family": "unknown",
        },
    )

    # 启动 MCP 工具服务器
    fetch_mcp_server = StdioServerParams(
        command="py",
        args=["-3.13", "C:\\Users\\v-huyon\\Data\\Weather-MCP-ClaudeDesktop\\main.py"]
    )
    tools = await mcp_server_tools(fetch_mcp_server)

    # 定义 agent
    agent = AssistantAgent(
        name="weather_assistant",
        model_client=model_client,
        tools=tools,
        system_message="""You are a helpful weather assistant. You can:
        1. Get current weather conditions
        2. Provide weather forecasts
        3. Check air quality
        Please provide clear and concise weather information when asked.""",
        reflect_on_tool_use=True,
        model_client_stream=True,
    )

    print("Weather Assistant Ready! You can ask about:")
    print("- Current weather in any location")
    print("- Weather forecast (up to 5 days)")
    print("- Air quality information")
    print("Type 'quit' to exit\n")
    
    while True:
        user_input = input("\nWhat would you like to know about the weather? ")
        if user_input.lower() == 'quit':
            break
        await Console(agent.run_stream(task=user_input))
    
    await model_client.close()


if __name__ == "__main__":
    asyncio.run(main())