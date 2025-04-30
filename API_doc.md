## 1. Create User

**URL**

`POST /user/create`

**Description**

Create a new user profile.

**Request Example**
```{bash}
curl -i -X POST "http://localhost:8000/user/create" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "张三",
    "gender": "男",
    "age": 25,
    "location": "上海",
    "mbti": "INTJ"
}'
```

**Request Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| name | string | Yes | User name |
| gender | string | Yes | Gender |
| age | int | Yes | Age |
| location | string | Yes | Location |
| mbti | string | Yes | MBTI type |

**Response Example**
```{bash}
{
  "code": 0,
  "message": "Success",
  "data": {
    "user": {
      "user_id": "24f347e9-4335-4d29-a03a-bba9464fbe4f",
      "name": "张三",
      "gender": "男",
      "age": 25,
      "location": "上海",
      "mbti": "INTJ"
    }
  }
}
```
---

## 2. Get User Info

**URL**

`GET /user/{user_id}`

**Description**

Retrieve user information by user ID.

**Request Example**
```{bash}
curl -X GET "http://localhost:8000/user" \
  -b "user_id=24f347e9-4335-4d29-a03a-bba9464fbe4f"
```

**Path Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| user_id | string | Yes | Unique user identifier |

**Response Example**
```{bash}
{
  "code": 0,
  "message": "Success",
  "data": {
    "user": {
      "user_id": "24f347e9-4335-4d29-a03a-bba9464fbe4f",
      "name": "张三",
      "gender": "男",
      "age": 25,
      "location": "上海",
      "mbti": "INTJ"
    }
  }
}
```

---

## 3. Get User History

**URL**

`POST /history`

**Description**

View a user's historical conversation records. Supports two types: plain messages (`message`) and travel plans (`plan`).

**Request Example**
```{bash}
curl -X POST http://localhost:8000/history \
  -H "Content-Type: application/json; charset=utf-8" \
  --data-binary '{"user_id": "f334301d-5cdd-4b48-b28f-02d78cfd3f08"}'
```

**Request Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| user_id | string | Yes | Unique user identifier |

**Response Fields**

The field `history` is a list, each item represents one historical record, with two possible types:

### Type 1: Message (`message`)

| Field | Type | Description |
| --- | --- | --- |
| role | string | "assistant" or "user" |
| type | string | Fixed as `"message"` |
| content | string | Message content |

### Type 2: Travel Plan (`plan`)

| Field | Type | Description |
| --- | --- | --- |
| role | string | "assistant" |
| type | string | Fixed as `"plan"` |
| content | **List**[object] | List of travel plan objects |

