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
		log("1");
		var moveBehaviours = [
			transitionPos("a", 1, 1, 1, 1, setState(ob, "colourKey", "b")), 
			transitionPos("b", 1, 2, 1, 1, setState(ob, "colourKey", "c")), 
			transitionPos("c", 1, 1, 2, 1, setState(ob, "colourKey", "a"))
		];
		log("2");
		var colourBehaviours = [
			transitionColour("a", 255, 0, 0, 1, setState(ob, "colourKey", "b")), 
			transitionColour("b", 255, 0, 255, 1, setState(ob, "colourKey", "c")), 
			transitionColour("c", 0, 255, 255, 1, setState(ob, "colourKey", "a"))
		];
		log("3");
	setState(ob, 'moveKey', 'a')();
		log("4");
	setState(ob, 'colourKey', 'a')();
		log("5");
	applyBehaviours(ob, colourBehaviours);
	log("6");
	applyBehaviours(ob, moveBehaviours);
	log("7");
}

function update(){

}