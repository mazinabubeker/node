var express = require('express');
var soccc = require('socket.io');
var app = express();
var server = app.listen(process.env.PORT || 3000);
app.use(express.static('public'));
var io = soccc(server);
io.sockets.on('connection', newConnection)

var users = []

function newConnection(socket){
  console.log("Connected: " + socket.id);
  socket.on('new_user', username=>{
    console.log(username);
    users.push(username);
    console.log("ho");
    socket.broadcast.emit('new_user_resp', username);
    socket.emit('new_user_resp_2', username);
  });
}