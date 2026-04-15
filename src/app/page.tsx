"use client";

import { IconCloud } from "@/components/magicui/icon-cloud";
import Link from "next/link";
import { ArrowRight, MessageCircleQuestion, MessagesSquare, Trophy } from "lucide-react";
import { motion } from "motion/react";

const categories = [
  "JavaScript",
  "React",
  "Next.js",
  "MongoDB",
  "Express",
  "TypeScript",
  "Node.js",
  "Firebase",
];

const steps = [
  {
    title: "Ask with clarity",
    body: "Frame the problem, share context, and get eyes from builders who have been there.",
    icon: MessageCircleQuestion,
  },
  {
    title: "Answer with generosity",
    body: "Pay it forward with explanations that level everyone up—not just the person who asked.",
    icon: MessagesSquare,
  },
  {
    title: "Earn recognition",
    body: "Quality rises. Votes and reputation spotlight the people who consistently help.",
    icon: Trophy,
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        <section className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <motion.div
            className="max-w-2xl space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-violet-200/90">
              Community Q&amp;A
            </p>
            <h1 className="font-[family-name:var(--font-syne)] text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-gradient-subtle">Questions worth asking.</span>
              <br />
              <span className="text-gradient-brand">Answers worth reading.</span>
            </h1>
            <p className="text-lg leading-relaxed text-zinc-400 sm:text-xl">
              AskMeWhy is your launchpad for technical depth—fast answers, thoughtful threads, and a
              culture of curiosity.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <Link
                href="/questions"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/30 transition hover:brightness-110"
              >
                Browse questions
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/ask"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/25 hover:bg-white/10"
              >
                Ask something
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-sm text-zinc-500 lg:justify-start">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
                Live threads
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.7)]" />
                Reputation &amp; votes
              </span>
            </div>
          </motion.div>

          <motion.div
            className="relative flex h-[min(420px,70vw)] w-[min(420px,90vw)] shrink-0 items-center justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-violet-600/25 via-transparent to-cyan-500/20 blur-3xl" />
            <div className="relative h-full w-full">
              <IconCloud
                images={[
                  "https://cdn.simpleicons.org/react/react",
                  "https://cdn.simpleicons.org/nextdotjs/nextdotjs",
                  "https://cdn.simpleicons.org/typescript/typescript",
                  "https://cdn.simpleicons.org/javascript/javascript",
                  "https://cdn.simpleicons.org/mongodb/mongodb",
                  "https://cdn.simpleicons.org/firebase/firebase",
                  "https://cdn.simpleicons.org/express/express",
                ]}
              />
            </div>
          </motion.div>
        </section>

        <section className="mt-28 space-y-10">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight sm:text-4xl">
              Stack you already use
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-zinc-400">
              Jump into topics that match your toolchain—tags keep signal high and noise low.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="glass-panel glass-panel-hover flex items-center justify-center px-4 py-5 text-center text-sm font-medium text-zinc-200"
              >
                {category}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-28">
          <div className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-zinc-400">
              Three beats: ask, answer, ascend. Everything else is optional flair.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="glass-panel glass-panel-hover group relative overflow-hidden p-8"
              >
                <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 p-3 ring-1 ring-white/10">
                  <step.icon className="h-6 w-6 text-violet-200" strokeWidth={1.75} />
                </div>
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{step.body}</p>
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition group-hover:bg-violet-500/20" />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="relative mt-28 overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-violet-950/80 via-zinc-950/90 to-fuchsia-950/50 p-10 text-center shadow-[0_0_80px_-20px_rgba(139,92,246,0.45)] sm:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(167,139,250,0.25),transparent_55%)]" />
          <div className="relative mx-auto max-w-2xl space-y-6">
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight sm:text-4xl">
              Join the orbit
            </h2>
            <p className="text-zinc-300">
              Create a free account, follow threads you care about, and make your next answer the one
              people bookmark.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg transition hover:bg-zinc-100 sm:w-auto"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                I already have one
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
