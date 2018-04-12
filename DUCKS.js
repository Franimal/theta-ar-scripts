function setup(){
	loadAssetFromUrl("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf", "Duck");
}

function start(){
	var colors = [
		{r: 0, g: 0, b: 0, a: 0},
		{r: 0, g: 0, b: 0, a: 0},
		{r: 0, g: 0, b: 0, a: 0},
		{r: 0, g: 0, b: 0, a: 0},
		{r: 0, g: 0, b: 0, a: 0},
		{r: 0, g: 0, b: 0, a: 0},
		{r: 0, g: 0, b: 0, a: 0},
		{r: 0, g: 0, b: 0, a: 0},
		{r: 0, g: 0, b: 0, a: 0},
		{r: 0, g: 0, b: 0, a: 0}
	];
	
  for(var xIndex = 0; xIndex < 10; xIndex++) {
	  for(var yIndex = 0; yIndex < 10; yIndex++) {
		  for(var zIndex = 0; zIndex < 10; zIndex++) {

				// cube("thing" + xIndex + "_" + yIndex + "_" + zIndex)// 
			  var thing = (xIndex % 2) === 0
				  ? createItem("Duck")
				  : sphere("thing" + xIndex + "_" + yIndex + "_" + zIndex);
			  
			  var x = 0 + xIndex; // horizontal
			  var y = 0 + yIndex; // up
			  var z = 2 + zIndex; // away
			  
			  wrap(thing)
				.move(x, y, z)
				.color(0, 1, 1, 0.5);
		  }	  
	  }	  
  }

}

function update(time, player, left, right){
	
}
