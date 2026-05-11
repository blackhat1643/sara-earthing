'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { allProducts } from '@/data/products';

export default function HomeProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // We'll show 3 products at a time
  const [displayCount, setDisplayCount] = useState(3);
  const products = allProducts;

  useEffect(() => {
    const handleResize = () => {
      setDisplayCount(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % (products.length - (displayCount - 1)));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + (products.length - (displayCount - 1))) % (products.length - (displayCount - 1)));
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-4 relative inline-block">
              Our Products
              <div className="absolute -bottom-2 left-0 w-24 h-1 bg-[#d4af37]" />
            </h2>
            <p className="text-slate-500 italic mt-6 font-medium text-sm md:text-base">
              Saara has also operated as both supplier and consultant on numerous projects outside Indian borders.
            </p>
          </div>

          <div className="flex gap-4 mx-auto md:mx-0">
            <button 
              onClick={prev}
              className="w-12 h-12 border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-all rounded-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-all rounded-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Products Grid/Slider Area */}
        <div className="relative">
          <motion.div 
            className="flex gap-8"
            animate={{ x: `calc(-${currentIndex} * (${100 / displayCount}% + ${displayCount > 1 ? '32px / 3' : '32px'}))` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {products.map((product, i) => (
              <motion.div 
                key={i}
                style={{ 
                  width: displayCount === 1 ? '100%' : 'calc(33.333% - 21.33px)',
                  flex: '0 0 auto'
                }}
                className="relative aspect-square group cursor-pointer"
              >
                <div className="relative h-full w-full rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src={product.image} 
                    alt={product.title} 
                    fill 
                    className={`object-cover transition-all duration-700 ${product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}
                  />
                  
                  {product.hoverImage && (
                    <Image 
                      src={product.hoverImage} 
                      alt={`${product.title} hover`} 
                      fill 
                      className="object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-110"
                    />
                  )}
                  
                  {/* The White Pill Label at bottom */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] z-10">
                    <div className="bg-white py-4 px-8 rounded-full shadow-2xl flex items-center justify-center text-center">
                      <span className="font-black text-slate-900 uppercase tracking-tight text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        {product.title}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
