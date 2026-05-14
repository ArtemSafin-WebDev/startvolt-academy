const eventsRoot = document.querySelector(".academy-events");

if (eventsRoot) {
  const tabs = Array.from(eventsRoot.querySelectorAll("[data-events-tab]"));
  const panels = Array.from(eventsRoot.querySelectorAll("[data-events-panel]"));
  const eventSwipers = new Map();

  const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

  const destroySwipers = () => {
    eventSwipers.forEach((swiper) => {
      swiper.destroy(true, true);
    });
    eventSwipers.clear();
  };

  const setupSwiper = () => {
    if (typeof Swiper === "undefined") return;

    if (!isMobile()) {
      destroySwipers();
      return;
    }

    const activePanel = eventsRoot.querySelector(".academy-events__panel.is-active");
    const sliderEl = activePanel?.querySelector(".academy-events__slider");
    if (!sliderEl) return;

    if (!eventSwipers.has(sliderEl)) {
      eventSwipers.set(
        sliderEl,
        new Swiper(sliderEl, {
          slidesPerView: 1.18,
          spaceBetween: 8,
          watchOverflow: true,
          pagination: {
            el: sliderEl.querySelector(".academy-events__pagination"),
            clickable: true,
          },
          breakpoints: {
            560: {
              slidesPerView: 2,
            },
          },
        }),
      );
    }

    const swiper = eventSwipers.get(sliderEl);
    swiper.update();
    swiper.slideTo(0, 0);
  };

  const setTab = (tabName) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.eventsTab === tabName;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.eventsPanel === tabName;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });

    setupSwiper();
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setTab(tab.dataset.eventsTab);
    });
  });

  setupSwiper();
  window.addEventListener("resize", setupSwiper);
}
