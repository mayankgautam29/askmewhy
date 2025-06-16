"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShinyButton } from "@/components/magicui/shiny-button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
const questionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  tags: z.string().min(1, "At least one tag is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type QuestionData = z.infer<typeof questionSchema>;

export default function AskQuestionForm() {
  const router = useRouter();
  const [loading,setLoading] = useState(false)
  const [userdata,setUserdata] = useState("")
  const [flash,setFlash] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionData>({
    resolver: zodResolver(questionSchema),
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/api/users/profile");
        if (!res.data || !res.data.user) throw new Error("User not found");
      } catch (error) {
        sessionStorage.setItem("flashMessage", "You must log in first");
        setTimeout(() => router.push("/login"), 0);
      } finally {
        setLoading(false);
      }
    };
    getUserData()
  },[router])


  const onSubmit = async (data: QuestionData) => {
    const payload = {
      ...data,
      tags: data.tags.split(",").map(tag => tag.trim()),
    };

    await axios.post("/api/users/questionask", payload);
    router.push("/questions");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-20 px-6">
      <div className="relative">
        <div className="absolute -inset-1 z-0 rounded-2xl">
          <BorderBeam size={280} duration={12} delay={9} className="rounded-2xl" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 flex flex-col gap-6 rounded-2xl border border-white/20 bg-black/40 p-8 shadow-xl backdrop-blur"
        >
          <div>
            <Label htmlFor="title" className="text-white">Title</Label>
            <Input
              id="title"
              placeholder="e.g. How do closures work in JavaScript?"
              {...register("title")}
              className="mt-2"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="tags" className="text-white">Tags (comma-separated)</Label>
            <Input
              id="tags"
              placeholder="e.g. javascript, closures, functions"
              {...register("tags")}
              className="mt-2"
            />
            {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
          </div>
          <div>
            <Label htmlFor="content" className="text-white">Content</Label>
            <Textarea
              id="content"
              placeholder="Describe your question in detail..."
              {...register("content")}
              className="mt-2"
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>

          <ShinyButton type="submit" className="text-white self-center">
            Ask Question
          </ShinyButton>
        </form>
      </div>
    </div>
  );
}