**Response Example**
```{bash}
{
  "code": 0,
  "message": "Success",
  "data": {
    "history": [
      {
        "role": "assistant",
        "type": "message",
        "content": "早上好，我是您的私人旅行管家WanderPal。欢迎回来！请告诉我您今天的出行需求——无论是详细的交通安排还是精准的费用规划，我都将为您精心设计一份高效且贴心的旅行计划。"
      },
      {
        "role": "user",
        "type": "message",
        "content": "我想去东京"
      },
      {
        "role": "assistant",
        "content": "听起来东京是个非常迷人的目的地！为了更好地帮助您规划这次旅行，您能否告诉我您大概打算什么时候出发呢？比如具体的时间段或是预期的旅行天数，这样我可以为您提供更精准的建议。"
      },
      {
        "role": "user",
        "type": "message",
        "content": "5月1日-5月4日"
      },
      {
        "role": "assistant",
        "content": "非常感谢您提供的出行时间！东京有许多值得探索的地方和活动。那么，您是否已经有一个大致的预算范围呢？这将有助于我为您推荐合适的活动和住宿选择。"
      },
      {
        "role": "user",
        "type": "message",
        "content": "1W人民币"
      },
      {
        "role": "user",
        "type": "message",
        "content": "美食"
      },
      {
        "role": "assistant",
        "content": ""
      },
      {
        "role": "assistant",
        "content": "感谢您分享了预算信息！东京有着丰富多样的旅游体验，不知道您在这次旅行中，希望自己主要追求哪些目的呢？例如，您是更倾向于欣赏自然景观、拍摄美丽的照片，还是体验历史文化呢？这将帮助我为您定制更符合您期望的行程安排。"
      },
      {
        "role": "user",
        "type": "message",
        "content": "美食"
      },
      {
        "role": "assistant",
        "content": "非常高兴您选择了美食作为本次旅行的主要目的，东京的美食真是令人垂涎欲滴！在安排您的行程时，您更喜欢一种怎样的旅行强度呢？例如，您是喜欢佛系出行，轻松随意，还是希望成为“旅行特种兵”，尽可能多打卡不同的美食和景点呢？这样我可以更好地为您规划您的行程。"
      },
      {
        "role": "user",
        "type": "message",
        "content": "佛系"
      },
      {
        "role": "user",
        "type": "message",
        "content": "放松"
      },
      {
        "role": "assistant",
        "content": ""
      },
      {
        "role": "assistant",
        "content": "谢谢您分享了您的旅行强度偏好！佛系的出行方式将让您更加悠闲地享受东京的美食与风景。那么，想请教一下，您希望在这次旅行中带着怎样的心情状态呢？是想要随性而行，享受每一刻，还是希望能够换个心情，去探索新的体验呢？这样的信息会帮助我为您制定更加贴心的行程建议。"
      },
      {
        "role": "user",
        "type": "message",
        "content": "放松"
      },
      {
        "role": "user",
        "type": "message",
        "content": "暂时没有其他要求"
      },
      {
        "role": "assistant",
        "content": ""
      },
      {
        "role": "assistant",
        "content": "非常感谢您分享了心情状态，放松的心态真是很适合享受东京的旅行体验！在最后一步，我想请问一下，您还有没有其他具体的要求或者想要特别关注的事项呢？比如是否希望有特定的饮食需求、例如素食或过敏食物，或者对住宿、交通有什么偏好？这些信息会让我为您提供更为全面的建议。"
      },
      {
        "role": "user",
        "type": "message",
        "content": "暂时没有其他要求"
      },
      {
        "role": "user",
        "type": "message",
        "content": "感谢您提供的信息！我们已经整理好了您的资料，现在正在为您精心设计一个专属的旅行计划。请稍等片刻，我们会根据您的兴趣和需求，推荐一条完美的旅行路线！"
      },
      {
        "role": "user",
        "type": "message",
        "content": {
          "recommend_travels": [
            {
              "id": "273ca16e-be24-4339-9eb5-7ea1a6a2f314",
              "title": "东京美食之旅",
              "location": "东京",
              "image": "http://aos-cdn-image.amap.com/sns/ugccomment/10ce9db4-4f17-4929-8ea9-a99fcec9e62f.jpg",
              "daily_plan": [
                [
                  "筑地市场",
                  "银座",
                  "浅草寺"
                ],
                [
                  "台场",
                  "丰洲市场",
                  "秋叶原"
                ],
                [
                  "上野公园",
                  "上野动物园",
                  "阿美横町"
                ],
                [
                  "新宿御苑",
                  "代代木公园",
                  "涩谷十字路口"
                ]
              ],
              "estimated_budget": "¥¥¥"
            },
            {
              "id": "763188a9-a1b7-47c4-97f1-077923243ce7",
              "title": "东京文化与美食体验",
              "location": "东京",
              "image": "http://aos-cdn-image.amap.com/sns/ugccomment/10ce9db4-4f17-4929-8ea9-a99fcec9e62f.jpg",
              "daily_plan": [
                [
                  "明治神宫",
                  "表参道",
                  "原宿"
                ],
                [
                  "秋叶原",
                  "御徒町",
                  "上野公园"
                ],
                [
                  "丰洲市场",
                  "台场",
                  "摩天轮"
                ],
                [
                  "新宿御苑",
                  "歌舞伎町",
                  "东京都厅"
                ]
              ],
              "estimated_budget": "¥¥¥"
            },
            {
              "id": "c9cd1c0e-8584-464e-900f-32560a1dead7",
              "title": "轻松愉悦的东京之旅",
              "location": "东京",
              "image": "https://aos-comment.amap.com/B0K2AUU6I6/comment/3E67CF25_5546_48CA_9EE3_CD044B6747C7_L0_001_1500_2000_1731429157534_75241988.jpg",
              "daily_plan": [
                [
                  "皇居",
                  "丸之内",
                  "日比谷公园"
                ],
                [
                  "涉谷区",
                  "原宿",
                  "竹下通"
                ],
                [
                  "筑地市场",
                  "晴空塔",
                  "押上"
                ],
                [
                  "代代木公园",
                  "新宿御苑",
                  "新宿"
                ]
              ],
              "estimated_budget": "¥¥"
            },
            {
              "id": "5791b08f-ec23-427d-8c96-aeef63676358",
              "title": "潮流与美食的东京探秘",
              "location": "东京",
              "image": "",
              "daily_plan": [
                [
                  "田园都市",
                  "涩谷501",
                  "代代木公园"
                ],
                [
                  "新宿",
                  "秋叶原",
                  "景品街"
                ],
                [
                  "丰洲市场",
                  "台场海滨公园",
                  "科学未来馆"
                ],
                [
                  "上野动物园",
                  "阿美横町",
                  "上野公园"
                ]
              ],
              "estimated_budget": "¥¥¥"
            }
          ]
        }
      },
      {
        "role": "assistant",
        "content": ""
      }
    ]
  }
}
```

