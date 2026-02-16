import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "https://pairpilot.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ user connected", socket.id);

  socket.on("join-room", (roomCode) => {
    socket.join(roomCode);
    console.log(`📦 joined room ${roomCode}`);
  });

  socket.on("code-change", ({ roomCode, code }) => {
    socket.to(roomCode).emit("code-update", code);
  });

  socket.on("disconnect", () => {
    console.log("❌ user disconnected", socket.id);
  });
});

/* 🔥 THIS LINE IS MANDATORY 🔥 */
httpServer.listen(3001, () => {
  console.log("🚀 Socket server running on 3002");
});
