var THREE = require('node.three.js');

var camera, scene, renderer;

var mesh;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 27, 800 / 600, 1, 4000 );
	camera.position.z = 2750;

	scene = new THREE.Scene();

	var segments = 10000;

	var geometry = new THREE.BufferGeometry();
	var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

	var positions = new Float32Array( segments * 3 );
	var colors = new Float32Array( segments * 3 );

	var r = 800;

	for ( var i = 0; i < segments; i ++ ) {

		var x = Math.random() * r - r / 2;
		var y = Math.random() * r - r / 2;
		var z = Math.random() * r - r / 2;

		// positions

		positions[ i * 3 ] = x;
		positions[ i * 3 + 1 ] = y;
		positions[ i * 3 + 2 ] = z;

		// colors

		colors[ i * 3 ] = ( x / r ) + 0.5;
		colors[ i * 3 + 1 ] = ( y / r ) + 0.5;
		colors[ i * 3 + 2 ] = ( z / r ) + 0.5;

	}

	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

	geometry.computeBoundingSphere();

	mesh = new THREE.Line( geometry, material );
	scene.add( mesh );

	//

	renderer = new THREE.WebGLRenderer( { antialias: false, width: 800, height: 600 } );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	THREE.document.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize(event) {

	camera.aspect = event.width / event.height;
	camera.updateProjectionMatrix();

	renderer.setSize( event.width, event.height, false );

}

function animate() {

	THREE.requestAnimationFrame( animate );

	render();

}

function render() {

	var time = Date.now() * 0.001;

	mesh.rotation.x = time * 0.25;
	mesh.rotation.y = time * 0.5;

	renderer.render( scene, camera );

}