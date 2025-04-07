export default class Carousel {
  constructor(selector, visibleCount = 1) {
    this.slider = document.querySelector(selector);
    this.track = this.slider.querySelector(".carousel__track");
    this.trackWrapper = this.slider.querySelector(".carousel__track-wrapper");
    this.slides = Array.from(this.track.children);
    this.buttonPrev = this.slider.querySelector(".prev");
    this.buttonNext = this.slider.querySelector(".next");

    this.totalSlides = this.slides.length;
    this.visibleCount = visibleCount;
    this.current = 0;

    this.slideWidth = 0;
    this.gap = null;

    this.dragging = false;
    this.startX = 0;
    this.currentX = 0;

    this._init();
  }

  _update(jump = false) {
    if (jump) this.track.style.transition = "none";
    else this.track.style.transition = "transform 0.3s ease";

    const offset = this.current * (this.slideWidth + this.gap);
    this.track.style.transform = `translateX(-${offset}px)`;

    this.buttonPrev.disabled = this.current === 0; 
    this.buttonNext.disabled = this.current === this.totalSlides - this.visibleCount;
  }

  next() {
    this.current = this.limitIndex(this.current + 1);
    this._update();
  }
  prev() {
    this.current = this.limitIndex(this.current - 1);
    this._update();
  }
  moveByIndex(transferedIndex) {
    this.current = this.limitIndex(this.current + transferedIndex);
    this._update();
  }

  _dragStart(e) {
    this.dragging = true;
    this.startX = e.touches ? e.touches[0].clientX : e.clientX;
    this.track.style.transition = "none";
  }
  _dragMove(e) {
    if (!this.dragging) return;

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = x - this.startX;

    const offset = this.current * (this.slideWidth + this.gap) - dx;

    this.track.style.transform = `translateX(-${offset}px)`;
    this.currentX = x;
  }
  _dragEnd(e) {
    if (!this.dragging) return;

    this.dragging = false;

    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const dx = endX - this.startX;

    const transferedIndex = Math.round(-dx / (this.slideWidth + this.gap));

    this.moveByIndex(transferedIndex);
  }

  limitIndex(index) {
    return Math.max(0, Math.min(index, this.totalSlides - this.visibleCount));
  }

  _init() {
    this._resize();
    window.addEventListener("resize", () => this._resize());

    if (this.visibleCount === this.totalSlides) {
      this.buttonPrev.classList.add("hidden");
      this.buttonNext.classList.add("hidden");
    } else {
      this.buttonPrev.classList.remove("hidden");
      this.buttonNext.classList.remove("hidden");

      this._initEvents();
    }
  }
  _initEvents() {
    this.buttonNext?.addEventListener("click", () => this.next());
    this.buttonPrev?.addEventListener("click", () => this.prev());

    this.trackWrapper.addEventListener("mousedown", this._dragStart.bind(this));
    this.trackWrapper.addEventListener("touchstart", this._dragStart.bind(this), { passive: true });

    window.addEventListener("mousemove", this._dragMove.bind(this));
    window.addEventListener("touchmove", this._dragMove.bind(this), { passive: false });

    window.addEventListener("mouseup", this._dragEnd.bind(this));
    window.addEventListener("touchend", this._dragEnd.bind(this));

    this.trackWrapper.addEventListener('dragstart', (e) => e.preventDefault());
  }
  _resize() {
    this.gap = parseFloat(getComputedStyle(this.track).gap || 0);
    const totalGapWidth = this.gap * (this.visibleCount - 1);

    this.sliderWidth = this.slider.offsetWidth;
    this.slideWidth = (this.sliderWidth - totalGapWidth) / this.visibleCount;

    this.slides.forEach((slide) => slide.style.width = `${this.slideWidth}px`);

    const buttonOffsetTop = this.slides[0].querySelector(".employee-card__img").offsetHeight / 2;

    this.buttonPrev.style.top = `${buttonOffsetTop}px`;
    this.buttonNext.style.top = `${buttonOffsetTop}px`;

    this._update(true);
  }
}
