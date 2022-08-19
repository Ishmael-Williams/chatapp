const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const router = require("./router");
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });


// const io = Server(httpServer, {cors: {origin: "*",},});
// const io = socketio(server, {cors: {origin: "*",},});

// app.use(router);

// app.use(router, function(req, res, next){
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use( router,
  cors({
    origin: '*',
  }), 
  function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", ({name, room}) => {
    console.log(name, room);
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });
});

httpServer.listen(PORT, () =>
  console.log(`Server has started on port ${PORT}`)
);
