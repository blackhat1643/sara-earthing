'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import Footer from '@/components/Footer';
import Certifications from '@/components/Certifications';
import FlippingBoxBackground from '@/components/FlippingBoxBackground';
import { ShieldAlert, Zap, Globe, HardHat, Info, Activity, ShieldCheck, ZapOff, ArrowRight, Layers, Cpu } from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';

const coreComponents = [
  {
    id: "01",
    title: "Chemical Earthing Electrode",
    desc: "Unlike traditional rods, an advanced Chemical Earthing Electrode is molecularly bonded and treated to maintain optimal performance across all seasons.",
    icon: Activity,
    image: "/images/VIEW/Chemical Earthing Electrode.webp",
    color: "#d4af37"
  },
  {
    id: "02",
    title: "Back Fill Compounds",
    desc: "Our moisture retaining, non soluble compound creates a permanent, dense conductive zone that thrives even in dry or highly corrosive terrains.",
    icon: Layers,
    image: "/images/VIEW/Back Fill Compounds.webp",
    color: "#ffffff"
  },
  {
    id: "03",
    title: "Lightning Arrester",
    desc: "This system intercepts high voltage strikes at the highest point of your facility and safely channels them into the ground network, forming a comprehensive lightning protection system.",
    icon: Zap,
    image: "/images/VIEW/Lightning Arrester.webp",
    color: "#d4af37"
  }
];