---

## 4. Chat Endpoint

**URL**

`POST /chat`

**Description**

Send user message and receive model response. Supports three types: `message`, `chunk`, and `plan`.

**Request Example**
```{bash}
curl -X POST http://localhost:8000/chat \
  -b "user_id=24f347e9-4335-4d29-a03a-bba9464fbe4f" \
  -H "Content-Type: application/json; charset=utf-8" \
  --data-binary '{"message": "我想去东京"}'
```

**Request Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| user_id | string | Yes | Unique user identifier |
| message | string | Yes | User input message |

**Response Fields**

### Type 1: Streaming Chunk (`chunk`)

| Field | Type | Description |
| --- | --- | --- |
| role | string | `"assistant"` |
| type | string | `"chunk"` |
| content | string | Text fragment content |

### Type 2: Standard Message (`message`)

| Field | Type | Description |
| --- | --- | --- |
| role | string | `"assistant"` |
| type | string | `"message"` |
| content | string | Full message text |

### Type 3: Travel Plan (`plan`)

| Field | Type | Description |
| --- | --- | --- |
| role | string | `"assistant"` |
| type | string | `"plan"` |
| content | **List**[object] | List of travel plan cards |

**Response Example**
```{bash}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "非常"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "感谢"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "您"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "选择"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "东京"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "作为"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "您的"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "旅行"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "目的"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "地"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "！"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "为了"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "更"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "好"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "地"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "为"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "您"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "策"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "划"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "旅行"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "，我"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "想"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "了解"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "一下"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "您的"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "出"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "行"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "时间"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "安排"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "，"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "您"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "有没有"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "计划"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "在"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "什么"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "时间"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "段"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "出"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "发"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "，"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "或者"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "预"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "期"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "的"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "旅行"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "天"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "数"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "呢"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "？"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "这样"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "我们"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "可以"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "更"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "好"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "地"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "为"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "您"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "安排"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "行"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "程"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "哦"}}
{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "chunk", "content": "！"}}



{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "message", "content": "感谢您提供的信息！我们已经整理好了您的资料，现在正在为您精心设计一个专属的旅行计划。请稍等片刻，我们会根据您的兴趣和需求，推荐一条完美的旅行路线！"}}




{"code": 0, "message": "Success", "data": {"role": "assistant", "type": "plan", "content": {"recommend_travels": [{"id": "047e4b11-7947-4e3c-8964-928d13f1f81c", "title": "东京美食探索游", "location": "东京", "image": "http://aos-cdn-image.amap.com/sns/ugccomment/10ce9db4-4f17-4929-8ea9-a99fcec9e62f.jpg", "daily_plan": [["筑地市场", "银座购物区", "浅草寺"], ["原宿竹下通", "明治神宫", "表参道"], ["秋叶原", "上野公园", "上野动物园"], ["涩谷十字路口", "代代木公园", "东急百货店"]], "estimated_budget": "¥¥¥"}, {"id": "b6036f74-c5c8-4ce9-a738-f051b80165f7", "title": "东京慢食之旅", "location": "东京", "image": "https://aos-comment.amap.com/B0K2AUU6I6/comment/3E67CF25_5546_48CA_9EE3_CD044B6747C7_L0_001_1500_2000_1731429157534_75241988.jpg", "daily_plan": [["秋叶原", "台场海滨公园", "丰洲市场"], ["上野公园", "上野恩赐公园美术馆", "阿美横丁"], ["新宿御苑", "代代木公园", "涩谷站周边"], ["六本木新城", "东京塔", "芝公园"]], "estimated_budget": "¥¥"}, {"id": "0a1da984-ada7-44d3-861e-4ceccf0bc810", "title": "东京经典美食游", "location": "东京", "image": "https://aos-comment.amap.com/B0K2AUU6I6/comment/3E67CF25_5546_48CA_9EE3_CD044B6747C7_L0_001_1500_2000_1731429157534_75241988.jpg", "daily_plan": [["新宿美食街", "浅草雷门", "浅草市场"], ["筑地外市场", "三鹰之森吉卜力美术馆", "国立新美术馆"], ["日比谷公园", "东京地区博物馆", "池袋阳光城"], ["表参道", "青山蓝调", "代官山"]], "estimated_budget": "¥¥¥"}]}}}

```

