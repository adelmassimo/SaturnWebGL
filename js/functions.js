//CONTROLS

var clock = new THREE.Clock();
// - Globas
    time = 0;
    speed = 0;
    n = 2; //debris for ring
// - Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    	renderer.setSize( window.innerWidth, window.innerHeight );
    	renderer.setClearColor(0x222222, 0);
    scene = new THREE.Scene();
// -Camera
    ratio = window.innerWidth/window.innerHeight;
    near = 1;
    far = 20000;
    camera = new THREE.PerspectiveCamera( 75, ratio, near, far );
        camera.position.x = -190;
        camera.position.y = 150;
        camera.position.z = 305;
// -Texture
    textureLoader = new THREE.TextureLoader();
    controls = new THREE.OrbitControls( camera, renderer.domElement );

function render() {
	stats.begin();
    //update orbit controls
	controls.update();
    //update camera info on screen
    updateCameraInfo();
    //render the scene
	renderer.render(scene, camera);
	requestAnimationFrame(render);

    //saturn.rotation.y -= speed ;

    time = clock.getDelta() * 0.00001;
    saturnUniforms.time.value += 0.3*speed;
    titanoUniforms.time.value += 0.6*speed;
    internalRingUniforms.time.value += 0.5*speed;
    externalRingUniforms.time.value += 0.5*speed;
    
    stats.end();

} 

document.body.onkeydown = function(event){
    event = event || window.event;
    var keycode = event.charCode || event.keyCode;
    var speed = 0;
    switch(keycode){
    	case(32): // space
    		hideInfos();
    		break;
    }
}
