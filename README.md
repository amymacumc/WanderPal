# 🌍 WanderPal — Your AI Travel Companion

> An AI-powered conversational travel agent that understands your emotions and preferences, recommends personalized destinations, and builds your ideal itinerary — all through natural, warm, and intuitive dialogue.

---

## 🚀 Project Overview

WanderPal is an intelligent travel planning assistant designed to reduce planning fatigue and deliver emotionally resonant recommendations. Instead of endless forms or static templates, users simply chat with the agent — just like talking to a friend — and receive dynamic, personalized travel plans.

This isn't just another travel tool. It's your empathetic, helpful, and aesthetically aware AI travel buddy.

---

## 🎯 Key Features

- 💬 **Conversational Needs Discovery**  
  Understands user's mood, travel goals, and preferences through dialogue.

- 🧠 **GPT-Powered Smart Suggestions**  
  Recommends destinations, attractions, food, and lodging with real-time context.

- 📅 **Auto-Generated Travel Itinerary**  
  Builds full multi-day itineraries with time breakdowns, budget estimates, and packing suggestions.

- 💖 **Agent Personality**  
  A therapeutic and friendly travel companion persona to reduce decision anxiety.

---

## 🏗 Tech Stack

| Layer       | Technology                         |
|-------------|------------------------------------|
| Frontend    |     TBD          |
| Backend     |    TBD           |
| AI Engine   | TBD    |
| Data APIs   | TBD    |
| Deployment  | TBD    |

---

## 📁 Project Structure

TBD


---

## 🎥 Demo & Links

- 🌐 Live Demo (Web): [TBD]()
- 🎬 Demo Video: [TBD]
- 📱 WeChat Mini Program: [TBD]

---

## 👤 Sample User Story

> Lin, 26, works in Shenzhen. The holidays are near, but she’s feeling burnt out and unsure where to go. She tells WanderPal:  
>  
> “I want to go somewhere peaceful. I only have ¥3000.”  
>  
> In minutes, WanderPal replies with a relaxing 3-day itinerary in Hangzhou, complete with lodging, sightseeing, a café trail, weather reminders, and even a packing list.  
>  
> Lin says, “It felt like it just *got me*.”

---

## 🧪 Getting Started

### Start Frontend

1. make sure you have Node.js installed

```
node -v
// if you get a version number, you are good to go
// if not, please install it
// you can download it from here: https://nodejs.org/zh-cn/download 
```

2. install pnpm
```
npm install -g pnpm
```

3. install dependencies and start the frontend

```
// cd into the frontend directory
cd frontend
// install dependencies
pnpm install
```

4. start the frontend
```
pnpm run dev
```

### Start Backend
1. 进入 `agent` 目录：
   ```bash
   cd agent
   ```

2. 安装依赖：
   ```bash
   pip install -r requirements.txt
   ```

3. 启动 Agent：
   ```bash
   python main.py
   ```

---

### config API keys
1. 在 `agent` 目录下创建 `.env` 文件
```
API_KEY=XXX
MODEL=gpt-4o-mini
GAODE_API_KEY=XXX
AMAP_MAPS_API_KEY=XXX

```

2. 在 `frontend` 目录下创建 `.env.local` 文件
```
NEXT_PUBLIC_AMAP_KEY=XXX
NEXT_PUBLIC_AMAP_SECURITY_CODE=XXX
```

## 🛠 Deployment

---

## 🧑‍💻 Team

| Name | Role           | Responsibilities                         |
|------|----------------|------------------------------------------|
| Amy Ma | Project Manager/Product Manager             | Product Management, project planning, coordination, vision   |
| X    | Frontend Dev   | UI implementation, component logic       |
| Y    | Backend Dev    | GPT integration, API services            |
| Z    | UX / UI Design | Figma design, user experience workflows  |








