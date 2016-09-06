var socket = io()
// var nicknames = $('<span>')

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
    $('#nickname').val('');;
  });

  // socket.on('name-colored', function(data){
  //
  // });

  socket.on('usernames', function(nme){
    var html = '';
    for(var i = 0; i<nme.length; i++){
      html +=nme[i] + '<br/>'
    };
    $('#users').html(html);
  });

  $('#chatBox').submit(function(f){
    socket.emit('message', $('#messaged').val());
    f.preventDefault();
    $('#messaged').val('');
  });


  var $chat = $('#chatroom');
  var bottom = true;

  $chat.bind('scroll', function () {
    var $scrollTop = $(this).scrollTop();
    var $innerHeight = $(this).innerHeight();
    var $scrollHeight = this.scrollHeight;
    bottom = $scrollTop + $innerHeight >= $scrollHeight ? true : false;
  });


  socket.on('newmessage', function(msg){

    $('#messages').append($('<div>').text(msg.nick+' : '+msg.mssg));

    if (bottom) {
      $chat.animate({scrollTop: $chat.prop("scrollHeight")}, 150);
    }
  });

})
