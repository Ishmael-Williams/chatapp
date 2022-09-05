//libraries
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

//Internal references
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const { getInputAdornmentUtilityClass } = require("@mui/material");

//Global constants
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(router);
/*Events such as 'io.on()' are for user generated events, function takes parameters:
        1. keyword as a string
        2. callback function
  */
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    console.log("User has joined");
    // console.log('Name: ' + name + '\nRoom: ' + room);
    console.log(
      `user: ${user} \nuser.room: ${user.room} \nuser.name: ${user.name}`
    );

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });

    socket.join(user.room);
    //refers to error callback on client side, but no error argument is passed
    //so no error is emitted on the frontend
    callback();
  });

  //Wait for sendMessage event to be emitted by client
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {});
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
