'use client';

import { useState, useTransition } from 'react';
import { askQuestion } from './actions';

export default function AnswersPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleAsk = () => {
    startTransition(async () => {
      const response = await askQuestion(question);
      setAnswer(response);
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ask Gemini a Question</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question..."
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleAsk}
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isPending ? 'Thinking...' : 'Ask Gemini'}
      </button>

      {answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded border">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
