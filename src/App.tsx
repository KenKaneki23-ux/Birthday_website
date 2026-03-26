import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import Home from './pages/Home';
import Memories from './pages/Memories';
import Final from './pages/Final';
import musicFile from './assets/Music.mp3';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - React Router type definitions sometimes miss the React key prop */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/final" element={<Final />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log("Autoplay prevented:", error);
        });
      }
    };

    // Try to play immediately if the browser allows it
    playAudio();

    // Fallback: play on the first user interaction
    document.addEventListener('click', playAudio, { once: true });
    
    return () => {
      document.removeEventListener('click', playAudio);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={musicFile} loop />
      <Router>
        <AnimatedRoutes />
      </Router>
    </>
  );
}
