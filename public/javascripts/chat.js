var socket = io();




$(function(){
  $('form').submit(function(f){
    socket.emit('message', $('#messaged').val());
    f.preventDefault();
    $('#messaged').val('');
  });
  socket.on('message', function(msg){
    $('#messages').append($('<li>').text(msg));
    });
})
