# collect_info_agent.py

import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
from models.user_info import UserInfo
from .prompt_utils import build_extraction_prompt, build_greet_prompt, build_question_prompt, build_question_system
from autogen_core.models import UserMessage
from autogen_agentchat.base import TaskResult

class CollectionInfoAgent:
    def __init__(self, api_key: str, model_name: str = "gpt-4o-mini"):
        self.model_client = OpenAIChatCompletionClient(
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
        self.info_agent = AssistantAgent(
            name="question_agent",
            model_client=self.model_client,
            system_message=(build_question_system()),
            model_client_stream=True,
        )

    async def close(self):
        await self.model_client.close()

    async def stream_collect_info(self):
        agent_input = build_greet_prompt();
        
        user_info = UserInfo(
            available_time="", destination="", budget="", travel_purpose="", intensity="", mood="", other=""
        )

        user_input = yield agent_input


        while True:
            if not user_input:
                user_input = yield
                continue

            user_message = build_extraction_prompt(user_input, agent_input)
            extract_response = await self.model_client.create(
                [UserMessage(content=user_message, source="user")],
                json_output=UserInfo
            )
            latest_info = UserInfo.parse_raw(extract_response.content)
            user_info.update(latest_info)

            print('当前收集的信息：', user_info)

            if user_info.is_info_complete():
                await self.close()
                yield user_info
            else:
                agent_input = ''
                async for message in self.info_agent.run_stream(task=build_question_prompt(user_input, user_info)):
                    if isinstance(message, TaskResult):
                        user_input = yield None
                        break
                    else: 
                        if message.type == 'ModelClientStreamingChunkEvent':
                            agent_input += message.content
                            yield message.content
