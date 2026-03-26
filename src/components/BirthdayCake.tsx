import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import CakeIllustration from './CakeIllustration';
import Button from './ui/Button';

export default function BirthdayCake() {
  const [isLit, setIsLit] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  const handleCakeClick = () => {
    if (isLit) return;
    
    setIsLit(true);
    
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Show memories button after a short delay
    setTimeout(() => {
      setShowButton(true);
    }, 2000);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative cursor-pointer group"
        onClick={handleCakeClick}
      >
        {/* Cake Illustration */}
        <div className={`transition-all duration-500 ${isLit ? 'scale-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]' : 'hover:scale-105'}`}>
          <CakeIllustration isLit={isLit} />
        </div>

        {!isLit && (
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-pink-600 font-bubblegum text-lg whitespace-nowrap"
          >
            Tap on the cake 🎂
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {showButton && (
          <Button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={() => navigate('/memories')}
            className="mt-12"
          >
            Let’s take a look at our memories ✨
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}
