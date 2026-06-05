'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Slice } from 'lucide-react';

// Hardcoded fallback metadata matching layout defaults and high-quality SEO values
const FALLBACK_METADATA: Record<string, { title: string; description: string; canonical?: string }> = {
  "/": {
    "title": "SAARA Earthing | Premium Earthing & Lightning Protection Solutions",
    "description": "India's leading engineering company for earthing, exothermic welding, and lightning protection system for industries, refineries, power plants and more."
  },
  "/company": {
    "title": "About Us | SAARA Earthing",
    "description": "Learn about SAARA Earthing India Pvt. Ltd., our history, vision, mission, and leading earthing solutions."
  },
  "/products": {
    "title": "Product Catalog | SAARA Earthing",
    "description": "Explore our premium range of GI earthing, copper bonded electrodes, lightning arresters, and earthing accessories."
  },
  "/products/earthing-products": {
    "title": "Earthing Products | SAARA Earthing",
    "description": "Discover our high conductivity earthing electrodes, rods, and backfill compound solutions."
  },
  "/products/earthing-accessories": {
    "title": "Earthing Accessories | SAARA Earthing",
    "description": "Precision engineered couplers, driving studs, dowels, and clamps for grounding systems."
  },
  "/earthing": {
    "title": "Earthing System Design | SAARA Earthing",
    "description": "Technical guidance and system design details for chemical gel earthing and lightning protection."
  },
  "/applications": {
    "title": "Industrial Applications | SAARA Earthing",
    "description": "Grounding solutions for substations, data centers, oil & gas refineries, telecom towers, and malls."
  },
  "/clients": {
    "title": "Our Clients & Partners | SAARA Earthing",
    "description": "Trusted by leading public and private sector companies across India for safe grounding installations."
  },
  "/quality": {
    "title": "Quality Assurance | SAARA Earthing",
    "description": "Our commitment to CPRI certifications, rigorous testing standards, and premium raw materials."
  },
  "/quote": {
    "title": "Earthing Calculator & Quote | SAARA Earthing",
    "description": "Calculate earthing electrode and backfill quantity requirements for your project site and request a quote."
  },
  "/contact": {
    "title": "Contact Us | SAARA Earthing",
    "description": "Get in touch with our engineering team for technical support, product inquiries, and custom grounding designs."
  },
  "/blog": {
    "title": "Blog & Earthing Guides | SAARA Earthing",
    "description": "Read technical guides, case studies, and safety updates regarding chemical earthing systems, galvanized iron grounding, and lightning protection."
  }
};

export default function ClientSEO() {
  const pathname = usePathname();
  const [metadata, setMetadata] = useState<Record<string, { title: string; description: string; canonical?: string }>>(FALLBACK_METADATA);

  // Fetch page metadata from the Express backend API on mount
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    fetch(`${apiBase}/metadata`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch metadata');
        return res.json();
      })
      .then((data) => {
        if (data && typeof data === 'object') {
          // Merge fetched data over standard fallback data to guarantee all keys exist
          setMetadata((prev) => ({ ...prev, ...data }));
        }
      })
      .catch((err) => {
        console.warn('[SEO] Could not connect to API server for page SEO metadata, using static fallback.', err);
      });
  }, [pathname]); // Refresh or re-fetch on route shifts

  // Update DOM head elements when path changes
  useEffect(() => {
    // Skip dynamic meta updates for product detail dynamic subroutes
    // as those are managed directly inside the product details page component.
    const isProductDetailRoute = pathname.startsWith('/products/') &&
      pathname !== '/products/earthing-products' &&
      pathname !== '/products/earthing-accessories';
    const isBlogDetailRoute = pathname.startsWith('/blog/') && pathname !== '/blog';

    if (isProductDetailRoute || isBlogDetailRoute) {
      return;
    }

    const pageMeta = metadata[pathname] || metadata['/'];
    if (pageMeta) {
      // 1. Update document title
      if (pageMeta.title) {
        document.title = pageMeta.title;
      }
      // 2. Update meta description element
      const descElement = document.querySelector('meta[name="description"]');
      if (descElement) {
        descElement.setAttribute('content', pageMeta.description);
      } else {
        // If meta description tag does not exist, create it dynamically
        const newDescMeta = document.createElement('meta');
        newDescMeta.name = 'description';
        newDescMeta.content = pageMeta.description;
        document.head.appendChild(newDescMeta);
      }
    }
  }, [pathname, metadata]);

  // Update canonical link tag on route changes (applies to static routes)
  useEffect(() => {
    const isProductDetailRoute = pathname.startsWith('/products/') &&
      pathname !== '/products/earthing-products' &&
      pathname !== '/products/earthing-accessories';
    const isBlogDetailRoute = pathname.startsWith('/blog/') && pathname !== '/blog';

    if (isProductDetailRoute || isBlogDetailRoute) {
      return; // Handled individually inside dynamic page components
    }

    const pageMeta = metadata[pathname] || metadata['/'];
    const cleanPath = pathname.endsWith('/') && pathname !== '/'
      ? pathname.slice(0, -1)
      : pathname;
    const defaultCanonical = `https://www.saaraindia.com${cleanPath}`;
    const canonicalUrl = (pageMeta && pageMeta.canonical) ? pageMeta.canonical : defaultCanonical;

    let linkElement = document.querySelector('link[rel="canonical"]');
    if (linkElement) {
      linkElement.setAttribute('href', canonicalUrl);
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'canonical';
      newLink.href = canonicalUrl;
      document.head.appendChild(newLink);
    }
  }, [pathname, metadata]);

  return null; // Side-effect rendering only
}
