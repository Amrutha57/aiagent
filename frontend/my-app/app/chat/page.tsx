'use client';

import { useState, useRef } from 'react';
import { Actions, Action } from '../components/ui/ai-elements/actions';
import { RefreshCcwIcon, CopyIcon, UploadCloudIcon } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAnswer = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();

      setMessages((prev) => [...prev, { question: input, answer: data.answer }]);
      setInput('');
    } catch (error) {
      setMessages((prev) => [...prev, { question: input, answer: 'Error fetching response' }]);
      setInput('');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRetry = () => {
    if (messages.length === 0) return;
    const lastQuestion = messages[messages.length - 1].question;
    setInput(lastQuestion);
  };

  const handleCopy = () => {
    if (messages.length === 0) return;
    const lastAnswer = messages[messages.length - 1].answer;
    navigator.clipboard.writeText(lastAnswer);
  };

  return (
    <div
      style={{
        maxWidth: 900,
        width: '100%',
        height: '100vh',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: 12 }}>AI chat App</h1>

      {/* Chat messages container */}
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          marginBottom: 12,
          padding: 10,
          border: '1px solid #ccc',
          borderRadius: 8,
          background: 'transparent',
        }}
      >
        {messages.length === 0 && <p style={{ textAlign: 'center' }}>No conversation yet. Ask something!</p>}
        {messages.map(({ question, answer }, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  background: '#e0e0e0',
                  borderRadius: 20,
                  padding: '8px 14px',
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                }}
              >
                Q: {question}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
              <div
                style={{
                  background: '#4f46e5',
                  color: 'white',
                  borderRadius: 20,
                  padding: '8px 14px',
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                  alignSelf: 'flex-start',
                }}
              >
                {answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input container fixed at bottom */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          borderTop: '1px solid #ddd',
          paddingTop: 12,
          paddingBottom: 12,
          backgroundColor: 'white',
          position: 'sticky',
          bottom: 0,
          zIndex: 10,
        }}
      >
        <input type="file" style={{ display: 'none' }} ref={fileInputRef} />

        <button
          onClick={handleFileUploadClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
          }}
          title="Upload file or PDF"
        >
          <UploadCloudIcon size={20} />
        </button>

        <textarea
          rows={1}
          style={{
            flex: 1,
            resize: 'none',
            borderRadius: 20,
            padding: '8px 14px',
            border: '1px solid #ccc',
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              fetchAnswer();
            }
          }}
        />

        <button
          onClick={fetchAnswer}
          disabled={loading || !input.trim()}
          style={{ padding: '8px 16px', borderRadius: 20 }}
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </div>

      {/* Retry and Copy action buttons */}
      {messages.length > 0 && !loading && (
        <Actions className="mt-2" style={{ marginTop: 8, justifyContent: 'center' }}>
          <Action onClick={handleRetry} label="Retry">
            <RefreshCcwIcon className="size-4" />
          </Action>
          <Action onClick={handleCopy} label="Copy">
            <CopyIcon className="size-4" />
          </Action>
        </Actions>
      )}
    </div>
  );
}
