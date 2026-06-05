import BlogDetailClient from './BlogDetailClient';

export async function generateStaticParams() {
  return [
    { slug: 'why-copper-grounding-essential' },
    { slug: 'gi-vs-copper-bonded-electrodes' }
  ];
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return <BlogDetailClient slug={params.slug} />;
}
