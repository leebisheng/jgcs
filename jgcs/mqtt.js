function mqtt_do(MqttServer,DBclient,io)
{

	MqttServer.on('clientConnected', function(client){
    console.log('client connected', client.id);
	});

	MqttServer.on('published', function(packet, client) {
    var topic = packet.topic;
    console.log('message-arrived--->','topic ='+topic+',message = '+ packet.payload.toString());
    if(topic.substr(0,1)!='$')
    {
    	var str='topic ='+topic+',message = '+ packet.payload.toString();
    	console.log(str);
    	io.emit('mqtt_message',str );
    }
    
	});

	MqttServer.on('ready', function(){
    console.log('mqtt is running ......');
	    //MqttServer.authenticate = authenticate;
	});
	
}

exports.mqtt_do = mqtt_do;