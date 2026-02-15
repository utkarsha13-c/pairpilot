"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/Socket";

export default function ChatBox({ roomId }) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat-message", (m) => {
      setMessages((prev) => [...prev, m]);
    });

    return () => socket.off("chat-message");
  }, []);

  const send = () => {
    if (!msg.trim()) return;
    socket.emit("chat-message", { roomId, text: msg });
    setMsg("");
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
        {messages.map((m, i) => (
          <div key={i}>{m.text}</div>
        ))}
      </div>

      <div style={{ display: "flex", padding: 8 }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
