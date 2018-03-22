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
		gameObjectInstructions[instructionComponent.uniqueId].push(instruction);
	}
	else {
		gameObjectInstructions[instructionComponent.uniqueId] = [instruction];
	}
}

function callInstructions(instructionComponent){
	var gameObjectUniqueId = instructionComponent.uniqueId;

	var info = globalScope[gameObjectUniqueId];

	var instructions = gameObjectInstructions[gameObjectUniqueId];
	//return function(instructionComponent, collided, inGaze, time, player, left, right){
	for (var i = 0; i < instructions.length; i++){
		instructions[i](info.instructionComponent, info.collided, info.inGaze, info.time, info.player, info.left, info.right);
	}
}

function destroyOnHit(key, objectToHit){
	var started = false;
	return function(instructionComponent, collided, inGaze, time, player, left, right){
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
	return function(instructionComponent, collided, inGaze, time, player, left, right){
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
	return function(instructionComponent, collided, inGaze, time, player, left, right){
		
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
	
	return function(instructionComponent, collided, inGaze, time, player, left, right){
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
	return function(instructionComponent, collided, inGaze, time, player, left, right){
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

function transitionScale(key, x, y, z, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endScale = newVector(x, y, z);
	
	//obj, time, player, collided, inGaze
	return function(instructionComponent, collided, inGaze, time, player, left, right){
		if (instructionComponent.state.scaleKey !== key) {
			return;
		}

		if(!started){
			started = true;
			startTime = time;
		}

		if(time - startTime >= totalTime){
			setScale(instructionComponent.gameObject, endScale);
			started = false;
			onComplete(instructionComponent);
			return;
		}
		setScale(
			instructionComponent.gameObject, 
			lerpVector(instructionComponent.scale, endScale, (time - startTime) / totalTime));
	}
}

function transitionRot(key, x, y, z, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endRotation = newVector(x, y, z);
	
	//obj, time, player, collided, inGaze
	return function(instructionComponent, collided, inGaze, time, player, left, right){
		if (instructionComponent.state.rotationKey !== key) {
			return;
		}

		if(!started){
			started = true;
			startTime = time;
		}

		if(time - startTime >= totalTime){
			setRotation(instructionComponent.gameObject, endRotation);
			started = false;
			onComplete(instructionComponent);
			return;
		}
		setRotation(
			instructionComponent.gameObject, 
			lerpVector(instructionComponent.rotation, endRotation, (time - startTime) / totalTime));
	}
}

function transitionColor(key, r, g, b, a, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endColor = newColor(r, g, b, a);
	
	//obj, time, player, collided, inGaze
	return function(instructionComponent, collided, inGaze, time, player, left, right){	
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

function bindLeftTouchpad(obj){
	return function(instructionComponent, collided, inGaze, time, player, left, right){	
		setPosition(obj.gameObject, left.touchpadTransform.gameObject);
	}
}

function bindRightTouchpad(transform){
	return function(instructionComponent, collided, inGaze, time, player, left, right){	
		setPosition(obj.gameObject, right.touchpadTransform.gameObject);
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

function cube(name){
	return createCube(name, newVector(0, 0, 0), newVector(0, 0, 0), newVector(1, 1, 1));
}

function sphere(name){
	return createSphere(name, newVector(0, 0, 0), newVector(0, 0, 0), newVector(1, 1, 1));
}

function cylinder(name){
	return createCylinder(name, newVector(0, 0, 0), newVector(0, 0, 0), newVector(1, 1, 1));
}

function isString(obj){
	return (typeof obj === 'string' || obj instanceof String);
}

function Wrapper(gameObject) {
	var _this = this;
	_this.gameObject = gameObject;

	_this.state = function state(stateObj){
		setState(_this.gameObject, function(){
			return stateObj;
		});
		return _this;
	};
	
	_this.setState = function(getNextState) {
		setState(_this.gameObject, getNextState);		
		return _this;
	};
	
	_this.instruction = function(instruction) {
		addInstruction(_this.gameObject, instruction);
		return _this;
	};
	
	_this.instructions = function(instructionArray) {
		addInstructions(_this.gameObject, instructionArray);
		return _this;
	};
	
	_this.move = function(x, y, z){
		move(_this.gameObject, x, y, z);
		return _this;
	}
	
	_this.rotate = function(x, y, z){
		rotate(_this.gameObject, x, y, z);
		return _this;
	}
	
	_this.scale = function(x, y, z){
		scale(_this.gameObject, x, y, z);
		return _this;
	}
	
	_this.emit = function(r, g, b, a){
		setEmission(_this.gameObject, newColor(r, g, b, a));
		return _this;
	}
	
	_this.color = function(r, g, b, a){
		setColor(_this.gameObject, newColor(r, g, b, a));
		return _this;
	}
	
	_this.texture = function(texture){
		if(isString(texture)){
			setWebTexture(_this.gameObject, texture);
		} else {
			setTexture(_this.gameObject, texture);
		}		
		return _this;
	}
	
	_this.tileTexture = function(tileX, tileY){
		setTextureTiling(_this.gameObject, tileX, tileY);
		return _this;
	}
	
	_this.parent = function(parentObject){
		setParent(_this.gameObject, parentObject);
		return _this;
	}
}

function wrap(gameObject) {
	return new Wrapper(gameObject);
}