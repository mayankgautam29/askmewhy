import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join Ask Me Why and start asking or answering questions.",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
