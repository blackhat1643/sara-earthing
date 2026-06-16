'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Factory, Building2, Home, Power, Database, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { getImageUrl } from '@/utils/imageUrl';

const apps = [
  {
    id: 'manufacturing',
    title: 'Manufacturing & Heavy Industry',
    description: 'High load machinery and automated assembly lines demand absolute voltage stability to prevent downtime.',
    features: ['Voltage Stability', 'Downtime Prevention', 'Equipment Safety'],
    icon: Factory,
    image: '/images/Manufacturing & Heavy Industries.webp',
    tag: 'MANUFACTURING'
  },
  {
    id: 'commercial',
    title: 'Commercial Real Estate',
    description: 'Modern commercial architecture and high-rise buildings require comprehensive structural defense and safety grids to protect assets, electronics, and occupants.',
    features: ['Structural Defense', 'Safety Grids', 'Asset Protection'],
    icon: Building2,
    image: '/images/Commercial Real Estate.webp',
    tag: 'COMMERCIAL'
  },
  {
    id: 'datacenter',
    title: 'Data Centers & Telecom',
    description: 'Sensitive digital infrastructure requires a zero noise, ultra low resistance grounding network to maintain constant uptime and protect critical data integrity.',
    features: ['Zero Noise', 'Low Resistance', 'Constant Uptime'],
    icon: Database,
    image: '/images/Data Centers & Telecom.webp',
    tag: 'DIGITAL'
  },
  {
    id: 'power',
    title: 'Power & Renewable Energy',
    description: 'Solar farms, wind fields, and substations span vast terrains with highly variable soil resistivity, requiring highly adaptive grounding engineering.',
    features: ['Adaptive Grounding', 'Variable Soil Solutions', 'Wide Terrain Safety'],
    icon: Power,
    image: '/images/Power & Renewable Energy.webp',
    tag: 'ENERGY'
  },
  {
    id: 'residential',
    title: 'Homes & Hotels',
    description: 'Premium residential properties and hospitality venues prioritize uninterrupted luxury, guest comfort, and the total protection of automation systems.',
    features: ['Uninterrupted Luxury', 'Guest Comfort', 'Automation Protection'],
    icon: Home,
    image: '/images/Homes & Horels.webp',
    tag: 'RESIDENTIAL'
  }
];

export default function Applications() {
  const containerRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2); // Default Server Render

  useEffect(() => {
    const handleResize = () => setItemsPerPage(window.innerWidth < 1024 ? 1 : 2);
    handleResize(); // Set initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageCount = Math.ceil(apps.length / itemsPerPage);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % pageCount);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + pageCount) % pageCount);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % pageCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [pageCount]);

  const visibleApps = apps.slice(index * itemsPerPage, (index * itemsPerPage) + itemsPerPage);

  return (
    <section
      ref={containerRef}
      id="applications"
      className="bg-[#0a0f1d] relative w-full min-h-screen py-8 overflow-hidden"
    >
      <div className="relative max-w-[1600px] mx-auto pl-[70px] pr-6 md:pl-[12%] md:pr-6 h-full z-10">
        <div className="w-full p-4 relative z-10">
          {/* Section Header */}
          <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8 text-center md:text-left">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
              >
                Sector Specifics
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-display leading-[1.1] tracking-tighter uppercase">
                Industries We <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#b8860b]">
                  Serve
                </span>
              </h2>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button onClick={prev} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#d4af37] hover:border-[#d4af37] transition-all duration-300 group">
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button onClick={next} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#d4af37] hover:border-[#d4af37] transition-all duration-300 group">
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Dynamic Dual Card View */}
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
              >
                {visibleApps.map((app, i) => (
                  <div 
                    key={app.id}
                    className="group relative flex flex-col bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-500 shadow-2xl mx-auto w-full max-w-[500px]"
                  >
                    {/* Card Header: Cinematic Image */}
                    <div className="relative aspect-[2/1] overflow-hidden">
                      <img 
                        src={getImageUrl(app.image)} 
                        alt={app.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#d4af37] text-[#0a0f1d] text-[9px] font-black rounded-full uppercase tracking-widest shadow-lg">
                          {app.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-5 left-5">
                         <h3 className="text-xl md:text-2xl font-black text-white font-display leading-[1] tracking-tight uppercase whitespace-pre-line">
                          {app.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Body: Tech Details */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 flex items-center justify-center mb-4 border border-[#d4af37]/30">
                        <app.icon className="text-[#d4af37]" size={16} />
                      </div>
                      
                      <p className="text-white/60 text-sm leading-relaxed font-medium mb-4">
                        {app.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Custom Pagination Progress */}
          <div className="mt-8 flex items-center justify-center gap-4">
             {Array.from({ length: pageCount }).map((_, idx) => (
               <button 
                 key={idx}
                 onClick={() => {
                   setDirection(idx > index ? 1 : -1);
                   setIndex(idx);
                 }}
                 className={`h-1 rounded-full transition-all duration-500 ${index === idx ? 'w-12 bg-[#d4af37]' : 'w-4 bg-white/10 hover:bg-white/20'}`}
               />
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
