import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Meteors } from "@/components/magicui/meteors";
import { Particles } from "@/components/magicui/particles";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Ask Me Why",
  description: "A Q&A community with Magic UI flair",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const color = "#ffffff"
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-gray-100`}>
        <div className="fixed inset-0 -z-20 overflow-hidden">
          <Meteors number={60} />
          <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
        </div>
        <header className="relative z-10">
          <Navbar />
          <hr></hr>
        </header>
        <main className="relative z-10 min-h-[calc(100vh-96px)]">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
