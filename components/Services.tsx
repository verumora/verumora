import React from 'react';
import { Monitor, PenTool, Camera, Share2, Type, Cpu } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: 'Web Design',
    description: 'Interfaces that addict. Performance that kills. We build digital flagships, not just websites.',
    icon: Monitor,
  },
  {
    title: 'Graphic Design',
    description: 'Visuals that burn into the retina. Branding that commands authority in a saturated market.',
    icon: PenTool,
  },
  {
    title: 'AI Photography',
    description: 'Product shoots without the studio. Unlimited creativity, physically impossible lighting, instant results.',
    icon: Camera,
  },
  {
    title: 'Social Mgmt',
    description: 'We don’t just post. We infiltrate feeds. Strategic content that turns scrollers into worshippers.',
    icon: Share2,
  },
  {
    title: 'Copywriting',
    description: 'Words as weapons. Persuasion architecture that converts skepticism into sales.',
    icon: Type,
  },
  {
    title: 'AI Integration',
    description: 'Future-proof your workflow. We implement AI solutions that automate the mundane.',
    icon: Cpu,
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-neutral-950 relative scroll-mt-24 md:scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-start md:flex-row md:justify-between md:items-end mb-16 md:mb-24">
             <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                Our <br/><span className="text-neutral-600">Arsenal</span>
             </h2>
             <p className="text-neutral-400 max-w-xs text-left md:text-right mt-4 md:mt-0 text-sm md:text-base">
                 Comprehensive digital warfare tools for the modern brand.
             </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900 border border-neutral-900">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-neutral-950 p-6 md:p-12 hover:bg-neutral-900 transition-colors duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 md:p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                 <service.icon size={48} className="w-8 h-8 md:w-12 md:h-12" />
              </div>
              
              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="mb-6 md:mb-8">
                    <span className="text-xs font-mono text-neutral-600 mb-3 md:mb-4 block">0{index + 1}</span>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-2 md:mb-4 group-hover:translate-x-2 transition-transform duration-300">
                    {service.title}
                    </h3>
                </div>
                
                <p className="text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;