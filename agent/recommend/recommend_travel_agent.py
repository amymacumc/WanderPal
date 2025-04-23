# collect_info_agent.py

import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_core.models import UserMessage
from autogen_agentchat.base import TaskResult
from .prompt_utils import build_recommend_system, build_recommend_prompt
from models.user_info import UserInfo
from models.recommend_travels import RecommendTravels
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
            model_client_stream=False,
            output_content_type=RecommendTravels,
        )

    async def close(self):
        await self.model_client.close()

    async def recommend(self, user_info: UserInfo):
        result = await self.recommend_agent.run(task=build_recommend_prompt(user_info))
        return result.messages[-1].content

