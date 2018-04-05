var state = -1;

setup(){
	
}

start(){
	
}

update(){
	
}

var firstImage = null;

function executeState(){
	if(state == 0){ //
		firstImage = plane("first");
		wrap(firstImage)
		//.texture(baseUrl + "VeracidataLeft.png")
		.rotate(-90, 0, 0)
		.scale(0.25, 1, 0.5);
		
	moveInFront(firstImage, 1);
	}
	
	if(state == 1){ //
		
	}
	
	if(state == 2){ //
		
	}
	
	if(state == 3){ //
		
	}
	
	if(state == 4){ //
		
	}
	
	if(state == 5){ //
		
	}
}

function onClickEvent(obj){
		state++;
		executeState();

}