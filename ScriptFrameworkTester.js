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
		transitionColour("a", 255, 0, 0, 1, setState("colourKey", "b")), 
		transitionColour("b" 255, 0, 255, 1, setState("colourKey", "c")), 
		transitionColour("c", 0, 255, 255, 1, setState("colourKey", "a"))
	];
	
	setState(ob, 'moveKey', 'a');
	setState(ob, 'colourKey', 'a');
	
	applybehaviours(ob, colourBehaviours);
	applybehaviours(ob, moveBehaviours);
}

function update(){

}
