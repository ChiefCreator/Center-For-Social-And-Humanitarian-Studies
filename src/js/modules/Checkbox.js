export default class Checkbox {
  constructor(checkbox, isChecked = false) {
    this.checkbox = checkbox;
    this.checkboxItem = this.checkbox.querySelector(".checkbox-item");
    this.checkboxInput = this.checkboxItem.querySelector(".checkbox-item__input");
    this.checkboxLabel = this.checkbox.querySelector(".checkbox__label");

    this.isChecked = isChecked;

    this._init();
  }

  setIsChecked(val) {
    this.isChecked = val;
  }

  _toggle() {
    this.setIsChecked(!this.isChecked);

    this.checkboxInput.checked = this.isChecked;
    this.checkboxInput.value = this.isChecked;
    this.checkbox.classList.toggle("checkbox_checked", this.isChecked);

  }

  _init() {
    this._initEvents();
  }
  _initEvents() {
    this.checkboxItem.addEventListener("click", () => this._toggle());
    this.checkboxLabel.addEventListener("click", () => this._toggle());
  }
}