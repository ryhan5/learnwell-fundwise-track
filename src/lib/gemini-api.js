/**
 * Utility functions for interacting with Google's Gemini API
 */
import { generateGeminiResponse } from './gemini-client';

// Mock database of scholarship-related information for context
const scholarshipData = {
  user: {
    name: "Student",
    profileCompletion: 75,
    skills: ["Leadership", "Public Speaking", "Problem Solving", "Critical Thinking", "Time Management"],
    matchScore: 87
  },
  scholarships: [
    {
      id: 1,
      name: "STEM Excellence Scholarship",
      amount: "$5,000",
      deadline: "April 15, 2023",
      daysLeft: 14,
      match: 92,
      requirements: "3.5 GPA, STEM major, essay submission, two recommendation letters",
      description: "For students pursuing degrees in Science, Technology, Engineering, or Mathematics with demonstrated academic excellence."
    },
    {
      id: 2,
      name: "Future Leaders Fund",
      amount: "$2,500",
      deadline: "May 1, 2023",
      daysLeft: 30,
      match: 87,
      requirements: "Leadership experience, community service, personal statement",
      description: "Supports students who have demonstrated leadership potential through school or community activities."
    },
    {
      id: 3,
      name: "Community Service Award",
      amount: "$3,000",
      deadline: "May 30, 2023",
      daysLeft: 59,
      match: 85,
      requirements: "100+ hours of community service, essay about service impact",
      description: "Recognizes students who have made significant contributions to their communities through volunteer service."
    }
  ],
  tasks: [
    { id: 1, name: "Complete personal statement", deadline: "2 days left", priority: "high" },
    { id: 2, name: "Upload transcript", deadline: "5 days left", priority: "medium" },
    { id: 3, name: "Request recommendation letter", deadline: "1 week left", priority: "medium" }
  ]
};

/**
 * Calls the Gemini API to generate a response
 * @param {string} userMessage - The user's message to the chatbot
 * @param {Array} conversationHistory - Array of previous messages in the conversation
 * @param {Object} pageContext - Additional context about the current page
 * @returns {Promise<string>} - The AI response
 */
const callGeminiAPI = async (userMessage, conversationHistory = [], pageContext = {}) => {
  try {
    // Enhance context with scholarship data
    const enhancedContext = {
      ...pageContext,
      scholarshipData: scholarshipData,
    };

    // Call the Gemini API through our client
    const response = await generateGeminiResponse(
      userMessage, 
      conversationHistory, 
      enhancedContext
    );
    
    return response;
  } catch (error) {
    console.error('Error in Gemini API:', error);
    return "I'm having trouble processing your request right now. Please try again later.";
  }
};

export { callGeminiAPI }; 