---

## 5. Get Travel Plan Details

**URL**

`POST /plan/detail`

**Description**

Retrieve full travel plan details by travel plan ID, including daily schedule, routes, reminders, exchange rate, and weather.

**Request Example**
（保持原中文请求示例）

**Request Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| travel_plan_id | string | Yes | Travel plan identifier |

**Response Fields**

| Field | Type | Description |
| --- | --- | --- |
| id | string | Travel plan ID |
| title | string | Plan title |
| daily_plans | list | Daily schedule |
| reminder | list of string | Reminder messages |
| exchange_rate | object | Currency exchange rate info |
| weather | list | Weather info (reserved) |

### `daily_plans` structure

| Field | Type | Description |
| --- | --- | --- |
| activities | list | List of activities |
| routes | list | List of travel routes |

### `activities` structure

| Field | Type | Description |
| --- | --- | --- |
| id | string | Activity ID |
| name | string | Activity name |
| image | string | Image URL |
| description | string | Description |
| food_recommendations | list of string | Suggested foods |
| latitude | float | Latitude |
| longitude | float | Longitude |
| infos | list of string | Additional info |
| tips | list of string | Tips for this activity |

### `routes` structure

| Field | Type | Description |
| --- | --- | --- |
| way | string | Transportation method |
| distance | string | Distance |
| time | string | Duration |
| from_name | string | Start location |
| to_name | string | Destination |

### `exchange_rate` structure

| Field | Type | Description |
| --- | --- | --- |
| OriginalRate | string | Original currency rate |
| TargetRate | string | Target currency rate |

