import socketio from "socket.io";
import { getDaily } from "./alphaAPIs";

export let io = null;

export const initSocketIO = server => {
  io = socketio.listen(server);
  io.on("connection", socket => {
    socket.on("dailyrequest", async function(symbol) {
      try {
        const dailyData = await getDaily(symbol);
        socket.emit("dailyReply", dailyData);
      } catch (error) {
        console.log(error);
      }
    });
  });
};
