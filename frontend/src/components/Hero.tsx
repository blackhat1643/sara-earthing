'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[80vh] md:h-screen bg-[#060a14] overflow-hidden">
      {/* Background Image Replace Models */}
      <div className="absolute inset-0 z-0">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/images/b22.mp4" type="video/mp4" />
          <source src="/images/b22.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>

        {/* Dynamic High-Tech Gold Grid Mesh Overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212, 175, 55, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212, 175, 55, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Vignette Overlay (Dark edges and bottom gradient) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-transparent to-[#060a14]/80 opacity-45" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      <div className="relative h-full flex items-center justify-center container mx-auto px-6">
        {/* Hero Content */}
        <div className="relative z-30 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em] mb-8">
              Pioneering Industrial Safety
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black text-white font-display leading-tight md:leading-tight tracking-tighter uppercase mb-8">
              Reliable Foundation For <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#f7e1ad] to-[#b8860b]">
                Electrical Safety
              </span>
            </h1>
            
            <p className="text-white/70 text-sm md:text-lg font-medium max-w-3xl mx-auto mb-10 leading-relaxed px-4 md:px-0">
              We have been manufacturing chemical earthing and lightning protection systems for more than 20 years now, protecting vital assets, industrial facilities, and residential places throughout India.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="/applications"
                className="group relative px-8 py-4 bg-[#d4af37] overflow-hidden transition-all hover:pr-12 transform hover:-translate-y-1 block"
              >
                <span className="relative z-10 text-[#060a14] font-black uppercase tracking-widest text-[10px]">Explore Solutions</span>
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
              
              <Link 
                href="/products/earthing-products"
                className="px-8 py-4 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all backdrop-blur-sm block"
              >
                Technical Specs
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
      </div>
    </section>
  );
}
