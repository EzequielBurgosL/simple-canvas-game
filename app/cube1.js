// import floor from "./canvas.js"

let cube1 = {
  color: "red",
  x: 20,
  y: 20,
  width: 20,
  height:20,
  ySpeed: 0,
  gravity: 0.3,
  xSpeed: 0,
  friction: 0.4,
  acceleration: 0.3,
  xBounce: false,
  yBounce: false,
  alreadyJumped: false,
  movement: {
    left: false,
    right: false,
    jump: false,
  }
}

function component (width, height, color, posX, posY){
  context.fillStyle = color;
  context.fillRect(posX, posY, width, height);
}

function cubeGravity(){
  const { 
    y: cubeY, 
    height: cubeHeight,
    gravity,
    ySpeed
  } = cube1;
  const { y: floorY } = floor;
  
  cube1.y += cube1.ySpeed

  // Cube is falling
  if(cubeY <= (floorY - cubeHeight)){
    // Max Velocity
    if(ySpeed <= 10){
      cube1.ySpeed += gravity;
    }
  } else {
    cube1.alreadyJumped = false;    
    cube1.ySpeed = 0;
    cube1.y = floorY - cubeHeight
  }
}

function xMovement (direction){
  const { 
    x: cubeX, 
    width: cubeWidth,
    xSpeed,
    acceleration,
  } = cube1;
  const { width: canvasWidth } = canvasObj;
  
  cube1.x += (cube1.xSpeed * direction)

  // Cube is falling
  if(cubeX >= 0 && (cubeX <= (canvasWidth - cubeWidth))){
    // Max Velocity
    if(xSpeed <= 5){
      cube1.xSpeed += acceleration;
    }
  } else {
    cube1.xSpeed = 0;
    if(cubeX >= (canvasWidth - cubeWidth)) cube1.x = canvasWidth - cubeWidth;
    if(cubeX <= 0) cube1.x = 0;
  }
}

function cube1Jump() {
  const { alreadyJumped } = cube1;

  if(!alreadyJumped){
    cube1.alreadyJumped = true;
    cube1.ySpeed = -5;
  }
}

function friction() {
  const { movement } = cube1;
  const { left, right } = movement;

  // console.log('!(left && right): ', !(left && right));
  if(!(left || right)) {
    cube1.xSpeed = 0;
  }
}

function cube1Movement() {
  const { movement } = cube1;
  const { left, right, jump, alreadyJumped } = movement
  if(left) xMovement(-1);
  if(right) xMovement(1);
  if(jump) cube1Jump(); 
  friction() 
}

function keyDown(e) {
  const code = e.keyCode;
  const { movement } = cube1;
  const { left, right, jump } = movement

  switch (code) {
    case 65:
      cube1.movement.left = true;
      break; //"a" key
    case 37:
      if(jump) return;
      cube1.movement.left = true;
      break; //Left key
    case 87:
      if(jump) return;
      cube1.movement.jump = true;
      break; //"w" key
    case 38:
      cube1.movement.jump = true;
      break; //Up key
    case 68:
      cube1.movement.right = true;
      break; //"d" key
    case 39:
      cube1.movement.right = true;
      break; //Right key
    // case 83:
    //   cPosY += 5;
    //   break; //"s" key
    // case 40:
    //   cPosY += 5;
    //   break; //Down key
    default:
      console.log(code); //Everything else
  }
}

function keyUp(e) {
  const code = e.keyCode;

  switch (code) {
    case 65:
      cube1.movement.left = false;
      break; //"a" key
    case 37:
      cube1.movement.left = false;
      break; //Left key
    case 87:
      cube1.movement.jump = false;
      break; //"w" key
    case 38:
      cube1.movement.jump = false;
      break; //Up key
    case 68:
      cube1.movement.right = false;
      break; //"d" key
    case 39:
      cube1.movement.right = false;
      break; //Right key
    // case 83:
    //   cPosY += 5;
    //   break; //"s" key
    // case 40:
    //   cPosY += 5;
    //   break; //Down key
    default:
      console.log(code); //Everything else
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


function movement(component, xSpeed, ySpeed){
  function bouncing (position, size, wall, bounce, speed){
    if (component[position] >= wall - component[size]) component[bounce] = true;
    if (component[position] <= 0) component[bounce] = false;
    if (component[bounce]){
      component[position] -= speed;
    }else{
      component[position] += speed;
    }
  }

  bouncing("x", "width", canvasObj.width, "xBounce", xSpeed)
  bouncing("y", "height", canvasObj.height,"yBounce", ySpeed)
  return component;
}