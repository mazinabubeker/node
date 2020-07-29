
var express = require('express');
var soccc = require('socket.io');
// var PORT = 3000;
var app = express();
var server = app.listen(process.env.PORT || 3000);
// const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
app.use(express.static('public'));
// app.use(express.json({limit: '1mb'}));
// app.post('/query_post', (req, res) => {
//   res.send(req.body);
//   res.end();
// });  
// app.get('/query_get', (req, res) => {
//   res.send(nextFlashTime.toString());
//   res.end();
// });


var io = soccc(server);
io.sockets.on('connection', newConnection)

function newConnection(socket){
  console.log("Connected: " + socket.id);
  socket.on('mouse', mouseUpdate);
  function mouseUpdate(data){
    console.log(data);
    socket.broadcast.emit('mouse', data);
  }
}




// app.get(url, onQuery(input, output));