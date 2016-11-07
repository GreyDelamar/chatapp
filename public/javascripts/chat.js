var socket = io()

$(function(){
  var $chat = $('#chatroom');
  var bottom = true;
  $('#setnick').submit(function(e){
    e.preventDefault();

    socket.emit('name-color',
    $('#nameColor').val());

    socket.emit('new-name',
    $('#nickname').val(), function(nme){
      if(nme){
        $('#name').hide();
        $('#chat').show();
        $('#chatBox').show();
      } else{
        $('#nameErr').html('That username is already taken')
      }
    });
    $('#nickname').val('');
  });

  socket.on('usernames', function(nme){
    var html = '';
    for(var i = 0; i<nme.nick.length; i++){
      html +=nme.nick[i] + '<br/>'
    };

    $('#users').html(html).addClass("username");
  });

  $('#chatBox').submit(function(f){
    socket.emit('message', $('#messaged').val());
    f.preventDefault();
    $('#messaged').val('');
  });




  $chat.bind('scroll', function () {
    var $scrollTop = $(this).scrollTop();
    var $innerHeight = $(this).innerHeight();
    var $scrollHeight = this.scrollHeight;
    bottom = $scrollTop + $innerHeight >= $scrollHeight ? true : false;
  });


  socket.on('newmessage', function(msg){
    var div = $('<div>');
    var nick = msg.nick;
    var mess = msg.mssg;
    var color = msg.color;
    var span = $('<span>').addClass("username").text(nick + ' : ').css('color', color);
    var span2 = $('<span>').text(mess);

    if (nick == undefined) {
      $('#name').show();
      $('#chat').hide();
    } else {
      div.append(span);
      div.append(span2);
      $('#messages').append(div);
    }

    if (bottom) {
      $chat.animate({scrollTop: $chat.prop("scrollHeight")}, 150);
    }
  });

})
