'use client';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ContactForm() {
  const [focused, setFocused] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'Earthing Products',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          data: formData
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: 'Earthing Products',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-slate-50 py-16 relative overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      <div className="relative max-w-[1600px] mx-auto pl-[70px] pr-6 md:pl-[12%] md:pr-6 z-10">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

            {/* Left */}
            <div className="w-full lg:w-2/5 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] rounded-sm border border-[#d4af37]/20 mb-6">
                Get In Touch
              </span>
              <h2 className="font-black text-[#0a0f1d] font-display leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 3rem)' }}>
                Protect Your Infrastructure
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-[1.8] mb-12 lg:mb-16">
                Connect with us today to discuss your site&apos;s specific blueprints and requirements.
              </p>

              {/* Contact info */}
              <div className="flex flex-col items-center lg:items-start space-y-6 md:space-y-8">
                {[
                  { icon: Phone, label: 'Call Us', value: '+91 75750 57000' },
                  { icon: Mail, label: 'Email Support', value: 'sales@saaraindia.com' },
                  { icon: MapPin, label: 'Factory Headquarters', value: '165, Plot No. 18 to 25, Rameshawar Ind. Area, Veraval (Shapar), Rajkot - 360024' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex flex-col lg:flex-row items-center lg:items-center gap-4 md:gap-5 group">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all duration-300 flex-shrink-0">
                      <Icon size={20} className="text-[#d4af37] group-hover:text-black transition-colors" />
                    </div>
                    <div className="text-center lg:text-left">
                      <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-1">{label}</p>
                      <p className="text-sm md:text-base font-bold text-[#0a0f1d] font-display">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right form */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="w-full flex-1 bg-white p-6 md:p-10 lg:p-14 rounded-3xl shadow-2xl shadow-slate-100 border border-slate-100 relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner text-green-500">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl font-black uppercase text-[#0a0f1d] mb-4">Message Sent!</h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 leading-relaxed font-medium">
                      Thank you for contacting SAARA Earthing. Our engineering sales team has received your query and will reach out to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-8 py-4 border border-slate-200 hover:bg-slate-50 rounded-2xl text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    <h3 className="font-black text-[#0a0f1d] font-display text-xl md:text-2xl mb-8 lg:mb-10">Send Us a Message</h3>
                    
                    {status === 'error' && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-semibold">
                        Failed to send message. Please check your connection and try again.
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                      {[
                        { id: 'name', label: 'Full Name', placeholder: '', type: 'text', required: true },
                        { id: 'email', label: 'Email Address', placeholder: '', type: 'email', required: true },
                        { id: 'company', label: 'Company Name', placeholder: '', type: 'text', required: false },
                        { id: 'phone', label: 'Phone Number', placeholder: '', type: 'tel', required: true },
                      ].map(f => (
                        <div key={f.id} className="flex flex-col gap-2">
                          <label htmlFor={f.id} className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{f.label}</label>
                          <input
                            id={f.id}
                            type={f.type}
                            required={f.required}
                            value={formData[f.id as keyof typeof formData]}
                            onChange={e => handleInputChange(f.id, e.target.value)}
                            onFocus={() => setFocused(f.id)}
                            onBlur={() => setFocused('')}
                            className={`w-full px-5 py-4 rounded-xl text-sm font-semibold text-[#0a0f1d] outline-none transition-all duration-300 bg-slate-50 border ${focused === f.id ? 'border-[#d4af37] bg-white shadow-sm shadow-yellow-100' : 'border-slate-200'}`}
                          />
                        </div>
                      ))}

                      <div className="sm:col-span-2 flex flex-col gap-2">
                        <label htmlFor="service" className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Service Required</label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={e => handleInputChange('service', e.target.value)}
                          onFocus={() => setFocused('service')}
                          onBlur={() => setFocused('')}
                          className={`w-full px-5 py-4 rounded-xl text-sm font-semibold text-[#0a0f1d] outline-none transition-all duration-300 bg-slate-50 border ${focused === 'service' ? 'border-[#d4af37] bg-white' : 'border-slate-200'}`}
                        >
                          <option value="Earthing Products">Earthing Products</option>
                          <option value="Earthing Accessories">Earthing Accessories</option>
                          <option value="Exothermic Welding">Exothermic Welding</option>
                          <option value="Lightning Protection">Lightning Protection</option>
                          <option value="Installation & Commissioning">Installation & Commissioning</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 flex flex-col gap-2">
                        <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Project Requirements</label>
                        <textarea
                          id="message"
                          rows={4}
                          required
                          value={formData.message}
                          onChange={e => handleInputChange('message', e.target.value)}
                          placeholder="Describe your project, location, and quantity..."
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused('')}
                          className={`w-full px-5 py-4 rounded-xl text-sm font-semibold text-[#0a0f1d] outline-none resize-none transition-all duration-300 bg-slate-50 border ${focused === 'message' ? 'border-[#d4af37] bg-white shadow-sm shadow-yellow-100' : 'border-slate-200'}`}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <motion.button
                          type="submit"
                          disabled={status === 'submitting'}
                          whileHover={{ y: -3, boxShadow: '0 20px 40px rgba(212,175,55,0.35)' }}
                          className="w-full flex items-center justify-center gap-3 bg-[#d4af37] text-black font-black py-5 rounded-xl text-sm uppercase tracking-wider font-display shadow-lg shadow-yellow-400/30 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {status === 'submitting' ? 'Sending...' : 'Get A Quote'} <Send size={16} />
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
