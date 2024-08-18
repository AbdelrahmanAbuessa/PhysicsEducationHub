let mass1_txt = document.getElementById("m1");
let mass2_txt = document.getElementById("m2");
let velocity1_txt = document.getElementById("v1");
let velocity2_txt = document.getElementById("v2");
let elastic = document.getElementById("e");
elastic.checked = true;

let layover = document.getElementById("lay");

let btn = document.getElementById("start");

let vf1_txt = document.getElementById("vf1");
let vf2_txt = document.getElementById("vf2");
let moment1i_txt = document.getElementById("moment1i");
let moment2i_txt = document.getElementById("moment2i");
let moment1f_txt = document.getElementById("moment1f");
let moment2f_txt = document.getElementById("moment2f");
let KEi1_txt = document.getElementById("KEi1");
let KEi2_txt = document.getElementById("KEi2");
let KEf1_txt = document.getElementById("KEf1");
let KEf2_txt = document.getElementById("KEf2");
let totalKE_txt = document.getElementById("KE");
let totalP_txt = document.getElementById("moment");

let m1;
let v1;
let vf1
let m2;
let v2;
let vf2;
let m3;
let e;

let KEi_1;
let KEi_2;
let KEf_1;
let KEf_2;

let pi1;
let pi2;
let pf1;
let pf2;

let totalKE;
let totalP;

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
        if (targetElement.getAttribute("disabled") === "false") {
            checkAvailability();
        }
    }
})

function checkAvailability() {
    if (
        mass1_txt.value === "" || 
        mass2_txt.value === "" || 
        velocity1_txt.value === "" || 
        velocity2_txt.value === ""
    ) {
        alert("Please fill out all fields");
    } else {
        start();
        btn.setAttribute("disabled", "true");
        setTimeout(() => {
            btn.setAttribute("disabled", "false");
        }, 2000);
    }
}

function start() {
    m1 = parseFloat(mass1_txt.value);
    m2 = parseFloat(mass2_txt.value);
    m3 = m1 + m2;
    v1 = parseFloat(velocity1_txt.value);
    v2 = parseFloat(velocity2_txt.value);
    e = elastic.checked;
    
    KEi_1 = 0.5 * m1 * Math.pow(v1, 2);
    KEi_2 = 0.5 * m2 * Math.pow(v2, 2);
    
    pi1 = m1 * v1;
    pi2 = m2 * v2;
    
    if (e) {
        vf1 = (((m1 - m2) / (m1 + m2)) * v1) + (((2 * m2) / (m1 + m2)) * v2);
        vf2 = (((2 * m1) / (m1 + m2)) * v1) + (((m2 - m1) / (m1 + m2)) * v2);
    } else {
        vf2 = (pi1 - pi2) / m3;
        vf1 = vf2;
    }
    
    t1 = m1 * 5;
    t2 = m2 * 5;
    
    pos1 = 0;
    pos2 = canvas.width - t2;

    KEf_1 = 0.5 * m1 * Math.pow(vf1, 2);
    KEf_2 = 0.5 * m2 * Math.pow(vf2, 2);
    
    pf1 = m1 * vf1;
    pf2 = m2 * vf2;

    vf1_txt.innerText = Math.floor(vf1 * 1000) / 1000;
    vf2_txt.innerText = Math.floor(vf2 * 1000) / 1000;

    moment1i_txt.innerText = Math.floor(pi1 * 1000) / 1000;
    moment2i_txt.innerText = Math.floor(pi2 * 1000) / 1000;
    moment1f_txt.innerText = Math.floor(pf1 * 1000) / 1000;
    moment2f_txt.innerText = Math.floor(pf2 * 1000) / 1000;

    KEi1_txt.innerText = Math.floor(KEi_1 * 1000) / 1000;
    KEi2_txt.innerText = Math.floor(KEi_2 * 1000) / 1000;
    KEf1_txt.innerText = Math.floor(KEf_1 * 1000) / 1000;
    KEf2_txt.innerText = Math.floor(KEf_2 * 1000) / 1000;

    totalKE_txt.innerText = Math.floor((KEi_1 + KEi_2) * 1000) / 1000;
    totalP_txt.innerText = Math.floor((pi1 + pi2) * 1000) / 1000;

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
        pos1 += v1 / 3;
        pos2 -= v2 / 3;
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
    pos1 -= vf1 / 3;
    pos2 += vf2 / 3;
}

function collisionInElastic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(pos1, t1, m1, 1);
    draw(pos1 + t1, t2, m2, 2);
    pos1 += vf2 / 3;
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