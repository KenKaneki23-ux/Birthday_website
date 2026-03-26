import { motion, HTMLMotionProps } from 'motion/react';
import React from 'react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'icon';
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) {
  
  const baseClasses = "relative z-50 shadow-lg text-white font-bubblegum rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-[#fffaf0]";
  
  const variantClasses = {
    primary: "bg-pink-600 hover:bg-pink-700 px-8 py-4 text-xl md:text-2xl border-2 border-pink-400/30",
    icon: "bg-pink-500 hover:bg-pink-600 p-4"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
