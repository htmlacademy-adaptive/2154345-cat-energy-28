function slide() {
  let slideValue = document.getElementsByClassName("slider__control")[0].value;
  console.log(slideValue);
  let sublay = document.getElementsByClassName("slider__photo--sublay")[0];
  let overlay = document.getElementsByClassName("slider__photo--overlay")[0];
  sublay.style.clipPath = "polygon(0 0, " + slideValue + "% 0, " + slideValue + "% 100%, 0 100%)";
  console.log("FAT: polygon(0 0, " + slideValue + "% 0, " + slideValue + "% 100%, 0 100%")
  overlay.style.clipPath = "polygon(" + slideValue + "% 0, 100% 0, 100% 100%, " + slideValue + "% 100%)";
  console.log("FIT: polygon(" + slideValue + "% 0, 100% 0, 100% 100%, " + slideValue + "% 100%)")
}
