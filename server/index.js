const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const router = require("./router");

const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
// const io = Server(httpServer, {cors: {origin: "*",},});
// const io = socketio(server, {cors: {origin: "*",},});
app.use(router);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });
});

httpServer.listen(PORT, () =>
  console.log(`Server has started on port ${PORT}`)
);
