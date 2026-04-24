import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, StopCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  onStop?: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading, onStop }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="max-w-4xl mx-auto w-full px-4 mb-8">
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full opacity-50 group-focus-within:opacity-100 transition-opacity"></div>
        <div className="relative flex items-center bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[2rem] p-2 pr-4 shadow-2xl focus-within:border-blue-400/50 transition-all">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Bluekite AI..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-[200px] py-3 px-6 text-white text-base leading-relaxed placeholder:text-white/20"
            rows={1}
          />
          
          <div className="flex items-end pb-1 pl-2">
            {isLoading ? (
              <button
                onClick={onStop}
                className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <StopCircle size={20} />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={cn(
                  "p-3 rounded-full transition-all",
                  input.trim() 
                    ? "bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/20 active:scale-95" 
                    : "bg-white/5 text-white/20"
                )}
              >
                <ArrowUp size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
      <p className="text-[10px] text-center text-white/20 font-medium tracking-wider uppercase mt-4">
        bluekite.ai may provide inaccurate data. Verify critical info.
      </p>
    </div>
  );
};
