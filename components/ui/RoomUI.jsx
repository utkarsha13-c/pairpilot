"use client";

import { useEffect } from "react";
import CodeEditor from "@/components/ui/CodeEditor";
import ChatBox from "@/components/ChatBox";
import { socket } from "@/lib/Socket";

export default function RoomUI({ roomCode }) {
  useEffect(() => {
    socket.emit("join-room", roomCode);
    console.log("📦 joined room", roomCode);
  }, [roomCode]);

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <CodeEditor roomId={roomCode} />
      </div>

      <div style={{ width: 320, borderLeft: "1px solid #333" }}>
        <ChatBox roomId={roomCode} />
      </div>
    </div>
  );
}
