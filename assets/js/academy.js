const eventsRoot = document.querySelector(".academy-events");

if (eventsRoot) {
  const tabs = Array.from(eventsRoot.querySelectorAll("[data-events-tab]"));
  const cards = Array.from(eventsRoot.querySelectorAll(".academy-event-card"));
  const sliderEl = eventsRoot.querySelector(".academy-events__slider");
  let eventsSwiper = null;

  const emptyMessage = document.createElement("p");
  emptyMessage.className = "academy-events__empty";
  emptyMessage.textContent = "На выбранный период мероприятия пока не запланированы.";
  sliderEl?.after(emptyMessage);

  const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

  const setTab = (tabName) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.eventsTab === tabName;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    let visibleCount = 0;

    cards.forEach((card) => {
      const cardMonths = (card.dataset.eventMonth || "").split(" ");
      const isVisible = tabName === "all" || cardMonths.includes(tabName);
      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) visibleCount += 1;
    });

    emptyMessage.classList.toggle("is-visible", visibleCount === 0);

    if (eventsSwiper) {
      eventsSwiper.update();
      eventsSwiper.slideTo(0, 0);
    }
  };

  const setupSwiper = () => {
    if (!sliderEl || typeof Swiper === "undefined") return;

    if (isMobile() && !eventsSwiper) {
      eventsSwiper = new Swiper(sliderEl, {
        slidesPerView: 1.18,
        spaceBetween: 8,
        watchOverflow: true,
        pagination: {
          el: ".academy-events__pagination",
          clickable: true,
        },
        breakpoints: {
          560: {
            slidesPerView: 2,
          },
        },
      });
    }

    if (!isMobile() && eventsSwiper) {
      eventsSwiper.destroy(true, true);
      eventsSwiper = null;
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setTab(tab.dataset.eventsTab);
    });
  });

  setupSwiper();
  setTab("all");
  window.addEventListener("resize", setupSwiper);
}
