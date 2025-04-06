import React, { useState } from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import GeminiSimple from './GeminiSimple';

/**
 * A standalone button component that can be integrated into various pages
 * for quick access to the Gemini chatbot
 */
const ChatbotButton = ({ 
  variant = 'default', 
  className, 
  withLabel = false,
  label = 'Get AI Help',
}) => {
  // State to control the GeminiSimple component visibility
  const [showChatbot, setShowChatbot] = useState(false);

  const handleClick = () => {
    console.log("ChatbotButton clicked");
    setShowChatbot(true);
    console.log("showChatbot set to true");
  };
  
  // Handler to close the chatbot
  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  const variantStyles = {
    default: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    outline: 'bg-background hover:bg-secondary border border-primary/30 text-foreground',
    ghost: 'bg-transparent hover:bg-secondary text-foreground',
    secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
    accent: 'bg-accent hover:bg-accent/90 text-accent-foreground',
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm',
          variantStyles[variant],
          className
        )}
      >
        {variant === 'outline' || variant === 'ghost' ? (
          <MessageCircle className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
        {withLabel && <span>{label}</span>}
      </button>

      {/* This will conditionally render the GeminiSimple component with props */}
      {showChatbot && (
        <GeminiSimpleController 
          initialOpen={true} 
          onClose={handleCloseChatbot} 
        />
      )}
    </>
  );
};

// A wrapper for GeminiSimple that can be controlled with props
const GeminiSimpleController = ({ initialOpen = false, onClose }) => {
  // We'll handle detecting when the chatbot is closed here
  const [isVisible, setIsVisible] = useState(initialOpen);
  
  // When the internal state of GeminiSimple changes to closed,
  // we want to notify the parent component
  const handleStateChange = (isOpen) => {
    setIsVisible(isOpen);
    if (!isOpen && onClose) {
      onClose();
    }
  };
  
  // When this component unmounts, also notify parent
  React.useEffect(() => {
    return () => {
      if (onClose) onClose();
    };
  }, [onClose]);
  
  // Enhanced version of GeminiSimple with state change notification
  return (
    <GeminiSimple 
      initialOpen={initialOpen} 
      onStateChange={handleStateChange}
    />
  );
};

export default ChatbotButton; 