const periodPanels = Array.from(document.querySelectorAll("[data-period]"));
const periodItems = Array.from(document.querySelectorAll("#period-nav li"));
const trackFill = document.querySelector("#track-fill");

let activePeriod = 1;

const setActivePeriod = (period) => {
  if (period === activePeriod) return;
  activePeriod = period;

  periodItems.forEach((item, index) => {
    item.classList.toggle("is-active", index + 1 === period);
  });

  if (trackFill) {
    trackFill.style.width = `${period * 25}%`;
  }
};

const updateActivePeriod = () => {
  if (!periodPanels.length) return;

  const readingLine = window.innerHeight * 0.42;
  let current = Number(periodPanels[0].dataset.period);

  periodPanels.forEach((panel) => {
    const rect = panel.getBoundingClientRect();
    if (rect.top <= readingLine) {
      current = Number(panel.dataset.period);
    }
  });

  setActivePeriod(current);
};

let ticking = false;

const requestUpdate = () => {
  if (ticking) return;
  ticking = true;

  window.requestAnimationFrame(() => {
    updateActivePeriod();
    ticking = false;
  });
};

window.addEventListener("scroll", requestUpdate, { passive: true });
window.addEventListener("resize", requestUpdate);
updateActivePeriod();
