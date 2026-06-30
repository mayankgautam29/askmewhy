import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-300/80">
        <Sparkles className="h-3.5 w-3.5" />
        404
      </p>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-white sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110"
        >
          Go home
        </Link>
        <Link
          href="/questions"
          className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Browse questions
        </Link>
      </div>
    </div>
  );
}
