const startvoltHeader = document.querySelector(".sv-header");
const startvoltBurger = document.querySelector(".sv-header__burger");
const startvoltMenuClose = document.querySelector(".sv-header__menu-close");
const startvoltAcademyItem = startvoltHeader?.querySelector(".sv-header__academy-item");
const startvoltAcademyToggle = startvoltHeader?.querySelector(".sv-header__academy-button");
const startvoltAcademySubmenu = startvoltHeader?.querySelector(".sv-header__mobile-submenu");

if (startvoltHeader && startvoltBurger) {
  const setStartvoltAcademyState = (isOpen) => {
    if (!startvoltAcademyItem || !startvoltAcademyToggle || !startvoltAcademySubmenu) return;

    startvoltAcademyItem.classList.toggle("is-open", isOpen);
    startvoltAcademyToggle.setAttribute("aria-expanded", String(isOpen));
    startvoltAcademySubmenu.hidden = !isOpen;
  };

  const setStartvoltMenuState = (isOpen) => {
    document.body.classList.toggle("sv-menu-open", isOpen);
    startvoltBurger.setAttribute("aria-expanded", String(isOpen));

    if (!isOpen) {
      setStartvoltAcademyState(false);
    }
  };

  startvoltBurger.addEventListener("click", () => {
    setStartvoltMenuState(!document.body.classList.contains("sv-menu-open"));
  });

  startvoltAcademyToggle?.addEventListener("click", () => {
    if (!startvoltAcademyItem) return;

    setStartvoltAcademyState(!startvoltAcademyItem.classList.contains("is-open"));
  });

  startvoltMenuClose?.addEventListener("click", () => {
    setStartvoltMenuState(false);
  });

  startvoltHeader.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !document.body.classList.contains("sv-menu-open")) return;

    setStartvoltMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !document.body.classList.contains("sv-menu-open")) return;

    setStartvoltMenuState(false);
  });
}
