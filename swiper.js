function runSwipe() {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      767: {
        slidesPerView: 2,
      },
      1023: {
        slidesPerView: 4
      }
    },
    autoplay: {
      delay: 1500,
    },
    centeredSlides: true,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
}

runSwipe()



