"use client"
import React from 'react';

interface TipBubbleProps {
    content: string;
    onClick?: () => void;
}

const TipBubble = ({
    content,
    onClick
}: TipBubbleProps) => {
    return (
        <div 
            className={'flex items-center cursor-pointer bg-white rounded-3xl px-3 py-2 gap-1 border-r-4 w-fit mb-2 text-xs'}
            onClick={onClick}
        >
            <div className='icon'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L10.2 5.8L16 6.2L11.8 10.2L13 16L8 13L3 16L4.2 10.2L0 6.2L5.8 5.8L8 0Z" fill="#00B0FF" />
                        </svg>
            </div>
            <div>{content}</div>
        </div>
    )
}

export default TipBubble;