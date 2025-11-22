import React, { useState, useEffect } from 'react';
import { Menu, X, Mountain } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'AI Lab', href: '#ai-lab' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-neutral-950/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6 md:py-8'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          onClick={handleLogoClick}
          className="text-2xl md:text-3xl font-bold tracking-tighter flex items-center gap-2 group z-50"
          aria-label="Verumora Home"
        >
           <span className="group-hover:text-neutral-400 transition-colors">VERU</span>
           <Mountain className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" stroke="none" />
           <span className="group-hover:text-neutral-400 transition-colors">ORA</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs lg:text-sm uppercase tracking-widest font-semibold hover:text-neutral-400 transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-white text-black px-6 py-2 text-xs lg:text-sm font-bold uppercase tracking-widest hover:bg-neutral-300 transition-colors"
            aria-label="Start Project"
          >
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-neutral-950 z-40 flex flex-col justify-center items-center transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-3xl font-black uppercase tracking-widest hover:text-neutral-400 transition-colors"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-8 bg-white text-black px-8 py-4 text-lg font-bold uppercase tracking-widest inline-block"
          >
            Start Project
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;