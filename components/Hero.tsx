import React from 'react';
import { ArrowDownRight } from 'lucide-react';

const Hero: React.FC = () => {
  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center pt-32 md:pt-20 overflow-hidden w-full">
      {/* Custom Animations */}
      <style>{`
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 md:top-1/4 -right-20 md:right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-neutral-900 rounded-full blur-[60px] md:blur-[120px] opacity-50 animate-float" />
        <div className="absolute bottom-0 -left-10 md:left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-neutral-800 rounded-full blur-[50px] md:blur-[80px] opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          <h2 className="text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.5em] text-neutral-500 mb-4 md:mb-6 animate-pulse">
            Digital Agency • Est. 2025
          </h2>
          
          {/* Animated Headline */}
          <h1 className="text-[13vw] md:text-[11vw] lg:text-[10vw] leading-[0.85] md:leading-[0.8] font-black uppercase tracking-tighter mix-blend-difference mb-8 md:mb-10">
            <span className="block animate-fade-up" style={{ animationDelay: '0ms' }}>We Don't</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white animate-fade-up" style={{ animationDelay: '150ms' }}>Just Design.</span>
            <span className="block animate-fade-up" style={{ animationDelay: '300ms' }}>We Dominate.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-end justify-between mt-8 md:mt-12 border-t border-neutral-800 pt-8 md:pt-12">
            <p 
              className="text-neutral-400 max-w-md text-sm md:text-lg leading-relaxed animate-fade-up" 
              style={{ animationDelay: '450ms' }}
            >
              Verumora strips away the noise. We forge digital identities that are brutally effective and elegantly minimal. Web. Graphics. AI. Copy.
            </p>
            
            <a 
              href="#services" 
              onClick={handleScrollToServices}
              className="group flex items-center gap-4 text-base md:text-xl uppercase font-bold tracking-wider hover:text-neutral-400 transition-all duration-300 cursor-pointer mt-4 md:mt-0 animate-fade-up active:scale-95 hover:scale-105 origin-left md:origin-center"
              style={{ animationDelay: '600ms' }}
            >
              Explore Capabilities
              <span className="bg-white text-black p-2 md:p-3 rounded-full group-hover:rotate-45 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <ArrowDownRight className="w-4 h-4 md:w-6 md:h-6" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;