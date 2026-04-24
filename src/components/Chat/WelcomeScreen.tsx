import React from 'react';
import { Send, Zap, Sparkles, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onSuggest: (text: string) => void;
}

const SUGGESTIONS = [
  { icon: <Zap size={18} />, text: "Help me write a professional email" },
  { icon: <Sparkles size={18} />, text: "Creative ideas for a weekend trip" },
  { icon: <MessageSquare size={18} />, text: "Explain quantum computing simply" },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSuggest }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-3xl mx-auto mt-[-5vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12"
      >
        <div className="h-20 w-20 bg-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-8 mx-auto transform -rotate-12 hover:rotate-0 transition-transform duration-500">
          <Send className="text-white transform rotate-45 ml-1 mb-1" size={40} />
        </div>
        <h1 className="text-6xl font-black text-white tracking-tighter mb-4 italic">
          bluekite<span className="text-blue-400">.ai</span>
        </h1>
        <p className="text-blue-100/60 text-xl font-medium max-w-md mx-auto leading-relaxed">
          The next generation of dialogue, crafted for clarity and intelligence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        {SUGGESTIONS.map((suggestion, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
            onClick={() => onSuggest(suggestion.text)}
            className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-blue-400/30 transition-all text-left group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="mb-3 text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition-all">
                {suggestion.icon}
              </div>
              <div className="text-sm font-semibold text-white/80 group-hover:text-white leading-snug">
                {suggestion.text}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
