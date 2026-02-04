"use client";
import { useEffect, useState } from "react";
import { socket } from "@/lib/Socket";
import CodeEditor from "@/components/ui/CodeEditor";

export default function RoomClient({ roomCode }) {
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.emit("join-room", roomCode);

    socket.on("code-update", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off("code-update");
    };
  }, [roomCode]);

  return <CodeEditor value={code} roomCode={roomCode} setCode={setCode} />;
}
