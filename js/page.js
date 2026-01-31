import setupEntryAnimations from "./animations.js";

const meta_page = document.querySelector("meta[name='page']");
const container = document.getElementById("page-content");

let page_type;

if (meta_page) {
    page_type = meta_page.getAttribute("content");
}

const request = new XMLHttpRequest();
request.open("GET", "json/content.json");
request.send();

let allData;

request.onload = function () {
    if (request.readyState === 4 && request.status === 200) {
        allData = JSON.parse(request.response);

        const filteredData = allData.filter((item) => {
            if (page_type === "book-page") return item.type === "book";
            if (page_type === "sims-page") return item.type === "sim";
            if (page_type === "explanation-page") return item.type === "sim";
        });

        filteredData.forEach((item) => {
            let item_node = document.createElement("li");
            item_node.classList.add("mb-3", "mb-lg-0");

            let node_content;

            if (item.type === "sim") {
                if (page_type === "sims-page") {
                    item_node.classList.add("bg-main");
                    node_content = `
                        <a
                            href="${item["sim-link"]}"
                            class="text-decoration-none d-flex align-items-center"
                        >
                            <div class="sim-image h-100 w-50 ${item["id"]}"></div>
                            <div
                                class="sim-content w-100 p-3 d-flex align-items-center justify-content-center text-light"
                            >
                            <div class="fs-4 me-3 fw-semibold text-start">
                            ${item["sim-title"]}
                            </div>
                            <div class="box h-100 flex-shrink-0">
                            <i
                            class="fa-solid fa-arrow-up-right-from-square me-2 img-fluid"
                            ></i>
                            </div>
                            </div>
                            </a>
                            `;
                } else if (page_type === "explanation-page") {
                    node_content = `<div class="bg-main d-flex align-items-center z-4">
                                <div class="sim-image h-100 w-50 ${item["id"]}"></div>
                                <div
                                    class="sim-content w-100 p-3 text-start text-light"
                                >
                                    <div class="fs-4 fw-semibold">
                                        ${item["article-title"]}
                                    </div>
                                    <p class="fs-08">
                                    ${item["description"]}
                                    </p>
                                </div>
                                </div>
                                <a
                                href="${item["article-link"]}"
                                class="article-link ms-auto text-decoration-none bg-main p-3 d-flex align-items-center justify-content-center text-light"
                            >
                                <div class="fs-5 me-2">Read Article</div>
                                <div class="box h-100 flex-shrink-0">
                                    <i
                                    class="fa-solid fa-arrow-up-right-from-square img-fluid"
                                    ></i>
                                    </div>
                                    </a>`;
                }
            }

            if (item.type === "book") {
                node_content = `<div class="bg-main d-flex align-items-center p-3">
                        <div
                            class="book-image border-radius-8 h-100 w-50 ${item["id"]}"
                        ></div>
                        <div
                            class="book-content w-100 ps-3 text-start text-light d-flex-column justify-content-center align-items-center h-100"
                        >
                            <div class="fs-5 fw-semibold">${item["title"]}</div>
                            <p class="fw-light fs-08">${item["author"]}</p>
                            <p class="fs-08 lh-sm m-0">
                                ${item["description"]}
                            </p>
                        </div>
                    </div>`;
            }

            item_node.innerHTML = node_content;
            container.appendChild(item_node);
        });

        setupEntryAnimations();
    }
};
