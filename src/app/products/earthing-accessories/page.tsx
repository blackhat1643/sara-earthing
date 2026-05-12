'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { allProducts } from '@/data/products';
import { ArrowRight, Settings, ShieldCheck } from 'lucide-react';

export default function EarthingAccessoriesPage() {
  const products = allProducts.filter(p => p.category === 'earthing-accessories');
  return (
    <div className="bg-white min-h-screen text-slate-900 font-display overflow-x-hidden">
      {/* Unique Hero Section */}
      <section className="relative pt-24 md:pt-28 pb-12 md:pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#d4af37]/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="absolute top-20 left-10 w-64 h-64 border border-[#d4af37]/10 rounded-full animate-pulse pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                <div className="h-[2px] w-12 bg-[#d4af37]" />
                <span className="text-[#d4af37] text-sm font-black uppercase tracking-[0.4em]">Section 02</span>
              </div>
              <h1 className="text-4xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-[1.1] md:leading-[0.8] mb-8">
                Master <br />
                <span className="text-[#d4af37]">Links</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
                Precision-engineered couplings, clamps, and driving studs designed for the physical integrity of your grounding systems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-square lg:aspect-video rounded-[40px] overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image 
                src="/images/VIEW/20-08-2025 Sara Earthing1043.JPG" 
                alt="Earthing Accessories" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#d4af37]/10 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 relative z-10 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-20 gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">The Essentials</h2>
              <div className="h-1.5 w-24 bg-[#d4af37] mx-auto md:ml-0" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              Scroll to explore technical specifications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((prod, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="group relative flex flex-col bg-white rounded-[3rem] p-4 border border-slate-100 hover:border-[#d4af37] transition-all duration-500 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#d4af37]/10"
              >
                <div className="relative h-72 rounded-[2.5rem] overflow-hidden mb-8 bg-slate-50 p-8">
                  <Image 
                    src={prod.image} 
                    alt={prod.title} 
                    fill 
                    className={`object-contain transition-all duration-1000 ${prod.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                  />
                  {prod.hoverImage && (
                    <Image 
                      src={prod.hoverImage} 
                      alt={`${prod.title} hover`} 
                      fill 
                      className="object-contain transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:scale-105 p-8"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="px-6 pb-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                      <Settings size={20} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-[#d4af37] transition-colors leading-none">
                      {prod.title}
                    </h3>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                    {prod.desc}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-3 mb-10">
                    {prod.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100/50 group-hover:bg-[#d4af37]/5 group-hover:border-[#d4af37]/20 transition-colors">
                        <ShieldCheck size={14} className="text-[#d4af37]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href={`/products/${prod.category}/${prod.slug}`}
                    className="group/btn flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#d4af37] transition-all transform active:scale-95 shadow-lg shadow-slate-900/10 hover:shadow-[#d4af37]/30"
                  >
                    Get Details <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Banner */}
      <section className="py-20 bg-[#d4af37] text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none">Structural <br /> Integrity</h2>
            <p className="text-white/80 text-lg font-medium">Engineered with corrosion-resistant bronze and high-strength carbon steel for extreme environments.</p>
          </div>
          <button className="px-12 py-6 bg-white text-slate-900 font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform shadow-2xl">
            Download Accessories PDF
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
