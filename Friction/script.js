let g_txt = document.getElementById("g");
let us_txt = document.getElementById("fsc");
let uk_txt = document.getElementById("fkc");
let fapp_txt = document.getElementById("fa");
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
        draw();    
    }
})

function dx() {

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.rect(X_init, 0, d, d);
    ctx.fill();
}