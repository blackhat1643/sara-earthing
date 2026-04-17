'use client';
import Link from 'next/link';
import { ArrowRight, Mail, Globe, Share2, AtSign, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax translation: image moves down as user scrolls down
  const yOffset = useTransform(scrollYProgress, [0, 1], ["-50%", "20%"]);

  return (
    <footer ref={containerRef} className="relative bg-[#050810] text-white pt-32 pb-6 overflow-hidden border-t border-white/5">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image src="/images/alnd.png" alt="Footer Background" fill className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-[#050810]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-[#050810]/80" />
      </div>

      {/* Parallax Secondary Image */}
      <motion.div
        style={{ y: yOffset }}
        className="absolute -left-10 md:-left-20 bottom-0 w-full h-full pointer-events-none z-[1] flex items-end justify-start opacity-80"
      >
        <div className="relative w-[220px] h-[320px] md:w-[300px] md:h-[450px] mb-20">
          <Image
            src="/images/20-08-2025_Sara_Earthing1052-removebg-preview.png"
            alt="Earthing Product"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4af37]/5 blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/3 z-0" />

      <div className="relative max-w-[1600px] mx-auto z-10">
        <div className="lg:ml-[10%] lg:w-[90%] w-full px-6">
          {/* Floating CTA Banner */}
          <div className="relative mb-24 glass-dark border border-[#d4af37]/20 rounded-3xl p-10 md:p-14 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-black/50 hover:border-[#d4af37]/50 transition-colors duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-transparent opacity-50" />
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl md:text-5xl font-black font-display text-white mb-4 tracking-tight">
                Ready to secure your <span className="text-[#d4af37] italic">infrastructure?</span>
              </h3>
              <p className="text-white/50 text-base md:text-lg">
                Partner with the industry leaders in earthing and lightning protection. Let&apos;s build a safer world together.
              </p>
            </div>
            <Link href="#contact" className="relative z-10 group flex items-center justify-center gap-3 bg-[#d4af37] text-black font-black px-8 py-4 md:px-10 md:py-5 rounded-full text-sm md:text-base uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 font-display flex-shrink-0">
              Get a Quote
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Top grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-24">

            {/* Brand Col */}
            <div className="md:col-span-4">
              <Link href="/" className="flex items-center gap-3 mb-8 group">
                <div className="w-12 h-12 bg-[#d4af37] rounded-xl flex items-center justify-center font-black text-black text-2xl font-display group-hover:scale-105 transition-transform">
                  S
                </div>
                <span className="font-black text-2xl tracking-[-0.04em] font-display">
                  SAARA <span className="text-[#d4af37] italic">EARTHING</span>
                </span>
              </Link>
              <p className="text-white/40 text-sm leading-[1.85] mb-8 font-medium">
                India&apos;s leading engineering company specializing in high-performance earthing, lightning protection, and safety solutions for critical infrastructure since 2004.
              </p>
              {/* Social icons */}
              <div className="flex gap-4">
                {[Share2, AtSign, Globe, Mail].map((Icon, i) => (
                  <Link key={i} href="#"
                    className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all duration-300">
                    <Icon size={16} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Solutions & Company Links */}
            <div className="md:col-span-4 flex justify-between gap-8 sm:gap-16">
              <div>
                <h4 className="font-black text-sm font-display mb-8 uppercase tracking-[0.2em] text-[#d4af37]">
                  Solutions
                </h4>
                <ul className="space-y-4">
                  {['Earthing Products', 'Earthing Accessories', 'Exothermic Welding', 'Lightning Arrester', 'Maintenance Services'].map(item => (
                    <li key={item}>
                      <Link href="#" className="text-white/40 text-sm font-medium hover:text-white flex items-center gap-2 group transition-all duration-300">
                        <span className="w-0 h-[1px] bg-[#d4af37] group-hover:w-3 transition-all duration-300 ease-out" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-black text-sm font-display mb-8 uppercase tracking-[0.2em] text-[#d4af37]">
                  Company
                </h4>
                <ul className="space-y-4">
                  {['About Us', 'Contact Us', 'Certifications', 'Applications', 'Privacy Policy'].map(item => (
                    <li key={item}>
                      <Link href="#" className="text-white/40 text-sm font-medium hover:text-white flex items-center gap-2 group transition-all duration-300">
                        <span className="w-0 h-[1px] bg-[#d4af37] group-hover:w-3 transition-all duration-300 ease-out" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Col */}
            <div className="md:col-span-4">
              <h4 className="font-black text-sm font-display mb-8 uppercase tracking-[0.2em] text-[#d4af37]">
                Contact
              </h4>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/30 transition-colors">
                    <MapPin size={18} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-bold mb-1">Global HQ</p>
                    <p className="text-white/40 text-sm leading-relaxed">
                      123 Industrial Estate, Phase 4<br />Mumbai, Maharashtra 40001
                    </p>
                  </div>
                </li>
                <li className="flex gap-4 items-center group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/30 transition-colors">
                    <Phone size={18} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-sm leading-relaxed">
                      +91 98765 43210
                    </p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Custom Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-5 relative z-20">
            <p className="text-white/30 text-xs font-medium uppercase tracking-wider">
              © {new Date().getFullYear()} SAARA Earthing. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-white/30 text-xs font-medium uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                ISO 9001:2015 Approved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MASSIVE WATERMARK TEXT */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none -mb-6 md:-mb-10">
        <h1 className="text-[12vw] font-black font-display text-white/[0.02] tracking-tighter leading-none whitespace-nowrap">
          SAARA EARTHING
        </h1>
      </div>
    </footer>
  );
}
