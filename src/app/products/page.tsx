'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import FlippingBoxBackground from '@/components/FlippingBoxBackground';
import { ArrowRight, Settings, Zap } from 'lucide-react';

const categories = [
  {
    title: "Earthing Products",
    desc: "Advanced fault current dissipation systems, including Copper Bonded and GI Electrodes.",
    link: "/products/earthing-products",
    image: "/images/VIEW/Back Fill Compound.JPG",
    icon: Zap
  },
  {
    title: "Earthing Accessories",
    desc: "High-strength clamps, dowels, and driving studs engineered for critical infrastructure.",
    link: "/products/earthing-accessories",
    image: "/images/VIEW/20-08-2025 Sara Earthing1035.JPG",
    icon: Settings
  }
];

export default function ProductsHubPage() {
  return (
    <div className="bg-white min-h-screen text-slate-900 font-display overflow-x-hidden">
      {/* Unique Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#d4af37]/5 -skew-x-12 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-slate-50 skew-y-6 -translate-x-1/4" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-[2px] w-8 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.5em]">The Ecosystem</span>
              <div className="h-[2px] w-8 bg-[#d4af37]" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-10">
              Total <br />
              <span className="text-[#d4af37]">Solutions</span>
            </h1>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              A comprehensive range of high-performance earthing components, accessories, and exothermic welding systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20 relative z-10 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 gap-12">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative bg-white rounded-[4rem] overflow-hidden border border-slate-100 hover:border-[#d4af37] transition-all duration-700 shadow-2xl shadow-slate-200/50"
              >
                <div className="grid md:grid-cols-2 min-h-[500px] items-center">
                  <div className="p-16 lg:p-24 space-y-8 relative z-10">
                    <div className="w-16 h-16 rounded-3xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] shadow-inner">
                      <cat.icon size={32} />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none group-hover:text-[#d4af37] transition-colors">
                      {cat.title}
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                      {cat.desc}
                    </p>
                    
                    <Link href={cat.link} className="inline-flex items-center gap-6 text-xs font-black uppercase tracking-widest text-slate-900 group-hover:text-[#d4af37] transition-all w-fit">
                      <span className="px-8 py-4 bg-slate-900 text-white rounded-full group-hover:bg-[#d4af37] transition-colors shadow-lg">Explore Category</span>
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                  
                  <div className="relative h-full min-h-[400px] overflow-hidden p-8">
                    <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl bg-slate-50 p-12">
                      <Image 
                        src={cat.image} 
                        alt={cat.title} 
                        fill 
                        className="object-contain transition-all duration-1000 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-[#d4af37]/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Footer */}
      <section className="py-24 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Need a Custom Design?</h2>
          <button className="px-12 py-6 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-[#d4af37] transition-all shadow-xl">
            Contact Engineering Team
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
