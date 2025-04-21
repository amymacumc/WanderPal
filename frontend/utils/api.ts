import { User } from '../types/user';

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