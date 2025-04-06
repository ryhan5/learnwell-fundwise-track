import { createContext, useContext, useState } from 'react';
import Gemini from './Gemini';
import { callGeminiAPI } from '@/lib/gemini-api';

const GeminiContext = createContext({
  isOpen: false,
  messages: [],
  openChat: () => {},
  closeChat: () => {},
  toggleChat: () => {},
  sendMessage: () => {},
  setMessages: () => {},
});

export const useGemini = () => useContext(GeminiContext);

export const GeminiProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there! I'm your LearnLeap assistant. How can I help you today?" }
  ]);

  console.log("GeminiProvider rendering, isOpen:", isOpen);

  const openChat = () => {
    console.log("openChat called, setting isOpen to true");
    setIsOpen(true);
  };
  
  const closeChat = () => {
    console.log("closeChat called, setting isOpen to false");
    setIsOpen(false);
  };
  
  const toggleChat = () => {
    console.log("toggleChat called, toggling isOpen");
    setIsOpen(prev => !prev);
  };

  const sendMessage = async (message, conversationHistory, pageContext) => {
    try {
      // Add user message to chat
      setMessages(prev => [...prev, { role: 'user', content: message }]);
      
      // Call the Gemini API
      const response = await callGeminiAPI(message, conversationHistory, pageContext);
      
      // Add assistant response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble processing your request right now. Please try again later." 
      }]);
      throw error;
    }
  };

  return (
    <GeminiContext.Provider
      value={{
        isOpen,
        messages,
        openChat,
        closeChat,
        toggleChat,
        sendMessage,
        setMessages,
      }}
    >
      {children}
      <Gemini />
    </GeminiContext.Provider>
  );
};

export default GeminiProvider; 