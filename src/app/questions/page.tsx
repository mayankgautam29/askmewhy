"use client";

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import QuestionCard from "@/components/questioncard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type Tag = { _id: string; name: string };
type Author = { _id: string; username: string; reputation: number };

type Question = {
  _id: string;
  title: string;
  tags: Tag[];
  author: Author;
  votes: number;
  answers: number;
  createdAt: string;
};

export default function QuestionPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/users/question");
        setQuestions(res.data.data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div className="text-white p-4">Loading questions...</div>;
  if (!questions.length) return <div className="text-red-500 p-4">No questions found.</div>;

  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <div className="flex justify-end">
        <Link href="/ask">
          <ShimmerButton>Add Question</ShimmerButton>
        </Link>
      </div>

      <div className="mt-10 space-y-6">
        {questions.map((question) => (
          <QuestionCard key={question._id} ques={question} />
        ))}
      </div>
    </div>
  );
}
