'use client';
import { motion } from 'framer-motion';

const stats = [
  { val: '792+', label: 'Projects Done' },
  { val: '532+', label: 'Trusted Clients' },
  { val: '35+', label: 'Expert Members' },
  { val: '12+', label: 'Countries Served' },
];

export default function StatsSection() {
  return (
    <section className="bg-[#d4af37] relative overflow-hidden">
      {/* Background art */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#0a0f1d]/10 pointer-events-none" />
      {/* Dotted texture */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left copy */}
          <div className="max-w-md text-center lg:text-left">
            <h2 className="font-black text-[#0a0f1d] font-display leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', letterSpacing: '-0.04em' }}>
              20+ Years of Engineering Excellence
            </h2>
            <p className="text-[#0a0f1d]/60 text-base leading-[1.75] font-semibold">
              Pan India & International Presence in Earth Protection & Lightning Systems.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-x-20 gap-y-10">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center lg:text-left"
              >
                <div className="font-black text-[#0a0f1d] font-display leading-none mb-3"
                  style={{ fontSize: 'clamp(2.8rem, 4vw, 3.8rem)', letterSpacing: '-0.05em' }}>
                  {s.val}
                </div>
                <div className="text-[#0a0f1d]/55 text-[10px] uppercase tracking-[0.2em] font-bold">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
