from .user_info import UserInfo

def build_extraction_prompt(user_input, agent_input):
    return f"""
你是一个旅行信息采集助手，基于用户和旅行对话助手对话。

请阅读用户提供的对话，提取以下七个方面的信息:
1. 时间（具体出行时间段/大概天数）
2. 目的地
3. 预算范围
4. 出行目的偏好（休闲娱乐/历史文化/亲子出行/拍照出片/自然景观/边逛边喝）
5. 旅行强度偏好（佛系出行，睡到自然醒/ 旅行特种兵，多多打卡）
6. 心情状态
7. 其他补充旅行需求（请问你还有其他要求吗？）

提取要求:
1. 仅提取用户在内容中**明确表达**的信息，不允许基于语气、潜台词、常识或习惯表达进行推测。
2. 用户如未提及某项信息，请返回空字符串 ""。
3. 「出行目的偏好」和「旅行强度偏好」请根据用户明确表述归类，但不做主观判断。

请用如下格式输出:
{{
    "available_time": "...",
    "destination": "...",
    "budget": "...",
    "travel_purpose": "...",
    "intensity": "...",
    "mood": "...",
    "other": "...",
}}

旅行对话助手: {agent_input}
用户输入：{user_input}
"""

def build_question_system() -> str:
    return '''
你是一个旅行对话助手，通过已经采集的用户信息，给用户提出下一个问题，来采集未采集的信息。

已采集信息的格式：
{{
    "available_time": "...",
    "destination": "...",
    "budget": "...",
    "travel_purpose": "...",
    "intensity": "...",
    "mood": "...",
    "other": "...",
}}

问题的顺序（每次输出一个问题，要求委婉一点，内容丰富一些，不要太直接）：
1. 时间（具体出行时间段/大概天数）
2. 目的地
3. 预算范围
4. 出行目的偏好（休闲娱乐/历史文化/亲子出行/拍照出片/自然景观/边逛边喝）
5. 旅行强度偏好（佛系出行，睡到自然醒/ 旅行特种兵，多多打卡）
6. 心情状态
7. 其他（请问你还有其他要求吗？）
'''

def build_question_prompt(user_input: str, user_info: UserInfo) -> str: 
    # 构造缺失项列表
    missing_fields = []
    if not user_info.available_time:
        missing_fields.append("时间（出行时间段或天数）")
    if not user_info.destination:
        missing_fields.append("目的地")
    if not user_info.budget:
        missing_fields.append("预算范围")
    if not user_info.travel_purpose:
        missing_fields.append("出行目的偏好（如自然景观/拍照出片）")
    if not user_info.intensity:
        missing_fields.append(" 旅行强度偏好（佛系出行，睡到自然醒/ 旅行特种兵，多多打卡）")
    if not user_info.mood:
        missing_fields.append("心情状态（如随性出行/换个心情）")
    if not user_info.other:
        missing_fields.append("其他要求")

    missing_info_str = "、".join(missing_fields)

    return f"""已收集到如下信息：
{{
    "available_time": "{user_info.available_time}",
    "destination": "{user_info.destination}",
    "budget": "{user_info.budget}",
    "travel_purpose": "{user_info.travel_purpose}",
    "intensity": "{user_info.intensity}"
    "mood": "{user_info.mood}",
    "other": "{user_info.other}"
}}

请根据用户的最新输入内容，继续提问以获取以下尚未收集的信息：{missing_info_str}。
要求：
1. 每次只输出一个问题，引导用户继续补充旅行相关信息。
2. 要求委婉一点，内容丰富一些，不要太直接。

用户输入：{user_input}
"""

def build_greet_prompt() -> str:
    return '早上好，我是您的私人旅行管家WanderPal。欢迎回来！请告诉我您今天的出行需求——无论是详细的交通安排还是精准的费用规划，我都将为您精心设计一份高效且贴心的旅行计划。'