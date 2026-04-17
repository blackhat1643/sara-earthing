'use client';
import { useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, animate, useInView } from 'framer-motion';
import { useEffect } from 'react';
import { Briefcase, Users, Globe, Award } from 'lucide-react';

const stats = [
  { val: 792, suffix: '+', label: 'Projects Done', icon: Briefcase },
  { val: 532, suffix: '+', label: 'Trusted Clients', icon: Users },
  { val: 35, suffix: '+', label: 'Expert Members', icon: Award },
  { val: 12, suffix: '+', label: 'Countries Served', icon: Globe },
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

export default function StatsSection() {
  return (
    <section className="relative bg-[#d4af37] py-10 overflow-hidden border-y border-black/5">
      {/* Dynamic Industrial Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-white/20 to-transparent blur-[120px] rounded-full" />
      <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-black/10 to-transparent blur-[100px] rounded-full" />

      {/* Large Decorative Trademark */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 rotate-90 opacity-[0.03] select-none pointer-events-none">
        <span className="text-[20rem] font-black text-black whitespace-nowrap tracking-tighter">
          EST. 2004
        </span>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 z-10">
        <div className="lg:ml-[10%] lg:w-[90%] w-full">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            
            {/* Left Branding Content */}
            <div className="lg:col-span-12 xl:col-span-5 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-black text-[#0a0f1d] font-display leading-[0.9] tracking-tighter mb-6 group">
                  20+ Years <br />
                  <span className="text-white/80 transition-colors duration-500 group-hover:text-white">
                    Engineering
                  </span>
                  <br />
                  Excellence
                </h2>
                <div className="w-24 h-1 bg-black/20 mb-8 mx-auto lg:mx-0" />
                <p className="text-[#0a0f1d]/70 text-lg leading-relaxed font-display font-medium max-w-sm mx-auto lg:mx-0">
                  A legacy of safety and precision. Defending critical global infrastructure with relentless innovation since 2004.
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
                    className="group relative bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-3xl hover:bg-white/20 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <s.icon size={80} strokeWidth={1} className="text-black" />
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
