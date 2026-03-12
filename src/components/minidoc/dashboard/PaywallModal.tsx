'use client';

import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PaywallModalProps {
  onClose: () => void;
  onPayment: () => void;
  isLoading: boolean;
}

// Quitee Logo
const QuiteeLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14c2.876 0 5.548-.867 7.775-2.358l2.358 2.358 2.828-2.828-2.358-2.358C28.133 22.548 29 19.876 29 17h-4c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9V2z"
      fill="#10B981"
    />
    <circle cx="16" cy="16" r="6" fill="#059669" />
  </svg>
);

const benefits = [
  { title: 'Track Your Progress', desc: 'Log clean days, see your progress.' },
  { title: 'Get Real Feedback', desc: 'Honest feedback when you slip.' },
  { title: 'Learn Your Patterns', desc: 'Know when you\'re weak.' },
  { title: 'Stay Accountable', desc: 'Daily reminders and check-ins.' },
];

const PaywallModal: React.FC<PaywallModalProps> = ({ onClose, onPayment, isLoading }) => {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-neutral-500 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors"
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div className="bg-emerald-500 p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl mb-4"
              >
                <QuiteeLogo size={32} />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white mb-1"
              >
                Subscribe to Quitee
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-white"
              >
                <span className="text-3xl font-bold">$10</span>
                <span className="text-base font-medium">/month</span>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-emerald-100 text-xs mt-1"
              >
                Break your habit for real.
              </motion.p>
            </div>
          </div>

          {/* Benefits */}
          <div className="p-5">
            <div className="space-y-2.5 mb-5">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-black">{benefit.title}</h4>
                    <p className="text-xs text-neutral-500">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button 
              onClick={onPayment}
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-base font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Subscribe Now</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
            
            <p className="text-[10px] text-center text-neutral-400 mt-4 font-medium">
              Secured by Stripe • Cancel anytime
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaywallModal;
