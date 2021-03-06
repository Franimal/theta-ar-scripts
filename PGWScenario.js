var state = -1;

var baseUrl = "https://raw.githubusercontent.com/Franimal/theta-ar-scripts/master/IntelliAg_Pics/"

function setup(){
	loadAssetFromUrl(baseUrl + "escolta.png", "first");
	loadAssetFromUrl(baseUrl + "Plantafol.png", "second");
	loadAssetFromUrl(baseUrl + "actiwet.png", "third");
	loadAssetFromUrl(baseUrl + "CustomerQuote.png", "fourth");
	loadAssetFromUrl(baseUrl + "QuoteConfirmed.png", "fifth");
}

function start(){
	
}

function update(){
	
}

var firstImage = null;
var secondImage = null;
var thirdImage = null;

var fourthImage = null;

var fifthImage = null;

function executeState(){
	if(state === 0){ //
		firstImage = createItem("first");
		setCollider(firstImage, false);
		moveInFront(firstImage, 1);
		
		wrap(firstImage)
			.rotate(-90, 0, 0)
			.scale(0.2, 0.005, 0.2)
			.move(0, 0, 0)
			.state({
				moveKey: 'a',
				colorKey: 'a'
			})
			.color(1, 1, 1, 0)
			.instruction(transitionColor("a", 1, 1, 1, 1, 1, setKey("colorKey", "b")));
			//.instruction(transitionPos("a", pos(firstImage).x, pos(firstImage).y + 0.5, pos(firstImage).z, 1, setKey("moveKey", "b")));		
			
			face(firstImage, newVector(ourPosition().x, ourPosition().y, ourPosition().z));
	}
	
	if(state === 1){ //
		destroy(firstImage);
		secondImage = createItem("second");
		setCollider(secondImage, false);
		moveInFront(secondImage, 1);	
		
		wrap(secondImage)
			.rotate(-90, 0, 0)
			.scale(0.2, 0.005, 0.2)
			.move(0, 0, 0)
			.state({
				moveKey: 'a',
				colorKey: 'a'
			})
			.color(1, 1, 1, 0)
			.instruction(transitionColor("a", 1, 1, 1, 1, 1, setKey("colorKey", "a")));
			//.instruction(transitionPos("a", pos(secondImage).x, pos(secondImage).y + 0.5, pos(secondImage).z, 1, setKey("moveKey", "b")));	
			
			face(secondImage, newVector(ourPosition().x, ourPosition().y, ourPosition().z));
	}
	
	if(state === 2){ //
		destroy(secondImage);
		thirdImage = createItem("third");
		setCollider(thirdImage, false);
		moveInFront(thirdImage, 1);
		
		wrap(thirdImage)
			.rotate(-90, 0, 0)
			.scale(0.2, 0.005, 0.2)
			.move(0, 0, 0)
			.state({
				moveKey: 'a',
				colorKey: 'a'
			})
			.color(1, 1, 1, 0)
			.instruction(transitionColor("a", 1, 1, 1, 1, 1, setKey("colorKey", "a")));
			//.instruction(transitionPos("a", pos(thirdImage).x, pos(thirdImage).y + 0.5, pos(thirdImage).z, 1, setKey("moveKey", "b")));		
			
			face(thirdImage, newVector(ourPosition().x, ourPosition().y, ourPosition().z));
	}
	
	if(state === 3){ //
		destroy(thirdImage);
		
		fourthImage = createItem("fourth");
		//setCollider(fourthImage, false);
		moveInFront(fourthImage, 1);			
		
		wrap(fourthImage)
			.rotate(-90, 0, 0)
			.scale(0.4, 0.005, 0.2)
			.move(0, 0, 0)
			.state({
				moveKey: 'a',
				colorKey: 'a'
			})
			.color(1, 1, 1, 0)
			.instruction(transitionColor("a", 1, 1, 1, 1, 1, setKey("colorKey", "a")));
			//.instruction(transitionPos("a", pos(fourthImage).x, pos(fourthImage).y + 0.5, pos(fourthImage).z, 1, setKey("moveKey", "b")));	
			
			face(fourthImage, newVector(ourPosition().x, ourPosition().y, ourPosition().z));
	}
	
	if(state === 4){ //		
		fifthImage = createItem("fifth");
		setCollider(fifthImage, false);
		moveInFront(fifthImage, 2.5);			
		
		wrap(fifthImage)
			.rotate(-90, 0, 0)
			.scale(0.4, 0.005, 0.2)
			.move(0, 0, 0);
			
		fifthImage.transform.position = fourthImage.transform.position;
		fifthImage.transform.rotation = fourthImage.transform.rotation;
		
		destroy(fourthImage);
	}
	
	if(state === 5){ //
		destroy(fifthImage);
		state = -1;
	}
}

function onClickEvent(obj){
		state++;
		executeState();

}