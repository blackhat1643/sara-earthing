'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Globe, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [focused, setFocused] = useState('');

  const contactInfo = [
    {
      icon: Phone,
      title: "Contact Us",
      details: ["+91 75750 57000", "+91 75750 52000"],
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
      details: [
        "165, Plot No. 18 to 25,",
        "Rameshawar Ind. Area, Veraval (Shapar),",
        "Rajkot - 360024, Gujarat, India"
      ],
      label: "Factory Headquarters"
    },
    {
      icon: Clock,
      title: "Work Hours",
      details: ["Mon - Sat: 10:00 - 18:00", "Sunday: Closed"],
      label: "Timing"
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-display overflow-x-clip relative">
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
              Connect <br />
              <span className="text-[#d4af37]">With Us</span>
            </h1>

            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Share your specific site parameters or tender requirements with us, and let our specialists deliver a zero failure defense plan for your assets.
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
                  {info.details.map((detail, i) => {
                    const isWhatsApp = detail === "+91 75750 52000";
                    if (isWhatsApp) {
                      return (
                        <a
                          key={i}
                          href="https://wa.me/917575052000"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-slate-500 text-sm font-bold hover:text-[#25D366] transition-colors w-max group"
                        >
                          <svg
                            className="w-4 h-4 fill-current text-[#25D366] group-hover:scale-110 transition-transform"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12.031 2C6.446 2 1.92 6.528 1.918 12.112c-.002 1.785.464 3.528 1.35 5.063L2 22l5.021-1.317c1.488.811 3.16 1.24 4.888 1.243h.004c5.581 0 10.106-4.527 10.108-10.111C22.024 6.527 17.5 2 12.031 2zm6.177 14.544c-.27.76-1.536 1.483-2.128 1.579-.592.096-1.185.143-3.766-.889-3.298-1.321-5.385-4.707-5.55-4.928-.164-.22-1.306-1.739-1.306-3.322 0-1.583.824-2.36 1.12-2.67.297-.31.643-.388.857-.388.214 0 .429.002.61.01.192.008.448-.074.702.535.263.63.899 2.196.977 2.355.078.158.13.344.025.551-.104.208-.157.329-.311.51-.154.18-.323.402-.461.54-.15.152-.308.318-.133.617.175.3.778 1.284 1.67 2.079.95.847 1.748 1.109 2.052 1.258.304.15.483.125.666-.084.183-.21.784-.913.993-1.226.208-.313.417-.263.702-.158.286.105 1.81.853 2.122 1.01.312.156.52.233.595.362.075.13.075.753-.195 1.513z" />
                          </svg>
                          <span>{detail}</span>
                        </a>
                      );
                    }

                    const isPhone = detail.startsWith("+91");
                    const isEmail = detail.includes("@");
                    if (isPhone) {
                      return (
                        <a
                          key={i}
                          href={`tel:${detail.replace(/\s+/g, '')}`}
                          className="flex items-center gap-1.5 text-slate-500 text-sm font-bold hover:text-[#d4af37] transition-colors w-max group"
                        >
                          <Phone size={14} className="text-[#d4af37] group-hover:scale-110 transition-transform" />
                          <span>{detail}</span>
                        </a>
                      );
                    }
                    if (isEmail) {
                      return (
                        <a
                          key={i}
                          href={`mailto:${detail}`}
                          className="text-slate-500 text-sm font-bold hover:text-[#d4af37] transition-colors w-max block"
                        >
                          {detail}
                        </a>
                      );
                    }

                    return (
                      <p key={i} className="text-slate-500 text-sm font-bold">{detail}</p>
                    );
                  })}
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
                  { id: 'name', label: 'Full Name', type: 'text' },
                  { id: 'email', label: 'Email', type: 'email' },
                  { id: 'phone', label: 'Phone', type: 'tel' },
                  { id: 'company', label: 'Company', type: 'text' },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label htmlFor={f.id} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{f.label}</label>
                    <input
                      id={f.id}
                      type={f.type}
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
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.587318592103!2d70.8017746!3d22.1417049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3958358e2b1887a3%3A0xa9a43eee44352a6e!2sSaara%20Earthing%20India%20Pvt.%20Ltd.%20%7C%20Lightning%20Protection%20%26%20Grounding%20Solutions%20in%20India!5e0!3m2!1sen!2sin!4v1716886400000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale contrast-[1.1] brightness-[0.95] opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
              </div>


            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
