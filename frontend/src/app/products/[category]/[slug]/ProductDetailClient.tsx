'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { allProducts, Product } from '@/data/products';
import { ArrowLeft, CheckCircle2, Zap, Download, Mail } from 'lucide-react';
import Footer from '@/components/Footer';
import { getImageUrl } from '@/utils/imageUrl';

export default function ProductDetailClient({ category, slug }: { category: string, slug: string }) {
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const normalizeProduct = (p: any) => {
      if (!p) return null;
      const cloned = { ...p };
      if (typeof cloned.features === 'string') cloned.features = cloned.features.split(',').map((s: string) => s.trim()).filter(Boolean);
      if (typeof cloned.applications === 'string') cloned.applications = cloned.applications.split(',').map((s: string) => s.trim()).filter(Boolean);
      if (typeof cloned.longDesc === 'string') cloned.longDesc = cloned.longDesc.split('\n').filter(Boolean);
      if (typeof cloned.highlights === 'string') { try { cloned.highlights = JSON.parse(cloned.highlights); } catch(e) { cloned.highlights = []; } }
      if (typeof cloned.specs === 'string') { try { cloned.specs = JSON.parse(cloned.specs); } catch(e) { cloned.specs = {}; } }
      if (typeof cloned.detailedTabs === 'string') { try { cloned.detailedTabs = JSON.parse(cloned.detailedTabs); } catch(e) { cloned.detailedTabs = {}; } }
      if (cloned.detailedTabs && typeof cloned.detailedTabs.features?.list === 'string') {
        cloned.detailedTabs.features.list = cloned.detailedTabs.features.list.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
      return cloned;
    };

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    fetch(`${apiBase}/products`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: any[]) => {
        const found = data.find(p => p.slug === slug && p.category === category);
        if (found) {
          setProduct(normalizeProduct(found));
        } else {
          const localFound = allProducts.find(p => p.slug === slug && p.category === category);
          setProduct(normalizeProduct(localFound || null));
        }
        setIsLoading(false);
      })
      .catch(() => {
        const localFound = allProducts.find(p => p.slug === slug && p.category === category);
        setProduct(normalizeProduct(localFound || null));
        setIsLoading(false);
      });
  }, [category, slug]);

  // Update browser document SEO head on product load
  useEffect(() => {
    if (product) {
      // 1. Dynamic Title
      if (product.metaTitle) {
        document.title = product.metaTitle;
      } else {
        document.title = `${product.title} | SAARA Earthing`;
      }
      
      // 2. Dynamic Description Meta
      const metaDesc = product.metaDescription || product.desc;
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
      
      // 3. Dynamic Canonical URL
      const canonicalUrl = product.canonical || `https://www.saaraindia.com/products/${category}/${slug}`;
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
  }, [product, category, slug]);

  // Setup tabs dynamically based on available data
  const tabs = [
    ...(product?.detailedTabs?.features || (product?.features && product.features.length) ? [{ id: 'features', label: 'Features' }] : []),
    ...(product?.detailedTabs?.advantages && product.detailedTabs.advantages.length > 0 ? [{ id: 'advantages', label: 'Key Advantages' }] : []),
    ...(product?.detailedTabs?.specTable && (product.detailedTabs.specTable.headers?.length > 0 || product.detailedTabs.specTable.rows?.length > 0) || product?.specs ? [{ id: 'specs', label: 'Specifications' }] : []),
    ...(product?.applications?.length ? [{ id: 'applications', label: 'Applications' }] : []),
  ];

  const [activeTab, setActiveTab] = useState('features');

  // Adjust active tab when product loads
  useEffect(() => {
    if (product) {
      const availableTabs = [
        ...(product.detailedTabs?.features || (product.features && product.features.length) ? ['features'] : []),
        ...(product.detailedTabs?.advantages && product.detailedTabs.advantages.length > 0 ? ['advantages'] : []),
        ...(product.detailedTabs?.specTable && (product.detailedTabs.specTable.headers?.length > 0 || product.detailedTabs.specTable.rows?.length > 0) || product.specs ? ['specs'] : []),
        ...(product.applications?.length ? ['applications'] : []),
      ];
      if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
        setActiveTab(availableTabs[0]);
      }
    }
  }, [product, activeTab]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060a14] flex items-center justify-center p-6 text-center text-white">
        <div>
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs font-black uppercase tracking-widest text-white/50">Loading product specs...</p>
        </div>
      </div>
    );
  }

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

  // Get human readable breadcrumb category
  const getCategoryLabel = (cat: string) => {
    if (cat === 'earthing-products') return 'Earthing Products';
    if (cat === 'earthing-accessories') return 'Earthing Accessories';
    return cat.replace('-', ' ');
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 font-display overflow-x-clip relative">
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
            Back to {getCategoryLabel(category)}
          </button>
        </div>
      </div>

      <main className="pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
            {/* Product Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-48"
            >
              <div className="relative aspect-square rounded-[60px] overflow-hidden border-8 border-slate-50 shadow-2xl bg-slate-50 hover:border-[#d4af37]/10 transition-colors duration-500 group">
                <img
                  src={getImageUrl(product.image)}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#d4af37]/5 mix-blend-multiply pointer-events-none" />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                <a 
                  href="/images/catalogue.pdf" 
                  download="catalogue.pdf" 
                  className="flex items-center justify-center gap-3 py-6 bg-slate-900 text-white rounded-[30px] font-black uppercase tracking-widest text-[10px] hover:bg-[#d4af37] hover:text-black transition-all shadow-xl shadow-slate-900/10 text-center"
                >
                  <Download size={18} /> Catalog
                </a>
                <Link 
                  href={`/quote?product=${encodeURIComponent(product.title)}`} 
                  className="flex items-center justify-center gap-3 py-6 border-2 border-slate-100 text-slate-900 rounded-[30px] font-black uppercase tracking-widest text-[10px] hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all text-center"
                >
                  <Mail size={18} /> Inquiry
                </Link>
              </div>
            </motion.div>

            {/* Product Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[2px] bg-[#d4af37]" />
                  <span className="text-[#d4af37] text-sm font-black uppercase tracking-[0.4em]">{getCategoryLabel(category)}</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] mb-8">
                  {product.title}
                </h1>
                
                {/* Long detailed description paragraphs */}
                <div className="space-y-6">
                  {product.longDesc && product.longDesc.length > 0 ? (
                    (Array.isArray(product.longDesc) ? product.longDesc : typeof product.longDesc === 'string' ? (product.longDesc as string).split('\n').filter(Boolean) : []).map((pText, i) => (
                      <p key={i} className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
                        {pText}
                      </p>
                    ))
                  ) : (
                    <p className="text-slate-500 text-lg leading-relaxed font-medium">
                      {product.desc}
                    </p>
                  )}
                </div>
              </div>

              {/* Dynamic Highlights / Value Propositions */}
              {product.highlights && product.highlights.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                  {product.highlights.map((hl: any, i: number) => (
                    <div 
                      key={i} 
                      className="p-6 bg-slate-50 border border-slate-100 rounded-[30px] hover:border-[#d4af37]/30 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300"
                    >
                      <h4 className="font-black text-[#d4af37] text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Zap size={14} /> {hl.title}
                      </h4>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                        {hl.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Technical Deep Dive & Interactive Tabs */}
          {tabs.length > 0 && (
            <section className="pt-16 border-t border-slate-100">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.4em] mb-3 block">Technical Deep-Dive</span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Specifications & Features</h2>
              </div>

              {/* Tab Navigation Controls */}
              <div className="flex justify-center mb-12">
                <div className="inline-flex bg-slate-50 p-2 rounded-2xl border border-slate-100 max-w-full overflow-x-auto gap-2 no-scrollbar">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-6 py-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        activeTab === tab.id ? 'text-black' : 'text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute inset-0 bg-[#d4af37] rounded-xl z-0"
                          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content Display */}
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-3xl p-8 md:p-12 min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Features Tab */}
                    {activeTab === 'features' && (
                      <div className="space-y-8">
                        {product.detailedTabs?.features?.desc && (
                          <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
                            {product.detailedTabs.features.desc}
                          </p>
                        )}
                        <div className="grid md:grid-cols-2 gap-4">
                          {(product.detailedTabs?.features?.list || product.features || []).map((feat, i) => (
                            <div key={i} className="flex items-center gap-4 p-5 rounded-3xl border border-slate-100 group hover:border-[#d4af37]/30 transition-all">
                              <div className="w-8 h-8 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                                <CheckCircle2 size={16} />
                              </div>
                              <span className="text-xs font-black uppercase tracking-widest text-slate-700">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Advantages Tab */}
                    {activeTab === 'advantages' && product.detailedTabs?.advantages && (
                      <div className="grid md:grid-cols-2 gap-8">
                        {product.detailedTabs.advantages.map((adv, i) => (
                          <div key={i} className="flex gap-5 p-6 bg-slate-50 rounded-[30px] border border-slate-100/50 hover:border-[#d4af37]/20 transition-all duration-300">
                            <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] flex-shrink-0">
                              <CheckCircle2 size={20} />
                            </div>
                            <div>
                              <h4 className="font-black text-slate-900 uppercase text-xs tracking-wider mb-2">{adv.title}</h4>
                              <p className="text-slate-500 text-sm leading-relaxed font-medium">{adv.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Specifications Tab */}
                    {activeTab === 'specs' && (
                      <div className="space-y-6">
                        {product.detailedTabs?.specTable ? (
                          <div className="overflow-x-auto rounded-[30px] border border-slate-100 shadow-xl max-w-full">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                              <thead>
                                <tr className="bg-slate-900 text-white">
                                  {product.detailedTabs.specTable.headers.map((h, idx) => (
                                    <th key={idx} className="p-6 text-[10px] font-black uppercase tracking-wider text-center border-r border-slate-800 last:border-0">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {product.detailedTabs.specTable.rows.map((row, rIdx) => (
                                  <tr 
                                    key={rIdx} 
                                    className={`border-b border-slate-100 transition-colors hover:bg-slate-50/80 ${
                                      rIdx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                                    }`}
                                  >
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="p-6 text-xs font-black uppercase tracking-wider text-slate-700 text-center border-r border-slate-100 last:border-0">
                                        {cell === 'Yes' ? (
                                          <div className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                                            <CheckCircle2 size={14} />
                                          </div>
                                        ) : (
                                          cell
                                        )}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : product.specs ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(product.specs).map(([key, val], i) => (
                              <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[30px] border border-slate-100/50">
                                <span className="text-slate-400 text-xs font-black uppercase tracking-widest">{key}</span>
                                <span className="text-slate-900 font-bold">{val}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-500 text-center">No specification data available.</p>
                        )}
                      </div>
                    )}

                    {/* Applications Tab */}
                    {activeTab === 'applications' && product.applications && (
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {product.applications.map((app, i) => (
                          <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center gap-4 hover:border-[#d4af37]/30 transition-all duration-300">
                            <div className="w-8 h-8 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] flex-shrink-0">
                              <Zap size={16} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-700 leading-normal">{app}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* High-Impact CTA Section */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[60px] overflow-hidden bg-slate-900 p-12 md:p-24 text-center">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                Ready to Secure Your <br />
                <span className="text-[#d4af37]">Infrastructure?</span>
              </h2>
              <p className="text-white/50 text-lg mb-12 font-medium">
                Get a custom quotation tailored to your project specifications. Our engineers are ready to assist with technical calculations.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/quote" className="px-12 py-6 bg-[#d4af37] text-black font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform shadow-2xl shadow-[#d4af37]/20">
                  Request a Quote
                </Link>
                <Link href="/contact" className="px-12 py-6 border border-white/20 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white/5 transition-all text-center">
                  Technical Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
