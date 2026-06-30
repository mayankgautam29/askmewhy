import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions",
  description: "Browse community questions, vote, and share answers on Ask Me Why.",
};

export default function QuestionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
