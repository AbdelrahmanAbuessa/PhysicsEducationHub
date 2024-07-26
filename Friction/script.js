let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
ctx.transform(1, 0, 0, -1, 0, canvas.height);

let Vi = document.getElementById("vi");
let theta = document.getElementById("angle");
let g = document.getElementById("g");
let path = document.getElementById("path");
let past = document.getElementById("past");

let hmax = document.getElementById("hmax");
let r = document.getElementById("r");
let tText = document.getElementById("t");

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "animate") {
        if (Vi.value === "" || theta.value === "" || g.value === "") {
            alert("Please fill all the fields");
        } else {
            renderPath(Vi.value * 4, theta.value * (Math.PI / 180), g.value, path.checked, past.checked, generateColor());
        }
    } else if (targetElement.id === "reset") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

function renderPath(vi, deg, g, path, past, color) {
    ctx.fillStyle = color;

    let vx = vi * Math.cos(deg);
    let vy = vi * Math.sin(deg);
    let ti = Date.now();

    function renderBallShowPath() {
        t = (Date.now() - ti) / 100;
        let x = vx * t;
        let y = vy * t - (0.5 * g * t * t);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        if (y < 0) {
            return;
        }
        setTimeout(renderBallShowPath, t);
    }

    function renderBallHidePath() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        t = (Date.now() - ti) / 100;
        let x = vx * t;
        let y = vy * t - (0.5 * g * t * t);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        if (y < 0) {
            return;
        }
        setTimeout(renderBallHidePath, t);
    }
    
    if (past) {
        if (path) {
            renderBallShowPath();
        } else {
            renderBallHidePath();
        }
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (path) {
            renderBallShowPath();
        } else {
            renderBallHidePath();
        }
    }

    hmax.innerText = `${calcHMAX(vi, deg, g)}`;
    r.innerText = `${calcR(vi, deg, g)}`;
    tText.innerText = `${calcT(vi, deg, g)}`;

}

function generateColor() {
    return `#${Math.floor(Math.random() * 1000000)}`;
}

function calcHMAX(vi, deg, g) {
    let a = Math.pow(vi / 4, 2);
    let b = Math.sin(deg);
    let bsqrt = Math.pow(b, 2);
    let c = 2 * g;
    let result = (a * bsqrt) / c;
    result = Math.floor(result * 100) / 100;
    return result;
}

function calcR(vi, deg, g) {
    let a = Math.pow(vi / 4, 2);
    let b = Math.sin(2 * deg);
    let c = a * b;
    let result = c / g;
    result = Math.floor(result * 100) / 100;
    return result;
}

function calcT(vi, deg, g) {
    let a = 2 * (vi / 4) * Math.sin(deg);
    let result = a / g;
    result = Math.floor(result * 100) / 100;
    return result;
}