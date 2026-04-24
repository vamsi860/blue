import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { WelcomeScreen } from './WelcomeScreen';
import { Message, chatWithGeminiStream } from '@/src/services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../Layout/Sidebar';

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage];
      const stream = chatWithGeminiStream(chatHistory);
      
      let modelReply = '';
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      for await (const chunk of stream) {
        modelReply += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = modelReply;
          return newMessages;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev, 
        { role: 'model', content: "I'm sorry, I encountered an error. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => setMessages([]);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#312e81] text-slate-100 overflow-hidden font-sans">
      <Sidebar 
        onNewChat={resetChat} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Header */}
        <header className="h-16 flex items-center px-8 bg-white/5 backdrop-blur-md border-b border-white/5 flex-shrink-0 z-10 shadow-lg shadow-black/10">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg mr-2 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-white italic">bluekite<span className="text-blue-400">.ai</span></span>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-4">
             <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Status:</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
            </div>
            <span className="text-[10px] font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-md uppercase tracking-wider">Kite-Core 4.5</span>
          </div>
        </header>

        {/* Content Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar"
        >
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <WelcomeScreen onSuggest={handleSend} />
            ) : (
              <div className="flex flex-col py-4">
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} role={msg.role} content={msg.content} />
                ))}
                {isLoading && messages[messages.length-1]?.role === 'user' && (
                  <div className="px-8 flex justify-start gap-4 mb-8">
                    <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center animate-pulse shadow-lg shadow-blue-500/20">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="bg-blue-600/10 backdrop-blur-md p-4 rounded-2xl rounded-tl-none border border-blue-400/20 shadow-2xl flex items-center">
                      <div className="flex space-x-1 items-center">
                        <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="h-40 flex-shrink-0" />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 py-4 px-2">
          <ChatInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};
