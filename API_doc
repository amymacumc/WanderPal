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
（保持原中文响应示例）

---

## 2. Get User Info

**URL**

`GET /user/{user_id}`

**Description**

Retrieve user information by user ID.

**Request Example**
（保持原中文请求示例）

**Path Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| user_id | string | Yes | Unique user identifier |

**Response Example**
（保持原中文响应示例）

---

## 3. Get User History

**URL**

`POST /history`

**Description**

View a user's historical conversation records. Supports two types: plain messages (`message`) and travel plans (`plan`).

**Request Example**
（保持原中文请求示例）

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
（保持原中文响应示例）

---

## 4. Chat Endpoint

**URL**

`POST /chat`

**Description**

Send user message and receive model response. Supports three types: `message`, `chunk`, and `plan`.

**Request Example**
（保持原中文请求示例）

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
（保持原中文响应示例）

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
（保持原中文响应示例）

---

## 6. Save Travel Plan

**URL**

`POST /plan/save`

**Description**

Save the selected travel plan for a user.

**Request Example**
（保持原中文请求示例）

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
（保持原中文请求示例）

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
（保持原中文响应示例）
