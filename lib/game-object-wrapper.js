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

function addInstruction(obj, instruction) {
	var instructionComponent = getInstructionComponent(obj);
	
	if (instructionComponent.uniqueId in gameObjectInstructions) { 
		var existingInstructions = gameObjectInstructions[instructionComponent.uniqueId];
		gameObjectInstructions[instructionComponent.uniqueId].push(instructions);
	}
	else {
		gameObjectInstructions[instructionComponent.uniqueId] = [instruction];
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

function destroyOnHit(key, objectToHit){
	var started = false;
	return function(instructionComponent, time, player, collided, inGaze){
		if(!started){
			started = true;
			onCollision(instructionComponent.gameObject, null);
		}
		if(collided === objectToHit){
			instructionComponent.destroy();
		}
	}
}

function playerDistanceTrigger(key, doDistance, action){
	var done = false;
	return function(instructionComponent, time, player, collided, inGaze){
		if(done){
			return;
		}
		
		var dist = distance(instructionComponent.gameObject, player.gameObject);
		
		if(dist <= doDistance){
			done = true;
			action(instructionComponent);
		}
	}
}

function fadeWhenClose(key, distanceOpaque, distanceInvisible, onComplete){
	return function(instructionComponent, time, player, collided, inGaze){
		
		var colorA = newColor(instructionComponent.color.r, instructionComponent.color.g, instructionComponent.color.b, 1);
		
		var dist = distance(instructionComponent.gameObject, player.gameObject);

		var t = clamp((dist-distanceInvisible)/(distanceOpaque-distanceInvisible), 0, 1);

		var color = newColor(colorA.r, colorA.g, colorA.b, t);

		setColor(instructionComponent.gameObject, color);
	}
}

function orbitHorizontal(key, radius, totalTime, onComplete){
	return orbit(key, false, radius, totalTime, onComplete);
}

function orbitVertical(key, radius, totalTime, onComplete){
	return orbit(key, true, radius, totalTime, onComplete);
}

function orbit(key, vertical, radius, totalTime, onComplete){
	var startTime = 0;
	var pauseTime = 0;
	var startPause = 0;
	
	var localPauseTime = 0;
	
	var gazing = false;
	
	var started = false;
	
	var center = newVector(0, 0, 0);
	
	return function(instructionComponent, time, player, collided, inGaze){
		if(!started){
			center = newVector(instructionComponent.position.x, instructionComponent.position.y, instructionComponent.position.z);
			started = true;
		}
		if(inGaze){		
			if(!gazing){
				gazing = true;
				startPause = time;
			}
			localPauseTime = time - startPause;
		} else {
			if(gazing){
				pauseTime += localPauseTime;	
				gazing = false;
			}
			
			var t = ((time - pauseTime) - startTime) / totalTime;
			
			if((time - pauseTime) - startTime >= totalTime){
				startTime = (time - pauseTime);
			}
		
			var radians = t * 3.1415926535 * 2;
			if(vertical){
				var x = center.x + radius * Math.cos(radians);
				var y = center.y + radius * Math.sin(radians);
				var z = center.z;
			} else {
				var x = center.x + radius * Math.cos(radians);
				var y = center.y;
				var z = center.z + radius * Math.sin(radians);
			}
			
			setPosition(instructionComponent.gameObject, newVector(x, y, z));		
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

		setColor(
			instructionComponent.gameObject,
			lerpedColor);
	}
}

function clamp(num, min, max){
	return num <= min ? min : num >= max ? max : num;
}

function setState(gameObject, getNextState) {
	var instructionComponent = getInstructionComponent(gameObject);
	
	var currentState = instructionComponent.state;
	var nextState = getNextState(currentState);
	instructionComponent.state = nextState;
	return nextState;
}

function Wrapper(gameObject) {
	var _this = this;
	_this.gameObject = gameObject;

	_this.setState = function(getNextState) {
		setState(_this.gameObject, getNextState);		
		return _this;
	};
	
	_this.addInstruction = function(instruction) {
		addInstruction(_this.gameObject, instruction);
		return _this;
	};
	
	_this.addInstructions = function(instructions) {
		addInstructions(_this.gameObject, instructions);
		return _this;
	};
}

function wrap(gameObject) {
	return new Wrapper(gameObject);
}