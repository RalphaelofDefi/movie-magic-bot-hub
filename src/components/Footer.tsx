
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">CinemosBot</h3>
            <p className="text-gray-400 mb-4">Download any movie instantly without ads, payments, or hassle.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:text-center"
          >
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-cinema-accent transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-cinema-accent transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-cinema-accent transition-colors">How It Works</a></li>
              <li><a href="#commands" className="hover:text-cinema-accent transition-colors">Commands</a></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:text-right"
          >
            <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Join our Telegram channel for updates</p>
            <button 
              className="bg-[#229ED9] text-white px-4 py-2 rounded hover:bg-[#1D8AC0] transition-colors"
              onClick={() => window.open('https://t.me/CinemosBot', '_blank')}
            >
              Join Telegram
            </button>
          </motion.div>
        </div>
        
        <div className="border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
          <p>© 2025 CinemosBot. All rights reserved.</p>
          <p className="mt-2">This service is for educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
