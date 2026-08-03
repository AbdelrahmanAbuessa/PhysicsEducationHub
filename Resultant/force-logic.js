drawCoordinateAxis();

function assignColor() {
    let color = "#";
    let hex = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
    ];
    for (let i = 0; i < 6; i++) {
        let value = Math.floor(Math.random() * 16);
        color += hex[value];
    }
    return color;
}

let forceList = [];
let forceListHTML = document.getElementById("force-list");

class Force {
    #color = assignColor();
    id = -1;
    constructor(mag, dir) {
        this.mag = mag;
        this.dir = dir;
    }

    getColor() {
        return this.#color;
    }

    getX() {
        return this.mag * Math.cos((this.dir * Math.PI) / 180);
    }

    getY() {
        return this.mag * Math.sin((this.dir * Math.PI) / 180);
    }

    drawForce() {
        ctx.save();
        updateCenter();
        ctx.translate(center.X, center.Y);
        ctx.rotate(((this.dir * -1 - 90) * Math.PI) / 180);

        ctx.lineWidth = 5;
        ctx.globalAlpha = 1;
        ctx.strokeStyle = this.getColor();
        ctx.fillStyle = this.getColor();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, this.mag * scale);
        ctx.stroke();
        ctx.closePath();

        let arrowSize = 20;
        let tipX = 0;
        let tipY = this.mag * scale + arrowSize / 2;

        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(tipX - arrowSize / 2, tipY - arrowSize);
        ctx.lineTo(tipX + arrowSize / 2, tipY - arrowSize);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

class Resultant extends Force {
    #color = "#FF0000";
    id = "resultant";
    constructor(mag, dir) {
        super(mag, dir);
    }
}

let magnitudeInput = document.getElementById("mag");
let directionInput = document.getElementById("dir");

function forceId() {
    forceListHTML.innerHTML = "";
    for (let i = 0; i < forceList.length; i++) {
        forceList[i].id = i + 1;
        let forceHTML = `<div
                                class="force d-flex justify-content-around align-items-center p-2 mb-2"
                                style="background-color: ${forceList[i].getColor()}"
                                id="${forceList[i].id}"
                            >
                                <p class="m-0 force-label">F${forceList[i].id}</p>
                                <label for="${forceList[i].id}" class="force-radio">
                                    <input
                                        id="${forceList[i].id}"
                                        type="radio"
                                        name="force"
                                        class="force-select"
                                        onclick="select_force(${i})"
                                    />
                                </label>
                                <button class="controls-button" id="delete-force" onclick="delete_force(${i})">X</button>
                            </div>`;
        forceListHTML.innerHTML += forceHTML;
    }
}

function drawAllForces() {
    drawCoordinateAxis();
    forceList.forEach((force) => {
        force.drawForce();
    });
}

function constructForce() {
    let mag = magnitudeInput.value * baseUnit;
    let dir = directionInput.value * 1.0;

    let force = new Force(mag, dir);
    forceList.push(force);

    forceId();
}

function addForceToList(force) {}

function add_force() {
    toggle_sim();
    constructForce();
    drawAllForces();
}

function delete_force(i) {
    forceList.splice(i, 1);
    forceId();
    drawAllForces();
}

function select_force(i) {
    let forceFieldID = document.getElementById("force-prop-id");
    let forceFieldmag = document.getElementById("force-prop-mag");
    let forceFielddir = document.getElementById("force-prop-dir");
    forceFieldID.innerText = forceList[i].id;
    forceFieldmag.innerText = forceList[i].mag / baseUnit;
    forceFielddir.innerText = forceList[i].dir;
}
