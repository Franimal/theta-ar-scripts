function setup(){
    loadAssetFromUrl("http://www.iconninja.com/files/271/730/523/archive-documents-open-folder-sheet-file-icon.png", "OpenIcon");
    loadAssetFromUrl("https://png.icons8.com/windows/1600/new-by-copy.png", "NewIcon");	
	loadAssetFromUrl("https://fs.bitcoinmagazine.com/img/images/bitcoin-volatility-analysis.width-800.png", "BTCGraph");
	loadAssetFromUrl("http://www.808.dk/vstreamer.asp?video=gizmo.mp4", "TestVideo");
	loadAssetFromUrl("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/29355d2374f829c8f238b3c55ce06981455aa389/2.0/BarramundiFish/glTF/BarramundiFish.gltf", "Model");	
}

var objectMenuOpen = false;

var fileMenu = null;

var objectMetaMenu = null;

var mediaMenu = null;
var primitivesMenu = null;
var locksMenu = null;

var currentMenu = null;

var playing = false;

function start(){
    openFileMenu();
}

function openFileMenu(){
    fileMenu = newMenu("FileMenu");
    currentMenu = fileMenu;
    billboard(fileMenu);
    moveInFront(fileMenu, 2);
    newMenuItem(fileMenu, "NewIcon", "New", "newExhibit");
    newMenuItem(fileMenu, "OpenIcon", "Open", "openExhibit");
    enable(fileMenu);
}

function openObjectMetaMenu(){
    disable(fileMenu);

    objectMetaMenu = newMenu("ObjectMetaMenu");
    currentMenu = objectMetaMenu;
    
	setPosition(objectMetaMenu, pos(fileMenu));

    newMenuItem(objectMetaMenu, "", "Media", "openMediaMenu");
    newMenuItem(objectMetaMenu, "", "Primitives", "openPrimitivesMenu");
    newMenuItem(objectMetaMenu, "", "Locks", "openLocksMenu"); 
    newMenuItem(objectMetaMenu, "", "Done", "finishExhibit");

    maximize(objectMetaMenu);
}

function openCurrentMenu(){
	billboard(fileMenu);
	moveInFront(fileMenu);
	billboard(currentMenu);
	moveInFront(currentMenu, 2);
    enable(currentMenu);
}

function closeCurrentMenu(){
    disable(currentMenu);
}

function openMediaMenu(){
    disable(objectMetaMenu);

    mediaMenu = newMenu("MediaMenu");
    currentMenu = mediaMenu;
    setPosition(mediaMenu, pos(objectMetaMenu));

    newMenuItem(mediaMenu, "", "Video1", "videoOne"); 
    newMenuItem(mediaMenu, "", "Image1", "imageOne");
    newMenuItem(mediaMenu, "", "Gallery1", "galleryOne");
    newMenuItem(mediaMenu, "", "Txt1", "textOne");
    newMenuItem(mediaMenu, "", "Audio1", "imageOne");
    newMenuItem(mediaMenu, "", "Model1", "modelOne");
    newMenuItem(mediaMenu, "", "Back", "closeMediaMenu");

    maximize(mediaMenu);
}

function galleryOne(){
	//var images = list();
	//add(images, "OpenIcon");
	//add(images, "NewIcon");
	//add(images, "BTCGraph");
	var one = gallery("OpenIcon", "NewIcon", "BTCGraph");
	moveInFront(one, 2);
	closeCurrentMenu();
}

function modelOne(){
	var model = createItem("Model");
	
	//rotate(model, 90, 180, 0);
	
	var modelE = exhibit(model);
	moveInFront(modelE, 2);
	closeCurrentMenu();
}


function textOne(){
	var txt = text("Hello!");
	
	//rotate(txt, 90, 180, 0);
	
	var txtE = exhibit(txt);
	moveInFront(txtE, 2);
	closeCurrentMenu();
}

function videoOne(){
	var vid = createItem("TestVideo");
	
	rotate(vid, 90, 180, 0);
	
	var vidE = exhibit(vid);
	moveInFront(vidE, 2);
	
	play(vidE);
	closeCurrentMenu();
}

function imageOne(){
	var graphImg = createItem("BTCGraph");
	
	rotate(graphImg, 90, 180, 0);
	
	var graph = exhibit(graphImg);
	moveInFront(graph, 2);
	closeCurrentMenu();
}

function closeMediaMenu(){
    disable(mediaMenu);
	currentMenu = objectMetaMenu;
    openCurrentMenu();
}

function openPrimitivesMenu(){
    disable(objectMetaMenu);
    
    primitivesMenu = newMenu("PrimitivesMenu");
    currentMenu = primitivesMenu;
    setPosition(primitivesMenu, pos(objectMetaMenu));

    newMenuItem(primitivesMenu, "", "Cube", "primitiveCube"); 
    newMenuItem(primitivesMenu, "", "Sphere", "primitiveSphere");
    newMenuItem(primitivesMenu, "", "Cylinder", "primitiveCylinder");
    newMenuItem(primitivesMenu, "", "Back", "closePrimitivesMenu");

    maximize(primitivesMenu);
}

