const io = require("socket.io")();
const socketapi = {
  io: io,
};

const connectionId = [];
const connectionNames = [];

io.on("connection", function (socket) {
  console.log("Total" + connectionId.length + " users have joined the chat");

  socket.on("disconnect", function () {
    let indexOfDisconnectedUser = connectionId.indexOf(socket.id);
    connectionId.splice(indexOfDisconnectedUser, 1);
    connectionNames.splice(indexOfDisconnectedUser, 1);
  });

  socket.on("name", function (name) {
    connectionId.push(socket.id);
    connectionNames.push(name);
  });

  socket.on("msg", function (data) {
    var username = connectionNames[connectionId.indexOf(socket.id)];
    io.emit("msg", username, data);
  });
});

module.exports = socketapi;
