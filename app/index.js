/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("runner-game");
const context = canvas.getContext("2d");
const canvasWidth = 350;
const canvasHeight = 450;

drawCanvas = (width, height) => {
  canvas.width = width
  canvas.height = height
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);
}

drawCanvas(canvasWidth, canvasHeight);