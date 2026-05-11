import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAARA Earthing | Premium Earthing & Lightning Protection Solutions",
  description: "India's leading engineering company for earthing, exothermic welding, and lightning protection system for industries, refineries, power plants and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
