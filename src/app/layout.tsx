import "./globals.css";
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Meteors } from "@/components/magicui/meteors";
import { Particles } from "@/components/magicui/particles";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ask Me Why",
  description: "A Q&A community with Magic UI flair",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const particleColor = "#a78bfa";
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${dmSans.variable}`}>
      <body className={`${dmSans.className} min-h-screen bg-background text-foreground`}>
        <div className="fixed inset-0 -z-20 overflow-hidden">
          <Meteors number={36} />
          <Particles
            className="absolute inset-0 z-0 opacity-70"
            quantity={72}
            ease={85}
            color={particleColor}
            refresh
          />
        </div>
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
