let canvas = document.querySelector(".axisgrid");
let hirearchy = document.querySelector(".list");

let menu = document.querySelector(".layover");

let forceMagnitude = document.querySelector("#mag"); 
let forceDirection = document.querySelector("#dir"); 

let x = document.createElement("div");
let y = document.createElement("div");
x.setAttribute("axis", "");
y.setAttribute("axis", "");
x.style.setProperty("width", "inherit");
x.style.setProperty("height", "1px");
y.style.setProperty("width", "1px");
y.style.setProperty("height", "calc(100% - 49px)");

let forceList = [];

let pi = 3.141592653598;

let idText = document.querySelector("#IDValue");
let magText = document.querySelector("#magnitudeValue");
let dirText = document.querySelector("#directionValue");

document.addEventListener("click", function (e) {
    let elementTarget = e.target;
    if (elementTarget.id === "activateMenu") {
        menu.style.setProperty("display", "flex");
    } else if (elementTarget.id === "disableMenu") {
        menu.style.setProperty("display", "none");
    } else if (elementTarget.id === "addForce") {
        if (forceDirection.value === "" || forceMagnitude.value === "") {
            alert("Please insert a number");
        } else {
            addForce();
            menu.style.setProperty("display", "none");
        }
    } else if (elementTarget.className === "del") {
        delForce(elementTarget.id);
    } else if (elementTarget.id === "forceSelect") {
        selectForce(elementTarget.getAttribute("force"));
    }
})


// Adding Forces Function
function addForce() {
    let force = {
        "id": forceList.length,
        "magnitude": forceMagnitude.value,
        "direction": forceDirection.value * (pi / 180),
        "color": generateColor()
    }
    forceList.push(force);
    renderAllForces();
}

// Deleting Forces Function
function delForce(forceID) {
    forceList.splice(forceID, 1);
    renderAllForces();
}

// Rendering Forces Function
function renderAllForces() {    
    canvas.innerHTML = "";
    canvas.appendChild(x);
    canvas.appendChild(y);

    hirearchy.innerHTML = "";

    for (let i = 0; i < forceList.length; i++) {
        renderSingleForce(i, forceList[i].id, forceList[i].magnitude, forceList[i].direction, forceList[i].color);
    }

    let resultant = {
        "magnitude": renderResultant().resultantMagnitude,
        "direction": renderResultant().resultantDirection
    }

    renderSingleForce(undefined, "resultant", resultant.magnitude, resultant.direction, "red");
}

// Random Color Generation Function
function generateColor() {
    return Math.floor(Math.random() * 1000000);
}

// Resultant Addition Function
function renderResultant() {
    let totalX = 0;
    let totalY = 0;
    let resultantMagnitude = 0;
    let resultantDirection = 0;
    for (let i = 0; i < forceList.length; i++) {
        totalX += forceList[i].magnitude * Math.cos(forceList[i].direction);
        totalY += forceList[i].magnitude * Math.sin(forceList[i].direction);
    }
    resultantDirection = Math.atan2(totalY , totalX);
    totalX = totalX * totalX;
    totalY = totalY * totalY;
    resultantMagnitude = Math.sqrt(totalX + totalY);

    return new Object (
        {
            resultantDirection, resultantMagnitude
        }
    )
}

// Rendering only one Force Function
function renderSingleForce(i, id, mag, dir, color) {
    let realIndex;
    let userIndex;
    if (id !== "resultant") {
        realIndex = i;
        userIndex = i + 1;
    } else {
        realIndex = "resultant";
        userIndex = "res";
    }
    
    // Adding Vectors to Canvas
    let vectorHTML = document.createElement("div");
    vectorHTML.setAttribute("vector", "");
    vectorHTML.style.setProperty("width", `${mag * 10}px`);
    vectorHTML.style.setProperty("background-color", `#${color}`);
    
    let antiHTML = document.createElement("div");
    antiHTML.setAttribute("antivector", "");
    antiHTML.style.setProperty("width", `${mag * 10}px`);
    
    let vectorID = document.createElement("div");
    vectorID.innerHTML = `F<sub>${userIndex}</sub>`;
    vectorID.style.setProperty("font-size", "18px");
    vectorID.style.setProperty("position", "absolute");
    vectorID.style.setProperty("left", `${mag * 10 + 10}px`);
    vectorID.style.setProperty("transform", `rotate(${dir}rad)`);

    let forceColorCode = document.createElement("style");
    forceColorCode.innerHTML = `
        #forceVector${id} [vector]::after {
            border-color: transparent transparent transparent #${color};
        }

        #force${id} {
            background-color: #${color};
        }
    `;
    
    let forceHTML = document.createElement("div");
    forceHTML.id = `forceVector${id}`;
    forceHTML.style.setProperty("transform", `rotate(${0 - dir}rad)`);

    forceHTML.appendChild(vectorID);
    forceHTML.appendChild(vectorHTML);
    forceHTML.appendChild(antiHTML);
    forceHTML.appendChild(forceColorCode);
    canvas.appendChild(forceHTML);

    // Adding Forces to List
    let forceListing = document.createElement("div");
    forceListing.className = `force`;
    forceListing.id = `force${id}`;
    forceListing.innerHTML = `
        <input type="radio" name="a" id="forceSelect" force="${realIndex}">
        <p class="forceName">F<sub>${userIndex}</sub></p>
        <div btn class="del" id="${realIndex}">Delete</div>
    `;
    hirearchy.appendChild(forceListing);
}

// Showing Selected Function Properties
function selectForce(idName) {
    if (idName !== "resultant") {
        idText.innerText = parseInt(idName) + 1;
        magText.innerHTML = forceList[parseInt(idName)].magnitude;
        dirText.innerHTML = Math.floor(forceList[parseInt(idName)].direction * (180 / Math.PI) * 1000) / 1000 + ` <sup>o</sup>`;
    } else {
        idText.innerHTML = idName;
        magText.innerHTML = Math.floor(renderResultant().resultantMagnitude * 1000) / 1000;
        dirText.innerHTML = Math.floor(renderResultant().resultantDirection * (180 / Math.PI) * 1000) / 1000 + ` <sup>o</sup>`;
    }
}