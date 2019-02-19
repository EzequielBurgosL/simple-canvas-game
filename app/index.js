const fps = 1000/60;

window.addEventListener("keydown", keyDown, false)
window.addEventListener("keyup",keyUp, false)

function game (){
  setInterval(() => {
    cubeGravity();
    cube1Movement();
    drawCanvas(canvasObj.width, canvasObj.height);
    component(floor.width, floor.height, floor.color, floor.x, floor.y)
    component(cube1.width, cube1.height, cube1.color, cube1.x, cube1.y)
  }, fps)
}

game()
