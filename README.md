# 🧳 WanderPal | Your Personal Travel Companion Agent

Companion-style Travel Chatbot · Intelligent Map-based Itinerary Planning

** 🌈 WanderPal — More than just travel planning. We travel with you. **

⸻

## ✨ Project Overview

WanderPal is an AI-powered travel planning agent that combines emotionally intelligent dialogue with automated itinerary generation based on real-world map data (Gaode Map MCP API).

Our mission is to help users plan meaningful, personalized journeys — not just book trips, but to feel understood while building flexible, optimized itineraries.
	•	🤗 Companion-style conversations: Warm, dynamic, and friendly agent personalities adapt to your mood and travel goals.
	•	🗺️ Smart route planning: Integrated with Gaode Map MCP API to automatically generate efficient travel routes and realistic daily plans.
	•	🧠 Proactive trip validation: Detects unreasonable itineraries and gently advises improvements. (To be developed).

⸻

## 🚀 Key Features

🎭 Personalized Agent Selection	Choose from 3 emotional modes: Gentle Care, Thoughtful Butler, or Bold Explorer
✨ Companion-style Chat UX	Guided prompts to collect travel needs (time, destination, budget, mood, style)
🗺️ Smart Route Optimization: Automatically sequence daily routes with AMap Function Calling for realistic navigation
🛠️ Real-time Reasonability Checks: Validate opening hours, traffic time, route duplication, and over-scheduling
📚 Pre-Departure Smart Reminders: Provide cultural tips, visa advice, packing checklist

⸻

## 🛠️ Tech Stack
	•	Frontend: Node.js
	•	Backend: Python
	•	AI Engine: OpenAI GPT-4o
        •	Framework: Autogen
	•	Map Service: Gaode Map API + MCP
	•	Deployment: Vercel

⸻

## 📦 Getting Started

Start Frontend

### Clone the repository
git clone https://github.com/amymacumc/WanderPal.git
cd WanderPal

### Install frontend dependencies
npm install

### Run the development server
npm run dev

Open http://localhost:3000 to explore the application.

⸻

## Start Backend

### Navigate to the agent backend directory
cd agent

### Install backend dependencies
pip install -r requirements.txt

### Start the Agent server
python main.py

The backend manages conversational flows, travel planning prompts, and calls AMap function calling for smart route optimization.

⸻

## 🔥 Core User Flow
	1.	User completes the profile information → chooses their preferred Agent persona.
        2.  User lands in the chatbox and starts a conversation with the chosen Agent.
	2.	The Agent collects travel preferences (date, destination, budget, style, mood).
	3.	System uses Gaode MCP API to generate a day-by-day route-optimized itinerary.
	4.	Pre-departure reminders and cultural notices are provided automatically.
	5.	Users can edit, fine-tune, and save itineraries into a personal archive.
	6.	Agent checks for common trip issues and gently suggests improvements.

 ```mermaid
sequenceDiagram
    actor User
    participant App as Mobile App / Web Interface
    participant Backend as Backend System
    participant AI as AI Assistant Service
    participant DB as Database

    User->>App: Start Application / Access Feature
    App->>Backend: Check User Profile Status
    Backend->>DB: Query User Profile
    DB-->>Backend: Return Profile Status

    alt If Profile Incomplete
        Backend-->>App: Notify Profile Incomplete
        App->>User: Prompt to Fill Profile Info
        User->>App: Provide Profile Information
        App->>Backend: Save Profile Information
        Backend->>DB: Update User Profile
        DB-->>Backend: Confirmation
        Backend-->>App: Profile Updated Confirmation
    end

    App->>User: Display AI Assistant Options
    User->>App: Select AI Assistant
    App->>Backend: Initialize Conversation with AI
    Backend->>AI: Start Session / Provide User Context

    loop Trip Information Gathering
        AI->>Backend: Request Necessary Info / Ask Question
        Backend->>App: Forward Question
        App->>User: Display Question
        User->>App: Provide Answer
        App->>Backend: Send Answer
        Backend->>AI: Forward Answer
    end

    AI->>Backend: Notify Info Collection Complete / Generate Plans
    Backend->>AI: Request Plans
    AI-->>Backend: Return Generated Plans
    Backend-->>App: Forward Plans
    App->>User: Display Trip Plan Options

    User->>App: Select a Plan
    App->>Backend: Save Selected Plan
    Backend->>DB: Store Trip Plan
    DB-->>Backend: Confirmation
    Backend-->>App: Plan Saved Confirmation

    Note over User,App: Later Interaction (Viewing Saved Plans)

    User->>App: Access Profile / Saved Trips
    App->>Backend: Request Saved Plans for User
    Backend->>DB: Query Saved Trip Plans
    DB-->>Backend: Return Saved Plans
    Backend-->>App: Forward Saved Plans
    App->>User: Display Saved Trip Plans
```

⸻

## 🌟 Special Highlights
	•	Conversational Soft Guidance: Encouraging users to express vague or emotional needs and translating them into actionable plans.
	•	Real-time Map Validation: Using Amap function calling to plan the route and transportation.
	•	Emotional Companion Agent: Offers 3 different Agent personas, with each one offering different prompts based on the persona settings. 
	•	Smart Pre-departure Reminders: Auto-generated visa, packing, currency, and weather tips.

⸻

## 🧭 Future Roadmap
	•	Collaborative group itinerary planning
	•	Dynamic “inspiration cards” based on real-time mood detection
	•	Integration of hotel and restaurant recommendations via external APIs
	•	Memory feature: Using RAG (Retrieval-Augmented Generation) for better personalized planning
	•	Full multi-language support

