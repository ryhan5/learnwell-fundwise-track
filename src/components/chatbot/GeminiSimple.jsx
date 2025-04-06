import React, { useState, useEffect, useRef } from 'react';
import { generateResponse } from '@/lib/simplified-gemini-client';
import { 
  MessageCircle, 
  Send, 
  X, 
  Award, 
  GraduationCap, 
  Target, 
  Clock, 
  Calendar,
  Zap,
  Search,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles,
  User,
  Bot
} from 'lucide-react';
import ScholarshipCard from './ScholarshipCard';
import SkillCard from './SkillCard';
import SkillAssessment from './SkillAssessment';

const GeminiSimple = ({ initialOpen = false, onStateChange }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there! I'm your LearnLeap assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showTopics, setShowTopics] = useState(false);
  const [showSkillAssessment, setShowSkillAssessment] = useState(false);
  const messagesEndRef = useRef(null);

  // Scholarship-related suggestion chips
  const scholarshipSuggestions = [
    "Find scholarships matching my profile",
    "How can I improve my scholarship chances?",
    "What are the upcoming scholarship deadlines?",
    "Tips for writing scholarship essays"
  ];
  
  // Skills-related suggestion chips
  const skillSuggestions = [
    "How can I showcase my leadership skills?",
    "What skills are most valued for scholarships?",
    "How to improve my public speaking skills",
    "Skills needed for STEM scholarships"
  ];

  // Categories for quick topic access
  const topicCategories = [
    { 
      name: "Scholarships",
      icon: <Award className="w-4 h-4" />,
      suggestions: scholarshipSuggestions
    },
    { 
      name: "Skills",
      icon: <Target className="w-4 h-4" />,
      suggestions: skillSuggestions
    },
    { 
      name: "Deadlines",
      icon: <Clock className="w-4 h-4" />,
      suggestions: [
        "What are my upcoming deadlines?",
        "How to manage application deadlines?",
        "Set a deadline reminder",
        "Prioritize my scholarship applications"
      ]
    },
    { 
      name: "Applications",
      icon: <FileText className="w-4 h-4" />,
      suggestions: [
        "Tips for my scholarship application",
        "How to make my application stand out",
        "Common application mistakes to avoid",
        "Required documents for applications"
      ]
    },
    {
      name: "Assessment",
      icon: <Zap className="w-4 h-4" />,
      action: () => {
        setMessages(prev => [...prev, { 
          role: 'user', 
          content: 'I would like to take a skill assessment' 
        }]);
        
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: 'I can help you assess your skills! This short assessment will help me provide better scholarship recommendations and skill development tips.' 
          }]);
          setShowTopics(false);
          setShowSkillAssessment(true);
        }, 1000);
      }
    }
  ];

  // Update isOpen when initialOpen prop changes
  useEffect(() => {
    setIsOpen(initialOpen);
  }, [initialOpen]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Notify parent component when isOpen state changes
  useEffect(() => {
    if (onStateChange) {
      onStateChange(isOpen);
    }
  }, [isOpen, onStateChange]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Special handling for skill assessment
    if (userMessage.toLowerCase().includes('skill') && 
        (userMessage.toLowerCase().includes('assess') || 
         userMessage.toLowerCase().includes('test') || 
         userMessage.toLowerCase().includes('evaluate'))) {
      
      // Add user message to chat
      setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
      
      // Hide suggestions after user sends a message
      setShowSuggestions(false);
      
      // Wait briefly before showing the assistant's response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'I can help you assess your skills! This short assessment will help me provide better scholarship recommendations and skill development tips.' 
        }]);
        setShowSkillAssessment(true);
      }, 1000);
      
      return;
    }
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Hide suggestions after user sends a message
    setShowSuggestions(false);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Call the generateResponse function
      const response = await generateResponse(userMessage);
      
      // Add assistant response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
      // Show suggestions again after getting a response
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble processing your request right now. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSendMessage({ preventDefault: () => {} });
  };
  
  // New handler for closing the chatbot
  const handleClose = () => {
    setIsOpen(false);
  };

  // Helper function to parse rich content from message
  const renderMessageContent = (content) => {
    if (typeof content !== 'string') return <p className="text-sm whitespace-pre-line">{content}</p>;
    
    // Check for special markers in the message to display rich content
    if (content.includes('[SKILL_CARD]')) {
      try {
        const jsonStr = content.split('[SKILL_CARD]')[1].split('[/SKILL_CARD]')[0];
        const skillData = JSON.parse(jsonStr);
        return (
          <>
            <p className="text-sm whitespace-pre-line mb-2">
              {content.split('[SKILL_CARD]')[0]}
            </p>
            <SkillCard skill={skillData} />
            <p className="text-sm whitespace-pre-line mt-2">
              {content.split('[/SKILL_CARD]')[1] || ''}
            </p>
          </>
        );
      } catch (error) {
        console.error('Failed to parse skill card data:', error);
        return <p className="text-sm whitespace-pre-line">{content}</p>;
      }
    }
    
    if (content.includes('[SCHOLARSHIP_CARD]')) {
      try {
        const jsonStr = content.split('[SCHOLARSHIP_CARD]')[1].split('[/SCHOLARSHIP_CARD]')[0];
        const scholarshipData = JSON.parse(jsonStr);
        return (
          <>
            <p className="text-sm whitespace-pre-line mb-2">
              {content.split('[SCHOLARSHIP_CARD]')[0]}
            </p>
            <ScholarshipCard scholarship={scholarshipData} />
            <p className="text-sm whitespace-pre-line mt-2">
              {content.split('[/SCHOLARSHIP_CARD]')[1] || ''}
            </p>
          </>
        );
      } catch (error) {
        console.error('Failed to parse scholarship card data:', error);
        return <p className="text-sm whitespace-pre-line">{content}</p>;
      }
    }
    
    // Default text rendering
    return <p className="text-sm whitespace-pre-line">{content}</p>;
  };

  // Add handler for assessment completion
  const handleAssessmentComplete = (results) => {
    if (results) {
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: 'I completed the skill assessment.' 
      }]);
      
      // Set loading state
      setIsLoading(true);
      
      // Format results for a nice message
      const skillsList = Object.entries(results)
        .map(([skill, score]) => `${skill}: ${score}/5`)
        .join('\n');
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Thank you for completing the skill assessment! Here are your results:\n\n${skillsList}\n\nBased on these results, I can help you find scholarships that match your strengths or suggest ways to improve in areas that need development. Would you like scholarship recommendations or skill improvement tips?` 
        }]);
        setIsLoading(false);
        setShowSuggestions(true);
      }, 1500);
    }
    
    setShowSkillAssessment(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      {/* Chat Icon Button */}
      {!isOpen && (
        <button
          className="bg-gradient-to-r from-primary to-accent text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="bg-card border rounded-lg shadow-xl flex flex-col w-80 sm:w-96 h-[500px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-3 border-b bg-gradient-to-r from-background to-card rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-medium text-primary">LearnLeap AI</h3>
            </div>
            <button
              className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleClose}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Topic Quick Access Menu */}
          <div className="border-b">
            <button
              onClick={() => setShowTopics(!showTopics)}
              className="w-full px-3 py-2 text-sm text-left text-muted-foreground hover:bg-secondary/20 transition-colors flex items-center justify-between"
            >
              <span className="font-medium">Popular Topics</span>
              {showTopics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showTopics && (
              <div className="p-3 grid grid-cols-2 gap-2">
                {topicCategories.map((category, idx) => (
                  <button
                    key={idx}
                    className="flex flex-col items-center justify-center p-2 rounded-lg border border-border hover:bg-secondary/20 transition-all text-center"
                    onClick={() => {
                      setShowTopics(false);
                      if (category.action) {
                        category.action();
                      } else {
                        handleSuggestionClick(`Tell me about ${category.name.toLowerCase()}`);
                      }
                    }}
                  >
                    <div className="bg-primary/10 p-1.5 rounded-full mb-1">
                      {category.icon}
                    </div>
                    <span className="text-xs font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={
                    message.role === 'user'
                      ? "bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%] rounded-tr-none"
                      : "bg-secondary text-secondary-foreground p-3 rounded-lg max-w-[80%] rounded-tl-none"
                  }
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.role === 'assistant' ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="text-xs font-medium">
                      {message.role === 'assistant' ? 'LearnLeap AI' : 'You'}
                    </span>
                  </div>
                  {renderMessageContent(message.content)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground p-3 rounded-lg max-w-[80%] rounded-tl-none">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs font-medium">LearnLeap AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
                    <span className="text-sm ml-1">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestion Chips */}
            {showSuggestions && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {messages.length <= 2 ? (
                    // Initial suggestions mix
                    [...scholarshipSuggestions.slice(0, 2), ...skillSuggestions.slice(0, 2)].map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))
                  ) : (
                    // Context-based suggestions after conversation started
                    (messages[messages.length - 2].content.toLowerCase().includes('skill') ? 
                      skillSuggestions : scholarshipSuggestions).slice(0, 3).map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendMessage}
            className="border-t p-3 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about scholarships or skills..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 disabled:opacity-50 transition-colors"
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Skill Assessment Panel */}
          {showSkillAssessment && (
            <div className="absolute inset-0 z-[110] bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <div className="w-5/6 max-h-[90%] overflow-y-auto bg-card border rounded-lg shadow-lg p-4">
                <SkillAssessment onComplete={handleAssessmentComplete} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiSimple; 