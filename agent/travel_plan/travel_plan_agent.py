# collect_info_agent.py

import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_core.models import UserMessage
from autogen_agentchat.base import TaskResult
from models.user_info import UserInfo, RecommendTravels
from autogen_agentchat.ui import Console

class RecommendTravelAgent:
    def __init__(self, api_key: str, model_name: str = "gpt-4o-mini"):
        self.model_client = OpenAIChatCompletionClient(
            # base_url="https://api.siliconflow.cn/v1",
            model=model_name,
            api_key=api_key,
            model_info={
                "vision": False,
                "function_calling": True,
                "json_output": True,
                "family": "unknown",
                "structured_output": True,
            },
        )
        self.recommend_agent = AssistantAgent(
            name="recommend_agent",
            model_client=self.model_client,
            system_message=(build_recommend_system()),
            model_client_stream=True,
            output_content_type=RecommendTravels,
        )

    async def close(self):
        await self.model_client.close()

    async def recommend(self, user_info: UserInfo):
        await Console(self.recommend_agent.run_stream(task=build_recommend_prompt(user_info)))



async def main():
    # 初始化 Agent
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


# 启动主函数
if __name__ == "__main__":
    asyncio.run(main())