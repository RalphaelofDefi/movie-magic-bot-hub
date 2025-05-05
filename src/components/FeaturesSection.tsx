
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MovieCard3D from './MovieCard3D';

const features = [
  {
    title: "Ad-Free Experience",
    description: "No more annoying advertisements to watch before downloading your favorite movies.",
    icon: "🚫"
  },
  {
    title: "Direct Download Links",
    description: "Get straight download links without any hassle or redirects.",
    icon: "⚡"
  },
  {
    title: "Zero Cost",
    description: "Completely free access to movie downloads. No subscriptions needed.",
    icon: "💸"
  }
];

const movies = [
  {
    title: "Dune: Part Two",
    year: "2024",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BODI0YjNhNjUtYjM0MS00Mzc5LTljYTctNjU0OTg3OGQzYzI2XkEyXkFqcGdeQXVyMTEyNzQ1MTk0._V1_.jpg",
    rating: "8.7/10"
  },
  {
    title: "Oppenheimer",
    year: "2023",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
    rating: "8.4/10"
  },
  {
    title: "The Batman",
    year: "2022",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
    rating: "7.8/10"
  }
];

const FeaturesSection = () => {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  return (
    <section className="py-20 px-4 cinema-gradient">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient"
        >
          Movie Downloads Made Simple
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  ref={el => featureRefs.current[index] = el}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-8 rounded-xl"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex justify-center items-center relative h-[500px]">
            {movies.map((movie, index) => (
              <div 
                key={index} 
                className="absolute w-48"
                style={{ 
                  transform: `translateX(${(index-1)*60}px) translateZ(${index*20-40}px) rotateY(${(index-1)*-5}deg)`,
                  zIndex: 10 - index,
                  filter: index !== 1 ? 'brightness(0.7)' : 'brightness(1)',
                }}
              >
                <MovieCard3D 
                  title={movie.title}
                  year={movie.year}
                  imageUrl={movie.imageUrl}
                  rating={movie.rating}
                />
              </div>
            ))}
            
            {/* Glow effect */}
            <div className="absolute w-full h-full bg-gradient-to-r from-cinema-accent/0 via-cinema-accent/20 to-cinema-accent/0 blur-3xl -z-10"></div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mt-10"
        >
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            CinemosBot makes movie downloads simple, fast, and enjoyable. No more wasting time dealing with pop-ups, redirects, or payment walls.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
