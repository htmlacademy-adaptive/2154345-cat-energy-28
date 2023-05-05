// Menu

const burger = document.querySelector(".navigation__toggle");
const menu = document.querySelector(".navigation__list");

burger.addEventListener("click", () => {
  burger.classList.toggle("navigation__toggle--active");
  burger.classList.toggle("navigation__toggle--not-active");
  menu.classList.toggle("navigation__list--active");
})


// Slider

let sliderControl = document.getElementsByClassName("slider__control")[0];
sliderControl.addEventListener("input", () => {
  slide();
})

function slide() {
  let slideValue = document.getElementsByClassName("slider__control")[0].value;
  let sublay = document.getElementsByClassName("slider__photo--sublay")[0];
  let overlay = document.getElementsByClassName("slider__photo--overlay")[0];
  sublay.style.clipPath = "polygon(0 0, " + slideValue + "% 0, " + slideValue + "% 100%, 0 100%)";
  overlay.style.clipPath = "polygon(" + slideValue + "% 0, 100% 0, 100% 100%, " + slideValue + "% 100%)";
}
