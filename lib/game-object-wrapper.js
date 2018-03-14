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

whatsIn(globalScope);

var gameObjectInstructions = {
	
};

function addInstructions(obj, instructions) {
	//var instructionComponent = getInstructionComponent(obj);
	//
	//if (instructionComponent.uniqueId in gameObjectInstructions) { 
	//	var existingInstructions = gameObjectInstructions[instructionComponent.uniqueId];
	//	gameObjectInstructions[instructionComponent.uniqueId] = existingInstructions.concat(instructions);
	//}
	//else {
	//	gameObjectInstructions[instructionComponent.uniqueId] = instructions;
	//}
	if (!(instructionComponent.uniqueId in gameObjectInstructions)) {
		gameObjectInstructions[instructionComponent.uniqueId] =  [];
	}

	gameObjectInstructions[instructionComponent.uniqueId] = gameObjectInstructions[instructionComponent.uniqueId].concat(behaviours);
}

function callInstructions(instructionComponent){
	log('callInstructions');
	whatsIn(globalScope);

	var gameObjectUniqueId = instructionComponent.uniqueId;
	log('gameObjectUniqueId=' + gameObjectUniqueId);
	var info = globalScope[gameObjectUniqueId];
	log(info);
	
	log(gameObjectInstructions);
	whatsIn(gameObjectInstructions);
	
	var instructions = gameObjectInstructions[gameObjectUniqueId];
	
	log(instructions);
	
	for (var i = 0; i < instructions.length; i++){
		instructions[i](info.instructionComponent, info.time, info.player, info.collided, info.inGaze);
	}
}

//function callBehaviour(behaviourComponent, behaviourUniqueId) {
//	var gameObjectUniqueId = behaviourComponent.uniqueId;
//	var info = 	globalScope[gameObjectUniqueId];
//	gameObjectBehaviours[behaviourUniqueId]( info.time, info.collided, info.inGaze);
//}

function transitionPos(key, x, y, z, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endPosition = newVector(x, y, z);
	
	//obj, time, player, collided, inGaze
	return function(instructionComponent, time, player, collided, inGaze){
		log("1");
		if (getState(instructionComponent, "moveKey") !== key) {
			return;
		}
		log("2");
		if(!started){
			started = true;
			startTime = time;
		}
		log("3");
		if(startTime >= totalTime){
			setPosition(instructionComponent, endPosition);
			log("4");
			started = false;
			onComplete(instructionComponent);
			return;
		}
		log("5");
		setPosition(instructionComponent,
		lerpVector(instructionComponent.position, endPosition, startTime/totalTime));
		log("6");
	}
}

function transitionColour(key, r, g, b, a, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endColour = newColour(r, g, b, a);
	
	//obj, time, player, collided, inGaze
	return function(instructionComponent, time, player, collided, inGaze){
		if (getState(instructionComponent, "colourKey") !== key) {
			return;
		}
		
		if(!started){
			started = true;
			startTime = time;
		}
		
		if(startTime >= totalTime){
			setColour(instructionComponent, endColour);
			return;
		}
		
		//Broadcast, sound etc
		
		setColour(instructionComponent,
			lerpColour(
				instructionComponent.colour, 
				endColour, 
				startTime/totalTime));
	}
}

var getState = function(instructionComponent, keyName){
	return getObjectState(instructionComponent, keyName);
}

var setState = function(instructionComponent, keyName, value){
	setObjectState(instructionComponent, keyName, value);
}