⸻

## 🎬 Demo & Link
	•	Live Demo: https://wanderpal.vercel.app/  (replace with your actual deployed link if different)
	•	Frontend Repository: https://github.com/amymacumc/WanderPal
	•	Backend Repository: https://github.com/amymacumc/WanderPal/tree/main/agent (if you separate backend)
	•	Demo Credentials (if needed): Username: demo@wanderpal.com / Password: wanderpal123 (optional)

⸻

- 💖 Agent Personality 
  A therapeutic and friendly travel companion persona to reduce decision anxiety.

⸻

## 🧑‍💻 Team

| Name | Role           | Responsibilities                         |
|------|----------------|------------------------------------------|
| Amy Ma(@amymacumc) | Project Manager/Product Manager             | Product Management, project planning, coordination, vision   |
| Xia Zhong    | UX / UI Design | Figma design, user experience workflows  |
| Keqin Ye    | Frontend Dev   | UI implementation, component logic       |
| Junhao Ma    | Backend Dev    | GPT integration, API services            |


⸻

## 📚 User Story Example

User Story 1｜Emily’s “Gentle Escape” Urban Trip

👩 Character Profile
	•	Name: Emily
	•	Age: 29
	•	City: Manhattan, New York
	•	Occupation: Marketing Manager
	•	MBTI: INFP
	•	Travel Goals: Feeling overwhelmed by work, Emily wants to plan a short, relaxing trip within a limited budget and timeframe. She values real traveler reviews, rational route planning, budget control, and emotionally healing experiences — without being trapped by rigid itineraries.

⸻

🌐 Scenario: Emily Plans a Spring Getaway Using WanderPal’s Thoughtful Butler Agent

✅ Step 1: Registration and Agent Selection

Emily downloads WanderPal and completes her quick registration. She fills out basic profile information and selects her preferred agent persona — the Thoughtful Butler.

WanderPal Greeting Prompt

“Good morning! I’m your personal travel concierge, WanderPal ☕ Welcome back. Let’s design a journey that’s gentle, personal, and made just for you.”

⸻

✅ Step 2: Collecting Core Travel Information

Through a friendly chat, the Agent guides Emily to fill out essential trip details:

| **Prompt**              | **Emily’s Response**                                | **System Handling**                                                           |
|--------------------------|-----------------------------------------------------|--------------------------------------------------------------------------------|
| **Travel Time**          | "Around mid-May, for about 5 days."                 | Date picker appears — system sets May 12–May 17.                               |
| **Destination**          | "Haven’t decided yet."                             | Suggested destinations in card format: 🇯🇵 Japan, 🇺🇸 California, 🇫🇷 South of France, 🇨🇦 Quebec, or “Other (Custom Input)”. |
| **Budget**               | "Under $3000."                                      | System sets budget range to $2000–$3000.                                       |
| **Trip Style**           | "Culture, coffee shops, and photogenic places."     | Mapped to "Cultural Exploration + Photo Spots" trip styles.                    |
| **Travel Intensity**     | "I want to sleep in."                               | System sets "Relaxed pace" mode (max 8h/day).                                   |
| **Mood Status**          | "Burnt out… just need a reset."                     | Triggers "Gentle & Healing" destination and style matching.                    |
| **Other Requirements**   | "Prefer easy transportation, no complicated transfers." | Priority flag: Transportation convenience.                               |

⸻

✅ Step 3: Generating Candidate Trip Cards

Based on Emily’s preferences, WanderPal generates three candidate trip plans:
	•	Plan A｜Tokyo Urban Healing Tour
	•	Highlights: Slow pace, cozy cafes, peaceful gardens
	•	Transport: Metro + walking
	•	Budget Estimate: $$
	•	Plan B｜California Art & Nature Getaway
	•	Highlights: Museums + national parks mix
	•	Budget Estimate: $$$ (slightly above budget, flagged as “Can Optimize”)
	•	Plan C｜Southern France Garden Tour
	•	Highlights: Lavender fields & artisan markets
	•	Notes: Requires visa, French-speaking environment
	•	Budget Estimate: $$$

Emily selects Plan A and clicks “View Details” to explore the daily itinerary.

⸻

📅 Step 4: Detailed Daily Schedule & Smart Suggestions

Each day’s itinerary is presented with:
	•	Interactive map view with daily paths
	•	Walk/metro/drive transport planning + estimated costs
	•	Attraction details: open hours, entrance fees, hot tips (“arrive 30 min early” advice)
	•	Clothing suggestions, weather alerts, cultural tips, and packing reminders

⸻

💾 Step 5: Saving and Feedback

Emily clicks “Save to My Trips,” and WanderPal warmly confirms:

“Your itinerary has been saved to your archive 🌸 You can continue editing anytime — or even invite friends to plan together!”

At the bottom, she leaves a positive feedback: 👍 

⸻

✅ Summary: How WanderPal Fulfilled Emily’s Needs

| **User Need**                     | **WanderPal’s Response**                                      |
|------------------------------------|---------------------------------------------------------------|
| Quickly generate viable trip plans | Companion-style onboarding + Chatbox dynamic flow             |
| Flexible trip pacing               | Supports slow travel mode with daily reasonable hour limits   |
| Budget & practical info            | Transparent cost estimates + daily spending previews          |
| Transparency & real reviews        | Includes crowd-sourced reviews, tips, restrictions             |
| Freedom to modify                  | Allows adding/removing attractions + smart validation         |
| Emotional connection & support     | Companion-style tone, mood input recognized                   |
| Personal archive & social sharing  | Save plans + invite others for collaborative planning          |


⸻










