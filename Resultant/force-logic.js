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

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, this.mag);
        ctx.stroke();
        ctx.closePath();

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
    for (let i = 0; i < forceList.length; i++) {
        forceList[i].id = i + 1;
    }
}

function drawAllForces() {
    drawCoordinateAxis();
    forceList.forEach((force) => {
        force.drawForce();
    });
}

function constructForce() {
    let mag = magnitudeInput.value * (baseUnit / 5);
    let dir = directionInput.value * 1.0;

    let force = new Force(mag, dir);
    forceList.push(force);

    forceId();
}

function add_force() {
    constructForce();
    toggle_sim();
    drawAllForces();
}
