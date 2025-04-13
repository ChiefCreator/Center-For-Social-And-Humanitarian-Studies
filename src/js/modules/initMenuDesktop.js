export default function initMenuDesktop() {
  const menu = document.getElementById("menu-desktop");
  const buttonTrigger = document.querySelector(".mobile-menu-button");
  
  let buttonTriggerRect = buttonTrigger.getBoundingClientRect();
  let isOpen = false;

  // вызовы
  buttonTrigger.addEventListener("click", handleButtonTriggerClick);

  menu.addEventListener("click", handleMenuClick);

  document.addEventListener("click", handleDocumentClick);
  window.addEventListener("resize", handleResize);

  positionateMenu(buttonTriggerRect);

  // методы   
  function toggle() {
    isOpen = !isOpen;

    menu.classList.toggle("open");
    buttonTrigger.classList.toggle("active");
  }
  function close() {
    isOpen = false;

    menu.classList.remove("open");
    buttonTrigger.classList.remove("active");
  }
  function positionateMenu(triggerRect) {
    menu.style.left = `${triggerRect.left}px`;
    menu.style.top = `${triggerRect.top + triggerRect.height}px`;
  }

  function isInBreakpoint() {
    const width = window.innerWidth;
    return width >= 600 && width < 1280;
  }

  // обработчики  
  function handleButtonTriggerClick() {
    if (!isInBreakpoint()) return;
    
    positionateMenu(buttonTriggerRect);

    toggle();
  }
  function handleMenuClick(event) {
    if (!event.target.closest(".link")) return;

    close();
  }
  function handleDocumentClick(event) {
    if (!isInBreakpoint()) return;

    if (isOpen && !event.target.closest("#menu-desktop") && !event.target.closest(".mobile-menu-button")) close();
  }
  function handleResize() {
    buttonTriggerRect = buttonTrigger.getBoundingClientRect();

    positionateMenu(buttonTriggerRect);

    if (!isInBreakpoint() && isOpen) {
      close();
    }
  }
}