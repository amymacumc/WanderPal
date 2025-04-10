# WanderPal App Design Specification

## Design Style Guide
- **Theme**: Healing/Gentle/Comforting
- **Color Palette**: 
  - Primary: Soft blue/teal (#5BBFBA)
  - Secondary: Warm sand (#F5E2C8)
  - Accent: Sunset orange (#F78536)
  - Backgrounds: Soft white (#F9F9F9) and light grey (#F0F0F0)
  - Text: Dark grey (#333333) and medium grey (#666666)
- **Typography**:
  - Headings: Sans-serif, rounded (e.g., Nunito)
  - Body: Clean, readable sans-serif (e.g., Inter)
- **Iconography**: Rounded, minimalist icons with soft edges
- **Imagery**: Calming landscapes, natural scenes, warm lighting

## App Navigation Structure
- Bottom tab navigation with two main tabs:
  - Chat (Main interaction space)
  - Archives (Saved travel plans)

## Chatbox Screen
### New Chat Interaction Flow
1. **Welcome Screen**
   - Warm greeting message
   - Soft animation introducing WanderPal
   - "Start New Journey" button

2. **User Profiling Sequence**
   - Question 1: "How would you describe your personality?" (Multiple choice options)
   - Question 2: "What's your cultural background or current city?" (Text input)
   - Question 3: "How are you feeling right now?" (Emotion tag selection)
   - Question 4: "When would you like to travel?" (Date range picker)
   - Question 5: "How long would you like your journey to be?" (Duration selector)

3. **Destination Recommendations**
   - 3-5 card-style recommendations
   - Each card includes:
     - Destination image
     - Style tags (Nature/Urban/Cultural)
     - Budget range
     - Personalized recommendation reason
     - "View Details" and "Choose This Plan" buttons

4. **Itinerary Planning**
   - Timeline-style daily plans (Morning-Afternoon-Evening)
   - Each segment includes:
     - Attraction/activity details with image
     - Transportation method
     - Estimated budget
     - Special notes (cultural tips, weather alerts, etc.)
   - Interactive map showing daily route with:
     - Starting point
     - Attractions/checkpoints
     - Transportation routes
     - End point
   - Feedback controls (👍/👎)
   - "Save to Archives" button with encouraging message

## Archives Screen
- List view of saved itineraries
- Card for each saved plan showing:
  - Destination name
  - Travel dates
  - Category tags
- Sorting/filtering options
- Detail view for each saved plan showing complete itinerary
- Optional tagging system (Annual travel goals, Wishlist, etc.)

## Special Feature: Annual Travel Vision Board
- Pinterest/Notion-style board layout
- Add inspirations through image cards
- Tag with seasons, themes, or interests
- Ability to convert vision board items into actual travel plans 