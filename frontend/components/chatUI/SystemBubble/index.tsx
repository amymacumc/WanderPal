"use client"
import React from 'react';
import { Bubble } from '@ant-design/x';

interface UserBubbleProps {
    content: string;
}

const SystemBubble = ({
    content
}: UserBubbleProps) => {
    return (
        <Bubble content={content} placement='start' />
    )
}

export default SystemBubble;