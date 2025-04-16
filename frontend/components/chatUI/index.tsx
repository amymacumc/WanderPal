"use client"
import React, { useRef, useEffect } from 'react';
import Input from './Input';
import TipBubble from './TipBubble';
import BubbleList from './BubbleList';
import Welcome from './Welcome';
import Header from './Header';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll to bottom when messages change

  return (
    <div className='flex flex-col h-screen bg-blue-100'>
       <div className='flex-none'>
         <Header 
           avatar={
               <img 
                   src="https://cataas.com/cat" 
                   alt="AI Assistant" 
                   className="w-full h-full object-cover"
               />
           }
           name="Eric旅行规划师"
           onBack={() => window.history.back()}
         />
         <Welcome 
           icon={'👏'} 
           title={'上午好'} 
           description={'告诉我你要去哪里,我可以帮你规划本次的旅程。你可以问我任何有关旅行的问题'}
         />
       </div>

       <div className='flex-1 overflow-y-auto px-4'>
         <div className='space-y-2 mb-4'>
           {TipList.map(tip => (
             <TipBubble 
               onClick={() => {
                 append({id: currentId++, content: tip, role:'user' })
               }} 
               key={tip} 
               content={tip}
             />
           ))}
         </div>
         <BubbleList messages={messages} />
         <div ref={messagesEndRef} /> {/* Invisible element to scroll to */}
       </div>

       <div className='flex-none p-4'>
         <Input 
           value={input} 
           onChange={setInput} 
           onSubmit={(message) => {
             append({id: currentId++, content: message, role:'user' })
             setInput('');
           }} 
         />
       </div>
    </div>
  );
} 

export default ChatUI;