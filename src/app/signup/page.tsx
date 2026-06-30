"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/magicui/border-beam";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  username: z.string().min(4, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type SignupData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [flash, setFlash] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    const msg = sessionStorage.getItem("flashMessage");
    if (msg) {
      setFlash(msg);
      sessionStorage.removeItem("flashMessage");
    }
  }, []);

  const onSubmit = async (data: SignupData) => {
    try {
      setSubmitting(true);
      await axios.post("/api/users/signup", data);
      router.push("/login");
    } catch {
      setFlash("Could not sign up. Try a different email or username.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-300/80">
          <Sparkles className="h-3.5 w-3.5" />
          Join AskMeWhy
        </p>
        <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-white">
          Create account
        </h1>
        <p className="mt-2 text-sm text-zinc-500">One minute to start asking and answering.</p>
      </div>

      <div className="relative">
        <div className="absolute -inset-px z-0 overflow-hidden rounded-2xl">
          <BorderBeam
            size={240}
            duration={10}
            delay={2}
            colorFrom="#22d3ee"
            colorTo="#c084fc"
            className="rounded-2xl"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 flex flex-col gap-6 rounded-2xl border border-white/[0.1] bg-zinc-950/80 p-8 shadow-2xl backdrop-blur-xl"
        >
          {flash && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-200">
              {flash}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="h-11 border-white/10 bg-black/40 text-white placeholder:text-zinc-600"
            />
            {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-zinc-200">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="handle"
              {...register("username")}
              className="h-11 border-white/10 bg-black/40 text-white placeholder:text-zinc-600"
            />
            {errors.username && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-200">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="h-11 border-white/10 bg-black/40 text-white placeholder:text-zinc-600"
            />
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="h-11 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating account…" : "Sign up"}
          </button>
          <p className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-violet-300 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
