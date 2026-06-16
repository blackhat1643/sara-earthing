'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlippingBoxBackgroundProps {
  images?: string[]; // Array of images to cycle through
  imageSrc?: string; // Backwards compatibility
  gridSize?: number; // size of each box in pixels
}

const defaultImages = [
  "/images/hero_bg.webp",
  "/images/alnd.webp",
  "/images/refinery_app.webp",
  "/images/welding.webp"
];

export default function FlippingBoxBackground({ 
  images,
  imageSrc, 
  gridSize = 60 
}: FlippingBoxBackgroundProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImages = images || (imageSrc ? [imageSrc] : defaultImages);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // 5-second interval to change images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const cols = Math.ceil(dimensions.width / gridSize);
  const rows = Math.ceil(dimensions.height / gridSize);
  const totalBoxes = cols * rows;

  if (dimensions.width === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Underlying background image for smooth transitions if gaps exist, though optional */}
      <div 
        className="absolute inset-0 z-0 opacity-10 transition-all duration-1000"
        style={{
          backgroundImage: `url(${activeImages[activeIndex % activeImages.length]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div 
        className="grid absolute inset-0 z-10 pointer-events-auto"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${gridSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${gridSize}px)`,
        }}
      >
        {Array.from({ length: totalBoxes }).map((_, i) => (
          <Box 
            key={i} 
            index={i} 
            images={activeImages} 
            activeIndex={activeIndex} 
            gridSize={gridSize} 
            cols={cols} 
          />
        ))}
      </div>
    </div>
  );
}

function Box({ 
  index, 
  images, 
  activeIndex, 
  gridSize, 
  cols 
}: { 
  index: number; 
  images: string[]; 
  activeIndex: number; 
  gridSize: number; 
  cols: number; 
}) {
  const row = Math.floor(index / cols);
  const col = index % cols;

  const [localActiveIndex, setLocalActiveIndex] = useState(activeIndex);

  // Delay based on column for a left-to-right wave effect
  const delayMs = col * 50; // 50ms per column

  // Sync localActiveIndex with global activeIndex, but delayed by the column's wave position
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLocalActiveIndex(activeIndex);
    }, delayMs);
    return () => clearTimeout(timeout);
  }, [activeIndex, delayMs]);

  const currentImage = images[localActiveIndex % images.length];

  return (
    <div className="relative w-full h-full border-[0.5px] border-[#d4af37]/20 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={localActiveIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${currentImage})`,
            backgroundSize: `${cols * gridSize}px auto`,
            backgroundPosition: `-${col * gridSize}px -${row * gridSize}px`,
          }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/50 hover:bg-[#d4af37]/20 transition-colors duration-300 z-10" />
    </div>
  );
}
