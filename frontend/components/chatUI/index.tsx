"use client"
import React from 'react';
import Input from './Input';
import TipBubble from './TipBubble';
import BubbleList from './BubbleList';
import { useMockChat } from './logic/useMockChat';

let currentId = 4;

const Messages = [
    {
        id: 1,
        role: 'user' as const,
        content: '好的，请问你本次出行的预算是多少？',
    },
    {
        id: 2,
        role: 'assistant' as const,
        content: '1w5左右',
    },
    {
        id: 3,
        role: 'user' as const,
        content: '好的正在为您规划5天4晚日本东京，预算在1w5以内的旅行攻略...'
    }
];

const TipList = [
    '帮我推荐目的地',
    '帮我规划日本美食之旅',
    '重庆三日游怎么安排'
]

const ChatUI: React.FC = () => {
  const {messages, input, setInput, append} = useMockChat(Messages);

  return (
    <div className='bg-blue-100 p-4 flex flex-col h-screen'>
    <div className='flex-1'>
      {TipList.map(tip => <TipBubble onClick={() => {
        append({id: currentId++, content: tip, role:'user' })
      }} key={tip} content={tip}></TipBubble>)}
      <BubbleList messages={messages} />
    </div>
    <div className='flex-end justify-self-end'>
        <Input value={input} onChange={setInput} onSubmit={(message) => {
          append({id: currentId++, content: message, role:'user' })
          setInput('');
        }} />
    </div>
    </div>
  );

} 
  export default ChatUI;