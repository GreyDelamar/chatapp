var socket = io();




$(function(){
  $('form').submit(function(f){
    socket.emit('message', $('#messaged').val());
    f.preventDefault();
    $('#messaged').val('');
  });
  socket.on('message', function(msg){
    $('#messages').append($('<div>').text(msg));
    });
   $('#setname').click(function(){
   socket.emit("set_name", {name: $('#nickname').val()});
   });
})
