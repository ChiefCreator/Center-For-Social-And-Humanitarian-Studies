export default class CircularSlider {
  constructor(component, buttons, interval = 15000) {
    this.component = component;
    this.slides = Array.from(this.component.querySelectorAll(".circular-slider-slide"));
    this.circle = this.component.querySelector(".circular-slider-circle");
    this.circleIllustrations = Array.from(this.component.querySelectorAll(".circular-slider-illustration"));
    this.buttons = Array.from(buttons);
    this.buttonPrev = this.buttons[0];
    this.buttonNext = this.buttons[1];

    this.count = this.circleIllustrations.length;
    this.currentIndex = 0;
    this.currentCircleIndex = 0;

    this.intervalTime = interval;
    this.timer = null;

    this._init();
  }

  _update() {
    const currentAngle = this.currentCircleIndex * ((2 * Math.PI) / this.count) * (180 / Math.PI);

    this.circle.style.transform = `rotate(${currentAngle}deg)`;

    this.slides?.forEach(slide => slide.classList.remove("circular-slider-slide_active"));
    this.slides[this.currentIndex]?.classList?.add("circular-slider-slide_active");

    this.circleIllustrations.forEach(item => {
      item.classList.remove("circular-slider-illustration_active");
      item.style.rotate = `${-currentAngle}deg`;
    });
    this.circleIllustrations[this.currentIndex === 0 ? 0 : this.count - this.currentIndex].classList.add("circular-slider-illustration_active");

    this.buttonPrev.disabled = this.current === 0; 
    this.buttonNext.disabled = this.current === this.totalSlides - this.visibleCount;
  }

  next() {
    if (this.currentIndex === this.count - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.currentCircleIndex++;
    this._update();
  }
  prev() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.count - 1;
    } else {
      this.currentIndex--;
    }
    this.currentCircleIndex--;
    this._update();
  }

  _arrangeIllustrationsInCircle() {
    const radius = this.circle.offsetWidth / 2;
    const count = this.circleIllustrations.length;

    const startAngle = Math.PI;

    this.circleIllustrations.forEach((illustration, i) => {
      const angle = startAngle  + ((2 * Math.PI) / count) * i;
      const x = Math.cos(angle) * radius + radius;
      const y = Math.sin(angle) * radius + radius;
  
      illustration.style.left = `${x}px`;
      illustration.style.top = `${y}px`;
    });
  }

  _startAutoSwitch() {
    this.timer = setInterval(() => this.next(), this.intervalTime);
  }
  _resetInterval() {
    clearInterval(this.timer);
    this._startAutoSwitch();
  }

  _init() {
    this._arrangeIllustrationsInCircle();
    this._initEvents();
    this._startAutoSwitch();
  }
  _initEvents() {
    this.buttonNext?.addEventListener("click", () => {
      this.next();
      this._resetInterval();
    });
    this.buttonPrev?.addEventListener("click", () => {
      this.prev();
      this._resetInterval();
    });
  }
}
