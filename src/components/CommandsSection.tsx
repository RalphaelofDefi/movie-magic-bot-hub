
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import TypingAnimation from './TypingAnimation';

const commands = [
  {
    command: "/movie <name>",
    description: "Get movie info and download link",
    example: "/movie Interstellar",
    result: [
      { type: 'info', text: 'Searching for "Interstellar"...' },
      { type: 'result', text: 'Title: Interstellar (2014)' },
      { type: 'result', text: 'Director: Christopher Nolan' },
      { type: 'result', text: 'Rating: 8.6/10' },
      { type: 'link', text: 'Download Link: [DIRECT LINK]' }
    ]
  },
  {
    command: "/subtitle <name>",
    description: "Get subtitle download link",
    example: "/subtitle The Matrix",
    result: [
      { type: 'info', text: 'Searching for "The Matrix" subtitles...' },
      { type: 'result', text: 'Found 3 subtitle options:' },
      { type: 'result', text: '- English (US) [CC]' },
      { type: 'result', text: '- English (UK)' },
      { type: 'result', text: '- Spanish (Latin America)' },
      { type: 'link', text: 'Download Link: [SUBTITLE PACK]' }
    ]
  }
];

const CommandsSection = () => {
  const [activeCommand, setActiveCommand] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  const handleCommandClick = (index: number) => {
    setActiveCommand(index);
    setShowResult(false);
    setIsTyping(true);
    
    setTimeout(() => {
      setShowResult(true);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <section id="commands" className="py-20 px-4 bg-cinema relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cinema-dark to-transparent"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient"
        >
          Simple Commands
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass-card p-6 rounded-xl overflow-hidden">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4 text-sm text-gray-400">CinemosBot Terminal</div>
              </div>
              
              <div className="bg-black p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                <div className="flex mb-2">
                  <span className="text-green-500 mr-2">user@cinemosbot:~$</span>
                  {isTyping ? (
                    <TypingAnimation 
                      text={commands[activeCommand].example} 
                      speed={50}
                      className="text-white"
                    />
                  ) : (
                    <span className="text-white">{commands[activeCommand].example}</span>
                  )}
                </div>
                
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {commands[activeCommand].result.map((line, i) => (
                      <div 
                        key={i} 
                        className={`mb-1 ${
                          line.type === 'info' ? 'text-blue-400' : 
                          line.type === 'link' ? 'text-cinema-accent' : 'text-white'
                        }`}
                      >
                        <TypingAnimation 
                          text={line.text} 
                          speed={30} 
                          delay={i * 500} 
                        />
                      </div>
                    ))}
                    <div className="flex mt-3">
                      <span className="text-green-500 mr-2">user@cinemosbot:~$</span>
                      <span className="text-white animate-pulse">_</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {commands.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`glass-card p-6 rounded-xl transition-all cursor-pointer ${
                  activeCommand === index ? 'bg-white/15 border-cinema-accent' : 'hover:bg-white/10'
                }`}
                onClick={() => handleCommandClick(index)}
              >
                <div className="command-text text-cinema-accent text-xl mb-2">{item.command}</div>
                <p className="text-gray-300 mb-3">{item.description}</p>
                <div className="bg-cinema-dark p-2 rounded text-sm">
                  Example: <span className="text-cinema-accent">{item.example}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommandsSection;
