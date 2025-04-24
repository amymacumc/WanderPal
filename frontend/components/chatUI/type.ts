import { JSX } from "react";

/**
 * 消息接口定义
 */
export interface Message {
    id?: string;
    role: 'user' | 'assistant';
    type: 'chunk' | 'card' | 'message';
    content: string;
    // 可选的渲染函数，用于自定义消息的展示方式
    render?: () => JSX.Element;
}