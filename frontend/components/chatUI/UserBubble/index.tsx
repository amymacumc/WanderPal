"use client"

import React from 'react';
import { Bubble } from '@ant-design/x';

interface UserBubbleProps {
    content: string;
}

const UserBubble = ({
    content
}: UserBubbleProps) => {
    return (
        <Bubble content={content} placement='end' styles={{
            content: {
                color: '#fff',
                backgroundColor: '#1677ff',
                borderRadius: "18px",
                borderBottomRightRadius: '10px',
                padding: '10px',
            }
        }} />
    )
}

export default UserBubble;