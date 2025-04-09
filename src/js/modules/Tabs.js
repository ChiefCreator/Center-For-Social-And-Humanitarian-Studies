export default class Tabs {
  constructor(component, interval = 3000) {
    this.component = component;
    this.buttons = this.component.querySelectorAll(".tab-button");
    this.panels = this.component.querySelectorAll(".tab-panel");

    this.currentIndex = 0;

    this.intervalTime = interval;
    this.timer = null;

    this._init();
  }

  _handleButtonClick(index) {
    this.showTab(index);
    this._resetInterval();
  }

  showTab(index) {
    this.buttons.forEach((btn) => btn.classList.remove("tab-button_active"));
    this.panels.forEach((panel) => panel.classList.remove("tab-panel_active"));

    this.buttons[index].classList.add("tab-button_active");
    this.panels[index].classList.add("tab-panel_active");

    this.currentIndex = index;
  }
  nextTab() {
    const nextIndex = (this.currentIndex + 1) % this.buttons.length;
    this.showTab(nextIndex);
  }

  _startAutoSwitch() {
    this.timer = setInterval(() => this.nextTab(), this.intervalTime);
  }
  _resetInterval() {
    clearInterval(this.timer);
    this._startAutoSwitch();
  }

  _init() {
    this.buttons.forEach((button, i) => {
      button.addEventListener("click", () => this._handleButtonClick(i));
    });

    this._startAutoSwitch();
  }
}
