let canvas = document.getElementById("canvas");
canvas.width = 700;
canvas.height = 450;
let ctx = canvas.getContext("2d");

if (window.innerWidth <= 767) {
    let settings = document.getElementById("settings");
    let settings_content = `
        <div class="subtitle">Fluid A</div>
        <div class="section">
            <label for="raw1">Fluid Density (r)</label>
            <input type="text" id="raw1" name="raw1">
        </div>
        <div class="section">
            <label for="g">Gravitational Potential (g)</label>
            <input type="text" id="g" name="g">
        </div>
        <div class="section">
            <label for="h1">Height (h)</label>
            <input type="text" id="h1" name="h1">
        </div>
        <div class="section">
            <label for="atm">Atmospheric Pressure</label>
            <input type="text" id="atm" name="atm">
        </div>
        <div class="section">
            <label for="lidA">Isolated</label>
            <input type="checkbox" name="lidA" id="lidA">
        </div>
        <br>
        <div class="subtitle">Fluid B</div>
        <div class="section">
            <label for="raw2">Fluid Density</label>
            <input type="text" id="raw2" name="raw2">
        </div>
        <div class="section">
            <label for="lidB">Isolated</label>
            <input type="checkbox" name="lidB" id="lidB">
        </div>
    `;
    settings.innerHTML = settings_content;
    let settings_desktop = document.getElementById("desktop");
    settings_desktop.innerHTML = "";
}

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

let settings_desktop = document.querySelectorAll(".fluid");
let settings_phone = document.getElementById("fluid-phone");
let black = document.getElementById("black-background");

black.setAttribute("hidden", "true");
if (window.innerWidth <= 767) {
    settings_phone.setAttribute("hidden", "true");
    for (let i = 0; i < settings_desktop.length; i++) {
        settings_desktop[i].setAttribute("hidden", "true");
    }
}

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

let startingHeight;
let currentA;
let currentB;
let dA;
let dB;

let animationFrameId;

let layover = document.getElementById("layover");

g_txt.value = "9.81";

atm_txt.value = 1013;
g_txt.value = 9.81;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "start") {
        checkAvailability();
    } else if (targetElement.id === "info") {
        layover.setAttribute("hidden", "false");
    } else if (targetElement.id === "closeinfo") {
        layover.setAttribute("hidden", "true");
    } else if (targetElement.id === "open-settings") {
        settings_phone.setAttribute("hidden", "false");
        black.setAttribute("hidden", "false");
    } else if (targetElement.id === "close-settings") {
        settings_phone.setAttribute("hidden", "true");
        black.setAttribute("hidden", "true");
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
        settings_phone.setAttribute("hidden", "true");
        black.setAttribute("hidden", "true");
        window.setTimeout(start(), 300);
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
            if (gaugePressure_B < 0) {
                gaugePressure_B = AbsPressure_B;
            }
        }
    } else {
        AbsPressure_A = gaugePressure_A + atm;
        AbsPressure_B = AbsPressure_A;
        if (lidB === true) {
            gaugePressure_B = AbsPressure_B;
        } else {
            gaugePressure_B = AbsPressure_B - atm;
        }
    }

    fluidHeight_B = gaugePressure_B / (fluidDensity_B * g);

    startingHeight = (fluidHeight_A + fluidHeight_B) / 2;
    dA = startingHeight / 100;
    dB = startingHeight / 100;
    currentA = startingHeight;
    currentB = startingHeight;

    if (startingHeight >= fluidHeight_A) {
        dA = dA * -1;
    } 
    if (startingHeight >= fluidHeight_B) {
        dB = dB * -1;
    }

    if (animationFrameId) {
        cancelAnimationFrame(animate);
    } else {
        requestAnimationFrame(animate);
    }

    if (window.innerWidth > 767) {
        gaugePressure_A_txt.innerText = Math.floor(gaugePressure_A * 1000) / 1000;
        gaugePressure_B_txt.innerText = Math.floor(gaugePressure_B * 1000) / 1000;
        AbsPressure_A_txt.innerText = Math.floor(AbsPressure_A * 1000) / 1000;
        AbsPressure_B_txt.innerText = Math.floor(AbsPressure_B * 1000) / 1000;
        fluidHeight_B_txt.innerText = Math.floor(fluidHeight_B * 1000) / 1000;
    }
}

function drawTube() {
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
    ctx.lineWidth = 46;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
    
    for (let i = 100; i <= canvas.width - 100; i += 25) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(i, 320, 20, 5);
        ctx.closePath();
    }
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
        ctx.fillRect(((canvas.width - 200) / 2) + 155, 10 + (300 - height), 45, 10);
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

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTube();
    fluidA(currentA, lidA);
    fluidB(currentB, lidB);
    currentA += dA;
    currentB += dB;
    if (dA < 0) {
        if (currentA <= fluidHeight_A) {
            dA = 0;
            currentA = fluidHeight_A;
        }
    } else if (dA > 0) {
        if (currentA >= fluidHeight_A) {
            dA = 0;
            currentA = fluidHeight_A;
        }
    }
    
    if (dB < 0) {
        if (currentB <= fluidHeight_B) {
            dB = 0;
            currentB = fluidHeight_B;
        }
    } else if (dB > 0) {
        if (currentB >= fluidHeight_B) {
            dB = 0;
            currentB = fluidHeight_B;
        }
    }
    animationFrameId = requestAnimationFrame(animate);
}