// Toggle Menus
let sim_playground = document.getElementById("sim-playground");
let overlay = document.getElementById("overlay");
let activate_sim = document.getElementById("activate-sim");

let sim_options = [sim_playground, overlay];
let sim_activate = [activate_sim, overlay];

toggle_playground = function () {
    sim_options.forEach(function (e) {
        if (e.classList.contains("hidden")) {
            e.classList.remove("hidden");
        } else {
            e.classList.add("hidden");
        }
    });
};

toggle_sim = function () {
    sim_activate.forEach(function (e) {
        if (e.classList.contains("hidden")) {
            e.classList.remove("hidden");
        } else {
            e.classList.add("hidden");
        }
    });
};

add_force = function () {
    toggle_sim();
    console.log("Added a Force");
};

// Canvas Identity
let simulator = document.querySelector(".sim-area > .simulator");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function resizeCanvas() {
    let currHeight = simulator.clientHeight;
    let currWidth = simulator.clientWidth;

    canvas.height = currHeight;
    canvas.width = currWidth;
}

window.onresize = () => {
    resizeCanvas();
    drawAllForces();
};
window.onload = () => {
    resizeCanvas();
    drawAllForces();
};

// Zoom Logic
let baseUnit = 50;
let scale = 1.0;
let delta = 0.1;

function updateScale() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    zoomLabel.innerHTML = `${Math.floor(scale * 10) / 10}x`;
    drawAllForces();
}

function zoomIn() {
    scale += delta;
    if (scale >= 2.0) scale = 2.0;
    updateScale();
}

function zoomOut() {
    scale -= delta;
    if (scale <= 0.5) scale = 0.5;
    updateScale();
}

let zoomLabel = document.getElementById("zoomLabel");

canvas.addEventListener("wheel", function (event) {
    if (event.deltaY > 0) {
        zoomOut();
    } else if (event.deltaY < 0) {
        zoomIn();
    }
});

// Panning Logic
let offset = {
    X: 0,
    Y: 0,
};

let deltaCanvas = 25;

let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

canvas.onmousedown = (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
};

canvas.onmousemove = (e) => {
    if (!isDragging) return;

    let deltaX = e.clientX - lastMouseX;
    let deltaY = e.clientY - lastMouseY;

    offset.X += deltaX;
    offset.Y += deltaY;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    drawAllForces();
};

canvas.onmouseup = (e) => {
    isDragging = false;
};

canvas.onmouseleave = (e) => {
    isDragging = false;
};

// touchscreen controls
canvas.ontouchstart = (e) => {
    isDragging = true;
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
};

canvas.ontouchmove = (e) => {
    if (!isDragging) return;

    let deltaX = e.touches[0].clientX - lastMouseX;
    let deltaY = e.touches[0].clientY - lastMouseY;
    offset.X += deltaX;
    offset.Y += deltaY;
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;

    drawAllForces();
};

canvas.ontouchend = (e) => {
    isDragging = false;
};

canvas.ontouchcancel = (e) => {
    isDragging = false;
};

function pan(c) {
    switch (c) {
        case "l":
            offset.X -= deltaCanvas;
            break;
        case "t":
            offset.Y -= deltaCanvas;
            break;
        case "b":
            offset.Y += deltaCanvas;
            break;
        case "r":
            offset.X += deltaCanvas;
            break;
        default:
            console.error("Invalid Panning Argument");
    }
    drawAllForces();
}

let center = {
    X: canvas.width / 2 + offset.X,
    Y: canvas.height / 2 + offset.Y,
};

function updateCenter() {
    center.X = canvas.width / 2 + offset.X;
    center.Y = canvas.height / 2 + offset.Y;
}

// Draw the Canvas
function drawCoordinateAxis() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let center = {
        X: canvas.width / 2 + offset.X,
        Y: canvas.height / 2 + offset.Y,
    };

    updateCenter();

    ctx.lineWidth = 2;
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.moveTo(center.X, 0);
    ctx.lineTo(center.X, canvas.height);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(0, center.Y);
    ctx.lineTo(canvas.width, center.Y);
    ctx.stroke();
    ctx.closePath();

    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.25;

    let unit = baseUnit * scale;

    for (let i = center.X % unit; i <= canvas.width; i += unit) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        ctx.closePath();
    }

    for (let i = center.Y % unit; i <= canvas.height; i += unit) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
        ctx.closePath();
    }
}
