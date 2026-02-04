"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export default function ChatBox() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat-message", (m) => {
      setMessages((prev) => [...prev, m]);
    });

    return () => socket.off("chat-message");
  }, []);

  const send = () => {
    socket.emit("chat-message", msg);
    setMsg("");
  };

  return (
    <div className="w-1/3 p-3 bg-gray-900 text-white">
      {messages.map((m, i) => (
        <div key={i}>{m}</div>
      ))}
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        className="text-black"
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
