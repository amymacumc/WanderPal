"use client"
import React, { useRef, useEffect } from 'react';
import Input from './Input';
import TipBubble from './TipBubble';
import BubbleList from './BubbleList';
import Welcome from './Welcome';
import Header from './Header';
import { useChat } from './logic/useChat';

let currentId = 4;

const TipList = [
    '帮我推荐目的地',
    '帮我规划日本美食之旅',
    '重庆三日游怎么安排'
]

const ChatUI: React.FC = () => {
  const {messages, input, setInput, append} = useChat([]);
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
        
       </div>

       <div className='flex-1 overflow-y-auto px-4'>
       <Welcome 
           icon={'👏'} 
           title={'上午好'} 
           description={'告诉我你要去哪里,我可以帮你规划本次的旅程。你可以问我任何有关旅行的问题'}
         />
         <div className='space-y-2 mb-4'>
           {TipList.map(tip => (
             <TipBubble 
               onClick={() => {
                 append({id: `user-${currentId++}`, content: tip, role:'user', type: 'message' })
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
             append({id: `user-${currentId++}`, content: message, role:'user', type: 'message' })
             setInput('');
           }} 
         />
       </div>
    </div>
  );
} 

export default ChatUI;