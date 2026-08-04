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
    color = assignColor();
    id = -1;
    constructor(mag, dir) {
        this.mag = mag;
        this.dir = dir;
    }

    getX() {
        return this.mag * Math.cos((this.dir * Math.PI) / 180);
    }

    getY() {
        return this.mag * Math.sin((this.dir * Math.PI) / 180);
    }

    update(mag, dir) {
        this.mag = mag;
        this.dir = dir;
    }

    drawForce() {
        ctx.save();
        updateCenter();
        ctx.translate(center.X, center.Y);
        ctx.rotate(((this.dir * -1 - 90) * Math.PI) / 180);

        ctx.lineWidth = 5;
        ctx.globalAlpha = 1;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, this.mag * scale * baseUnit);
        ctx.stroke();
        ctx.closePath();

        let arrowSize = 20;
        let tipX = 0;
        let tipY = this.mag * baseUnit * scale + arrowSize / 2;

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
    id = "resultant";
    constructor(mag, dir) {
        super(mag, dir);
        this.color = "#FF0000";
    }
}

let resultant = new Resultant(0, 0);

let magnitudeInput = document.getElementById("mag");
let directionInput = document.getElementById("dir");

function forceId() {
    forceListHTML.innerHTML = "";
    for (let i = 0; i < forceList.length; i++) {
        forceList[i].id = i + 1;
        let forceHTML = `<div
                                class="force d-flex justify-content-around align-items-center p-2 mb-2"
                                style="background-color: ${forceList[i].color}"
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
    updateResultant();
}

function AddForce(mag, dir) {
    let force = new Force(mag, dir);
    forceList.push(force);
    forceId();
    drawAllForces();
}

function constructForce() {
    let mag = magnitudeInput.value;
    let dir = directionInput.value * 1.0;

    let force = new Force(mag, dir);
    forceList.push(force);

    forceId();
}

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

function updateResultant() {
    let resultantX = 0;
    let resultantY = 0;

    forceList.forEach((force) => {
        resultantX += force.getX();
        resultantY += force.getY();
    });

    let resultantMag =
        Math.floor(
            Math.sqrt(resultantX * resultantX + resultantY * resultantY) * 10,
        ) / 10;

    let resultantDir =
        Math.floor(Math.atan2(resultantY, resultantX) * (180 / Math.PI) * 10) /
        10;

    resultant.update(resultantMag, resultantDir);

    if (resultantX != 0 || resultantY != 0) {
        resultant.drawForce();
    }
}

function select_force(i) {
    let forceFieldID = document.getElementById("force-prop-id");
    let forceFieldmag = document.getElementById("force-prop-mag");
    let forceFielddir = document.getElementById("force-prop-dir");
    if (i == -1) {
        forceFieldID.innerText = resultant.id;
        forceFieldmag.innerText = resultant.mag;
        forceFielddir.innerText = resultant.dir;
    } else {
        forceFieldID.innerText = `#${forceList[i].id}`;
        forceFieldmag.innerText = forceList[i].mag;
        forceFielddir.innerText = forceList[i].dir;
    }
}
