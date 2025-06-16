import React from "react";
import Link from "next/link";

type Tag = { _id: string; name: string };
type Author = { _id: string; username: string; reputation: number };
type QuestionProps = {
  ques: {
    _id: string;
    title: string;
    tags: Tag[];
    author: Author;
    votes: number;
    answers: any[];
    createdAt: string;
  };
};

export default function QuestionCard({ ques }: QuestionProps) {
  return (
    <div>
      
      <Link href={`/questions/${ques._id}`} className="block">
        <div className="border border-white/20 rounded-lg p-4 bg-black/30 text-white hover:bg-black/40 transition-all duration-200 cursor-pointer">
          <h2 className="text-xl font-semibold">{ques.title}</h2>

          <div className="flex gap-2 flex-wrap mt-2">
            {ques.tags.map((tag) => (
              <span
                key={tag._id}
                className="text-sm bg-purple-700/30 px-2 py-1 rounded-full text-purple-300"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <span>
              By: {ques.author?.username} (⭐ {ques.author?.reputation})
            </span>
            <span>{new Date(ques.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="mt-2 text-sm text-gray-300">
            <span>
              Votes: {ques.votes} | Answers: {ques.answers.length}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
