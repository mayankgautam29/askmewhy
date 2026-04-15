"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BorderBeam } from "@/components/magicui/border-beam";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const questionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  tags: z.string().min(1, "At least one tag is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type QuestionData = z.infer<typeof questionSchema>;

export default function AskQuestionForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionData>({
    resolver: zodResolver(questionSchema),
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/users/profile");
        if (!res.data || !res.data.user) throw new Error("User not found");
      } catch {
        sessionStorage.setItem("flashMessage", "You must log in first");
        setTimeout(() => router.push("/login"), 0);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [router]);

  const onSubmit = async (data: QuestionData) => {
    const payload = {
      ...data,
      tags: data.tags.split(",").map((tag) => tag.trim()),
    };

    await axios.post("/api/users/questionask", payload);
    router.push("/questions");
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-zinc-500">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
          <p className="text-sm">Checking your session…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-300/80">
          <Sparkles className="h-3.5 w-3.5" />
          New thread
        </p>
        <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-white sm:text-4xl">
          Ask a question
        </h1>
        <p className="mt-2 text-zinc-500">
          Great questions include context, what you tried, and what you expected.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-px z-0 overflow-hidden rounded-2xl">
          <BorderBeam
            size={280}
            duration={12}
            delay={6}
            colorFrom="#f472b6"
            colorTo="#818cf8"
            className="rounded-2xl"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 flex flex-col gap-6 rounded-2xl border border-white/[0.1] bg-zinc-950/80 p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="space-y-2">
            <Label htmlFor="title" className="text-zinc-200">
              Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. How do closures work in JavaScript?"
              {...register("title")}
              className="h-11 border-white/10 bg-black/40 text-white placeholder:text-zinc-600"
            />
            {errors.title && <p className="text-sm text-red-400">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-zinc-200">
              Tags <span className="font-normal text-zinc-500">(comma-separated)</span>
            </Label>
            <Input
              id="tags"
              placeholder="javascript, closures, functions"
              {...register("tags")}
              className="h-11 border-white/10 bg-black/40 text-white placeholder:text-zinc-600"
            />
            {errors.tags && <p className="text-sm text-red-400">{errors.tags.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-zinc-200">
              Details
            </Label>
            <Textarea
              id="content"
              placeholder="Describe your question, include code or errors if relevant…"
              {...register("content")}
              className="min-h-40 border-white/10 bg-black/40 text-white placeholder:text-zinc-600"
            />
            {errors.content && (
              <p className="text-sm text-red-400">{errors.content.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="h-12 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110"
          >
            Publish question
          </button>
        </form>
      </div>
    </div>
  );
}
