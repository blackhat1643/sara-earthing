'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  Clock, 
  Archive, 
  FileText, 
  Calculator, 
  X, 
  PlusCircle, 
  MinusCircle, 
  DollarSign, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Info,
  Settings,
  ChevronDown,
  BookOpen
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  slug: string;
  category: string;
  title: string;
  desc: string;
  image: string;
  hoverImage?: string;
  features: string[];
  specs?: Record<string, string>;
  applications?: string[];
  longDesc?: string[];
  highlights?: Array<{ title: string; desc: string }>;
  detailedTabs?: {
    features?: { desc: string; list: string[] };
    advantages?: Array<{ title: string; desc: string }>;
    specTable?: {
      headers: string[];
      rows: string[][];
    };
  };
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
}

interface Submission {
  id: string;
  type: 'contact' | 'quote';
  data: any;
  status: 'new' | 'read' | 'archived';
  createdAt: string;
}

interface Blog {
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

export default function AdminPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

  // Auth state
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Tab State: 'dashboard' | 'products' | 'submissions' | 'seo' | 'blogs'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'submissions' | 'seo' | 'blogs'>('dashboard');

  // Product Modal editing tab state
  const [modalActiveTab, setModalActiveTab] = useState<'general' | 'specs' | 'details' | 'tabs'>('general');
  const [blogModalActiveTab, setBlogModalActiveTab] = useState<'general' | 'content'>('general');

