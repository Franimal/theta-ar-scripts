function setup(){

}

function setKey(keyName, keyValue) {
	return function(instructionComponent) {
		if (!instructionComponent.state) {
			instructionComponent.state = {};
		}
		
		instructionComponent.state[keyName] = keyValue;
	}
}

function start(){	
	var obj = createCube("Left", new Vector3(-0.5, 0, 2), new Vector3(0, 0, 0), new Vector3(0.1, 0.1, 0.1));
	
	var sphere = createSphere("Sphere", new Vector3(0, 0, 3), new Vector3(0, 0, 0), new Vector3(0.2, 0.2, 0.2));
	var sphere2 = createSphere("Sphere", new Vector3(0, 0, 4), new Vector3(0, 0, 0), new Vector3(0.2, 0.2, 0.2)); 
	
	var cube = createCube("FlyUpCube", new Vector3(1, 0, 2), new Vector3(0, 0, 0), new Vector3(0.1, 0.1, 0.1));
	
	setState(obj, function (currentState) {
		return {
			moveKey: 'a',
			colorKey: 'a',
			testKey: 'a'
		};
	});
	
	// activeInstructions: ['move1', 'color1', 'test1']
	// activate('')
	// deActivate('')
	// setActiveInstructions(['', '', ''])
	
	setState(sphere, function (currentState) {
		return {
			orbitKey: 'a'
		};
	});
	
	setState(cube, function(currentState) {
		return {
			state: 'start',
			moveKey: 'a',
			colorKey: 'a'
		};
	});
	
	var moveInstructions = [
		transitionPos("a", 0, 0, 1, 1, setKey("moveKey", "b")), 
		transitionPos("b", -0.2, 0, 1, 1, setKey("moveKey", "c")), 
		transitionPos("c", 0, 0, 1, 1, setKey("moveKey", "d")),
		transitionPos("d", 0, 0.2, 1, 1, setKey("moveKey", "a")),
	];

	var colorInstructions = [
		transitionColor("a", 1, 0, 0, 1, 1, setKey("colorKey", "b")), 
		transitionColor("b", 0, 1, 0, 1, 1, setKey("colorKey", "c")), 
		transitionColor("c", 0, 0, 1, 1, 1, setKey("colorKey", "d")), 
		transitionColor("d", 1, 1, 1, 0, 1, setKey("colorKey", "a"))		
	];

	var orbitInstructions = [
		//orbitHorizontal("a", 1, 5, setKey("orbitKey`", "a")),
		//destroyOnHit("a", sphere2)
		fadeWhenClose("fade", 10, 0.5, setKey("orbitKey", "a"))
	];
	
	var orbitInstructions2 = [
		//orbitVertical("a", 1, 5, setKey("orbitKey`", "a")),
		//destroyOnHit("a", sphere),
		fadeWhenClose("fade", 10, 0.5, setKey("orbitKey", "a"))
	];
	
	var cubeInstructions = [
		transitionColor("b", 0, 1, 0, 1, 1, setKey("state", "start")),
		playerDistanceTrigger("start", 1, function() {setKey("moveKey", "do"); setKey("colorKey", "do")}),
		transitionColor("do", 0, 1, 0, 1, 1, setKey("state", "do")),
		transitionPos("do", 0, 0.2, 1, 1, setKey("state", "do"))
	];
	
	 addInstructions(obj, colorInstructions);

	 addInstructions(obj, moveInstructions);
	
     addInstructions(sphere, orbitInstructions);
	 
	 addInstructions(sphere2, orbitInstructions2);
	 
	 addInstructions(cube, cubeInstructions);
	 
}

function update(){

}