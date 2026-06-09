'use client';
import Link from 'next/link';
import { ArrowRight, Mail, Globe, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Footer({ showImage = false }: { showImage?: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax translation: image moves down as user scrolls down
  const yOffset = useTransform(scrollYProgress, [0, 1], ["-50%", "20%"]);

  return (
    <footer ref={containerRef} className="relative bg-[#050810] text-white pt-32 pb-6 overflow-hidden border-t border-white/5">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image src="/images/alnd.png" alt="Footer Background" fill className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-[#050810]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-[#050810]/80" />
      </div>

      {/* Parallax Secondary Image — only on home page */}
      {showImage && (
        <motion.div
          style={{ y: yOffset }}
          className="absolute left-[-43vw] md:left-[-17.4vw] bottom-[-75px] md:bottom-[-300px] w-full h-full pointer-events-none z-[100] flex items-end justify-start opacity-100"
        >
          <div className="relative w-[120vw] h-[180vw] md:w-[45vw] md:h-[75vw] mb-[42vw] md:mb-[-15vw]">
            <Image
              src="/images/20-08-2025_Sara_Earthing1052-removebg-preview.png"
              alt="Earthing Product"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      )}

      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4af37]/5 blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/3 z-0" />

      <div className={`relative max-w-[1600px] mx-auto z-[110] ${showImage ? 'flex justify-end' : 'px-6 flex justify-center'}`}>
        <div className={showImage ? 'w-full pl-[70px] pr-6 md:w-[90%] md:pl-0' : 'w-full max-w-[1200px]'}>
          {/* Floating CTA Banner */}
          <div className="relative mb-24 glass-dark border border-[#d4af37]/20 rounded-3xl p-10 md:p-14 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-black/50 hover:border-[#d4af37]/50 transition-colors duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-transparent opacity-50" />
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl md:text-5xl font-black font-display text-white mb-4 tracking-tight">
                Ready to secure your <span className="text-[#d4af37] italic">infrastructure?</span>
              </h3>
              <p className="text-white/50 text-base md:text-lg">
                Partner with the industry leaders in earthing and lightning protection. Let&apos;s build a safer world together.
              </p>
            </div>
            <Link href="/quote" className="relative z-10 group flex items-center justify-center gap-3 bg-[#d4af37] text-black font-black px-8 py-4 md:px-10 md:py-5 rounded-full text-sm md:text-base uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 font-display flex-shrink-0">
              Get a Quote
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-24 relative z-[120]">

            {/* Brand Col */}
            <div className="md:col-span-3">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="relative w-14 h-14 bg-white rounded-xl p-1 flex items-center justify-center shadow-xl overflow-hidden group-hover:scale-105 transition-transform">
                  <Image
                    src="/images/logo.png"
                    alt="SAARA Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <span className="font-black text-2xl tracking-[-0.04em] font-display">
                  SAARA <span className="text-[#d4af37] italic">EARTHING</span>
                </span>
              </Link>
              <p className="text-white/60 text-sm leading-[1.8] mb-8 font-medium">
                With over two decades of manufacturing excellence, we provide advanced, certified, and maintenance free earthing Solutions alongside robust lightning protection systems.
              </p>
              {/* Social icons */}
              <div className="flex gap-4">
                {[
                  { href: 'https://www.instagram.com/saara_earthing/', label: 'Instagram', svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                  { href: 'https://www.facebook.com/saaraearthing/', label: 'Facebook', svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                  { href: 'https://www.youtube.com/@SaaraEarthing', label: 'YouTube', svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg> },
                  { href: 'https://www.linkedin.com/company/saara-earthing-india-private-limited/', label: 'LinkedIn', svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                ].map(({ href, label, svg }) => (
                  <Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all duration-300">
                    {svg}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links Col */}
            <div className="md:col-span-2">
              <h4 className="font-black text-base font-display mb-8 tracking-wide text-white uppercase">
                Quick Links
              </h4>
              <ul className="space-y-4">
                {['Home', 'About Us', 'Earthing', 'Products', 'Applications', 'Quality', 'Clients'].map(item => (
                  <li key={item}>
                    <Link href={
                      item === 'Home' ? '/' :
                      item === 'About Us' ? '/company' :
                      item === 'Earthing' ? '/earthing' :
                      item === 'Products' ? '/products' :
                      item === 'Applications' ? '/applications' :
                      item === 'Quality' ? '/quality' :
                      item === 'Clients' ? '/clients' : '/'
                    }
                      className="text-white/50 text-sm font-medium hover:text-[#d4af37] flex items-center gap-3 group transition-all duration-300">
                      <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#d4af37] group-hover:scale-150 transition-all" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products Col */}
            <div className="md:col-span-3">
              <h4 className="font-black text-base font-display mb-8 tracking-wide text-white uppercase">
                Our Expert Products
              </h4>
              <ul className="space-y-4">
                {[
                  { name: 'GI Earthing', href: '/products/earthing-products/gi-earthing-electrode' },
                  { name: 'Back Fill Compound', href: '/products/earthing-products/back-fill-compound' },
                  { name: 'Copper Bonded Electrode', href: '/products/earthing-products/copper-bonded-electrode' },
                  { name: 'Copper Bonded Rods', href: '/products/earthing-products/copper-bonded-rods' },
                  { name: 'Chemical Copper Electrodes', href: '/products/earthing-products/chemical-copper-electrodes' },
                  { name: 'Earthing Accessories', href: '/products/earthing-accessories' },
                  { name: 'Exothermic Welding', href: '/earthing#exothermic' }
                ].map(item => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-white/50 text-sm font-medium hover:text-[#d4af37] flex items-center gap-3 group transition-all duration-300">
                      <span className="w-1 h-1 rounded-full bg-[#d4af37]/50 group-hover:bg-[#d4af37] group-hover:scale-150 transition-all" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details Col */}
            <div className="md:col-span-4 space-y-10">

              {/* Call */}
              <div>
                <h4 className="font-black text-[11px] font-display mb-3 uppercase tracking-widest text-[#d4af37]">
                  Contact Us
                </h4>
                <div className="text-white/80 text-sm font-medium leading-relaxed flex flex-col gap-1">
                  <a 
                    href="tel:+917575057000" 
                    className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors w-max group"
                  >
                    <Phone size={14} className="text-[#d4af37] group-hover:scale-110 transition-transform" />
                    <span>+91 75750 57000</span>
                  </a>
                  <a 
                    href="https://wa.me/917575052000" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors w-max group"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-[#25D366] group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.031 2C6.446 2 1.92 6.528 1.918 12.112c-.002 1.785.464 3.528 1.35 5.063L2 22l5.021-1.317c1.488.811 3.16 1.24 4.888 1.243h.004c5.581 0 10.106-4.527 10.108-10.111C22.024 6.527 17.5 2 12.031 2zm6.177 14.544c-.27.76-1.536 1.483-2.128 1.579-.592.096-1.185.143-3.766-.889-3.298-1.321-5.385-4.707-5.55-4.928-.164-.22-1.306-1.739-1.306-3.322 0-1.583.824-2.36 1.12-2.67.297-.31.643-.388.857-.388.214 0 .429.002.61.01.192.008.448-.074.702.535.263.63.899 2.196.977 2.355.078.158.13.344.025.551-.104.208-.157.329-.311.51-.154.18-.323.402-.461.54-.15.152-.308.318-.133.617.175.3.778 1.284 1.67 2.079.95.847 1.748 1.109 2.052 1.258.304.15.483.125.666-.084.183-.21.784-.913.993-1.226.208-.313.417-.263.702-.158.286.105 1.81.853 2.122 1.01.312.156.52.233.595.362.075.13.075.753-.195 1.513z" />
                    </svg>
                    <span>+91 75750 52000</span>
                  </a>
                </div>
              </div>

              {/* Email / Web */}
              <div>
                <h4 className="font-black text-[11px] font-display mb-3 uppercase tracking-widest text-[#d4af37] flex items-center gap-2">
                  <Mail size={14} /> Email Or Visit
                </h4>
                <div className="text-white/80 text-sm font-medium leading-relaxed flex flex-col gap-1">
                  <a href="mailto:sales@saaraindia.com" className="hover:text-[#d4af37] transition-colors w-max">
                    sales@saaraindia.com
                  </a>
                  <a href="https://www.saaraindia.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors w-max">
                    www.saaraindia.com
                  </a>
                </div>
              </div>

              {/* Timings */}
              <div>
                <h4 className="font-black text-[11px] font-display mb-3 uppercase tracking-widest text-[#d4af37] flex items-center gap-2">
                  <MapPin size={14} /> Our Timing
                </h4>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  Mon - Sat <span className="text-white">10:00am - 6:00pm</span><br />
                  Sunday <span className="text-red-400">Closed</span>
                </p>
              </div>

            </div>

          </div>

          {/* Custom Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-5 relative z-20">
            <p className="text-white/30 text-xs font-medium uppercase tracking-wider">
              © {new Date().getFullYear()} SAARA Earthing. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="https://www.rangdigitech.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/30 text-xs font-medium uppercase tracking-wider hover:text-[#d4af37] transition-colors"
              >
                Design by Rang Digitech LLC
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MASSIVE WATERMARK TEXT */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none -mb-6 md:-mb-10">
        <h1 className="text-[12vw] font-black font-display text-white/[0.02] tracking-tighter leading-none whitespace-nowrap">
          SAARA EARTHING
        </h1>
      </div>
    </footer>
  );
}
