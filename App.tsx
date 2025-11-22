import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Transformation from './components/Transformation';
import AiDemo from './components/AiDemo';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-neutral-950 text-white min-h-screen selection:bg-white selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      {/* Custom Cursor - Only visible on Desktop */}
      <div 
        className="cursor-dot hidden md:block pointer-events-none fixed z-[9999]" 
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
      <div 
        className="cursor-dot-outline hidden md:block pointer-events-none fixed z-[9999]" 
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <Work />
        <Transformation />
        <AiDemo />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;