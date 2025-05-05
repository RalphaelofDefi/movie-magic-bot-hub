
import { useEffect, useState, useRef } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypingAnimation = ({ 
  text, 
  speed = 100, 
  delay = 0,
  className = ""
}: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let startDelay: NodeJS.Timeout;
    
    if (delay > 0) {
      startDelay = setTimeout(() => {
        startTyping();
      }, delay);
    } else {
      startTyping();
    }
    
    return () => {
      if (startDelay) clearTimeout(startDelay);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const startTyping = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex > text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prevIndex;
        }
        setDisplayedText(text.substring(0, nextIndex));
        return nextIndex;
      });
    }, speed);
  };

  return <span className={className}>{displayedText}</span>;
};

export default TypingAnimation;
