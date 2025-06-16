"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter()

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
    } catch (error: any) {
      if (error.response?.status === 401) {
        sessionStorage.setItem("flashMessage", "You must log in first");
        setTimeout(() => router.push("/login"), 0);
      } else {
        console.error("Vote failed:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 mr-4 text-white">
      <button
        onClick={() => handleVote("up")}
        className={`hover:text-green-400 ${
          voteStatus === "up" ? "text-green-500" : ""
        }`}
      >
        <ArrowUp />
      </button>
      <span>{score}</span>
      <button
        onClick={() => handleVote("down")}
        className={`hover:text-red-400 ${
          voteStatus === "down" ? "text-red-500" : ""
        }`}
      >
        <ArrowDown />
      </button>
    </div>
  );
}
