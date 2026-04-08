'use client';

const clients = [
  { name: 'Tata Steel', abbr: 'TA', industry: 'Metals' },
  { name: 'BHEL', abbr: 'BH', industry: 'Engineering' },
  { name: 'ONGC', abbr: 'ON', industry: 'Oil & Gas' },
  { name: 'L&T', abbr: 'L&', industry: 'Construction' },
  { name: 'Adani Group', abbr: 'AD', industry: 'Conglomerate' },
  { name: 'Reliance', abbr: 'RE', industry: 'Energy' },
  { name: 'NTPC', abbr: 'NT', industry: 'Power' },
  { name: 'IOCL', abbr: 'IO', industry: 'Petroleum' },
  { name: 'BPCL', abbr: 'BP', industry: 'Oil & Gas' },
  { name: 'Siemens', abbr: 'SI', industry: 'Technology' },
];

export default function ClientStrip() {
  // Triple the array to ensure smooth limitless infinite scroll spanning wider screens
  const multiplied = [...clients, ...clients, ...clients];

  return (
    <section className="bg-[#050810] py-20 md:py-12 relative overflow-hidden flex flex-col items-center border-t border-white/5">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150px] bg-[#d4af37]/10 blur-[100px] pointer-events-none" />

      <div className="text-center mb-16 relative z-10 px-4">
        <span className="inline-block px-4 py-1.5 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm border border-white/10 mb-4">
          Trusted Worldwide
        </span>
        <h3 className="text-3xl md:text-4xl text-white font-black tracking-tight font-display">
          Global <span className="text-[#d4af37] italic">Industry</span> Leaders
        </h3>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 z-10 pointer-events-none bg-gradient-to-r from-[#050810] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 z-10 pointer-events-none bg-gradient-to-l from-[#050810] to-transparent" />

        <div className="flex animate-marquee gap-4 md:gap-6 items-center will-change-transform hover:[animation-play-state:paused] py-8">
          {multiplied.map((c, i) => (
            <div
              key={i}
              className="group relative flex items-center gap-4 flex-shrink-0 w-[220px] md:w-[260px] px-5 py-4 cursor-pointer 
                         bg-white/5 border border-white/10 rounded-2xl 
                         hover:bg-[#d4af37]/5 hover:border-[#d4af37]/40 hover:-translate-y-2
                         hover:shadow-[0_15px_30px_rgba(212,175,55,0.12)] 
                         transition-all duration-500 overflow-hidden"
            >
              {/* Internal glowing top line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/0 to-transparent group-hover:via-[#d4af37]/80 transition-all duration-700 opacity-0 group-hover:opacity-100" />

              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center 
                              font-black text-white/40 text-sm md:text-base font-display 
                              group-hover:border-[#d4af37] group-hover:text-[#d4af37] group-hover:bg-[#d4af37]/10 
                              transition-all duration-500 shadow-inner">
                {c.abbr}
              </div>
              <div className="flex flex-col">
                <span className="text-sm md:text-base font-bold tracking-wide text-white/80 group-hover:text-white transition-colors duration-500">
                  {c.name}
                </span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30 group-hover:text-[#d4af37]/80 transition-colors duration-500 mt-0.5">
                  {c.industry}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
