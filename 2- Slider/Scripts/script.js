'use strict';

const img = document.querySelector('header img');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

const imgList = ['Apple','Berry','Peach'];

let i = 0;

function animImg() {
  img.classList.remove('slider-anim');
  img.classList.add('slider-anim-rev');
  setTimeout(() => {
    img.classList.remove('slider-anim-rev');
    img.classList.add('slider-anim');
  }, 200);
}

setInterval(() => {
  i = i == imgList.length - 1 ? 0 : i + 1;
  animImg();
  img.src = `./../images/${imgList[i]}.jpg`;
}, 5000);

next.addEventListener('click',() => {
  i = i == imgList.length - 1 ? 0 : i + 1;
  animImg();
  img.src = `./../images/${imgList[i]}.jpg`;
});

prev.addEventListener('click',() => {
  i = i == 0 ? 2 : i - 1;
  animImg();
  img.src = `./../images/${imgList[i]}.jpg`;
});
