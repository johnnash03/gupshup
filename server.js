var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;
let users = {};

io.sockets.on('connection', function (socket) {
  socket.on('join', function (data) {
    console.log(`${data.userName} joined`);
    console.log(socket.id);
    users[data.userName] = socket;
    // socket.join(data.username); // We are using room of socket io
    // socket.emit('join', data);
    // socket.broadcast.emit('join', data);
    io.emit('join', data);
  });

  socket.on('chat message', function(data){
    // io.emit('chat message', data.msg);
    // console.log("msg", msg)
    // io.sockets.in(data.username).emit('new_msg', {msg: data.msg});
    // io.sockets.in("John").emit('chat message', {msg: data.msg});
    console.log("data", data)
    // socket.emit('chat message', data);
    users[data.to].emit('chat message', data);
    // users["Doe"].emit('chat message', { msg: data.msg });
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
