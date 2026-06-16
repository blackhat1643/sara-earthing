'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { BookOpen, User, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  readTime: string;
  date: string;
}

// Fallback blog posts if backend is down
const FALLBACK_BLOGS: BlogPost[] = [
  {
    "slug": "why-copper-grounding-essential",
    "title": "Why Copper Grounding Is Essential for Industrial Facilities",
    "excerpt": "Grounding systems are vital for protecting personnel and equipment. Learn why pure copper is the gold standard for industrial applications.",
    "content": [
      "Industrial plants operate with large machinery and high-voltage power networks. Under these environments, even minor faults can trigger catastrophic failures, destruction of equipment, or fatal electrical shock. To maintain operations and guarantee human safety, selecting the highest quality grounding materials is key.",
      "Pure copper provides the highest electrical conductivity of all non-precious metals. Solid copper electrodes possess extremely low resistance path, meaning fault currents are channeled safely and instantly into the deep earth before damage occurs.",
      "Moreover, solid copper does not corrode when placed in acidic soils. While galvanized iron rods degrade over several years requiring routine excavation and replacements, pure copper grounding units can survive 30+ years with zero maintenance. This makes it the most cost-effective solution for refineries, nuclear plants, and data centers."
    ],
    "image": "/images/VIEW/20-08-2025 Sara Earthing1035 f.JPG",
    "author": "Bhavik Kadia",
    "readTime": "4 min read",
    "date": "May 20, 2026"
  },
  {
    "slug": "gi-vs-copper-bonded-electrodes",
    "title": "Galvanized Iron vs. Copper Bonded Electrodes: A Technical Comparison",
    "excerpt": "Uncover the mechanical and electrical differences between cost-effective GI grounding and high-durability copper bonded electrodes.",
    "content": [
      "Choosing between Galvanized Iron (GI) and Copper Bonded earthing electrodes is a common challenge for project consultants. While price is a factor, understanding their metallurgical behavior is essential to select the correct specification.",
      "Galvanized Iron electrodes rely on a hot-dip zinc coating to resist corrosion. In normal, stable soil conditions, GI is highly cost-effective and provides standard security. However, in aggressive soils containing salts and high moisture, the zinc layer dissolves, exposing raw iron to rust.",
      "Copper Bonded electrodes utilize a molecularly bonded outer copper layer over a high-tensile steel core. The steel provides superior mechanical strength for hammer driving, while the copper layer provides 250+ micron thickness. This thick barrier guarantees UL 467 compliance and superior conductivity. For heavy-duty grid installations, copper bonded strikes the perfect balance of cost and longevity."
    ],
    "image": "/images/VIEW/Chemical Earthing Electrode.webp",
    "author": "Technical Team",
    "readTime": "6 min read",
    "date": "May 25, 2026"
  }
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    fetch(`${apiBase}/blogs`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: BlogPost[]) => {
        setBlogs(data);
        setIsLoading(false);
      })
      .catch(() => {
        setBlogs(FALLBACK_BLOGS);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-900 font-display overflow-x-clip relative">
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-slate-50/50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#d4af37]/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="absolute top-20 left-10 w-48 h-48 border border-[#d4af37]/10 rounded-full animate-pulse pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
            <div className="h-[2px] w-12 bg-[#d4af37]" />
            <span className="text-[#d4af37] text-sm font-black uppercase tracking-[0.4em]">Resource Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            Engineering <br />
            <span className="text-[#d4af37]">Insights & Guides</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl leading-relaxed font-medium">
            Stay informed with dynamic research articles, technical calculations, and installation guides curated by SAARA Earthing engineering teams.
          </p>
        </div>
      </section>

      {/* Grid of Articles */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading articles...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {blogs.map((post, idx) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative flex flex-col bg-white rounded-[3rem] p-4 border border-slate-100 hover:border-[#d4af37] transition-all duration-500 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#d4af37]/10"
                >
                  {/* Blog Image Container */}
                  <div className="relative h-60 rounded-[2.5rem] overflow-hidden mb-6 bg-slate-50">
                    <img 
                      src={getImageUrl(post.image)} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                  </div>

                  {/* Metadata labels */}
                  <div className="flex flex-wrap items-center gap-4 px-3 mb-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5"><User size={12} className="text-[#d4af37]" /> {post.author}</span>
                    <span className="text-slate-200">•</span>
                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#d4af37]" /> {post.date}</span>
                    <span className="text-slate-200">•</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#d4af37]" /> {post.readTime}</span>
                  </div>

                  {/* Body Content */}
                  <div className="px-3 pb-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight group-hover:text-[#d4af37] transition-colors leading-snug mb-3">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                        {post.excerpt}
                      </p>
                    </div>

                    <Link 
                      href={`/blog/${post.slug}`}
                      className="group/btn flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-[#d4af37] hover:text-black transition-all transform active:scale-95 shadow-lg shadow-slate-900/10 hover:shadow-[#d4af37]/20"
                    >
                      Read Full Article <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
