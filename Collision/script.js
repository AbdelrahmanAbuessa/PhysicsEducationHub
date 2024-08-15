let mass1_txt = document.getElementById("m1");
let mass2_txt = document.getElementById("m2");
let velocity1_txt = document.getElementById("v1");
let velocityfinal1_text = document.getElementById("vf1");
let velocity2_txt = document.getElementById("v2");
let elastic = document.getElementById("e");
elastic.checked = true;

let vh2_txt = document.getElementById("vfh2");
let moment2_txt = document.getElementById("moment2");
let moment1_txt = document.getElementById("moment1");

let m1;
let v1;
let vf1
let m2;
let v2;
let vf2;
let m3;
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
        checkAvailability();
    }
})

function checkAvailability() {
    if (
        mass1_txt.value === "" || 
        mass2_txt.value === "" || 
        velocity1_txt.value === "" || 
        velocity2_txt.value === "" || 
        velocityfinal1_text.value === ""
    ) {
        alert("Please fill out all fields");
    } else if (
        parseFloat(mass1_txt) === NaN || 
        parseFloat(mass2_txt) === NaN || 
        parseFloat(velocity1_txt) === NaN || 
        parseFloat(velocity2_txt) === NaN || 
        parseFloat(velocityfinal1_text) === NaN
    ) {
        alert("Please enter correct numbers");
    } else {
        start();
    }
}

function start() {
    m1 = parseFloat(mass1_txt.value);
    m2 = parseFloat(mass2_txt.value);
    m3 = m1 + m2;
    v1 = parseFloat(velocity1_txt.value);
    v2 = parseFloat(velocity2_txt.value);
    vf1 = parseFloat(velocityfinal1_text.value);
    e = elastic.checked;
    
    if (e) {
        vf2 = ((m1 * v1) + (m2 * v2) - (m1 * vf1)) / m2;
    } else {
        vf2 = (((m1 * v1) + (m2 * v2)) / m3) - vf1;
    }

    t1 = m1 * 7;
    t2 = m2 * 7;
    
    pos1 = 0;
    pos2 = canvas.width - t2;

    vh2_txt.innerText = Math.floor(vf2 * 1000) / 1000;
    moment1_txt.innerText = Math.floor(m1 * v1 * 1000) / 1000;
    moment2_txt.innerText = Math.floor(m2 * v2 * 1000) / 1000;

    requestAnimationFrame(updatePosition);
}

function draw(pos, t, m, box) {
    ctx.beginPath();
    
    if (box === 1) {
        ctx.fillStyle = "blue";
    } else if (box === 2) {
        ctx.fillStyle = "red";
    } else if (box === 0) {
        ctx.fillStyle = "black";
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
    draw(pos1, t1, m1, 1);
    draw(pos2, t2, m2, 2);
    if (pos1 + t1 > pos2 || pos1 < pos2 - canvas.width) {
        collision();
    } else {
        pos1 += v1 / 2;
        pos2 -= v2 / 2;
        animationFrameId = requestAnimationFrame(updatePosition);
    }
}

function collision() {
    if (e) {
        requestAnimationFrame(collisionElastic);
    } else {
        requestAnimationFrame(collisionInElastic);
    }
}

function collisionElastic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (pos1 < 0) {
        pos1 = 0;
        vf1 = 0;
    } else if (pos2 > canvas.width - t2) {
        pos2 = canvas.width - t2;
        vf2 = 0;
    } else {
        animationFrameId = requestAnimationFrame(collisionElastic);
    }
    draw(pos1, t1, m1, 1);
    draw(pos2, t2, m2, 2);
    pos1 -= vf1 / 2;
    pos2 += vf2 / 2;
}

function collisionInElastic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(pos1, t1 + t2, m1 + m2, 0);
    pos1 += vf2 / 2;
    if (pos1 < 0) {
        pos1 = 0;
        vf2 = 0;
    } else if (pos1 > canvas.width - t1 - t2) {
        pos1 = canvas.width - t1 - t2;
        vf2 = 0;
    } else {
        animationFrameId = requestAnimationFrame(collisionInElastic);
    }
}