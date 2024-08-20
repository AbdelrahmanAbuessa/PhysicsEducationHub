let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;

let elevation1_range = document.getElementById("h1");
let elevation1_txt = document.getElementById("h1range");
elevation1_range.oninput = function () {
    elevation1_txt.innerText = elevation1_range.value;
}

let elevation2_range = document.getElementById("h2");
let elevation2_txt = document.getElementById("h2range");
elevation2_range.oninput = function () {
    elevation2_txt.innerText = elevation2_range.value;
}