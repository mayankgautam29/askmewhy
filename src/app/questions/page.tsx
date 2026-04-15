"use client";

import QuestionCard from "@/components/questioncard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Sparkles } from "lucide-react";

type Tag = { _id: string; name: string };
type Author = { _id: string; username: string; reputation: number };

type Question = {
  _id: string;
  title: string;
  tags: Tag[];
  author: Author;
  votes: number;
  answers: unknown[] | number;
  createdAt: string;
};

function QuestionListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="glass-panel h-36 animate-pulse bg-white/[0.02]"
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

export default function QuestionPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/users/question");
        setQuestions(res.data.data ?? []);
      } catch {
        setError("Could not load questions. Try again in a moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-300/80">
            <Sparkles className="h-3.5 w-3.5" />
            Community feed
          </p>
          <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Questions
          </h1>
          <p className="max-w-lg text-zinc-400">
            Fresh threads from builders like you—vote, answer, or start your own.
          </p>
        </div>
        <Link
          href="/ask"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110"
        >
          <Plus className="h-4 w-4" />
          New question
        </Link>
      </div>

      <div className="mt-12">
        {loading && <QuestionListSkeleton />}
        {error && (
          <div className="glass-panel border-red-500/20 bg-red-500/5 p-6 text-center text-red-200">
            {error}
          </div>
        )}
        {!loading && !error && questions.length === 0 && (
          <div className="glass-panel px-8 py-16 text-center">
            <p className="font-[family-name:var(--font-syne)] text-xl font-semibold text-white">
              Quiet in here
            </p>
            <p className="mx-auto mt-2 max-w-md text-zinc-400">
              Be the first to ask something the community can rally around.
            </p>
            <Link
              href="/ask"
              className="mt-8 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ask the first question
            </Link>
          </div>
        )}
        {!loading && !error && questions.length > 0 && (
          <div className="space-y-4">
            {questions.map((question) => (
              <QuestionCard key={question._id} ques={question} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
