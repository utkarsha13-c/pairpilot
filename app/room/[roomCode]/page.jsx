import RoomUI from "@/components/ui/RoomUI";

export default async function RoomPage({ params }) {
  const { roomCode } = await params; // ✅ THIS LINE IS MANDATORY

  return <RoomUI roomCode={roomCode} />;
}
