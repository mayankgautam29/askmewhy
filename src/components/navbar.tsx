"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShinyButton } from "@/components/magicui/shiny-button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        if (data?.user) {
          setUser(true); // ✅ logged in
        } else {
          setUser(false); // ❌ not logged in
        }
      } catch (err) {
        setUser(false); // error = assume not logged in
      }
    };
    fetchUser();
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.get("/api/users/logout");
    setUser(false); // logout immediately in UI
    router.push("/");
  };

  return (
    <nav className=" sticky top-0 w-full py-4 px-6 flex items-center justify-between border-b border-white/10 bg-gray-850 bg-opacity-30 backdrop-blur-md dark:text-white">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg text-white">AskMeWhy</span>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <Link href="/" passHref>
              <ShinyButton className="text-white">Home</ShinyButton>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/questions" passHref>
              <ShinyButton className="text-white">Questions</ShinyButton>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/profile" passHref>
              <ShinyButton className="text-white">Profile</ShinyButton>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div>
        {user ? (
          <ShinyButton
            onClick={handleSubmit}
            type="button"
            className="text-white"
          >
            Logout
          </ShinyButton>
        ) : (
          <Link href="/login">
            <ShinyButton className="text-white">Login</ShinyButton>
          </Link>
        )}
      </div>
    </nav>
  );
}
