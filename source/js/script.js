// Menu

const burger = document.querySelector(".navigation__toggle");
const menu = document.querySelector(".navigation__list");
const menuContainer = document.querySelector(".navigation--no-js");
menuContainer.classList.remove("navigation--no-js")

burger.addEventListener("click", () => {
  burger.classList.toggle("navigation__toggle--active");
  burger.classList.toggle("navigation__toggle--not-active");
  menu.classList.toggle("navigation__list--active");
})
