import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jose Valle | Strategic Product Manager",
  description: "Strategic Product Manager with 20 years of experience driving $20M+ in revenue for B2B SaaS products. Expert in product-market fit, cross-functional leadership, and data-driven decision making.",
  keywords: ["Product Manager", "B2B SaaS", "Product Strategy", "Product Leadership"],
  authors: [{ name: "Jose Valle" }],
  openGraph: {
    title: "Jose Valle | Strategic Product Manager",
    description: "Strategic Product Manager with 20 years of experience driving $20M+ in revenue for B2B SaaS products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && !window.location.hash) {
                window.scrollTo(0, 0);
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--text-primary)]`}
      >
        {children}
      </body>
    </html>
  );
}
