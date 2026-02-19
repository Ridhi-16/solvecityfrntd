
import { io } from "socket.io-client";

const socket = io("https://solvecity-bcknd.onrender.com", {
  transports: ["websocket"],
  autoConnect: true
});

export default socket;
