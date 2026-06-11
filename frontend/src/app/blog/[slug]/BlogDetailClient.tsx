'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ArrowLeft, User, Calendar, Clock, BookOpen, Share2 } from 'lucide-react';
import Footer from '@/components/Footer';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  readTime: string;
  date: string;
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
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
    "date": "May 20, 2026",
    "metaTitle": "Why Copper Grounding is Essential | SAARA Earthing",
    "metaDescription": "Learn the key benefits of solid copper earthing electrodes for industrial plants, data centers, and refineries. High conductivity vs GI."
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
    "image": "/images/VIEW/Chemical Earthing Electrode.jpg",
    "author": "Technical Team",
    "readTime": "6 min read",
    "date": "May 25, 2026",
    "metaTitle": "Galvanized Iron vs Copper Bonded Electrodes | SAARA",
    "metaDescription": "Detailed technical comparison between GI and Copper Bonded earthing electrodes. Learn about conductivity, life span, and cost difference."
  }
];

export default function BlogDetailClient({ slug }: { slug: string }) {
  const router = useRouter();

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    fetch(`${apiBase}/blogs/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: BlogPost) => {
        setBlog(data);
        setIsLoading(false);
      })
      .catch(() => {
        const localFound = FALLBACK_BLOGS.find(b => b.slug === slug);
        setBlog(localFound || null);
        setIsLoading(false);
      });
  }, [slug]);

  // Update DOM Title and Meta Description when Blog post loads
  useEffect(() => {
    if (blog) {
      // 1. Title Override
      if (blog.metaTitle) {
        document.title = blog.metaTitle;
      } else {
        document.title = `${blog.title} | SAARA Earthing Blog`;
      }

      // 2. Meta Description Override
      const metaDesc = blog.metaDescription || blog.excerpt;
      if (metaDesc) {
        const descElement = document.querySelector('meta[name="description"]');
        if (descElement) {
          descElement.setAttribute('content', metaDesc);
        } else {
          const newDescMeta = document.createElement('meta');
          newDescMeta.name = 'description';
          newDescMeta.content = metaDesc;
          document.head.appendChild(newDescMeta);
        }
      }
      
      // 3. Dynamic Canonical URL Override
      const canonicalUrl = blog.canonical || `https://www.saaraindia.com/blog/${slug}`;
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (linkElement) {
        linkElement.setAttribute('href', canonicalUrl);
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'canonical';
        newLink.href = canonicalUrl;
        document.head.appendChild(newLink);
      }
    }
  }, [blog, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060a14] flex items-center justify-center p-6 text-center text-white">
        <div>
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs font-black uppercase tracking-widest text-white/50">Loading article content...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-4xl font-black uppercase mb-4">Article Not Found</h1>
          <button
            onClick={() => router.push('/blog')}
            className="text-[#d4af37] font-bold flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} /> Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-slate-900 font-display overflow-x-clip relative">
      {/* Navigation Back Button */}
      <div className="fixed top-24 left-0 right-0 z-40 px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/blog')}
            className="flex items-center gap-3 text-slate-400 hover:text-[#d4af37] transition-colors font-black uppercase tracking-widest text-[10px] group"
          >
            <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-[#d4af37] group-hover:bg-[#d4af37]/5 transition-all">
              <ArrowLeft size={16} />
            </div>
            Back to Articles
          </button>
        </div>
      </div>

      <main className="pt-36 pb-20 px-6">
        <article className="max-w-4xl mx-auto">
          {/* Header Metadata */}
          <div className="mb-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#d4af37]" />
              <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.4em]">Earthing Journal</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight mb-8">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-2"><User size={14} className="text-[#d4af37]" /> Written by {blog.author}</span>
              <span className="text-slate-200 hidden sm:inline">•</span>
              <span className="flex items-center gap-2"><Calendar size={14} className="text-[#d4af37]" /> {blog.date}</span>
              <span className="text-slate-200 hidden sm:inline">•</span>
              <span className="flex items-center gap-2"><Clock size={14} className="text-[#d4af37]" /> {blog.readTime}</span>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="relative aspect-video w-full rounded-[45px] overflow-hidden border-8 border-slate-50 shadow-2xl bg-slate-50 mb-12">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-slate max-w-none space-y-8">
            {Array.isArray(blog.content) ? (
              blog.content.map((paragraph, index) => (
                <p key={index} className="text-slate-600 text-lg leading-relaxed font-medium">
                  {paragraph}
                </p>
              ))
            ) : (
              <div 
                className="text-slate-600 text-lg leading-relaxed font-medium whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: blog.content as unknown as string }}
              />
            )}
          </div>

          {/* Share Section footer */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-[#d4af37]" />
              <span>SAARA Earthing Technical Library</span>
            </div>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Article link copied to clipboard!');
                }
              }}
              className="flex items-center gap-2 text-slate-500 hover:text-[#d4af37] transition-colors"
            >
              <Share2 size={14} /> Share Article
            </button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
