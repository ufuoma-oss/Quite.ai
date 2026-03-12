'use client';

import { motion } from 'motion/react';
import { SplittingText } from './texts/SplittingText';
import { MotionEffect } from './effects/MotionEffect';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const TITLE = 'AI That Frees You From Bad Addiction';
const SUBTITLE = 'The smartest way to quit smoking, porn, gambling, and more.';

const BADGES = [
  'Smoking',
  'Porn',
  'Alcohol',
  'Phone',
  'Sugar',
  'Gambling',
];

export const Hero = ({ onNavigate }: { onNavigate?: (page: string) => void }) => {
  return (
    <div className="relative overflow-hidden flex flex-col items-center px-5">
      <div className="relative z-10 flex flex-col items-center justify-center pt-30">
        {/* Badge */}
        <MotionEffect
          slide={{ direction: 'down' }}
          fade
          zoom
          inView
        >
          <div className="mb-8 rounded-full bg-accent py-1 pl-1 pr-3 text-sm flex items-center gap-2">
            <span className="h-6 px-2 bg-primary text-xs text-primary-foreground rounded-full flex items-center justify-center font-medium">
              Quitee
            </span>
            <span className="text-muted-foreground">Your habit-breaking companion</span>
          </div>
        </MotionEffect>

        {/* Title with double layer effect */}
        <MotionEffect
          slide={{ direction: 'down' }}
          fade
          zoom
          inView
          delay={0.15}
        >
          <div className="relative z-10">
            {/* Background layer - faded, no animation */}
            <h1 className="md:max-w-[800px] max-w-[320px]">
              <SplittingText
                text={TITLE}
                aria-hidden="true"
                className="block md:text-5xl text-4xl font-medium text-center text-neutral-200 dark:text-neutral-800"
                disableAnimation
              />
            </h1>
            {/* Animated layer on top - starts invisible, reveals character by character */}
            <div className="md:max-w-[800px] max-w-[320px] absolute inset-0 flex items-center justify-center pointer-events-none">
              <SplittingText
                text={TITLE}
                className="block md:text-5xl text-4xl font-medium text-center"
                type="chars"
                delay={400}
                initial={{ y: 0, opacity: 0, x: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </MotionEffect>

        {/* Subtitle */}
        <MotionEffect
          slide={{ direction: 'down' }}
          fade
          zoom
          inView
          delay={0.3}
        >
          <p className="block font-normal md:text-lg sm:text-base text-sm text-center mt-3 text-muted-foreground md:max-w-[660px] sm:max-w-[450px] text-balance">
            {SUBTITLE}
          </p>
        </MotionEffect>

        {/* Badges */}
        <MotionEffect
          slide={{ direction: 'down' }}
          fade
          zoom
          inView
          delay={0.45}
        >
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 mb-8">
            {BADGES.map((badge, index) => (
              <span 
                key={badge}
                className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-sm rounded-full text-muted-foreground"
              >
                {badge}
              </span>
            ))}
          </div>
        </MotionEffect>

        {/* CTA Buttons */}
        <div className="flex sm:flex-row flex-col sm:gap-4 gap-3 mb-8 max-sm:w-full">
          <MotionEffect
            slide={{ direction: 'down' }}
            fade
            zoom
            delay={0.6}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="w-full !pr-5"
                variant="default"
                onClick={() => onNavigate?.('signin')}
              >
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </MotionEffect>
        </div>
      </div>
    </div>
  );
};
