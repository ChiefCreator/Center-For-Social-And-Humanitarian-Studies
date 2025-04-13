export default function initMenuMobile() {
  const menu = document.getElementById("menu-mobile");
  const buttonTrigger = document.querySelector(".mobile-menu-button");
  const buttonCloseMenu = menu.querySelector(".menu-mobile__button-close")

  let isOpen = false;

  // вызовы
  buttonTrigger.addEventListener("click", handleButtonTriggerClick);
  menu.addEventListener("click", handleMenuClick);
  window.addEventListener("resize", handleResize);

  // методы
  function toggle() {
    isOpen = !isOpen;

    menu.classList.toggle("open");
    buttonTrigger.classList.toggle("active");

    isOpen ? hideScroll() : showScroll();
  }
  function close() {
    isOpen = false;

    menu.classList.remove("open");
    buttonTrigger.classList.remove("active");

    showScroll();
  }
  function showScroll() {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  }
  function hideScroll() {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.body.style.overflow = "hidden";
  }

  function isInBreakpoint() {
    const width = window.innerWidth;
    return width < 600;
  }

  // обработчики
  function handleButtonTriggerClick() {
    if (!isInBreakpoint()) return;

    toggle();
  }
  function handleMenuClick(event) {
    if (event.target.closest(".menu-mobile__button-close")) {
      close();
    }
    if (event.target.closest(".anchor-link")) {
      close();
    }
  }
  function handleResize() {
    if (!isInBreakpoint() && isOpen) {
      close();
    }
  }
}
