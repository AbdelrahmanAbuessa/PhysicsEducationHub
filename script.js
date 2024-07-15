let menu = document.querySelector(".layover");

document.addEventListener("click", function (e) {
    let elementTarget = e.target;
    if (elementTarget.hasAttribute("btn")) {
        if (elementTarget.id === "activateMenu") {
            menu.display = "flex";
        }
    }
})