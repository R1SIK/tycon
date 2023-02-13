const image = document.querySelector(".preview__img");

function rotate(deg = 0) {
  image.style.transform = "rotate(" + deg + "deg)";

  setTimeout(function () {
    if (deg === -360) {
      rotate(0);
    } else {
      rotate(deg - 1);
    }
  }, 20);
}

rotate(0);
