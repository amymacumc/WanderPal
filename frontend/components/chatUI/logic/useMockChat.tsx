"use client"
import { useState } from "react"
import { Message } from "../type";

export function useMockChat(initMessages: Message[]) {
    const [messages, setMessages] = useState<Message[]>(initMessages)
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
  
    const append = async (message: Message) => {
      setIsLoading(true)
  
      const mockResponse: Message = {
        role: 'assistant',
        content: '',
        id: Date.now(),
      }
      setMessages(prev => [...prev, message, mockResponse])
  
      const mockContent =
        'This is a mock response. In a real implementation, this would be replaced with an actual AI response.'
  
      let streamedContent = ''
      const words = mockContent.split(' ')
  
      for (const word of words) {
        await new Promise(resolve => setTimeout(resolve, 100))
        streamedContent += (streamedContent ? ' ' : '') + word
        setMessages(prev => {
          return [
            ...prev.slice(0, -1),
            {
              id: mockResponse.id,
              role: 'assistant',
              content: streamedContent,
            },
          ]
        })
      }
  
      setIsLoading(false)
      return mockContent
    }
  
    return {
      messages,
      input,
      setInput,
      isLoading,
      append,
    }
  }