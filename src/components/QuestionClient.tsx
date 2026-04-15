"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { RainbowButton } from "./magicui/rainbow-button";
import { Textarea } from "./ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShimmerButton } from "./magicui/shimmer-button";
import { useRouter } from "next/navigation";
import VoteButton from "@/components/Votebutton";
import { Calendar, Sparkles, Trash2 } from "lucide-react";

const answerSchema = z.object({
  content: z.string().min(5, "Answer should be longer than 5 characters"),
});

type QuestionData = z.infer<typeof answerSchema>;

export default function QuestionClient({ id }: { id: string }) {
  const [isLoading, setLoading] = useState(false);
  const [question, setQuestion] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuestionData>({
    resolver: zodResolver(answerSchema),
  });

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/questiondisplay", { id });
      setQuestion(res.data.data);
      setCurrentUser(res.data.userid || null);
    } catch (err) {
      console.error("Error fetching question:", err);
    } finally {
      setLoading(false);
    }
  };
  const AI_USER_ID = "6860cca69063b953bca49ec3";

  const onSubmit = async (data: QuestionData) => {
    try {
      await axios.post(
        "/api/users/answeradd",
        { content: data.content, question: id },
        { withCredentials: true }
      );
      reset();
      await fetchQuestion();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  useEffect(() => {
    if (id) fetchQuestion();
  }, [id]);

  const delSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/users/delquestion", { id: question._id });
    router.push("/questions");
  };

  const delAnswer = async (e: React.FormEvent, answerId: string) => {
    e.preventDefault();
    await axios.post("/api/users/delanswer", { id: answerId });
    fetchQuestion();
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center text-zinc-400 sm:px-6">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        <p className="mt-6 text-sm">Loading thread…</p>
      </div>
    );
  }
  if (!question) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <p className="text-zinc-400">No question found.</p>
        <Link href="/questions" className="mt-4 inline-block text-violet-300 hover:underline">
          Back to questions
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <Link
        href="/questions"
        className="mb-8 inline-flex text-sm font-medium text-zinc-500 transition hover:text-white"
      >
        ← All questions
      </Link>

      <article className="glass-panel relative overflow-hidden p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="relative flex gap-5 sm:gap-6">
          <VoteButton
            targetId={question._id}
            targetType="question"
            initialScore={question.votes || 0}
          />
          <div className="min-w-0 flex-1 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-widest text-violet-300/80">
              <Sparkles className="h-3.5 w-3.5" />
              Thread
            </div>
            <h1 className="font-[family-name:var(--font-syne)] text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {question.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
              <span>
                <span className="text-zinc-600">Asked by </span>
                <span className="font-medium text-zinc-300">{question.author.username}</span>
              </span>
              <span className="hidden sm:inline text-zinc-700">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(question.createdAt).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-black/25 p-5 text-zinc-200 leading-relaxed">
              {question.content}
            </div>
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag: { _id: string; name: string }) => (
                <span
                  key={tag._id}
                  className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            {currentUser === question.author._id && (
              <form onSubmit={delSubmit}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete question
                </button>
              </form>
            )}
          </div>
        </div>
      </article>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-white">
          Answers
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          {question.answers?.length ?? 0}{" "}
          {(question.answers?.length ?? 0) === 1 ? "reply" : "replies"}
        </p>

        <div className="mt-8 space-y-4">
          {question.answers?.length > 0 ? (
            question.answers.map(
              (
                ans: {
                  _id: string;
                  content: string;
                  author: { _id: string; username: string };
                  createdAt: string;
                  votes?: number;
                },
                index: number
              ) => (
                <div
                  key={ans._id || index}
                  className="glass-panel glass-panel-hover relative overflow-hidden p-5 sm:p-6"
                >
                  {ans.author._id === AI_USER_ID && (
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
                      AskMeWhy AI
                    </div>
                  )}
                  <div className="flex gap-4 sm:gap-5">
                    <VoteButton
                      targetId={ans._id}
                      targetType="answer"
                      initialScore={ans.votes || 0}
                    />
                    <div className="min-w-0 flex-1 space-y-4">
                      <p className="leading-relaxed text-zinc-200">{ans.content}</p>
                      <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                        <span>
                          <span className="text-zinc-600">By </span>
                          <span className="font-medium text-zinc-300">
                            {ans.author?.username || "Unknown"}
                          </span>
                        </span>
                        <span className="text-zinc-600">
                          {new Date(ans.createdAt).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                        {currentUser === ans.author._id && (
                          <form onSubmit={(e) => delAnswer(e, ans._id)} className="sm:ml-auto">
                            <ShimmerButton type="submit" className="text-xs">
                              Delete answer
                            </ShimmerButton>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="glass-panel px-6 py-12 text-center text-zinc-500">
              No answers yet. Be the first to help out.
            </div>
          )}
        </div>

        {currentUser ? (
          <form onSubmit={handleSubmit(onSubmit)} className="glass-panel mt-10 space-y-4 p-6 sm:p-8">
            <Label htmlFor="content" className="text-sm font-medium text-zinc-200">
              Your answer
            </Label>
            <Textarea
              id="content"
              placeholder="Share what you know—examples and trade-offs welcome."
              {...register("content")}
              className="min-h-32 border-white/10 bg-black/30 text-zinc-100 placeholder:text-zinc-600"
            />
            {errors.content && (
              <p className="text-sm text-red-400">{errors.content.message}</p>
            )}
            <RainbowButton type="submit" className="px-8 py-3 text-sm font-semibold text-white">
              Post answer
            </RainbowButton>
          </form>
        ) : (
          <div className="glass-panel mt-10 p-6 text-center text-zinc-400">
            <Link href="/login" className="font-semibold text-violet-300 hover:underline">
              Sign in
            </Link>{" "}
            to share an answer.
          </div>
        )}
      </section>
    </div>
  );
}
