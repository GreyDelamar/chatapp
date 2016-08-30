var socket = io()


$(function(){
  $('#setnick').submit(function(e){
    e.preventDefault();
    socket.emit('new-name', $('#nickname').val(), function(nme){
      if(nme){
        $('#name').hide();
        $('#chat').show();
        $('#chatBox').show();
      } else{
        $('#nameErr').html('That user name is already taken')
      }
    });
    $('#nickname').val('');
  });

  socket.on('usernames', function(nme){
    var html = '';
    for(var i = 0; i<nme.length; i++){
      html +=nme[i] + '<br/>'
    };
    $('#users').html(html);
  })

  $('#chatBox').submit(function(f){
    socket.emit('message', $('#messaged').val());
    f.preventDefault();
    $('#messaged').val('');
  });

  socket.on('newmessage', function(msg){
    $('#messages').append($('<div>').text(msg.nick+' : '+msg.mssg));
  });

})


// $('#nickname')