  // Loaded Data
  const [products, setProducts] = useState<Product[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pageMetadata, setPageMetadata] = useState<Record<string, { title: string; description: string; canonical?: string }>>({});
  const [isSavingMetadata, setIsSavingMetadata] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Blogs filters & actions
  const [blogSearch, setBlogSearch] = useState('');
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isNewBlog, setIsNewBlog] = useState(false);

  // Products filters & actions
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Submissions filters & actions
  const [submissionSearch, setSubmissionSearch] = useState('');
  const [submissionTypeFilter, setSubmissionTypeFilter] = useState<'all' | 'contact' | 'quote'>('all');
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Load password from local storage on mount
  useEffect(() => {
    const savedPassword = localStorage.getItem('sara_admin_token');
    if (savedPassword) {
      verifyPasswordDirect(savedPassword);
    }
  }, []);

  const verifyPasswordDirect = async (pass: string) => {
    setIsValidating(true);
    try {
      // Test fetching submissions with the password
      const res = await fetch(`${apiBase}/submissions`, {
        headers: { 'x-admin-password': pass }
      });
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('sara_admin_token', pass);
        setPassword(pass);
        fetchData(pass);
      } else {
        localStorage.removeItem('sara_admin_token');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsValidating(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsValidating(true);
    
    try {
      const res = await fetch(`${apiBase}/submissions`, {
        headers: { 'x-admin-password': password }
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('sara_admin_token', password);
        fetchData(password);
      } else {
        setAuthError('Invalid administrator password.');
      }
    } catch (err) {
      setAuthError('Connection error. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    localStorage.removeItem('sara_admin_token');
  };

  const fetchData = async (pass = password) => {
    setIsLoadingData(true);
    try {
      // Fetch Products
      const prodRes = await fetch(`${apiBase}/products`);
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }

      // Fetch Submissions
      const subRes = await fetch(`${apiBase}/submissions`, {
        headers: { 'x-admin-password': pass }
      });
      if (subRes.ok) {
        const subData = await subRes.json();
        setSubmissions(subData);
      }

      // Fetch SEO page metadata
      const metaRes = await fetch(`${apiBase}/metadata`);
      if (metaRes.ok) {
        const metaData = await metaRes.json();
        setPageMetadata(metaData);
      }

      // Fetch Blogs
      const blogsRes = await fetch(`${apiBase}/blogs`);
      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
        setBlogs(blogsData);
      }
    } catch (e) {
      console.error('Error fetching dashboard data:', e);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSaveMetadata = async () => {
    setIsSavingMetadata(true);
    try {
      const res = await fetch(`${apiBase}/metadata`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify(pageMetadata)
      });
      if (res.ok) {
        alert('Page SEO metadata saved successfully!');
        fetchData();
      } else {
        alert('Failed to save SEO metadata.');
      }
    } catch (e) {
      console.error(e);
      alert('Error connecting to the server.');
    } finally {
      setIsSavingMetadata(false);
    }
  };

  // Blog CRUD actions
  const handleSaveBlog = async (blogData: Blog) => {
    const method = isNewBlog ? 'POST' : 'PUT';
    const url = isNewBlog ? `${apiBase}/blogs` : `${apiBase}/blogs/${editingBlog?.slug}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify(blogData)
      });

      if (res.ok) {
        setIsBlogModalOpen(false);
        setEditingBlog(null);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save blog details.');
      }
    } catch (e) {
      console.error(e);
      alert('Error connecting to the server.');
    }
  };

  const handleDeleteBlog = async (slug: string) => {
    if (!confirm('Delete this blog post? This will update the public website instantly.')) return;
    try {
      const res = await fetch(`${apiBase}/blogs/${slug}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password }
      });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete blog.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openEditBlog = (blog: Blog) => {
    setIsNewBlog(false);
    setBlogModalActiveTab('general');
    
    const cloned = JSON.parse(JSON.stringify(blog));
    
    // Safety coercion: Convert stringified content back to array
    if (typeof cloned.content === 'string') {
      try {
        const parsed = JSON.parse(cloned.content);
        if (Array.isArray(parsed)) cloned.content = parsed;
        else cloned.content = (cloned.content as string).split('\n').filter(Boolean);
      } catch (e) {
        cloned.content = (cloned.content as string).split('\n').filter(Boolean);
      }
    }
    if (!Array.isArray(cloned.content)) cloned.content = [];

    setEditingBlog(cloned);
    setIsBlogModalOpen(true);
  };

  const openAddBlog = () => {
    setIsNewBlog(true);
    setBlogModalActiveTab('general');
    setEditingBlog({
      slug: '',
      title: '',
      excerpt: '',
      content: [],
      image: '/images/VIEW/20-08-2025 Sara Earthing1035 f.JPG',
      author: 'Technical Team',
      readTime: '5 min read',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    setIsBlogModalOpen(true);
  };

  // Submission actions
  const handleUpdateSubmissionStatus = async (id: string, newStatus: 'new' | 'read' | 'archived') => {
    try {
      const res = await fetch(`${apiBase}/submissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
        if (selectedSubmission && selectedSubmission.id === id) {
          setSelectedSubmission(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission? This action cannot be undone.')) return;
    try {
      const res = await fetch(`${apiBase}/submissions/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password }
      });
      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
        setSelectedSubmission(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Product CRUD actions
  const handleSaveProduct = async (productData: Product) => {
    const method = isNewProduct ? 'POST' : 'PUT';
    const url = isNewProduct ? `${apiBase}/products` : `${apiBase}/products/${editingProduct?.slug}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        setIsProductModalOpen(false);
        setEditingProduct(null);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save product details.');
      }
    } catch (e) {
      console.error(e);
      alert('Error connecting to the server.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, isBlog: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${apiBase}/upload`, {
        method: 'POST',
        headers: {
          'x-admin-password': password
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        if (isBlog) {
          setEditingBlog(prev => prev ? { ...prev, [fieldName]: data.filePath } : prev);
        } else {
          setEditingProduct(prev => prev ? { ...prev, [fieldName]: data.filePath } : prev);
        }
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to upload image.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to upload server.');
    }
  };

  const handleDeleteProduct = async (slug: string) => {
    if (!confirm('Delete this product listing? This will update the public website instantly.')) return;
    try {
      const res = await fetch(`${apiBase}/products/${slug}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password }
      });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete product.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Open Edit Product Modal
  const openEditProduct = (prod: Product) => {
    setIsNewProduct(false);
    setModalActiveTab('general');
    
    // Deep clone product to avoid mutation before save
    const cloned = JSON.parse(JSON.stringify(prod));
    
    // Safety coercions: Convert stringified arrays back to real arrays so the admin form doesn't crash on .map
    if (typeof cloned.features === 'string') cloned.features = (cloned.features as string).split(',').map((s: string) => s.trim()).filter(Boolean);
    if (!Array.isArray(cloned.features)) cloned.features = [];
    
    if (typeof cloned.applications === 'string') cloned.applications = (cloned.applications as string).split(',').map((s: string) => s.trim()).filter(Boolean);
    if (!Array.isArray(cloned.applications)) cloned.applications = [];
    
    if (typeof cloned.longDesc === 'string') cloned.longDesc = (cloned.longDesc as string).split('\n').filter(Boolean);
    if (!Array.isArray(cloned.longDesc)) cloned.longDesc = [];
    
    if (typeof cloned.highlights === 'string') {
      try { cloned.highlights = JSON.parse(cloned.highlights); } catch(e) { cloned.highlights = []; }
    }
    if (!Array.isArray(cloned.highlights)) cloned.highlights = [];
    
    if (typeof cloned.specs === 'string') {
      try { cloned.specs = JSON.parse(cloned.specs); } catch(e) { cloned.specs = {}; }
    }

    if (typeof cloned.detailedTabs === 'string') {
      try { cloned.detailedTabs = JSON.parse(cloned.detailedTabs); } catch(e) { cloned.detailedTabs = null; }
    }

    if (!cloned.detailedTabs) {
      cloned.detailedTabs = { features: { desc: '', list: [] }, advantages: [], specTable: { headers: [], rows: [] } };
    } else {
      if (typeof cloned.detailedTabs.features?.list === 'string') cloned.detailedTabs.features.list = (cloned.detailedTabs.features.list as string).split(',').map((s: string) => s.trim()).filter(Boolean);
      if (!cloned.detailedTabs.features) cloned.detailedTabs.features = { desc: '', list: [] };
      if (!Array.isArray(cloned.detailedTabs.features.list)) cloned.detailedTabs.features.list = [];
      if (!Array.isArray(cloned.detailedTabs.advantages)) cloned.detailedTabs.advantages = [];
      if (!cloned.detailedTabs.specTable) cloned.detailedTabs.specTable = { headers: [], rows: [] };
      if (!Array.isArray(cloned.detailedTabs.specTable.headers)) cloned.detailedTabs.specTable.headers = [];
      if (!Array.isArray(cloned.detailedTabs.specTable.rows)) cloned.detailedTabs.specTable.rows = [];
    }

    setEditingProduct(cloned);
    setIsProductModalOpen(true);
  };

  const openAddProduct = () => {
    setIsNewProduct(true);
    setModalActiveTab('general');
    setEditingProduct({
      slug: '',
      category: 'earthing-products',
      title: '',
      desc: '',
      image: '/images/VIEW/GI Earthing Electrode.JPG',
      features: [],
      specs: {},
      applications: [],
      longDesc: [],
      highlights: [],
      detailedTabs: {
        features: { desc: '', list: [] },
        advantages: [],
        specTable: { headers: [], rows: [] }
      }
    });
    setIsProductModalOpen(true);
  };

  // Render Login
  if (!isAuthenticated) {
    return (
      <div className="bg-[#060a14] min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        {/* Futuristic grids */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(212, 175, 55, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 175, 55, 0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full filter blur-[120px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-8 md:p-10 shadow-2xl relative z-10 text-center"
        >
          <div className="w-16 h-16 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="text-[#d4af37]" size={28} />
          </div>
          
          <h1 className="text-2xl font-black uppercase text-white tracking-tight mb-2">SAARA Earthing</h1>
          <p className="text-white/40 text-xs font-semibold tracking-wider uppercase mb-8">System Administration</p>

          {authError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl text-left">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col gap-2 text-left relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#d4af37]">Enter Admin Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl text-sm font-bold text-white bg-white/5 border border-white/10 outline-none focus:border-[#d4af37] focus:bg-white/10 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isValidating}
              className="w-full bg-[#d4af37] text-black font-black uppercase py-4 rounded-xl text-xs tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-yellow-500/10 disabled:opacity-50"
            >
              {isValidating ? 'Verifying...' : 'Authorize Login'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard calculation helpers
  const totalQuoteEstimates = submissions
    .filter(s => s.type === 'quote' && s.data.estimatedPrice)
    .reduce((sum, s) => sum + Number(s.data.estimatedPrice), 0);
  const totalQuotes = submissions.filter(s => s.type === 'quote').length;
  const avgQuote = totalQuotes ? Math.round(totalQuoteEstimates / totalQuotes) : 0;
  const newSubmissionsCount = submissions.filter(s => s.status === 'new').length;

  return (
    <div className="bg-[#060a14] min-h-screen text-white font-display flex flex-col md:flex-row relative">
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 border-r border-white/5 bg-[#080d19]/80 backdrop-blur-xl flex flex-col justify-between shrink-0 relative z-30">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <div className="relative w-8 h-8 bg-white rounded-lg p-0.5 flex items-center justify-center">
              <Image src="/images/logo.png" alt="SAARA Logo" width={24} height={24} className="object-contain" />
            </div>
            <div>
              <p className="font-black text-sm tracking-tight text-white leading-none">SAARA <span className="text-[#d4af37]">ADMIN</span></p>
              <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mt-1">Control Center</p>
            </div>
          </div>

          {/* Nav menu links */}
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'products', label: 'Manage Products', icon: Briefcase },
              { id: 'submissions', label: 'Inquiries & Quotes', icon: MessageSquare, badge: newSubmissionsCount },
              { id: 'seo', label: 'SEO Settings', icon: Settings },
              { id: 'blogs', label: 'Manage Blogs', icon: BookOpen },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-[#d4af37] text-black shadow-lg shadow-yellow-500/10' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black leading-none ${activeTab === item.id ? 'bg-black text-white' : 'bg-[#d4af37] text-black'}`}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-white/5 space-y-4">
          <div className="px-4 py-3 bg-white/5 rounded-xl text-[10px] text-white/50 space-y-1 font-bold">
            <p>Database: File-Based JSON</p>
            <p>Environment: Local Server</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 text-white/60 hover:text-red-400 text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main viewport */}
      <main className="flex-1 min-h-screen overflow-y-auto px-6 py-8 md:px-12 md:py-10 relative z-20">
        
        {/* Dynamic Section Render */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-10"
            >
              {/* Header */}
              <div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Overview Dashboard</h2>
                <p className="text-white/40 text-sm mt-1">Real-time statistics and inquiries monitoring.</p>
              </div>

              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Total Products', value: products.length, desc: `${products.filter(p => p.category === 'earthing-products').length} Electrodes, ${products.filter(p => p.category === 'earthing-accessories').length} Accessories`, icon: Briefcase, color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
                  { title: 'Inquiries Received', value: submissions.length, desc: `${newSubmissionsCount} new unread requests`, icon: MessageSquare, color: 'text-[#d4af37] bg-[#d4af37]/10 border-[#d4af37]/20' },
                  { title: 'Grounding Calculations', value: totalQuotes, desc: `Estimations calculated by users`, icon: Calculator, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
                  { title: 'Avg Estimated Value', value: `₹${avgQuote.toLocaleString('en-IN')}`, desc: `Based on active calculator entries`, icon: DollarSign, color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[160px] shadow-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{stat.title}</span>
                        <p className="text-3xl font-black mt-2">{stat.value}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stat.color.split(' ')[1]} ${stat.color.split(' ')[2]} ${stat.color.split(' ')[0]}`}>
                        <stat.icon size={18} />
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-white/40 tracking-wide mt-4 uppercase leading-none">{stat.desc}</p>
                  </div>
                ))}
              </div>

              {/* Submissions Split + Recent Inquiries */}
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Recent Submissions Feed */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[35px] p-6 md:p-8 space-y-6 shadow-xl">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black uppercase tracking-tight">Recent Inquiries</h3>
                    <button 
                      onClick={() => setActiveTab('submissions')}
                      className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] hover:underline"
                    >
                      View All Submissions
                    </button>
                  </div>

                  <div className="divide-y divide-white/5">
                    {submissions.slice(0, 5).length === 0 ? (
                      <p className="text-white/40 text-center py-10 font-bold text-sm">No submissions received yet.</p>
                    ) : (
                      submissions.slice(0, 5).map((sub) => (
                        <div key={sub.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between group">
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${sub.type === 'quote' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#d4af37]/10 text-[#d4af37]'}`}>
                              {sub.type === 'quote' ? <Calculator size={18} /> : <FileText size={18} />}
                            </div>
                            <div>
                              <p className="font-black text-sm uppercase text-white tracking-wide">{sub.data.name || 'Anonymous'}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-bold text-white/40 uppercase">{sub.data.company || 'Private User'}</span>
                                <span className="text-white/20">•</span>
                                <span className="text-[10px] font-bold text-white/30">{new Date(sub.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border ${
                              sub.status === 'new' 
                                ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20 animate-pulse' 
                                : sub.status === 'read' 
                                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                                  : 'bg-white/5 text-white/40 border-white/10'
                            }`}>
                              {sub.status}
                            </span>
                            <button
                              onClick={() => { setSelectedSubmission(sub); setActiveTab('submissions'); }}
                              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                              <ExternalLink size={12} className="text-white/60" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Submissions By Category Chart Widget */}
                <div className="bg-white/5 border border-white/10 rounded-[35px] p-6 md:p-8 flex flex-col justify-between shadow-xl">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-6">Service Distribution</h3>
                    
                    <div className="space-y-4">
                      {['Earthing Products', 'Earthing Accessories', 'Exothermic Welding', 'Lightning Protection', 'Quote Calculator'].map((service, idx) => {
                        const count = service === 'Quote Calculator' 
                          ? submissions.filter(s => s.type === 'quote').length
                          : submissions.filter(s => s.type === 'contact' && s.data.service === service).length;
                        const percentage = submissions.length ? Math.round((count / submissions.length) * 100) : 0;
                        const colors = ['bg-[#d4af37]', 'bg-blue-400', 'bg-emerald-400', 'bg-purple-400', 'bg-red-400'];
                        
                        return (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                              <span>{service}</span>
                              <span className="text-white">{count} ({percentage}%)</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${colors[idx]}`} style={{ width: `${percentage}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex justify-between text-[10px] font-bold text-white/40 uppercase">
                    <span>Active submissions: {submissions.length}</span>
                    <span className="text-[#d4af37]">Updated Just Now</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: PRODUCTS MANAGER */}
          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Products Catalog</h2>
                  <p className="text-white/40 text-sm mt-1">Add, update, or remove customer-facing products instantly.</p>
                </div>
                <button
                  onClick={openAddProduct}
                  className="bg-[#d4af37] text-black font-black uppercase text-xs tracking-wider px-6 py-4 rounded-xl flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-yellow-500/10"
                >
                  <Plus size={16} /> Add Product
                </button>
              </div>

              {/* Filters Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search products by title or description..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-12 pr-6 py-3.5 rounded-xl text-xs font-bold text-white bg-white/5 border border-white/5 outline-none focus:border-[#d4af37] focus:bg-white/10 transition-all"
                  />
                </div>
                {/* Category Filter */}
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#080d19] border border-white/10 outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="earthing-products">Earthing Products</option>
                  <option value="earthing-accessories">Earthing Accessories</option>
                </select>
              </div>

              {/* Products Table/Grid */}
              <div className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden shadow-xl">
                <div className="overflow-x-auto max-w-full">
                  <table className="w-full border-collapse text-left min-w-[800px]">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest">
                        <th className="p-6">Thumbnail</th>
                        <th className="p-6">Product Title</th>
                        <th className="p-6">Category</th>
                        <th className="p-6">Slug</th>
                        <th className="p-6">Features count</th>
                        <th className="p-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products
                        .filter(p => {
                          const matchesCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
                          const matchesSearch = p.title.toLowerCase().includes(productSearch.toLowerCase()) || 
                                                p.desc.toLowerCase().includes(productSearch.toLowerCase()) ||
                                                p.slug.toLowerCase().includes(productSearch.toLowerCase());
                          return matchesCat && matchesSearch;
                        })
                        .map((prod) => (
                          <tr key={prod.slug} className="hover:bg-white/5 transition-colors group">
                            <td className="p-6">
                              <div className="w-14 h-14 relative bg-white border border-white/10 rounded-2xl p-2 flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                                <Image src={prod.image} alt={prod.title} width={40} height={40} className="object-contain" />
                              </div>
                            </td>
                            <td className="p-6">
                              <p className="font-black text-sm uppercase text-white tracking-wide">{prod.title}</p>
                              <p className="text-[10px] font-bold text-white/40 line-clamp-1 max-w-sm mt-1">{prod.desc}</p>
                            </td>
                            <td className="p-6">
                              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                {prod.category.replace('-', ' ')}
                              </span>
                            </td>
                            <td className="p-6 text-xs text-white/50 font-bold">{prod.slug}</td>
                            <td className="p-6 text-xs font-black text-[#d4af37]">{prod.features?.length || 0} features</td>
                            <td className="p-6 text-right">
                              <div className="flex items-center justify-end gap-3">
                                <button
                                  onClick={() => openEditProduct(prod)}
                                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#d4af37]/20 border border-white/5 hover:border-[#d4af37]/30 text-white/60 hover:text-[#d4af37] flex items-center justify-center transition-all cursor-pointer"
                                  title="Edit Product"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(prod.slug)}
                                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/5 hover:border-red-500/30 text-white/60 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer"
                                  title="Delete Product"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SUBMISSIONS MANAGER */}
          {activeTab === 'submissions' && (
            <motion.div
              key="submissions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Header */}
              <div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Client Inquiries & Quotes</h2>
                <p className="text-white/40 text-sm mt-1">Review contact requests and specifications generated by visitors.</p>
              </div>

              {/* Filters & Options Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search submissions by sender name, company, email..."
                    value={submissionSearch}
                    onChange={(e) => setSubmissionSearch(e.target.value)}
                    className="w-full pl-12 pr-6 py-3.5 rounded-xl text-xs font-bold text-white bg-white/5 border border-white/5 outline-none focus:border-[#d4af37] focus:bg-white/10 transition-all"
                  />
                </div>
                
                {/* Type Filter */}
                <select
                  value={submissionTypeFilter}
                  onChange={(e) => setSubmissionTypeFilter(e.target.value as any)}
                  className="px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#080d19] border border-white/10 outline-none"
                >
                  <option value="all">All Inquiries</option>
                  <option value="contact">Contact Messages</option>
                  <option value="quote">Quote Calculator Requests</option>
                </select>

                {/* Status Filter */}
                <select
                  value={submissionStatusFilter}
                  onChange={(e) => setSubmissionStatusFilter(e.target.value as any)}
                  className="px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#080d19] border border-white/10 outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New / Unread</option>
                  <option value="read">Read / Reviewed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Split layout (List + Inspection detail) */}
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Submissions List */}
                <div className={`bg-white/5 border border-white/10 rounded-[35px] overflow-hidden shadow-xl ${selectedSubmission ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
                  <div className="overflow-x-auto max-w-full">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest">
                          <th className="p-6">Type</th>
                          <th className="p-6">Sender Details</th>
                          <th className="p-6">Service/Systems</th>
                          <th className="p-6">Date</th>
                          <th className="p-6">Status</th>
                          <th className="p-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {submissions
                          .filter(s => {
                            const matchesType = submissionTypeFilter === 'all' || s.type === submissionTypeFilter;
                            const matchesStatus = submissionStatusFilter === 'all' || s.status === submissionStatusFilter;
                            const name = s.data.name || '';
                            const email = s.data.email || '';
                            const company = s.data.company || '';
                            const matchesSearch = name.toLowerCase().includes(submissionSearch.toLowerCase()) || 
                                                  email.toLowerCase().includes(submissionSearch.toLowerCase()) ||
                                                  company.toLowerCase().includes(submissionSearch.toLowerCase());
                            return matchesType && matchesStatus && matchesSearch;
                          })
                          .map((sub) => (
                            <tr 
                              key={sub.id} 
                              onClick={() => setSelectedSubmission(sub)}
                              className={`hover:bg-white/5 cursor-pointer transition-colors ${selectedSubmission?.id === sub.id ? 'bg-white/10 border-l-4 border-l-[#d4af37]' : ''}`}
                            >
                              <td className="p-6">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${sub.type === 'quote' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#d4af37]/10 text-[#d4af37]'}`}>
                                  {sub.type === 'quote' ? <Calculator size={16} /> : <FileText size={16} />}
                                </div>
                              </td>
                              <td className="p-6">
                                <p className="font-black text-sm uppercase text-white tracking-wide">{sub.data.name}</p>
                                <p className="text-[10px] font-bold text-white/40 mt-0.5">{sub.data.email}</p>
                              </td>
                              <td className="p-6">
                                <p className="text-xs font-black text-white/80 uppercase">
                                  {sub.type === 'quote' ? 'Grounding Estimate' : sub.data.service}
                                </p>
                                {sub.type === 'quote' && (
                                  <p className="text-[10px] font-bold text-emerald-400 mt-0.5">₹{Number(sub.data.estimatedPrice).toLocaleString('en-IN')}</p>
                                )}
                              </td>
                              <td className="p-6 text-xs text-white/50 font-bold">
                                {new Date(sub.createdAt).toLocaleDateString()}
                              </td>
                              <td className="p-6">
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border ${
                                  sub.status === 'new' 
                                    ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20' 
                                    : sub.status === 'read' 
                                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                                      : 'bg-white/5 text-white/40 border-white/10'
                                }`}>
                                  {sub.status}
                                </span>
                              </td>
                              <td className="p-6 text-right" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-end gap-2">
                                  {sub.status !== 'read' && (
                                    <button
                                      onClick={() => handleUpdateSubmissionStatus(sub.id, 'read')}
                                      className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-white/40 hover:text-blue-400 border border-white/5 transition-all cursor-pointer"
                                      title="Mark Reviewed"
                                    >
                                      <CheckCircle size={12} />
                                    </button>
                                  )}
                                  {sub.status !== 'archived' && (
                                    <button
                                      onClick={() => handleUpdateSubmissionStatus(sub.id, 'archived')}
                                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/40 hover:text-white border border-white/5 transition-all cursor-pointer"
                                      title="Archive"
                                    >
                                      <Archive size={12} />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteSubmission(sub.id)}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 border border-white/5 transition-all cursor-pointer"
                                    title="Delete"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Submission Inspection Sidebar */}
                {selectedSubmission && (
                  <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[35px] p-6 shadow-xl space-y-6 relative sticky top-10">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedSubmission.type === 'quote' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-[#d4af37]/10 text-[#d4af37]'}`}>
                          {selectedSubmission.type === 'quote' ? <Calculator size={18} /> : <FileText size={18} />}
                        </div>
                        <div>
                          <h4 className="font-black text-sm uppercase text-white tracking-wide">
                            {selectedSubmission.type === 'quote' ? 'Calculator Inquiry' : 'Contact Message'}
                          </h4>
                          <span className="text-[10px] font-bold text-white/40">ID: {selectedSubmission.id.substring(0, 8)}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedSubmission(null)}
                        className="w-8 h-8 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 flex items-center justify-center text-white/40 hover:text-white cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <hr className="border-white/5" />

                    {/* Sender contact panel */}
                    <div className="space-y-4 text-xs">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]/80 block mb-1">Sender Name</span>
                        <p className="font-bold text-white uppercase">{selectedSubmission.data.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]/80 block mb-1">Email Address</span>
                          <a href={`mailto:${selectedSubmission.data.email}`} className="font-bold text-white/80 hover:text-[#d4af37] underline">{selectedSubmission.data.email}</a>
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]/80 block mb-1">Phone Number</span>
                          <a href={`tel:${selectedSubmission.data.phone}`} className="font-bold text-white/80 hover:text-[#d4af37] underline">{selectedSubmission.data.phone}</a>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]/80 block mb-1">Company Client</span>
                          <p className="font-bold text-white/80 uppercase">{selectedSubmission.data.company || 'Private Entity'}</p>
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]/80 block mb-1">Date Submitted</span>
                          <p className="font-bold text-white/80">{new Date(selectedSubmission.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/5" />

                    {/* Dynamic Detail Body based on type */}
                    {selectedSubmission.type === 'contact' ? (
                      <div className="space-y-4 text-xs">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]/80 block mb-1">Service Requested</span>
                          <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg font-black uppercase text-white/80">{selectedSubmission.data.service}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]/80 block mb-1">Project Requirements</span>
                          <p className="p-4 bg-white/5 border border-white/5 rounded-2xl leading-relaxed text-white/70 whitespace-pre-wrap font-medium">{selectedSubmission.data.message}</p>
                        </div>
                      </div>
                    ) : (
                      // Quote details
                      <div className="space-y-4 text-xs">
                        <div className="grid grid-cols-2 gap-4 bg-emerald-400/5 border border-emerald-400/10 rounded-2xl p-4">
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/80 block mb-1">Calculated Estimate</span>
                            <span className="text-lg font-black text-emerald-400">₹{Number(selectedSubmission.data.estimatedPrice).toLocaleString('en-IN')}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/80 block mb-1">Project Site Location</span>
                            <span className="text-sm font-black text-white/80 uppercase">{selectedSubmission.data.location}</span>
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-3 font-bold text-[10px] uppercase">
                          <p className="flex justify-between text-white/50"><span className="text-white/30">Earthing System:</span> <span className="text-white">{selectedSubmission.data.earthingSystemType}</span></p>
                          <p className="flex justify-between text-white/50"><span className="text-white/30">Soil Resistivity:</span> <span className="text-white">{selectedSubmission.data.soilResistivity} Ω·m</span></p>
                          <p className="flex justify-between text-white/50"><span className="text-white/30">Fault Current Required:</span> <span className="text-white">{selectedSubmission.data.faultCurrent} kA</span></p>
                          <hr className="border-white/5" />
                          <p className="flex justify-between text-white/50"><span className="text-white/30">Electrode Spec:</span> <span className="text-white">{selectedSubmission.data.electrodeDiameter} x {selectedSubmission.data.electrodeLength}</span></p>
                          <p className="flex justify-between text-white/50"><span className="text-white/30">Electrode Quantity:</span> <span className="text-white">{selectedSubmission.data.electrodeQty} units</span></p>
                          <p className="flex justify-between text-white/50"><span className="text-white/30">Backfill Compound:</span> <span className="text-white">{selectedSubmission.data.compoundQty} bags (25kg)</span></p>
                          <hr className="border-white/5" />
                          <p className="flex justify-between text-white/50"><span className="text-white/30">Lightning Arrester:</span> <span className="text-white">{selectedSubmission.data.arresterType} ({selectedSubmission.data.arresterQty} units)</span></p>
                          <p className="flex justify-between text-white/50"><span className="text-white/30">Inspection Pit:</span> <span className="text-white">{selectedSubmission.data.inspectionChamber}</span></p>
                          <p className="flex justify-between text-white/50"><span className="text-white/30">Grounding Clamps:</span> <span className="text-white">{selectedSubmission.data.clampsNeeded ? 'Yes' : 'No'}</span></p>
                        </div>

                        {selectedSubmission.data.notes && (
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]/80 block mb-1">Additional Project Notes</span>
                            <p className="p-4 bg-white/5 border border-white/5 rounded-2xl leading-relaxed text-white/70 whitespace-pre-wrap font-medium">{selectedSubmission.data.notes}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <hr className="border-white/5" />

                    {/* Status actions dropdown */}
                    <div className="flex gap-4">
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Status Action</label>
                        <select
                          value={selectedSubmission.status}
                          onChange={(e) => handleUpdateSubmissionStatus(selectedSubmission.id, e.target.value as any)}
                          className="w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#0a0f1d] border border-white/10 outline-none"
                        >
                          <option value="new">New</option>
                          <option value="read">Read / Reviewed</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                      <button
                        onClick={() => handleDeleteSubmission(selectedSubmission.id)}
                        className="px-6 rounded-xl border border-red-500/20 hover:bg-red-500/10 text-red-400 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer mt-5"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: SEO METADATA SETTINGS */}
          {activeTab === 'seo' && (
            <motion.div
              key="seo"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">SEO Metadata Manager</h2>
                  <p className="text-white/40 text-sm mt-1">Configure browser page titles and meta descriptions for all static pages.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveMetadata}
                  disabled={isSavingMetadata}
                  className="bg-[#d4af37] text-black font-black uppercase text-xs tracking-wider px-8 py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-yellow-500/10 disabled:opacity-50"
                >
                  {isSavingMetadata ? 'Saving Changes...' : 'Save All SEO Meta'}
                </button>
              </div>

              {/* Grid listing all pages */}
              <div className="bg-white/5 border border-white/10 rounded-[35px] p-6 md:p-8 space-y-8 shadow-xl">
                <div className="space-y-6">
                  {Object.entries(pageMetadata).map(([route, meta]) => (
                    <div key={route} className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
                      {/* Route Header */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black uppercase tracking-widest text-[#d4af37]">{route === '/' ? 'Home Page (/) ' : `${route.replace('/', '').replace(/-/g, ' ')} (${route})`}</span>
                        <span className="text-[10px] font-bold text-white/30 uppercase">Static Route</span>
                      </div>
                      
                      {/* Inputs Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Page Title Tag</label>
                            <span className={`text-[8px] font-bold ${meta.title.length > 60 ? 'text-yellow-400' : 'text-white/30'}`}>
                              {meta.title.length} / 60 chars
                            </span>
                          </div>
                          <input
                            type="text"
                            value={meta.title}
                            onChange={(e) => {
                              const updated = { ...pageMetadata };
                              updated[route] = { ...updated[route], title: e.target.value };
                              setPageMetadata(updated);
                            }}
                            placeholder="Enter page SEO title..."
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Meta Description</label>
                            <span className={`text-[8px] font-bold ${meta.description.length > 160 ? 'text-yellow-400' : 'text-white/30'}`}>
                              {meta.description.length} / 160 chars
                            </span>
                          </div>
                          <textarea
                            rows={2}
                            value={meta.description}
                            onChange={(e) => {
                              const updated = { ...pageMetadata };
                              updated[route] = { ...updated[route], description: e.target.value };
                              setPageMetadata(updated);
                            }}
                            placeholder="Enter page SEO description..."
                            className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-medium resize-none leading-relaxed"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Canonical URL Override (Optional)</label>
                          <input
                            type="text"
                            value={meta.canonical || ''}
                            onChange={(e) => {
                              const updated = { ...pageMetadata };
                              updated[route] = { ...updated[route], canonical: e.target.value };
                              setPageMetadata(updated);
                            }}
                            placeholder="e.g. https://www.saaraindia.com/custom-canonical"
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {Object.keys(pageMetadata).length === 0 && (
                    <div className="text-center py-10">
                      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white/40 text-xs font-black uppercase tracking-widest">Loading SEO database metadata...</p>
                    </div>
                  )}
                </div>

                {/* Save Section Bottom */}
                {Object.keys(pageMetadata).length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={handleSaveMetadata}
                      disabled={isSavingMetadata}
                      className="bg-[#d4af37] text-black font-black uppercase text-xs tracking-wider px-10 py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-yellow-500/10 disabled:opacity-50"
                    >
                      {isSavingMetadata ? 'Saving Changes...' : 'Save All SEO Meta'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 5: BLOGS MANAGER */}
          {activeTab === 'blogs' && (
            <motion.div
              key="blogs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Blog Manager</h2>
                  <p className="text-white/40 text-sm mt-1">Publish and modify dynamic articles in the engineering library.</p>
                </div>
                <button
                  onClick={openAddBlog}
                  className="bg-[#d4af37] text-black font-black uppercase text-xs tracking-wider px-6 py-4 rounded-xl flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-yellow-500/10"
                >
                  <Plus size={16} /> Add Blog Post
                </button>
              </div>

              {/* Filters Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search articles by title, author, slug..."
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    className="w-full pl-12 pr-6 py-3.5 rounded-xl text-xs font-bold text-white bg-white/5 border border-white/5 outline-none focus:border-[#d4af37] focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              {/* Blogs Table */}
              <div className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden shadow-xl">
                <div className="overflow-x-auto max-w-full">
                  <table className="w-full border-collapse text-left min-w-[800px]">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest">
                        <th className="p-6">Thumbnail</th>
                        <th className="p-6">Article Details</th>
                        <th className="p-6">Author</th>
                        <th className="p-6">Slug</th>
                        <th className="p-6">Publish Date</th>
                        <th className="p-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {blogs
                        .filter(b => {
                          const matchesSearch = b.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
                                                b.author.toLowerCase().includes(blogSearch.toLowerCase()) ||
                                                b.slug.toLowerCase().includes(blogSearch.toLowerCase());
                          return matchesSearch;
                        })
                        .map((blog) => (
                          <tr key={blog.slug} className="hover:bg-white/5 transition-colors group">
                            <td className="p-6">
                              <div className="w-14 h-14 relative bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shrink-0">
                                <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                              </div>
                            </td>
                            <td className="p-6">
                              <p className="font-black text-sm uppercase text-white tracking-wide">{blog.title}</p>
                              <p className="text-[10px] font-bold text-white/40 line-clamp-1 max-w-sm mt-1">{blog.excerpt}</p>
                            </td>
                            <td className="p-6">
                              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                {blog.author}
                              </span>
                            </td>
                            <td className="p-6 text-xs text-white/50 font-bold">{blog.slug}</td>
                            <td className="p-6 text-xs font-black text-[#d4af37]">{blog.date}</td>
                            <td className="p-6 text-right">
                              <div className="flex items-center justify-end gap-3">
                                <button
                                  onClick={() => openEditBlog(blog)}
                                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#d4af37]/20 border border-white/5 hover:border-[#d4af37]/30 text-white/60 hover:text-[#d4af37] flex items-center justify-center transition-all cursor-pointer"
                                  title="Edit Blog"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(blog.slug)}
                                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/5 hover:border-red-500/30 text-white/60 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer"
                                  title="Delete Blog"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      {blogs.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-10 text-center text-white/40 font-bold text-sm">
                            No articles found. Click 'Add Blog Post' to publish your first post.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* DYNAMIC PRODUCT FORM MODAL */}
      <AnimatePresence>
        {isProductModalOpen && editingProduct && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-end bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl h-full bg-[#080d19] border-l border-white/10 shadow-2xl overflow-y-auto p-6 md:p-10 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.2em]">Product Schema Creator</span>
                    <h3 className="text-2xl font-black uppercase text-white mt-1">{isNewProduct ? 'Add New Product' : 'Modify Product'}</h3>
                  </div>
                  <button 
                    onClick={() => setIsProductModalOpen(false)}
                    className="w-10 h-10 rounded-xl hover:bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Tabs */}
                <div className="flex border-b border-white/5 mb-6 overflow-x-auto gap-2 no-scrollbar">
                  {[
                    { id: 'general', label: 'General' },
                    { id: 'specs', label: 'Specs & Apps' },
                    { id: 'details', label: 'Deep Details' },
                    { id: 'tabs', label: 'Tabs Data' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setModalActiveTab(tab.id as any)}
                      className={`px-4 py-3 text-[10px] font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                        modalActiveTab === tab.id 
                          ? 'border-[#d4af37] text-[#d4af37]' 
                          : 'border-transparent text-white/40 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Form body */}
                <form className="space-y-6 text-xs font-bold text-white/80">
                  {/* TAB 1: GENERAL */}
                  {modalActiveTab === 'general' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      {/* Row 1: Title & Category */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Product Title</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.title}
                            onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                            placeholder="e.g. GI Earthing"
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Category</label>
                          <select
                            value={editingProduct.category}
                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                            className="px-5 py-3.5 rounded-xl bg-[#0a0f1d] border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-black uppercase tracking-wider"
                          >
                            <option value="earthing-products">Earthing Products</option>
                            <option value="earthing-accessories">Earthing Accessories</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 2: Slug & Image */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">URL Slug (Unique)</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.slug}
                            onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-') })}
                            placeholder="e.g. gi-earthing"
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Image Path</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              required
                              value={editingProduct.image}
                              onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                              placeholder="e.g. /images/VIEW/filename.JPG"
                              className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold w-full"
                            />
                            <label className="bg-[#d4af37] text-black font-black uppercase text-[10px] tracking-wider px-4 py-3.5 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shrink-0">
                              Upload
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'image', false)} />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Hover Image */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Hover Image Path (Optional)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingProduct.hoverImage || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, hoverImage: e.target.value || undefined })}
                            placeholder="e.g. /images/VIEW/hover-filename.JPG"
                            className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold w-full"
                          />
                          <label className="bg-[#d4af37] text-black font-black uppercase text-[10px] tracking-wider px-4 py-3.5 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shrink-0">
                            Upload
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'hoverImage', false)} />
                          </label>
                        </div>
                      </div>

                      {/* Short Description */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Short Description</label>
                        <textarea
                          required
                          rows={3}
                          value={editingProduct.desc}
                          onChange={(e) => setEditingProduct({ ...editingProduct, desc: e.target.value })}
                          placeholder="Enter concise product summary..."
                          className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs resize-none font-medium leading-relaxed"
                        />
                      </div>

                      {/* SEO Meta Title & Description */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40">SEO Meta Title (Optional)</label>
                          <input
                            type="text"
                            value={editingProduct.metaTitle || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, metaTitle: e.target.value || undefined })}
                            placeholder="e.g. GI Earthing Electrode | SAARA"
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40">SEO Meta Description (Optional)</label>
                          <input
                            type="text"
                            value={editingProduct.metaDescription || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, metaDescription: e.target.value || undefined })}
                            placeholder="e.g. High quality GI Ground Electrode..."
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-4">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">SEO Canonical URL Override (Optional)</label>
                        <input
                          type="text"
                          value={editingProduct.canonical || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, canonical: e.target.value || undefined })}
                          placeholder="e.g. https://www.saaraindia.com/products/custom-canonical-path"
                          className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: SPECS & APPS */}
                  {modalActiveTab === 'specs' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      {/* Dynamic Bullet Features */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Core Features list</label>
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...(editingProduct.features || [])];
                              list.push('');
                              setEditingProduct({ ...editingProduct, features: list });
                            }}
                            className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <PlusCircle size={12} /> Add Feature
                          </button>
                        </div>

                        <div className="space-y-2">
                          {editingProduct.features.map((feat, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) => {
                                  const list = [...editingProduct.features];
                                  list[index] = e.target.value;
                                  setEditingProduct({ ...editingProduct, features: list });
                                }}
                                placeholder="e.g. CPRI Certified"
                                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const list = [...editingProduct.features];
                                  list.splice(index, 1);
                                  setEditingProduct({ ...editingProduct, features: list });
                                }}
                                className="text-white/40 hover:text-red-400 cursor-pointer"
                              >
                                <MinusCircle size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Specifications (Key-Value) */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Quick Specifications (Key-Value)</label>
                          <button
                            type="button"
                            onClick={() => {
                              const specs = { ...(editingProduct.specs || {}) };
                              specs['new_spec_key_' + Math.random().toString(36).substring(2,5)] = 'Value';
                              setEditingProduct({ ...editingProduct, specs });
                            }}
                            className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <PlusCircle size={12} /> Add Spec
                          </button>
                        </div>

                        <div className="space-y-2">
                          {Object.entries(editingProduct.specs || {}).map(([key, val], idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                              <input
                                type="text"
                                value={key}
                                onChange={(e) => {
                                  const newKey = e.target.value;
                                  const specs = { ...(editingProduct.specs || {}) };
                                  const value = specs[key];
                                  delete specs[key];
                                  specs[newKey] = value;
                                  setEditingProduct({ ...editingProduct, specs });
                                }}
                                placeholder="Spec Name"
                                className="w-1/2 px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                              />
                              <input
                                type="text"
                                value={val}
                                onChange={(e) => {
                                  const specs = { ...(editingProduct.specs || {}) };
                                  specs[key] = e.target.value;
                                  setEditingProduct({ ...editingProduct, specs });
                                }}
                                placeholder="Spec Value"
                                className="w-1/2 px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const specs = { ...(editingProduct.specs || {}) };
                                  delete specs[key];
                                  setEditingProduct({ ...editingProduct, specs });
                                }}
                                className="text-white/40 hover:text-red-400 cursor-pointer"
                              >
                                <MinusCircle size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Applications */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Applications (Array)</label>
                          <button
                            type="button"
                            onClick={() => {
                              const apps = [...(editingProduct.applications || [])];
                              apps.push('');
                              setEditingProduct({ ...editingProduct, applications: apps });
                            }}
                            className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <PlusCircle size={12} /> Add Application
                          </button>
                        </div>

                        <div className="space-y-2">
                          {(editingProduct.applications || []).map((app, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <input
                                type="text"
                                value={app}
                                onChange={(e) => {
                                  const apps = [...(editingProduct.applications || [])];
                                  apps[index] = e.target.value;
                                  setEditingProduct({ ...editingProduct, applications: apps });
                                }}
                                placeholder="e.g. Substations grounding"
                                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const apps = [...(editingProduct.applications || [])];
                                  apps.splice(index, 1);
                                  setEditingProduct({ ...editingProduct, applications: apps });
                                }}
                                className="text-white/40 hover:text-red-400 cursor-pointer"
                              >
                                <MinusCircle size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: DEEP DETAILS */}
                  {modalActiveTab === 'details' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      {/* Long Description Paragraphs */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Long Description Paragraphs</label>
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...(editingProduct.longDesc || [])];
                              list.push('');
                              setEditingProduct({ ...editingProduct, longDesc: list });
                            }}
                            className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <PlusCircle size={12} /> Add Paragraph
                          </button>
                        </div>
                        <div className="space-y-3">
                          {(editingProduct.longDesc || []).map((para, index) => (
                            <div key={index} className="flex gap-2 items-start">
                              <textarea
                                rows={3}
                                value={para}
                                onChange={(e) => {
                                  const list = [...(editingProduct.longDesc || [])];
                                  list[index] = e.target.value;
                                  setEditingProduct({ ...editingProduct, longDesc: list });
                                }}
                                placeholder={`Paragraph ${index + 1}`}
                                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-xs font-medium leading-relaxed resize-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const list = [...(editingProduct.longDesc || [])];
                                  list.splice(index, 1);
                                  setEditingProduct({ ...editingProduct, longDesc: list });
                                }}
                                className="text-white/40 hover:text-red-400 cursor-pointer mt-3"
                              >
                                <MinusCircle size={16} />
                              </button>
                            </div>
                          ))}
                          {(!editingProduct.longDesc || editingProduct.longDesc.length === 0) && (
                            <p className="text-white/30 text-[10px] italic">No long description paragraphs defined.</p>
                          )}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Highlights / Key Selling Points</label>
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...(editingProduct.highlights || [])];
                              list.push({ title: '', desc: '' });
                              setEditingProduct({ ...editingProduct, highlights: list });
                            }}
                            className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <PlusCircle size={12} /> Add Highlight
                          </button>
                        </div>
                        <div className="space-y-3">
                          {(editingProduct.highlights || []).map((hl, index) => (
                            <div key={index} className="space-y-2 p-4 bg-white/5 border border-white/5 rounded-2xl relative">
                              <button
                                type="button"
                                onClick={() => {
                                  const list = [...(editingProduct.highlights || [])];
                                  list.splice(index, 1);
                                  setEditingProduct({ ...editingProduct, highlights: list });
                                }}
                                className="absolute right-4 top-4 text-white/40 hover:text-red-400 cursor-pointer"
                              >
                                <MinusCircle size={16} />
                              </button>
                              <div className="flex flex-col gap-2">
                                <label className="text-[8px] font-black uppercase tracking-widest text-white/40">Highlight Title</label>
                                <input
                                  type="text"
                                  value={hl.title}
                                  onChange={(e) => {
                                    const list = [...(editingProduct.highlights || [])];
                                    list[index] = { ...list[index], title: e.target.value };
                                    setEditingProduct({ ...editingProduct, highlights: list });
                                  }}
                                  placeholder="e.g. Low-Impedance Grounding"
                                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-[8px] font-black uppercase tracking-widest text-white/40">Highlight Description</label>
                                <textarea
                                  rows={2}
                                  value={hl.desc}
                                  onChange={(e) => {
                                    const list = [...(editingProduct.highlights || [])];
                                    list[index] = { ...list[index], desc: e.target.value };
                                    setEditingProduct({ ...editingProduct, highlights: list });
                                  }}
                                  placeholder="Highlight description text..."
                                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-xs font-medium resize-none"
                                />
                              </div>
                            </div>
                          ))}
                          {(!editingProduct.highlights || editingProduct.highlights.length === 0) && (
                            <p className="text-white/30 text-[10px] italic">No highlights defined.</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: TABS DATA */}
                  {modalActiveTab === 'tabs' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      {/* Features Tab Description */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Features Tab Header Desc</label>
                        <textarea
                          rows={2}
                          value={editingProduct.detailedTabs?.features?.desc || ''}
                          onChange={(e) => {
                            const dt = { ...(editingProduct.detailedTabs || {}) };
                            const f = { ...(dt.features || { desc: '', list: [] }) };
                            f.desc = e.target.value;
                            dt.features = f;
                            setEditingProduct({ ...editingProduct, detailedTabs: dt });
                          }}
                          placeholder="Features tab description text..."
                          className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs resize-none font-medium"
                        />
                      </div>

                      {/* Features Tab List */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/60">Features Tab Bullet Points</label>
                          <button
                            type="button"
                            onClick={() => {
                              const dt = { ...(editingProduct.detailedTabs || {}) };
                              const f = { ...(dt.features || { desc: '', list: [] }) };
                              const list = [...(f.list || [])];
                              list.push('');
                              f.list = list;
                              dt.features = f;
                              setEditingProduct({ ...editingProduct, detailedTabs: dt });
                            }}
                            className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <PlusCircle size={12} /> Add Point
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(editingProduct.detailedTabs?.features?.list || []).map((point, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <input
                                type="text"
                                value={point}
                                onChange={(e) => {
                                  const dt = { ...(editingProduct.detailedTabs || {}) };
                                  const f = { ...(dt.features || { desc: '', list: [] }) };
                                  const list = [...(f.list || [])];
                                  list[index] = e.target.value;
                                  f.list = list;
                                  dt.features = f;
                                  setEditingProduct({ ...editingProduct, detailedTabs: dt });
                                }}
                                placeholder="Feature point text"
                                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const dt = { ...(editingProduct.detailedTabs || {}) };
                                  const f = { ...(dt.features || { desc: '', list: [] }) };
                                  const list = [...(f.list || [])];
                                  list.splice(index, 1);
                                  f.list = list;
                                  dt.features = f;
                                  setEditingProduct({ ...editingProduct, detailedTabs: dt });
                                }}
                                className="text-white/40 hover:text-red-400 cursor-pointer"
                              >
                                <MinusCircle size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <hr className="border-white/5 my-6" />

                      {/* Advantages */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Advantages list</label>
                          <button
                            type="button"
                            onClick={() => {
                              const dt = { ...(editingProduct.detailedTabs || {}) };
                              const adv = [...(dt.advantages || [])];
                              adv.push({ title: '', desc: '' });
                              dt.advantages = adv;
                              setEditingProduct({ ...editingProduct, detailedTabs: dt });
                            }}
                            className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <PlusCircle size={12} /> Add Advantage
                          </button>
                        </div>
                        <div className="space-y-3">
                          {(editingProduct.detailedTabs?.advantages || []).map((adv, index) => (
                            <div key={index} className="space-y-2 p-4 bg-white/5 border border-white/5 rounded-2xl relative">
                              <button
                                type="button"
                                onClick={() => {
                                  const dt = { ...(editingProduct.detailedTabs || {}) };
                                  const advList = [...(dt.advantages || [])];
                                  advList.splice(index, 1);
                                  dt.advantages = advList;
                                  setEditingProduct({ ...editingProduct, detailedTabs: dt });
                                }}
                                className="absolute right-4 top-4 text-white/40 hover:text-red-400 cursor-pointer"
                              >
                                <MinusCircle size={16} />
                              </button>
                              <div className="flex flex-col gap-2">
                                <label className="text-[8px] font-black uppercase tracking-widest text-white/40">Advantage Title</label>
                                <input
                                  type="text"
                                  value={adv.title}
                                  onChange={(e) => {
                                    const dt = { ...(editingProduct.detailedTabs || {}) };
                                    const advList = [...(dt.advantages || [])];
                                    advList[index] = { ...advList[index], title: e.target.value };
                                    dt.advantages = advList;
                                    setEditingProduct({ ...editingProduct, detailedTabs: dt });
                                  }}
                                  placeholder="e.g. Crystalline Enhancements"
                                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-[8px] font-black uppercase tracking-widest text-white/40">Advantage Description</label>
                                <textarea
                                  rows={2}
                                  value={adv.desc}
                                  onChange={(e) => {
                                    const dt = { ...(editingProduct.detailedTabs || {}) };
                                    const advList = [...(dt.advantages || [])];
                                    advList[index] = { ...advList[index], desc: e.target.value };
                                    dt.advantages = advList;
                                    setEditingProduct({ ...editingProduct, detailedTabs: dt });
                                  }}
                                  placeholder="Advantage description text..."
                                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-xs font-medium resize-none"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <hr className="border-white/5 my-6" />

                      {/* Specs Table */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Specification Table</label>
                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={() => {
                                const dt = { ...(editingProduct.detailedTabs || {}) };
                                const st = { ...(dt.specTable || { headers: [], rows: [] }) };
                                const headers = [...(st.headers || [])];
                                headers.push('New Header');
                                st.headers = headers;
                                st.rows = (st.rows || []).map(row => [...row, '']);
                                dt.specTable = st;
                                setEditingProduct({ ...editingProduct, detailedTabs: dt });
                              }}
                              className="text-[9px] font-black uppercase tracking-widest text-blue-400 flex items-center gap-1 hover:underline cursor-pointer"
                            >
                              <PlusCircle size={12} /> Add Column
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const dt = { ...(editingProduct.detailedTabs || {}) };
                                const st = { ...(dt.specTable || { headers: [], rows: [] }) };
                                const rows = [...(st.rows || [])];
                                const newRow = Array(st.headers?.length || 0).fill('');
                                rows.push(newRow);
                                st.rows = rows;
                                dt.specTable = st;
                                setEditingProduct({ ...editingProduct, detailedTabs: dt });
                              }}
                              className="text-[9px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1 hover:underline cursor-pointer"
                            >
                              <PlusCircle size={12} /> Add Row
                            </button>
                          </div>
                        </div>

                        {editingProduct.detailedTabs?.specTable && (
                          <div className="space-y-4">
                            {/* Headers */}
                            {editingProduct.detailedTabs.specTable.headers?.length > 0 && (
                              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                                <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Table Headers</span>
                                <div className="grid grid-cols-2 gap-2">
                                  {editingProduct.detailedTabs.specTable.headers.map((h, hIdx) => (
                                    <div key={hIdx} className="flex gap-2 items-center">
                                      <input
                                        type="text"
                                        value={h}
                                        onChange={(e) => {
                                          const dt = { ...(editingProduct.detailedTabs || {}) };
                                          const st = { ...(dt.specTable || { headers: [], rows: [] }) };
                                          const headers = [...(st.headers || [])];
                                          headers[hIdx] = e.target.value;
                                          st.headers = headers;
                                          dt.specTable = st;
                                          setEditingProduct({ ...editingProduct, detailedTabs: dt });
                                        }}
                                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-[10px] font-bold"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const dt = { ...(editingProduct.detailedTabs || {}) };
                                          const st = { ...(dt.specTable || { headers: [], rows: [] }) };
                                          const headers = [...(st.headers || [])];
                                          headers.splice(hIdx, 1);
                                          st.headers = headers;
                                          st.rows = (st.rows || []).map(row => {
                                            const r = [...row];
                                            r.splice(hIdx, 1);
                                            return r;
                                          });
                                          dt.specTable = st;
                                          setEditingProduct({ ...editingProduct, detailedTabs: dt });
                                        }}
                                        className="text-white/30 hover:text-red-400"
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Rows */}
                            <div className="space-y-3">
                              {(editingProduct.detailedTabs.specTable.rows || []).map((row, rIdx) => (
                                <div key={rIdx} className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-[#d4af37]">Row {rIdx + 1}</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const dt = { ...(editingProduct.detailedTabs || {}) };
                                        const st = { ...(dt.specTable || { headers: [], rows: [] }) };
                                        const rows = [...(st.rows || [])];
                                        rows.splice(rIdx, 1);
                                        st.rows = rows;
                                        dt.specTable = st;
                                        setEditingProduct({ ...editingProduct, detailedTabs: dt });
                                      }}
                                      className="text-white/40 hover:text-red-400 flex items-center gap-1 text-[8px] font-black uppercase tracking-widest"
                                    >
                                      <Trash2 size={10} /> Delete Row
                                    </button>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {row.map((cell, cIdx) => (
                                      <div key={cIdx} className="flex flex-col gap-1">
                                        <span className="text-[7px] font-black uppercase tracking-widest text-white/30 truncate">
                                          {editingProduct.detailedTabs?.specTable?.headers[cIdx] || `Col ${cIdx + 1}`}
                                        </span>
                                        <input
                                          type="text"
                                          value={cell}
                                          onChange={(e) => {
                                            const dt = { ...(editingProduct.detailedTabs || {}) };
                                            const st = { ...(dt.specTable || { headers: [], rows: [] }) };
                                            const rows = [...(st.rows || [])];
                                            const r = [...rows[rIdx]];
                                            r[cIdx] = e.target.value;
                                            rows[rIdx] = r;
                                            st.rows = rows;
                                            dt.specTable = st;
                                            setEditingProduct({ ...editingProduct, detailedTabs: dt });
                                          }}
                                          className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-[10px]"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-white/5 pt-6 mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-6 py-4 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveProduct(editingProduct)}
                  className="px-8 py-4 rounded-xl bg-[#d4af37] text-black text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-yellow-500/10"
                >
                  Save Product Listing
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* DYNAMIC BLOG FORM MODAL */}
        {isBlogModalOpen && editingBlog && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-end bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl h-full bg-[#080d19] border-l border-white/10 shadow-2xl overflow-y-auto p-6 md:p-10 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.2em]">Blog Article Editor</span>
                    <h3 className="text-2xl font-black uppercase text-white mt-1">{isNewBlog ? 'Create New Article' : 'Modify Article'}</h3>
                  </div>
                  <button 
                    onClick={() => setIsBlogModalOpen(false)}
                    className="w-10 h-10 rounded-xl hover:bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Tabs */}
                <div className="flex border-b border-white/5 mb-6 overflow-x-auto gap-2 no-scrollbar">
                  {[
                    { id: 'general', label: 'General Info' },
                    { id: 'content', label: 'Article Body & SEO' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setBlogModalActiveTab(tab.id as any)}
                      className={`px-4 py-3 text-[10px] font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                        blogModalActiveTab === tab.id 
                          ? 'border-[#d4af37] text-[#d4af37]' 
                          : 'border-transparent text-white/40 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Form body */}
                <form className="space-y-6 text-xs font-bold text-white/80">
                  {/* TAB 1: GENERAL INFO */}
                  {blogModalActiveTab === 'general' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      {/* Row 1: Title & Author */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Article Title</label>
                          <input
                            type="text"
                            required
                            value={editingBlog.title}
                            onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                            placeholder="e.g. Copper Grounding Benefits"
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Author Name</label>
                          <input
                            type="text"
                            required
                            value={editingBlog.author}
                            onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                            placeholder="e.g. Technical Team"
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>
                      </div>

                      {/* Row 2: Slug & Read Time */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">URL Slug (Unique)</label>
                          <input
                            type="text"
                            required
                            value={editingBlog.slug}
                            onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-') })}
                            placeholder="e.g. copper-grounding-benefits"
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Estimated Read Time</label>
                          <input
                            type="text"
                            required
                            value={editingBlog.readTime}
                            onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                            placeholder="e.g. 5 min read"
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>
                      </div>

                      {/* Row 3: Image Path & Date */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Image Path</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              required
                              value={editingBlog.image}
                              onChange={(e) => setEditingBlog({ ...editingBlog, image: e.target.value })}
                              placeholder="e.g. /images/VIEW/filename.JPG"
                              className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold w-full"
                            />
                            <label className="bg-[#d4af37] text-black font-black uppercase text-[10px] tracking-wider px-4 py-3.5 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shrink-0">
                              Upload
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'image', true)} />
                            </label>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Publish Date</label>
                          <input
                            type="text"
                            required
                            value={editingBlog.date}
                            onChange={(e) => setEditingBlog({ ...editingBlog, date: e.target.value })}
                            placeholder="e.g. May 28, 2026"
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>
                      </div>

                      {/* Excerpt */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Short Excerpt (Feed Summary)</label>
                        <textarea
                          required
                          rows={3}
                          value={editingBlog.excerpt}
                          onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                          placeholder="Enter a brief summary for the feed list..."
                          className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs resize-none font-medium leading-relaxed"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: ARTICLE BODY & SEO */}
                  {blogModalActiveTab === 'content' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      {/* Dynamic Paragraph Editor */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">Article Content Paragraphs</label>
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...(editingBlog.content || [])];
                              list.push('');
                              setEditingBlog({ ...editingBlog, content: list });
                            }}
                            className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <PlusCircle size={12} /> Add Paragraph
                          </button>
                        </div>
                        <div className="space-y-3">
                          {(editingBlog.content || []).map((para, index) => (
                            <div key={index} className="flex gap-2 items-start">
                              <textarea
                                rows={4}
                                value={para}
                                onChange={(e) => {
                                  const list = [...(editingBlog.content || [])];
                                  list[index] = e.target.value;
                                  setEditingBlog({ ...editingBlog, content: list });
                                }}
                                placeholder={`Paragraph ${index + 1}`}
                                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white outline-none focus:border-[#d4af37] text-xs font-medium leading-relaxed resize-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const list = [...(editingBlog.content || [])];
                                  list.splice(index, 1);
                                  setEditingBlog({ ...editingBlog, content: list });
                                }}
                                className="text-white/40 hover:text-red-400 cursor-pointer mt-3"
                              >
                                <MinusCircle size={16} />
                              </button>
                            </div>
                          ))}
                          {(!editingBlog.content || editingBlog.content.length === 0) && (
                            <p className="text-white/30 text-[10px] italic">No paragraphs written yet. Click 'Add Paragraph' to start.</p>
                          )}
                        </div>
                      </div>

                      <hr className="border-white/5 my-4" />

                      {/* SEO Meta Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40">SEO Meta Title (Optional)</label>
                          <input
                            type="text"
                            value={editingBlog.metaTitle || ''}
                            onChange={(e) => setEditingBlog({ ...editingBlog, metaTitle: e.target.value || undefined })}
                            placeholder="e.g. Copper Earthing Benefits | SAARA"
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40">SEO Meta Description (Optional)</label>
                          <input
                            type="text"
                            value={editingBlog.metaDescription || ''}
                            onChange={(e) => setEditingBlog({ ...editingBlog, metaDescription: e.target.value || undefined })}
                            placeholder="e.g. Uncover critical benefits of pure copper ground systems..."
                            className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-4">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40">SEO Canonical URL Override (Optional)</label>
                        <input
                          type="text"
                          value={editingBlog.canonical || ''}
                          onChange={(e) => setEditingBlog({ ...editingBlog, canonical: e.target.value || undefined })}
                          placeholder="e.g. https://www.saaraindia.com/blog/custom-canonical-path"
                          className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#d4af37] text-xs font-bold"
                        />
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-white/5 pt-6 mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-6 py-4 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveBlog(editingBlog)}
                  className="px-8 py-4 rounded-xl bg-[#d4af37] text-black text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-yellow-500/10"
                >
                  Save Blog Post
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
