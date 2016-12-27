function ws_do(io,DBclient)
{

	io.on('connection', function(socket){
  	console.log('a socket client connected');
  	socket.emit('message','Hello client');
  	socket.on('message', function(msg){
    	console.log('message: ' + msg);
    	io.emit('message', msg);
  	});
  	socket.on('disconnect', function(){
    	console.log('a socket client  disconnected');
  	});
  	
  	socket.on('SubTopic', function(msg){
    	console.log("Received  SubTopic:"+msg);
    	
  	});
	});
	

}

exports.ws_do = ws_do;	
