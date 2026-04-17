'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Power, Droplets, Home, Radio, Wind, Database, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
const apps = [
  {
    id: 'power',
    title: 'Power Generation',
    description: 'Advanced earthing systems tailored to meet the critical demands and massive scale of power generation facilities.',
    features: ['High-Current Grounding', 'Thermal Stability', 'Corrosion Resistance'],
    icon: Power,
    image: '/images/refinery_app.png',
    tag: 'ENERGY'
  },
  {
    id: 'refineries',
    title: 'Industrial Refineries',
    description: 'Ensure absolute safety in highly combustible environments with our spark-free, durable exothermic welding.',
    features: ['Explosion Prevention', 'Low Impedance', 'Chemical Grade'],
    icon: Droplets,
    image: '/images/welding.png',
    tag: 'CHEMICAL'
  },
  {
    id: 'residential',
    title: 'Homes & Residences',
    description: 'Protecting families and household electrical systems from lightning strikes and surges.',
    features: ['Lightning Protection', 'Home Surge Safety', 'Lifelong Duration'],
    icon: Home,
    image: '/images/accessories.png',
    tag: 'SOCIETAL'
  },
  {
    id: 'telecom',
    title: 'Telecom Towers',
    description: 'Maintaining seamless communication networks with stable, low-resistance grounding solutions.',
    icon: Radio,
    features: ['Signal Integrity', 'Tower Earthing', 'Weather Proof'],
    image: '/images/refinery_app.png',
    tag: 'CONNECTIVITY'
  },
  {
    id: 'wind',
    title: 'Wind Energy',
    description: 'Comprehensive lightning protection for towering windmill structures exposed in open fields.',
    icon: Wind,
    features: ['High Altitude Safety', 'Rugged Build', 'Grid Stability'],
    image: '/images/welding.png',
    tag: 'RENEWABLES'
  },
  {
    id: 'data',
    title: 'Data Centers',
    description: 'Zero-downtime grounding frameworks to secure sensitive servers and mass data storage systems.',
    icon: Database,
    features: ['Uptime Security', 'Pure Grounding', 'Digital Protection'],
    image: '/images/refinery_app.png',
    tag: 'DIGITAL'
  }
];

export default function Applications() {
  const containerRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // We show 2 apps at once.
  const itemsPerPage = 2;
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
      <div className="relative max-w-[1600px] mx-auto px-6 h-full z-10">
        <div className="lg:ml-[10%] lg:w-[90%] w-full p-4 relative z-10">
          {/* Section Header */}
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
              >
                Sector Specifics
              </motion.span>
              <h2 className="text-5xl md:text-6xl font-black text-white font-display leading-[0.9] tracking-tighter uppercase">
                Industrial <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#b8860b]">
                  Impact
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
          <div className="relative min-h-[500px]">
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
                      <Image 
                        src={app.image} 
                        alt={app.title} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
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
                      
                      <p className="text-white/60 text-sm leading-relaxed font-medium mb-4 line-clamp-2">
                        {app.description}
                      </p>
                      
                      <div className="space-y-2 mb-6">
                        {app.features.map(feat => (
                          <div key={feat} className="flex items-center gap-2 text-white/90 font-bold uppercase tracking-wide text-[10px]">
                            <CheckCircle2 size={12} className="text-[#d4af37]" />
                            {feat}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                        <div className="flex -space-x-2 items-center">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0f1d] bg-slate-800 flex items-center justify-center overflow-hidden">
                               <div className="w-full h-full bg-[#d4af37]/10" />
                            </div>
                          ))}
                        </div>
                        <button className="text-[#d4af37] text-[10px] font-bold uppercase tracking-widest hover:tracking-[0.2em] transition-all">
                          Case Study
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Custom Pagination Progress */}
          <div className="mt-20 flex items-center justify-center gap-4">
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
