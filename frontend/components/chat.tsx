'use client'

import {
  ChatHandler,
  ChatSection as ChatSectionUI,
  Message,
} from '@llamaindex/chat-ui'

import '@llamaindex/chat-ui/styles/markdown.css'
import { useState } from 'react'

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: '好的，请问你本次出行的预算是多少？'
  },
  {
    content: '1w5左右',
    role: 'user',
  },
  {
    role: 'assistant',
    content:
      "好的正在为您规划5天4晚日本东京，预算在1w5以内的旅行攻略...",
  },
]


