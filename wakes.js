"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Generic slider initializer
  function initSlider(rootSelector, autoplayMs = 5000) {
    const root = document.querySelector(rootSelector);
    if (!root) return;

    const slides = Array.from(root.querySelectorAll(".slide"));
    const dots = Array.from(root.querySelectorAll(".dot"));
    const indicator = root.querySelector(".indicator");
    let current = 0;
    let timer = null;
    let selected = false;

    function setActive(index) {
      current = (index + slides.length) % slides.length;

      slides.forEach((s, i) => s.classList.toggle("is-active", i === current));
      dots.forEach((d, i) => {
        const active = i === current;
        d.classList.toggle("is-active", active);
        d.setAttribute("aria-selected", active ? "true" : "false");
      });

      if (indicator) {
        indicator.textContent = `${current + 1} / ${slides.length}`;
      }
    }

    function next() {
      setActive(current + 1);
    }

    function start() {
      stop();
      timer = setInterval(next, autoplayMs);
    }

    function stop() {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Dot navigation
  dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    selected = true;
    setActive(i);
    stop();

    root.classList.add("is-selected");
  });
    
      dot.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          dot.click();
        }
      });
    });

    // Pause on hover/focus
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    // Pause when tab is hidden
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });

    // Initialize
    setActive(0);
    start();
  }

  // Initialize all three sliders
  initSlider("#sliderA");
  initSlider("#sliderB");
  initSlider("#sliderC");
});
