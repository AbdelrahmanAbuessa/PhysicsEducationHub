let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let r_txt = document.getElementById("r");
let m_txt = document.getElementById("m");
let v_txt = document.getElementById("v");
let omega_txt = document.getElementById("omega");
let pt_txt = document.getElementById("pt");
let fc_txt = document.getElementById("fc");

let btn = document.getElementById("start");

let centerRadius = 10;
let centerX = (canvas.width) / 2;
let centerY = (canvas.height) / 2;

let r;
let m;
let v;
let omega;
let pt;
let fc;

let startTime;
let endTime;

let angle = 0;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "start") {
        if (targetElement.getAttribute("disabled") === "false") {
            checkAvailability();
        }
    }
})

function checkAvailability() {
    if (r_txt.value === "" || m_txt.value === "" || v_txt.value === "") {
        alert("Please fill all fields");
    } else {
        r = 0;
        m = 0;
        v = 0;
        angle = 0;
        omega = 0;
        start();
        btn.setAttribute("disabled", "true");
        window.setInterval(function () {
            btn.setAttribute("disabled", "false");
        }, 2000);
    }
}

function start() {
    r = parseFloat(r_txt.value);
    m = parseFloat(m_txt.value);
    v = parseFloat(v_txt.value);
    fc = m * Math.pow(v, 2) / r;
    omega = v / r;
    pt = 360 / (omega * (180 / Math.PI));

    omega_txt.innerText = Math.floor(omega * 1000) / 1000;
    pt_txt.innerText = Math.floor(pt * 1000) / 1000;
    fc_txt.innerText = Math.floor(fc * 1000) / 1000;

    requestAnimationFrame(updateAngle);

    startTime = Date.now();
}

function updateAngle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(angle, r);
    angle += omega;

    if (angle > 360) {
        angle = 0;
        console.log("turn");
        endTime = Date.now();
        console.log((endTime - startTime) / 1000);
    } else {
        animationFrameId = requestAnimationFrame(updateAngle);
    }

}

function draw(angle, r) {
    angle = angle * Math.PI / 180;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "black"
    ctx.arc(centerX, centerY, centerRadius, 0 - angle, Math.PI * 2 - angle, false);
    ctx.fill();
    ctx.lineWidth = 3
    ctx.arc(centerX, centerY, r * 5, 0 - angle, 0.001 - angle, false);
    ctx.stroke();
    ctx.lineWidth = 5
    ctx.arc(centerX, centerY, r * 5, -0.1 - angle, 0.1 - angle, false);
    ctx.stroke();
    ctx.closePath();
}