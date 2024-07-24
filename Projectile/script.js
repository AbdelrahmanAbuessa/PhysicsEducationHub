let ball = document.createElement("div");
ball.setAttribute("ball", "");
let canvas = document.querySelector(".render");

let Vi = document.querySelector("#vi");
let theta = document.querySelector("#angle");
let g = document.querySelector("#g");
let maxt = 0;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "animate") {
        maxt = Math.sqrt(2 * 400 / g.value);
        for (let t = 0; t <= maxt; t += 2*Math.PI/1000) {
            setTimeout(function () {
                renderBall(t);
            }, 1);
        }
    }
});

ball.style.bottom = "170px";
ball.style.left = "17px";

function renderBall(t) {
        canvas.innerHTML = "";
        // ball.style.bottom = `calc(170px - ${0.5 * parseInt(g.value) * t * t}px)`;
        ball.style.left = `calc(17px + ${25 * t}px)`;
        canvas.appendChild(ball);
}
