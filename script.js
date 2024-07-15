let menu = document.querySelector(".layover");
let canvas = document.querySelector(".axisgrid");

let forceMagnitude = document.querySelector("#mag"); 
let forceDirection = document.querySelector("#dir"); 

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
    }
})

let forceList = [];

function addForce() {

    let force = {
        "magnitude": forceMagnitude.value,
        "direction": forceDirection.value
    }

    forceList.push(force);

    for (let i = 0; i <= forceList; i++) {
        let vector = document.createElement("div");
        vector.style.setProperty("width", forceList[i].magnitude);
        vector.style.setProperty("height", "5px");
        vector.style.setProperty("background-color", "red");
        vector.setAttribute("arrow");
        canvas.appendChild(vector);
    }
}