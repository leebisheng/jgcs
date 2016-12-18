﻿
function http_do(){
	
		// 解析请求，包括文件名
	   var pathname = url.parse(request.url).pathname;
	  
	   if (pathname.length==1) pathname="/index.html"; //可以不用输入路径，但是默认用index.html
	  	
	   // 输出请求的文件名
	   console.log("Request for " + pathname + " received.");
		   
		
    if(typeof handle[pathname] === 'function')
    {
      handle[pathname](client,response);  //执行对应的函数
    }
    else
    {
		   // 从文件系统中读取请求的文件内容
		   fs.readFile(pathname.substr(1), function (err, data) 
		   {
		      if (err) 
		      {
		         console.log(err);
		         // HTTP 状态码: 404 : NOT FOUND
		         // Content Type: text/plain
		         response.writeHead(404, {'Content-Type': 'text/html'});
		      }
		      else
		      {	         
		         // HTTP 状态码: 200 : OK
		         //响应客户端，将文件内容发回去
						 var i = pathname.lastIndexOf('.');
		         var suffix = pathname.substr( i+1, pathname.length);//通过后缀名指定mime类型
		         switch(suffix)
		         {
		         		case "css":
		         			response.writeHead(200, {'Content-Type': 'text/css'});	
		         			break;
		         		case "html":
		         			response.writeHead(200, {'Content-Type': 'text/html'});	
		         			break;
		         		case "js":
		         			response.writeHead(200, {'Content-Type': 'application/x-javascript'});
		         			break;
		         		case "ttf":
		         			response.writeHead(200, {'Content-Type': 'font/truetype'});
		         			break;
		         		case "woff":
		         			response.writeHead(200, {'Content-Type': 'application/x-font-woff'});
		         			break;
		         		case "woff2":
		         			response.writeHead(200, {'Content-Type': 'application/x-font-woff'});
		         			break;
		         		default:
		         		response.writeHead(200, {'Content-Type': 'text/plain'});	
		         		
		         }
		             

		         // 响应文件内容
		         response.write(data.toString());		
		      }
		      //  发送响应数据
		      response.end();
		   });  
    }
}

exports.http_do = http_do;