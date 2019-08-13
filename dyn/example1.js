
// get the canvas object with id "canvas1"
var canvas = document.getElementById("canvas1");

// get the 2D drawing context for this canvas
var ctx = canvas.getContext('2d');

// all drawing operations happen with the context

// x axis line
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(100, 50);
ctx.stroke();
ctx.fillText("x", 100, 45);

// y axis line
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(50, 100);
ctx.stroke();
ctx.fillText("y", 40, 100);

// fill and stroke a triangle
ctx.beginPath();
ctx.moveTo(150, 100);
ctx.lineTo(300, 100);
ctx.lineTo(300, 150);
ctx.closePath();
ctx.lineWidth = 4;
ctx.strokeStyle = "rgb(255, 0, 0)";
ctx.fillStyle = "rgb(0, 255, 0)";
ctx.fill();
ctx.stroke();
