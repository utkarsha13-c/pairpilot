"use client";

import { useEffect } from "react";
import { socket } from "@/lib/Socket";
import CodeEditor from "@/components/ui/CodeEditor";
import ChatBox from "@/components/ChatBox";

export default function RoomClient({ roomCode }) {
  useEffect(() => {
    socket.connect();
    socket.emit("join-room", roomCode);

    return () => {
      socket.disconnect();
    };
  }, [roomCode]);

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <CodeEditor />
      </div>
      <ChatBox />
    </div>
  );
}
