'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Power, Droplets, Home, Radio, Wind, Database } from 'lucide-react';
import Image from 'next/image';

const apps = [
  {
    id: 'power',
    navName: 'POWER',
    title: 'Power Generation',
    description: 'Advanced earthing systems tailored to meet the critical demands and massive scale of power generation facilities.',
    icon: Power,
    image1: '/images/refinery_app.png',
    image2: '/images/welding.png'
  },
  {
    id: 'refineries',
    navName: 'REFINERIES',
    title: 'Industrial Refineries',
    description: 'Ensure absolute safety in highly combustible environments with our spark-free, durable exothermic welding.',
    icon: Droplets,
    image1: '/images/welding.png',
    image2: '/images/refinery_app.png'
  },
  {
    id: 'residential',
    navName: 'RESIDENTIAL',
    title: 'Homes & Residences',
    description: 'Protecting families and household electrical systems from lightning strikes and surges.',
    icon: Home,
    image1: '/images/accessories.png',
    image2: '/images/refinery_app.png'
  },
  {
    id: 'telecom',
    navName: 'TELECOM',
    title: 'Telecom Towers',
    description: 'Maintaining seamless communication networks with stable, low-resistance grounding solutions.',
    icon: Radio,
    image1: '/images/refinery_app.png',
    image2: '/images/accessories.png'
  },
  {
    id: 'wind',
    navName: 'WIND',
    title: 'Wind Energy',
    description: 'Comprehensive lightning protection for towering windmill structures exposed in open fields.',
    icon: Wind,
    image1: '/images/welding.png',
    image2: '/images/refinery_app.png'
  },
  {
    id: 'data',
    navName: 'DATA',
    title: 'Data Centers',
    description: 'Zero-downtime grounding frameworks to secure sensitive servers and mass data storage systems.',
    icon: Database,
    image1: '/images/refinery_app.png',
    image2: '/images/welding.png'
  }
];

// Variants for vertical sliding based on scroll direction
const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    y: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95
  })
};

const textVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.9
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    y: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.9
  })
};

export default function Applications() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalItems = apps.length;
    // Map 0 -> 1 progress to indices
    let idx = Math.floor(latest * totalItems);
    // At exactly 1 it might overflow to length
    if (idx >= totalItems) idx = totalItems - 1;
    if (idx < 0) idx = 0;

    if (idx !== activeIndex) {
      setDirection(idx > activeIndex ? 1 : -1);
      setActiveIndex(idx);
    }
  });

  const activeApp = apps[activeIndex];
  const prevApp = apps[activeIndex === 0 ? apps.length - 1 : activeIndex - 1];
  const nextApp = apps[activeIndex === apps.length - 1 ? 0 : activeIndex + 1];

  // Helper for manual clicks (still possible)
  const handleNavClick = (idx: number) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 1 : -1);
    // For manual clicks we could force jump by window scroll, but it's complex since it's scroll-based.
    // Let's just update the index for visual feedback if clicked.
    // Ideal: window.scrollTo corresponding section, simplified here:
    setActiveIndex(idx);
  };

  return (
    <section
      ref={containerRef}
      id="applications"
      className="bg-[#1a1b1e] relative w-full"
      style={{ height: `${apps.length * 80}vh` }} // 80vh scroll per item gives a smooth scroll duration
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center p-4 overflow-hidden">
        <div className="max-w-[1400px] w-full h-[90vh] md:h-[79vh] min-h-[600px] max-h-[850px] flex flex-col md:flex-row gap-4 md:gap-6 bg-[#1a1b1e]">

          {/* LEFT PANEL */}
          <div className="flex-1 bg-[#EBE7E0] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-xl">
            {/* Top text */}
            <div className="text-center w-full z-10">
              <span className="text-[#8c8881] text-xs font-bold uppercase tracking-[0.2em]">
                Other Industries
              </span>
            </div>

            {/* Center Vertical Title Slider */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 my-10 min-h-[300px]">

              {/* Ambient hints for previous/next */}
              <div className="absolute top-[27%] text-center w-full pointer-events-none opacity-20 transition-all duration-700">
                <div className="text-3xl md:text-3xl font-display text-[#1a1b1e] tracking-tight truncate px-4">
                  {prevApp.title}
                </div>
              </div>

              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={activeApp.id}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-1/2 -translate-y-1/2 text-center w-full z-20"
                >
                  <div className="text-4xl md:text-3xl font-black font-display text-[#1a1b1e] tracking-tight px-4 leading-[1.1]">
                    {activeApp.title}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-[67%] text-center w-full pointer-events-none opacity-20 transition-all duration-700">
                <div className="text-3xl md:text-3xl font-display text-[#1a1b1e] tracking-tight truncate px-4">
                  {nextApp.title}
                </div>
              </div>
            </div>

            {/* Bottom Horizontal Nav */}
            <div className="w-full overflow-x-auto no-scrollbar z-10 pb-2">
              <div className="flex items-center gap-6 md:gap-8 justify-start md:justify-center min-w-max px-2">
                {apps.map((app, idx) => (
                  <button
                    key={app.id}
                    onClick={() => handleNavClick(idx)}
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${activeIndex === idx
                      ? 'text-[#1a1b1e] scale-110'
                      : 'text-[#1a1b1e]/30 hover:text-[#1a1b1e]/60'
                      }`}
                  >
                    {app.navName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL (Images moving downside to upside) */}
          <div className="flex-[1.2] rounded-[2rem] overflow-hidden relative bg-[#1a1b1e]">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={activeApp.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={activeApp.image1}
                  alt={activeApp.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Glassmorphism description overlay */}
            <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 left-6 md:left-auto md:w-[450px] z-30 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`desc-${activeApp.id}`}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="glass-dark border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl bg-[#0a0f1d]/60"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 flex items-center justify-center mb-5 border border-[#d4af37]/30">
                    <activeApp.icon className="text-[#d4af37]" size={20} />
                  </div>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium">
                    {activeApp.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

