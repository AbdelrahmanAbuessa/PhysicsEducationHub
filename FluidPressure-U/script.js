let canvas = document.getElementById("canvas");
canvas.width = 700;
canvas.height = 450;
let ctx = canvas.getContext("2d");

let fluidDensity_A_txt = document.getElementById("raw1");
let fluidDensity_B_txt = document.getElementById("raw2");
let fluidHeight_A_txt = document.getElementById("h1");
let fluidHeight_B_txt = document.getElementById("h2");
let gaugePressure_A_txt = document.getElementById("Gp1");
let gaugePressure_B_txt = document.getElementById("Gp2");
let AbsPressure_A_txt = document.getElementById("Ap1");
let AbsPressure_B_txt = document.getElementById("Ap2");
let lid_A_check = document.getElementById("lidA");
let lid_B_check = document.getElementById("lidB");
let atm_txt = document.getElementById("atm");
let g_txt = document.getElementById("g");

let fluidDensity_A;
let fluidDensity_B;
let gaugePressure_A;
let gaugePressure_B;
let AbsPressure_A;
let AbsPressure_B;
let fluidHeight_A;
let fluidHeight_B;
let lidA;
let lidB;
let atm;
let g;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "start") {
        checkAvailability();
    }
})

function checkAvailability() {
    if (
        fluidDensity_A_txt.value === "" ||
        fluidDensity_B_txt.value === "" ||
        fluidHeight_A_txt.value === "" ||
        atm_txt.value === "" ||
        g_txt.value === ""
    ) {
        alert("Please Fill out All fields");
    } else {
        start()
    }
}

function start() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fluidDensity_A = parseFloat(fluidDensity_A_txt.value);
    fluidDensity_B = parseFloat(fluidDensity_B_txt.value);
    fluidHeight_A = parseFloat(fluidHeight_A_txt.value);
    atm = parseFloat(atm_txt.value);
    g = parseFloat(g_txt.value);
    lidA = lid_A_check.checked;
    lidB = lid_B_check.checked;
    
    gaugePressure_A = fluidDensity_A * g * fluidHeight_A;
    
    if (lidA === true) {
        AbsPressure_A = gaugePressure_A;
        AbsPressure_B = AbsPressure_A;
        if (lidB === true) {
            gaugePressure_B = AbsPressure_B;
        } else {
            gaugePressure_B = AbsPressure_B - atm;
        }
    } else {
        AbsPressure_A = gaugePressure_A + atm;
        AbsPressure_B = AbsPressure_A;
        gaugePressure_B = AbsPressure_B;
    }

    fluidHeight_B = gaugePressure_B / (fluidDensity_B * g);

    drawTube(fluidDensity_A, fluidDensity_B);
    fluidA(fluidHeight_A, lidA);
    fluidB(fluidHeight_B, lidB);
}


function drawTube(dA, dB) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect((canvas.width - 200) / 2, 20, 5, 300);
    ctx.fillRect(((canvas.width - 200) / 2) + 200, 20, 5, 300);
    ctx.fillRect(((canvas.width - 200) / 2) + 150, 20, 5, 300);
    ctx.fillRect(((canvas.width - 200) / 2) + 50, 20, 5, 300);
    ctx.closePath();
    
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.arc(352.5, 320, 50, 0, Math.PI, false);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.arc(352.5, 320, 100, 0, Math.PI, false);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(352.5, 320, 75, 0, Math.PI, false);
    ctx.lineWidth = 45;
    if (dA > dB) {
        ctx.strokeStyle = "blue";
    } else if (dB > dA) {
        ctx.strokeStyle = "red";
    } else {
        ctx.strokeStyle = "purple"
    }
    ctx.stroke();
    ctx.closePath();
    
    for (let i = 100; i <= canvas.width - 100; i += 25) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(i, 320, 20, 5);
        ctx.closePath();
    }
    
    ctx.beginPath();
    
    ctx.closePath();
}

function fluidA(height, lid) {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(((canvas.width - 200) / 2) + 5, 20 + (300 - height), 45, height);
    ctx.closePath();
    
    if (lid === true) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(((canvas.width - 200) / 2) + 5, 10 + (300 - height), 45, 10);
        ctx.closePath();
    }

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(277.5, 322.5, 15, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    const textMetrics = ctx.measureText("A");
    const textWidth = textMetrics.width;
    const textHeight = parseInt(ctx.font, 10);
    const x = 277.5 - textWidth / 2;
    const y = 322.5 + textHeight / 2 / 1.5;
    ctx.fillText("A", x, y);
    ctx.closePath();
}

function fluidB(height, lid) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(((canvas.width - 200) / 2) + 155, 20 + (300 - height), 45, height);
    ctx.closePath();

    if (lid === true) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(((canvas.width - 200) / 2) + 155, 10 + (300 - height), 45, 20);
        ctx.closePath();
    }

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(427.5, 322.5, 15, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    const textMetrics = ctx.measureText("B");
    const textWidth = textMetrics.width;
    const textHeight = parseInt(ctx.font, 10);
    const x = 427.5 - textWidth / 2;
    const y = 322.5 + textHeight / 2 / 1.5;
    ctx.fillText("B", x, y);
    ctx.closePath();
}
