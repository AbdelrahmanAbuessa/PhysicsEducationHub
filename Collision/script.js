let mass1_txt = document.getElementById("m1");
let mass2_txt = document.getElementById("m2");
let velocity1_txt = document.getElementById("v1");
let velocityfinal1_text = document.getElementById("vf1");
let velocity2_txt = document.getElementById("v2");
let elastic = document.getElementById("e");

let m1;
let v1;
let vf1
let m2;
let v2;
let vf2;
let e;

let t1;
let t2;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let pos1 = 0;
let pos2 = canvas.width - t2;

canvas.width = 500;
canvas.height = 250;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "start") {
        // checkAvailability();
        start();
    }
})

function checkAvailability() {
    // if (mass1_txt.value === "" || mass2_txt.value === "" || velocity1_txt.value === "" || velocity2_txt.value === "") {
    //     alert("Please fill out all fields");
    // } else {
    //     start();
    // }
    // start();
}

function start() {
    m1 = parseFloat(mass1_txt.value);
    m2 = parseFloat(mass2_txt.value);
    v1 = parseFloat(velocity1_txt.value);
    v2 = parseFloat(velocity2_txt.value);
    e = elastic.checked;
    
    t1 = m1 * 7;
    t2 = m2 * 7;
    
    pos1 = 0;
    pos2 = canvas.width - t2;
    
    requestAnimationFrame(updatePosition);
}

function draw(pos, t, m, box) {
    ctx.beginPath();
    
    if (box === 1) {
        ctx.fillStyle = "blue";
    } else if (box === 2) {
        ctx.fillStyle = "red";
    }
    
    ctx.rect(pos, canvas.height - t, t, t);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    const textMetrics = ctx.measureText(m);
    const textWidth = textMetrics.width;
    const textHeight = parseInt(ctx.font, 10);
    const x = (t - textWidth) / 2 + pos;
    const y = ((t + textHeight) / 2) + canvas.height - t;
    ctx.fillText(m, x, y);

    ctx.closePath();
}


function updatePosition() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRects();
    pos1 += v1 / 2;
    pos2 -= v2 / 2;
    if (pos1 + t1 > pos2) {
        collision();
    } else {
        animationFrameId = requestAnimationFrame(updatePosition);
    }
}

function drawRects() {
    draw(pos1, t1, m1, 1);
    draw(pos2, t2, m2, 2);
}

function collision() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRects();
    if (e) {
        pos1 -= vf1 / 2;
        pos2 += vf2 / 2;
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}