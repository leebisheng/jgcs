$(function () {
var content = $('#content');
var status = $('#status');
var input = $('#input');
var myName = false;

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
  socket.on('topic_json', function(msg){
    $('#messages').append($('<li>').text(msg));
    var jsonMes=JSON.parse(msg);
    UpdateSensorData(jsonMes);
  });
   
});

