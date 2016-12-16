var mosca = require('mosca');
var mqtt_port=1883;
function start_mqtt(db_client)
{
	var MqttServer = new mosca.Server({
	    port: mqtt_port
	});
	
	MqttServer.on('clientConnected', function(client){
    console.log('client connected', client.id);
	});

	MqttServer.on('published', function(packet, client) {
    var topic = packet.topic;
    console.log('message-arrived--->','topic ='+topic+',message = '+ packet.payload.toString());
	});

	MqttServer.on('ready', function(){
    console.log('mqtt is running at 127.0.0.1:'+mqtt_port);
	    //MqttServer.authenticate = authenticate;
	});
	
}

exports.start_mqtt = start_mqtt;