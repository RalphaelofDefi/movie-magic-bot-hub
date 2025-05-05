
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MovieCardProps {
  title: string;
  year: string;
  imageUrl: string;
  rating: string;
}

const MovieCard3D = ({ title, year, imageUrl, rating }: MovieCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="movie-card aspect-[2/3] rounded-lg overflow-hidden relative shadow-xl transition-all duration-300"
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Movie poster */}
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>
      
      {/* Movie info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="font-bold text-lg">{title}</div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-gray-300">{year}</span>
          <span className="bg-cinema-accent py-1 px-2 rounded text-xs">{rating}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard3D;
