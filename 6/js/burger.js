const burger = document.querySelector(".navigation__toggle");
const burgerMenu = document.querySelector(".navigation__list");

burger.addEventListener("click", () => {
  burger.classList.toggle("navigation__toggle--active")
  burger.classList.toggle("navigation__toggle--not-active");
  burgerMenu.classList.toggle("navigation__list--active");
})
