"use client"
import React from 'react';
import { Bubble } from '@ant-design/x';

interface UserBubbleProps {
    content: string;
    loading?: boolean;
}

const SystemBubble = ({
    content,
    loading
}: UserBubbleProps) => {
    return (
        <Bubble content={content} placement='start' loading={loading} />
    )
}

export default SystemBubble;