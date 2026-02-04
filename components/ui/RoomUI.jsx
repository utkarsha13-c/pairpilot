"use client";

import CodeEditor from "./CodeEditor";
import ChatBox from "../ChatBox";

export default function RoomUI({ roomCode, user }) {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-black text-white p-3">
        PairPilot 🚀 | Room: {roomCode}
      </div>

      <div className="flex flex-1">
        <div className="w-2/3">
          <CodeEditor roomCode={roomCode} />
        </div>
        <div className="w-1/3 border-l">
          <ChatBox roomCode={roomCode} user={user} />
        </div>
      </div>
    </div>
  );
}
