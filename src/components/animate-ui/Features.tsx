'use client';

import { MotionEffect } from './effects/MotionEffect';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { 
  Brain,
  MessageSquare,
  TrendingUp,
  Shield,
  Smartphone,
  Target,
  Eye,
  Lock
} from 'lucide-react';

const SECTIONS = [
  {
    title: 'Hello. I\'m Quitee.',
    description: `You tell me the habit. I watch the pattern. I learn the moments you usually fail — and I step in.

Sometimes with a reminder. Sometimes with a message you won't enjoy reading. Either way, the truth is clear.

I'm here to help you break the habit that brought you to me.`,
    icon: MessageSquare,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950',
  },
  {
    title: 'One Simple System',
    description: `Quitee keeps things simple. No complicated dashboards. No long programs to follow.

Just a conversation that helps you stay aware of your choices and your progress.

Track your clean days. Log your decisions. See the pattern clearly. Over time, the habit becomes easier to control.`,
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    title: 'Smart Pattern Awareness',
    description: `Bad habits follow patterns. Quitee learns when you usually slip, what triggers the behavior, and how often it happens.

When the same situation appears again, Quitee steps in with a reminder or a reality check.

The goal isn't motivation. The goal is awareness and interruption of the pattern.`,
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
  {
    title: 'Works Where You Already Chat',
    description: `You can talk to Quitee through messaging platforms you already use.

• Telegram
• WhatsApp  
• iMessage

No new apps to learn. Just a simple conversation whenever you need it.`,
    icon: Smartphone,
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950',
  },
  {
    title: 'What Quitee Can Help With',
    description: `Quitee works for any habit with a clear yes or no outcome.

Examples include: Smoking • Porn addiction • Alcohol use • Gambling • Phone addiction • Sugar binges

If it's a habit you want gone, Quitee can track it.`,
    icon: Eye,
    color: 'from-rose-500 to-red-500',
    bgColor: 'bg-rose-50 dark:bg-rose-950',
  },
  {
    title: 'Simple Progress Tracking',
    description: `Each day you log whether you stayed clean. Quitee keeps the record and helps you see how you're doing.

When you slip, the system doesn't ignore it. It helps you understand what happened and move forward.

Progress isn't about perfection. It's about breaking the pattern over time.`,
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    title: 'Privacy First',
    description: `Your conversations and habit data are private.

Quitee is designed to keep your personal progress secure and confidential.

Your journey is yours alone.`,
    icon: Lock,
    color: 'from-slate-500 to-gray-500',
    bgColor: 'bg-slate-50 dark:bg-slate-950',
  },
];

export const Features = () => {
  return (
    <div className="relative pt-16 pb-10 px-5 flex flex-col items-center justify-center mt-auto">
      {/* Intro Section */}
      <MotionEffect
        slide={{ direction: 'up' }}
        fade
        zoom
        delay={1}
        className="w-full max-w-3xl mb-16"
      >
        <div className="text-center">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Quitee helps you get rid of the habits you want gone.
          </p>
          <p className="text-base text-muted-foreground mt-4 leading-relaxed">
            When you stay clean, it records it. When you slip, it lets you know.
          </p>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-base text-muted-foreground italic">
              No fake encouragement. No endless self-help advice.
            </p>
            <p className="text-base font-medium text-foreground mt-2">
              Just clear feedback and honest AI guidance — until the habit loses its grip.
            </p>
          </div>
        </div>
      </MotionEffect>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
        {SECTIONS.map((section, index) => {
          const Icon = section.icon;
          return (
            <MotionEffect
              slide={{ direction: 'up' }}
              fade
              zoom
              delay={1.2 + 0.1 * index}
              key={index}
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                }}
                className="relative w-full bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 border border-border hover:border-primary/20 transition-colors h-full"
              >
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br',
                  section.color
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {section.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.description}
                </p>
              </motion.div>
            </MotionEffect>
          );
        })}
      </div>
    </div>
  );
};
