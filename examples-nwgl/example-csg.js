// I don't like it, it's too dirty. Look at other examples, please
// ===============================================================


var THREE = require('node.three.js'),
	csg = require('csg-node'),
	KeyboardState = require('./misc/KeyboardState'),
	OrbitControls = require('./misc/OrbitControls'),
	ThreeBSP = require('./misc/ThreeCSG');

/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v58)

	Modified by kabbi to work with node-webgl
*/

// MAIN

// standard global variables
var container, scene, camera, renderer, controls;
var keyboard = new KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var cube;

init();
animate();

// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = 800, SCREEN_HEIGHT = 600;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);	
	// RENDERER
	renderer = new THREE.WebGLRenderer({
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		antialias:true
	});
	// CONTROLS
	controls = new OrbitControls( camera, renderer.domElement );
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'res/img/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
	// SKYBOX/FOG
	var skyBoxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	
	////////////
	// CUSTOM //
	////////////
	
	var materialNormal = new THREE.MeshNormalMaterial();
	
	var cubeGeometry = new THREE.BoxGeometry( 100, 100, 100, 1, 1, 1 );
	var cubeMesh = new THREE.Mesh( cubeGeometry );
	var cubeBSP = new ThreeBSP( cubeMesh );
		
	var sphereGeometry = new THREE.SphereGeometry( 60, 32, 32 );
	var sphereMesh = new THREE.Mesh( sphereGeometry );
	var sphereBSP = new ThreeBSP( sphereMesh );
	
	// Example #1 - Cube subtract Sphere
	var newBSP = cubeBSP.subtract( sphereBSP );
	var newMesh = newBSP.toMesh( materialNormal );
	newMesh.position.set(-180, 60, 0);
	scene.add( newMesh );

	// Example #2 - Sphere subtract Cube
	var newBSP = sphereBSP.subtract( cubeBSP );
	var newMesh = newBSP.toMesh( materialNormal );
	newMesh.position.set(180, 60, 0);
	scene.add( newMesh );
	
	// Example #3 - Cube union Sphere
	var newBSP = sphereBSP.union( cubeBSP );
	var newMesh = newBSP.toMesh( materialNormal );
	newMesh.position.set(70, 60, -120);
	scene.add( newMesh );

	// Example #4 - Cube intersect Sphere
	var newBSP = sphereBSP.intersect( cubeBSP );
	var newMesh = newBSP.toMesh( materialNormal );
	newMesh.position.set(-70, 60, -120);
	scene.add( newMesh );
}

function animate() 
{
    THREE.requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	if ( keyboard.pressed("z") ) 
	{ 
		// do something
	}
	
	controls.update();
}

function render() 
{
	renderer.render( scene, camera );
}
