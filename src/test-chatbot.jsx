import React from 'react';
import GeminiSimple from './components/chatbot/GeminiSimple';

const TestChatbot = () => {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Gemini Simple Test</h1>
      <p>The Gemini chatbot should appear in the bottom-right corner. Click the chat button to open it.</p>
      <div className="mt-4 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Try asking these questions:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>What scholarships match my profile?</li>
          <li>When are my upcoming deadlines?</li>
          <li>How can I improve my profile?</li>
        </ul>
      </div>
      <GeminiSimple />
    </div>
  );
};

export default TestChatbot; 