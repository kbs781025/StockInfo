import socketio from "socket.io";

export const initSocketIO = server => {
  const io = socketio.listen(server);
  io.on("connection", socket => {
    console.log(socket);
    socket.emit("Event", "Hello");
  });
};
