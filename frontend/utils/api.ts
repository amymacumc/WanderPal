import { travelOverview } from '@/components/chatUI/type';
import { DailyPlan, planOverview, User } from '../types/user';
import { getLocationSum } from './convert';
import { TravelPlan } from '@/app/plan/page';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  type: 'chunk' | 'card';
  content: string;
}

export async function createUser(user: User): Promise<ApiResponse<{ user: User }>> {
  const response = await fetch('/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
}

export async function getChatHistory(): Promise<ApiResponse<{ history: ChatMessage[] }>> {
  const response = await fetch('/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get chat history');
  }

  return response.json();
}

export async function sendChatMessage(message: string): Promise<Response> {
  const response = await fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
} 

export async function getTravelPlan(planId: string): Promise<ApiResponse<{travel_plan: planOverview}>> {
  const response = await fetch('/plan/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({travel_plan_id: planId}),
  })

  if (!response.ok) {
    throw new Error('Failed to get travel plan');
  }

  return response.json();
}

export async function saveTravelPlan(planId: string): Promise<ApiResponse<{}>> {
  const response = await fetch('/plan/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({travel_plan_id: planId}),
  })
  if (!response.ok) {
    throw new Error('Failed to save travel plan');  
  }
  return response.json();
}

export async function getTravelList(): Promise<TravelPlan[]> {
  const response = await fetch('/plan/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Failed to get travel plans');
  }

  const data = await response.json();
  console.log(data);
  return data?.data?.travel_plans?.map((plan: travelOverview) => ({
    id: plan.id,
    title: plan.title,
    startDate: '--',
    endDate: '--',
    duration: `${plan.daily_plan.length}天${plan.daily_plan.length - 1}晚`,
    locations: getLocationSum(plan),
    image: plan.image,
  }));
}