'use client';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const certs = [
  { icon: Award, title: 'ISO 9001:2015', desc: 'Certified quality management system ensuring consistent international standards in manufacturing and supply.' },
  { icon: ShieldCheck, title: 'CPRI Approved', desc: 'Central Power Research Institute approved for high-load reliability across power and industrial infrastructure.' },
  { icon: CheckCircle2, title: 'PWD Gov. Approved', desc: 'Registered & approved for government public works, infrastructure, and urban development projects nationwide.' },
];

export default function Certifications() {
  return (
    <section id="certifications" className="bg-white py-10">
      <div className="relative max-w-[1600px] mx-auto px-6">
        <div className="lg:ml-[10%] lg:w-[90%] w-full">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            {/* Left */}
            <div className="flex-1">
              <span className="inline-block px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] rounded-sm border border-[#d4af37]/20 mb-6">
                Our Standards
              </span>
              <h2 className="font-black text-[#0a0f1d] font-display leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                Quality You Can Trust
              </h2>
              <p className="text-slate-500 text-lg leading-[1.8] mb-10">
                For over 20 years, Saara Earthing has remained committed to engineering excellence. Our products undergo rigorous testing to meet the most stringent safety certifications.
              </p>

              {/* Features list */}
              <div className="space-y-4 mb-12">
                {['100% Pure Electrolytic Copper', 'Anti-Corrosive Nano Coating', 'Zero Maintenance Designs', 'IS / IEC / BS Standards Compliance'].map(item => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    </div>
                    <span className="text-slate-700 font-semibold text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <motion.button whileHover={{ y: -3 }}
                className="bg-[#0a0f1d] text-white font-black px-10 py-5 rounded-full text-sm uppercase tracking-wider font-display hover:bg-[#1e293b] transition-colors shadow-xl shadow-slate-900/20">
                Download Product Catalog
              </motion.button>
            </div>

            {/* Right cards */}
            <div className="flex-1 space-y-5 w-full">
              {certs.map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }}
                  whileHover={{ borderColor: 'rgba(212,175,55,0.4)', x: -4 }}
                  className="flex items-start gap-6 p-8 border border-slate-100 rounded-2xl bg-slate-50/50 transition-all duration-300 cursor-default"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={26} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#0a0f1d] text-lg font-display mb-2">{title}</h4>
                    <p className="text-slate-500 text-sm leading-[1.75]">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
