import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize, Maximize, Sparkles, Bot, User, Loader2, Paperclip, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import useGeminiSuggestions from '@/hooks/useGeminiSuggestions';
import { useLocation } from 'react-router-dom';
import FileUpload from './FileUpload';
import { useGemini } from './GeminiProvider';

const Gemini = () => {
  const { isOpen, messages, openChat, closeChat, sendMessage, setMessages } = useGemini();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const messagesEndRef = useRef(null);
  const suggestions = useGeminiSuggestions();
  const location = useLocation();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Get conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Get page context
      const pageContext = {
        currentPath: location.pathname,
        pageName: location.pathname.split('/').pop() || 'home'
      };
      
      // Call the sendMessage function from context
      await sendMessage(userMessage, conversationHistory, pageContext);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSendMessage({ preventDefault: () => {} });
  };

  const handleFileUpload = async (file) => {
    // Add a message about the file upload
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: `I've uploaded a file: ${file.name}`,
      attachment: {
        name: file.name,
        size: file.size,
        type: file.type
      }
    }]);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would send the file to the backend for processing
      // and then get a response from the Gemini API
      
      // Add a mock response based on file type
      let response;
      const fileExtension = file.name.split('.').pop().toLowerCase();
      
      if (['pdf', 'doc', 'docx'].includes(fileExtension)) {
        response = "I've analyzed your document. It appears to be a well-structured document with good formatting. To improve it, consider adding more specific examples of your achievements and quantifying your impact where possible. Would you like more detailed feedback on any specific section?";
      } else if (fileExtension === 'txt') {
        response = "I've reviewed your text file. The content is clear, but you could strengthen it by incorporating more specific details about your educational background and connecting your experiences to your future goals. Would you like suggestions for improving any particular paragraph?";
      } else {
        response = "I've received your file. I can see it contains information that could be relevant to your scholarship applications. Would you like me to analyze any specific aspect of this document?";
      }
      
      // Add assistant response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
      // Close the file upload panel
      setShowFileUpload(false);
    } catch (error) {
      console.error("Error processing file:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble processing your file right now. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // After the existing useEffect
  useEffect(() => {
    console.log("Gemini component: isOpen changed to", isOpen);
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      {/* Chat Icon Button */}
      {!isOpen && (
        <motion.button
          className="bg-gradient-to-r from-primary to-accent text-white rounded-full p-3 shadow-lg hover:shadow-xl flex items-center justify-center"
          onClick={openChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat Interface (AnimatePresence temporarily removed) */}
        {isOpen && (
          <motion.div
            className={cn(
              "bg-card border rounded-lg shadow-xl flex flex-col",
              isMinimized ? "w-72 h-14" : "w-80 sm:w-96 h-[500px]"
            )}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat Header */}
            <div className="p-3 border-b bg-gradient-to-r from-background to-card rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-medium text-primary">LearnLeap AI</h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize className="w-4 h-4" /> : <Minimize className="w-4 h-4" />}
                </button>
                <button
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  onClick={closeChat}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* File Upload Panel */}
            {!isMinimized && showFileUpload && (
              <div className="p-4 border-b bg-background/50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium">Upload Document</h4>
                  <button
                    className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowFileUpload(false)}
                  >
                    {showFileUpload ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                  </button>
                </div>
                <FileUpload onFileUpload={handleFileUpload} />
                <p className="text-xs text-muted-foreground mt-3">
                  Upload a document for AI analysis. We accept essays, personal statements, 
                  resumes, and other scholarship-related documents.
                </p>
              </div>
            )}

            {/* Chat Messages */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] p-3 rounded-lg",
                        message.role === 'user'
                          ? "bg-primary text-primary-foreground ml-auto rounded-tr-none"
                          : "bg-secondary text-secondary-foreground mr-auto rounded-tl-none"
                      )}
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
                      <p className="text-sm">{message.content}</p>
                      
                      {/* File Attachment */}
                      {message.attachment && (
                        <div className="mt-2 bg-background/40 rounded p-2 text-xs flex items-center gap-2">
                          <Paperclip className="w-3 h-3" />
                          <span className="truncate">{message.attachment.name}</span>
                          <span className="text-muted-foreground">
                            ({(message.attachment.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Show suggestions if no messages or after assistant's last message */}
                {messages.length === 1 || messages[messages.length - 1].role === 'assistant' ? (
                  <div className="flex flex-col space-y-2 mt-2">
                    <p className="text-xs text-muted-foreground">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="w-4 h-4" />
                        <span className="text-xs font-medium">LearnLeap AI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Chat Input */}
            {!isMinimized && (
              <form
                onSubmit={handleSendMessage}
                className="border-t p-3 flex items-center gap-2"
              >
                <button
                  type="button"
                  className={cn(
                    "p-2 rounded-full",
                    showFileUpload 
                      ? "bg-primary/20 text-primary" 
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                  onClick={() => setShowFileUpload(!showFileUpload)}
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Ask about scholarships..."
                  className="flex-1 bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={cn(
                    "p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50",
                    isLoading || !input.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"
                  )}
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        )}
      {/* </AnimatePresence> */}
    </div>
  );
};

export default Gemini;