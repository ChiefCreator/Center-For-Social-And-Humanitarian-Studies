import RunningLine from "./modules/RunningLine.js";
import Carousel from "./modules/Carousel.js";
import CircularSlider from "./modules/CircularSlider.js";
import Checkbox from "./modules/Checkbox.js";
import Tabs from "./modules/Tabs.js";

import initFormHandler from "./modules/initFormHandler.js";
import initServiceCharts from "./modules/initServiceCharts.js";
import initMenuDesktop from "./modules/initMenuDesktop.js";
import initMenuMobile from "./modules/initMenuMobile.js";

function getSlidesPerView() {
  const width = window.innerWidth;

  if (width < 430) return 1;
  if (width < 768) return 2;
  if (width < 1024) return 3;
  
  return 4;
}

window.onload = function () {
  const runningLineEl = document.getElementById("running-line");
  const runningLine = new RunningLine(runningLineEl);

  const tabsEl = document.querySelector(".performance-tabs");
  const tabsObj = new Tabs(tabsEl, 10000);

  const slider = new Carousel("#carousel-employees", getSlidesPerView());

  const checkbox = document.querySelector(".checkbox");
  const checkboxObj = new Checkbox(checkbox);

  const circularSliderEl = document.querySelector(".circular-slider");
  new CircularSlider(circularSliderEl, [document.querySelector(".work-results-button.prev"), document.querySelector(".work-results-button.next")]);

  initMenuDesktop();
  initMenuMobile();
  initFormHandler();
  initServiceCharts();

  window.addEventListener("resize", () => {
    slider.updateSlidesPerView(getSlidesPerView());
  });
};
