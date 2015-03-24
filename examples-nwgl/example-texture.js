var THREE = require('node.three.js');

var width = 400, height = 400;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({
	width: width,
	height: height
});

var geometry = new THREE.BoxGeometry(3, 3, 3);
var material = new THREE.MeshBasicMaterial({
	map: THREE.ImageUtils.loadTexture("./res/img/checkerboard.jpg")
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var render = function () {
	THREE.requestAnimationFrame(render);

	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
};

render();