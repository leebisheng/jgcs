//----db-----
var pg = require('./pg'); //postgresql

//加载内部模块
var server = require("./server");
var router = require("./router");
var func = require("./function");
var mqtt = require("./mqtt");

//将url路径对应到相应的函数
var handle = {};
handle["/select_scenes"] = func.select_scenes;
handle["/select_scenes_d"] = func.select_scenes_d;
//构造连接数据库的连接字符串："tcp://用户名:密码@ip/相应的数据库名"
var DBconString = "tcp://postgres:postgres@localhost/klkjpgdb";
var postrgresql_client = new pg.Client(DBconString);  //构造一个数据库对象

//连接数据库，连接成功，执行回调函数
postrgresql_client.connect(function(error, results) {
     if(error){
            console.log('ClientConnectionReady Error: ' + error.message);
            postrgresql_client.end();
            return;
        }
        console.log("postrgresql_client.connect OK.\n");
    server.start_http(postrgresql_client,router.route,handle); //启动http server
    mqtt.start_mqtt(postrgresql_client);//启动mqqt server
    
});