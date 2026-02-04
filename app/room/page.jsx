'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoomEntry() {
  const [roomCode, setRoomCode] = useState('');
  const router = useRouter();

  const joinRoom = () => {
    if (roomCode.trim() !== '') {
      router.push(`/room/${roomCode}`);
    }
  };

  const createRoom = () => {
    const newCode = Math.random().toString(36).substring(2, 8); // random 6-char code
    router.push(`/room/${newCode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-r from-purple-700 to-indigo-900">
      <div className="p-8 bg-purple-800/50 rounded-lg shadow-lg flex flex-col gap-4 w-80">
        <h1 className="text-2xl font-bold text-white text-center">Room</h1>
        <input
          type="text"
          placeholder="Enter room code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="p-2 rounded text-black"
        />
        <button
          onClick={joinRoom}
          className="bg-green-500 text-black py-2 rounded hover:bg-green-600"
        >
          Join Room
        </button>
        <button
          onClick={createRoom}
          className="border border-white text-white py-2 rounded hover:bg-white/20"
        >
          Create New Room
        </button>
      </div>
    </div>
  );
}
