
import { useRef, useEffect } from 'react';

const steps = [
  {
    number: "01",
    title: "Request a Movie",
    description: "Simply send a movie title or keyword to the bot using the /movie command.",
    color: "from-blue-500 to-purple-500"
  },
  {
    number: "02",
    title: "Bot Searches",
    description: "CinemosBot searches for your movie and finds the best download option.",
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    title: "Get Your Download",
    description: "Receive a direct download link instantly, ready to enjoy your movie.",
    color: "from-pink-500 to-cinema-accent"
  }
];

const HowItWorksSection = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!lineRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionOffset = lineRef.current.offsetTop;
      const sectionHeight = lineRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition + windowHeight > sectionOffset) {
        const scrollPercentage = Math.min(
          1,
          (scrollPosition + windowHeight - sectionOffset) / (sectionHeight + windowHeight / 2)
        );
        
        lineRef.current.style.height = `${scrollPercentage * 100}%`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section className="py-20 px-4 bg-cinema-dark relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
          How It Works
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-700">
            <div 
              ref={lineRef} 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cinema-accent to-cinema-highlight h-0 transition-all duration-1000"
            ></div>
          </div>
          
          {/* Steps */}
          <div className="relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                ref={el => stepRefs.current[index] = el}
                className={`flex flex-col md:flex-row items-start mb-20 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[24px] md:left-1/2 md:transform md:-translate-x-1/2 w-[14px] h-[14px] rounded-full bg-cinema-accent z-20 mt-3"></div>
                
                {/* Step number */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-4 md:mb-0 ml-10 md:ml-0 bg-gradient-to-r ${step.color}`}>
                  {step.number}
                </div>
                
                {/* Content */}
                <div className={`ml-10 md:ml-0 md:w-5/12 ${
                  index % 2 === 1 ? 'md:mr-10 text-right' : 'md:ml-10'
                }`}>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
