let m_txt = document.getElementById("m");
let g_txt = document.getElementById("g");
let us_txt = document.getElementById("fsc");
let uk_txt = document.getElementById("fkc");
let fapp_slider = document.getElementById("fa");
let fapp_txt = document.getElementById("force");
let inc_txt = document.getElementById("inc");
let container = document.querySelector(".simulation");
let btn = document.getElementById("start");
let disabled = document.querySelector("[disabled='true']");
let d = 50;

let appFrictionField = document.getElementById("app_friction");
let maxFrictionField = document.getElementById("max_friction");
let typeFrictionField = document.getElementById("type_friction");
let accelerationField = document.getElementById("a");

let mass;
let g;
let us;
let uk;
let fa;
let theta;
let max_friction;
let app_friction;
let type_friction;
let kinetic_friction;
let weight;
let weight_inclined;
let max_friction_inclined;
let kinetic_friction_inclined;
let opposing_max_inclined_friction;
let opposing_kinetic_inclined_friction;
let acceleration;

let layover = document.getElementById("layover");

let canvas = document.getElementById("canvas");
canvas.width = container.clientHeight * 0.9;
canvas.height = d;
let ctx = canvas.getContext("2d");

let X_init = (canvas.width - (d/2))/2;
X_init = 0;
let pos = X_init;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "start") {
        if (targetElement.getAttribute("disabled") === "false") {
            checkAvailability();
        }
    } else if (targetElement.id === "closeinfo") {
        layover.setAttribute("hidden", "true");
    } else if (targetElement.id === "info") {
        layover.setAttribute("hidden", "false");
    }
})


fapp_slider.oninput = function () {
    fapp_txt.innerText = fapp_slider.value;
}

function checkAvailability() {
    if (m_txt.value === "" || g_txt.value === "" || us_txt.value === "" || uk_txt.value === "" || inc_txt.value === "" || fapp_slider.value === 0) {
        alert("Please Insert a Number");
    } else {
        start();
        btn.setAttribute("disabled", "true");
        setTimeout(() => {
            btn.setAttribute("disabled", "false");
        }, 2000);
    }
}        
        
function start() {
    mass = parseFloat(m_txt.value);
    us = parseFloat(us_txt.value);
    uk = parseFloat(uk_txt.value);
    g = parseFloat(g_txt.value);
    fa = parseFloat(fapp_slider.value);
    theta = parseFloat(inc_txt.value) * (Math.PI / 180);
    weight = mass * g;
    max_friction = weight * us;
    kinetic_friction = weight * uk;
    weight_inclined = weight * Math.sin(theta);
    max_friction_inclined = max_friction * Math.cos(theta);
    kinetic_friction_inclined = kinetic_friction * Math.cos(theta);

    if (theta !== 0) {
        canvas.style.rotate = `-${theta}rad`;
        if (fa === 0) {
            if (weight_inclined <= max_friction_inclined) {
                app_friction = weight_inclined;
                type_friction = "static";
                pos = (canvas.width - d) / 2;
                maxFrictionField.innerText = Math.round(max_friction_inclined * 1000) / 1000;
                draw(pos);
            } else if (weight_inclined > max_friction_inclined) {
                if (fa > max_friction_inclined + weight_inclined) {
                    type_friction = "kinetic";
                    app_friction = kinetic_friction_inclined + weight_inclined;
                    pos = (canvas.width - d) / 2;
                    maxFrictionField.innerText = Math.round(max_friction_inclined * 1000) / 1000;
                    requestAnimationFrame(updatePositionInclinedNoAppliedForce);
                } else if (fa < max_friction_inclined + weight_inclined) {
                    kinetic_friction_inclined = fa;
                    app_friction = kinetic_friction_inclined + weight_inclined;
                    type_friction = "kinetic";
                    pos = (canvas.width - d) / 2;
                    maxFrictionField.innerText = Math.round(max_friction_inclined * 1000) / 1000;
                    requestAnimationFrame(updatePositionInclinedAppliedForceNotSufficient);
                } else if (fa === max_friction_inclined + weight_inclined) {
                    app_friction = fa;
                    type_friction = "static";
                    pos = (canvas.width - d) / 2;
                    maxFrictionField.innerText = Math.round(max_friction_inclined * 1000) / 1000;
                    draw(pos);
                }
            }
        } else if (fa !== 0) {
            type_friction = "kinetic";
            app_friction = kinetic_friction_inclined + weight_inclined;
            pos = (canvas.width - d) / 2;
            maxFrictionField.innerText = Math.round(max_friction_inclined * 1000) / 1000;
            requestAnimationFrame(updatePositionInclinedAppliedForce);
        }
    } else {
        canvas.style.rotate = `0rad`;
        if (fa <= max_friction) {
            type_friction = "static";
            app_friction = fa;
            maxFrictionField.innerText = Math.round(max_friction * 1000) / 1000;
            draw(pos);
        } else if (fa > max_friction) {
            type_friction = "kinetic";
            app_friction = kinetic_friction;
            maxFrictionField.innerText = Math.round(max_friction * 1000) / 1000;
            requestAnimationFrame(updatePositionStatic);
        }
    }

    appFrictionField.innerText = Math.round(app_friction * 1000) / 1000;
    typeFrictionField.innerText = type_friction;
}

