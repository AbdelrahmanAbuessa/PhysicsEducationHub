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
let v2_txt = document.getElementById("v2");
let raw_txt = document.getElementById("raw");
let g_txt = document.getElementById("g");
let w_txt = document.getElementById("w");

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
let w;

let collective1;
let collective2;

let animationFrameId;

let particles = [];

g_txt.value = 9.81

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "start") {
        checkAvailability();
    } else if (targetElement.id === "info") {
        layover.setAttribute("hidden", "false");
    } else if (targetElement.id === "closeinfo") {
        layover.setAttribute("hidden", "true");
    }
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

let posAXinitial;
let posBXinitial;
let posAYinitial;
let posBYinitial;

function start() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    g = parseFloat(g_txt.value);
    raw = parseFloat(raw_txt.value);
    p1 = parseFloat(p1_txt.value);
    p2 = parseFloat(p2_txt.value);
    e1 = parseFloat(e1_range.value);
    e2 = parseFloat(e2_range.value);
    v1 = parseFloat(v1_txt.value);

    e1 *= 25;
    e2 *= 25;

    posAXinitial = 0;
    posBXinitial = ((canvas.width - 75) / 2) + 10;
    posAYinitial = ((canvas.height - 75) / 2) - e1 + 25;
    posBYinitial = ((canvas.height - 75) / 2) - e2 + 25;

    collective1 = p1 + (0.5 * raw * Math.pow(v1, 2)) + (raw * g * e1);
    collective2 = p2 + (raw * g * e2);
    v2 = (collective1 - collective2) / (0.5 * raw);
    
    if (v2 < 0) {
        noFlow();
        v2_txt.innerText = 0;
        w_txt.innerText = 0;
    } else {
        v2 = Math.sqrt(v2);
        w = (p1 - p2) * (v2 - v1);
        v2_txt.innerText = Math.floor(v2 * 1000) / 1000;
        w_txt.innerText = Math.floor(w * 1000) / 1000;
        if (animationFrameId) {
            cancelAnimationFrame(animateFluid);
        } else {
            requestAnimationFrame(animateFluid);
        }
    }
    
    particles = [];

    for (let i = 1; i <= 15; i++) {
        let particleA = new Object({
            pipe: "A",
            posX: 0,
            posY: 0
        })
        particles.push(particleA);
        let particleB = new Object({
            pipe: "B",
            posX: 0,
            posY: 0
        })
        particles.push(particleB);
    }
    
    for (let i = 0; i <= particles.length - 1; i++) {
        if (particles[i].pipe === "A") {
            particles[i].posX = posAXinitial - (15 * (i + 1));
            if (i < 10) {
                particles[i].posY = posAYinitial;
            } else if (i >= 10 && i < 20) {
                particles[i].posY = posAYinitial + 15;
            } else if (i >= 20 && i < 30) {
                particles[i].posY = posAYinitial + 30;
            }
        } else {
            particles[i].posX = posBXinitial - (15 * (i + 1));
            if (i < 10) {
                particles[i].posY = posBYinitial;
            } else if (i >= 10 && i < 20) {
                particles[i].posY = posBYinitial + 15;
            } else if (i >= 20 && i < 30) {
                particles[i].posY = posBYinitial + 30;
            }
        }
    }
}

function drawPipeA(e1, e2) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, ((canvas.height - 75) / 2) - e1, (canvas.width - 75) / 2, 10);
    ctx.fillRect(0, ((canvas.height - 75) / 2) + 75 - e1, (canvas.width - 75) / 2, 10);
    ctx.closePath();
}

function drawPipeB(e1, e2) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(((canvas.width - 75) / 2) + 75, ((canvas.height - 75) / 2) - e2, (canvas.width - 75) / 2, 10);
    ctx.fillRect(((canvas.width - 75) / 2) + 75, ((canvas.height - 75) / 2) + 75 - e2, (canvas.width - 75) / 2, 10);
    ctx.closePath();
}

function drawPipeM(e1, e2) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    if (e1 >= e2) {
        ctx.fillRect((canvas.width - 76) / 2, ((canvas.height - 75) / 2) + 75 - e1, 10, (e1 - e2) + 10);
        ctx.fillRect((canvas.width - 94) / 2 + 75, ((canvas.height - 75) / 2) - e1, 10, (e1 - e2) + 10);
        ctx.fillRect((canvas.width - 76) / 2, ((canvas.height - 75) / 2) - e1, 75, 10);
        ctx.fillRect((canvas.width - 74) / 2, ((canvas.height - 75) / 2) + 75 - e2, 75, 10);
    } else {
        ctx.fillRect((canvas.width - 76) / 2, ((canvas.height - 75) / 2) - e2, 10, (e2 - e1) + 10);
        ctx.fillRect((canvas.width - 94) / 2 + 75, ((canvas.height - 75) / 2) + 75 - e2, 10, (e2 - e1) + 10);
        ctx.fillRect((canvas.width - 74) / 2, ((canvas.height - 75) / 2) - e2, 75, 10);
        ctx.fillRect((canvas.width - 76) / 2, ((canvas.height - 75) / 2) + 75 - e1, 75, 10);
    }
    ctx.fillStyle = "blue";
    if (e1 >= e2) {
        ctx.fillRect((canvas.width - 56) / 2, ((canvas.height - 55) / 2) - e1, 57, (e1 - e2) + 65);
    } else {
        ctx.fillRect((canvas.width - 56) / 2, ((canvas.height - 55) / 2) - e2, 57, (e2 - e1) + 65);
    }
    ctx.closePath();
}

function drawLiquidA(e) {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(0, (((canvas.height - 75) / 2) - e) + 10, ((canvas.width - 75) / 2) + 10, 65);
    ctx.closePath();
}

function drawLiquidB(e) {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(((canvas.width - 75) / 2) + 65, (((canvas.height - 75) / 2) - e) + 10, ((canvas.width - 75) / 2) + 10, 65);
    ctx.closePath();
}

function noFlow() {
    drawPipeA(e1, e2);
    drawLiquidA(e1);
    drawPipeB(e1, e2);
    drawLiquidB(e2);
    drawPipeM(e1, e2);
}

function FluidFlow() {
    drawPipeA(e1, 0);
    drawLiquidA(e1);
    drawPipeB(0, e2);
    drawLiquidB(e2);
    drawPipeM(e1, e2);
}

function animateFluid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    FluidFlow();
    fluidParticles();
    animationFrameId = requestAnimationFrame(animateFluid);
}

function fluidParticles() {
    for (let i = 0; i <= particles.length - 1; i++) {
        if (particles[i].pipe === "A") {
            particles[i].posX += v1 / 4;
            if (particles[i].posX > 0 && particles[i].posX <= (canvas.width - 94) / 2 + 75 - 10) {
                circle(particles[i].posX, particles[i].posY, 5);
            } else if (particles[i].posX > (canvas.width - 94) / 2 + 75 - 10) {
                particles[i].posX = posAXinitial;
            }
        } else if (particles[i].pipe === "B") {
            particles[i].posX += v2 / 4;
            if (particles[i].posX > ((canvas.width - 76) / 2) + 10 && particles[i].posX < canvas.width) {
                circle(particles[i].posX, particles[i].posY, 5);
            } else if (particles[i].posX > canvas.width) {
                particles[i].posX = posBXinitial;
            }
        }
    }
}

function circle(posX, posY, r) {
    ctx.beginPath();
    ctx.fillStyle = "lightblue"
    ctx.arc(posX, posY, r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
}