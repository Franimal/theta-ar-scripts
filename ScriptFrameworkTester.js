function setup(){

}

function start(){	
	var ob = createCube("Left", new Vector3(-0.5, 0, 2), new Vector3(0, 0, 0), new Vector3(0.4, 0.4, 0.4))
		//.setState(function (currentState) {
		//	return {
		//		moveKey: 'a',
		//		colourKey: 'a'
		//	};
		//})
		//.addBehaviours(moveBehaviours)
		//.addBehaviours(colourBehaviours);
	
		var moveBehaviours = [
			transitionPos("a", 1, 1, 1, 1, setState(ob, "colourKey", "b")), 
			transitionPos("b", 1, 2, 1, 1, setState(ob, "colourKey", "c")), 
			transitionPos("c", 1, 1, 2, 1, setState(ob, "colourKey", "a"))
		];

	var colourBehaviours = [
			transitionColour("a", 255, 0, 0, 1, setState(ob, "colourKey", "b")), 
			transitionColour("b", 255, 0, 255, 1, setState(ob, "colourKey", "c")), 
			transitionColour("c", 0, 255, 255, 1, setState(ob, "colourKey", "a"))
		];
	
	setState(ob, 'moveKey', 'a')();
	setState(ob, 'colourKey', 'a')();
	
	applyBehaviours(ob, colourBehaviours);
	applyBehaviours(ob, moveBehaviours);
}

function update(){

}