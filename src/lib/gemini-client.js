import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuration
const GEMINI_CONFIG = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || "",
  modelName: "gemini-1.5-pro", // Use the latest model
  useMockResponses: true, // Temporarily enable mock responses for testing
};

// Log the API key to console (partially hidden for security)
console.log("Gemini API Key exists:", !!GEMINI_CONFIG.apiKey);
console.log("API Key partial:", GEMINI_CONFIG.apiKey ? `...${GEMINI_CONFIG.apiKey.slice(-6)}` : "Not set");

// History format converter from our internal format to Gemini API format
const formatHistoryForGemini = (messages) => {
  return messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
};

/**
 * Initializes the Gemini client with the provided API key
 * @returns {Object} - Gemini client instance or null if no API key is available
 */
const initializeGeminiClient = () => {
  console.log("Initializing Gemini client...");
  console.log("useMockResponses:", GEMINI_CONFIG.useMockResponses);
  
  if (!GEMINI_CONFIG.apiKey && !GEMINI_CONFIG.useMockResponses) {
    console.warn("No Gemini API key found. Set VITE_GEMINI_API_KEY in your environment or use mock responses.");
    return null;
  }

  if (GEMINI_CONFIG.useMockResponses) {
    console.info("Using mock Gemini responses. Set useMockResponses to false to use the real API.");
    return null;
  }

  try {
    console.log("Creating GoogleGenerativeAI with API key...");
    const genAI = new GoogleGenerativeAI(GEMINI_CONFIG.apiKey);
    console.log("Getting model:", GEMINI_CONFIG.modelName);
    return genAI.getGenerativeModel({ model: GEMINI_CONFIG.modelName });
  } catch (error) {
    console.error("Error initializing Gemini client:", error);
    return null;
  }
};

// Initialize the client
const geminiClient = initializeGeminiClient();

/**
 * Generates a response from Gemini API
 * @param {string} message - The user's message
 * @param {Array} history - Conversation history in our internal format
 * @param {Object} context - Additional context information
 * @returns {Promise<string>} - The AI response
 */
const generateGeminiResponse = async (message, history = [], context = {}) => {
  console.log("generateGeminiResponse called with message:", message);
  console.log("Using mock responses:", GEMINI_CONFIG.useMockResponses);
  
  if (GEMINI_CONFIG.useMockResponses) {
    console.log("Using mock implementation");
    // We'll use our mock implementation
    return mockGenerateResponse(message, history, context);
  }

  if (!geminiClient) {
    console.error("Gemini client not initialized");
    throw new Error("Gemini client not initialized. Please check your API key.");
  }

  try {
    console.log("Formatting conversation history for Gemini");
    // Format conversation history for Gemini
    const formattedHistory = formatHistoryForGemini(history);

    // Generate prompt with system instructions and context
    const systemInstructions = getSystemInstructions(context);
    console.log("System instructions generated");
    
    // Start a chat session
    console.log("Starting chat session with Gemini");
    const chat = geminiClient.startChat({
      history: formattedHistory,
      systemInstruction: systemInstructions,
    });

    // Send the message and get a response
    console.log("Sending message to Gemini API");
    const result = await chat.sendMessage(message);
    const response = result.response.text();
    console.log("Received response from Gemini API");
    
    return response;
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    throw error;
  }
};

/**
 * Creates system instructions for Gemini based on context
 * @param {Object} context - Context about the current page and user
 * @returns {string} - System instructions
 */
const getSystemInstructions = (context) => {
  return `You are LearnLeap AI, an assistant dedicated to helping students find and apply for scholarships. 
Your goal is to provide helpful, accurate information about scholarship opportunities, application processes, 
and strategies for success.

Current context: The user is currently on the ${context.pageName || 'dashboard'} page of the LearnLeap platform.

Guidelines:
- Be concise and direct in your responses.
- Provide specific, actionable advice when possible.
- When referencing deadlines or scholarship details, be accurate and precise.
- If asked about a specific scholarship, provide details about requirements, deadlines, and application processes.
- For personal statements or essays, offer constructive feedback and suggestions for improvement.
- If you don't know an answer, acknowledge that and suggest where the user might find that information.

Always maintain a helpful, encouraging tone and focus on empowering students in their educational journey.`;
};

/**
 * Mock implementation of Gemini API for development without an API key
 * @param {string} message - The user's message
 * @param {Array} history - Conversation history
 * @param {Object} context - Additional context
 * @returns {Promise<string>} - Mocked response
 */
