'use client';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { allProducts } from '@/data/products';
import { ArrowLeft, CheckCircle2, Zap, Shield, Info, Download, Mail } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { category, slug } = params;

  const product = allProducts.find(p => p.slug === slug && p.category === category);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-4xl font-black uppercase mb-4">Product Not Found</h1>
          <button
            onClick={() => router.back()}
            className="text-[#d4af37] font-bold flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-slate-900 font-display">
      {/* Navigation Header */}
      <div className="fixed top-24 left-0 right-0 z-40 px-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-3 text-slate-400 hover:text-[#d4af37] transition-colors font-black uppercase tracking-widest text-[10px] group"
          >
            <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-[#d4af37] group-hover:bg-[#d4af37]/5 transition-all">
              <ArrowLeft size={16} />
            </div>
            Back to Category
          </button>
        </div>
      </div>

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Product Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-48"
            >
              <div className="relative aspect-square rounded-[60px] overflow-hidden border-8 border-slate-50 shadow-2xl bg-slate-50 p-12">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-[#d4af37]/5 mix-blend-multiply pointer-events-none" />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                <button className="flex items-center justify-center gap-3 py-6 bg-slate-900 text-white rounded-[30px] font-black uppercase tracking-widest text-[10px] hover:bg-[#d4af37] transition-all shadow-xl shadow-slate-900/10">
                  <Download size={18} /> Catalog
                </button>
                <button className="flex items-center justify-center gap-3 py-6 border-2 border-slate-100 text-slate-900 rounded-[30px] font-black uppercase tracking-widest text-[10px] hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all">
                  <Mail size={18} /> Inquiry
                </button>
              </div>
            </motion.div>

            {/* Product Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-16"
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[2px] bg-[#d4af37]" />
                  <span className="text-[#d4af37] text-sm font-black uppercase tracking-[0.4em]">Product Details</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-10">
                  {product.title}
                </h1>
                <p className="text-slate-500 text-xl leading-relaxed font-medium">
                  {product.desc}
                </p>
              </div>

              {/* Technical Specifications */}
              {product.specs && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <Zap className="text-[#d4af37]" size={20} />
                    <h3 className="text-xl font-black uppercase tracking-tight">Technical Specs</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[30px] border border-slate-100/50">
                        <span className="text-slate-400 text-xs font-black uppercase tracking-widest">{key}</span>
                        <span className="text-slate-900 font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features List */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <Shield className="text-[#d4af37]" size={20} />
                  <h3 className="text-xl font-black uppercase tracking-tight">Key Advantages</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-3xl border border-slate-100 group hover:border-[#d4af37]/30 transition-all">
                      <div className="w-8 h-8 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-700">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              {product.applications && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <Info className="text-[#d4af37]" size={20} />
                    <h3 className="text-xl font-black uppercase tracking-tight">Applications</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.applications.map((app, i) => (
                      <span key={i} className="px-6 py-3 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black uppercase tracking-widest rounded-full">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* High-Impact CTA Section */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[60px] overflow-hidden bg-slate-900 p-12 md:p-24 text-center">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                Ready to Secure Your <br />
                <span className="text-[#d4af37]">Infrastructure?</span>
              </h2>
              <p className="text-white/50 text-lg mb-12 font-medium">
                Get a custom quotation tailored to your project specifications. Our engineers are ready to assist with technical calculations.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/contact" className="px-12 py-6 bg-[#d4af37] text-black font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform shadow-2xl shadow-[#d4af37]/20">
                  Request a Quote
                </Link>
                <button className="px-12 py-6 border border-white/20 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white/5 transition-all">
                  Technical Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
