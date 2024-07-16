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
    }
})

// Adding Forces Function
function addForce() {
    let force = {
        "id": forceList.length,
        "magnitude": forceMagnitude.value,
        "direction": forceDirection.value,
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

    renderSingleForce(0, "resultant", resultant.magnitude, resultant.direction, "red");
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
    for (let i = 0; i < forceList.length - 1; i++) {
        totalX += forceList[i].magnitude * Math.cos(forceList[i].direction * Math.PI / 180);
        totalY += forceList[i].magnitude * Math.sin(forceList[i].direction * Math.PI / 180);
    }
    totalX = totalX * totalX;
    totalY = totalY * totalY;
    resultantMagnitude = Math.sqrt(totalX + totalY);
    resultantDirection = (totalY / totalX) * (Math.PI / 180);

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
    forceHTML.style.setProperty("transform", `rotate(${0 - dir}deg)`);

    forceHTML.appendChild(vectorHTML);
    forceHTML.appendChild(antiHTML);
    forceHTML.appendChild(forceColorCode);
    canvas.appendChild(forceHTML);

    // Adding Forces to List
    let forceListing = document.createElement("div");
    forceListing.className = `force`;
    forceListing.id = `force${id}`;
    forceListing.innerHTML = `
        <p class="forceName">F<sub>${userIndex}</sub></p>
        <div btn class="del" id="${realIndex}">Delete</div>
    `;
    hirearchy.appendChild(forceListing);
}