'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ClientStrip from '@/components/ClientStrip';
import { Power, Droplets, Home, Radio, Wind, Database, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const sectors = [
  {
    id: 'power',
    title: 'Power Generation',
    subtitle: 'High-Scale Energy Protection',
    description: 'Protecting massive energy infrastructure from generators to substations. Our systems ensure zero-interruption power flow through precision-engineered grounding.',
    features: ['Fault Current Dissipation', 'Substation Safety', 'Grid Resilience'],
    icon: Power,
    image: '/images/refinery_app.png',
    color: '#d4af37'
  },
  {
    id: 'refineries',
    title: 'Oil & Gas Refineries',
    subtitle: 'Explosion-Proof Grounding',
    description: 'In volatile environments, even a micro-spark can be catastrophic. Our exothermic welding provides permanent, non-corrosive bonds for total site safety.',
    features: ['Spark-Free Connections', 'Chemical Resistance', 'Intrinsically Safe'],
    icon: Droplets,
    image: '/images/welding.png',
    color: '#000000'
  },
  {
    id: 'data',
    title: 'Data Centers',
    subtitle: 'Digital Infrastructure Integrity',
    description: 'Ensuring clean power and signal integrity for critical servers. We provide the low-resistance path necessary for massive digital storage facilities.',
    features: ['Signal Noise Reduction', 'Uptime Assurance', 'Server Protection'],
    icon: Database,
    image: '/images/refinery_app.png',
    color: '#d4af37'
  },
  {
    id: 'telecom',
    title: 'Telecom Networks',
    subtitle: 'Uninterrupted Connectivity',
    description: 'Protecting remote towers and communication hubs from lightning strikes. Our systems maintain stable network coverage in the harshest weather.',
    features: ['Tower Protection', 'Low Resistance Earth', 'Maintenance Free'],
    icon: Radio,
    image: '/images/alnd.png',
    color: '#000000'
  }
];

export default function ApplicationsPage() {
  return (
    <div className="bg-white min-h-screen text-slate-900 font-display overflow-x-hidden">
      {/* Concise Header */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.5em] mb-4 block">Our Reach</span>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[1.1] md:leading-none mb-6">
              Global <span className="text-[#d4af37]">Applications</span>
            </h1>
            <div className="h-1.5 w-24 bg-[#d4af37] mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Modern Compact Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, idx) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative h-[400px] rounded-[40px] overflow-hidden bg-slate-100 border border-slate-100 hover:border-[#d4af37] transition-all duration-500 shadow-2xl shadow-slate-200/50"
              >
                <Image 
                  src={sector.image} 
                  alt={sector.title} 
                  fill 
                  className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 grayscale-[0.5]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                
                <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-[#d4af37] flex items-center justify-center text-black mb-6 shadow-xl">
                    <sector.icon size={24} />
                  </div>
                  <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-widest mb-2">{sector.subtitle}</span>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-4">{sector.title}</h3>
                  <div className="h-0.5 w-0 group-hover:w-full bg-[#d4af37] transition-all duration-700" />
                  
                  <Link href="/products" className="mt-6 flex items-center gap-3 text-[10px] font-black text-white/70 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    View Solutions <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
            
            {/* CTA Tile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative h-[400px] rounded-[40px] overflow-hidden bg-slate-900 flex flex-col items-center justify-center text-center p-10"
            >
              <div className="absolute inset-0 bg-[#d4af37]/5 -skew-x-12 translate-x-1/2" />
              <Zap className="text-[#d4af37] mb-8" size={48} />
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-6">Need a Custom <br /> Design?</h3>
              <Link href="/contact" className="px-8 py-4 bg-[#d4af37] text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-transform">
                Consult Engineering
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Reach Banner */}
      <section className="py-24 md:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="hidden lg:block absolute top-0 right-0 p-20 opacity-5 select-none pointer-events-none">
          <h2 className="text-[20rem] font-black text-white leading-none">GLOBAL</h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[1.1] md:leading-none">
            Trusted by Leaders <br />
            <span className="text-[#d4af37]">Worldwide.</span>
          </h2>
          <ClientStrip />
        </div>
      </section>

      <Footer />
    </div>
  );
}
