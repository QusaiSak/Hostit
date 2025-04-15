
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Textarea } from './textarea';
import { Bot, Send, X, Maximize2, Minimize2 } from 'lucide-react';
import { Avatar } from './avatar';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function AiChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI deployment assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    
    // Simulate AI response (in a real app, this would call your AI service)
    setTimeout(() => {
      const aiResponses = [
        "I can help you deploy your application. Would you like me to guide you through the process?",
        "Your deployment looks good! Need any help with configuration or GitHub integration?",
        "I noticed you're using React. Our platform offers optimized builds for React applications.",
        "If you're having trouble with your deployment, I can help troubleshoot the issues.",
        "Looking to add custom domains? I can walk you through the steps to set that up."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-button shadow-lg shadow-launchpad-purple/30 text-white z-40 ${isOpen ? 'hidden' : 'flex'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <Bot size={24} />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isMinimized 
              ? { opacity: 1, y: 0, scale: 0.9, height: '80px', width: '300px' }
              : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-6 right-6 w-80 md:w-96 bg-black/90 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden ${isMinimized ? 'h-20' : 'h-[500px]'}`}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-button">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <Bot className="h-5 w-5" />
                </Avatar>
                <div>
                  <h3 className="font-medium text-white">AI Assistant</h3>
                  <p className="text-xs text-white/70">Deployment Guide</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isMinimized ? (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => setIsMinimized(false)}
                  >
                    <Maximize2 size={16} />
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => setIsMinimized(true)}
                  >
                    <Minimize2 size={16} />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            {/* Chat messages */}
            {!isMinimized && (
              <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-launchpad-purple/80 text-white rounded-br-none'
                          : 'bg-white/10 text-white rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-white/50 mt-1 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Message input */}
            {!isMinimized && (
              <div className="p-4 border-t border-white/10 bg-black/50">
                <form 
                  className="flex items-end space-x-2" 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <Textarea
                    className="min-h-[60px] max-h-[120px] bg-white/10 border-white/20 resize-none text-white"
                    placeholder="Ask me anything about your deployment..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="h-[60px] bg-gradient-button"
                  >
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
