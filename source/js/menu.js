"use strict";

const menu = document.querySelector(".menu");
const menuControl = menu.querySelector(".menu__control");
const iconClose = menu.querySelector(".menu__close");
const iconOpen = menu.querySelector(".menu__open");

const mobileMenu = () => {
  const menuToggle = () => {
    iconClose.classList.toggle("active");
    iconOpen.classList.toggle("active");
    menu.classList.toggle("menu--closed");

    menuControl.setAttribute("aria-label", "Закрыть меню");
    if (!menu.classList.contains("menu--closed")) {
      menuControl.setAttribute("aria-label", "Открыть меню");
    }
  };

  menu.classList.remove("menu--nojs");
  menuToggle();

  menuControl.addEventListener("click", menuToggle);
};

mobileMenu();

// export default mobileMenu;
