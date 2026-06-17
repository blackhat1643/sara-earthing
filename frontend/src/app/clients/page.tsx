'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

export default function ClientsPage() {
  const [mounted, setMounted] = useState(false);
  const [clientIndices, setClientIndices] = useState<number[]>([]);

  useEffect(() => {
    const indices = Array.from({ length: 40 }, (_, i) => i + 1);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setClientIndices(indices);
    setMounted(true);
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-900 font-display overflow-x-clip relative">
      
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center px-6 bg-slate-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/clients_hero.webp" 
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
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f7e1ad] to-[#b8860b] pr-2">Clients</span>
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
            {!mounted ? (
              Array.from({ length: 40 }).map((_, idx) => (
                <div key={idx} className="aspect-[3/2] border border-slate-100 rounded-[2rem] bg-slate-50/50" />
              ))
            ) : (
              clientIndices.map((clientNum, idx) => (
                <motion.div
                  key={clientNum}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 10) * 0.05 }}
                  className="group relative aspect-[3/2] bg-white border border-slate-100 rounded-[2rem] p-6 flex items-center justify-center hover:shadow-2xl hover:border-[#d4af37]/20 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img 
                    src={`/images/clients/pf-${clientNum}.webp`}
                    alt={`Client ${clientNum}`}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10"
                  />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Global Impact CTA */}
      <section className="bg-[#d4af37] py-14 md:py-16 w-full relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-4">
              Join Our <br className="hidden md:block" /> Portfolio of Excellence
            </h2>
            <p className="text-white/95 text-sm md:text-base font-medium max-w-xl">
              Protect your critical assets with the same precision and reliability trusted by the world&apos;s biggest brands.
            </p>
          </div>
          <Link 
            href="/contact" 
            className="inline-block px-10 py-5 bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-slate-50 transition-colors shadow-xl shadow-black/5 flex-shrink-0"
          >
            Become a Client
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
