'use client';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Shield, Award, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0"
        style={{ backgroundImage: 'url("/images/hero_bg.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1d]/95 via-[#0a0f1d]/70 to-[#0a0f1d]/30" />
        {/* Gold glow */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/15 text-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] border border-[#d4af37]/25 mb-8">
              <Shield size={12} /> Protecting Global Infrastructure
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-black text-white leading-[1.0] mb-8 font-display"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', letterSpacing: '-0.04em' }}>
            Advanced <span className="text-[#d4af37] italic">Earthing</span>{' '}
            Solutions for a Safer World
          </motion.h1>

          {/* Body */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/65 text-lg leading-[1.85] mb-12 max-w-2xl font-body">
            Leading the industry with precision-engineered earthing systems, exothermic welding, and lightning protection for over two decades.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-5 items-center">
            <a href="#products"
              className="group flex items-center gap-3 bg-[#d4af37] text-black font-black px-10 py-5 rounded-full text-base uppercase tracking-wider shadow-2xl shadow-yellow-400/40 hover:-translate-y-2 hover:shadow-yellow-400/60 transition-all duration-400 font-display">
              Explore Our Products
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <button className="group flex items-center gap-4 text-white font-semibold hover:text-[#d4af37] transition-colors">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#d4af37] group-hover:bg-[#d4af37]/10 transition-all duration-300 animate-pulse-glow">
                <Play fill="white" size={16} className="ml-1 group-hover:fill-[#d4af37]" />
              </div>
              See How It Works
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-6 mt-16 pt-16 border-t border-white/10">
            {[{ icon: Award, text: 'ISO 9001 Certified' }, { icon: Shield, text: 'CPRI Approved' }, { icon: Globe, text: 'Pan India + International' }].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/50 text-sm">
                <Icon size={14} className="text-[#d4af37]" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 glass-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-12">
            {[
              { val: '20+', label: 'Years Excellence', gold: true },
              { val: '792+', label: 'Projects Done', gold: false },
              { val: '532+', label: 'Trusted Clients', gold: false },
              { val: '35+', label: 'Expert Members', gold: false },
            ].map(s => (
              <div key={s.label}>
                <div className={`font-black font-display text-2xl leading-none ${s.gold ? 'text-[#d4af37]' : 'text-white'}`}
                  style={{ letterSpacing: '-0.04em' }}>{s.val}</div>
                <div className="text-white/40 text-[10px] uppercase tracking-[0.16em] mt-1.5 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50" style={{ animation: 'pulse 2s infinite' }} />
            <span className="text-white/50 text-xs font-medium tracking-wide">Pan India & International Presence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
