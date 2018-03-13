function transitionPos(key, x, y, z, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endPosition = newVector(x, y, z);
	
	//obj, time, player, collided, inGaze
	return function(info){		
		var obj = info.obj;
		log(obj);
		var time = info.time;
		log(time);
		var player = info.player;
		log(player);
		var collided = info.collided;
		log(collided);
		var inGaze = info.inGaze;
		log(inGaze);
		
		var state = obj.state;

		if (getState(state, "moveKey") !== key) {
			return;
		}
		
		if(!started){
			started = true;
			startTime = time;
		}
		
		if(startTime >= totalTime){
			setPosition(obj, endPosition);
			started = false;
			onComplete(obj);
			return;
		}
		
		setPosition(obj,
		lerpVector(obj.position, endPosition, startTime/totalTime));
	}
}

function transitionColour(key, r, g, b, a, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endColour = newColour(r, g, b, a);
	
	//obj, time, player, collided, inGaze
	return function(info){
		var obj = info.obj;
		var time = info.time;
		var player = info.player;
		var collided = info.collided;
		var inGaze = info.inGaze;
		
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


