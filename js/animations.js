export default function setupEntryAnimations() {
    let items = document.querySelectorAll("section > ul > li");

    items.forEach((item, index) => {
        item.classList.remove("left-entry", "right-entry");
        item.classList.add(index % 2 ? "right-entry" : "left-entry");
        observer.observe(item);
    });
}

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
    },
);
