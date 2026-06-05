import ProductDetailClient from './ProductDetailClient';
import { allProducts } from '@/data/products';

export async function generateStaticParams() {
  return allProducts.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export default async function Page(props: { params: Promise<{ category: string; slug: string }> }) {
  const params = await props.params;
  return <ProductDetailClient category={params.category} slug={params.slug} />;
}
