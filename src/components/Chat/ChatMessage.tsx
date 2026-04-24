import React from 'react';
import Markdown from 'react-markdown';
import { cn } from '@/src/lib/utils';
import { User, Bot } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatMessageProps {
  role: 'user' | 'model';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full gap-4 py-8 px-4 sm:px-6 lg:px-8",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex gap-4 max-w-[85%] sm:max-w-[75%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <div className="flex-shrink-0 pt-1">
          <div className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center shadow-lg",
            isUser ? "bg-slate-700 text-white shadow-slate-900/20" : "bg-blue-500 text-white shadow-blue-500/20"
          )}>
            {isUser ? <User size={20} /> : <Bot size={20} />}
          </div>
        </div>
        
        <div className={cn(
          "bg-white/5 backdrop-blur-md p-6 rounded-2xl border shadow-xl",
          isUser ? "bg-white/10 border-white/10 rounded-tr-none text-right" : "bg-blue-600/10 border-blue-400/20 rounded-tl-none text-left"
        )}>
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "font-bold text-[10px] uppercase tracking-wider text-white/40",
              isUser ? "ml-auto" : "mr-auto"
            )}>
              {isUser ? "User" : "Bluekite AI"}
            </span>
          </div>
          <div className={cn("prose prose-blue max-w-none text-slate-100", isUser ? "text-right" : "text-left")}>
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
