"use strict";
console.log("HOME");

// mobile swipe behaviour for 3 images
let x0 = null;
const carouselContainer3 = document.querySelector('.section__food-world-wrapper'),
nOfImg3 = carouselContainer3.children.length;

console.log(nOfImg3);


carouselContainer3.style.setProperty ('--nOfImg3', nOfImg3);


function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

function lock(e) { x0 = unify(e).clientX };


carouselContainer3.addEventListener('mousedown', lock, false);
carouselContainer3.addEventListener('touchstart', lock, false);

carouselContainer3.addEventListener('mouseup', move3, false);
carouselContainer3.addEventListener('touchend', move3, false);

let i = 0;

function move3(e) {
  if(x0 || x0 === 0) {
    let dx = unify(e).clientX - x0, s = Math.sign(dx);
  
    if((i > 0 || s < 0) && (i < nOfImg3 - 3 || s > 0))
      carouselContainer3.style.setProperty('--imgIndex3', i -= s);
	
    x0 = null
  }
};

// mobile swipe behaviour for 2 images


const carouselContainer2 = document.querySelector('.carousel__container2'),
nOfImg2 = carouselContainer2.children.length;

console.log(nOfImg2);


carouselContainer2.style.setProperty ('--nOfImg2', nOfImg2);


function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

function lock(e) { x0 = unify(e).clientX };


carouselContainer2.addEventListener('mousedown', lock, false);
carouselContainer2.addEventListener('touchstart', lock, false);

carouselContainer2.addEventListener('mouseup', move2, false);
carouselContainer2.addEventListener('touchend', move2, false);



function move2(e) {
  if(x0 || x0 === 0) {
    let dx = unify(e).clientX - x0, s = Math.sign(dx);
  
    if((i > 0 || s < 0) && (i < nOfImg2 - 2 || s > 0))
      carouselContainer2.style.setProperty('--imgIndex2', i -= s);
	
    x0 = null
  }
};