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
          content: '' // Start with empty content
        }]);

        const response = await fetch('/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: message.content }),
        });

        if (!response.body) throw new Error('No response body');
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

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
                          content: msg.content + assistantMessage.content
                        };
                      }
                      return msg;
                    });
                  });
                } else if (assistantMessage.type === 'card') {
                  // For card type messages, replace the streaming message or add new
                  streamingMessageIdRef.current = null; // Reset streaming ID
                  
                  setMessages(prev => {
                    // If we have a streaming message, replace it
                    if (prev.some(msg => msg.id === responseId)) {
                      return prev.map(msg => 
                        msg.id === responseId ? {
                          ...assistantMessage,
                          id: responseId
                        } : msg
                      );
                    } else {
                      // Otherwise add as new message
                      return [...prev, {
                        ...assistantMessage,
                        id: Date.now().toString()
                      }];
                    }
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
        
        // Add error message, replacing the streaming message if it exists
        setMessages(prev => {
          const errorId = Date.now().toString();
          const errorMessage = {
            id: errorId,
            role: 'assistant' as const,
            type: 'card' as const,
            content: '抱歉，发生了一些错误，请稍后重试。'
          };
          
          // Replace streaming message if it exists
          if (streamingMessageIdRef.current) {
            return prev.map(msg => 
              msg.id === streamingMessageIdRef.current ? errorMessage : msg
            );
          } else {
            return [...prev, errorMessage];
          }
        });
        
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