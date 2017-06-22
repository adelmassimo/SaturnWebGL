document.body.appendChild( renderer.domElement );
function initializeScene(){
    // _________________________________________________________________________________ Begin Saturn Material
    var saturnMaterial = new THREE.ShaderMaterial({
        uniforms: saturnUniforms = {
            texture: { type: 't', value: textureLoader.load("img/saturn.jpg") },
            time: {value: 1.0}
        },
        vertexShader: document.getElementById('vertexShaderSaturn').textContent,
        fragmentShader: document.getElementById('fragmentShaderSaturn').textContent,
    });
    // __________________________________________________________ End Saturn Material
    // _________________________________________________________________________________ Begin Titano Material
    var titanoMaterial = new THREE.ShaderMaterial({
        uniforms: titanoUniforms = {
            texture: { type: 't', value: textureLoader.load("img/titano.jpg") },
            time: {value: 1.0}
        },
        vertexShader: document.getElementById('vertexShaderTITANO').textContent,
        fragmentShader: document.getElementById('fragmentShaderTITANO').textContent,
    });
    // __________________________________________________________ End Titano Material
    // _________________________________________________________________________________ Begin Ring Geometry
    
        thetas = new Float32Array(n);
        delayX = new Float32Array(n);
        delayZ = new Float32Array(n);

    for(i = 0; i < n; i++){
        var theta = Math.random()*2*Math.PI;

        thetas[i] = theta;
        delayX[i] = (Math.random()-0.5)*80;
        delayZ[i] = (Math.random()-0.5)*30;
    }

    internalRingGeometry.addAttribute('base_angle', new THREE.BufferAttribute(thetas, 1))
                .addAttribute('offsetX', new THREE.BufferAttribute(delayX, 1))
                .addAttribute('offsetZ', new THREE.BufferAttribute(delayZ, 1))
                .addAttribute('position', new THREE.BufferAttribute(new Float32Array(n*3), 3));
    externalRingGeometry = internalRingGeometry.clone();
    // __________________________________________________________ End Ring Geometry
    // _________________________________________________________________________________ Begin Rings Material
    var externalRingMaterial= new THREE.ShaderMaterial({
        uniforms: externalRingUniforms = {
            time: {value: 10.0},
            stretch: {value: new THREE.Vector3(290, 40, 180)}
        },
        vertexShader: document.getElementById('vertexShaderDEBRIS').textContent,
        fragmentShader: document.getElementById('fragmentShaderDEBRIS').textContent,
    })

    var internalRingMaterial= new THREE.ShaderMaterial({
        uniforms: internalRingUniforms = {
            time: {value: 10.0},
            stretch: {value: new THREE.Vector3(190, 30, 135)}
        },
        vertexShader: document.getElementById('vertexShaderDEBRIS').textContent,
        fragmentShader: document.getElementById('fragmentShaderDEBRIS').textContent,
    })
    // __________________________________________________________ End Rings Material
    // _________________________________________________________________________________ Begin Creating Objects
    var externalRing = new THREE.Points(internalRingGeometry, externalRingMaterial);
        internalRing = new THREE.Points(externalRingGeometry, internalRingMaterial);
        saturn = new THREE.Mesh( new THREE.SphereBufferGeometry( 100, 64, 64 ), saturnMaterial);
        titano = new THREE.Mesh( new THREE.SphereBufferGeometry( 20, 64, 64 ), titanoMaterial);
        plane = new THREE.GridHelper(1000, 1000);
    // __________________________________________________________ EndCreating Objects
    
    scene.add( saturn );
    scene.add(internalRing);
    scene.add(externalRing);
    scene.add( titano );

    //ASSE X
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    lineGeometry.vertices.push(new THREE.Vector3(200, 0, 0));
    var axisX = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0xdd3333, linewidth: 10 }));
    //ASSE Y
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    lineGeometry.vertices.push(new THREE.Vector3(0, 200, 0));
    var axisY = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0x33dd33, linewidth: 10 }));
    //ASSE Z
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    lineGeometry.vertices.push(new THREE.Vector3(0, 0, 200));
    var axisZ = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0x3333dd, linewidth: 10 }));
}

initializeScene();
//RENDER LOOP
render();