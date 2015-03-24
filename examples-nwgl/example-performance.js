var THREE = require('node.three.js');

var camera, scene, renderer;

var objects;

var mouseX = 0, mouseY = 0;

var windowHalfX = 800 / 2;
var windowHalfY = 600 / 2;

THREE.document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();
animate();


function init() {

	camera = new THREE.PerspectiveCamera( 60, windowHalfX / windowHalfY, 1, 10000 );
	camera.position.z = 3200;

	scene = new THREE.Scene();

	objects = [];

	var material = new THREE.MeshNormalMaterial( { shading: THREE.SmoothShading } );

	var loader = new THREE.JSONLoader();
	loader.load( __dirname + '/res/obj/Suzanne', function ( geometry ) {

		geometry.computeVertexNormals();

		for ( var i = 0; i < 10000; i ++ ) {

			var mesh = new THREE.Mesh( geometry, material );

			mesh.position.x = Math.random() * 8000 - 4000;
			mesh.position.y = Math.random() * 8000 - 4000;
			mesh.position.z = Math.random() * 8000 - 4000;
			mesh.rotation.x = Math.random() * 2 * Math.PI;
			mesh.rotation.y = Math.random() * 2 * Math.PI;
			mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50 + 100;

			objects.push( mesh );

			scene.add( mesh );

		}

	} );

	renderer = new THREE.WebGLRenderer({
		width: windowHalfX * 2, 
		height: windowHalfY * 2
	});
	renderer.setClearColor( 0xffffff, 1 );

	//

	THREE.document.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize(event) {

	windowHalfX = event.width / 2;
	windowHalfY = event.height / 2;

	camera.aspect = event.width / event.height;
	camera.updateProjectionMatrix();

	renderer.setSize( event.width, event.height, false );

}

function onDocumentMouseMove(event) {

	mouseX = ( event.pageX - windowHalfX ) * 10;
	mouseY = ( event.pageY - windowHalfY ) * 10;

}

//

function animate() {

	THREE.requestAnimationFrame( animate );

	render();

}

function render() {

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	camera.lookAt( scene.position );

	for ( var i = 0, il = objects.length; i < il; i ++ ) {

		objects[ i ].rotation.x += 0.01;
		objects[ i ].rotation.y += 0.02;

	}

	renderer.render( scene, camera );

}