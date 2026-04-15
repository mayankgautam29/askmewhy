"use client";

import Link from "next/link";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-auto w-full overflow-hidden border-t border-white/[0.08]">
      <RetroGrid
        className="absolute inset-0 z-0 opacity-40"
        angle={65}
        cellSize={56}
        opacity={0.35}
        lightLineColor="rgba(167, 139, 250, 0.35)"
        darkLineColor="rgba(15, 15, 25, 0.9)"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5 text-violet-300" />
              <span className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-tight">
                AskMeWhy
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              Ask hard questions. Share sharp answers. A community built for curious builders.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <Link href="/questions" className="transition hover:text-white">
                  Questions
                </Link>
              </li>
              <li>
                <Link href="/ask" className="transition hover:text-white">
                  Ask a question
                </Link>
              </li>
              <li>
                <Link href="/signup" className="transition hover:text-white">
                  Create account
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Account
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <Link href="/login" className="transition hover:text-white">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/profile" className="transition hover:text-white">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className="glass-panel flex flex-col justify-between gap-6 p-6 lg:min-h-[140px]">
            <p className="text-sm text-zinc-300">
              Ready to ship your next breakthrough answer?
            </p>
            <Link
              href="/ask"
              className="inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
            >
              Start asking
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-center sm:flex-row sm:text-left">
          <button
            type="button"
            onClick={() => {
              import("canvas-confetti").then((mod) =>
                mod.default({ spread: 70, particleCount: 80, origin: { y: 0.75 } })
              );
            }}
            className="text-xs text-zinc-500 transition hover:text-violet-300"
          >
            © {new Date().getFullYear()} Mayank Gautam · Ask Me Why
          </button>
          <span className="text-xs text-zinc-600">Built for developers who never stop asking why.</span>
        </div>
      </div>
    </footer>
  );
}
