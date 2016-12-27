一，文件、目录说明
- readme.txt             说明文档
- index.html						 前台index ，指向html目录中的index.html
- index.js							 后台index,  后台启动命令 node index.js
- package.json           项目信息及依赖包

d html									 html文件夹
d main_js								 除了index.js以外的所有js文件 
d res                    资源文件夹
d test									 测试目录

d bootstrap-3.3.7-dist   前端js框架 BOOTSTRAP
d jquery-ui-1.12.1			 前端js框架
d three									 3D库，可到管网three.org下载

d node_modules					 node框架及相关库包   安装命令 npm install express node mosca socket.io --save

d pg                     postgresql数据库的相关js



二，依赖库说明
1、从index.js和index.html可以看出使用的库
2、node及相关的，建议用npm安装。其它的可以直接拷贝使用

三、数据库说明
暂时只支持postgresql数据库，连接串在index.js中，如下：
"tcp://用户名:密码@ip/相应的数据库名"
var DBconString = "tcp://postgres:postgres@localhost/klkjpgdb";
postgres是默认数据库，用户和密码都是postgres，
klkjpgdb是实际的数据库

四、表说明
1、建表语句
-- ----------------------------
-- Table structure for b_conf_scenes
-- ----------------------------
DROP TABLE IF EXISTS "public"."b_conf_scenes";
CREATE TABLE "public"."b_conf_scenes" (
"id" varchar(8) COLLATE "default" NOT NULL,
"name" varchar(255) COLLATE "default" NOT NULL,
"port" varchar(255) COLLATE "default",
"sensor" json,
"create_time" time(6) NOT NULL
)
WITH (OIDS=FALSE)

;

2、字段说明

sensor自动数据格式，id从1开始编号，topic是该传感器数据的主题，angle是从北（x）开始逆时针的角度。
{
"sensors":[
{
"id":1,
"topic":"magnetic/json/1",
"angle":0
},
{
"id":2,
"topic":"magnetic/json/2",
"angle":10
},
{
"id":3,
"topic":"magnetic/json/3",
"angle":20
},
{
"id":4,
"topic":"magnetic/json/4",
"angle":30
}
]
}