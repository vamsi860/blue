import React from 'react';
import { Plus, MessageSquare, PanelLeftClose, Github, Settings } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  onNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewChat, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[280px] bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col transition-transform duration-300 transform md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white italic">bluekite<span className="text-blue-400">.ai</span></span>
          </div>

          <button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-medium text-white transition-all mb-8 shadow-sm"
          >
            <Plus size={18} className="text-blue-400" />
            New Dialogue
          </button>

          <div className="flex-1 overflow-y-auto space-y-1">
            <div className="text-[10px] uppercase font-black text-white/30 tracking-widest px-2 py-2 mb-2">
              Recent Activity
            </div>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 text-sm transition-all group">
              <MessageSquare size={16} className="shrink-0" />
              <span className="truncate">Quantum Principles</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-all text-sm group">
              <MessageSquare size={16} className="shrink-0 group-hover:text-blue-400" />
              <span className="truncate">Architecture Review</span>
            </button>
          </div>

          <div className="mt-auto space-y-1 border-t border-white/5 pt-6">
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/10 text-white/60 transition-all text-sm">
              <Settings size={18} className="text-white/40" />
              Settings
            </button>
            <div className="flex items-center gap-3 px-3 py-2 mt-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 p-[1px]">
                 <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold">BK</div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white/80">Guest User</span>
                <span className="text-[9px] uppercase tracking-tighter text-white/30">Free Session</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
