# Getting Started with WanderPal Design

## Introduction / 简介

This guide provides step-by-step instructions for designers to begin working on the WanderPal Figma prototype. Follow these steps to set up your workspace and start creating the app design.

本指南为设计师提供了开始制作WanderPal Figma原型的分步说明。按照这些步骤设置工作空间并开始创建应用设计。

## Setup / 设置

### 1. Create a New Figma File / 创建新的Figma文件

- Name it "WanderPal - Mobile App Design"
- Set up the following pages:
  - 📚 Design System
  - 🧩 Components
  - 📱 Screens
  - 🔄 Prototype
  - 📝 Notes

### 2. Establish Grid System / 建立网格系统

- Create a frame for mobile (iPhone 13/14 size: 390 x 844px)
- Set up layout grid:
  - 8px base grid
  - 24px margin on all sides
  - Consider using columns (12 columns with 16px gutters)

### 3. Import Reference Materials / 导入参考材料

- Review the [wireframes](../design/wireframes.md) and [design specs](../design/design_specs.md)
- Prepare any reference images for travel destinations
- Gather icons that match the healing/gentle aesthetic

## Creating the Design System / 创建设计系统

### 1. Define Color Styles / 定义颜色样式

```
Primary: #5BBFBA (Soft teal)
Secondary: #F5E2C8 (Warm sand)
Accent: #F78536 (Sunset orange)
Background: #F9F9F9 (Soft white)
Background Alt: #F0F0F0 (Light grey)
Text Primary: #333333 (Dark grey)
Text Secondary: #666666 (Medium grey)
```

Create variants for each color (e.g., Primary 100, Primary 200, etc.)

### 2. Set Up Typography / 设置排版

- Import fonts:
  - Nunito for headings
  - Inter for body text

- Create text styles:
  - Heading 1: Nunito Bold, 28px
  - Heading 2: Nunito SemiBold, 24px
  - Heading 3: Nunito SemiBold, 20px
  - Body: Inter Regular, 16px
  - Caption: Inter Regular, 14px
  - Button: Inter Medium, 16px

### 3. Build Core Components / 构建核心组件

Start with these basic components:

- **Buttons**
  - Primary (teal background)
  - Secondary (white with teal border)
  - Text only
  - Icon button

- **Input Fields**
  - Text input
  - Selection dropdown
  - Date picker
  - Checkbox/radio buttons

- **Navigation**
  - Header bar
  - Bottom tab bar

- **Cards**
  - Destination card
  - Itinerary card
  - Empty state card

- **Chat Elements**
  - AI message bubble
  - User message bubble
  - Quick reply chips
  - Input field with send button

## First Screens to Design / 首先设计的屏幕

Begin with these key screens:

1. **Splash Screen**
   - WanderPal logo
   - Tagline
   - Soft animation hint

2. **Welcome Screen**
   - Greeting message
   - Start button
   - Optional illustration

3. **Initial Chat Screen**
   - Empty chat interface
   - First message from AI
   - Reply options

4. **Personality Selection Screen**
   - Question from AI
   - Selection options (personality types)
   - Progress indicator

## Design Tips / 设计提示

- **Maintain the healing aesthetic**: Use rounded corners, soft shadows, and gentle gradients
- **Provide breathing room**: Use ample white space for a calm feel
- **Use realistic content**: Avoid lorem ipsum; use actual travel destinations and descriptions
- **Consider accessibility**: Ensure text contrast meets WCAG AA standards
- **Design for emotion**: Every element should contribute to a sense of calm and support

## Next Steps / 下一步

After completing the initial screens:

1. Get feedback from stakeholders
2. Refine the design system based on feedback
3. Create remaining screens
4. Build interactive prototype
5. Prepare for handoff to developers

## Resources / 资源

- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Figma Accessibility Plugin](https://www.figma.com/community/plugin/733159460536249875/A11y---Color-Contrast-Checker)
- [Travel Stock Photos](https://unsplash.com/collections/298526/travel)
- [Free Icon Sets](https://www.figma.com/community/file/1042482990443782479) 