let canvas = document.getElementById("canvas");
canvas.height = 500

let ctx = canvas.getContext("2d");

let gtxt = document.getElementById("g");
let ustxt = document.getElementById("fsc");
let uktxt = document.getElementById("fkc");
let fapptxt = document.getElementById("fa");
let inctxt = document.getElementById("inc");

let r = 20;
canvas.width = r * 2;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "start") {
        start();        
    }
})

let ball = {
    x: r,
    y: r,
    gravity: (gtxt.value * (Math.sin(inctxt.value) - uktxt.value * Math.cos(inctxt.value))) / 100 * Math.PI,
    dy: fapptxt.value,
};

function renderBall() {    
    canvas.style.rotate = `${90-inc}deg`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, r, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function update() {
    ball.y += ball.dy;
    ball.dy += ball.gravity;
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
    }
}

function start() {
    renderBall();
    update()
    requestAnimationFrame(start);
}