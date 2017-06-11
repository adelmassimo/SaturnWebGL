var speedController = document.getElementById("speedSelector");
	bgController = document.getElementById("bgSelector");
	planeIsOn = false;
	axisAreOn = false;
	background = 0;

function updateCameraInfo(){
	document.getElementById('cameraPos').textContent = "Camera Position: ("+Math.round(camera.position.x)+", "+Math.round(camera.position.y)+", "+Math.round(camera.position.z)+")";
	document.getElementById('particlesInfo').textContent ="Particles per ring: "+n;
}

function selectSpeed(){
	speed = (speedSelector.value != 0)?Math.exp(-(100-speedSelector.value)/10):0;
}

function hideInfos(){
	var infoW = document.getElementById('infos');
	var infoWH = document.getElementById('infosHide');

	if(infos.getAttribute('class') == 'hide'){
		infoWH.textContent = '▶︎';		
		infos.setAttribute('class','null');
	}
	else{
		infoWH.textContent = '◀︎';
		infos.setAttribute('class','hide');
	}
}


function hidePlane(){
	if(planeIsOn){
		scene.remove(plane);
		planeIsOn = false;
	}
	else{
		scene.add(plane);
		planeIsOn = true;
	}
}


function selectBg(){
	c = Math.floor(bgSelector.value*2.55);
	document.getElementById("body").setAttribute("style", "background: rgb("+c+","+c+","+c+")");
}
function changeBackground(){
	switch(background){
		case 0:
			document.getElementById("body").setAttribute("style", "background: #fff;color:#000");
			break;
		case 1:
			document.getElementById("body").setAttribute("style", "background: #000; color:#fff");
			break;
		case 2:
			document.getElementById("body").setAttribute("style", "background-image: url('./img/backgrounds/background2.jpg');color:#fff");
			break;
	}
	console.log(background);
	background = (background+1)%3;
}

function hideAxis(){
	if(axisAreOn){
		scene.remove(axisX);
		scene.remove(axisY);
		scene.remove(axisZ);
		axisAreOn = false;
	}
	else{
		scene.add(axisX);
		scene.add(axisY);
		scene.add(axisZ);
		axisAreOn = true;
	}
}



stats = new Stats();

document.getElementById('statsDiv').appendChild( stats.dom ).setAttribute('id', 'statsDOM');