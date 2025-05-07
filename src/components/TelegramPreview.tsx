
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, MoreVertical, Check } from 'lucide-react';
import TypingAnimation from './TypingAnimation';

interface MessageProps {
  text: string;
  time: string;
  isUser?: boolean;
  isCommand?: boolean;
  hasCheck?: boolean;
  delay?: number;
}

const Message = ({ text, time, isUser = false, isCommand = false, hasCheck = false, delay = 0 }: MessageProps) => {
  const [visible, setVisible] = useState(delay === 0);
  
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!visible) return null;

  if (isCommand && isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex flex-col items-end">
          <div className="bg-[#517DA5] text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-[280px] break-words">
            <span className="font-mono">{text}</span>
          </div>
          <div className="flex items-center mt-1 text-xs text-gray-400">
            {time}
            {hasCheck && <Check size={16} className="ml-1 text-[#517DA5]" />}
          </div>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex flex-col items-end">
          <div className="bg-[#517DA5] text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-[280px] break-words">
            {text}
          </div>
          <div className="flex items-center mt-1 text-xs text-gray-400">
            {time}
            {hasCheck && <Check size={16} className="ml-1 text-[#517DA5]" />}
          </div>
        </div>
      </div>
    );
  }

  const isError = text.startsWith('⚠️') || text.startsWith('❗');
  const isSearching = text.includes('Searching for');
  const isDownload = text.includes('Download:');
  const isMovieInfo = text.includes('Movie:') || text.includes('Series:');
  const isDescription = text.includes('Description:');
  const isClickHere = text.includes('Click Here');

  return (
    <div className="flex mb-4">
      <div className="flex flex-col">
        <div className={`px-4 py-2 rounded-2xl rounded-tl-none max-w-[280px] break-words
          ${isError ? 'bg-[#303841] text-white' : 'bg-[#303841] text-white'}`}>
          {isSearching ? (
            <>
              <span className="mr-2">🔍</span>
              <TypingAnimation text={text.replace('🔍', '')} speed={40} />
            </>
          ) : isMovieInfo ? (
            <>
              <span className="mr-2">🎬</span>
              {text.replace('🎬', '')}
            </>
          ) : isDescription ? (
            <>
              <span className="mr-2">📝</span>
              {text.replace('📝', '')}
            </>
          ) : isDownload ? (
            <>
              <span className="mr-2">📥</span>
              {text.split('Download:')[0]}
              {'Download: '}
              <span className="text-[#517DA5] underline cursor-pointer">
                {text.includes('Click Here') ? 'Click Here' : 'Download Link'}
              </span>
            </>
          ) : isClickHere ? (
            <>
              <span className="mr-2">🔗</span>
              {text.split('Click Here')[0]}
              <span className="text-[#517DA5] underline cursor-pointer">Click Here</span>
            </>
          ) : (
            text
          )}
        </div>
        <div className="mt-1 text-xs text-gray-400">{time}</div>
      </div>
    </div>
  );
};

const MoviePreview = ({ delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <div className="mt-2 mb-4 ml-4">
      <div className="bg-[#212931] p-3 rounded-md text-sm">
        <p className="text-[#517DA5] font-medium mb-2">FzMovies</p>
        <p className="text-white mb-2">Series: Marvel's Hit-Monkey (Season 2) Movie Download HD - FzMovies.net</p>
        <p className="text-gray-300 text-xs mb-3">Series: Marvel's Hit-Monkey (Season 2) movie download hd - In New York City, Monkey finds a path to escape his life of killing, while Bryce attempts to repair...</p>
        <div className="w-full h-48 bg-gray-800 rounded-md mb-1 overflow-hidden">
          <img 
            src="/lovable-uploads/2570e9c7-3f2a-4bf6-8084-5b208dae1a1c.png" 
            alt="Hit-Monkey Poster" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xs text-right text-gray-400">1:04 PM</div>
      </div>
    </div>
  );
};

const TelegramPreview = () => {
  const [currentCommand, setCurrentCommand] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showConversation, setShowConversation] = useState<boolean>(false);
  
  const handleStartConversation = () => {
    setIsTyping(true);
    setShowConversation(true);
    
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="glass-card overflow-hidden rounded-xl">
      {/* Telegram Header */}
      <div className="bg-[#212931] p-3 flex items-center justify-between">
        <div className="flex items-center">
          <ChevronLeft size={24} className="text-gray-400 mr-3" />
          <div className="w-10 h-10 bg-[#FF5757] rounded-full flex items-center justify-center text-white font-bold">
            C
          </div>
          <div className="ml-3">
            <div className="text-white font-medium">CinemosBot</div>
            <div className="text-gray-400 text-xs">bot</div>
          </div>
        </div>
        <MoreVertical size={24} className="text-gray-400" />
      </div>
      
      {/* Telegram Chat */}
      <div className="bg-[#1A222C] p-4 h-[500px] overflow-y-auto">
        {!showConversation ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-300 mb-4 text-center">See how the bot works by clicking below</p>
            <button 
              onClick={handleStartConversation}
              className="bg-cinema-accent hover:bg-cinema-accent/90 text-white px-6 py-2 rounded-lg"
            >
              Start Demo
            </button>
          </div>
        ) : (
          <>
            <Message text="/movie" time="1:03 PM" isUser isCommand hasCheck delay={500} />
            <Message text="❗ Usage: /movie <movie name>" time="1:03 PM" delay={1000} />
            <Message text="/movie Marvel's Hit-Monkey (Season 2)" time="1:04 PM" isUser isCommand hasCheck delay={2000} />
            <Message text="🔍 Searching for movie..." time="1:04 PM" delay={3000} />
            <Message text="🎬 Movie: Series: Marvel's Hit-Monkey (Season 2)" time="1:04 PM" delay={4500} />
            <Message text="🔗 Movie Page: Click Here" time="1:04 PM" delay={5500} />
            <Message 
              text="📝 Description: In New York City, Monkey finds a path to escape his life of killing, while Bryce attempts to repair the damage to those he wronged ..." 
              time="1:04 PM"
              delay={6500}
            />
            <Message text="📥 Download: Click Here" time="1:04 PM" delay={7500} />
            <MoviePreview delay={8500} />
          </>
        )}
      </div>
    </div>
  );
};

export default TelegramPreview;
