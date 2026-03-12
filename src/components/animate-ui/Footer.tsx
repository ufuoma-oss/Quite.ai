'use client';

import { MotionEffect } from './effects/MotionEffect';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer = ({ onNavigate }: { onNavigate?: (page: string) => void }) => {
  return (
    <div className="w-full">
      {/* CTA Section */}
      <MotionEffect
        slide={{ direction: 'up' }}
        fade
        zoom
        delay={0.2}
        className="w-full max-w-3xl mx-auto px-5 py-16"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">Q</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Break the habit that brought you here.
          </h2>
          
          <p className="text-muted-foreground mb-8 text-lg">
            Start with Quitee today.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="px-8"
              onClick={() => onNavigate?.('signin')}
            >
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </MotionEffect>

      {/* Divider */}
      <div className="w-full border-t border-border" />

      {/* Footer */}
      <MotionEffect
        slide={{ direction: 'up' }}
        fade
        zoom
        delay={0.3}
        className="w-full"
      >
        <div className="max-w-7xl mx-auto py-8">
          <div className="px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Quitee</span>
            </div>
            
            <p className="text-center text-sm text-muted-foreground">
              AI that helps you quit the habits you don&apos;t want anymore.
            </p>
            
            <p className="text-sm text-muted-foreground">
              Simple. Honest. Always there.
            </p>
          </div>
        </div>
      </MotionEffect>
    </div>
  );
};
