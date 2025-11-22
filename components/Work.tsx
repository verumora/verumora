import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PortfolioItem } from '../types';

const projects: PortfolioItem[] = [
  {
    id: 1,
    title: "Neon Nexus",
    category: "E-Commerce / Web3",
    // Abstract dark 3D fluid shapes for futuristic/web3 vibe
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    year: "2024"
  },
  {
    id: 2,
    title: "Architectura",
    category: "Portfolio / Minimal",
    // Clean geometric architecture
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    year: "2024"
  },
  {
    id: 3,
    title: "Vanguard SaaS",
    category: "Dashboard / Fintech",
    // Data visualization on dark screen
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    year: "2023"
  },
  {
    id: 4,
    title: "Onyx Fashion",
    category: "Brand Identity",
    // High contrast fashion editorial
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    year: "2023"
  }
];

const Work: React.FC = () => {
  return (
    <section id="work" className="py-24 bg-neutral-950 border-b border-neutral-900 scroll-mt-24 md:scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-start md:flex-row md:justify-between md:items-end mb-16 md:mb-24">
          <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter">
            Selected <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600">Works</span>
          </h2>
          <button type="button" className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 cursor-not-allowed hover:text-neutral-500 mt-8 md:mt-0" title="Coming Soon" disabled>
            View Full Archive <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project) => (
            <div key={project.id} className="group md:cursor-none relative">
              <div className="relative overflow-hidden aspect-[4/3] mb-4 md:mb-6">
                <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                <img 
                  src={project.image} 
                  alt={`${project.title} - ${project.category} Design Project`}
                  className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="flex justify-between items-start border-t border-neutral-800 pt-4 md:pt-6 group-hover:border-white transition-colors duration-500">
                <div>
                  <h3 className="text-xl md:text-3xl font-bold uppercase tracking-wide mb-1">{project.title}</h3>
                  <p className="text-neutral-500 text-xs md:text-base font-mono uppercase">{project.category}</p>
                </div>
                <span className="text-neutral-600 font-mono text-sm">{project.year}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:hidden text-center">
           <button type="button" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-neutral-700 text-neutral-500 pb-1 cursor-not-allowed" disabled>
            View Full Archive <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Work;