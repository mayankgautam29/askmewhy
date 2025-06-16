import QuestionClient from "@/components/QuestionClient";
import { use } from "react";

export default function Page(paramsWrapper: { params: Promise<{ id: string }> }) {
  const { id } = use(paramsWrapper.params);
  return <QuestionClient id={id} />;
}
