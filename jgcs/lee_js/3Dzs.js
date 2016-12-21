			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			var pointerArray= new Array();
			var camera, scene, renderer;
			var mouseX = 0, mouseY = 0;
			var width ;
   		var height ;
			
			function init(pointer_cnt,vector) 
			{
				width = 1155//document.getElementById('3dzs_canvas').clientWidth;//获取画布「canvas3d」的宽
   			height =500;//document.getElementById('3dzs_canvas').clientHeight;//获取画布「canvas3d」的高
   			
   		
				renderer = new THREE.WebGLRenderer( { antialias: true } );//生成渲染器对象（属性：抗锯齿效果为设置有效）
				renderer.setClearColor( 0x999999 );//设置canvas背景色
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize(width, height );//指定渲染器的高宽（和画布框大小一致）
				document.getElementById('3dzs_canvas').appendChild(renderer.domElement);//追加 【canvas】 元素到 【canvas3d】

				//scene
					scene = new THREE.Scene();
					scene.add( new THREE.AmbientLight( 0x999999 ) );
				//camera
					camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 2000 );
				//PerspectiveCamera 四个参数说明
				//指明相机的可视角度,可选参数,如果未指定,初始化为50
	      //指明相机可视范围的长宽比,可选参数,如果未指定,初始化为1
        //指明相对于深度剪切面的近的距离，必须为正数,可选参数,如果未指定,初始化为0.1
				//指明相对于深度剪切面的近的距离，必须为正数,可选参数,如果未指定,初始化为2000

				// Z is up for objects intended to be 3D printed.

				camera.up.set( 0, 0, 1 );
				camera.position.set( -20, 0, 10 );

				camera.add( new THREE.PointLight( 0xffffff, 0.8 ) );

				scene.add( camera );
				//grid
				var grid = new THREE.GridHelper( 50, 50, 0xffffff, 0x555555 );
				grid.position= new THREE.Vector3(0,0,0);
				grid.rotateOnAxis( new THREE.Vector3( 1, 0, 0 ), 90 * ( Math.PI/180 ) );
				scene.add( grid );
							
				//pointer
				var geometry = new THREE.CylinderGeometry( 0.03, 0.1, 0.5, 60 );//顶面积0，底面积1，高30，圆分割120
				geometry.rotateX( Math.PI / 2 );

				var material = new THREE.MeshNormalMaterial();
				
				for ( var i = 0; i < pointer_cnt; i ++ ) {

					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = vector[i].x ;
					mesh.position.y = vector[i].y;
					mesh.position.z = vector[i].z;
					mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
					scene.add( mesh );
					
					pointerArray[i+1]=vector;

				}
					pointerArray[0]=pointer_cnt;
				//标指针编号
				//for ( var i = 0; i < pointer_cnt; i ++ ) {
				//	
				//	spritey = makeTextSprite( i+1, { fontsize: 30 } );
        //  spritey.position.set(vector[i].x,vector[i].y,vector[i].z);
        //  scene.add(spritey);
				//}
				
			
				///-----
				//创建X
                spritey = makeTextSprite( " X", { fontsize: 100 } );
                spritey.position.set(230,0,0);
                scene.add(spritey);

       //创建Y
                spritey = makeTextSprite( " Y", { fontsize: 100} );
                spritey.position.set(0,200,0);
                scene.add(spritey);
				//----井圈-------------------------				
		        geometry = new THREE.CylinderGeometry( 5, 7, 5, 16,5,true );
		        //radiusTop：顶面半径
						//radiusBottom：底面的半径
						//height：圆柱体的高度
						//radiusSegments：顶面与底面的分段数
						//heightSegments：侧面的分段数
						//openEnded：是否没有顶面和底面，布尔类型，缺省值为false，表示有顶面和底面。 

						geometry.rotateX( Math.PI / 2 );

						material = new THREE.MeshBasicMaterial({"color":0x696969,"wireframe":true,"wireframeLinewidth":0.5}); 
						//color：设置材质的颜色
						//wireframe：如果为true，则将材质渲染成线框，在调试的时候可以起到很好的作用
						//wireframeLinewidth：wireframe为true时，设置线框中线的宽度
						//wireframeLinecap：决定线框端点如何显示，可选的值 round，bevel(斜角)和miter(尖角)。
						//vertexColors：通过这属性，定义顶点的颜色，在canvasRender中不起作用。
						//fog：决定单个材质的是否受全局雾化的影响。 
						//值得一提的是： 
						// 对于fog属性，在全局中如果设定了雾化属性，那么本应该对所有场景的物体都添加雾化效果。

						mesh = new THREE.Mesh( geometry, material );
						mesh.position.x = 0;
						mesh.position.y = 0;
						mesh.position.z = 0;
						mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
						scene.add( mesh );

       //------------------
        function makeTextSprite( message, parameters )
            {
                if ( parameters === undefined ) parameters = {};
                var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
                var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
                var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
                var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };

                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                context.font = "Bold " + fontsize + "px " + fontface;
                var metrics = context.measureText( message );
                var textWidth = metrics.width;

                context.lineWidth = borderThickness;

                context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
                context.fillText( message, borderThickness, fontsize + borderThickness);

                var texture = new THREE.Texture(canvas)
                texture.needsUpdate = true;

                var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
                var sprite = new THREE.Sprite( spriteMaterial );
                sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
                return sprite;
            }

				
				//------
				
				var controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				controls.target.set( 0, 1.2, 2 );
				controls.update();

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {
				

				camera.aspect = width /height;
				camera.updateProjectionMatrix();

				renderer.setSize( width, height );

				render();

			}
			function onDocumentMouseMove(event) 
			{

				mouseX = ( event.clientX - windowHalfX ) * 10;
				mouseY = ( event.clientY - windowHalfY ) * 10;

			}
			
			function animate() 
			{
				requestAnimationFrame( animate );
				render();
			}
			
			function render() 
			{
				var time = Date.now() * 0.0005;
				var vector_fee=new THREE.Vector3(Math.sin( time * 0.7 ) * 2000,Math.cos( time * 0.3 ) * 2000,Math.cos( time * 0.3 ) * 2000);
				var sensor_num=pointerArray[0];
				var base=3;
				var zoom=5;
				for ( var i = 0; i < sensor_num; i ++ ) 
				{

					//1是camera 2是grid 3才是Pointer 注意看前面的scene.add
					if(gSceneID!=0)
					{

								var vector_0=gSceneList[gSceneID-1][i].position_3;
								var vector_1=gSceneList[gSceneID-1][i].position_r;
								var vector_2=new THREE.Vector3(vector_0.x+vector_1.x,vector_0.y+vector_1.y,vector_0.z+vector_1.z); 
								var d=Math.sqrt(vector_1.x*vector_1.x+vector_1.y*vector_1.y+vector_1.z*vector_1.z)
							  zoom=(d/100)*3;
					}
		
					else	{vector_2=vector_fee;}
					if(isNaN(zoom))zoom=5;
					scene.children[ i+base ].scale.z=zoom;
					scene.children[ i+base ].lookAt(vector_2  );
				}
				renderer.render( scene, camera );

			}

			