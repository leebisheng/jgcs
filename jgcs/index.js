var express = require('express');
var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');  //已经没有包含在express中，需要单独安装
var app = express();
var http = require('http').Server(app);
var router = express.Router();

var io = require('socket.io')(http);
var mosca = require('mosca');

var mqtt_port=1883;
var http_port = process.env.PORT || 80;
//构造连接数据库的连接字符串："tcp://用户名:密码@ip/相应的数据库名"
var DBconString = "tcp://postgres:postgres@localhost/klkjpgdb";
//----db-----
var pg = require('./pg'); //postgresql
//----mqtt-----
var mqtt = require("./mqtt");
//加载内部模块
var server = require("./server"); //HTTP 中间件

var mqtt = require("./mqtt");
var ws=require("./websocket");
var MqttServer = new mosca.Server({
	    port: mqtt_port
	});

//配置网页文件目录
app.set('views','./html');
//socket连接
io.on( "connection", function( socket ){
    console.log( "a http client connected" ); 
});
http.listen(http_port,function(){
    console.log('正在监听'+http_port+'端口');
});
//

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'html')));


//构造一个数据库对象
var postrgresql_client = new pg.Client(DBconString);  

//连接数据库，连接成功，执行回调函数
postrgresql_client.connect(function(error, results) {
    if(error){
            console.log('ClientConnectionReady Error: ' + error.message);
            postrgresql_client.end();
            return;
    }
    console.log("postrgresql_client.connect OK.\n");
    server.http_do(app,postrgresql_client); //http handle
    ws.ws_do(io,postrgresql_client);//websocket handle
    mqtt.mqtt_do(MqttServer,postrgresql_client,io);//mqqt server handle
    
});

