
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TypingAnimation from './TypingAnimation';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const filmReelRef = useRef<HTMLDivElement>(null);
  const [command, setCommand] = useState("/movie Inception");
  const commands = ["/movie Inception", "/movie Interstellar", "/movie The Matrix", "/subtitle Avatar"];
  const [commandIndex, setCommandIndex] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!filmReelRef.current) return;
      
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      filmReelRef.current.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${xPos * 2}deg)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cycle through commands
    const interval = setInterval(() => {
      setCommandIndex((prevIndex) => (prevIndex + 1) % commands.length);
      setCommand("");
      setTimeout(() => {
        setCommand(commands[(commandIndex + 1) % commands.length]);
      }, 500);
    }, 5000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [commandIndex, commands]);
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-pattern py-20 px-4">
      {/* Floating film reel */}
      <motion.div 
        ref={filmReelRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute -right-20 md:right-10 top-40 w-64 h-64 opacity-20 animate-spin-slow pointer-events-none"
      >
        <div className="w-full h-full rounded-full border-8 border-dashed border-cinema-accent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-cinema-accent"></div>
      </motion.div>
      
      {/* Floating dots */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute left-10 bottom-20 w-20 h-20 flex gap-2 flex-wrap animate-float opacity-30 pointer-events-none"
      >
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-4 h-4 rounded-full bg-cinema-accent"></div>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center z-10"
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 text-gradient">
          CINEMOS
          <span className="animate-pulse">BOT</span>
        </h1>
        <p className="text-sm md:text-xl mb-8 max-w-2xl mx-auto">
          Download any movie instantly without ads, payments, or hassle. Direct links to your favorite films with a simple command.
        </p>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-6 mb-10 max-w-lg mx-auto rounded-xl"
        >
          <p className="command-text text-lg mb-2">Try it now:</p>
          <div className="bg-cinema-dark p-3 rounded-lg flex items-center mb-2 h-10">
            <span className="text-cinema-accent mr-2">&gt;</span>
            <TypingAnimation text={command} speed={70} className="typing-animation" />
          </div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            className="bg-cinema-accent hover:bg-cinema-accent/90 text-white px-8 py-6 text-xl rounded-full shadow-lg shadow-cinema-accent/25"
            size="lg"
          >
            Try Now <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
