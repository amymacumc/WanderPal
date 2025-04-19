from .collect_info_agent import CollectionInfoAgent

class CollectionInfoAgentWrapper:
    def __init__(self, api_key: str, model_name: str = "gpt-4o-mini"):
        self.agent = CollectionInfoAgent(api_key, model_name)
        self.generator = None

    async def start(self):
        self.generator = self.agent.stream_collect_info()
        return await self.generator.asend(None) 

    async def send(self, user_input: str):
        try:
            return await self.generator.asend(user_input)
        except StopAsyncIteration:
            return None
