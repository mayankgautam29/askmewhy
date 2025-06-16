"use client";

import { useEffect, useRef, useState } from "react";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { Marquee } from "@/components/magicui/marquee";
import Link from "next/link";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useRouter } from "next/navigation";

type Q = { _id: string; title: string };

export default function HomePage() {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">

      <div className="relative z-10 pt-15 px-6 lg:px-20">
        <section className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12 py-10">
          <div className="max-w-2xl space-y-5">
            <h1 className="text-5xl font-extrabold leading-tight">
              AskMeWhy: Your Gateway to Technical Knowledge
            </h1>
            <p className="text-lg text-gray-400">
              A place to ask, answer, and grow. Tap into a global developer
              community.
            </p>
            <Link href="/questions">
              <ShinyButton className="text-white px-6 py-2">
                Browse Questions
              </ShinyButton>
            </Link>
          </div>

          <div className="relative h-[300px] w-[300px] lg:h-[400px] lg:w-[400px]">
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
        </section>
        <section className="py-16 max-w-7xl mx-auto space-y-10">
          <h2 className="text-3xl font-semibold text-center">Top Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
            {[
              "JavaScript",
              "React",
              "Next.js",
              "MongoDB",
              "Express",
              "TypeScript",
              "Node.js",
              "Firebase",
            ].map((category) => (
              <ShinyButton key={category}>{category}</ShinyButton>
            ))}
          </div>
        </section>
        <section className="py-16 max-w-5xl mx-auto space-y-12 text-center">
          <h2 className="text-3xl font-semibold">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="font-bold text-xl mb-2">🧠 Ask Questions</h3>
              <p className="text-gray-400">
                Stuck? Post a question and get help from developers worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">💬 Give Answers</h3>
              <p className="text-gray-400">
                Help others by answering what you know. Build your rep and give
                back.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">
                🚀 Build Your Reputation
              </h3>
              <p className="text-gray-400">
                Earn points and respect. Get noticed for your expertise and
                engagement.
              </p>
            </div>
          </div>
        </section>
        <section className="text-center py-20 bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] rounded-2xl shadow-xl max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Join the Community</h2>
          <p className="text-gray-400 mb-6">
            Sign up now and start sharing knowledge with developers worldwide.
          </p>
          <Link href="/signup">
            <RainbowButton className="text-white px-8 py-5">Sign Up</RainbowButton>
          </Link>
        </section>
      </div>

      <div className="h-[500px]" />
    </main>
  );
}
