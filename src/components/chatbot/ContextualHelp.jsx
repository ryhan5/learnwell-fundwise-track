import React from 'react';
import { Sparkles, ChevronRight, MessageCircle, LightbulbIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGemini } from './GeminiProvider';
import { cn } from '@/lib/utils';

/**
 * A contextual help component that suggests AI assistance based on the current view
 */
const ContextualHelp = ({ 
  context,
  title = "Need help?", 
  suggestions = [], 
  className,
  variant = 'card',
}) => {
  const { openChat } = useGemini();

  // Generate a specific message to send to the chatbot based on context
  const handleSuggestionClick = (suggestion) => {
    // Open the chatbot
    openChat();
    
    // The actual message sending would be handled by the Gemini context in a real implementation
    console.log(`Sending suggestion to chatbot: ${suggestion}`);
  };

  const variantStyles = {
    card: 'bg-card border rounded-lg shadow-sm p-4',
    inset: 'bg-secondary/20 rounded-lg p-3',
    minimal: 'bg-transparent p-0',
  };

  return (
    <div className={cn(variantStyles[variant], className)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-primary/10 p-1 rounded-full">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>

      {/* Context-based suggestions */}
      <div className="space-y-2">
        {suggestions.map((suggestion, idx) => (
          <motion.button
            key={idx}
            className="w-full text-left flex items-center justify-between py-2 px-3 text-sm rounded-md hover:bg-secondary transition-colors"
            onClick={() => handleSuggestionClick(suggestion)}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="flex items-center gap-2">
              <LightbulbIcon className="w-4 h-4 text-primary/70" />
              <span>{suggestion}</span>
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      {/* Chat with AI button */}
      <button 
        onClick={openChat}
        className="w-full mt-3 flex items-center justify-center gap-2 text-primary text-sm font-medium hover:underline"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Chat with AI Assistant</span>
      </button>
    </div>
  );
};

export default ContextualHelp; 