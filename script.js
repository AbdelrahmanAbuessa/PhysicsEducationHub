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
x.style.setProperty("height", "2px");
y.style.setProperty("width", "2px");
y.style.setProperty("height", "calc(100% - 49px)");

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

let forceList = [];

function addForce() {
    let force = {
        "id": forceList.length,
        "magnitude": forceMagnitude.value,
        "direction": forceDirection.value,
        "visibility": 1, 
        "color": generateColor()
    }

    forceList.push(force);

    renderForce();
}

function delForce(forceID) {

    forceList.splice(forceID, 1);

    renderForce();
}

function renderForce() {    
    canvas.innerHTML = "";
    canvas.appendChild(x);
    canvas.appendChild(y);

    hirearchy.innerHTML = "";


    for (let i = 0; i < forceList.length; i++) {
        // Adding Vectors to Canvas
        let vectorHTML = document.createElement("div");
        vectorHTML.setAttribute("vector", "");
        vectorHTML.style.setProperty("width", `${forceList[i].magnitude * 10}px`);
        vectorHTML.style.setProperty("visibility", `${forceList[i].visibility}`);
        vectorHTML.style.setProperty("background-color", `#${forceList[i].color}`);
    
        let antiHTML = document.createElement("div");
        antiHTML.setAttribute("antivector", "");
        antiHTML.style.setProperty("width", `${forceList[i].magnitude * 10}px`);
        antiHTML.style.setProperty("width", `${forceList[i].visibility}`);
    
        let forceHTML = document.createElement("div");
        forceHTML.id = `force${forceList[i].id}`;
        forceHTML.style.setProperty("transform", `rotate(${0 - forceList[i].direction}deg)`);

        forceHTML.appendChild(vectorHTML);
        forceHTML.appendChild(antiHTML);
        canvas.appendChild(forceHTML);

        // Adding Forces to List
        let forceListing = document.createElement("div");
        forceListing.className = `force`;
        forceListing.innerHTML = `
            <p class="forceName">F<sub>${i + 1}</sub></p>
            <div btn class="del" id="${i}">Delete</div>
        `;
        hirearchy.appendChild(forceListing);
    }
}

function generateColor() {
    return Math.floor(Math.random() * 1000000);
}