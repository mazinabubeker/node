var express = require('express');
var soccc = require('socket.io');
var app = express();
var server = app.listen(process.env.PORT || 3000);
app.use(express.static('public'));
var io = soccc(server);
io.sockets.on('connection', newConnection)

function newConnection(socket){
  console.log("Connected: " + socket.id);

}



