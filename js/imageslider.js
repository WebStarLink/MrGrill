new Swiper(".image__slider", {
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  spaceBetween: 10,
  centeredSlides: false,
  preloadImages: false,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  lazy: {
    loadOnTransitionStart: true,
  },
  mousewheel: {
    sensitivity: 3,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    870: {
      slidesPerView: 2,
      // centeredSlides: false,
      spaceBetween: 15,
    },
    1200: {
      slidesPerView: 2.7,
      spaceBetween: 10,
    },
    1440: {
      slidesPerView: 2.5,
      spaceBetween: 10,
    },
    1770: {
      slidesPerView: 2.5,
      spaceBetween: 10,
    },
  },
});
