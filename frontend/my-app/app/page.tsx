'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer('Error fetching response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Ask Gemini AI</h1>
      <textarea
        rows={5}
        style={{ width: '100%' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your question here..."
      />
      <button onClick={handleAsk} disabled={loading || !input.trim()}>
        {loading ? 'Thinking...' : 'Ask'}
      </button>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{answer}</pre>
    </main>
  );
}
