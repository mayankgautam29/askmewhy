"use client";

import { RetroGrid } from "@/components/magicui/retro-grid";

export default function Footer() {
  return (
    <footer className="relative w-full h-32 border-t border-gray-700 bg-gray-800 overflow-hidden mt-12">
      <RetroGrid
        className="absolute inset-0 z-0"
        angle={65}
        cellSize={60}
        opacity={0.3}
        lightLineColor="gray"
        darkLineColor="gray"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-xs text-gray-300 font-mono space-y-1">
        <button
          onClick={() => {
            import("canvas-confetti").then((mod) => mod.default({ spread: 60, particleCount: 50 }));
          }}
          className="hover:underline"
        >
          © {new Date().getFullYear()} Mayank Gautam
        </button>
        <button
          onClick={() => {
            import("canvas-confetti").then((mod) => mod.default({ spread: 60, particleCount: 50 }));
          }}
          className="hover:underline"
        >
          Ask Me Why
        </button>
      </div>
    </footer>
  );
}
