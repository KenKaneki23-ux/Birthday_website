import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import m1 from '../assets/m1.jpg';
import m2 from '../assets/m2.jpg';
import m3 from '../assets/m3.jpg';
import m4 from '../assets/m4.jpg';
import m5 from '../assets/m5.jpg';
import m6 from '../assets/m6.jpg';

const memoryImages = [
  m1,
  m2,
  m3,
  m4,
  m5,
  m6, // Top card starts here
];

export default function Memories() {
  const navigate = useNavigate();
  const [cards, setCards] = useState(memoryImages);

  const removeTopCard = () => {
    setCards((prev) => prev.slice(0, -1));
  };

  return (
    <PageLayout className="touch-none select-none px-4">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-6xl font-bubblegum text-pink-600 mb-8 text-center drop-shadow-lg z-10"
      >
        Our Memories ✨
      </motion.h1>

      <div className="relative w-full max-w-[320px] aspect-[3/4] flex items-center justify-center mb-8">
        <AnimatePresence>
          {cards.map((src, index) => {
            const isTop = index === cards.length - 1;
            return (
              <SwipeCard 
                key={src} 
                src={src} 
                index={index} 
                isTop={isTop} 
                total={cards.length}
                onDismiss={removeTopCard}
              />
            );
          })}
        </AnimatePresence>

        {cards.length === 0 && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
          >
            <p className="text-2xl md:text-3xl font-bubblegum text-pink-500 mb-8 drop-shadow-md">
              Beautiful moments together... ❤️
            </p>
            <Button
              onClick={() => navigate('/final')}
            >
              Continue to the end ✨
            </Button>
          </motion.div>
        )}
      </div>

      {cards.length > 0 && (
        <p className="text-pink-500 font-bubblegum text-lg md:text-xl opacity-70 mt-4 animate-pulse">
          Swipe or click to reveal
        </p>
      )}
    </PageLayout>
  );
}

function SwipeCard({ src, index, isTop, total, onDismiss }: { src: string, index: number, isTop: boolean, total: number, onDismiss: () => void }) {
  const x = useMotionValue(0);
  // Slightly tilt the card as it moves left/right
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const rightSwipeOpacity = useTransform(x, [30, 100], [0, 1]);
  const leftSwipeOpacity = useTransform(x, [-30, -100], [0, 1]);

  // Calculate stacking offsets
  const offset = total - 1 - index;
  const scale = 1 - offset * 0.05;
  const yOffset = offset * 15;
  
  // Create a slight rotation for cards underneath so they look like a messy stack
  const staticRotate = offset % 2 === 0 ? offset * -2 : offset * 2;

  // Use a single unified motion.div to prevent React hook mismatch constraints
  // and Framer Motion layout transition bugs.
  // We use pointerEvents: "none" to disable dragging on non-top cards without removing the drag prop.
  return (
    <motion.div
      className={`absolute inset-0 backdrop-blur-md p-3 rounded-[2rem] shadow-xl origin-bottom ${
        isTop ? "bg-white/90 cursor-grab active:cursor-grabbing shadow-2xl" : "bg-white/50"
      }`}
      style={{ 
        x, 
        rotate: isTop ? rotate : staticRotate, 
        zIndex: isTop ? 100 : index,
        pointerEvents: isTop ? "auto" : "none"
      }}
      initial={false}
      animate={{ 
        scale, 
        y: yOffset,
        opacity: isTop ? 1 : Math.max(0, 1 - offset * 0.15)
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(e, { offset, velocity }) => {
        if (!isTop) return;
        const swipeThreshold = 100;
        const velocityThreshold = 400;
        if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > velocityThreshold) {
          onDismiss();
        }
      }}
      onClick={() => {
        if (!isTop) return;
        if (Math.abs(x.get()) < 10) {
          x.set(200);
          onDismiss();
        }
      }}
      exit={{ 
        x: x.get() > 0 ? 300 : -300, 
        opacity: 0, 
        rotate: x.get() > 0 ? 20 : -20 
      }}
    >
      <div className="w-full h-full rounded-2xl overflow-hidden relative border-4 border-white bg-gray-100">
        <img src={src} className="w-full h-full object-cover pointer-events-none" alt="Memory" referrerPolicy="no-referrer" draggable={false} />
        
        {/* Like Overlay (Right Swipe) */}
        <motion.div 
          className="absolute inset-0 bg-pink-500/40 flex items-center justify-center text-white text-6xl drop-shadow-lg"
          style={{ opacity: rightSwipeOpacity }}
        >
          ❤️
        </motion.div>
        
        {/* Like Overlay (Left Swipe) - Just different emoji for fun */}
        <motion.div 
          className="absolute inset-0 bg-purple-500/40 flex items-center justify-center text-white text-6xl drop-shadow-lg"
          style={{ opacity: leftSwipeOpacity }}
        >
          ✨
        </motion.div>
      </div>
    </motion.div>
  );
}
