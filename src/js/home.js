"use strict";
console.log("HOME");

// mobile swipe behaviour for 3 images
let x0 = null;
let swipeIndex = 0;
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



function move3(e) {
  if(x0 || x0 === 0) {
    let dx = unify(e).clientX - x0, s = Math.sign(dx);
  
    if((swipeIndex > 0 || s < 0) && (swipeIndex < nOfImg3 - 3 || s > 0))
      carouselContainer3.style.setProperty('--imgIndex3', swipeIndex -= s);
	
    x0 = null
  }
};

// mobile swipe behaviour for 2 images 
let swipeIndexWH = 0;
let swipeIndexER = 0;
const carouselContainerWH = document.querySelector('.carousel__container-wh');
const carouselContainerER = document.querySelector('.carousel__container-er');

carouselContainerWH.addEventListener('mousedown', lock, false);
carouselContainerWH.addEventListener('touchstart', lock, false);
carouselContainerWH.addEventListener('mouseup', moveWH, false);
carouselContainerWH.addEventListener('touchend', moveWH, false); 

carouselContainerER.addEventListener('mousedown', lock, false);
carouselContainerER.addEventListener('touchstart', lock, false);
carouselContainerER.addEventListener('mouseup', moveER, false);
carouselContainerER.addEventListener('touchend', moveER, false);  
   
const nOfImg2 = 6;


function moveWH(e) {
  if(x0 || x0 === 0) {
    let dx = unify(e).clientX - x0, s = Math.sign(dx);

    if((swipeIndexWH > 0 || s < 0) && (swipeIndexWH < nOfImg2 - 2 || s > 0))
      carouselContainerWH.style.setProperty('--imgIndexWH', swipeIndexWH -= s);
    x0 = null  
  }
};

function moveER(e) {
  if(x0 || x0 === 0) {
    let dx = unify(e).clientX - x0, s = Math.sign(dx);

    if((swipeIndexER > 0 || s < 0) && (swipeIndexER < nOfImg2 - 2 || s > 0))
      carouselContainerER.style.setProperty('--imgIndexER', swipeIndexER -= s);
    x0 = null  
  }
};

