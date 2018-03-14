var globalScope = this;

function whatsInGlobalScope() {
	log('whatsInGlobalScope');
	var s = "";

	for(var p in globalScope) {
		if (p.indexOf('instruction') !== -1) {
			s += p + ': ' + globalScope[p] + "\n";
		}
		else {
			s += p + "\n";
		}
	}

	log(s);
}

whatsInGlobalScope();

var gameObjectInstructions = {
	
};

function addInstructions(instructionComponent, instructions) {
	if (!(instructionComponent.uniqueId in gameObjectInstructions)) {
		gameObjectInstructions[instructionComponent.uniqueId] =  [];
	}

	gameObjectInstructions[instructionComponent.uniqueId] = gameObjectInstructions[instructionComponent.uniqueId].concat(instructions);
}

function callInstructions(instructionComponent){
	log('callInstructions');
	whatsInGlobalScope();

	var gameObjectUniqueId = instructionComponent.uniqueId;
	var info = globalScope[gameObjectUniqueId];
	
	for(var i = 0; i < gameObjectInstructions[gameObjectUniqueId].length; i++){
			gameObjectInstructions[gameObjectUniqueId][i](info.obj, info.time, info.player, info.collided, info.inGaze);
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
	return function(obj, time, player, collided, inGaze){
		var state = obj.state;
		log("1");
		if (getState(state, "moveKey") !== key) {
			return;
		}
		log("2");
		if(!started){
			started = true;
			startTime = time;
		}
		log("3");
		if(startTime >= totalTime){
			setPosition(obj, endPosition);
			log("4");
			started = false;
			onComplete(obj);
			return;
		}
		log("5");
		setPosition(obj,
		lerpVector(obj.position, endPosition, startTime/totalTime));
		log("6");
	}
}

function transitionColour(key, r, g, b, a, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endColour = newColour(r, g, b, a);
	
	//obj, time, player, collided, inGaze
	return function(obj, time, player, collided, inGaze){
		var state = obj.state;

		if (getState(state, "colourKey") !== key) {
			return;
		}
		
		if(!started){
			started = true;
			startTime = time;
		}
		
		if(startTime >= totalTime){
			setColour(obj, endColour);
			return;
		}
		
		//Broadcast, sound etc
		
		setColour(obj,
			lerpColour(
				obj.colour, 
				endColour, 
				startTime/totalTime));
	}
}

var getState = function(obj, keyName){
	return getObjectState(obj, keyName);
}

var setState = function(obj, keyName, value){
	setObjectState(obj, keyName, value);
}


