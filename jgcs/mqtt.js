function mqtt_do(MqttServer,DBclient,io)
{

	MqttServer.on('clientConnected', function(client){
    console.log('client connected', client.id);
	});

	MqttServer.on('published', function(packet, client) {
    var topic = packet.topic;
    var strMes='-->topic ='+topic+' message = '+ packet.payload.toString()
    console.log(strMes);
    if(topic.substr(0,1)!='$')
    {
    	if(topic.indexOf('magnetic')>-1)
    	{
    		var jsonMes=JSON.parse(packet.payload.toString());
    		jsonMes["topic"]=topic;
    		io.emit('topic_json',JSON.stringify(jsonMes) );
    		console.log("topic_json  -->");
    		
    	}
    	else{
    		io.emit('mqtt_message',strMes);
    	}
    	
    }
    else
    {
    		
    }
    
	});

	MqttServer.on('ready', function(){
    console.log('mqtt is running ......');
	    //MqttServer.authenticate = authenticate;
	});
	
}

exports.mqtt_do = mqtt_do;