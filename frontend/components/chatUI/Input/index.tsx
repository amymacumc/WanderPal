"use client"
import React from 'react';
import { Sender, SenderProps } from '@ant-design/x';

// 直接使用SenderProps作为组件的props类型，避免空接口警告
type InputProps = SenderProps;

const Input: React.FC<InputProps> = (props) => {
    return (
        <Sender {...props}  />
    )
}

export default Input;