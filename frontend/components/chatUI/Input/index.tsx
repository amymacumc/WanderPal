"use client"
import React from 'react';
import { Sender, SenderProps } from '@ant-design/x';

interface InputProps extends SenderProps {}

const Input: React.FC<InputProps> = (props) => {
    return (
        <Sender {...props}  />
    )
}

export default Input;