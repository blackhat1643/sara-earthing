import { Zap, ShieldCheck, Flame, Settings } from 'lucide-react';

export interface Product {
  slug: string;
  category: string;
  title: string;
  desc: string;
  image: string;
  hoverImage?: string;
  features: string[];
  specs?: Record<string, string>;
  applications?: string[];
  
  // Rich Details (New)
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

import productsData from './products.json';

export const allProducts: Product[] = productsData as unknown as Product[];
