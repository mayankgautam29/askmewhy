"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [userdata, setUserdata] = useState<{
    username: string;
    email: string;
    reputation: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/api/users/profile");
        if (!res.data || !res.data.user) throw new Error("User not found");
        setUserdata(res.data.user);
      } catch (error) {
        sessionStorage.setItem("flashMessage", "You must log in first");
        setTimeout(() => router.push("/login"), 0);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [router]);

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  if (!userdata) return null;

  const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${userdata.username}`;

  return (
    <section className="flex justify-center items-center mt-20 px-4">
      {loading ? <p>Getting profile Data</p> : ""}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 max-w-xl w-full text-white text-center">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-purple-500 shadow-lg"
        />
        <h1 className="text-3xl font-bold mb-2">{userdata.username}</h1>
        <p className="text-sm text-gray-300 mb-1">📧 {userdata.email}</p>
        <p className="text-sm text-yellow-400">
          ⭐ Reputation: {userdata.reputation}
        </p>
        <div className="mt-6 border-t border-white/20 pt-4 text-sm text-gray-400">
          <p>
            Member since: <span className="font-medium">Soon™️</span>
          </p>
        </div>
      </div>
    </section>
  );
}
