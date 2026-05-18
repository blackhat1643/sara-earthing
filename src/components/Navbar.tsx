'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const productItems = [
  {
    name: 'Earthing Products',
    href: '/products/earthing-products',
    icon: Zap,
    desc: 'Copper bonded rods & chemical electrodes',
  },
  {
    name: 'Earthing Accessories',
    href: '/products/earthing-accessories',
    icon: Shield,
    desc: 'Clamps, connectors & bus bars',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Pages that have a white/light background at the top
  const isLightPage = pathname?.startsWith('/products') || pathname?.startsWith('/applications') || pathname?.startsWith('/company') || pathname?.startsWith('/earthing') || pathname?.startsWith('/quality') || pathname?.startsWith('/contact');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/company' },
    { name: 'Earthing', href: '/earthing' },
    { name: 'Applications', href: '/applications' },
    { name: 'Quality', href: '/quality' },
    { name: 'Clients', href: '/clients' },
    { name: 'Contact', href: '/contact' },
  ];

  const linkClass = `text-sm font-semibold transition-colors duration-200 hover:text-[#d4af37] ${
    scrolled ? 'text-slate-700' : isLightPage ? 'text-slate-900' : 'text-white/80'
  }`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${scrolled ? 'glass border-b border-yellow-400/10 py-3 shadow-lg shadow-black/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center shadow-lg shadow-yellow-400/20 overflow-hidden group-hover:scale-105 transition-transform">
            <Image 
              src="/images/logo.png" 
              alt="SAARA Logo" 
              width={40} 
              height={40} 
              className="object-contain"
            />
          </div>
          <span className={`font-black text-xl tracking-[-0.05em] font-display transition-colors ${scrolled || isLightPage ? 'text-[#0a0f1d]' : 'text-white'}`}>
            SAARA <span className="text-[#d4af37] italic">EARTHING</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.name} href={l.href} className={linkClass}>
              {l.name}
            </Link>
          ))}

          {/* Products Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 hover:text-[#d4af37] ${scrolled ? 'text-slate-700' : isLightPage ? 'text-slate-900' : 'text-white/80'}`}
              onClick={() => setProductsOpen(v => !v)}
            >
              Products
              <motion.span
                animate={{ rotate: productsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={14} />
              </motion.span>
            </button>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-white/10"
                  style={{ background: 'rgba(10, 15, 29, 0.97)', backdropFilter: 'blur(24px)' }}
                >
                  {/* Arrow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-[#0a0f1d] border-l border-t border-white/10" />

                  <div className="relative p-2">
                    {productItems.map((item, i) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setProductsOpen(false)}
                        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4af37]/20 transition-colors">
                          <item.icon size={16} className="text-[#d4af37]" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-bold leading-tight group-hover:text-[#d4af37] transition-colors">
                            {item.name}
                          </p>
                          <p className="text-white/40 text-xs mt-0.5 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Footer link */}
                  <div className="border-t border-white/5 px-4 py-3">
                    <Link
                      href="/products"
                      onClick={() => setProductsOpen(false)}
                      className="flex items-center justify-between text-[#d4af37] text-xs font-black uppercase tracking-widest hover:opacity-70 transition-opacity"
                    >
                      View All Products
                      <span>→</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="#contact"
            className="bg-[#d4af37] text-black text-sm font-black px-6 py-3 rounded-full shadow-lg shadow-yellow-400/30 hover:-translate-y-1 hover:shadow-yellow-400/50 transition-all duration-300 font-display tracking-wide">
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className={`md:hidden ${scrolled || isLightPage ? 'text-slate-800' : 'text-white'}`} onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-5">
              {links.map(l => (
                <Link key={l.name} href={l.href} onClick={() => setOpen(false)}
                  className="text-lg font-bold text-slate-800 hover:text-[#d4af37] transition-colors font-display">
                  {l.name}
                </Link>
              ))}

              {/* Mobile Products accordion */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-lg font-bold text-slate-800 hover:text-[#d4af37] transition-colors font-display"
                  onClick={() => setMobileProductsOpen(v => !v)}
                >
                  Products
                  <motion.span animate={{ rotate: mobileProductsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 ml-2 flex flex-col gap-3 border-l-2 border-[#d4af37]/30 pl-4">
                        {productItems.map(item => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => { setOpen(false); setMobileProductsOpen(false); }}
                            className="flex items-center gap-3 group"
                          >
                            <item.icon size={15} className="text-[#d4af37] flex-shrink-0" />
                            <span className="text-slate-700 font-semibold text-base group-hover:text-[#d4af37] transition-colors">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/products"
                          onClick={() => { setOpen(false); setMobileProductsOpen(false); }}
                          className="text-[#d4af37] text-sm font-black uppercase tracking-widest"
                        >
                          View All →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="#contact" className="bg-[#d4af37] text-black font-black text-center py-4 rounded-full font-display"
                onClick={() => setOpen(false)}>
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
