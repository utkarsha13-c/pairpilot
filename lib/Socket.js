import { io } from "socket.io-client";

export const socket = io("https://pairpilot-4esd.onrender.com", {
  transports: ["websocket"],
});
