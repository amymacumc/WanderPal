"use client"
import { useState, useRef } from "react"
import { Message } from "../type";

export function useChat(initMessages: Message[]) {
    const [messages, setMessages] = useState<Message[]>(initMessages)
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // Keep track of the current streaming message ID
    const streamingMessageIdRef = useRef<string | null>(null)
  
    const append = async (message: Message) => {
      try {
        setIsLoading(true)
        // Add user message immediately
        setMessages(prev => [...prev, message])

        // Create an ID for the assistant's response
        const responseId = Date.now().toString()
        streamingMessageIdRef.current = responseId
        
        // Create an empty assistant message immediately to show typing
        setMessages(prev => [...prev, {
          id: responseId,
          role: 'assistant',
          type: 'chunk',
          content: '', 
          loading: true
        }]);

        const response = await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({ message: message.content }),
          credentials: 'include'
        });

        if (!response.body) throw new Error('No response body');
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          console.log('value', value)

          // Process each chunk immediately
          const chunk = decoder.decode(value, { stream: true });
          
          // Process each line separately
          const lines = chunk.split('\n').filter(Boolean);
          
          for (const line of lines) {
            try {
              const parsed = JSON.parse(line);
              
              if (parsed.code === 0 && parsed.data) {
                const assistantMessage = parsed.data as Message;
                
                if (assistantMessage.type === 'chunk') {
                  // Immediately update the message content
                  setMessages(prev => {
                    return prev.map(msg => {
                      // Find the current streaming message by ID
                      if (msg.id === streamingMessageIdRef.current) {
                        return {
                          ...msg,
                          content: msg.content + assistantMessage.content,
                          loading: false
                        };
                      }
                      return msg;
                    });
                  });
                } else if (assistantMessage.type === 'message') {
                  const idRef = streamingMessageIdRef.current;
                  const messageHolder = {
                    role: 'assistant',
                    type: 'message',
                    content: '',
                    id: Date.now().toString(),
                    loading: true,
                  } as const;
                  streamingMessageIdRef.current = messageHolder.id; // Set the new streaming ID

                  setMessages(prev => {
                    return [...prev.map(msg => {
                      // Find the current streaming message by ID
                      if (msg.id === idRef) {
                        return {
                          ...msg,
                          content: msg.content + assistantMessage.content,
                          loading: false
                        };
                      }
                      return msg;
                    }), messageHolder];
                  });
                } else if (assistantMessage.type === 'plan') {
                  // Handle error message
                  const idRef = streamingMessageIdRef.current;
                  streamingMessageIdRef.current = null; // Reset streaming ID

                  setMessages(prev => {
                      return [...prev.filter(msg => msg.id !== idRef), {
                        type: 'plan',
                        content: '',
                        plan: assistantMessage.content.recommend_travels,
                        id: Date.now().toString()
                      }];
                  });
                }
              }
            } catch (err) {
              console.error('Error parsing chunk:', err, line);
            }
          }
        }
      } catch (err) {
        console.error('Error in chat:', err);
        streamingMessageIdRef.current = null;
      } finally {
        setIsLoading(false)
      }
    }
  
    return {
      messages,
      input,
      setInput,
      isLoading,
      append,
    }
  }