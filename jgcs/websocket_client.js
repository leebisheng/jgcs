$(function () {
var content = $('#content');
var status = $('#status');
var input = $('#input');
var myName = false;

//建立websocket连接
var socket = io();

//收到server的信息
socket.on('msg',function(json){
status.text('Choose a name:');
});

	 $('form').submit(function(){
    socket.emit('message', $('#m').val());
    $('#m').val('');
    return false;
  });
   socket.on('message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
  
  socket.on('mqtt_message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});