var io = require('socket.io')();

io.on("connection", function(socket){
  console.log('a user connected');
  // socket.on("message", function(data){
  //   console.log(data)
  // })
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
    });
});


module.exports = io;
