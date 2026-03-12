'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ArrowUp, SquarePen, Menu, Plus, Target } from 'lucide-react';
import { Message } from '@/lib/minidoc/types';
import { motion } from 'motion/react';

interface ChatViewProps {
  messages: Message[];
  inputText: string;
  setInputText: (text: string) => void;
  handleSend: () => void;
  isTyping: boolean;
  toggleSidebar: () => void;
  hasPaid: boolean;
  startNewChat: () => void;
  onOpenGoals?: () => void;
}

const PLACEHOLDERS = [
  "I slipped today...",
  "How many days has it been?",
  "I'm feeling weak right now.",
  "Why do I keep failing?",
  "Help me stay on track.",
  "I need a reality check.",
];

const ChatView: React.FC<ChatViewProps> = ({
  messages,
  inputText,
  setInputText,
  handleSend,
  isTyping,
  toggleSidebar,
  hasPaid,
  startNewChat,
  onOpenGoals,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [placeholderText, setPlaceholderText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (messages.length > 0) return;

    const currentPhrase = PLACEHOLDERS[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;
    const typingSpeed = isDeleting ? 15 : 25;
    const pauseDuration = 2500;

    if (!isDeleting && placeholderText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && placeholderText === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
      }, 0);
    } else {
      timer = setTimeout(() => {
        setPlaceholderText(currentPhrase.substring(0, placeholderText.length + (isDeleting ? -1 : 1)));
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, phraseIndex, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isChatEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tiny Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 bg-white">
        <div className="flex items-center gap-3">
          <motion.button 
            onClick={toggleSidebar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-1.5 text-neutral-600 hover:text-black rounded-lg hover:bg-neutral-100"
          >
            <Menu size={18} />
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          {/* Goals Button */}
          {onOpenGoals && (
            <motion.button 
              onClick={onOpenGoals}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors" 
            >
              <Target size={14} />
              <span className="hidden sm:inline">Goals</span>
            </motion.button>
          )}
          {!isChatEmpty && (
            <motion.button 
              onClick={startNewChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 text-neutral-600 hover:text-black rounded-lg hover:bg-neutral-100" 
              title="New chat"
            >
              <SquarePen size={16} />
            </motion.button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className={`flex-1 overflow-y-auto scrollbar-hide flex flex-col ${isChatEmpty ? 'items-center justify-center' : ''}`}>
        
        {isChatEmpty ? (
          <div className="w-full max-w-3xl px-4 md:px-6 pb-48 pt-8 flex flex-col items-center">
            
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-medium text-black mb-2">
                Let&apos;s get to work.
              </h1>
              <h1 className="text-3xl md:text-4xl font-medium text-black">
                No excuses today.
              </h1>
            </motion.div>

            {/* Quick Actions */}
            <div className="w-full overflow-hidden mb-8">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {[
                  "I'm feeling weak",
                  "Log my progress",
                  "Reality check me"
                ].map((action, index) => (
                  <motion.button
                    key={action}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    onClick={() => setInputText(action + '.')} 
                    className="px-4 py-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl text-sm font-medium text-neutral-700 border border-neutral-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {action}
                  </motion.button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-4 pb-32 space-y-4">
            {messages.map((msg, index) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] md:max-w-[75%]`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium break-words whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-neutral-100 text-black rounded-br-md' 
                      : 'bg-white border border-neutral-200 text-black rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-neutral-200 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Fixed Bottom Input */}
      <div className="fixed bottom-0 left-0 right-0 md:left-72 z-30">
        <div className="mx-2 mb-2 rounded-2xl bg-neutral-100 flex items-end px-3 py-2.5 gap-2">
          {inputText.trim() === '' && (
            <motion.button 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 text-neutral-500 hover:text-emerald-500 flex-shrink-0 mb-0.5"
              title="Add files"
            >
              <Plus size={20} strokeWidth={2.5} />
            </motion.button>
          )}
          
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholderText || "Tell me what's going on..."}
            rows={1}
            className="chat-input-textarea flex-1 text-sm text-black placeholder-neutral-400 resize-none overflow-hidden leading-relaxed self-center"
            style={{minHeight: '24px', maxHeight: '120px'}}
          />
          
          <div className="flex items-center flex-shrink-0 gap-2 mb-0.5">
            <motion.button 
              onClick={handleSend}
              disabled={!inputText.trim() && hasPaid}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                inputText.trim() || !hasPaid 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
