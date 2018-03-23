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
		
	var veraciparent = empty();
	wrap(veraciparent).parent(veracidataParent).rotate(90, 180, 0).scale(0.1, 0.1, 0.1);
		
	wrap(plane("1"))
		.texture(baseUrl + "Veracidata/001Veracidata.png")
		.parent(veraciparent)
		.move(29.67, -4.8, -17.61)
		.scale(2.184, 2.184, 2.184)
		.rotate(0, 0, 33.825);
	wrap(plane("1"))
		.texture(baseUrl + "Veracidata/002Veracidata.png")
		.parent(veraciparent)
		.move(29.67, -4.8, 6.1)
		.scale(2.184, 2.184, 2.184)
		.rotate(0, 0, 33.825);
	wrap(plane("1"))
		.texture(baseUrl + "Veracidata/003Veracidata.png")
		.parent(veraciparent)
		.move(0, -10, -18)
		.scale(2, 2, 2)
		.rotate(0, 0, 0);
	wrap(plane("1"))
		.texture(baseUrl + "Veracidata/004Veracidata.png")
		.parent(veraciparent)
		.move(0, -10, 4.22)
		.scale(2, 2, 2)
		.rotate(0, 0, 0);
	wrap(plane("1"))
		.texture(baseUrl + "Veracidata/005Veracidata.png")
		.parent(veraciparent)
		.move(-30, -4, -17.8)
		.scale(2, 2, 2)
		.rotate(0, 0, -36);
	wrap(plane("1"))
		.texture(baseUrl + "Veracidata/006Veracidata.png")
		.parent(veraciparent)
		.move(-30, -4, 4.5)
		.scale(2, 2, 2)
		.rotate(0, 0, -36);		
		
	move(veracidataParent, 9, 0, 13.64);
	rotate(veracidataParent, 0, 92.705, 0);
			
	wrap(plane("VERACIDATA"))
		.texture(baseUrl + "Veracidata/veracidatacover.png")
		.parent(veraciparent)
		.move(10.10892, -1.718, 13.65)	
		.rotate(0, 92.705, 0)
		.scale(1, 1, 1)
		.color(200/255, 200/255, 200/255, 1);
			
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
	rotate(minidevs, 0, -90, 0);
	
	var mdTitle = text("MINIDEVS");
	
	var images = empty();
	wrap(images).parent(minidevs).rotate(90, 180, 0).scale(0.1, 0.1, 0.1);
	
	wrap(mdTitle)	
		.parent(minidevs)
		.scale(1.5, 1.5, 1.5)
		.color(1, 1, 1, 1);
	
	var mdUrl = baseUrl + "/MiniDevs/";
	
	wrap(plane("1"))
		.texture(mdUrl + "Another3DScanMinidev.png")
		.parent(images)
		.move(0, 0, -8.7);
	wrap(plane("1"))
		.texture(mdUrl + "brainstorming.png")
		.parent(images)
		.move(-18.5, 0, -0.2);
	wrap(plane("1"))
		.texture(mdUrl + "jimstart.png")
		.parent(images)
		.move(-12.8, 0, -10.9);
	wrap(plane("1"))
		.texture(mdUrl + "maherascanned.png")
		.parent(images)
		.move(-30.3, 0, -1.7);
	wrap(plane("1"))
		.texture(mdUrl + "MarianneVPMiniDevQuote.png")
		.parent(images)
		.move(-26.1, 0, -13.3);
	wrap(plane("1"))
		.texture(mdUrl + "MinidevPresentsXMAS.png")
		.parent(images)
		.move(30.76, 0, -1.03);
	wrap(plane("1"))
		.texture(mdUrl + "minidevsandmodels.png")
		.parent(images)
		.move(24.9, 0, -12.7);
	wrap(plane("1"))
		.texture(mdUrl + "MiniDevsGroupPhoto.png")
		.parent(images)
		.move(24.2, 0, 11.2);
	wrap(plane("1"))
		.texture(mdUrl + "MinidevWrapupTweet.png")
		.parent(images)
		.move(-13, 0, 11.1);
	wrap(plane("1"))
		.texture(mdUrl + "NewlandsKidsIdeas.png")
		.parent(images)
		.move(12.5, 0, 11.5);
	wrap(plane("1"))
		.texture(mdUrl + "sushi.png")
		.parent(images)
		.move(0, 0, 9.3);
	wrap(plane("1"))
		.texture(mdUrl + "TimDemoProjectR.png")
		.parent(images)
		.move(12.5, 0, -11.4);
	wrap(plane("1"))
		.texture(mdUrl + "TimInMR.png")
		.parent(images)
		.move(18.7, 0, 0);
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