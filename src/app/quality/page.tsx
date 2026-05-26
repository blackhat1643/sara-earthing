'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Certifications from '@/components/Certifications';
import { ShieldCheck, Award, Microscope, Users, Globe, CheckCircle, Zap, Shield } from 'lucide-react';

export default function QualityPage() {
  const qualityFeatures = [
    {
      icon: Microscope,
      title: "Product Brilliance",
      desc: "From the initial layout planning of major IT parks to heavy industrial complexes, leading engineers rely on our specialized gel earthing electrode for lightning protection to secure high-stakes infrastructure against electrical surges."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      desc: "Our manufacturing facilities and management protocols are officially aligned with the rigorous ISO 9001 quality assurance standard. This certification ensures that every single batch of equipment we produce reflects exact chemical and structural uniformity."
    },
    {
      icon: Users,
      title: "Service & Support",
      desc: "We conduct structured, ongoing training programs for our technical personnel to maintain an elite standard of service, engineering insight, and site-installation awareness."
    },
    {
      icon: Globe,
      title: "Decades of Expertise",
      desc: "Our leadership team brings more than two decades of dedicated field experience to the modern electrical grid. We operate as both a premier manufacturer and a specialized technical consultant, deploying advanced grounding systems across project landscapes."
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-display">
      {/* Blueprint Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-28 pb-12 md:pb-16 flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[#d4af37]/5 -skew-x-12 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-slate-50 skew-y-6 -translate-x-1/4" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-4 md:gap-6 mb-8">
              <div className="h-[1px] w-8 md:w-12 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em]">Premium Standards</span>
              <div className="h-[1px] w-8 md:w-12 bg-[#d4af37]" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.1] md:leading-none mb-8">
              Engineering for <br />
              <span className="text-[#d4af37]">Non-Negotiable</span> <br />
              <span className="text-slate-900">Quality</span>
            </h1>

            <p className="text-slate-500 text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed px-4 md:px-0">
              Every system we manufacture undergoes rigorous validation to deliver flawless electrical grounding solutions for safety across India&apos;s most demanding industrial landscapes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Quality Pillars */}
      <section className="py-20 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1.1]">
              The Four Pillars <br className="hidden md:block" />
              <span className="text-[#d4af37]">of Excellence</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {qualityFeatures.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 md:p-12 rounded-[50px] bg-slate-50 border border-slate-100 hover:border-[#d4af37] transition-all duration-500 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#d4af37]/10"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#d4af37] shadow-sm border border-slate-50 group-hover:bg-[#d4af37] group-hover:text-white transition-colors duration-500">
                    <item.icon size={32} />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Pillar 0{idx + 1}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">{item.title}</h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Grid */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-full bg-[#d4af37]/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[#d4af37] text-[11px] font-black uppercase tracking-[0.5em] mb-6 block">Certifications</span>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-10">
                Approved by <br />
                <span className="text-[#d4af37]">The Best</span>
              </h2>
              <div className="space-y-6">
                {[
                  "CPRI Approved Design & Testing",
                  "PWD Government Mark of Approval",
                  "ISO 9001:2015 Quality Management",
                  "ASTM & IEEE Standard Compliance"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                      <Shield size={18} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square relative rounded-[40px] md:rounded-[80px] overflow-hidden border-8 border-white/5">
                <Image
                  src="/images/welding.png"
                  alt="Quality Testing"
                  fill
                  className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>

              <div className="mt-8 md:absolute md:-bottom-10 md:-left-10 bg-[#d4af37] p-8 md:p-10 rounded-[30px] md:rounded-[40px] text-black max-w-xs shadow-3xl mx-auto md:mx-0">
                <ShieldCheck size={40} className="mb-6 mx-auto md:mx-0" />
                <p className="text-sm font-black leading-relaxed uppercase tracking-widest text-center md:text-left">
                  "Exceeding international standards for safety and electrical conductivity since 2010."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Certifications />

      {/* Small CTA */}
      <section className="py-7 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[40px] md:rounded-[60px] overflow-hidden bg-slate-900 p-12 md:p-24 text-center shadow-3xl">
            <div className="absolute top-0 right-0 w-[600px] h-full bg-[#d4af37]/5 -skew-x-12 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-7xl font-black text-white uppercase mb-12 tracking-tighter leading-[1.1] md:leading-none">
                Quality That <br className="md:hidden" />
                <span className="text-[#d4af37]">Matters</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/quote" className="px-10 py-5 bg-[#d4af37] text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-transform shadow-2xl shadow-[#d4af37]/20">
                  Request a Quote
                </Link>
                <Link href="/company" className="px-10 py-5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-white/5 transition-all">
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