**Response Example**
```{bash}
{
  "code": 0,
  "message": "Success",
  "data": {
    "travel_plan": {
      "id": "5791b08f-ec23-427d-8c96-aeef63676358"，
      "title": "潮流与美食的东京探秘",
      "reminder": [
        "保持通讯畅通：确保手机充满电并下载相关地图应用以便随时导航。",
        "水分补充：旅行中适量喝水，保持身体水分充足，避免疲劳。",
        "注意安全：在人多的地方注意随身物品，尤其是贵重物品。",
        "步行安全：步行时注意交通信号，遵守当地交通规则。",
        "餐饮选择：尽量选择当地人推荐的餐馆，以便体验正宗美食。"
      ],
      "daily_plans": [
        {
          "activities": [
            {
              "name": "田园都市",
              "description": "田园都市是东京的一片绿意盎然的区域，以其舒适的步道和自然景观受到游客喜爱。",
              "food_recommendations": [
                "田园都市咖啡馆",
                "蔬菜餐厅"
              ],
              "latitude": 35.6824,
              "longitude": 139.7045,
              "iamge": "http://store.is.autonavi.com/showpic/46cbb2339379ee0c981ffeb94c25282b",
              "id": "b79d8b32-5f1a-4c5c-b12b-c15227cc1893"
            },
            {
              "name": "涩谷501",
              "description": "涩谷501是一个现代化购物中心，流行时尚与艺术融合的地方。",
              "food_recommendations": [
                "涩谷汉堡",
                "甜品店"
              ],
              "latitude": 35.6585,
              "longitude": 139.7013,
              "iamge": "http://store.is.autonavi.com/showpic/272a3580a5ea55937706ff772ba1e320",
              "id": "bd4fe1bf-b9fd-4f30-9b49-89b0a59f577e"
            },
            {
              "name": "代代木公园",
              "description": "代代木公园是一个宽敞的城市公园，适合休闲和野餐，是东京绿洲之一。",
              "food_recommendations": [
                "公园周围小吃摊",
                "便当店"
              ],
              "latitude": 35.6747,
              "longitude": 139.7035,
              "iamge": "",
              "id": "0b70effd-db5b-461f-b1a0-e809bb3e512d"
            }
          ],
          "routes": [
            {
              "way": "步行",
              "distance": "1.2km",
              "time": "约15分钟",
              "from_name": "田园都市",
              "to_name": "涩谷501"
            },
            {
              "way": "步行",
              "distance": "1.5km",
              "time": "约20分钟",
              "from_name": "涩谷501",
              "to_name": "代代木公园"
            }
          ],
          "precautions": [
            "行程建议：建议早上8点之前出发，避开人流高峰期。",
            "饮食建议：在涩谷选择人气店用餐，可能需要排队，请耐心等候。"
          ]
        },
        {
          "activities": [
            {
              "name": "新宿",
              "description": "新宿是东京最繁华的商业区之一，购物、美食和夜生活应有尽有。",
              "food_recommendations": [
                "新宿拉面",
                "烤肉"
              ],
              "latitude": 35.6955,
              "longitude": 139.7006,
              "iamge": "https://aos-comment.amap.com/B0JR7ZDFJ3/comment/58FAEE64_AD92_4752_8E84_0589B08B1212_L0_001_2000_1500_1742651926138_39297945.jpg",
              "id": "208932ab-67a6-458a-a4a0-50d314d63490"
            },
            {
              "name": "秋叶原",
              "description": "秋叶原是著名的电气街，充满了动漫文化和最新电子产品。",
              "food_recommendations": [
                "主题咖啡厅",
                "特色小吃店"
              ],
              "latitude": 35.6997,
              "longitude": 139.7743,
              "iamge": "https://aos-comment.amap.com/B0I24MDOHN/comment/c59b834df40dcab0744bb9849375d18d_2048_2048_80.jpg",
              "id": "853cc9b9-d0cf-41d1-9006-8bab1a6fa7ab"
            },
            {
              "name": "景品街",
              "description": "景品街是以游乐设施和奖品抽奖而闻名的街区，适合游客游玩。",
              "food_recommendations": [
                "街边小吃",
                "甜点店"
              ],
              "latitude": 35.6909,
              "longitude": 139.7003,
              "iamge": "http://store.is.autonavi.com/showpic/10eb01af2fd301e54e50d42ea636ccef",
              "id": "68ea18bc-30f5-4357-b8ce-94bbdd2df839"
            }
          ],
          "routes": [
            {
              "way": "地铁",
              "distance": "5km",
              "time": "约15分钟",
              "from_name": "新宿",
              "to_name": "秋叶原"
            },
            {
              "way": "步行",
              "distance": "1km",
              "time": "约12分钟",
              "from_name": "秋叶原",
              "to_name": "景品街"
            }
          ],
          "precautions": [
            "购物考虑：事先了解商品的价格，谨防不必要的消费。",
            "时间安排：新宿的景点多，建议给自己足够的时间游览。"
          ]
        },
        {
          "activities": [
            {
              "name": "丰洲市场",
              "description": "丰洲市场是东京的新鲜海鲜市场，享有新的美食和市场体验。",
              "food_recommendations": [
                "鲜鱼饭",
                "海鲜烧烤"
              ],
              "latitude": 35.655,
              "longitude": 139.8107,
              "iamge": "https://aos-comment.amap.com/B02530S0BR/comment/content_media_external_images_media_100001909_1739000931609_89963636.jpg",
              "id": "2bb61e6e-b273-467e-8087-fba6cb28ef3e"
            },
            {
              "name": "台场海滨公园",
              "description": "一个美丽的滨海公园，适合休闲和欣赏海湾美景。",
              "food_recommendations": [
                "海边咖啡馆",
                "手抓海鲜"
              ],
              "latitude": 35.6197,
              "longitude": 139.7756,
              "iamge": "http://store.is.autonavi.com/showpic/a7c81c3db7054bc70e0871d57a5e74d8",
              "id": "9657845a-7993-4c47-969a-7d7f88abfb84"
            },
            {
              "name": "科学未来馆",
              "description": "一个充满科技展示和互动体验的博物馆，适合所有年龄段的游客。",
              "food_recommendations": [
                "馆内餐厅",
                "科普小吃"
              ],
              "latitude": 35.6345,
              "longitude": 139.7754,
              "iamge": "http://store.is.autonavi.com/showpic/0fdb09fe4c33537bdbcbc459a1db8909",
              "id": "b6ea5354-04e1-4d93-ab92-4b1e1f498e5b"
            }
          ],
          "routes": [
            {
              "way": "地铁",
              "distance": "6km",
              "time": "约15分钟",
              "from_name": "丰洲市场",
              "to_name": "台场海滨公园"
            },
            {
              "way": "步行",
              "distance": "0.5km",
              "time": "约5分钟",
              "from_name": "台场海滨公园",
              "to_name": "科学未来馆"
            }
          ],
          "precautions": [
            "市场早市：丰洲市场的美食在早市时最为新鲜，建议早出行。",
            "展览体验：科学未来馆的互动展览，建议提前预约或查看开放时间。"
          ]
        },
        {
          "activities": [
            {
              "name": "上野动物园",
              "description": "上野动物园是日本最古老的动物园，拥有丰富的动物种类。",
              "food_recommendations": [
                "动物园餐厅",
                "附近小吃摊"
              ],
              "latitude": 35.7142,
              "longitude": 139.7712,
              "iamge": "",
              "id": "6fd753fe-b120-4915-94dd-368e5b98086a"
            },
            {
              "name": "阿美横町",
              "description": "阿美横町是著名的购物街，有许多小商店和摊贩。",
              "food_recommendations": [
                "炸鸡排",
                "街边零食"
              ],
              "latitude": 35.712,
              "longitude": 139.7748,
              "iamge": "",
              "id": "4777ca23-ed83-4056-8383-2c9e7b0ab46b"
            },
            {
              "name": "上野公园",
              "description": "上野公园是一个大面积的城市公园，春天樱花盛开，是赏樱圣地。",
              "food_recommendations": [
                "和风便当",
                "春季樱花小吃"
              ],
              "latitude": 35.7106,
              "longitude": 139.7758,
              "iamge": "",
              "id": "03435f17-ebf2-4716-a9b4-a62d37ce0793"
            }
          ],
          "routes": [
            {
              "way": "步行",
              "distance": "1km",
              "time": "约12分钟",
              "from_name": "上野动物园",
              "to_name": "阿美横町"
            },
            {
              "way": "步行",
              "distance": "0.5km",
              "time": "约6分钟",
              "from_name": "阿美横町",
              "to_name": "上野公园"
            }
          ],
          "precautions": [
            "早到动物园：动物园开放时去，避免排队和人多时间。",
            "购物提示：阿美横町的商店下午较为繁忙，规划好购物时间。"
          ]
        }
      ],
    }
  }
}

```

