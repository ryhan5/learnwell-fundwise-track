import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that provides contextual suggestions for the Gemini chatbot
 * based on the current page and user context
 */
const useGeminiSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Generate suggestions based on the current path
    generateSuggestionsForPath(location.pathname);
  }, [location.pathname]);

  const generateSuggestionsForPath = (path) => {
    let contextualSuggestions = [];

    // Default suggestions available on all pages
    const defaultSuggestions = [
      "How can I improve my scholarship matches?",
      "What are the upcoming deadlines?",
    ];

    // Page-specific suggestions
    switch (path) {
      case '/':
        contextualSuggestions = [
          "Tell me about the latest scholarship opportunities",
          "How do I get started with LearnLeap?",
          "What are the most popular scholarships right now?",
        ];
        break;
      
      case '/dashboard':
        contextualSuggestions = [
          "How can I complete my profile?", 
          "Explain my scholarship stats",
          "What tasks should I prioritize?",
          "How can I increase my match percentage?",
        ];
        break;
      
      case '/scholarships':
        contextualSuggestions = [
          "Which scholarship has the best match for me?",
          "What are the requirements for STEM Excellence Scholarship?",
          "Help me filter scholarships by deadline",
          "What documents do I need for applications?",
        ];
        break;
      
      case '/fundraising':
        contextualSuggestions = [
          "How can I start a fundraising campaign?",
          "What are the best practices for fundraising?",
          "How do I share my fundraising page?",
          "What should I include in my fundraising story?",
        ];
        break;
      
      case '/profile':
        contextualSuggestions = [
          "What skills should I highlight on my profile?",
          "How do I add extracurricular activities?",
          "What academic achievements matter most?",
          "How can I make my personal statement stand out?",
        ];
        break;
      
      default:
        contextualSuggestions = [
          "I'm looking for scholarships",
          "How does LearnLeap work?",
        ];
        break;
    }

    // Combine default with contextual suggestions and set a maximum of 5
    setSuggestions([...contextualSuggestions, ...defaultSuggestions].slice(0, 5));
  };

  return suggestions;
};

export default useGeminiSuggestions; 