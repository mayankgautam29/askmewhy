import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask a Question",
  description: "Post a new question to the Ask Me Why community.",
};

export default function AskLayout({ children }: { children: React.ReactNode }) {
  return children;
}
