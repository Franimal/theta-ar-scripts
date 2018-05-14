***Wrapper functions***

  These may be called on a wrapped object.  Wrap an object using wrap(object).
  
  Call the functions like, for example, wrap(object).a().b().c().d();
  
  state(stateObject)
  
  instructions(instructionArray)
  
  instruction(instruction)
  
  move(float x, float y, float z)
  
  rotate(float x, float y, float z)
  
  scale(float x, float y, float z)
  
  emit(float r, float g, float b, float a)
  
  color(float r, float g, float b, float a)
  
  texture(texture)
  
  tileTexture(float tileX, float tileY)
  
  parent(parentObject)

***API Functions***

void showSpatialMesh(bool)

void enableSpatialMesh(bool)

bool isHololens()

void setCollider(object, bool)

void enable(object)

void disable(object)

void size(object, float)

void resetLeftHand()

void resetRightHand()

void leftHand(object)

void rightHand(object)

void raysOn(bool)

void setParent(object, parentObject)

void face(object, vector3)

void positionInLine(object, float spacing)

object empty()

object parent(object)

instructioncomponent getInstructionComponent(object)

instructioncomponent assureObjectHasWrapper(object)

color newColor(float r, float g, float b, float a)

vector3 newVector(float x, float y, float z)

vector3 lerpVector(vector3, Vector3, float)

color lerpColor(color, color, float)

bool inList(objectList, object)

void moveInDirection(object, vector3 direction, float speed)

vector3 ourPosition()

vector3 ourRotation()

vector3 forward()

float now()

float distance(object, object)

vector3 pos(object)

vector3 addVectors(vector3, vector3)

component getComponent(object, type)

object get(objectList, index)

object findByName(string)

void makeTwoSided(object)

void setEmission(object, color)

void setTextureTiling(object, float x, float y)

void setTexture(object, texture)

void bright(object)

void setRenderQueue(object, int)

void setColor(object, color)

float delta()

object createCube(string name, vector3 position, vector3 rotation, vector3 scale)

object createSphere(string name, vector3 position, vector3 rotation, vector3 scale)

object createPlane(string name, vector3 position, vector3 rotation, vector3 scale)

object createCylinder(string name, vector3 position, vector3 rotation, vector3 scale)

object floor(string name, vector3 position, vector3 rotation, vector3 scale)
