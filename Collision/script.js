let mass1_txt = document.getElementById("m1");
let mass2_txt = document.getElementById("m2");
let velocity1_txt = document.getElementById("v1");
let velocity2_txt = document.getElementById("v2");
let elastic = document.getElementById("e");

let m1;
let v1;
let m2;
let v2;
let e;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "start") {
        checkAvailability();
    }
})

function checkAvailability() {
    if (mass1_txt.value === "" || mass2_txt.value === "" || velocity1_txt.value === "" || velocity2_txt.value === "") {
        alert("Please fill out all fields");
    } else {
        start();
    }
}

function start() {

}