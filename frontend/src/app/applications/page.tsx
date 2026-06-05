'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';

import { Power, Droplets, Home, Radio, Wind, Database, ArrowRight, ShieldCheck, Zap, Cpu, Activity, Building2, Hotel } from 'lucide-react';

const sectors = [
  {
    id: 'transformers',
    title: 'Transformers',
    subtitle: 'High-Voltage Grid Regulation',
    description: 'Protecting sensitive substations and power transformers from catastrophic fault currents and high-energy surges, guaranteeing stable grid distribution.',
    features: ['Surge Suppression', 'Thermal Insulation', 'Overvoltage Protection'],
    icon: Zap,
    image: '/images/power_app.png',
    color: '#d4af37'
  },
  {
    id: 'production-plants',
    title: 'Production Plants',
    subtitle: 'Industrial Machinery Grounding',
    description: 'Safeguarding heavy machinery, computerized assembly lines, and industrial workers from shock hazards and electrostatic discharges (ESD).',
    features: ['Static Dissipation', 'Personnel Protection', 'Equipment Longevity'],
    icon: Cpu,
    image: '/images/welding.png',
    color: '#000000'
  },
  {
    id: 'refineries',
    title: 'Refineries',
    subtitle: 'Explosion-Proof Grounding',
    description: 'Providing permanent, zero-resistance connections for volatile oil, gas, and chemical processing facilities to completely mitigate spark hazards.',
    features: ['Intrinsically Safe', 'Corrosion Resistance', 'Fault Dissipation'],
    icon: Droplets,
    image: '/images/refinery_app.png',
    color: '#d4af37'
  },
  {
    id: 'transmission-towers',
    title: 'Power Transmission Tower',
    subtitle: 'High-Structure Lightning Shields',
    description: 'Diverting direct atmospheric lightning strikes away from active conductor lines and grounding the high-voltage transmission pylons safely into the earth.',
    features: ['Direct Strike Deflection', 'Low Impedance Paths', 'Extreme Durability'],
    icon: Wind,
    image: '/images/pylon_tower.jpg',
    color: '#000000'
  },
  {
    id: 'power-generation',
    title: 'Power Generation Plants',
    subtitle: 'Heavy-Duty Energy Grounds',
    description: 'Providing maximum fault-current capability for thermal, nuclear, and hydroelectric power plants, securing crucial turbines and control rooms.',
    features: ['High-Amp Dissipation', 'Turbine Protection', 'Control System Grounding'],
    icon: Power,
    image: '/images/power_app.png',
    color: '#d4af37'
  },
  {
    id: 'homes',
    title: 'Homes',
    subtitle: 'Residential Electrical Safety',
    description: 'Protecting your family, smart home networks, and modern domestic appliances from sudden lightning strikes and internal electrical surges.',
    features: ['Domestic Appliance Safety', 'Shock Prevention', 'Compact Rod Systems'],
    icon: Home,
    image: '/images/residential_app.png',
    color: '#000000'
  },
  {
    id: 'windmills',
    title: 'Windmills',
    subtitle: 'Renewable Turbine Protection',
    description: 'Wind turbine blades are highly vulnerable to lightning at high altitudes. We engineer low-impedance pathways down the nacelle and tower to safeguard turbine electronics.',
    features: ['High-Altitude Grounding', 'Nacelle Protection', 'Corrosion Shielding'],
    icon: Activity,
    image: '/images/wind_app.png',
    color: '#d4af37'
  },
  {
    id: 'telecom-towers',
    title: 'Telecom Towers',
    subtitle: 'Network Signal Integrity',
    description: 'Securing remote cellular masts and transmission hubs. Our maintenance-free grounding prevents downtime and filters electromagnetic signal noise.',
    features: ['Signal Noise Elimination', 'Tower Base Grounding', 'Maintenance-Free Systems'],
    icon: Radio,
    image: '/images/telecom_app.png',
    color: '#000000'
  },
  {
    id: 'malls',
    title: 'Malls',
    subtitle: 'Commercial Hub Safeguards',
    description: 'Securing crowded public spaces, complex central HVAC networks, elevators, and retail electronics from unexpected short circuits and electrical surges.',
    features: ['Public Safety Design', 'HVAC System Grounding', 'Commercial Surge Protection'],
    icon: Building2,
    image: '/images/alnd.png',
    color: '#d4af37'
  },
  {
    id: 'data-centers',
    title: 'Data Center',
    subtitle: 'Digital Infrastructure Integrity',
    description: 'Ensuring clean power and signal integrity for critical servers. We provide the ultra-low resistance grounding grid necessary for massive digital storage facilities.',
    features: ['Clean Grounding Grid', 'Uptime Assurance', 'Sensitive Server Shielding'],
    icon: Database,
    image: '/images/datacenter_app.png',
    color: '#000000'
  },
  {
    id: 'hotels',
    title: 'Hotel',
    subtitle: 'Premium Hospitality Grounding',
    description: 'Safeguarding luxury high-rise buildings, central computing centers, smart rooms, and leisure amenities from fire hazards caused by electrical failure.',
    features: ['Aesthetic Compact Layouts', 'Central Panel Protection', 'Total Occupant Safety'],
    icon: Hotel,
    image: '/images/residential_app.png',
    color: '#d4af37'
  }
];

export default function ApplicationsPage() {
  return (
    <div className="bg-white min-h-screen text-slate-900 font-display overflow-x-clip relative">
      {/* Concise Header */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.5em] mb-4 block">Precision Across Industries</span>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[1.1] md:leading-none mb-6">
              Global <span className="text-[#d4af37]">Applications</span>
            </h1>
            <div className="h-1.5 w-24 bg-[#d4af37] mx-auto mb-8" />
            
            <div className="max-w-3xl mx-auto text-slate-600 text-base md:text-lg font-medium leading-relaxed space-y-6">
              <p>
                We translate complex site demands into high performing industrial electrical grounding solutions that prevent catastrophic equipment downtime and preserve data integrity.
              </p>
              <p>
                From shielding heavy production machinery to deploying robust lightning protection grounding solutions on massive commercial roofs, our systems adapt to your specific operational blueprint. With expertise in advanced earthing technology solutions, we deliver an unshakeable foundation of safety that remains stable across all sectors & industries.
              </p>
            </div>
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



      <Footer />
    </div>
  );
}
