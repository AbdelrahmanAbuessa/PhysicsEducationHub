let canvas = document.querySelector(".axisgrid");
let hirearchy = document.querySelector(".forcelist");

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
    }
})

let forceList = [];

function addForce() {

    canvas.innerHTML = "";
    canvas.appendChild(x);
    canvas.appendChild(y);

    let force = {
        "id": forceList.length + 1,
        "magnitude": forceMagnitude.value,
        "direction": forceDirection.value
    }

    forceList.push(force);

        let vectorHTML = document.createElement("div");
        vectorHTML.setAttribute("vector", "");
        vectorHTML.style.setProperty("width", `${force.magnitude * 10}px`);
    
        let antiHTML = document.createElement("div");
        antiHTML.setAttribute("antivector", "");
        antiHTML.style.setProperty("width", `${force.magnitude * 10}px`);
    
        let forceHTML = document.createElement("div");
        forceHTML.id = `force${force.id}`;
        forceHTML.style.setProperty("transform", `rotate(${0 - force.direction}deg)`);

        forceHTML.appendChild(vectorHTML);
        forceHTML.appendChild(antiHTML);
        canvas.appendChild(forceHTML);
}

/*
                    <div class="force">
                        <label checkmark>
                            <input type="checkbox">
                            <span class="checkbox"></span>
                        </label>
                        <span class="divider"></span>
                        <p class="forceName">F<sub>1</sub></p>
                    </div>
*/