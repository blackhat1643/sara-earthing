import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial Earthing Systems | Safe Grounding & Lightning Protection",
  description: "Advanced industrial earthing systems and lightning protection. Learn why earthing is imperative for safety, and discover our high-quality electrodes, backfill compounds, and lightning arresters.",
  alternates: {
    canonical: "/earthing",
  },
  openGraph: {
    title: "Industrial Earthing Systems | Safe Grounding & Lightning Protection",
    description: "Learn why earthing is imperative for the safety of human lives and machinery. Discover our advanced engineering solutions.",
    type: "website",
  },
};

export default function EarthingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
