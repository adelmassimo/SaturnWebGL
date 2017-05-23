document.body.appendChild( renderer.domElement );



var saturnTexture = textureLoader.load("img/saturn.jpg");
saturnTexture.wrapT = saturnTexture.wrapS = THREE.RepeatWrapping;
var debrisTexture2 = textureLoader.load("img/lava.jpg");
debrisTexture2.wrapT = debrisTexture2.wrapS = THREE.RepeatWrapping;
var debrisTexture = textureLoader.load("img/debris.jpg");
debrisTexture.wrapT = debrisTexture.wrapS = THREE.RepeatWrapping;


var saturnUniforms ;
var debrisUniforms ;
var saturnMaterial = new THREE.ShaderMaterial({
    uniforms: saturnUniforms = {
        tile: {value: new THREE.Vector2(512.0, 512.0)},
        texture: { type: 't', value: saturnTexture },
        radius: {value: 40.0},
        bumpScale: {value: 40.0},
        time: {value: 1.0}
    },
    vertexShader: document.getElementById('vertexShaderSaturn').textContent,
    fragmentShader: document.getElementById('fragmentShaderSaturn').textContent,
});



    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();
    scene.add(light);
  

var debrisMaterials = new Array();
var debrisUniformss = new Array();
for(i = 0; i < n/2; i++){
    debrisUniformss.push({
            texture: { type: 't', value: debrisTexture },
            radius: {value: 1.0},
            time: {value: 1.0*(i)}
        });

     debrisMaterials.push( new THREE.ShaderMaterial({
        uniforms: debrisUniformss[i],
        vertexShader: document.getElementById('vertexShaderDEBRIS').textContent,
        fragmentShader: document.getElementById('fragmentShaderDEBRIS').textContent,
    })
    )
    absteroids.push( new THREE.Mesh(  new THREE.SphereGeometry( 1 ), debrisMaterials[i] ) );

    absteroids[i].position.x = 0;
    absteroids[i].position.y = 0;
    absteroids[i].position.z = 0;
    scene.add( absteroids[i] );

}

for(i = n/2; i < n; i++){
    debrisUniformss.push({
            texture: { type: 't', value: debrisTexture2 },
            radius: {value: 1.0},
            time: {value: 1.0*(i)}
        });

     debrisMaterials.push( new THREE.ShaderMaterial({
        uniforms: debrisUniformss[i],
        vertexShader: document.getElementById('vertexShaderDEBRIS2').textContent,
        fragmentShader: document.getElementById('fragmentShaderDEBRIS').textContent,
    })
    )
    absteroids.push( new THREE.Mesh(  new THREE.SphereGeometry( 1 ), debrisMaterials[i] ) );

    absteroids[i].position.x = 0;
    absteroids[i].position.y = 0;
    absteroids[i].position.z = 0;
    scene.add( absteroids[i] );

}
moveSubjectTo(camera, 190, 190, 700, 0);
// __________________________________________________________________________________________________________________________________


var sunLight = new THREE.PointLight( 0xFDCC36, 1, 10000 );
    sunLight.position.set( 0, 0, 0 );
    scene.add(sunLight);

var saturn = new THREE.Mesh( new THREE.SphereBufferGeometry( 100, 32, 32 ), saturnMaterial);
scene.add( saturn );

// __________________________________________________________________________________________________________________________________

//scene.add( new THREE.GridHelper(1000, 1000) );

//RENDER LOOP
render();