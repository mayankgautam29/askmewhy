"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { RainbowButton } from "./magicui/rainbow-button";
import { Textarea } from "./ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShimmerButton } from "./magicui/shimmer-button";
import { useRouter } from "next/navigation";
import VoteButton from "@/components/Votebutton";

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

  const delSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post("/api/users/delquestion", { id: question._id });
    router.push("/questions");
  };

  const delAnswer = async (e: any, answerId: string) => {
    e.preventDefault();
    await axios.post("/api/users/delanswer", { id: answerId });
    fetchQuestion(); // Refresh after delete
  };

  if (isLoading) return <div>Loading...</div>;
  if (!question) return <div>No question found</div>;

  return (
    <div>
      <section className="mt-10 px-10 py-20 bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] rounded-2xl shadow-xl max-w-5xl mx-auto">
        {/* Question Title, Author, Vote */}
        <div className="flex items-start gap-4 mb-6">
          <VoteButton
            targetId={question._id}
            targetType="question"
            initialScore={question.votes || 0}
          />
          <div>
            <h2 className="text-3xl font-bold">{question.title}</h2>
            <p className="mt-5">
              By: {question.author.username}
            </p>
            <p className="text-gray-400 mt-2"> <strong> {question.content} </strong></p>
          </div>
        </div>
        <div className="mb-4">
          {question.tags.map((tag: { _id: string; name: string }) => (
            <span
              key={tag._id}
              className="mr-2 px-2 py-1 bg-gray-800 text-white rounded"
            >
              #{tag.name}
            </span>
          ))}
          <div className="mt-10">
            {currentUser === question.author._id && (
              <form onSubmit={delSubmit}>
                <ShimmerButton type="submit">Delete question</ShimmerButton>
              </form>
            )}
          </div>
        </div>

        {/* Answers */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-white mb-4">Answers</h3>
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
                  className="bg-[#222] text-white rounded-lg p-4 mb-4 shadow"
                >
                  <div className="flex gap-4">
                    <VoteButton
                      targetId={ans._id}
                      targetType="answer"
                      initialScore={ans.votes || 0}
                    />
                    <p className="text-gray-300">{ans.content}</p>
                  </div>
                  <div className="text-sm text-gray-500 mt-2 flex justify-between">
                    <span>By: {ans.author?.username || "Unknown"}</span>
                    <span>
                      {new Date(ans.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    {currentUser === ans.author._id && (
                      <form onSubmit={(e) => delAnswer(e, ans._id)}>
                        <ShimmerButton type="submit">
                          Delete Answer
                        </ShimmerButton>
                      </form>
                    )}
                  </div>
                </div>
              )
            )
          ) : (
            <p className="text-gray-500">
              No answers yet. Be the first to answer!
            </p>
          )}
        </div>
        {currentUser ? (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            <Label htmlFor="content" className="text-white">
              Write Answer
            </Label>
            <Textarea
              id="content"
              placeholder="Write your answer in detail..."
              {...register("content")}
              className="mt-2"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
            <RainbowButton type="submit" className="mt-4 px-6 py-3 text-white">
              Submit Answer
            </RainbowButton>
          </form>
        ) : (
          <p className="text-gray-400 mt-6">
            <Link href="/login" className="text-blue-500 underline">
              Login
            </Link>{" "}
            to write an answer.
          </p>
        )}
      </section>
    </div>
  );
}
