"use client";

import { Message } from "@/store/chatSlice";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Bot, Thermometer } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import "katex/dist/katex.min.css";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import ExpandableButton from "./ExpandableButton";
import { useChat } from "@/store/hooks";

const TopKIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M6 4V20M6 12L18 4M6 12L18 20" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

const ChatWindow: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const { messages, addMessage, setMessages } = useChat();
  const [rows, setRows] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage: Message = { role: "user", content: input };
      addMessage(userMessage);
      const response: Message = {
        role: "assistant",
        content: `This is a mock response to ${input}`,
      };
      addMessage(response);
      setInput("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInput(e.target.value);
    const lineCount = e.target.value.split("\n").length;
    setRows(Math.min(lineCount, 5));
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      content: input,
      role: 'user',
      // timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');
    setRows(1);

    // const response = await sendMessage(input);
    const response = "Mock response to " + input;
    const botMessage: Message = {
      content: response,
      role: 'assistant',
      // timestamp: new Date(),
    };

    addMessage(botMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow line break
        return;
      } else {
        e.preventDefault();
        handleSend();
      }
    } else if (e.key === 'ArrowUp' && input === '') {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-200 dark:bg-gray-700">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {message.content}
              </ReactMarkdown>
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={rows}
            className="w-full px-4 pt-2 border-t border-l border-r rounded-tl-xl rounded-tr-xl resize-none bg-blue-50
              focus:outline-none"
            placeholder="Talk to DSM Bot..."
          />
        </form>
        <div className="bg-blue-50 p-2 flex space-x-2">
          <ExpandableButton 
            Icon={Bot}
            text="ChatGPT-4o-for-text" 
            onClick={() => console.log('Bot clicked')}
            options={["ChatGPT-4o-for-text", "ChatGPT-3.5-turbo"]}
          />
          <ExpandableButton 
            Icon={Thermometer} 
            text="0.1" 
            options={["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"]}
            onClick={() => console.log('temperature clicked')}
          />
          <ExpandableButton 
            Icon={TopKIcon} 
            text="5" 
            options={["5", "10", "15", "20", "30", "50", "100"]}
            onClick={() => console.log('Top-K clicked')}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
