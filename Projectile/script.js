let ball = document.createElement("div");
ball.setAttribute("ball", "");
let canvas = document.querySelector(".render");

let Vi = document.querySelector("#vi");
let theta = document.querySelector("#angle");
let g = document.querySelector("#g");

let maxT = 50;

let Xmax = 1000;
let Ymax = 400;

let vi = 10;
let thetaVal = 45 * Math.PI / 180;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "animate") {
        for (let t = 0; t <= maxT; t += 0.001) {
            setTimeout(function () {
                renderBall(t);
            }, 1);
        }
    }
});

ball.style.bottom = "100px";

function renderBall(t) {
        canvas.innerHTML = "";
        ball.style.left = `${vi * Math.cos(thetaVal) * t}px`;
        ball.style.bottom = `${(vi * Math.sin(thetaVal) * t) - (0.5 * t * t * 9.81)}px`;
        canvas.appendChild(ball);
}