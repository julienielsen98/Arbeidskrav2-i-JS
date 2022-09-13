var i = 0;
var images = [];

var slideTime = 4000;

images[0] =
  "https://cdn.pixabay.com/photo/2017/05/05/12/26/cathedral-2286910_1280.jpg";
images[1] =
  "https://cdn.pixabay.com/photo/2017/06/15/14/05/monster-book-of-monsters-2405539_1280.jpg";
images[2] =
  "https://cdn.pixabay.com/photo/2016/02/03/01/40/harry-potter-1176447_1280.jpg";
images[3] =
  "https://cdn.pixabay.com/photo/2019/09/05/20/52/harry-potter-4455031_1280.jpg";

function changePicture() {
  let section2 = document.getElementById("section2");
  section2.style.backgroundImage = "url(" + images[i] + ")";

  if (i < images.length - 1) {
    i++;
  } else {
    i = 0;
  }
  setTimeout(changePicture, slideTime);
}

window.onload = changePicture;
