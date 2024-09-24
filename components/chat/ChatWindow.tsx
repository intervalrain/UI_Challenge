'use client'

import { addMessage, Message } from '@/store/chatSlice';
import { RootState } from '@/store/store';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ChatWindow: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const messages = useSelector((state: RootState) => state.chat.messages);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage: Message = { role: 'user', content: input };
      dispatch(addMessage(userMessage));
      const response: Message = { role: 'assistant', content: `This is a mock response to ${input}` };
    }
  }

  return (
    <div>ChatWindow</div>
  )
}

export default ChatWindow