const header = document.querySelector(".page-header");
const burger = document.querySelector(".page-header__burger");

if (header && burger) {
  burger.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  header.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !document.body.classList.contains("menu-open")) return;

    document.body.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
  });
}
