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
        if(results.rowCount > 0)
        {
            //callback(results);
            //指定为json格式输出
            response.writeHead(200,{"Content-Type":"application/json"});       

            //先将results 字符串内容转化成json格式，然后响应到浏览器上
console.log("JSON.stringify(results)  "+JSON.stringify(results));
 						response.write(JSON.stringify(results)); 
 						response.end(); 
 				} 
 				
 		});
}

exports.select_scenes = select_scenes;