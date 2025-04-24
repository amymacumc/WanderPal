
/**
 * 消息接口定义
 */
export type Message = baseMessage | chunkMessage | planMessage;
/**
 * 消息列表接口定义
 */

interface baseMessage {
    id?: string;
    role: 'user' | 'assistant';
    type: 'message';
    content: string;
}

interface chunkMessage {
    id?: string;
    role: 'assistant';
    type: 'chunk';
    content: string;
}

interface planMessage {
    id?: string;
    role: 'assistant';
    type: 'plan';
    content: string;
    plan: travelOverview[];
}

export interface travelOverview {
    daily_plan: string[][];
    estimated_budget: string;
    id: string;
    image: string;
    location: string;
    title: string;
}