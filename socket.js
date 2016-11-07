var io = require('socket.io')();
var nicknames = [];


io.on('connection', function(socket){

  socket.on('disconnect', function(){
    if(!socket.nickname) return;
      nicknames.splice(nicknames.indexOf(socket.nickname), 1);
      io.emit('usernames', nicknames);
  });
});

io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('newmessage', {mssg: msg, nick: socket.nickname, color: socket.colorname});
  });
  socket.on('new-name', function(nme, callback){
    if (nicknames.indexOf(nme) != -1){
      callback(false);
    } else{
      callback(true);
      socket.nickname = nme;
      nicknames.push(socket.nickname);
      io.emit('usernames', {nick: nicknames, color: socket.colorname});
    }
  });
  socket.on('name-color', function(color){
    socket.colorname = color
    io.emit('name-colored', color)
  });
});

module.exports = io;
