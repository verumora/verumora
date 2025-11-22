import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal, Monitor, Camera } from 'lucide-react';
import { ComparisonItem } from '../types';

const comparisons: ComparisonItem[] = [
  {
    id: 1,
    title: "Digital Metamorphosis",
    description: "Case Study: Construction Inc. From a cluttered legacy portal to a sleek, authority-commanding digital fortress.",
    type: "WEB",
    beforeImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80", // Bright Construction Site
    afterImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"  // Dark Modern Architecture
  },
  {
    id: 2,
    title: "AI Visual Synthesis",
    description: "From raw smartphone photography to studio-grade perfection in seconds.",
    type: "PHOTO",
    beforeImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80", // Raw Sneaker
    afterImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"  // Stylized Sneaker
  }
];

const CompareSlider: React.FC<{ item: ComparisonItem }> = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let clientX;

    if ('touches' in event) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = (event as MouseEvent).clientX;
    }

    const position = ((clientX - containerRect.left) / containerRect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="mb-12 md:mb-24 last:mb-0">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 md:mb-8 items-start">
        <div className="bg-neutral-900 p-3 md:p-4 rounded-full shrink-0 hidden md:block">
            {item.type === 'WEB' ? <Monitor className="text-white w-6 h-6" /> : <Camera className="text-white w-6 h-6" />}
        </div>
        <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="md:hidden bg-neutral-900 p-2 rounded-full shrink-0">
                    {item.type === 'WEB' ? <Monitor className="text-white w-4 h-4" /> : <Camera className="text-white w-4 h-4" />}
                </div>
                <h3 className="text-xl md:text-4xl font-bold uppercase tracking-tight">{item.title}</h3>
            </div>
            <p className="text-neutral-400 text-sm md:text-base max-w-lg">{item.description}</p>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden cursor-ew-resize select-none group touch-pan-y touch-action-none rounded-sm md:rounded-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Before Image (Background) */}
        <img 
          src={item.beforeImage} 
          alt={`Before transformation: ${item.title}`}
          className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
        />
        <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/70 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 uppercase tracking-widest border border-white/20 z-10">
          Before
        </div>

        {/* After Image (Foreground - Clipped) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
        >
          <img 
            src={item.afterImage} 
            alt={`After transformation: ${item.title} - Professional Design`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/90 backdrop-blur-sm text-black text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 uppercase tracking-widest shadow-lg z-10">
            After
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute inset-y-0 w-0.5 md:w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
            <MoveHorizontal className="text-black w-4 h-4 md:w-6 md:h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Transformation: React.FC = () => {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10 md:mb-16 text-center">
           <span className="text-xs md:text-sm font-mono text-neutral-500 uppercase tracking-[0.3em] mb-3 md:mb-4 block">Evidence of Execution</span>
           <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
             The <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800">Upgrade</span>
           </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          {comparisons.map((item) => (
            <CompareSlider key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Transformation;