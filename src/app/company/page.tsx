'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import StatsSection from '@/components/StatsSection';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';
import { Shield, Zap, Target, Award, CheckCircle2, Factory, Users, History, Cpu, Globe } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "Earthing is imperative for the safety of human lives and machinery. We prioritize absolute reliability."
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "Introduced Gel Earthing Electrode (SI Gel) under our core competency to provide modern grounding solutions."
  },
  {
    icon: Target,
    title: "Precision",
    desc: "Design, supply, and installation complying with relevant codes of practice and global specifications."
  },
  {
    icon: Award,
    title: "Quality",
    desc: "Achieved through rigorous testing and 15+ years of professional experience in product quality."
  }
];

export default function CompanyPage() {
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

      {/* Unique Architectural Hero */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] pt-28 pb-12 md:pt-36 md:pb-20 flex items-center overflow-hidden bg-white">
        {/* Left Side: Cinematic Background with Skew Mask */}
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
          <motion.div
            style={{ y: heroY }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/hero_bg.png"
              alt="Company Heritage"
              fill
              className="object-cover opacity-[0.12] grayscale scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Main Typography Block */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-[9px] font-extrabold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                15+ Years Engineering Heritage
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="h-[2px] w-8 md:w-12 bg-[#d4af37]" />
                <span className="text-[#d4af37] text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em]">Saara Legacy</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-slate-900 mb-6 leading-[0.95]">
                The <br className="hidden md:inline" />
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f0d060] to-[#b8860b]">
                  Brand
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#d4af37] to-transparent rounded-full" />
                </span>
              </h1>

              <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-xl mb-8">
                Pioneering next-generation grounding solutions, combining innovative chemical gel technology with decades of robust engineering to safeguard lives and global infrastructure.
              </p>

              <div className="flex items-start gap-6 md:gap-8 bg-slate-50/60 p-6 rounded-3xl border border-slate-100 max-w-lg shadow-sm">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 60 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="w-[3px] bg-gradient-to-b from-[#d4af37] via-[#f0d060] to-transparent rounded-full self-stretch"
                />
                <div className="space-y-3">
                  <p className="text-slate-800 text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] leading-relaxed">
                    Precision Grounding <br />
                    <span className="text-[#d4af37]">Engineering Excellence</span>
                  </p>
                  <div className="flex items-center gap-4 md:gap-6 text-[9px] md:text-[10px] font-extrabold text-slate-500 tracking-wider uppercase">
                    <span>Est. 2004</span>
                    <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
                    <span>Certified IEEE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Sophisticated Glassmorphic Showcase */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="relative aspect-[4/3] lg:aspect-square max-h-[440px] xl:max-h-[480px] w-full rounded-[40px] overflow-hidden border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-8 flex items-center justify-center group shadow-xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.10)] hover:border-[#d4af37]/30 transition-all duration-700 hover:-translate-y-1"
            >
              {/* Technical CAD Blueprint Rings */}
              <div 
                className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-[#d4af37]/25 pointer-events-none"
                style={{ animation: 'spin 25s linear infinite' }}
              />
              <div 
                className="absolute w-[64%] h-[64%] rounded-full border border-double border-[#d4af37]/10 pointer-events-none"
                style={{ animation: 'spin 18s linear infinite reverse' }}
              />
              
              {/* Decorative Glow Grid */}
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none"
                   style={{ backgroundImage: 'radial-gradient(#d4af37 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
              
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/5 blur-3xl rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#d4af37]/10 blur-3xl rounded-full animate-pulse" />

              {/* Clean Image Container with Hover Float */}
              <div className="relative w-[80%] h-[80%] transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2">
                <Image
                  src="/images/precision_products.png"
                  alt="Precision Products Showcase"
                  fill
                  className="object-contain filter drop-shadow-2xl rounded-2xl"
                />
              </div>

              {/* Premium Floating Glassmorphic Badges */}
              <div className="absolute top-6 left-6 bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
                EST. 2004
              </div>

              <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-900 text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                ISO 9001
              </div>

              <div className="absolute bottom-6 right-6 bg-white/85 backdrop-blur-md border border-slate-200/80 p-5 rounded-2xl shadow-xl max-w-[240px] transition-all duration-700 group-hover:translate-x-[-8px]">
                <p className="text-[#d4af37] text-[8px] font-black uppercase tracking-widest mb-1">Global Standard</p>
                <h4 className="text-slate-900 text-xs font-black uppercase tracking-tight mb-2">UL-467 Compliant</h4>
                <p className="text-slate-500 text-[10px] leading-normal font-medium">
                  Manufactured molecularly using 99.9% pure copper.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Edge Indicator */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1/2 w-1 bg-slate-50" />
      </section>

      {/* Legacy / Welcome Section */}
      <section className="pt-0 pb-10 md:py-10 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-[40px] overflow-hidden border-8 border-slate-50 shadow-2xl aspect-[4/3] max-w-md md:max-w-lg mx-auto">
                <Image
                  src="/images/about-img.jpg"
                  alt="Sara Earthing Facilities"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#d4af37]/10 mix-blend-multiply" />
              </div>
              <div className="absolute -bottom-12 -right-12 bg-white p-10 rounded-[40px] border border-slate-100 shadow-3xl z-20 hidden md:block text-center">
                <div className="text-7xl font-black text-[#d4af37] mb-1 tracking-tighter">15+</div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Years of Precision</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 md:space-y-12"
            >
              <div className="space-y-6">
                <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5">About Saara</span>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8] md:leading-[0.9]">
                  Welcome to <br />
                  <span className="text-[#d4af37]">Saara Earthing</span>
                </h2>
                <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-xl">
                  Saara Earthing India Pvt Ltd is run by professionals with an experience of more than 15 years in the field of Product Quality and Gel Earthing electrode.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'ESTABLISHED', val: '2004' },
                  { label: 'EXPERIENCE', val: '15+ YRS' },
                  { label: 'INNOVATION', val: 'SI GEL' },
                  { label: 'COMPLIANCE', val: 'IEEE/IEC' }
                ].map(item => (
                  <div key={item.label} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[#d4af37] text-[9px] font-black tracking-widest mb-2">{item.label}</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">{item.val}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-white border-y border-slate-100">
        <StatsSection />
      </div>

      {/* Vision & Mission */}
      <section className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative p-16 rounded-[60px] bg-white border border-slate-200 hover:border-[#d4af37] transition-all duration-700 shadow-xl shadow-slate-200/50"
          >
            <div className="absolute top-0 right-0 p-12 text-7xl font-black text-slate-50">WHO</div>
            <div className="w-16 h-16 bg-[#d4af37]/10 rounded-[24px] flex items-center justify-center mb-10 shadow-inner">
              <Users className="text-[#d4af37]" size={32} />
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 group-hover:text-[#d4af37] transition-colors">Who We Are</h3>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              We are a collective of dedicated professionals committed to redefining industrial safety standards. Our expertise focuses on delivering reliable grounding systems for critical infrastructure worldwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative p-16 rounded-[60px] bg-slate-900 border border-slate-900 transition-all duration-700 shadow-3xl shadow-slate-900/20"
          >
            <div className="absolute top-0 right-0 p-12 text-7xl font-black text-white/5">DO</div>
            <div className="w-16 h-16 bg-[#d4af37] rounded-[24px] flex items-center justify-center mb-10 shadow-lg shadow-[#d4af37]/20">
              <Factory className="text-slate-900" size={32} />
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 text-white">What We Do</h3>
            <p className="text-white/50 text-lg leading-relaxed font-medium">
              Design, Supply and Installation of Lightning protection and Earthing systems. We ensure every project complies with global engineering specifications to protect lives and machinery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Unique Core Values Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-orange-50/30">
        {/* Architectural Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.05] pointer-events-none z-0">
          <svg width="100%" height="100%" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 100L700 700M100 700L700 100" stroke="#d4af37" strokeWidth="2" strokeDasharray="10 10" />
            <circle cx="400" cy="400" r="300" stroke="#d4af37" strokeWidth="1" />
            <rect x="200" y="200" width="400" height="400" stroke="#d4af37" strokeWidth="1" strokeDasharray="5 5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12 lg:gap-24">
            <div className="max-w-xl">
              <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Our Foundation</span>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-slate-900">
                Core <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-orange-500">Values</span>
              </h2>
            </div>

            <div className="flex-1 space-y-6 pt-12">
              <div className="h-[2px] w-full bg-gradient-to-r from-[#d4af37] to-transparent opacity-20" />
              <div className="flex flex-col sm:flex-row justify-between items-start gap-8 sm:gap-12">
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-xs">
                  Our commitment to excellence is anchored in a set of principles that guide every project, from concept to installation.
                </p>
                <div className="text-left sm:text-right">
                  <span className="text-slate-900 font-black text-4xl block mb-2">04</span>
                  <span className="text-slate-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em]">Pillars of Success</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={`group relative overflow-hidden p-8 md:p-12 rounded-[40px] md:rounded-[60px] border border-orange-100 hover:border-[#d4af37]/50 transition-all duration-700 shadow-xl shadow-orange-900/5
                  ${i === 0 || i === 3 ? 'md:col-span-7' : 'md:col-span-5'}
                  ${i % 2 === 0 ? 'bg-white' : 'bg-white/80 backdrop-blur-md'}`}
              >
                {/* Blueprint Accent on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-12">
                    <div className="w-16 h-16 rounded-3xl bg-white border border-slate-100 flex items-center justify-center text-[#d4af37] shadow-sm group-hover:bg-[#d4af37] group-hover:text-black transition-all duration-500">
                      <v.icon size={32} strokeWidth={1.5} />
                    </div>
                    <span className="text-slate-100 font-black text-6xl group-hover:text-[#d4af37]/10 transition-colors duration-700">0{i + 1}</span>
                  </div>

                  <h4 className="text-3xl font-black uppercase mb-6 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{v.title}</h4>
                  <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-md opacity-70 group-hover:opacity-100 transition-opacity">
                    {v.desc}
                  </p>

                  {/* Decorative Line */}
                  <div className="mt-12 h-1 w-12 bg-slate-100 group-hover:w-full group-hover:bg-[#d4af37]/20 transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Certifications />

      {/* Global CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative p-12 md:p-20 bg-slate-900 group rounded-[40px] md:rounded-[60px] overflow-hidden">
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#d4af37]/5 -skew-x-12 translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tighter leading-[0.9] mb-10 group-hover:scale-105 transition-transform duration-1000">
                Engineering <br />
                <span className="text-[#d4af37]">Futures.</span>
              </h2>
              <Link href="/contact" className="inline-block px-10 py-5 bg-[#d4af37] text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-110 transition-transform shadow-2xl shadow-[#d4af37]/20">
                Consult Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
