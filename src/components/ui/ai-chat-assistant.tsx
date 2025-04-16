
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Textarea } from './textarea';
import { Bot, Send, X, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import { Avatar } from './avatar';
import { generateAiResponse, AiMessage } from '@/services/aiService';
import { toast } from '@/components/ui/sonner';

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
      content: "Hi there! I'm your HostIT assistant. How can I help you with your deployment needs today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to the bottom of the messages when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || isProcessing) return;
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    setIsProcessing(true);
    
    try {
      // Convert our messages to the format expected by the AI service
      const messageHistory: AiMessage[] = messages
        .filter(msg => msg.id !== '1') // Skip the initial greeting
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content,
        }));
      
      // Add the latest user message
      messageHistory.push({
        role: 'user',
        content: userMsg.content,
      });
      
      // Get response from AI service
      const aiResponse = await generateAiResponse(messageHistory);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get an AI response. Please try again.");
      
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Function to format code blocks in messages
  const formatMessageContent = (content: string) => {
    // Check if the message contains code blocks
    if (content.includes('```')) {
      // Split by code blocks
      const parts = content.split(/(```[\s\S]*?```)/g);
      
      return parts.map((part, i) => {
        // Check if this part is a code block
        if (part.startsWith('```') && part.endsWith('```')) {
          // Extract the code and language
          const codeContent = part.slice(3, -3);
          const firstLineBreak = codeContent.indexOf('\n');
          const language = firstLineBreak > 0 ? codeContent.slice(0, firstLineBreak).trim() : '';
          const code = firstLineBreak > 0 ? codeContent.slice(firstLineBreak + 1) : codeContent;
          
          return (
            <pre key={i} className="bg-black/40 p-3 rounded-md my-2 overflow-x-auto">
              {language && <div className="text-xs text-gray-400 mb-1">{language}</div>}
              <code>{code}</code>
            </pre>
          );
        }
        
        // Handle paragraphs for non-code parts
        return <span key={i} className="whitespace-pre-wrap">{part}</span>;
      });
    }
    
    return <span className="whitespace-pre-wrap">{content}</span>;
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
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-blue-700 to-indigo-700">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <Bot className="h-5 w-5" />
                </Avatar>
                <div>
                  <h3 className="font-medium text-white">HostIT Assistant</h3>
                  <p className="text-xs text-white/70">Powered by Gemini Flash</p>
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
              <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin bg-gradient-to-b from-black/60 to-gray-900/60">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-white/10 text-white rounded-bl-none'
                      }`}
                    >
                      <div className="text-sm">
                        {formatMessageContent(message.content)}
                      </div>
                      <p className="text-xs text-white/50 mt-1 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-white rounded-lg rounded-bl-none p-3">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                        <span className="text-sm text-blue-300">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
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
                    placeholder="Ask me about HostIT features..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isProcessing}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="h-[60px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={isProcessing}
                  >
                    {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send size={18} />}
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
