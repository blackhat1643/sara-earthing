'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 'earthing-products',
    title: 'Earthing Products',
    image: '/images/VIEW/GI Earthing Electrode.JPG',
    desc: 'High-quality earthing electrodes and compounds engineered for optimal grounding and durability.',
  },
  {
    id: 'earthing-accessories',
    title: 'Earthing Accessories',
    image: '/images/products/thread-couplings.png',
    desc: 'Durable accessories and clamps built to ensure secure and long-lasting earthing connections.',
  }
];

export default function HomeProducts() {
  return (
    <section className="py-12 md:py-20 bg-slate-50 overflow-hidden relative">
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-display mb-6 tracking-tight leading-tight uppercase"
          >
            Explore <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-600">Our Products</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base md:text-lg font-medium leading-relaxed"
          >
            A complete, integrated ecosystem of safety products engineered to work in perfect synergy. From the highest point of your building to the deepest layer of the soil, we eliminate the weak links and keep your system protected.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
            >
              <Link
                href={`/products/${cat.id}`}
                className="group block relative bg-white rounded-[2rem] p-5 md:p-8 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#d4af37]/10 transition-all duration-500 border border-slate-100 hover:border-[#d4af37]/30"
              >
                {/* Floating Image Area */}
                <div className="relative h-[220px] md:h-[280px] mb-8 w-full rounded-2xl bg-slate-50 overflow-hidden flex items-center justify-center transition-colors duration-500 group-hover:bg-[#d4af37]/[0.03]">
                  {/* Glowing background behind image on hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform scale-50 group-hover:scale-100" />
                  
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain p-8 transition-all duration-700 ease-out group-hover:scale-[1.15] group-hover:-translate-y-3 drop-shadow-xl"
                  />
                </div>

                {/* Content Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-[#d4af37] transition-colors duration-300">
                      {cat.title}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  
                  {/* Animated "See More" Button */}
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-50 text-slate-900 border border-slate-200 flex-shrink-0 group-hover:bg-[#d4af37] group-hover:border-[#d4af37] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-500">
                    <span className="font-bold text-sm uppercase tracking-wider">See More</span>
                    <div className="relative w-5 h-5 overflow-hidden">
                      <ArrowRight size={20} className="absolute transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0" />
                      <ArrowRight size={20} className="absolute -translate-x-6 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
