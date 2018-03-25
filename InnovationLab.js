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
		
	move(veracidataParent, 15, 0, 13.64);
	rotate(veracidataParent, 0, 92.705, 0);
			
	wrap(plane("VERACIDATA"))
		.texture(baseUrl + "Veracidata/veracidatacover.png")
		.parent(veraciparent)
		.move(0.01, 8.48, 15.61)	
		.rotate(-14.804, 0, 0)
		.scale(2.199319, 0.879728, 0.879728)
		.color(200/255, 200/255, 200/255, 1);
			
	//SIX DEGREES
	var table = cylinder("table");
	wrap(table)
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
	
	wrap(plane("1"))
		.texture(baseUrl + "sixdegrees/021SixDegrees.png")
		.parent(table)
		.move(-1.1, 16.79, 0)
		.scale(0.1, 0.1, 0.1)
		.rotate(-232, 123, 2.5399);		
	wrap(plane("1"))
		.texture(baseUrl + "sixdegrees/022SixDegrees.png")
		.parent(table)
		.move(0, 3.68, 0.641)
		.scale(0.06518391, 0.1, 0.1)
		.rotate(90, 180, 38.77);		
	wrap(plane("1"))
		.texture(baseUrl + "sixdegrees/023SixDegrees.png")
		.parent(table)
		.move(-0.588, 3.56, 0.204)
		.scale(0.04802127, 0.1, 0.1)
		.rotate(-270, 180, 65.755);		
	wrap(plane("1"))
		.texture(baseUrl + "sixdegrees/024SixDegrees.png")
		.parent(table)
		.move(-0.016, 6.84, 0.822)
		.scale(0.0985442, 0.1, 0.4714607)
		.rotate(90, 0, -142.451);		
	wrap(plane("1"))
		.texture(baseUrl + "sixdegrees/025SixDegrees.png")
		.parent(table)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);	

	//MIXED REALITY
	
	//INTERNS
	
	//CRAIGS
	
	//YUPPL	
	//main green color: #1ab394
	var yupplParent = empty();
	wrap(yupplParent).parent(yupplParent).rotate(-90, 180, 0).scale(0.1, 0.1, 0.1);				
		
	wrap(text("Yuppl"))
		.scale(1, 1, 1)
		.color(26/255, 179/255, 148/255, 1);
		
	wrap(plane("1"))
		.texture(baseUrl + "Yuppl/007Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);	
		
	wrap(plane("2"))
		.texture(baseUrl + "Yuppl/008Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);
		
	wrap(plane("3"))
		.texture(baseUrl + "Yuppl/009Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);
		
	wrap(plane("4"))
		.texture(baseUrl + "Yuppl/010Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);
		
	wrap(plane("5"))
		.texture(baseUrl + "Yuppl/011Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);wrap(plane("1"))

	wrap(plane("6"))
		.texture(baseUrl + "Yuppl/012Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);
		
	wrap(plane("7"))
		.texture(baseUrl + "Yuppl/013Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);
		
	wrap(plane("8"))
		.texture(baseUrl + "Yuppl/014Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);
		
	wrap(plane("9"))
		.texture(baseUrl + "Yuppl/015Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);
		
	wrap(plane("10"))
		.texture(baseUrl + "Yuppl/016Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);
		
	wrap(plane("11"))
		.texture(baseUrl + "Yuppl/017Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);
		
	wrap(plane("12"))
		.texture(baseUrl + "Yuppl/018Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);
		
	wrap(plane("13"))
		.texture(baseUrl + "Yuppl/019Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);
		
	wrap(plane("14"))
		.texture(baseUrl + "Yuppl/020Yuppl.png")
		.parent(yupplParent)
		.move(-0.412, 7.48, -0.164)
		.scale(0.1, 0.1, 0.4285623)
		.rotate(90, -90, 180);	
	
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