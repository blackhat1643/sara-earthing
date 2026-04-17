'use client';
import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Shield, Zap, Cog, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
const categories = [
  {
    title: 'Earthing Products',
    desc: 'Pure electrolytic copper bonded rods and chemical electrodes designed for zero-resistance conductivity.',
    image: '/images/products.png',
    tag: 'Industrial Grade',
    icon: Zap,
    color: '#D4AF37',
    features: ['High Conductivity', 'Corrosion Proof']
  },
  {
    title: 'Earthing Accessories',
    desc: 'Heavy-duty clamps, connectors, and bus bars precision-engineered for lifelong underground durability.',
    image: '/images/accessories.png',
    tag: 'ISO Certified',
    icon: Shield,
    color: '#D4AF37',
    features: ['Precision Machined', 'Underground Durable']
  },
  {
    title: 'Exothermic Welding',
    desc: 'Permanent molecular connections that eliminate mechanical failure points in critical grounding networks.',
    image: '/images/welding.png',
    tag: 'Cadweld Compatible',
    icon: Cog,
    color: '#D4AF37',
    features: ['Molecular Bond', 'Zero Maintenance']
  },
];

export default function ProductCategories() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      ref={containerRef}
      id="products" 
      className="relative bg-white overflow-hidden pt-6 pb-12"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4af37]/5 blur-[160px] pointer-events-none rounded-full" />

      {/* Centered Header */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 text-center mb-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] rounded-sm border border-[#d4af37]/20 mb-6"
        >
          Portfolio of Safety
        </motion.span>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 font-display leading-[0.9] tracking-tighter mb-6 uppercase">
          Product <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#b8860b]">
            Categories
          </span>
        </h2>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 h-full">
        {/* Content Area: Grid of 3 Cards */}
        <div className="lg:ml-[10%] lg:w-[90%] w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative flex flex-col bg-slate-50/50 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-4"
              >
                {/* Image Section */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image 
                    src={cat.image} 
                    alt={cat.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black rounded-full uppercase tracking-widest shadow-lg border border-white">
                      {cat.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-black text-white font-display leading-[0.9] tracking-tighter uppercase whitespace-pre-line max-w-[120px]">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                      <cat.icon size={20} className="text-[#d4af37]" />
                    </div>
                  </div>

                  <p className="text-slate-600 text-base leading-relaxed font-medium mb-6">
                    {cat.desc}
                  </p>

                  <div className="space-y-3 mb-10">
                    {cat.features.map(feat => (
                      <div key={feat} className="flex items-center gap-3 text-slate-900 font-black text-[10px] uppercase tracking-[0.15em]">
                         <CheckCircle2 size={14} className="text-[#d4af37]" />
                         {feat}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-5 border-t border-slate-100">
                    <button className="w-full py-3 bg-[#d4af37] text-white rounded-[1rem] font-black text-[9px] uppercase tracking-[0.2em] shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/30 hover:bg-[#b8860b] transition-all transform active:scale-95">
                      Technical Data
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
