һ���ļ���Ŀ¼˵��
- readme.txt             ˵���ĵ�
- index.html						 ǰ̨index ��ָ��htmlĿ¼�е�index.html
- index.js							 ��̨index,  ��̨�������� node index.js
- package.json           ��Ŀ��Ϣ��������

d html									 html�ļ���
d main_js								 ����index.js���������js�ļ� 
d res                    ��Դ�ļ���
d test									 ����Ŀ¼

d bootstrap-3.3.7-dist   ǰ��js��� BOOTSTRAP
d jquery-ui-1.12.1			 ǰ��js���
d three									 3D�⣬�ɵ�����three.org����

d node_modules					 node��ܼ���ؿ��   ��װ���� npm install express node mosca socket.io --save

d pg                     postgresql���ݿ�����js



����������˵��
1����index.js��index.html���Կ���ʹ�õĿ�
2��node����صģ�������npm��װ�������Ŀ���ֱ�ӿ���ʹ��

�������ݿ�˵��
��ʱֻ֧��postgresql���ݿ⣬���Ӵ���index.js�У����£�
"tcp://�û���:����@ip/��Ӧ�����ݿ���"
var DBconString = "tcp://postgres:postgres@localhost/klkjpgdb";
postgres��Ĭ�����ݿ⣬�û������붼��postgres��
klkjpgdb��ʵ�ʵ����ݿ�

�ġ���˵��
1���������
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

2���ֶ�˵��

sensor�Զ����ݸ�ʽ��id��1��ʼ��ţ�topic�Ǹô��������ݵ����⣬angle�Ǵӱ���x����ʼ��ʱ��ĽǶȡ�
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