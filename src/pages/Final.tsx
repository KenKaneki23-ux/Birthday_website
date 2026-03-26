import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';

export default function Final() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <PageLayout className="p-4 md:p-8 touch-manipulation">
      
      {/* 3D Scene Container */}
      <div 
        className="relative w-full max-w-md aspect-[3/4] cursor-pointer drop-shadow-2xl z-10"
        style={{ perspective: "1500px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        
        {/* Right Page (Inside Letter) */}
        <div className="absolute inset-0 bg-[#fffdf0] rounded-r-2xl rounded-l-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] flex flex-col items-center justify-between p-4 md:p-8 text-center border-l-2 border-gray-200">
           
           <div className="flex-1 w-full overflow-y-auto custom-scrollbar pt-4 pb-4 px-2 md:px-4 flex flex-col items-center justify-start text-center">
             <h2 className="text-2xl md:text-4xl font-bubblegum text-pink-600 drop-shadow-sm mb-1">HAPPY BIRTHDAY</h2>
             <h3 className="text-lg md:text-2xl font-bubblegum text-pink-500 mb-4">My Favourite Girl</h3>
             
             <p className="text-base md:text-2xl font-parisienne text-pink-700 leading-relaxed mb-4 drop-shadow-sm">
               the one Today is all about celebrating you who holds such a special place in my heart. You have this amazing way of making my world brighter just by being yourself. Your smile can change my whole mood, your laughter feels like music, and your presence makes everything better. Out of everyone in the world, you will always be my favourite not just for how you look, but for who you are inside.
             </p>
             
             <p className="text-base md:text-2xl font-parisienne text-pink-700 leading-relaxed mb-4 drop-shadow-sm">
               You are kind, strong, and beautifully unique in your own way. The way you care and the way you stay true to yourself makes you even more special to me. On your birthday, I wish you endless happiness, success, good health, and dreams that slowly come true. May this year bring you closer to everything your heart desires. Keep shining and never forget how important you are. Happy Birthday, my favourite girl.
             </p>
           </div>
           
           <AnimatePresence>
             {isOpen && (
               <Button
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.6, duration: 0.5 }}
                 onClick={(e) => {
                   e.stopPropagation(); // prevent closing book
                   navigate('/');
                 }}
                 className="mt-2 shrink-0"
               >
                 Restart our Journey ✨
               </Button>
             )}
           </AnimatePresence>
        </div>

        {/* The Cover (Left Page) */}
        <motion.div
          className="absolute inset-0 origin-left"
          style={{ transformStyle: 'preserve-3d' }}
          initial={false}
          animate={{ rotateY: isOpen ? -160 : 0 }}
          transition={{ duration: 1.4, type: "spring", stiffness: 40, damping: 14 }}
        >
          {/* Cover Front Face */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(135deg,#db2777,#be185d)] rounded-r-2xl rounded-l-sm shadow-[10px_0_20px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center p-4 md:p-6 border-l-[6px] border-[#831843]"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Elegant Inner Border Decoration */}
            <div className="w-full h-full border-2 border-pink-300/40 rounded-xl flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
               <h1 className="text-6xl md:text-7xl font-bubblegum text-white text-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] tracking-wide">
                 My Love ❤️
               </h1>
            </div>
            {/* Page edge highlight */}
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-r from-transparent to-white/20 rounded-r-2xl" />
          </div>

          {/* Cover Back Face (Inside Left) */}
          <div 
            className="absolute inset-0 bg-[#fdfbf2] rounded-l-2xl rounded-r-sm shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)] border-r border-gray-300 flex flex-col items-center justify-center p-8 text-center"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="text-8xl opacity-10 drop-shadow-md pb-10">
              🌹
            </div>
            
            {/* Book spine interior shadow */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent" />
          </div>
        </motion.div>
        
      </div>
      
      <AnimatePresence>
        {!isOpen && (
          <motion.p 
            className="mt-12 text-pink-600 font-bubblegum text-xl md:text-2xl drop-shadow-sm z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -5, 0] }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ opacity: { delay: 1, duration: 0.5 }, y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
          >
            Tap to open the card
          </motion.p>
        )}
      </AnimatePresence>

    </PageLayout>
  );
}
