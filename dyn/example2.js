
// get the canvas and context
var canvas = document.getElementById("canvas2");
var ctx = canvas.getContext('2d');

// get the name of the animation function for different webbrowsers
var requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;

// the drawing function will be called for each frame of animation
// t_ms will be the current time in milliseconds
var draw = function(t_ms) {

    var t = t_ms / 1000; // convert time to seconds

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // compute the positions using Math functions
    var x = 150 * Math.cos(t);
    var y = 50 * Math.sin(x / 150 * Math.PI);
    var r = 20;
    var a1 = 0;
    var a2 = 2 * Math.PI;

    // draw a filled and stroked circle
    ctx.beginPath();
    ctx.arc(200 + x, 100 + y, r, a1, a2);
    ctx.closePath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(0, 0, 255)";
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fill();
    ctx.stroke();

    // request the next frame
    requestAnimationFrame.call(window, draw);
};

// start the animation by requesting the first frame
requestAnimationFrame.call(window, draw);
