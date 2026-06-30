"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Award, Mail, Sparkles } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const [userdata, setUserdata] = useState<{
    username: string;
    email: string;
    reputation: number;
    createdAt?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/users/profile");
        if (!res.data || !res.data.user) throw new Error("User not found");
        setUserdata(res.data.user);
      } catch {
        sessionStorage.setItem("flashMessage", "You must log in first");
        setTimeout(() => router.push("/login"), 0);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-zinc-500">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        <p className="text-sm">Loading profile…</p>
      </div>
    );
  }

  if (!userdata) return null;

  const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(userdata.username)}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center sm:text-left">
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-300/80">
          <Sparkles className="h-3.5 w-3.5" />
          Your space
        </p>
        <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-white sm:text-4xl">
          Profile
        </h1>
      </div>

      <div className="glass-panel relative overflow-hidden p-8 sm:p-10">
        <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 opacity-70 blur-sm" />
            <img
              src={avatarUrl}
              alt={`Avatar for ${userdata.username}`}
              width={112}
              height={112}
              className="relative h-28 w-28 rounded-full object-cover ring-4 ring-zinc-950"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-6 text-center sm:text-left">
            <div>
              <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-white">
                {userdata.username}
              </h2>
              <p className="mt-2 inline-flex items-center justify-center gap-2 text-sm text-zinc-400 sm:justify-start">
                <Mail className="h-4 w-4 shrink-0 text-zinc-600" />
                {userdata.email}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                <div className="flex items-center gap-2 text-amber-200/90">
                  <Award className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Reputation</span>
                </div>
                <p className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold text-white">
                  {userdata.reputation}
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-black/30 p-5 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Member since
                </p>
                <p className="mt-3 text-lg font-medium text-zinc-300">
                  {userdata.createdAt
                    ? new Date(userdata.createdAt).toLocaleDateString(undefined, {
                        month: "long",
                        year: "numeric",
                      })
                    : "Recently joined"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
