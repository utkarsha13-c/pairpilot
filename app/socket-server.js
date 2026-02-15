import { Server } from "socket.io";

const io = new Server(3001, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log("✅ user connected", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log("🟢 joined room", roomId);
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-update", code);
  });

  socket.on("disconnect", () => {
    console.log("❌ user disconnected", socket.id);
  });
});
