from typing import List

def build_mcp_prompt(daily_plan: List[List[str]]) -> str:
    return f"""
你是一位专业的成都旅游规划助手。请根据以下每日景点信息，为用户提供一个详细的成都三天两夜旅游路线建议，并以结构化 JSON 输出。

每日景点安排如下：
{{
{chr(10).join([f"  第{i+1}天: {day}" for i, day in enumerate(daily_plan)])}
}}

请为每一天设计合理的游玩顺序、交通方式（步行/打车/地铁）、预计所需时间，并在有必要时推荐附近美食或休息点。

请严格输出以下格式的 JSON 数据：

```json
{{
  "daily_plans": [
    {{
      "activities": [
        {{
          "name": "武侯祠",
          "description": "成都著名的三国历史遗迹，纪念诸葛亮。",
          "food_recommendations": ["武侯祠担担面", "锦里小吃街"],
          "latitude": 30.6412,
          "longitude": 104.0431
        }},
        {{
          "name": "锦里古街",
          "description": "仿古风格的文化街区，适合购物和品尝小吃。",
          "food_recommendations": ["三大炮", "龙抄手"],
          "latitude": 30.6404,
          "longitude": 104.0438
        }}
      ],
      "routes": [
        {{
          "way": "步行",
          "distance": "0.5km",
          "time": "约8分钟",
          "from_name": "武侯祠",
          "to_name": "锦里古街"
        }}
      ],
      "precautions": [
        "武侯祠早上游客较多，建议早点出发。",
        "锦里古街可扫码租用讲解器。"
      ]
    }}
  ]
}}
```
"""