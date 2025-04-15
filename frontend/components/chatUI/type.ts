import { JSX } from "react";

/**
 * 消息接口定义
 */
export interface Message {
    // 消息的唯一标识符
    id: number;
    // 消息的具体内容
    content: string;
    // 消息的角色类型，可以是助手或用户
    role: 'assistant' | 'user';
    // 可选的渲染函数，用于自定义消息的展示方式
    render?: () => JSX.Element;
}