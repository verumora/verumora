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

  // Close mobile menu on resize to desktop to prevent "transparent nav" bug
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Aggressive Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      // We removed the height: 100vh constraint here as it can sometimes cause layout shifts.
      // overflow: hidden is usually sufficient for the overlay approach.
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-[background-color,padding,border-color] duration-500 ${
          // When open, nav container is transparent to let full-screen overlay show
          isOpen 
            ? 'bg-transparent border-transparent' 
            : isScrolled 
              ? 'bg-neutral-950/90 backdrop-blur-md py-4 border-b border-white/5' 
              : 'bg-transparent py-6 md:py-8 border-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          {/* Logo - Z-50 to sit above menu */}
          <a 
            href="#" 
            onClick={handleLogoClick}
            className="text-2xl md:text-3xl font-bold tracking-tighter flex items-center gap-2 group relative z-50"
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

          {/* Mobile Toggle - Z-50 to sit above menu */}
          <button
            className="md:hidden text-white relative z-50 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Independent Fixed Layer */}
      {/* 
         - justify-start + pt-32: Ensures links start BELOW the header, preventing overlap with logo.
         - overflow-y-auto: Allows scrolling if phone height is small (landscape).
         - touch-action-none: Removed to allow scrolling inside the menu if needed.
      */}
      <div
        className={`md:hidden fixed inset-0 bg-neutral-950 z-[45] flex flex-col items-center justify-start pt-32 transition-opacity duration-300 overflow-y-auto ${
          isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col gap-8 text-center pb-12">
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
    </>
  );
};

export default Navbar;







// import React, { useState, useEffect } from 'react';
// import { Menu, X, Mountain } from 'lucide-react';

// const Navbar: React.FC = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Aggressive Scroll Lock
//   useEffect(() => {
//     if (isOpen) {
//       document.documentElement.style.overflow = 'hidden';
//       document.body.style.overflow = 'hidden';
//       document.body.style.height = '100vh'; // Prevent rubber-banding
//     } else {
//       document.documentElement.style.overflow = '';
//       document.body.style.overflow = '';
//       document.body.style.height = '';
//     }
//     return () => {
//       document.documentElement.style.overflow = '';
//       document.body.style.overflow = '';
//       document.body.style.height = '';
//     };
//   }, [isOpen]);

//   const navLinks = [
//     { name: 'Services', href: '#services' },
//     { name: 'Work', href: '#work' },
//     { name: 'AI Lab', href: '#ai-lab' },
//     { name: 'Contact', href: '#contact' },
//   ];

//   const handleLogoClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     setIsOpen(false);
//   };

//   const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//     e.preventDefault();
//     setIsOpen(false);
    
//     const targetId = href.replace('#', '');
//     const element = document.getElementById(targetId);
    
//     if (element) {
//       // Small timeout to allow menu to close before scrolling
//       setTimeout(() => {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }, 100);
//     }
//   };

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 w-full z-50 transition-[background-color,padding,border-color] duration-500 ${
//           // When open, nav container is transparent to let full-screen overlay show
//           isOpen 
//             ? 'bg-transparent border-transparent' 
//             : isScrolled 
//               ? 'bg-neutral-950/90 backdrop-blur-md py-4 border-b border-white/5' 
//               : 'bg-transparent py-6 md:py-8 border-transparent'
//         }`}
//         role="navigation"
//         aria-label="Main navigation"
//       >
//         <div className="container mx-auto px-6 flex justify-between items-center relative">
//           {/* Logo - Z-50 to sit above menu */}
//           <a 
//             href="#" 
//             onClick={handleLogoClick}
//             className="text-2xl md:text-3xl font-bold tracking-tighter flex items-center gap-2 group relative z-50"
//             aria-label="Verumora Home"
//           >
//              <span className="group-hover:text-neutral-400 transition-colors">VERU</span>
//              <Mountain className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" stroke="none" />
//              <span className="group-hover:text-neutral-400 transition-colors">ORA</span>
//           </a>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-12">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 onClick={(e) => handleNavClick(e, link.href)}
//                 className="text-xs lg:text-sm uppercase tracking-widest font-semibold hover:text-neutral-400 transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full"
//               >
//                 {link.name}
//               </a>
//             ))}
//             <a 
//               href="#contact" 
//               onClick={(e) => handleNavClick(e, '#contact')}
//               className="bg-white text-black px-6 py-2 text-xs lg:text-sm font-bold uppercase tracking-widest hover:bg-neutral-300 transition-colors"
//               aria-label="Start Project"
//             >
//               Start Project
//             </a>
//           </div>

//           {/* Mobile Toggle - Z-50 to sit above menu */}
//           <button
//             className="md:hidden text-white relative z-50 p-2"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label={isOpen ? "Close menu" : "Open menu"}
//             aria-expanded={isOpen}
//           >
//             {isOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay - Independent Fixed Layer */}
//       <div
//         className={`md:hidden fixed inset-0 bg-neutral-950 z-[45] flex flex-col justify-center items-center transition-opacity duration-300 overflow-hidden touch-none ${
//           isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
//         }`}
//         aria-hidden={!isOpen}
//       >
//         <div className="flex flex-col gap-8 text-center">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               className="text-3xl font-black uppercase tracking-widest hover:text-neutral-400 transition-colors"
//               onClick={(e) => handleNavClick(e, link.href)}
//             >
//               {link.name}
//             </a>
//           ))}
//           <a 
//             href="#contact"
//             onClick={(e) => handleNavClick(e, '#contact')}
//             className="mt-8 bg-white text-black px-8 py-4 text-lg font-bold uppercase tracking-widest inline-block"
//           >
//             Start Project
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
