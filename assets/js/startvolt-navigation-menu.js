(function () {
  const header = document.querySelector(".sv-header");
  const burger = document.querySelector(".sv-header__burger");
  const menuClose = document.querySelector(".sv-header__menu-close");
  const academyItem = header?.querySelector(".sv-header__academy-item");
  const academyToggle = header?.querySelector(".sv-header__academy-button");
  const academySubmenu = header?.querySelector(".sv-header__mobile-submenu");

  if (!header || !burger) return;

  const setAcademyState = (isOpen) => {
    if (!academyItem || !academyToggle || !academySubmenu) return;

    academyItem.classList.toggle("is-open", isOpen);
    academyToggle.setAttribute("aria-expanded", String(isOpen));
    academySubmenu.hidden = !isOpen;
  };

  const setMenuState = (isOpen) => {
    document.body.classList.toggle("sv-menu-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));

    if (!isOpen) {
      setAcademyState(false);
    }
  };

  burger.addEventListener("click", () => {
    setMenuState(!document.body.classList.contains("sv-menu-open"));
  });

  academyToggle?.addEventListener("click", () => {
    if (!academyItem) return;

    setAcademyState(!academyItem.classList.contains("is-open"));
  });

  menuClose?.addEventListener("click", () => {
    setMenuState(false);
  });

  header.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !document.body.classList.contains("sv-menu-open")) return;

    setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !document.body.classList.contains("sv-menu-open")) return;

    setMenuState(false);
  });
})();
