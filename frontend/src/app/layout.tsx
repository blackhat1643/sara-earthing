import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ClientSEO from "@/components/ClientSEO";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.saaraindia.com"),
  title: "SAARA Earthing | Premium Earthing & Lightning Protection Solutions",
  description: "India's leading engineering company for earthing, exothermic welding, and lightning protection system for industries, refineries, power plants and more.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientSEO />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
