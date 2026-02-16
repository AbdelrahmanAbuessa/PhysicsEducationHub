// Toggle Menus
let sim_playground = document.getElementById("sim-playground");
let overlay = document.getElementById("overlay");
let activate_sim = document.getElementById("activate-sim");

let sim_options = [sim_playground, overlay];
let sim_activate = [activate_sim, overlay];

toggle_playground = function () {
    sim_options.forEach(function (e) {
        if (e.classList.contains("hidden")) {
            e.classList.remove("hidden");
        } else {
            e.classList.add("hidden");
        }
    });
};

toggle_sim = function () {
    sim_activate.forEach(function (e) {
        if (e.classList.contains("hidden")) {
            e.classList.remove("hidden");
        } else {
            e.classList.add("hidden");
        }
    });
};

add_force = function () {
    toggle_sim();
    console.log("Added a Force");
};

// Making the simulator responsive
let container = document.getElementById("sim-container");
let sim = document.querySelector("#sim-container > .simulator");

function resizeSimulator() {
    let dSize = window.innerWidth < 768 ? 0 : 10;

    if (container.clientWidth > container.clientHeight) {
        sim.style.width = `calc(${container.clientHeight}px - ${dSize}rem)`;
    } else {
        sim.style.width = `calc(${container.clientWidth}px - ${dSize}rem)`;
    }
}

window.onload = () => resizeSimulator();
window.addEventListener("resize", resizeSimulator);

// let canvas = document.querySelector(".axisgrid");
// let hirearchy = document.querySelector(".list");

// let menu = document.querySelector(".menu");

// let forceMagnitude = document.querySelector("#mag");
// let forceDirection = document.querySelector("#dir");

// let layover = document.getElementById("layover");

// let x = document.createElement("div");
// let y = document.createElement("div");
// x.setAttribute("axis", "");
// y.setAttribute("axis", "");
// x.style.setProperty("width", "100%");
// x.style.setProperty("height", "1px");
// y.style.setProperty("width", "1px");
// y.style.setProperty("height", "100%");

// let q1 = document.createElement("div");
// let q2 = document.createElement("div");
// let q3 = document.createElement("div");
// let q4 = document.createElement("div");
// q1.setAttribute("quarter", "");
// q2.setAttribute("quarter", "");
// q3.setAttribute("quarter", "");
// q4.setAttribute("quarter", "");
// q1.className = "q1";
// q2.className = "q2";
// q3.className = "q3";
// q4.className = "q4";
// q1.innerHTML = `Q <sub>1</sub>`;
// q2.innerHTML = `Q <sub>2</sub>`;
// q3.innerHTML = `Q <sub>3</sub>`;
// q4.innerHTML = `Q <sub>4</sub>`;

// let forceListUI = document.getElementById("forcelist");
// let blacklayover = document.getElementById("black-background");

// let forceList = [];

// let pi = 3.141592653598;

// let idText = document.querySelector("#IDValue");
// let magText = document.querySelector("#magnitudeValue");
// let dirText = document.querySelector("#directionValue");

// let xc = document.querySelector("#xc");
// let yc = document.querySelector("#yc");

// if (window.innerWidth <= 767) {
//     forceListUI.setAttribute("hidden", "true");
// }

// document.addEventListener("click", function (e) {
//     let elementTarget = e.target;
//     if (elementTarget.id === "activateMenu") {
//         menu.style.setProperty("display", "flex");
//         forceMagnitude.value = "";
//         forceDirection.value = "";
//     } else if (elementTarget.id === "disableMenu") {
//         menu.style.setProperty("display", "none");
//     } else if (elementTarget.id === "addForce") {
//         if (forceDirection.value === "" || forceMagnitude.value === "") {
//             alert("Please insert a number");
//         } else {
//             addForce();
//             menu.style.setProperty("display", "none");
//         }
//     } else if (elementTarget.className === "del") {
//         delForce(elementTarget.id);
//     } else if (elementTarget.id === "forceSelect") {
//         selectForce(elementTarget.getAttribute("force"));
//     } else if (elementTarget.id === "info") {
//         layover.setAttribute("hidden", "false");
//     } else if (elementTarget.id === "closeinfo") {
//         layover.setAttribute("hidden", "true");
//     } else if (elementTarget.id === "hamburger") {
//         forceListUI.setAttribute("hidden", "false");
//         blacklayover.setAttribute("hidden", "false");
//     } else if (elementTarget.id === "closemenu") {
//         forceListUI.setAttribute("hidden", "true");
//         blacklayover.setAttribute("hidden", "true");
//     }
// })

// // Adding Forces Function
// function addForce() {
//     let force = {
//         "id": forceList.length,
//         "magnitude": forceMagnitude.value,
//         "direction": forceDirection.value * (pi / 180),
//         "color": generateColor()
//     }
//     forceList.push(force);
//     renderAllForces();
// }

// // Deleting Forces Function
// function delForce(forceID) {
//     forceList.splice(forceID, 1);
//     renderAllForces();
// }

