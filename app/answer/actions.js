// app/answers/actions.js
'use server';

import { generateAnswer } from '@/lib/gemini';

export async function askQuestion(question) {
  if (!question) return 'Please enter a valid question.';
  try {
    const response = await generateAnswer(question);
    return response;
  } catch (err) {
    console.error(err);
    return 'Error getting answer from Gemini.';
  }
}
