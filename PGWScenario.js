var state = -1;

function setup(){
	
}

function start(){
	
}

function update(){
	
}

var firstImage = null;
var secondImage = null;
var thirdImage = null;

var fourthImage = null;

function executeState(){
	if(state === 0){ //
		firstImage = plane("first");
		
		moveInFront(firstImage, 2.5);
		
		wrap(firstImage)
			//.texture(baseUrl + "VeracidataLeft.png")
			.rotate(-90, 0, 0)
			.scale(0.04, 0.04, 0.04)
			.move(-0.5, -0.5, 0)
			.state({
				moveKey: 'a',
				colorKey: 'a'
			})
			.color(1, 1, 1, 0)
			.instruction(transitionColor("a", 1, 1, 1, 1, 1, setKey("colorKey", "a")))
			.instruction(transitionPos("a", pos(firstImage).x, pos(firstImage).y + 0.5, pos(firstImage).z, 1, setKey("moveKey", "b")));		
			
			face(firstImage, newVector(ourPosition().x, ourPosition().y-0.5, ourPosition().z));
	}
	
	if(state === 1){ //
		secondImage = plane("second");
		
		move(secondImage, pos(firstImage).x, pos(firstImage).y, pos(firstImage).z);		
		
		wrap(secondImage)
			//.texture(baseUrl + "VeracidataLeft.png")
			.rotate(-90, 0, 0)
			.scale(0.04, 0.04, 0.04)
			.move(0.5, -0.5, 0)
			.state({
				moveKey: 'a',
				colorKey: 'a'
			})
			.color(1, 1, 1, 0)
			.instruction(transitionColor("a", 1, 1, 1, 1, 1, setKey("colorKey", "a")))
			.instruction(transitionPos("a", pos(secondImage).x, pos(secondImage).y + 0.5, pos(secondImage).z, 1, setKey("moveKey", "b")));	
			
			face(secondImage, newVector(ourPosition().x, ourPosition().y-0.5, ourPosition().z));
	}
	
	if(state === 2){ //
		thirdImage = plane("third");
		
		move(thirdImage, pos(secondImage).x, pos(secondImage).y, pos(secondImage).z);
		
		wrap(thirdImage)
			//.texture(baseUrl + "VeracidataLeft.png")
			.rotate(-90, 0, 0)
			.scale(0.04, 0.04, 0.04)
			.move(0.5, -0.5, 0)
			.state({
				moveKey: 'a',
				colorKey: 'a'
			})
			.color(1, 1, 1, 0)
			.instruction(transitionColor("a", 1, 1, 1, 1, 1, setKey("colorKey", "a")))
			.instruction(transitionPos("a", pos(thirdImage).x, pos(thirdImage).y + 0.5, pos(thirdImage).z, 1, setKey("moveKey", "b")));		
			
			face(thirdImage, newVector(ourPosition().x, ourPosition().y-0.5, ourPosition().z));
	}
	
	if(state === 3){ //
		destroy(firstImage);
		destroy(secondImage);
		destroy(thirdImage);
		
		fourthImage = plane("fourth");
		
		moveInFront(fourthImage, 2.5);			
		
		wrap(fourthImage)
			//.texture(baseUrl + "VeracidataLeft.png")
			.rotate(-90, 0, 0)
			.scale(0.08, 0.04, 0.04)
			.move(0, -0.5, 0)
			.state({
				moveKey: 'a',
				colorKey: 'a'
			})
			.color(1, 1, 1, 0)
			.instruction(transitionColor("a", 1, 1, 1, 1, 1, setKey("colorKey", "a")))
			.instruction(transitionPos("a", pos(fourthImage).x, pos(fourthImage).y + 0.5, pos(fourthImage).z, 1, setKey("moveKey", "b")));	
			
			face(fourthImage, newVector(ourPosition().x, ourPosition().y-0.5, ourPosition().z));
	}
	
	if(state === 4){ //
		
	}
	
	if(state === 5){ //
		
	}
}

function onClickEvent(obj){
		state++;
		executeState();

}