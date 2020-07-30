var express = require('express');
var soccc = require('socket.io');
var app = express();
var server = app.listen(process.env.PORT || 3000);
app.use(express.static('public'));
var io = soccc(server);
io.sockets.on('connection', newConnection)

var count = 0;

function newConnection(socket){
  console.log("Connected: " + socket.id);
  count++;
  if(count == 1){
    socket.emit('three_time', 0);
  }else{
    socket.on('new_rotation', data=>{
      socket.broadcast.emit('update_rotation', data);
    });
  }
  
}



