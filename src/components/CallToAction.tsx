
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cinema-accent/20 to-cinema-highlight/20 blur-3xl -z-10"></div>
      
      <div className="absolute top-10 left-10 w-40 h-40 bg-cinema-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-cinema-highlight/10 rounded-full blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
          Start Downloading Movies Today
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Join thousands of users who are already enjoying ad-free, hassle-free movie downloads with CinemosBot.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            className="bg-cinema-accent hover:bg-cinema-accent/90 text-white px-10 py-8 text-2xl rounded-full shadow-lg shadow-cinema-accent/30"
            size="lg"
          >
            Try Now <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-10 text-sm text-gray-400"
        >
          <p>No registration required. Start using immediately.</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
