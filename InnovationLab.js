function setup(){
	loadAssetFromUrl("https://raw.githubusercontent.com/Franimal/theta-ar-scripts/master/Models/lightsaber/scene.gltf", "lightsaber");	
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

function start(){
	saberHilt = createItem("lightsaber");
	size(saberHilt, 0.3);	
	disable(saberHilt);		

	if(!isHololens()){
		wrap(floor(10, 0))
			.texture("https://github.com/Franimal/theta-ar-scripts/raw/master/innovation-showcase/TiledGrid.png")
			.color(0, 0.3, 1, 0.9)
			.emit(0, 1, 1, 1);	
	}
	
	//VERACIDATA
	
	var veracidataParent = empty();
	
	wrap(createPlane("left"))
		.texture("https://github.com/Franimal/theta-ar-scripts/raw/master/innovation-showcase/VeracidataLeft.png")
		.parent(veracidataParent)
		.move(-1, 0, 0);
	
	wrap(createPlane("center"))
		.texture("https://github.com/Franimal/theta-ar-scripts/raw/master/innovation-showcase/VeracidataCenter.png")
		.parent(veracidataParent)
		.move(0, 0, 0);
		
	wrap(createPlane("right"))
		.texture("https://github.com/Franimal/theta-ar-scripts/raw/master/innovation-showcase/VeracidataLeft.png")
		.parent(veracidataParent)
		.move(1, 0, 0);
		
	move(veracidataParent, 0, 0, 2);
			
	//SIX DEGREES
	
	//MIXED REALITY
	
	//INTERNS
	
	//CRAIGS
	
	//YUPPL
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
				enable(saberHilt);
				leftHand(saberHilt);
				rotate(saberHilt, 45, 45, 0);
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