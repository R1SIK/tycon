import Swiper from "swiper";
import Vibrant from "node-vibrant/dist/vibrant";

const swiperDomElement = document.querySelector(".swiper");

if (swiperDomElement) {
  const swiper = new Swiper(".swiper", {});

  const swiperNext = () => {
    setTimeout(() => {
      swiper.slideNext();
      swiperNext();
    }, 4000);
  };

  swiperNext();
}

const images = document.querySelectorAll("img");

const styles = document.createElement("style");

let stylesContent = "";

const addStyles = (image) => {
  const v = new Vibrant(image.src);

  const paths = image.src.split("/");

  const withExtname = paths[paths.length - 1].split(".");

  const name = "img-style-" + withExtname[0];

  image.classList.add(name);

  v.getPalette()
    .then((r) => {
      const rgb = r.Vibrant.getRgb();

      stylesContent =
        stylesContent +
        `
      .${name} {
        background-color: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]});
      }

      .${name}:hover {
        box-shadow: 0 0 20px rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]});
      }

      .kartochka:hover .${name} {
        box-shadow: 0 0 20px rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]});
      }
    `;

      if (image === images[images.length - 1]) {
        styles.innerHTML = stylesContent;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

for (const image of images) {
  console.log(image.complete)
  image.onload = () => {
    addStyles(image);
  };

  addStyles(image);
}

document.body.appendChild(styles);
