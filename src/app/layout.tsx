import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { ParticleField } from "@/components/ParticleField";
import { SmoothScroll } from "@/components/SmoothScroll";
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
  metadataBase: new URL("https://marcoshubner.vercel.app"),
  title: "Marcos Hubner — Full-Stack Developer",
  description:
    "Five full-stack products built around genuinely hard problems: conflict-free scheduling, a concurrency-safe inventory ledger, real-time collaboration, fair debt-settlement, and a restaurant order state machine.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="overflow-x-hidden text-[#eef1f8] antialiased">
        <div className="aurora" aria-hidden="true">
          <div className="blob" />
        </div>
        <ParticleField />
        <SmoothScroll>
          <LanguageProvider>{children}</LanguageProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
