import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import defaultKrishnaImg from '../assets/krishna.png';

interface BirthdayIntroProps {
  years?: number;
  onComplete?: () => void;
}

export default function BirthdayIntro({ years = 20, onComplete }: BirthdayIntroProps) {
  const [count, setCount] = useState(3);
  const [showContent, setShowContent] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [imgSrc, setImgSrc] = useState(defaultKrishnaImg);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowContent(true);
        // Small delay to trigger CSS transition
        setTimeout(() => setIsReady(true), 50);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {!showContent ? (
        <div className="text-9xl font-bubblegum font-bold animate-pulse text-pink-600 drop-shadow-lg">
          {count > 0 ? count : "✨"}
        </div>
      ) : (
        <div 
          className={`flex flex-col items-center text-center px-6 transition-opacity duration-1000 ease-in-out ${isReady ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="mb-8">
            <img 
              src={imgSrc} 
              alt="Baby Krishna" 
              className="w-full max-w-md md:max-w-xl h-auto"
              draggable={false}
            />
          </div>
          
          <div className="space-y-4 font-bubblegum text-pink-600">
            <p className="text-3xl md:text-4xl font-medium tracking-wide drop-shadow-md">
              My girl was born 23 years ago…
            </p>
            <p className="text-4xl md:text-5xl font-bold drop-shadow-lg leading-tight">
              And after 16 years, she came and made my life beautiful ❤️
            </p>
          </div>
          
          <Button 
            variant="icon"
            onClick={onComplete}
            className="mt-8 animate-bounce"
            aria-label="Go to cake"
          >
            <ArrowRight size={32} />
          </Button>
        </div>
      )}
    </div>
  );
}
