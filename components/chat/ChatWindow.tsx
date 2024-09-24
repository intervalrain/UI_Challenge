'use client'

import { addMessage, Message } from '@/store/chatSlice';
import { RootState } from '@/store/store';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const messages = [
  {
    role: 'user',
    content: `你好！請問 **Markdown** 的標題語法是什麼？`,
  },
  {
    role: 'assistant',
    content: `Markdown 的標題語法很簡單，使用 \`#\` 符號來表示標題層級：
  
  - \`#\` 表示一級標題
  - \`##\` 表示二級標題
  - \`###\` 表示三級標題

例如：

\`\`\`markdown
# 這是一級標題
## 這是二級標題
### 這是三級標題
\`\`\`

渲染結果會如下：

# 這是一級標題
## 這是二級標題
### 這是三級標題
`
  },
  {
    role: 'user',
    content: `了解了！那如何在 **Markdown** 裡插入數學公式？`,
  },
  {
    role: 'assistant',
    content: `在 Markdown 中，你可以使用 LaTeX 語法來插入數學公式。比如：

行內公式使用 \`$...\`，例如：

\`$E = mc^2$\` 會渲染為：$E = mc^2$

塊級公式使用 \`\$\$\`，例如：

\`\`\`latex
$$
\\frac{a}{b} + \\sqrt{c^2 + d^2}
$$
\`\`\`

這會渲染為：

$$
\\frac{a}{b} + \\sqrt{c^2 + d^2}
$$
`
  },
  {
    role: 'user',
    content: `太棒了！那能告訴我如何用 Markdown 插入代辦列表嗎？`,
  },
  {
    role: 'assistant',
    content: `當然可以！代辦列表使用 \`-\` 或 \`*\` 加上 \`[ ]\` 或 \`[x]\` 來表示未完成或已完成的任務。例如：

\`\`\`markdown
- [ ] 未完成的任務
- [x] 已完成的任務
\`\`\`

渲染結果如下：

- [ ] 未完成的任務
- [x] 已完成的任務
`
  }
];


const ChatWindow: React.FC = () => {
  const [input, setInput] = useState<string>('');
  // const messages = useSelector((state: RootState) => state.chat.messages);
  const dispatch = useDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior:'smooth' });
  }

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage: Message = { role: 'user', content: input };
      dispatch(addMessage(userMessage));
      const response: Message = { role: 'assistant', content: `This is a mock response to ${input}` };
      dispatch(addMessage(response));
      setInput('');
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-scroll p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}>
                {message.content}
              </ReactMarkdown>
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="">
        <input 
          type="text"/>
      </form>
    </div>
  )
}

export default ChatWindow