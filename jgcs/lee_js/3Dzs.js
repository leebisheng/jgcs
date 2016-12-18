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
				var geometry = new THREE.CylinderGeometry( 0, 0.1, 3, 60 );//顶面积0，底面积1，高30，圆分割120
				geometry.rotateX( Math.PI / 2 );

				var material = new THREE.MeshNormalMaterial();
				pointerArray[0]=pointer_cnt;
				
				for ( var i = 0; i < pointer_cnt; i ++ ) {

					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = vector[i].x ;
					mesh.position.y = vector[i].y;
					mesh.position.z = vector[i].z;
					mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
					scene.add( mesh );
					
					pointerArray[i+1]=vector;

				}
				///-----
				
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
			
			function animate(demo) 
			{
				requestAnimationFrame( animate );
				if(demo)render_demo();
				else render
			}
			
			function render() 
			{

				var time = Date.now() * 0.0005;
				var vector3=new THREE.Vector3(Math.sin( time * 0.7 ) * 2000,Math.cos( time * 0.3 ) * 2000,Math.cos( time * 0.3 ) * 2000);
				for ( var i = 3; i < pointerArray[0]+3; i ++ ) {

					//1是camera 2是grid 3才是Pointer 注意看前面的scene.add
					//scene.children[ 3].rotateOnAxis(pointerArray[i-2],Math.random()*0.01);
					//scene.children[ i].scale.z=Math.random()*10;
					//cene.children[ i ].lookAt(vector3  );
				}
				renderer.render( scene, camera );

			}

			function render_demo() 
			{

				var time = Date.now() * 0.0005;
				var vector3=new THREE.Vector3(Math.sin( time * 0.7 ) * 2000,Math.cos( time * 0.3 ) * 2000,Math.cos( time * 0.3 ) * 2000);
				for ( var i = 3; i < pointerArray[0]+3; i ++ ) {

					//1是camera 2是grid 3才是Pointer 注意看前面的scene.add
					//scene.children[ 3].rotateOnAxis(pointerArray[i-2],Math.random()*0.01);
					//scene.children[ i].scale.z=Math.random()*10;
					scene.children[ i ].lookAt(vector3  );
				}
				renderer.render( scene, camera );

			}