function closePrimitivesMenu(){
    disable(primitivesMenu);
	currentMenu = objectMetaMenu;
    openCurrentMenu();
}

function openLocksMenu(){
    disable(objectMetaMenu);
    locksMenu = newMenu("LocksMenu");
    currentMenu = locksMenu;
    setPosition(locksMenu, pos(objectMetaMenu));
    
	newMenuItem(locksMenu, "", "Color Lock", "createColorLock");
    newMenuItem(locksMenu, "", "Back", "closeLocksMenu");

    maximize(locksMenu);
}

function createColorLock(){
	var lock = newColorLock("BBBB");
}

function closeLocksMenu(){
    disable(locksMenu);
	currentMenu = objectMetaMenu;
    openCurrentMenu();
}

var objects = null;

function finishExhibit(){
//Save exhibit, then disable all exhibit boxes and enter 'play' mode.  
	save("exhibit");
	
	disableAllMenus();
	removeExhibitBoxes();
	
	cubeA = createCube("Left", new Vector3(-0.5, 0, 2), new Vector3(0, 0, 0), new Vector3(0.4, 0.4, 0.4));
	setColor(cubeA, 255, 0, 0, 1);
	cubeB = createCube("Middle", new Vector3(0, 0, 2), new Vector3(0, 0, 0), new Vector3(0.4, 0.4, 0.4));
	cubeC = createCube("Right", new Vector3(0.5, 0, 2), new Vector3(0, 0, 0), new Vector3(0.4, 0.4, 0.4));
	
	objects  = new ObjectList();
	for(var i = 0; i < 5; i += 1){
		var pos = new Vector3(-4, 0, 2 + 1 * i);
		objects.Add(createCube("cube", pos, new Vector3(0, 0, 0), new Vector3(0.4, 0.4, 0.4)));
	}
	
	playing = true;
}

function update(time, player, left, right){
   
}

function primitiveCube(){
    onClick(null);
    var pos = new Vector3();
    var rot = new Vector3();
    var scale = new Vector3(0.4, 0.4, 0.4);
    var cube = exhibit(createCube("Cube", pos, rot, scale));
    moveInFront(cube, 2);
}

function primitiveSphere(){
    onClick(null);
    var pos = new Vector3();
    var rot = new Vector3();
    var scale = new Vector3(0.4, 0.4, 0.4);
    var sphere = exhibit(createSphere("Cube", pos, rot, scale));
    moveInFront(sphere, 2);
}

function primitiveCylinder(){
    onClick(null);
    var pos = new Vector3();
    var rot = new Vector3();
    var scale = new Vector3(0.4, 0.4, 0.4);
    var cylinder = exhibit(createCylinder("Cube", pos, rot, scale));
    moveInFront(cylinder, 2);
}

function fireFish(){
	var arrow = createItem("Model");
    move(arrow, ourPosition().x, ourPosition().y, ourPosition().z);
    moveInDirection(arrow, forward(), 0.5);
	onCollision(arrow, "destroyCube");
}

function destroyCube(hitObj){
log("collision");
	if(inList(objects, hitObj)){
		destroy(hitObj);
	}
}

function toggleShowCubeLock(){
	log("Creating color lo9ck");
	var l = createColorLock();
	moveInFront(l, 1);
}

function cubeAAction(){
	log("disabling cube a");
	disable(cubeA);
}

function cubeBAction(){
	log("enabling cube a");
	enable(cubeA);
}

function cubeCAction(){

}

var showCube = null;
var cubeA = null;
var cubeB = null;
var cubeC = null;

function onClickEvent(obj){
	if(playing){
		var isInList = inList(objects, obj);
		
		if(obj == null || isInList){
			fireFish();
		} else if(obj == showCube){
			toggleShowCubeLock();
		} else if(obj == cubeA){
			cubaAAction();
		} else if(obj == cubeB){
			cubeBAction();
		} else if(obj == cubeC){
			cubeCAction();
		}
		
	} else if(obj == null){
        if(objectMenuOpen){
            disableAllMenus();
            moveInFront(currentMenu, 2);
            billboard(currentMenu);
            openCurrentMenu();
            objectMenuOpen = false;
        } else {
            disableAllMenus();
            closeCurrentMenu();
            objectMenuOpen = true;
        }
    }
}

function disableAllMenus(){
    disable(fileMenu);
    disable(objectMetaMenu);
    disable(mediaMenu);
    disable(locksMenu);
    disable(primitivesMenu);
}

function newExhibit(){
    destroyAssets();
    disable(fileMenu);
    openObjectMetaMenu();
}

function openExhibit(){
    disable(fileMenu);
    openObjectMetaMenu();
	closeCurrentMenu();
	load("exhibit");
}