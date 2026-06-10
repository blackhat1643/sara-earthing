'use client';
import { useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, animate, useInView } from 'framer-motion';
import { useEffect } from 'react';
import { Briefcase, Users, Globe, Award } from 'lucide-react';

interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function ElectrodeIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* 1. Flat Plate Electrode Rod (Left Side - centered at X=4) */}
      <path d="M1 1h6v8l-2 2H3L1 9Z" />
      <path d="M3 9v15" />
      <path d="M5 9v15" />
      <circle cx="2.8" cy="3.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="5.2" cy="3.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="2.8" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="5.2" cy="6.5" r="0.5" fill="currentColor" stroke="none" />

      {/* 2. Thick 2-Hole Electrode Rod (Middle - centered at X=12) */}
      <path d="M10 8v16" />
      <path d="M14 8v16" />
      <path d="M10 8h1V2.5h2V8h1" />
      <circle cx="12" cy="4.2" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="6.2" r="0.4" fill="currentColor" stroke="none" />

      {/* 3. Lightning Arrester (Right Side - centered at X=20) */}
      <path d="M20 9V1" />
      <path d="M19 9l-3-6" />
      <path d="M21 9l3-6" />
      <path d="M18 9h4v2.5h-4Z" />
      <path d="M19 11.5v12.5" />
      <path d="M21 11.5v12.5" />
    </svg>
  );
}

const stats = [
  { val: 4032, suffix: '+', label: 'Projects Done', icon: Briefcase },
  { val: 1200, suffix: '+', label: 'Trusted Clients', icon: Users },
  { val: 50, suffix: '+', label: 'Expert Members', icon: Award },
  { val: 12, suffix: '+', label: 'Countries Served', icon: Globe },
  { val: 8, suffix: ' Lakh+', label: 'Product Installation', icon: ElectrodeIcon },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, value, { duration: 2.5, ease: [0.16, 1, 0.3, 1] });
      return animation.stop;
    }
  }, [isInView, value, count]);

  return (
    <motion.span ref={ref} className="inline-block">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </motion.span>
  );
}

interface StatsSectionProps {
  isHome?: boolean;
}

export default function StatsSection({ isHome = false }: StatsSectionProps) {
  return (
    <section className="relative bg-[#d4af37] py-10 overflow-hidden border-y border-black/5">
      {/* Dynamic Industrial Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-white/20 to-transparent blur-[120px] rounded-full" />
      <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-black/10 to-transparent blur-[100px] rounded-full" />



      <div className={
        isHome
          ? "relative max-w-[1600px] mx-auto pl-[70px] pr-6 md:pl-[12%] md:pr-6 z-10"
          : "relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 z-10"
      }>
        <div className="w-full">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            
            {/* Left Branding Content */}
            <div className="lg:col-span-12 xl:col-span-5 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0a0f1d] font-display leading-[0.95] tracking-tighter mb-6 group">
                  20+ Years <br />
                  <span className="text-white/80 transition-colors duration-500 group-hover:text-white text-3xl md:text-4xl lg:text-5xl mt-2 block">
                    of Excellence
                  </span>
                </h2>
                <div className="w-24 h-1 bg-black/20 mb-8 mx-auto lg:mx-0" />
                <p className="text-[#0a0f1d]/70 text-base md:text-lg leading-relaxed font-display font-medium max-w-lg mx-auto lg:mx-0">
                  True excellence is assessed in years of trouble free operation in tough environmental conditions. Our 20+ years of manufacturing expertise combines insights with superior molecular bonding, establishing us as the benchmark for industrial grounding solutions in India.
                </p>
              </motion.div>
            </div>

            {/* Stats Grid - High Impact Cards */}
            <div className="lg:col-span-12 xl:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {stats.map((s, i) => (
                  <motion.div 
                    key={s.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`group relative bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-3xl hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 ${
                      i === 4 ? 'md:col-span-2' : ''
                    }`}
                  >
                    <div className="absolute right-6 bottom-0 top-6 w-[120px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none flex items-end justify-end">
                      <s.icon size={120} strokeWidth={1} className="text-black" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-black/10 rounded-xl">
                          <s.icon size={20} className="text-black" strokeWidth={3} />
                        </div>
                        <span className="text-[10px] font-bold text-black/40 uppercase tracking-[0.3em]">
                          {s.label}
                        </span>
                      </div>
                      
                      <div className="font-black text-[#0a0f1d] font-display leading-none mb-2"
                           style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', letterSpacing: '-0.05em' }}>
                        <Counter value={s.val} suffix={s.suffix} />
                      </div>
                      <div className="w-12 h-0.5 bg-black/20 group-hover:w-20 transition-all duration-500" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
