import { motion } from 'motion/react';

interface CakeIllustrationProps {
  isLit: boolean;
}

export default function CakeIllustration({ isLit }: CakeIllustrationProps) {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-end pb-8">
      {/* Glow Effect */}
      {isLit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 bg-yellow-400/30 blur-[60px] rounded-full -z-10"
        />
      )}

      {/* Candle Flame */}
      <div className="absolute top-[8%] md:top-[12%] flex justify-center w-full h-16 z-20">
        {isLit ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: [1, 1.1, 0.95, 1.05, 1],
              rotate: [-2, 2, -1, 3, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 0.8,
              ease: "easeInOut"
            }}
            className="w-4 h-10 md:w-5 md:h-12 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-500 rounded-[50%_50%_20%_20%] origin-bottom shadow-[0_0_20px_rgba(255,200,0,0.8)]"
            style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
          >
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-yellow-200 rounded-full blur-[2px]" />
          </motion.div>
        ) : (
          <div className="w-1 h-3 md:w-1.5 md:h-4 bg-gray-800 rounded-full absolute bottom-0 opacity-50" />
        )}
      </div>

      {/* Candle */}
      <div className="absolute top-[22%] md:top-[28%] w-4 h-16 md:w-5 md:h-20 bg-gradient-to-b from-blue-200 to-blue-400 rounded-sm z-10 border-x border-blue-500 overflow-hidden shadow-inner">
         {/* Stripes */}
         <div className="absolute w-[200%] h-4 bg-white/40 -rotate-45 -top-2 -left-2" />
         <div className="absolute w-[200%] h-4 bg-white/40 -rotate-45 top-4 -left-2" />
         <div className="absolute w-[200%] h-4 bg-white/40 -rotate-45 top-10 -left-2" />
         <div className="absolute w-[200%] h-4 bg-white/40 -rotate-45 top-16 -left-2" />
      </div>

      {/* Top Tier */}
      <div className="relative w-3/5 h-20 md:h-24 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-xl z-20 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.05),0_10px_10px_rgba(0,0,0,0.1)] border-x border-t border-pink-400 flex justify-center">
         {/* Dripping Frosting */}
         <div className="absolute top-0 w-full flex justify-between px-2">
            {[...Array(6)].map((_, i) => (
              <div 
                key={`drip1-${i}`} 
                className="w-4 h-8 md:w-5 md:h-10 bg-white rounded-b-full shadow-sm"
                style={{ height: `${20 + Math.random() * 20}px` }}
              />
            ))}
         </div>
      </div>

      {/* Bottom Tier */}
      <div className="relative w-4/5 h-24 md:h-28 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-xl rounded-b-md z-10 shadow-[inset_0_-15px_30px_rgba(0,0,0,0.1),0_15px_20px_rgba(0,0,0,0.15)] border border-pink-500 flex justify-center">
        {/* Dripping Frosting */}
        <div className="absolute top-0 w-full flex justify-between px-3">
            {[...Array(8)].map((_, i) => (
              <div 
                key={`drip2-${i}`} 
                className="w-5 h-10 md:w-6 md:h-12 bg-pink-200 rounded-b-full shadow-sm"
                style={{ height: `${25 + Math.random() * 25}px` }}
              />
            ))}
         </div>
         
         {/* Sprinkles */}
         <div className="absolute inset-0 overflow-hidden opacity-70">
            <div className="absolute top-1/2 left-1/4 w-3 h-1 bg-yellow-300 rounded-full rotate-45" />
            <div className="absolute top-2/3 left-1/2 w-3 h-1 bg-green-300 rounded-full -rotate-12" />
            <div className="absolute top-1/2 right-1/4 w-3 h-1 bg-blue-300 rounded-full rotate-90" />
            <div className="absolute bottom-1/4 left-1/3 w-3 h-1 bg-purple-300 rounded-full rotate-45" />
            <div className="absolute bottom-1/3 right-1/3 w-3 h-1 bg-white rounded-full -rotate-45" />
         </div>
      </div>

      {/* Plate */}
      <div className="absolute bottom-4 w-full h-8 md:h-10 bg-gradient-to-b from-gray-200 to-gray-400 rounded-[50%] z-0 shadow-[0_15px_25px_rgba(0,0,0,0.2)]" />
    </div>
  );
}
