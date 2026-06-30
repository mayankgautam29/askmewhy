"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Sparkles, LogOut, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/questions", label: "Questions" },
  { href: "/ask", label: "Ask" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const [user, setUser] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        if (!cancelled) setUser(!!data?.user);
      } catch {
        if (!cancelled) setUser(false);
      }
    };
    fetchUser();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const handleLogout = async () => {
    await axios.get("/api/users/logout");
    setUser(false);
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/45 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/35">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-500/20 ring-1 ring-white/15 transition group-hover:ring-violet-400/40">
            <Sparkles className="h-4 w-4 text-violet-200" strokeWidth={2} />
          </span>
          <span className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-tight">
            Ask<span className="text-gradient-brand">MeWhy</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-white/10 text-white shadow-[0_0_24px_-8px_rgba(167,139,250,0.5)]"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-200"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition hover:text-white"
              >
                <UserRound className="h-4 w-4" />
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 hover:shadow-violet-500/40"
              >
                Join free
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] bg-black/80 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium",
                  pathname === item.href ? "bg-white/10 text-white" : "text-zinc-400"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-white/15 py-3 text-sm font-medium text-white"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl py-3 text-center text-sm font-medium text-zinc-300"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-center text-sm font-semibold text-white"
                >
                  Join free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
