/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("runner-game");

const context = canvas.getContext("2d");
const canvasObj = {
  width: 350,
  height: 450
};

let floor = {
  color: "green",
  x: 0,
  y: canvasObj.height - 30,
  width: canvasObj.width,
  height: canvasObj.height - (canvasObj.height - 30)
}

function drawCanvas (width, height) {
  canvas.width = width
  canvas.height = height
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);
}
