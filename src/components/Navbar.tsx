'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Applications', href: '#applications' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${scrolled ? 'glass border-b border-yellow-400/10 py-3 shadow-lg shadow-black/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center font-black text-black text-xl font-display shadow-lg shadow-yellow-400/30">
            S
          </div>
          <span className={`font-black text-xl tracking-[-0.05em] font-display transition-colors ${scrolled ? 'text-[#0a0f1d]' : 'text-white'}`}>
            SAARA <span className="text-[#d4af37] italic">EARTHING</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.name} href={l.href}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-[#d4af37] ${scrolled ? 'text-slate-700' : 'text-white/80'}`}>
              {l.name}
            </Link>
          ))}
          <Link href="#contact"
            className="bg-[#d4af37] text-black text-sm font-black px-6 py-3 rounded-full shadow-lg shadow-yellow-400/30 hover:-translate-y-1 hover:shadow-yellow-400/50 transition-all duration-300 font-display tracking-wide">
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className={`md:hidden ${scrolled ? 'text-slate-800' : 'text-white'}`} onClick={() => setOpen(!open)}>
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
              <Link href="#contact" className="bg-[#d4af37] text-black font-black text-center py-4 rounded-full font-display">
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
