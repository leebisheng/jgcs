var http = require('http');
var url = require('url');

function start(client,route,handle)
{
	// 创建服务器
	http.createServer( function (request, response) 
	{  
	   // 解析请求，包括文件名
	   var pathname = url.parse(request.url).pathname;
	  
	   if (pathname.length==1) pathname="/index.html"; //libs:可以不用输入路径，但是默认用index.html
	  	
	   // 输出请求的文件名
	   console.log("Request for " + pathname + " received.");
		   
	   route(client,handle,pathname,response);
	   
	}).listen(80);

	// 控制台会输出以下信息
	console.log('Server running at http://127.0.0.1:80/');
}

exports.start = start;