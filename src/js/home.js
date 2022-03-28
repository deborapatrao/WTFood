"use strict";
// console.log('initializing about.js :' + new Date());
// console.log("home beginning");
import { Swiper, SwiperSlide } from "swiper/bundle";
import "swiper/css/bundle";

export default function init() {
  // init1();
  let searchBtnIng = document.querySelector("#ingSearch");
  let searchBtnRecipe = document.querySelector("#recipeSearch");
  // Check first whether searchBtnIng element exists on the given page or not
  if (searchBtnIng) {
    //INGREDIENTS SEARCH event listener
    searchBtnIng.addEventListener("click", async (e) => {
      const message = `test in about page ${Date.now()}`;
      const arrOfIngs = [ing1.value, ing2.value, ing3.value];

      let ingredients = "";
      arrOfIngs.forEach((ing, index) => {
        if (ing) {
          if (index === 0) {
            ingredients += `ing1=${ing}`;
          } else {
            ingredients += `&ing${index + 1}=${ing}`;
          }
        }
      });

      if (ingredients) {
        e.preventDefault();
        // window.location.hash = `recipes`;
        // window.location.search = `${ingredients}`;
        window.location.href = `?${ingredients}#recipes`;
      }
    });
  }
  // Check first whether searchBtnRecipe element exists on the given page or not
  if (searchBtnRecipe) {
    //RECIPES SEARCH  event listener
    searchBtnRecipe.addEventListener("click", async (e) => {
      const message = `test in about page2 ${Date.now()}`;
      let inputRecipe = recipeQuery.value;

      e.preventDefault();
      // window.location.hash = `recipes`;
      // window.location.search = `query=${inputRecipe}`;
      window.location.href = `?query=${inputRecipe}#recipes`;
    });
  }

  
//=============SWIPER
const swiper3 = new Swiper(".swiper-3", {
  direction: "horizontal",
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  allowTouchMove: true,
  pagination: {
  clickable: true,
  },
  breakpoints:{
    550: {
      slidesPerView:4,
    },

    768: {
      slidesPerView:5,
    },
    992:{
      slidesPerView:6,
      allowTouchMove: false,
      navigation:{
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev'
      },
      
    }
  }
});

const swiper2 = new Swiper(".swiper-2", {
  direction: "horizontal",
  slidesPerView: 2,
  spaceBetween: 30,
  freeMode: true,
  allowTouchMove: true,
  pagination: {
    clickable: true,
  },
  breakpoints:{
    768: {
      slidesPerView:3,
    },
    992:{
      slidesPerView:3,
      allowTouchMove:false,
      navigation:{
        nextEl: '.swiper-next2',
        prevEl: '.swiper-prev2'
      },
    
    }
  },
});
}