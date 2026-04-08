'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const categories = [
  { title: 'Earthing Products', desc: 'Copper bonded rods, chemical electrodes, and maintenance-free earthing systems engineered for reliable decades of performance.', image: '/images/products.png', tag: '12+ Products' },
  { title: 'Earthing Accessories', desc: 'Precision-engineered clamps, bonding strips, connectors, and bus bars for robust, low-resistance connectivity.', image: '/images/accessories.png', tag: '20+ Accessories' },
  { title: 'Exothermic Welding', desc: 'Permanent molecular-bond connections that outlast mechanical joints, with ultra-low resistance and zero maintenance.', image: '/images/welding.png', tag: 'CADWELD Compatible' },
];

export default function ProductCategories() {
  return (
    <section id="products" className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] rounded-sm border border-[#d4af37]/20 mb-6">
            What We Offer
          </span>
          <h2 className="font-black text-[#0a0f1d] font-display mb-5" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            Product Categories
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive earthing and lightning protection solutions engineered for maximum safety and durability.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div key={cat.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ y: -12 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/80 transition-all duration-500 border border-slate-100"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image src={cat.image} alt={cat.title} fill sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-bold text-white/80 uppercase tracking-wider bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                  {cat.tag}
                </span>
              </div>
              {/* Content */}
              <div className="p-8">
                <h3 className="font-black text-[#0a0f1d] text-xl mb-3 font-display group-hover:text-[#d4af37] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-slate-500 text-sm leading-[1.8] mb-7">{cat.desc}</p>
                <div className="flex items-center gap-2 text-[#d4af37] font-bold text-xs uppercase tracking-[0.12em] group-hover:gap-4 transition-all duration-300">
                  View Collection <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
