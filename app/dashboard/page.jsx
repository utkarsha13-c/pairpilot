"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";


export default function Dashboard() {
  // ✅ router yahin hona chahiye
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/login");
      }
    };
    checkUser();
  }, [router]);

  // ✅ button handler
  const handleGoToRoom = () => {
    router.push("/room");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-[400px] text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          PairPilot 🚀
        </h1>
        <p className="text-gray-300 mb-6">
          Your AI-powered pair programming partner
        </p>

        <button
          onClick={handleGoToRoom}
          className="w-full py-3 rounded-lg bg-emerald-500 font-semibold hover:bg-emerald-400 transition mb-3"
        >
          Create / Join Room
        </button>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
          className="w-full py-3 rounded-lg border border-white/30 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
