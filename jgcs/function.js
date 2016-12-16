function select_scenes(client,response)
{
     //执行相应的sql语句
    client.query("select * from b_conf_scenes;",function(error,results)
    {
        console.log("in callback function.\n");
        if (error)
        {
            console.log("error");
            console.log('GetData Error: ' + error.message);
            client.end();
            return;
        }
        if(results.rowCount > 0)        {
            //callback(results);
            //指定为json格式输出
            response.writeHead(200,{"Content-Type":"application/json"});       

            //先将results 字符串内容转化成json格式，然后响应到浏览器上
						console.log("select_scenes 数据：   "+JSON.stringify(results));
 						response.write(JSON.stringify(results)); 
 						response.end(); 
 				} 
 				
 		});
}

function select_scenes_d(client,response)
{
     //执行相应的sql语句
    client.query("select * from b_conf_scenes;",function(error,results)
    {
        console.log("in callback function.\n");
        if (error)
        {
            console.log("error");
            console.log('GetData Error: ' + error.message);
            client.end();
            return;
        }
        if(results.rowCount > 0)        {
            
            //指定为json格式输出
            response.writeHead(200,{"Content-Type":"application/json"});       
    				
    				//由于前端不支持json嵌套,需要处理SENSOR成字符串值
    				var rowNum=results.rowCount;
    				
    				var res_data_json = new Array(); 
							for(var i=0;i<rowNum;i++)
							{
								var sensorValue="No sensor!";
								var sensor=results.rows[i].SENSOR;
								if(sensor != null)//SENSOR is object
								{
									sensorValue=JSON.stringify(sensor);
									
								}
								var  newJSON={};
								newJSON["ID"]=results.rows[i].ID;
								newJSON["NAME"]=results.rows[i].NAME;
								newJSON["DESC"]=results.rows[i].DESC;
								newJSON["SENSOR"]=sensorValue;
								newJSON["CREATE_TIME"]=results.rows[i].CREATE_TIME;
								
								res_data_json[i]=newJSON;
							}
							
           	var res_data_str="{\"data\":"+JSON.stringify(res_data_json)+"}";
           	console.log("select_scenes_d 数据：  "+res_data_str);
 						response.write(res_data_str); 
 						//var str={"data":[{"ID":"1","NAME":"2","DES":"3","SENSOR":"4","CREATE_TIME":"5"},
 						//								 {"ID":"2","NAME":"2","DES":"3","SENSOR":"4","CREATE_TIME":"5"}]};
 														 	
 						//				var str={"data":[{"ID":"1","NAME":"test scene 1","DESC":"te_____________________________________________________________st","SENSOR":null,"CREATE_TIME":"11:00:37"},{"ID":"2","NAME":"test2","DESC":"3传感器平均分布","SENSOR":{"sensors":[{"id":1,"angle":0},{"id":2,"angle":120},{"id":3,"angle":240}]},"CREATE_TIME":"11:00:40"}]};
 								
 						//console.log("select_scenes_d 数据：  "+JSON.stringify(str));
 						//response.write(JSON.stringify(str)); 
 					
 						response.end(); 
 				} 
 				
 		});
}
exports.select_scenes = select_scenes;
exports.select_scenes_d = select_scenes_d;