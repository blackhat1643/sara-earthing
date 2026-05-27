'use client';
import { Award, ShieldCheck, Zap, Building, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const certs = [
  { icon: Award, title: 'ISO 9001 Certified Quality Management System', desc: 'This certification reflects our disciplined manufacturing processes, traceability, and continuous engineering improvement.' },
  { icon: ShieldCheck, title: 'CPRI Tested (Central Power Research Institute)', desc: 'This testing confirms that our systems can withstand extremely high-voltage faults and short-circuit currents without structural or electrical degradation.' },
  { icon: Zap, title: 'ERDA Approved (Electrical Research & Development Association)', desc: 'This approval guarantees that our components meet exact technical parameters under simulated long-term field stress.' },
  { icon: Building, title: 'PWD Approved (Public Works Department)', desc: 'This approval validates our compliance with strict state engineering standards, making us an eligible partner for high-scale civic developments.' },
];

interface CertificationsProps {
  isHome?: boolean;
}

export default function Certifications({ isHome = false }: CertificationsProps) {
  return (
    <section id="certifications" className="bg-slate-900 py-24 relative overflow-x-clip">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-full bg-[#d4af37]/5 -skew-x-12 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className={
        isHome
          ? "relative z-10 max-w-[1600px] mx-auto pl-[70px] pr-6 md:pl-[12%] md:pr-6"
          : "relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16"
      }>
        <div className="w-full">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24 relative">
            
            {/* Left Content (Sticky) */}
            <div className="flex-1 text-center lg:text-left lg:sticky lg:top-32 pb-12">
              <motion.span 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-5 py-2 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-[#d4af37]/20 mb-8"
              >
                <Award size={14} /> Our Standards
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="font-black text-white font-display leading-[1.05] mb-8 uppercase tracking-tighter"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
              >
                Quality You <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f0d060] to-[#b8860b]">Can Trust</span>
              </motion.h2>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="space-y-6 mb-12"
              >
                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  Every electrode, compound, and accessory bearing our name undergoes rigorous mechanical and electrical testing to ensure it exceeds national safety benchmarks before reaching your site.
                </p>
                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  We manufacture every component under strict quality control systems to ensure unshakable reliability year-round.
                </p>
              </motion.div>

              <motion.a 
                href="/images/catalogue.pdf" download="catalogue.pdf" 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-4 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black font-black px-10 py-5 rounded-full text-xs uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
              >
                Download Product Catalog
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>

            {/* Right Cards */}
            <div className="flex-1 space-y-6 w-full pb-12">
              {certs.map(({ icon: Icon, title, desc }, i) => (
                <motion.div 
                  key={title}
                  initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
                  whileHover={{ x: -8, scale: 1.02 }}
                  className="group relative flex items-start gap-6 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#d4af37]/40 transition-all duration-500 overflow-hidden"
                >
                  {/* Card Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
                  
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4af37] transition-colors duration-500">
                    <Icon size={28} className="text-[#d4af37] group-hover:text-black transition-colors duration-500" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-black text-white text-xl uppercase tracking-tight mb-3 group-hover:text-[#d4af37] transition-colors duration-300">{title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
