'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, AlertTriangle, Target, TrendingDown, Skull, Zap, MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type Step = 'reality' | 'habit' | 'rules' | 'streak' | 'ready';

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

const HABITS = [
  { id: 'smoking', label: 'Smoking', emoji: '🚬' },
  { id: 'porn', label: 'Porn', emoji: '📵' },
  { id: 'alcohol', label: 'Alcohol', emoji: '🍺' },
  { id: 'gambling', label: 'Gambling', emoji: '🎰' },
  { id: 'phone', label: 'Phone', emoji: '📱' },
  { id: 'sugar', label: 'Sugar', emoji: '🍬' },
  { id: 'other', label: 'Other', emoji: '⚡' },
];

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState<Step>('reality');
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [habitDetails, setHabitDetails] = useState('');
  const [currentDays, setCurrentDays] = useState('0');
  const [bestDays, setBestDays] = useState('0');
  const [acknowledged, setAcknowledged] = useState(false);
  const [connectChannels, setConnectChannels] = useState(false);

  const steps: Step[] = ['reality', 'habit', 'rules', 'streak', 'ready'];
  const currentIndex = steps.indexOf(step);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex]);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  const toggleHabit = (habitId: string) => {
    if (selectedHabits.includes(habitId)) {
      setSelectedHabits(selectedHabits.filter(id => id !== habitId));
    } else {
      setSelectedHabits([...selectedHabits, habitId]);
    }
  };

  if (!isOpen) return null;

  const renderStep = () => {
    switch (step) {
      case 'reality':
        return (
          <motion.div
            key="reality"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center">
                <Skull size={28} className="text-white" />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-black mb-2">Let&apos;s Be Honest.</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                You&apos;re here because something has control over you.
              </p>
            </div>

            <div className="bg-neutral-900 text-white p-4 rounded-2xl text-left space-y-2">
              <p className="text-sm leading-relaxed">
                I&apos;m not here to be your friend.
              </p>
              <p className="text-sm leading-relaxed">
                I&apos;m here to help you break the habit that&apos;s been breaking you.
              </p>
              <p className="text-sm font-medium text-emerald-400">
                No sweet talk. No lies. Just real help.
              </p>
            </div>

            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-left">
              <AlertTriangle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800">
                If you want someone to tell you &quot;it&apos;s okay&quot; when you fail, this isn&apos;t for you.
              </p>
            </div>
          </motion.div>
        );

      case 'habit':
        return (
          <motion.div
            key="habit"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <div className="text-center">
              <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target size={20} />
              </div>
              <h2 className="text-lg font-bold text-black mb-1">What&apos;s Your Problem?</h2>
              <p className="text-xs text-neutral-600">Pick all habits you want to beat. You can choose more than one.</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {HABITS.map((habit) => {
                const isSelected = selectedHabits.includes(habit.id);
                return (
                  <motion.button
                    key={habit.id}
                    onClick={() => toggleHabit(habit.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-2 rounded-xl text-center border-2 transition-all relative ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-lg">{habit.emoji}</span>
                    <p className="text-xs font-medium text-black mt-1">{habit.label}</p>
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {selectedHabits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <label className="block text-xs font-medium text-neutral-500">
                  When do you usually slip? (optional)
                </label>
                <textarea
                  value={habitDetails}
                  onChange={(e) => setHabitDetails(e.target.value)}
                  placeholder="e.g., At night, when stressed, when bored..."
                  className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-black text-sm focus:outline-none focus:border-emerald-500 resize-none"
                  rows={2}
                />
              </motion.div>
            )}

            {selectedHabits.length > 0 && (
              <div className="text-center">
                <p className="text-xs text-emerald-600 font-medium">
                  {selectedHabits.length} habit{selectedHabits.length > 1 ? 's' : ''} selected
                </p>
              </div>
            )}
          </motion.div>
        );

      case 'rules':
        return (
          <motion.div
            key="rules"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <div className="text-center">
              <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap size={20} />
              </div>
              <h2 className="text-lg font-bold text-black mb-1">How This Works</h2>
              <p className="text-xs text-neutral-600">Simple rules. No tricks.</p>
            </div>

            <div className="space-y-2">
              {[
                { title: 'Check in daily', desc: 'Tell me if you stayed clean or slipped.' },
                { title: 'I keep you honest', desc: 'When you slip, I tell you what you lost.' },
                { title: 'I learn your weak spots', desc: 'I notice patterns and warn you.' },
                { title: 'No fake motivation', desc: 'Just real talk and real numbers.' },
              ].map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-2 p-2.5 bg-neutral-50 rounded-xl"
                >
                  <div className="w-5 h-5 bg-neutral-900 text-white text-[10px] font-bold rounded-lg flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-black">{rule.title}</p>
                    <p className="text-[10px] text-neutral-500">{rule.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <label className="flex items-start gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-0.5 w-4 h-4"
              />
              <span className="text-xs text-emerald-800 font-medium">
                I understand. I&apos;m ready to change.
              </span>
            </label>
          </motion.div>
        );

      case 'streak':
        return (
          <motion.div
            key="streak"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <div className="text-center">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingDown size={20} />
              </div>
              <h2 className="text-lg font-bold text-black mb-1">Your Starting Point</h2>
              <p className="text-xs text-neutral-600">Be honest. Lying only hurts you.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                  How many days have you been clean?
                </label>
                <input
                  type="number"
                  value={currentDays}
                  onChange={(e) => setCurrentDays(e.target.value)}
                  placeholder="0"
                  className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-black text-xl font-bold text-center focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                  What&apos;s your best ever? (days clean)
                </label>
                <input
                  type="number"
                  value={bestDays}
                  onChange={(e) => setBestDays(e.target.value)}
                  placeholder="0"
                  className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-black text-xl font-bold text-center focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="bg-neutral-900 text-white p-3 rounded-2xl">
              <p className="text-sm font-medium text-center">
                {currentDays === '0' || currentDays === '' 
                  ? "Starting fresh. Let's build something real."
                  : `${currentDays} days. Tomorrow we make it ${parseInt(currentDays) + 1}.`
                }
              </p>
            </div>
          </motion.div>
        );

      case 'ready':
        return (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <QuiteeLogo size={36} />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-black mb-1">Let&apos;s Break This.</h2>
              <p className="text-sm text-neutral-600">I&apos;ll be watching. Don&apos;t let yourself down.</p>
            </div>

            <div className="bg-neutral-900 text-white p-4 rounded-2xl text-left space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Target size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400">Your Habits</p>
                  <p className="text-xs font-medium">
                    {selectedHabits.map(id => HABITS.find(h => h.id === id)?.label).join(', ') || 'Not selected'}
                  </p>
                </div>
              </div>
              
              <div className="h-px bg-neutral-700"></div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-neutral-400">Days Clean Now</p>
                  <p className="text-base font-bold text-emerald-400">{currentDays || '0'} days</p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400">Best Ever</p>
                  <p className="text-base font-bold">{bestDays || '0'} days</p>
                </div>
              </div>
            </div>

            {/* Channel Connection */}
            <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-xl text-left space-y-3">
              <p className="text-xs font-bold text-black">Connect messaging apps:</p>
              <p className="text-[10px] text-neutral-600">
                Get check-ins on Telegram or WhatsApp so I can keep you on track.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 bg-white border border-neutral-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#0088cc]/10 rounded-lg flex items-center justify-center">
                      <Send size={14} className="text-[#0088cc]" />
                    </div>
                    <span className="text-xs font-medium">Telegram</span>
                  </div>
                  <button className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-600 transition-colors">
                    Connect
                  </button>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white border border-neutral-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                      <MessageCircle size={14} className="text-green-600" />
                    </div>
                    <span className="text-xs font-medium">WhatsApp</span>
                  </div>
                  <button className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-600 transition-colors">
                    Connect
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 rounded-xl">
              <AlertTriangle size={14} className="text-red-600 flex-shrink-0" />
              <p className="text-[10px] text-red-800 text-left">
                If you don&apos;t check in, I count it as a slip. Stay on track.
              </p>
            </div>

            <motion.button
              onClick={handleComplete}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2"
            >
              I&apos;m Ready
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        );
    }
  };

  const canContinue = () => {
    if (step === 'habit' && selectedHabits.length === 0) return false;
    if (step === 'rules' && !acknowledged) return false;
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden border border-neutral-200"
      >
        {/* Header with progress */}
        {step !== 'ready' && (
          <div className="px-4 pt-4 pb-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {steps.slice(0, -1).map((s, i) => (
                  <div
                    key={s}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i <= currentIndex ? 'bg-emerald-500' : 'bg-neutral-200'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <QuiteeLogo size={16} />
                <span className="text-xs font-bold text-neutral-900">Quitee</span>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        {/* Fixed Footer with Navigation */}
        {step !== 'reality' && step !== 'ready' && (
          <div className="px-4 pb-4 pt-2 flex-shrink-0 border-t border-neutral-100 bg-white">
            <div className="flex gap-2">
              <motion.button
                onClick={handleBack}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-2.5 bg-neutral-100 text-black text-sm font-medium rounded-xl flex items-center justify-center gap-1"
              >
                <ArrowLeft size={14} />
                Back
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={!canContinue()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-2.5 bg-emerald-500 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight size={14} />
              </motion.button>
            </div>
          </div>
        )}

        {step === 'reality' && (
          <div className="px-4 pb-4 pt-2 flex-shrink-0 border-t border-neutral-100 bg-white">
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-1"
            >
              I&apos;m Ready to Be Honest
              <ArrowRight size={14} />
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default OnboardingModal;
