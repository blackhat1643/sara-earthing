'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Certifications from '@/components/Certifications';
import { Award, Microscope, Users, Globe, ShieldCheck, Activity } from 'lucide-react';

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
    <div className="bg-white min-h-screen text-slate-900 font-display overflow-x-clip relative">
      {/* Blueprint Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 pb-20 md:pb-24 flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[#d4af37]/5 -skew-x-12 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-slate-50/50 skew-y-6 -translate-x-1/4" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
          {/* Typography side */}
          <div className="lg:col-span-6 text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7.5xl font-black uppercase tracking-tight text-slate-900 mb-8 leading-[0.95]">
                Engineering for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f0d060] to-[#b8860b] pr-2">
                  Non-Negotiable
                </span> <br />
                Quality
              </h1>

              <p className="text-slate-600 text-base md:text-xl font-medium leading-relaxed max-w-xl mb-10">
                Every system we manufacture undergoes rigorous validation to deliver flawless electrical grounding solutions for safety across India&apos;s most demanding industrial landscapes.
              </p>

              {/* Compliance grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 max-w-xl">
                {[
                  { tag: "CPRI", val: "Short-Circuit Tested" },
                  { tag: "ISO 9001:2015", val: "QMS Certified" },
                  { tag: "ERDA", val: "Parameter Tested" },
                  { tag: "IS 3043:2018", val: "Code Compliant" }
                ].map((c, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col justify-center">
                    <span className="text-[#d4af37] text-[10px] font-black tracking-widest leading-none mb-1">{c.tag}</span>
                    <span className="text-slate-400 text-[9px] font-extrabold uppercase tracking-wider">{c.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image side */}
          <div className="lg:col-span-6 relative mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative aspect-square lg:aspect-video rounded-[40px] overflow-hidden shadow-2xl border-4 border-white bg-[#faf9f6]"
            >
              <Image 
                src="/images/VIEW/Complete Earthing Solutions.jpg" 
                alt="Quality Testing Indicators"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Quality Pillars */}
      <section className="py-13 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24 text-center">
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



      <Certifications />

      <Footer />
    </div>
  );
}
