import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface PageLayoutProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PageLayout({ children, className = '', ...props }: PageLayoutProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-[100dvh] w-full bg-[linear-gradient(to_bottom_right,#f472b6_70%,#fffaf0_90%,#ffffff_100%)] flex flex-col items-center justify-center overflow-hidden overscroll-none ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
