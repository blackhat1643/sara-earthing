'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Globe, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function ContactPage() {
  const [focused, setFocused] = useState('');

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 99 79 852555", "+91 98 79 611180"],
      label: "Sales & Support"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["sales@saaraindia.com", "info@saaraindia.com"],
      label: "Inquiries"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Ahmedabad, Gujarat, India"],
      label: "Headquarters"
    },
    {
      icon: Clock,
      title: "Work Hours",
      details: ["Mon - Sat: 10:00 - 18:00", "Sunday: Closed"],
      label: "Timing"
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-display overflow-x-hidden">
      {/* Blueprint Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 flex items-center justify-center overflow-hidden bg-white">
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
            <div className="inline-flex items-center gap-6 mb-8">
              <div className="h-[1px] w-12 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-[11px] font-black uppercase tracking-[0.6em]">Get In Touch</span>
              <div className="h-[1px] w-12 bg-[#d4af37]" />
            </div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
              Expert <span className="text-[#d4af37]">Support</span> <br />
              <span className="text-slate-900">On Demand</span>
            </h1>

            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Whether you need technical calculations, a custom quote, or project consultation, our engineering team is ready to assist.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="py-16 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-[40px] bg-slate-50 border border-slate-100 hover:border-[#d4af37] transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#d4af37] shadow-sm border border-slate-50 group-hover:bg-[#d4af37] group-hover:text-white transition-colors duration-500 mb-6">
                  <info.icon size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-2">{info.label}</span>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-slate-500 text-sm font-bold">{detail}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form & Map Section */}
      <section className="py-7 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-14 rounded-[60px] border border-slate-100 shadow-3xl shadow-slate-200/50"
            >
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10">Send a <span className="text-[#d4af37]">Message</span></h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
                  { id: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email' },
                  { id: 'phone', label: 'Phone', placeholder: '+91 98765 43210', type: 'tel' },
                  { id: 'company', label: 'Company', placeholder: 'Infrastructure Ltd', type: 'text' },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label htmlFor={f.id} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{f.label}</label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      onFocus={() => setFocused(f.id)}
                      onBlur={() => setFocused('')}
                      className={`w-full px-6 py-4 rounded-2xl text-sm font-bold text-slate-900 outline-none transition-all duration-300 bg-slate-50 border ${focused === f.id ? 'border-[#d4af37] bg-white shadow-lg shadow-yellow-400/5' : 'border-slate-100'}`}
                    />
                  </div>
                ))}
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Project Requirements</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your project requirements..."
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    className={`w-full px-6 py-4 rounded-2xl text-sm font-bold text-slate-900 outline-none resize-none transition-all duration-300 bg-slate-50 border ${focused === 'message' ? 'border-[#d4af37] bg-white shadow-lg shadow-yellow-400/5' : 'border-slate-100'}`}
                  />
                </div>
                <div className="md:col-span-2 mt-4">
                  <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#d4af37] hover:text-black transition-all shadow-2xl flex items-center justify-center gap-3">
                    Send Inquiry <Send size={16} />
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Map/Visual Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="relative aspect-video lg:aspect-square rounded-[60px] overflow-hidden border-8 border-slate-50 shadow-2xl">
                <Image
                  src="/images/refinery_app.png"
                  alt="Our Location"
                  fill
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-[#d4af37]/10 mix-blend-multiply" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <MapPin className="text-[#d4af37]" size={32} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Globe, title: "Global Reach", desc: "Supplying to 20+ countries" },
                  { icon: ShieldCheck, title: "Secure Projects", desc: "10k+ Successful sites" }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[40px] bg-slate-900 text-white border border-white/5">
                    <item.icon className="text-[#d4af37] mb-4" size={24} />
                    <h4 className="text-lg font-black uppercase tracking-tight mb-2">{item.title}</h4>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
