var adjust_z=2.5;
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var pointerArray= new Array();
var container,camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var width ;
var height ;
	
function init(pointer_cnt,vector) 
{
	width = document.getElementById('canvas').clientWidth;//获取画布「canvas3d」的宽
 	height =document.getElementById('canvas').clientHeight;//获取画布「canvas3d」的高

	container = document.getElementById('canvas');//document.createElement( 'div' );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0x999999 );//设置canvas背景色
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( width, height );
	container.appendChild( renderer.domElement );

		//-----
		//scene
	scene = new THREE.Scene();
	scene.add( new THREE.AmbientLight( 0x404040 ) );//0x999999
		//camera
	camera = new THREE.PerspectiveCamera( 45, width / height, 0.5, 2000 );//PerspectiveCamera
	
		// Z is up for objects intended to be 3D printed.

	camera.up.set( 0, 0, 1 );
	camera.position.set( -20, 0, 10 );
	camera.add( new THREE.PointLight( 0xffffff, 0.8 ) );
	scene.add( camera );
		//grid
	var grid = new THREE.GridHelper( 50, 100, 0xffffff, 0x66CD00 );
	grid.position= new THREE.Vector3(0,0,0);
	grid.rotateOnAxis( new THREE.Vector3( 1, 0, 0 ), 90 * ( Math.PI/180 ) );
	scene.add( grid );
					
		//pointer
	var geometry = new THREE.CylinderGeometry( 0.03, 0.1, 0.5, 60 );//顶面积0，底面积1，高30，圆分割120
	geometry.rotateX( Math.PI / 2 );
 	var map = new THREE.TextureLoader().load( '../res/pointor.jpg' );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	var material = new THREE.MeshLambertMaterial( { map: map, side: THREE.FrontSide } );
		//var material = new THREE.MeshNormalMaterial();
	for ( var i = 0; i < pointer_cnt; i ++ ) {
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = vector[i].x ;
		mesh.position.y = vector[i].y;
		mesh.position.z = vector[i].z+adjust_z;
		mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
		scene.add( mesh );
	
		pointerArray[i+1]=vector;
	}
	pointerArray[0]=pointer_cnt;
			
	//----井圈-------------------------				
	geometry = new THREE.CylinderGeometry( 5, 7, 5, 64,10,true );
	geometry.rotateX( Math.PI / 2 );

	material = new THREE.MeshBasicMaterial({"color":0x8B7E66,"wireframe":true,"wireframeLinewidth":0.5}); 
	mesh = new THREE.Mesh( geometry, material );
	mesh.position.x = 0;
	mesh.position.y = 0;
	mesh.position.z = adjust_z;
	mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
	scene.add( mesh );
	
///-----
//创建X
         spritey = makeTextSprite( " X", { fontsize: 100 } );
         spritey.position.set(230,0,0);
         scene.add(spritey);

//创建Y
         spritey = makeTextSprite( " Y", { fontsize: 100} );
         spritey.position.set(0,200,0);
         scene.add(spritey);
//创建 东南西北
         spritey = makeTextSprite( " 东", { fontsize: 50} );
         spritey.position.set(-10,-50,0);
         scene.add(spritey);
          spritey = makeTextSprite( " 南", { fontsize: 50} );
         spritey.position.set(-50,10,0);
         scene.add(spritey);
           spritey = makeTextSprite( " 西", { fontsize: 50} );
         spritey.position.set(10,50,0);
         scene.add(spritey);
           spritey = makeTextSprite( " 北", { fontsize: 50} );
         spritey.position.set(50,-10,0);
         scene.add(spritey);


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
	
	var light= new THREE.DirectionalLight( 0xffffff );
	light.position.set( -10, 0, 10 );
	scene.add( light );

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

			