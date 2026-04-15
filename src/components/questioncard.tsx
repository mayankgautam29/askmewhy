import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Tag = { _id: string; name: string };
type Author = { _id: string; username: string; reputation: number };
type QuestionProps = {
  ques: {
    _id: string;
    title: string;
    tags: Tag[];
    author: Author;
    votes: number;
    answers: unknown[] | number;
    createdAt: string;
  };
};

function answerCount(answers: unknown[] | number): number {
  if (Array.isArray(answers)) return answers.length;
  return typeof answers === "number" ? answers : 0;
}

export default function QuestionCard({ ques }: QuestionProps) {
  const votes = ques.votes ?? 0;
  const answers = answerCount(ques.answers);

  return (
    <Link href={`/questions/${ques._id}`} className="group block">
      <article
        className={cn(
          "glass-panel glass-panel-hover relative overflow-hidden p-6 sm:p-7",
          "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-violet-500/0 before:to-cyan-500/0 before:opacity-0 before:transition-opacity",
          "group-hover:before:opacity-100 group-hover:before:from-violet-500/[0.07] group-hover:before:to-cyan-500/[0.04]"
        )}
      >
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1 space-y-3">
            <h2 className="font-[family-name:var(--font-syne)] text-lg font-bold leading-snug text-white transition group-hover:text-violet-100 sm:text-xl">
              {ques.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {ques.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-200/90"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition group-hover:border-violet-400/30 group-hover:text-white sm:flex">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>

        <div className="relative mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.06] pt-5 text-sm text-zinc-500">
          <span className="text-zinc-400">
            <span className="text-zinc-500">By </span>
            <span className="font-medium text-zinc-200">{ques.author?.username}</span>
            <span className="text-amber-200/80"> · ★ {ques.author?.reputation ?? 0}</span>
          </span>
          <span>{new Date(ques.createdAt).toLocaleDateString(undefined, { dateStyle: "medium" })}</span>
          <span className="inline-flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4 text-zinc-600" />
            {answers} {answers === 1 ? "answer" : "answers"}
          </span>
          <span className="font-medium text-violet-300/90">{votes} votes</span>
        </div>
      </article>
    </Link>
  );
}