---

## 6. Save Travel Plan

**URL**

`POST /plan/save`

**Description**

Save the selected travel plan for a user.

**Request Example**
```{bash}
curl -X POST http://localhost:8000/plan/save \
  -b "user_id=186a1df9-e72e-4a7d-b183-c82014a75e71" \
  -H "Content-Type: application/json; charset=utf-8" \
  --data-binary '{"travel_plan_id": "5791b08f-ec23-427d-8c96-aeef63676358"}'
```

**Request Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| user_id | string | Yes | Unique user identifier |
| travel_plan_id | string | Yes | ID of the travel plan to save |

---

## 7. Get All Travel Plans

**URL**

`POST /plan/list`

**Description**

Retrieve a list of all saved travel plans for a specific user.

**Request Example**
```{bash}
curl -X POST http://localhost:8000/plan/list \
  -H "Content-Type: application/json; charset=utf-8" \
  --data-binary '{
    "user_id": "f334301d-5cdd-4b48-b28f-02d78cfd3f08"
}'
```

**Request Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| user_id | string | Yes | Unique user identifier |

**Response Fields**

Returns a list `travel_plans`, each item includes:

- `id`: Travel plan ID  
- `title`: Plan title  
- `location`: Travel destination  
- `image`: Image URL  
- `daily_plan`: Daily itinerary (simplified)  
- `estimated_budget`: Budget estimation

**Response Example**

```{bash}
{
  "code": 0,
  "message": "Success",
  "data": {
    "travel_plans": [
      {'id': '5791b08f-ec23-427d-8c96-aeef63676358', 'title': '潮流与美食的东京探秘', 'location': '东京', 'image': '', 'daily_plan': [[...], [...], [...], [...]], 'estimated_budget': '¥¥¥'}
    ]
  }
}
```
