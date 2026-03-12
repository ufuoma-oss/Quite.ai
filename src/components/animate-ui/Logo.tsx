'use client';

import { cn } from '@/lib/utils';
import { motion, type SVGMotionProps } from 'motion/react';

const pathVariants = {
  hidden: {
    pathLength: 0,
    fillOpacity: 0,
  },
  visible: {
    pathLength: 1,
    fillOpacity: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
} as const;

const sizes = {
  xs: 'h-5',
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-10',
  xl: 'h-12',
};

export const Logo = ({
  draw = false,
  size = 'sm',
  className,
  containerClassName,
  ...props
}: {
  containerClassName?: string;
  draw?: boolean;
  size?: keyof typeof sizes;
} & SVGMotionProps<SVGSVGElement>) => {
  return (
    <div className={cn('relative', containerClassName)}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className={cn(sizes[size], className)}
        {...props}
      >
        <motion.path
          variants={draw ? pathVariants : {}}
          initial={draw ? 'hidden' : false}
          animate={draw ? 'visible' : false}
          stroke="currentColor"
          strokeWidth={1.5}
          className="fill-emerald-500"
          d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14c2.876 0 5.548-.867 7.775-2.358l2.358 2.358 2.828-2.828-2.358-2.358C28.133 22.548 29 19.876 29 17h-4c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9V2z"
        />
        <motion.circle
          variants={draw ? pathVariants : {}}
          initial={draw ? 'hidden' : false}
          animate={draw ? 'visible' : false}
          cx="16"
          cy="16"
          r="6"
          className="fill-emerald-600"
        />
      </motion.svg>
      <span className="sr-only">Quitee</span>
    </div>
  );
};
