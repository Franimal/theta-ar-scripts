function setup(){
	//loadAssetFromUrl("https://raw.githubusercontent.com/Franimal/theta-ar-scripts/master/Models/lightsaber/scene.gltf", "lightsaber");	
}

function setKey(keyName, keyValue) {
	return function(instructionComponent) {
		if (!instructionComponent.state) {
			instructionComponent.state = {};
		}
		
		instructionComponent.state[keyName] = keyValue;
	}
}

var saberHilt = null;

var baseUrl = "https://github.com/Franimal/theta-ar-scripts/raw/master/innovation-showcase/";

function start(){
	//saberHilt = createItem("lightsaber");
	//size(saberHilt, 0.3);	
	//disable(saberHilt);		

	if(!isHololens()){
		wrap(floor(10, 0))
			.texture(baseUrl + "TiledGrid.png")
			.color(0, 0.3, 1, 0.9)
			.emit(0, 1, 1, 1);	
	}
	
	//VERACIDATA
	
	var veracidataParent = empty();
	
	wrap(plane("left"))
		.texture(baseUrl + "VeracidataLeft.png")
		.parent(veracidataParent)
		.move(-3, 0.5, 0.5)
		.rotate(-90, 0, -35)
		.scale(0.25, 1, 0.5);
	
	wrap(plane("center"))
		.texture(baseUrl + "VeracidataCenter.png")
		.parent(veracidataParent)
		.move(0, 0.5, 1.12)
		.rotate(-90, 0, 0)
		.scale(0.25, 1, 0.5);
		
	wrap(plane("right"))
		.texture(baseUrl + "VeracidataLeft.png")
		.parent(veracidataParent)
		.move(3, 0.5, 0.5)
		.rotate(-90, 0, 35)
		.scale(0.25, 1, 0.5);
		
	move(veracidataParent, 9, 0, 13.64);
	rotate(veracidataParent, 0, 92.705, 0);
			
	//SIX DEGREES
	wrap(cylinder("table"))
		.move(-10, -1.733, 10)
		.scale(2.6628, 0.2877, 2.662839);
		
	wrap(text("SIX DEGREES"))
		.move(-10, -0.85, 10)	
		.rotate(0, -60, 0)
		.scale(1, 1, 1)
		.color(56/255, 66/255, 75/255, 1);
		
	wrap(text("PLANNING"))
		.move(-10, -1.077, 10)
		.rotate(0, -60, 0)
		.scale(1, 1, 1)
		.color(187/255, 42/255, 47/255, 1);
		
	var orbiter = plane("sixdegreeslogo");
	wrap(orbiter)
		.texture(baseUrl + "SixDegreesLogo.png")
		.move(-9.9, -1.39, 9.919)
		.rotate(90, 0, -118)
		.scale(0.1, 0.1, 0.1)
		.instruction(orbitHorizontal("a", 2, 3, function(){}));
		
	setRenderQueue(orbiter, 3001);

	//MIXED REALITY
	
	//INTERNS
	
	//CRAIGS
	
	//YUPPL	
	//main green color: #1ab394
	
	//MiniDevs Wall
	var minidevs = empty();
	
	var x = -9.92;
	var y = 0;
	var z = 21.82;
	
	move(minidevs, x, y, z);
	
	var mdTitle = text("MINIDEVS");
	
	wrap(mdTitle)	
		.move(x, y, z)
		.rotate(0, -90, 0)
		.scale(1.5, 1.5, 1.5)
		.color(1, 1, 1, 1);
	
}

var recording = false;

function toggleVideoRecording(){
	if(recording){
		stopRecordingVideo();
	} else {
		recordVideo();
	}
}

function recordVideo(){
	recording = true;
	startVideoRecording();
}

function stopRecordingVideo(){
	recording = false;
	stopVideoRecording();
}

function bindPosition(gameObject){
	return function(transform){
		gameObject.position = transform.position;
	}
}

var saberEnabled = false;
var recording = false;

function reload(){
	reloadScript();
}

function update(time, player, left, right){
	if(left){		
		if(left.menuPressed){
			if(!saberEnabled){
				saberEnabled = true;
			//	enable(saberHilt);
			//	leftHand(saberHilt);
			//	rotate(saberHilt, 45, 45, 0);
			}
		}
		if(left.selectPressed){
			if(!recording){
				recording = true;
				recordVideo();
			}
		} else {
			if(recording){
				recording = false;
				stopRecordingVideo();
			}
		}
	}   
}        