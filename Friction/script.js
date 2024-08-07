let m_txt = document.getElementById("m");
let g_txt = document.getElementById("g");
let us_txt = document.getElementById("fsc");
let uk_txt = document.getElementById("fkc");
let fapp_slider = document.getElementById("fa");
let fapp_txt = document.getElementById("force");
let inc_txt = document.getElementById("inc");
let d = 50;
g_txt.value = 9.81;

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

let canvas = document.getElementById("canvas");
canvas.width = 700;
canvas.height = d;
let ctx = canvas.getContext("2d");

let X_init = (canvas.width - (d/2))/2;
X_init = 0;
let pos = X_init;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "start") {
        checkAvailability();
    }
})

fapp_slider.oninput = function () {
    fapp_txt.innerText = fapp_slider.value;
}

function checkAvailability() {
    // if (m_txt.value === "" || g_txt.value === "" || us_txt.value === "" || uk_txt.value === "" || inc_txt.value === "" || fapp_slider.value === 0) {
    //     alert("Please Insert a Number");
    // } else {
    //     start();    
    // }
    start();    
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
        if (fa === 0) {
            if (weight_inclined <= max_friction_inclined) {
                app_friction = weight_inclined;
                type_friction = "static";
                pos = (canvas.width - d) / 2;
                draw(pos);
            } else if (weight_inclined > max_friction_inclined) {
                type_friction = "kinetic";
                app_friction = kinetic_friction_inclined;
                pos = (canvas.width - d) / 2;
                requestAnimationFrame(updatePositionInclinedNoAppliedForce);
                console.log("this is activated");
            }
        } else if (fa > 0) {
            // check if the force is greater than the sum of the normal friction AND the weight 
            // if the force is not greater
            // calculate the difference between the force and the friction AND weight
            // calculate acceleration using total F = ma
            // apply acceleration and slide down
            // if force is greater
            // calculate acceleration using total F = ma
            // apply acceleration and push upwards
        }
    } else {
        if (fa <= max_friction) {
            type_friction = "static";
            app_friction = fa;
            draw(pos);
        } else if (fa > max_friction) {
            type_friction = "kinetic";
            app_friction = kinetic_friction;
            requestAnimationFrame(updatePositionStatic);
        }
    }
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
    pos += dx;
    dx += (fa - app_friction) / mass / 10;
    if (dx < 0 && theta === 0) {
        console.log("Please enter proper numbers");
    } else {
        draw(pos);
    }
    if (pos < canvas.width - d) {
        animationFrameId = requestAnimationFrame(updatePositionStatic);
    } else if (pos >= canvas.width - d) {
        pos = X_init;
        dx = 0;
    }
}

function updatePositionInclinedNoAppliedForce() {
    pos -= dx;
    dx += (weight_inclined - app_friction) / mass / 10;
    draw(pos);
    if (pos < canvas.width - d && pos >= 0) {
        animationFrameId = requestAnimationFrame(updatePositionInclinedNoAppliedForce);
    } else if (pos < 0) {
        pos = 0;
        dx = 0;
    }
    console.log(dx);
}