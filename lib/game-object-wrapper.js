var globalScope = this;

function whatsIn(obj) {
	log('whatsIn');
	var s = "";

	for(var p in obj) {
		if (p.indexOf('instruction') !== -1) {
			s += p + ': ' + obj[p] + "\n";
		}
		else {
			s += p + "\n";
		}
	}

	log(s);
}

var gameObjectInstructions = {
	
};

function addInstructions(obj, instructions) {
	var instructionComponent = getInstructionComponent(obj);
	
	if (instructionComponent.uniqueId in gameObjectInstructions) { 
		var existingInstructions = gameObjectInstructions[instructionComponent.uniqueId];
		gameObjectInstructions[instructionComponent.uniqueId] = existingInstructions.concat(instructions);
	}
	else {
		gameObjectInstructions[instructionComponent.uniqueId] = instructions;
	}
}

function callInstructions(instructionComponent){
	var gameObjectUniqueId = instructionComponent.uniqueId;

	var info = globalScope[gameObjectUniqueId];

	var instructions = gameObjectInstructions[gameObjectUniqueId];
	
	for (var i = 0; i < instructions.length; i++){
		instructions[i](info.instructionComponent, info.time, info.player, info.collided, info.inGaze);
	}
}

//function callBehaviour(behaviourComponent, behaviourUniqueId) {
//	var gameObjectUniqueId = behaviourComponent.uniqueId;
//	var info = 	globalScope[gameObjectUniqueId];
//	gameObjectBehaviours[behaviourUniqueId]( info.time, info.collided, info.inGaze);
//}

function instructionTest(key, x, y, z, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endPosition = newVector(x, y, z);
	
	return function(instructionComponent, time, player, collided, inGaze){
		if (instructionComponent.state.testKey !== key) {
			return;
		}
	}
}

function transitionPos(key, x, y, z, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endPosition = newVector(x, y, z);
	
	//obj, time, player, collided, inGaze
	return function(instructionComponent, time, player, collided, inGaze){
		if (instructionComponent.state.moveKey !== key) {
			return;
		}

		if(!started){
			started = true;
			startTime = time;
		}

		if(time - startTime >= totalTime){
			setPosition(instructionComponent.gameObject, endPosition);
			started = false;
			onComplete(instructionComponent);
			return;
		}
		setPosition(
			instructionComponent.gameObject, 
			lerpVector(instructionComponent.position, endPosition, (time - startTime) / totalTime));
	}
}

function transitionColor(key, r, g, b, a, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endColor = newColor(r, g, b, a);
	
	//obj, time, player, collided, inGaze
	return function(instructionComponent, time, player, collided, inGaze){		
		if (instructionComponent.state.colorKey !== key) {
			return;
		}
		
		if(!started){
			started = true;
			startTime = time;
		}
		
		if(time - startTime >= totalTime){
			setColor(instructionComponent.gameObject, endColor);
			started = false;
			onComplete(instructionComponent);
			return;
		}
		
		//Broadcast, sound etc
		var lerpedColor = lerpColor(instructionComponent.color, endColor, (time - startTime)/totalTime);

		setColor(instructionComponent.gameObject,
			lerpedColor);
	}
}

function setState(gameObject, getNextState) {
	var instructionComponent = getInstructionComponent(gameObject);
	
	var currentState = instructionComponent.state;
	var nextState = getNextState(currentState);
	instructionComponent.state = nextState;
	return nextState;
}