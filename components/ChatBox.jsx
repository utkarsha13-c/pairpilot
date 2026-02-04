"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ChatBox({ roomId, currentUser }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // Fetch existing messages for the room
  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("room_messages")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true });

      if (!error && data) setMessages(data);
    };

    fetchMessages();

    // Realtime listener for new messages
    const channel = supabase
      .channel(`room-${roomId}-chat`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "room_messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [roomId]);

  const sendMessage = async () => {
    if (!currentUser || !text.trim()) return;

    const { error } = await supabase.from("room_messages").insert([
      {
        room_id: roomId,
        sender_email: currentUser.email,
        content: text,
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      setText("");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2 border rounded">
      <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm">
            <strong>{msg.sender_email}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 p-1 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button
          className="px-3 bg-blue-500 text-white rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
