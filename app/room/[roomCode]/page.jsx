import RoomClient from "./room-client";

export default async function RoomPage({ params }) {
  const { roomCode } = await params; // ✅ THIS LINE IS MANDATORY

  return <RoomClient roomCode={roomCode} />;
}