let dx = 0;

function draw(pos) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.rect(pos, 0, d, d);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    const textMetrics = ctx.measureText(mass);
    const textWidth = textMetrics.width;
    const textHeight = parseInt(ctx.font, 10);
    const x = (d - textWidth) / 2 + pos;
    const y = (d + textHeight / 2) / 2;
    ctx.fillText(mass, x, y);
}

function updatePositionStatic() {
    pos -= dx;
    acceleration = (app_friction - fa) / mass / 10 
    dx += acceleration;
    draw(pos);
    if (pos < canvas.width - d) {
        animationFrameId = requestAnimationFrame(updatePositionStatic);
    } else if (pos >= canvas.width - d) {
        pos = X_init;
        dx = 0;
    }
    accelerationField.innerText = Math.round(acceleration * -1000) / 1000;
}

function updatePositionInclinedNoAppliedForce() {
    pos -= dx;
    acceleration = (weight_inclined - app_friction) / mass / 10;
    dx += acceleration;
    draw(pos);
    if (pos < canvas.width - d && pos >= 0) {
        animationFrameId = requestAnimationFrame(updatePositionInclinedNoAppliedForce);
    } else if (pos < 0) {
        pos = 0;
        dx = 0;
    } else if (pos >= canvas.width - d) {
        pos = X_init;
        dx = 0;
    }
    accelerationField.innerText = Math.round(acceleration * -1000) / 1000;
}

function updatePositionInclinedAppliedForceNotSufficient() {
    pos -= dx;
    acceleration = (app_friction - fa) / mass / 10;
    dx += acceleration;
    draw(pos);
    if (pos < canvas.width - d && pos >= 0) {
        animationFrameId = requestAnimationFrame(updatePositionInclinedAppliedForceNotSufficient);
    } else if (pos < 0) {
        pos = 0;
        dx = 0;
    } else if (pos >= canvas.width - d) {
        pos = X_init;
        dx = 0;
    }
    accelerationField.innerText = Math.round(acceleration * -1000) / 1000;
}

function updatePositionInclinedAppliedForce() {
    pos += dx;
    acceleration = (fa - app_friction) / mass / 10;
    dx += acceleration;
    draw(pos);
    if (pos < canvas.width - d && pos >= 0) {
        animationFrameId = requestAnimationFrame(updatePositionInclinedAppliedForce);
    } else if (pos < 0) {
        pos = 0;
        dx = 0;
    } else if (pos >= canvas.width - d) {
        pos = canvas.width - d;
        dx = 0;
    }
    accelerationField.innerText = Math.round(acceleration * -1000) / 1000;
}