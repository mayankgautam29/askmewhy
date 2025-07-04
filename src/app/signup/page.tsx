"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShinyButton } from "@/components/magicui/shiny-button";
import axios from "axios"
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  username: z.string().min(4,"Username is required"),
  password: z.string().min(1, "Password is required"),

});

type Signupdata = z.infer<typeof loginSchema>;

export default function LoginForm() {

  const router = useRouter()

  const[flash,setFlash] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signupdata>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
      const msg = sessionStorage.getItem("flashMessage");
      if (msg) {
        setFlash(msg);
        sessionStorage.removeItem("flashMessage");
      }
    }, []);

  const onSubmit = async (data: Signupdata) => {
    try {
      const value = await axios.post("/api/users/signup",data)
      router.push("/login")
    } catch (error:any) {
      return error.message
    }

  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-20 px-6">
      <div className="relative">
        <div className="absolute -inset-1 z-0 rounded-2xl">
          <BorderBeam
            size={220}
            duration={12}
            delay={9}
            className="rounded-2xl"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 flex flex-col gap-6 rounded-2xl border border-white/20 bg-black/40 p-8 shadow-xl backdrop-blur"
        >
          {flash && (
            <div className="text-red-400 text-center text-sm bg-white/10 border border-red-500/30 rounded p-2">
              {flash}
            </div>
          )}
          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="mt-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="username" className="text-white">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("username")}
              className="mt-2"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="mt-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <ShinyButton type="submit" className="text-white self-center">
            SignUp
          </ShinyButton>
        </form>
      </div>
    </div>
  );
}
