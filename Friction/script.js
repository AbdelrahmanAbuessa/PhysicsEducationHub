let m_txt = document.getElementById("m");
let g_txt = document.getElementById("g");
let us_txt = document.getElementById("fsc");
let uk_txt = document.getElementById("fkc");
let fapp_txt = document.getElementById("fa");
let inc_txt = document.getElementById("inc");
g_txt.value = 9.81;
let d = 50;

let canvas = document.getElementById("canvas");
canvas.width = 700;
canvas.height = d;
let ctx = canvas.getContext("2d");

let X_init = (canvas.width - (d/2))/2;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "start") {
        // checkAvailability();
        start();    
    }
})

function checkAvailability() {
    if (m_txt.value === "" || g_txt.value === "" || us_txt.value === "" || uk_txt.value === "" || fapp_txt.value === "" || inc_txt.value === "") {
        alert("Please Insert a Number");
    }
}

function start() {
    mass = parseFloat(m_txt.value);
    us = parseFloat(us_txt.value);
    uk = parseFloat(uk_txt.value);
    g = parseFloat(g_txt.value);
    fa = parseFloat(fapp_txt.value);
    theta = parseFloat(inc_txt.value);
    draw();
}

// if applied force > maximum friction force:
// calculate acceleration
// apply acceleration to block
// move block
// if applied force < maximum friction force:
// do nothing

// if inclinde:
// calculate incline stuff
// if not:
// calculate normal stuff

// start with normal stuff first

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.rect(X_init, 0, d, d);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    const textMetrics = ctx.measureText(mass);
    const textWidth = textMetrics.width;
    const textHeight = parseInt(ctx.font, 10);
    const x = (d - textWidth) / 2 + X_init;
    const y = (d + textHeight / 2) / 2;
    ctx.fillText(mass, x, y);
}