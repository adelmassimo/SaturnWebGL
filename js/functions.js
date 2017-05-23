//CONTROLS
var speedController = document.getElementById("speedSelector");
var clock = new THREE.Clock();

// PARAMETERS
// -Global Utils
var speed = 0.001;
var n = 2000;
var time = 0;
var absteroids = Array();	
// - Renderer
var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(0x222222);

function render() {
	

	controls.update();
	TWEEN.update();
	renderer.render(scene, camera);
	requestAnimationFrame(render);

	saturn.rotation.y += speed * 10;

	var r =600;

    time = clock.getDelta() * 0.00001;

    saturnUniforms.time.value += time;
    for(i = 0; i < n; i++)
        debrisUniformss[i].time.value += time+Math.random()*speed;

} 
// -Scene
var scene = new THREE.Scene();
// -Camera
var ratio = window.innerWidth/window.innerHeight
var near = 1;
var far = 20000;
var camera = new THREE.PerspectiveCamera( 75, ratio, near, far );
// -Texture
var textureLoader = new THREE.TextureLoader();
// -Object Loader
var loader = new THREE.JSONLoader();



var controls = new THREE.OrbitControls( camera, renderer.domElement );




function clickOnCanvas(){
	moveSubjectTo(camera, camera.position.y+3,camera.position.y+3,camera.position.z+9);	
}

function addFigure(subject){
	if( scene.add(subject) )
    	shapes.push(subject);
    else
    	return false;
}

function moveSubjectTo(subject, x,y,z, duration=100, completeCallBack=null, updateCallBack = null){
	new TWEEN.Tween(subject.position)
	  .to(new THREE.Vector3(x,y,z), duration)
	  .easing( TWEEN.Easing.Quadratic.InOut )
	  .onUpdate( updateCallBack )
	  .onComplete( completeCallBack )
	  .start();
}

document.body.onkeydown = function(event){
    event = event || window.event;
    var keycode = event.charCode || event.keyCode;
    var speed = 0;
    switch(keycode){
    	case(37): //lx
    		moveSubjectTo(camera, camera.position.x-1,camera.position.y,camera.position.z, speed);
    	    updateCameraInfo();
    		break;
    	case(38): // up
    		moveSubjectTo(camera, camera.position.x,camera.position.y,camera.position.z-1, speed);
    	    updateCameraInfo();
    		break;
    	case(39): // rx
    		moveSubjectTo(camera, camera.position.x+1,camera.position.y,camera.position.z, speed);
    	    updateCameraInfo();
    		break;
    	case(40): // dw
    		moveSubjectTo(camera, camera.position.x,camera.position.y,camera.position.z+1, speed);
    	    updateCameraInfo();
    		break;
    	case(32): // space
    		moveSubjectTo(camera, camera.position.x,camera.position.y+1,camera.position.z, speed);
    	    updateCameraInfo();
    		break;
    	case(16): // shift
    		moveSubjectTo(camera, camera.position.x,camera.position.y-1,camera.position.z, speed);
    	    updateCameraInfo();
    		break;
    	case(65): // A
    		camera.rotation.y += 0.1; 
    		break;
    	case(87): // W
    		camera.rotation.x += 0.1; 
    		break;
    	case(68): // D
    		camera.rotation.y -= 0.1; 
    		break;
    	case(83): // S
    		camera.rotation.x -= 0.1; 
    		break;
    }
}

function selectSpeed(){

	speed = (speedSelector.value != 0)?Math.exp(-(100-speedSelector.value)/10):0;
}

function updateCameraInfo(){
	document.getElementById('cameraPos').textContent = "Camera Position: ("+camera.position.x+", "+camera.position.y+", "+camera.position.z+")";
}