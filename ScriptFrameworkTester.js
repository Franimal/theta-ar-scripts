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
	var obj = createCube("Left", new Vector3(-0.5, 0, 2), new Vector3(0, 0, 0), new Vector3(0.4, 0.4, 0.4));
	var sphere = createSphere("Left", new Vector3(-0.5, 0, 2), new Vector3(0, 0, 0), new Vector3(0.4, 0.4, 0.4));
	
	setState(obj, function (currentState) {
		return {
			moveKey: 'a',
			colorKey: 'a',
			testKey: 'a'
		};
	});

	setState(sphere, function (currentState){
		return {
			orbitKey: 'a'
		};
	});
	
	var moveInstructions = [
		transitionPos("a", 1, 1, 1, 1, setKey("moveKey", "b")), 
		transitionPos("b", 1, 2, 1, 1, setKey("moveKey", "c")), 
		transitionPos("c", 1, 1, 2, 1, setKey("moveKey", "a"))
	];

	var colorInstructions = [
		transitionColor("a", 1, 0, 0, 1, 1, setKey("colorKey", "b")), 
		transitionColor("b", 0, 1, 0, 1, 1, setKey("colorKey", "c")), 
		transitionColor("c", 0, 0, 1, 1, 1, setKey("colorKey", "a"))
	];
	
	var testInstructions = [
		instructionTest("a", 1, 1, 1, 1, setKey("testKey", "b"))
	];

	var orbitInstructions = [
		orbit("a", 2, 1, setKey("orbitKey`", "a"));
	];
	
	 addInstructions(obj, colorInstructions);

	 addInstructions(obj, moveInstructions);
	
	 addInstructions(obj, testInstructions);
	
     addInstructions(sphere, orbitInstructions);
}

function update(){

}