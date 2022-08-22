//libraries
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

//Internal references
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

//Global constants
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    callback();
  });

  socket.on("disconnect", () => {
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
