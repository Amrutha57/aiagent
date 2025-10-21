'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add user message and simulate bot reply (replace with API call)
  const sendMessage = () => {
    if (input.trim() === '') return;

    const newUserMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');

    // Simulated bot response (replace with Gemini AI call)
    setTimeout(() => {
      const botReply: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'This is a sample AI response. Replace with your API integration.',
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  // Handle enter key to send
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="max-w-3xl mx-auto flex flex-col h-[600px]">
      <CardHeader>
        <CardTitle>Chat with AI</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">
            Start chatting with the AI by typing a message below.
          </p>
        )}
        {messages.map(({ id, role, content }) => (
          <div
            key={id}
            className={`p-3 rounded-lg max-w-[75%] ${
              role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-900 self-start'
            }`}
          >
            {content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>

      <div className="flex gap-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
          autoFocus
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </Card>
  );
}
