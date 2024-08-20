let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;

let p1_txt = document.getElementById("p1");
let p2_txt = document.getElementById("p2");
let e1_range = document.getElementById("h1");
let e2_range = document.getElementById("h2");
let e1_txt = document.getElementById("h1range");
let e2_txt = document.getElementById("h2range");
let v1_txt = document.getElementById("v1");
let v2_txt = document.getElementById("v1");
let raw_txt = document.getElementById("raw");
let g_txt = document.getElementById("g");

e1_range.oninput = function () {
    e1_txt.innerText = e1_range.value;
}

e2_range.oninput = function () {
    e2_txt.innerText = e2_range.value;
}

let layover = document.getElementById("layover");

let p1;
let p2;
let v1;
let v2;
let e1;
let e2;
let raw;
let g;

g_txt.value = 9.81

document.addEventListener("click", function (e) {
    // let targetElement = e.target;
    // if (targetElement.id === "start") {
    //     checkAvailability();
    // } else if (targetElement.id === "info") {
    //     layover.setAttribute("hidden", "false");
    // } else if (targetElement.id === "closeinfo") {
    //     layover.setAttribute("hidden", "true");
    // }
    start();
})

function checkAvailability() {
    if (
        p1_txt.value === "" ||
        p2_txt.value === "" ||
        raw_txt.value === "" ||
        g_txt.value === "" ||
        v1_txt.value === ""
    ) {
        alert("Please fill out all fields");
    } else {
        start();
    }
}

function start() {
    g = g_txt.value;
    raw = raw_txt.value;
    p1 = p1_txt.value;
    p2 = p2_txt.value;
    e1 = e1_range.value;
    e2 = e2_range.value;
    v1 = v1_txt.value;
}

// drawPipeA(elevation1);
// drawPipeB(elevation2);
// drawPipeM(elevation1, elevation2);

function drawPipeA(elevation) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, ((canvas.height - 75) / 2) - elevation, ((canvas.width - 75) / 2) + 75, 10);
    ctx.fillRect(0, ((canvas.height - 75) / 2) + 75 - elevation, (canvas.width - 75) / 2, 10);
    ctx.closePath();
}

function drawPipeB(elevation) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(((canvas.width - 75) / 2) + 75, ((canvas.height - 75) / 2) - elevation, (canvas.width - 75) / 2, 10);
    ctx.fillRect(((canvas.width - 75) / 2), ((canvas.height - 75) / 2) + 75 - elevation, ((canvas.width - 75) / 2) + 75, 10);
    ctx.closePath();
}

function drawPipeM(e1, e2) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect((canvas.width - 76) / 2, ((canvas.height - 75) / 2) + 75 - e1, 10, (e1 - e2) + 10);
    ctx.fillRect((canvas.width - 94) / 2 + 75, ((canvas.height - 75) / 2) - e1, 10, (e1 - e2) + 10);
    ctx.fillStyle = "blue";
    ctx.fillRect((canvas.width - 57) / 2, ((canvas.height - 55) / 2) - e1, 57, (e1 - e2) + 65);
    ctx.closePath();
}