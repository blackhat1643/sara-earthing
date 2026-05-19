'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import Footer from '@/components/Footer';
import Certifications from '@/components/Certifications';
import FlippingBoxBackground from '@/components/FlippingBoxBackground';
import { ShieldAlert, Zap, Globe, HardHat, Info, Activity, ShieldCheck, ZapOff, ArrowRight, Layers, Cpu } from 'lucide-react';

const coreComponents = [
  {
    id: "01",
    title: "Safe Earthing Electrode",
    desc: "A high-conductivity metal electrode that facilitates the efficient discharge of fault currents and surges into the ground.",
    icon: Activity,
    image: "/images/VIEW/Copper Bonded Electrode.JPG",
    color: "#d4af37"
  },
  {
    id: "02",
    title: "Back Fill Compounds",
    desc: "Earth enhancement materials with high conductivity and moisture retention properties that work in tandem with electrodes.",
    icon: Layers,
    image: "/images/VIEW/Back Fill Compound.JPG",
    color: "#ffffff"
  },
  {
    id: "03",
    title: "Lightning Arrester",
    desc: "Metallic devices mounted at the highest points to capture lightning strikes and direct them safely to the earth.",
    icon: Zap,
    image: "/images/VIEW/20-08-2025 Sara Earthing1035.JPG",
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
    <div ref={containerRef} className="bg-white min-h-screen text-slate-900 font-display overflow-x-hidden relative">
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
            src="/images/hero_bg.png"
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

      {/* The "Blueprint" Section */}
      <section className="py-7 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative border-t border-slate-100 pt-24">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] select-none pointer-events-none">
              <h2 className="text-[20rem] font-black text-slate-900 leading-none">SPECS</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-32">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5">Industrial Grade</span>
                  <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                    Engineering <br />
                    <span className="text-[#d4af37]">Resilience</span>
                  </h2>
                  <p className="text-slate-500 text-xl leading-relaxed font-medium">
                    Earthing is not just a requirement; it&apos;s a critical layer of industrial architecture. We design paths for energy that keep your world moving safely.
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    { title: "Fault Isolation", desc: "Instantly routes leakage currents away from sensitive zones." },
                    { title: "Static Control", desc: "Prevents hazardous discharge in chemical and volatile zones." },
                    { title: "Surge Defense", desc: "Engineered to withstand direct lightning impact of over 100kA." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-8 group">
                      <div className="text-[12px] font-black text-[#d4af37] mt-1.5">0{idx + 1}</div>
                      <div>
                        <h4 className="text-xl font-black uppercase mb-2 group-hover:text-[#d4af37] transition-colors">{item.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="aspect-square relative rounded-[80px] overflow-hidden border-8 border-slate-50 shadow-3xl"
                >
                  <Image src="/images/alnd.png" alt="Industrial Detail" fill className="object-cover transition-all duration-1000" />
                  <div className="absolute inset-0 bg-[#d4af37]/10 mix-blend-multiply" />
                </motion.div>

                {/* Floating Technical Overlay */}
                <div className="absolute -bottom-12 -left-12 bg-white p-10 rounded-[40px] border border-slate-100 z-20 max-w-xs shadow-3xl">
                  <div className="w-12 h-12 bg-[#d4af37]/10 rounded-2xl flex items-center justify-center mb-6">
                    <Cpu className="text-[#d4af37]" size={24} />
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-slate-500">
                    "Our systems utilize the proprietary SI Gel technology, ensuring consistent resistance levels even in harsh soil conditions."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-xl">
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#d4af37] mb-6 block">The Ecosystem</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Core Systems</h2>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#d4af37] transition-colors group">
            Explore All Products <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
          {coreComponents.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[600px] rounded-[60px] overflow-hidden border border-slate-200 hover:border-[#d4af37] transition-all duration-700 shadow-xl bg-white"
            >
              <div className="h-2/3 relative overflow-hidden bg-slate-50/50">
                <Image src={c.image} alt={c.title} fill className="object-contain p-8 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-[#d4af37]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              <div className="h-1/3 p-12 flex flex-col justify-center">
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
      </section>

      {/* Safety Matrix */}
      <section className="py-20 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 border border-slate-100 rounded-[80px] overflow-hidden shadow-2xl shadow-slate-200/50">
            {[
              { icon: ShieldAlert, title: "Shock Prevention", stats: "100%" },
              { icon: ZapOff, title: "Surge Shield", stats: "200kA" },
              { icon: Activity, title: "Static Control", stats: "Safe" },
              { icon: ShieldCheck, title: "ISO Certified", stats: "9001" }
            ].map((m, idx) => (
              <div key={idx} className="p-12 border-r border-b lg:border-b-0 last:border-r-0 border-slate-100 hover:bg-slate-50 transition-colors group text-center">
                <div className="w-16 h-16 bg-white rounded-[24px] shadow-sm border border-slate-50 flex items-center justify-center mx-auto mb-8 group-hover:bg-[#d4af37]/10 transition-colors">
                  <m.icon className="text-[#d4af37]" size={32} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{m.title}</h4>
                <div className="text-4xl font-black text-slate-900">{m.stats}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Consultation */}
      <section className="py-7 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[60px] overflow-hidden bg-slate-900 p-16 md:p-24 text-center shadow-3xl">
            <div className="absolute top-0 right-0 w-[600px] h-full bg-[#d4af37]/5 -skew-x-12 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-10 tracking-tighter leading-none">
                Ready to <span className="text-[#d4af37]">Protect?</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/contact" className="px-8 py-4 bg-[#d4af37] text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-transform shadow-2xl shadow-[#d4af37]/20">
                  Request Quote
                </Link>
                <button className="px-8 py-4 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-white/5 transition-all">
                  Technical Data
                </button>
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
