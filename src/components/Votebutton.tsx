"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type VoteButtonProps = {
  targetId: string;
  targetType: "question" | "answer";
  initialScore: number;
};

export default function VoteButton({
  targetId,
  targetType,
  initialScore,
}: VoteButtonProps) {
  const [score, setScore] = useState(initialScore);
  const [voteStatus, setVoteStatus] = useState<"up" | "down" | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVote = async () => {
      try {
        const res = await axios.post("/api/users/getvote", {
          targetId,
          targetType,
        });
        setVoteStatus(res.data.voteType);
      } catch (err) {
        console.error("Failed to fetch vote status:", err);
      }
    };

    fetchVote();
  }, [targetId, targetType]);

  const handleVote = async (voteType: "up" | "down") => {
    try {
      const res = await axios.post(
        "/api/users/voteadd",
        { targetId, targetType, voteType },
        { withCredentials: true }
      );

      if (res.data.action === "voted") {
        setVoteStatus(voteType);
        setScore((prev) => (voteType === "up" ? prev + 1 : prev - 1));
      } else if (res.data.action === "removed") {
        setVoteStatus(null);
        setScore((prev) => (voteType === "up" ? prev - 1 : prev + 1));
      } else if (res.data.action === "switched") {
        setVoteStatus(voteType);
        setScore((prev) => (voteType === "up" ? prev + 2 : prev - 2));
      }
    } catch (error: unknown) {
      const err = error as { response?: { status?: number } };
      if (err.response?.status === 401) {
        sessionStorage.setItem("flashMessage", "You must log in first");
        setTimeout(() => router.push("/login"), 0);
      } else {
        console.error("Vote failed:", error);
      }
    }
  };

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col items-center gap-0.5 rounded-2xl border border-white/[0.08] bg-black/30 p-1.5 shadow-inner backdrop-blur-sm"
      )}
    >
      <button
        type="button"
        onClick={() => handleVote("up")}
        aria-label="Upvote"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl transition",
          voteStatus === "up"
            ? "bg-emerald-500/20 text-emerald-300"
            : "text-zinc-500 hover:bg-white/5 hover:text-emerald-300"
        )}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
      </button>
      <span className="min-w-[2rem] py-0.5 text-center text-sm font-semibold tabular-nums text-white">
        {score}
      </span>
      <button
        type="button"
        onClick={() => handleVote("down")}
        aria-label="Downvote"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl transition",
          voteStatus === "down"
            ? "bg-red-500/20 text-red-300"
            : "text-zinc-500 hover:bg-white/5 hover:text-red-300"
        )}
      >
        <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
