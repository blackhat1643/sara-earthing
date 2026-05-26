'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Building2 } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ClientsPage() {
  return (
    <div className="bg-white min-h-screen text-slate-900 font-display">
      
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center px-6 bg-slate-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/clients_hero.png" 
            alt="Global Partnerships" 
            fill 
            className="object-cover opacity-40 grayscale-[0.5] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/80" />
        </div>

        <div className="absolute inset-0 opacity-10 pointer-events-none z-[1]">
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black uppercase tracking-[0.5em] mb-8">
              Trust & Partnerships
            </span>
            <h1 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[1.1] md:leading-[0.85] mb-8">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f7e1ad] to-[#b8860b]">Clientele</span>
            </h1>
            <p className="text-white/60 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Over the last two decades, we have earned the trust of premier industrial leaders by delivering earthing solutions tailored to their exact structural blueprints.
            </p>
          </motion.div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
      </section>

      {/* Clients Gallery */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-slate-900 mb-4">Our Trusted Partners</h2>
            <div className="h-1.5 w-32 bg-[#d4af37] mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {Array.from({ length: 40 }).map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 10) * 0.05 }}
                className="group relative aspect-[3/2] bg-white border border-slate-100 rounded-[2rem] p-6 flex items-center justify-center hover:shadow-2xl hover:border-[#d4af37]/20 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src={`/images/clients/pf-${idx + 1}.jpg`}
                  alt={`Client ${idx + 1}`}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact CTA */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="relative p-12 md:p-20 border border-[#d4af37]/20 rounded-[60px] overflow-hidden">
            <div className="absolute inset-0 bg-[#d4af37]/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-[1.1] md:leading-none">
                Join Our <br /> <span className="text-[#d4af37]">Portfolio</span> of Excellence
              </h2>
              <p className="text-white/40 text-sm md:text-lg mb-10 max-w-xl mx-auto font-medium px-4 md:px-0">
                Protect your critical assets with the same precision and reliability trusted by the world's biggest brands.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-12 py-5 bg-[#d4af37] text-black font-black uppercase tracking-widest text-[10px] rounded-full shadow-2xl shadow-[#d4af37]/20"
              >
                Become a Client
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
