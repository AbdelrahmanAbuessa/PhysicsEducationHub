let canvas = document.getElementById("canvas");
canvas.width = 700;
canvas.height = 450;
let ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(10, 10, 100, 100);