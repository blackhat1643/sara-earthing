'use client';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactForm() {
  const [focused, setFocused] = useState('');

  return (
    <section id="contact" className="bg-slate-50 py-32 relative overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-start">

          {/* Left */}
          <div className="lg:w-2/5">
            <span className="inline-block px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] rounded-sm border border-[#d4af37]/20 mb-6">
              Get In Touch
            </span>
            <h2 className="font-black text-[#0a0f1d] font-display leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3rem)' }}>
              Ready to Start a Project?
            </h2>
            <p className="text-slate-500 text-lg leading-[1.8] mb-16">
              Our engineers are ready to provide customized earthing solutions and technical support for your infrastructure.
            </p>

            {/* Contact info */}
            <div className="space-y-8">
              {[
                { icon: Phone, label: 'Call Us', value: '+91 98765 43210' },
                { icon: Mail, label: 'Email Support', value: 'info@saaraindia.com' },
                { icon: MapPin, label: 'Headquarters', value: 'Ahmedabad, Gujarat, India' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all duration-300 flex-shrink-0">
                    <Icon size={22} className="text-[#d4af37] group-hover:text-black transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-1">{label}</p>
                    <p className="text-base font-bold text-[#0a0f1d] font-display">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex-1 bg-white p-10 md:p-14 rounded-3xl shadow-2xl shadow-slate-100 border border-slate-100">
            <h3 className="font-black text-[#0a0f1d] font-display text-2xl mb-10">Send Us a Message</h3>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { id: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
                { id: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email' },
                { id: 'company', label: 'Company Name', placeholder: 'ACME Corp', type: 'text' },
                { id: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
              ].map(f => (
                <div key={f.id} className="flex flex-col gap-2">
                  <label htmlFor={f.id} className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{f.label}</label>
                  <input id={f.id} type={f.type} placeholder={f.placeholder}
                    onFocus={() => setFocused(f.id)} onBlur={() => setFocused('')}
                    className={`w-full px-5 py-4 rounded-xl text-sm font-semibold text-[#0a0f1d] outline-none transition-all duration-300 bg-slate-50 border ${focused === f.id ? 'border-[#d4af37] bg-white shadow-sm shadow-yellow-100' : 'border-slate-200'}`}
                  />
                </div>
              ))}

              <div className="sm:col-span-2 flex flex-col gap-2">
                <label htmlFor="service" className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Service Required</label>
                <select id="service" onFocus={() => setFocused('service')} onBlur={() => setFocused('')}
                  className={`w-full px-5 py-4 rounded-xl text-sm font-semibold text-[#0a0f1d] outline-none transition-all duration-300 bg-slate-50 border ${focused === 'service' ? 'border-[#d4af37] bg-white' : 'border-slate-200'}`}>
                  <option>Earthing Products</option>
                  <option>Earthing Accessories</option>
                  <option>Exothermic Welding</option>
                  <option>Lightning Protection</option>
                  <option>Installation & Commissioning</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Project Requirements</label>
                <textarea id="message" rows={4} placeholder="Describe your project, location, and quantity..."
                  onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                  className={`w-full px-5 py-4 rounded-xl text-sm font-semibold text-[#0a0f1d] outline-none resize-none transition-all duration-300 bg-slate-50 border ${focused === 'message' ? 'border-[#d4af37] bg-white shadow-sm shadow-yellow-100' : 'border-slate-200'}`} />
              </div>

              <div className="sm:col-span-2">
                <motion.button type="submit" whileHover={{ y: -3, boxShadow: '0 20px 40px rgba(212,175,55,0.35)' }}
                  className="w-full flex items-center justify-center gap-3 bg-[#d4af37] text-black font-black py-5 rounded-xl text-sm uppercase tracking-wider font-display shadow-lg shadow-yellow-400/30 transition-all duration-300 cursor-pointer">
                  Send Message <Send size={16} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
