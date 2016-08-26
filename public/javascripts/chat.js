var socket = io();




$(function(){
  $('form').submit(function(f){
    socket.emit('message', $('#messaged').val());
    f.preventDefault();
  });
  socket.on('message', function(msg){
    $('#messages').append($('<div>').text(msg));
  });

})
