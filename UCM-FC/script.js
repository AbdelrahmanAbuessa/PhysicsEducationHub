let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let centerRadius = 10;
let centerX = (canvas.width) / 2;
let centerY = (canvas.height) / 2;

ctx.beginPath();
ctx.fillStyle = "black"
ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2, false);
ctx.fill();
ctx.lineWidth = 3
ctx.arc(centerX, centerY, centerRadius * 25, 0, 0.2, false);
ctx.stroke();
ctx.closePath();