
import { useState } from 'react';
import { motion } from 'framer-motion';
import TelegramPreview from './TelegramPreview';

const commands = [
  {
    command: "/movie <name>",
    description: "Get movie info and download link",
    example: "/movie Interstellar",
  },
  {
    command: "/subtitle <name>",
    description: "Get subtitle download link",
    example: "/subtitle The Matrix",
  }
];

const CommandsSection = () => {
  const [activeCommand, setActiveCommand] = useState<number>(0);
  
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
            className="order-2 lg:order-1"
          >
            <TelegramPreview />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8 order-1 lg:order-2"
          >
            {commands.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`glass-card p-6 rounded-xl transition-all cursor-pointer ${
                  activeCommand === index ? 'bg-white/15 border-cinema-accent' : 'hover:bg-white/10'
                }`}
                onClick={() => setActiveCommand(index)}
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
