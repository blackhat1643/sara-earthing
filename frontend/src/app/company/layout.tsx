import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Saara Earthing | Our Legacy & Engineering Excellence",
  description: "Learn about Saara Earthing India Pvt Ltd, a leading engineering company with 15+ years of experience in lightning protection and grounding solutions. Discover our mission, values, and expert team.",
  alternates: {
    canonical: "/company",
  },
  openGraph: {
    title: "About Saara Earthing | Our Legacy & Engineering Excellence",
    description: "Learn about Saara Earthing India Pvt Ltd, a leading engineering company with 15+ years of experience in lightning protection and grounding solutions.",
    type: "website",
  },
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
