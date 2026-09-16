import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Marcos Hubner — Full-Stack Developer",
  description:
    "Five full-stack products built around genuinely hard problems: conflict-free scheduling, a concurrency-safe inventory ledger, real-time collaboration, fair debt-settlement, and a restaurant order state machine.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="bg-[#0a0d12] text-[#e8e6e0] antialiased">{children}</body>
    </html>
  );
}