const mockGenerateResponse = async (message, history = [], context = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Sample responses based on keywords
  const lowerCaseMessage = message.toLowerCase();
  
  // Scholarship information
  if (lowerCaseMessage.includes('scholarship') && lowerCaseMessage.includes('requirement')) {
    return "Most scholarships require a combination of academic achievement (GPA), extracurricular activities, and personal statements. Some scholarships also have specific eligibility criteria like field of study, background, or financial need. I can help you find scholarships that match your profile and explain their specific requirements.";
  }
  
  // Profile completion
  if (lowerCaseMessage.includes('profile') || lowerCaseMessage.includes('complete')) {
    return "Your profile is currently 75% complete. To improve it, consider adding more details about your academic achievements, extracurricular activities, leadership positions, and career goals. This will help match you with more relevant scholarships and improve your chances of success.";
  }
  
  // Deadlines
  if (lowerCaseMessage.includes('deadline') || lowerCaseMessage.includes('due')) {
    return "Your closest deadline is for the STEM Excellence Scholarship in 14 days (April 15, 2023). You should prioritize completing your personal statement and requesting recommendation letters for this application.";
  }
  
  // Best matches
  if (lowerCaseMessage.includes('match') || lowerCaseMessage.includes('best')) {
    return "Your best match (92%) is the STEM Excellence Scholarship worth $5,000. This scholarship aligns well with your academic achievements and career goals. It requires a 3.5 GPA, STEM major focus, an essay submission, and two recommendation letters. Would you like help with any of these components?";
  }
  
  // Tasks or prioritization
  if (lowerCaseMessage.includes('task') || lowerCaseMessage.includes('prioritize')) {
    return "I recommend prioritizing 'Complete personal statement' which is due in 2 days. This is marked as high priority and will impact multiple scholarship applications. After that, focus on 'Upload transcript' (5 days left) and then 'Request recommendation letter' (1 week left).";
  }
  
  // Skills or improvement
  if (lowerCaseMessage.includes('skill') || lowerCaseMessage.includes('improve')) {
    return "Based on your profile, you have strengths in Leadership, Public Speaking, Problem Solving, Critical Thinking, and Time Management. To improve your scholarship matches, you might consider developing additional skills in research, technical writing, or specific subject expertise related to your field of study.";
  }
  
  // Application process
  if (lowerCaseMessage.includes('application') || lowerCaseMessage.includes('apply')) {
    return "For scholarship applications, you'll need to prepare: 1) Personal statement/essay, 2) Academic transcripts, 3) Letters of recommendation, 4) List of achievements and activities, and sometimes 5) Financial need documentation. Would you like tips on writing a strong personal statement?";
  }
  
  // Fundraising
  if (lowerCaseMessage.includes('fundraising') || lowerCaseMessage.includes('campaign')) {
    return "To create an effective fundraising campaign, focus on telling your authentic story, setting a realistic goal, sharing with your network, and providing regular updates. The most successful campaigns clearly explain why education matters to you and how donors' contributions will make a difference.";
  }
  
  // Essay or personal statement
  if (lowerCaseMessage.includes('personal statement') || lowerCaseMessage.includes('essay')) {
    return "For a standout personal statement: 1) Be authentic and show your unique voice, 2) Connect your experiences to your future goals, 3) Demonstrate how you've overcome challenges, 4) Be specific rather than general, and 5) Proofread carefully. Would you like me to review your draft once it's ready?";
  }
  
  // Help or assistance
  if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('assist')) {
    return "I can help you find scholarships that match your profile, complete applications, improve your personal statement, track deadlines, and develop skills that make you more competitive. What specific aspect of your scholarship journey would you like assistance with today?";
  }
  
  // Thank you
  if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
    return "You're welcome! I'm here to help with any other questions about scholarships, applications, or your educational journey. Is there anything else you'd like to know?";
  }
  
  // Document upload
  if (lowerCaseMessage.includes('document') || lowerCaseMessage.includes('upload') || lowerCaseMessage.includes('essay review')) {
    return "I'd be happy to help review your document. You can upload it using the paperclip icon in the chat. I can provide feedback on content, structure, grammar, and overall effectiveness for scholarship applications.";
  }
  
  // Default response
  return "I can help with scholarship matches, application tips, deadline reminders, and profile optimization. What specific aspect of your scholarship journey would you like assistance with today?";
};

export { generateGeminiResponse, GEMINI_CONFIG }; 