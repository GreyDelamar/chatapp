var io = require('socket.io')();

io.on("connection", function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
    });
});


module.exports = io;
