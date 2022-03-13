"use strict";
console.log("HOME");

// food of the world scroll behaviour
let x0 = null;
const carouselContainer = document.querySelector('.section__food-world-wrapper'),
nOfImg = carouselContainer.children.length;

console.log(nOfImg);


carouselContainer.style.setProperty ('--nOfImg', nOfImg);


function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

function lock(e) { x0 = unify(e).clientX };


carouselContainer.addEventListener('mousedown', lock, false);
carouselContainer.addEventListener('touchstart', lock, false);

carouselContainer.addEventListener('mouseup', move, false);
carouselContainer.addEventListener('touchend', move, false);

let i = 0;

function move(e) {
  if(x0 || x0 === 0) {
    let dx = unify(e).clientX - x0, s = Math.sign(dx);
  
    if((i > 0 || s < 0) && (i < nOfImg - 3 || s > 0))
      carouselContainer.style.setProperty('--imgIndex', i -= s);
	
    x0 = null
  }
};