export default function EarthingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-slate-900 font-display overflow-x-clip relative">
      {/* Blueprint Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Immersive Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-white">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[#d4af37]/5 -skew-x-12 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-slate-50 skew-y-6 -translate-x-1/4" />

          <Image
            src="/images/hero_bg.webp"
            alt="Grounding"
            fill
            className="object-cover opacity-10 grayscale brightness-110"
          />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-6 mb-12">
              <div className="h-[1px] w-16 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-[11px] font-black uppercase tracking-[0.8em]">Grounding Excellence</span>
              <div className="h-[1px] w-16 bg-[#d4af37]" />
            </div>

            <h1 className="text-[12vw] md:text-[8rem] font-black uppercase tracking-[-0.08em] leading-[0.75] text-slate-900 mb-12">
              Safe <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#d4af37] to-[#b8860b]">Earth</span>
            </h1>

            <div className="grid md:grid-cols-3 gap-12 text-left mt-24">
              {[
                "Advanced fault current dissipation systems.",
                "Lightning protection for critical infrastructure.",
                "Compliance with global safety standards."
              ].map((text, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[11px] font-black text-[#d4af37] shadow-sm">0{i + 1}</div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 right-10 flex flex-col items-center gap-4 opacity-20 hidden md:flex">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] rotate-90 mb-8 origin-right">Discover</span>
          <div className="w-px h-16 bg-slate-900" />
        </div>
      </section>

      {/* What is Earthing — Redesigned Section */}
      <section className="relative bg-white overflow-hidden">

        {/* Top Block: What is Earthing — Dark full-bleed banner */}
        <div className="relative bg-slate-900 py-13 overflow-hidden">
          {/* Decorative gold grid */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          {/* Giant watermark */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.04] pr-8 hidden lg:block">
            <span className="text-[18rem] font-black text-white leading-none tracking-tighter">?</span>
          </div>
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#d4af37]/5 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
            {/* Label + Heading */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="lg:col-span-5"
            >
              <span className="inline-flex items-center gap-2 text-[#d4af37] text-[10px] font-black uppercase tracking-[0.5em] mb-6">
                <span className="w-6 h-[2px] bg-[#d4af37]" />
                The Science
              </span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white mb-0">
                What is <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f0d060] to-[#b8860b]">
                  Earthing?
                </span>
              </h2>
            </motion.div>

            {/* Divider line — vertical on desktop */}
            <div className="hidden lg:flex lg:col-span-1 justify-center">
              <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent" />
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="lg:col-span-6"
            >
              <p className="text-white/60 text-lg md:text-xl leading-relaxed font-medium">
                An electrical earthing system is the immediate transfer of electrical discharge directly into the earth through a low resistance path. It acts as an invisible safety path, protecting human life, high value machinery, and structural assets from unexpected current surges and insulation failures.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Block: Why Earthing — Three cards on white */}
        <div className="relative bg-white py-13">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-14"
            >
              <div className="h-[2px] w-12 bg-[#d4af37]" />
              <span className="text-slate-900 text-xs font-black uppercase tracking-[0.5em]">Why Earthing?</span>
            </motion.div>

            {/* Three horizontal cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  title: "Asset Protection",
                  desc: "Prevents damage to sensitive electronics, heavy machinery, and electrical circuits.",
                  icon: ShieldAlert
                },
                {
                  num: "02",
                  title: "Human Safety",
                  desc: "Eliminates the risk of fatal electrical shocks by instantly diverting fault currents away from touchable surfaces.",
                  icon: HardHat
                },
                {
                  num: "03",
                  title: "Voltage Stabilization",
                  desc: "Provides a constant, reliable point for electrical currents, preventing power fluctuations.",
                  icon: Activity
                }
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.7 }}
                  className="group relative p-8 md:p-10 rounded-[32px] border border-slate-100 bg-white hover:border-[#d4af37]/40 hover:shadow-xl hover:shadow-[#d4af37]/5 transition-all duration-500"
                >
                  {/* Number watermark */}
                  <div 
                    className="absolute top-6 right-8 text-7xl font-black transition-colors duration-500 select-none leading-none opacity-20 group-hover:opacity-100"
                    style={{ WebkitTextStroke: '1px #d4af37', color: 'transparent' }}
                  >
                    {item.num}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/8 border border-[#d4af37]/15 flex items-center justify-center mb-8 group-hover:bg-[#d4af37] transition-all duration-400">
                    <item.icon size={26} className="text-[#d4af37] group-hover:text-black transition-colors duration-400" strokeWidth={1.5} />
                  </div>

                  <h4 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-3 group-hover:translate-x-1 transition-transform duration-400">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-8 h-[2px] w-8 bg-slate-100 group-hover:w-full group-hover:bg-[#d4af37]/30 transition-all duration-600 rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="py-13 bg-[#F1F1F1] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="text-center max-w-2xl mx-auto">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#d4af37] mb-4 block">The Ecosystem</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">Earthing System</h2>
              <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
                We engineer each pillar to ensure your infrastructure remains completely secure under any environmental or electrical stress.
              </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto pb-16">
          {coreComponents.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-[60px] overflow-hidden border border-slate-200 hover:border-[#d4af37] transition-all duration-700 shadow-xl bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-50/50">
                <img src={getImageUrl(c.image)} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-[#d4af37]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              <div className="p-12 pb-14 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">{c.title}</h3>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#d4af37]">
                    <c.icon size={24} />
                  </div>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore Our Products CTA */}
        <div className="mx-6 mt-14 max-w-7xl md:mx-auto relative">
          <div className="relative w-full aspect-[4/1.2] sm:aspect-[4/1] md:aspect-[5/1] overflow-hidden flex items-center justify-between pl-6 pr-2 md:pl-10 md:pr-3">
            {/* Electrode Image centered vertically in the background */}
            <Image
              src="/images/electrode_banner.webp"
              alt="Chemical Earthing Electrode"
              fill
              className="object-contain object-center z-0 opacity-90"
              priority
            />

            {/* Text & Button Container - positioned directly ON the electrode image */}
            <div className="w-full flex items-center relative z-10">
              <div className="flex flex-col items-center sm:items-start gap-4 text-center sm:text-left max-w-md md:max-w-xl">
                <p className="text-slate-800 text-sm md:text-base font-extrabold leading-relaxed">
                  Explore our complete range of chemical electrodes, backfill compounds and earthing rods.
                </p>
                <Link
                  href="/products/earthing-products"
                  className="group inline-flex items-center gap-1.5 px-4 py-2 bg-[#d4af37] hover:bg-slate-900 hover:text-white text-black font-black uppercase tracking-widest text-[9px] rounded-full transition-all duration-300 shadow-md"
                >
                  <span>Explore Products</span>
                  <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Certifications />
      <Footer />
    </div>
  );
}