// // Rendering Forces Function
// function renderAllForces() {
//     canvas.innerHTML = "";
//     canvas.appendChild(x);
//     canvas.appendChild(y);
//     canvas.appendChild(q1);
//     canvas.appendChild(q2);
//     canvas.appendChild(q3);
//     canvas.appendChild(q4);

//     hirearchy.innerHTML = "";

//     for (let i = 0; i < forceList.length; i++) {
//         renderSingleForce(i, forceList[i].id, forceList[i].magnitude, forceList[i].direction, forceList[i].color);
//     }

//     let resultant = {
//         "magnitude": renderResultant().resultantMagnitude,
//         "direction": renderResultant().resultantDirection,
//     }

//     renderSingleForce(undefined, "resultant", resultant.magnitude, resultant.direction, "red");
// }

// // Random Color Generation Function
// function generateColor() {
//     return Math.floor(Math.random() * 1000000);
// }

// // Resultant Addition Function
// function renderResultant() {
//     let totalX = 0;
//     let totalY = 0;
//     let resultantMagnitude = 0;
//     let resultantDirection = 0;
//     for (let i = 0; i < forceList.length; i++) {
//         totalX += forceList[i].magnitude * Math.cos(forceList[i].direction);
//         totalY += forceList[i].magnitude * Math.sin(forceList[i].direction);
//     }
//     resultantDirection = Math.atan2(totalY , totalX);
//     xc.innerHTML = `${Math.floor(totalX * 1000) / 1000}`;
//     yc.innerHTML = `${Math.floor(totalY * 1000) / 1000}`;
//     let xsqrt = totalX * totalX;
//     let ysqrt = totalY * totalY;
//     resultantMagnitude = Math.sqrt(xsqrt + ysqrt);

//     return new Object (
//         {
//             resultantDirection, resultantMagnitude, totalX, totalY
//         }
//     )
// }

// // Rendering only one Force Function
// function renderSingleForce(i, id, mag, dir, color) {
//     let realIndex;
//     let userIndex;
//     if (id === "resultant") {
//         realIndex = "resultant";
//         userIndex = "res";
//     } else {
//         realIndex = i;
//         userIndex = i + 1;
//     }

//     // Adding Vectors to Canvas
//     let vectorHTML = document.createElement("div");
//     vectorHTML.setAttribute("vector", "");
//     vectorHTML.style.setProperty("width", `${mag * 10}px`);
//     vectorHTML.style.setProperty("background-color", `#${color}`);

//     let antiHTML = document.createElement("div");
//     antiHTML.setAttribute("antivector", "");
//     antiHTML.style.setProperty("width", `${mag * 10}px`);

//     let vectorID = document.createElement("div");
//     vectorID.innerHTML = `F<sub>${userIndex}</sub>`;
//     vectorID.style.setProperty("font-size", "18px");
//     vectorID.style.setProperty("position", "absolute");
//     vectorID.style.setProperty("left", `${mag * 10 + 10}px`);
//     vectorID.style.setProperty("transform", `rotate(${dir}rad)`);

//     let forceColorCode = document.createElement("style");
//     forceColorCode.innerHTML = `
//         #forceVector${id} [vector]::after {
//             border-color: transparent transparent transparent #${color};
//         }

//         #force${id} {
//             background-color: #${color};
//         }
//     `;

//     let forceHTML = document.createElement("div");
//     forceHTML.id = `forceVector${id}`;
//     forceHTML.style.setProperty("transform", `rotate(${0 - dir}rad)`);

//     forceHTML.appendChild(vectorID);
//     forceHTML.appendChild(vectorHTML);
//     forceHTML.appendChild(antiHTML);
//     forceHTML.appendChild(forceColorCode);
//     canvas.appendChild(forceHTML);

//     // Adding Forces to List
//     let forceListing = document.createElement("div");
//     forceListing.className = `force`;
//     forceListing.id = `force${id}`;
//     forceListing.innerHTML = `
//         <input type="radio" name="a" id="forceSelect" force="${realIndex}">
//         <p class="forceName">F<sub>${userIndex}</sub></p>
//         <div btn class="del" id="${realIndex}">Delete</div>
//     `;
//     hirearchy.appendChild(forceListing);
// }

// // Showing Selected Function Properties
// function selectForce(idName) {
//     if (idName === "resultant") {
//         idText.innerHTML = idName;
//         magText.innerHTML = Math.floor(renderResultant().resultantMagnitude * 1000) / 1000;
//         dirText.innerHTML = Math.floor(renderResultant().resultantDirection * (180 / Math.PI) * 1000) / 1000 + ` <sup>o</sup>`;
//     } else {
//         idText.innerText = parseInt(idName) + 1;
//         magText.innerHTML = forceList[parseInt(idName)].magnitude;
//         dirText.innerHTML = Math.floor(forceList[parseInt(idName)].direction * (180 / Math.PI) * 1000) / 1000 + ` <sup>o</sup>`;
//     }
// }
