let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
ctx.transform(1, 0, 0, -1, 0, canvas.height);
ctx.fillStyle = "red";

let Vi = document.getElementById("vi");
let theta = document.getElementById("angle");
let g = document.getElementById("g");
let path = document.getElementById("path");

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "animate") {
        if (Vi.value === "" || theta.value === "" || g.value === "") {
            alert("Please fill all the fields");
        } else {
            renderPath(Vi.value * 4, theta.value * (Math.PI / 180), g.value, path.checked);
        }
    }
});

function renderPath(vi, deg, g, path) {
    let vx = vi * Math.cos(deg);
    let vy = vi * Math.sin(deg);

    let ti = Date.now();
    function renderBall() {
        t = (Date.now() - ti) / 100;
        let x = vx * t;
        let y = vy * t - (0.5 * g * t * t);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        if (y < 0) {
            return;
        }
        setTimeout(renderBall, t);
    }

    if (path) {
        renderBall();
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderBall();
    }

}