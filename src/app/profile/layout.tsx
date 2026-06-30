import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View your Ask Me Why profile and reputation.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
