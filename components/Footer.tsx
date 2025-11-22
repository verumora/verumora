import React from 'react';
import { Mountain, ArrowUp, Instagram, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black py-12 border-t border-neutral-900">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2" aria-label="Verumora Logo">
           VERU<Mountain className="w-5 h-5 text-white" fill="currentColor" stroke="none" />ORA
        </div>
        
        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a 
            href="https://www.instagram.com/verumora.co/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Instagram</span>
          </a>
          <a 
            href="https://x.com/VerumoraCo" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group"
            aria-label="Follow us on X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Twitter</span>
          </a>
          <a 
            href="mailto:verumora.co@gmail.com" 
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group"
            aria-label="Email Us"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Email</span>
          </a>
        </div>

        {/* Copyright & Scroll Top */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-neutral-600 text-xs font-mono">
            © 2025 VERUMORA. ALL RIGHTS RESERVED.
          </div>
          <button 
            onClick={scrollToTop}
            className="bg-neutral-900 hover:bg-white hover:text-black text-white p-3 rounded-full transition-all duration-300 group"
            aria-label="Scroll to top"
          >
             <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;