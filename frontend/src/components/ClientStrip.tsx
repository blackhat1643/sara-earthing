'use client';

const clientLogos = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  path: `/images/clients/pf-${i + 1}.jpg`
}));

export default function ClientStrip() {
  // Triple the array to ensure smooth limitless infinite scroll spanning wider screens
  const multiplied = [...clientLogos, ...clientLogos];
  const items = [...multiplied, ...multiplied];

  return (
    <div className="w-full py-6 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150px] bg-[#d4af37]/10 blur-[100px] pointer-events-none" />

      {/* Content wrapper scaled to full width */}
      <div className="w-full flex flex-col items-center relative z-10">
        <div className="text-center mb-10 px-4">
          <span className="inline-block px-4 py-1.5 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm border border-white/10 mb-4">
            Trusted Worldwide
          </span>
          <h3 className="text-3xl md:text-5xl text-white font-black tracking-tight font-display">
            Global <span className="text-[#d4af37] italic">Industry</span> Leaders
          </h3>
        </div>

        <div className="relative w-full flex overflow-hidden">
          <div className="flex animate-marquee gap-8 md:gap-16 items-center will-change-transform hover:[animation-play-state:paused] py-4 z-10">
            {items.map((c, i) => (
              <div
                key={i}
                className="group relative flex items-center justify-center flex-shrink-0 w-32 h-16 md:w-48 md:h-24 px-4 
                           bg-white rounded-xl overflow-hidden hover:scale-110 transition-transform duration-500 shadow-2xl"
              >
                <img
                  src={c.path}
                  alt={`Client Logo ${c.id}`}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>

          {/* Fade masks placed after the marquee to force rendering on top of GPU compositor layers */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-80 z-30 pointer-events-none bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-[#0f172a]/0" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-80 z-30 pointer-events-none bg-gradient-to-l from-[#0f172a] via-[#0f172a]/80 to-[#0f172a]/0" />
        </div>
      </div>
    </div>
  );
}
