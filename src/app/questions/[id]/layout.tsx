import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Question",
  description: "Read answers and join the discussion on Ask Me Why.",
};

export default function QuestionDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
