function setup(){

}

function start(){
	
	var ob = createCube("Left", new Vector3(-0.5, 0, 2), new Vector3(0, 0, 0), new Vector3(0.4, 0.4, 0.4));
	
	var moveBehaviours = [
		transitionPos("a", 1, 1, 1, 1, setMoveKey("b")), 
		transitionPos("b", 1, 2, 1, 1, setMoveKey("c")), 
		transitionPos("c", 1, 1, 2, 1, setMoveKey("a"))
	];

	var colourBehaviours = [
		transitionColour("a", 255, 0, 0, 255, 2), 
		transitionColour(0, 255, 0, 255, 2), 
		transitionColour(0, 0, 255, 255, 2)
	];
	
	setState(ob, 'moveKey', 'a');
	setState(ob, 'colourKey', 'a');
	
	applybehaviours(ob, colourBehaviours);
	applybehaviours(ob, moveBehaviours);


var allBehavious = [move(1, 1, 1, 1), move(1, 2, 1, 1), move(1, 1, 2, 1), colour(255, 0, 0, 255, 2), colour(0, 255, 0, 255, 2), colour(0, 0, 255, 255, 2)];

}

function update(){

}
