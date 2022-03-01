function runSwipe() {
  const  astroListSwiper = new Swiper('.astro-list', {
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
    // centeredSlides: true,
    centeredSlidesBounds:true,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  const propertyListSwiper= new Swiper('.property-list',{
    direction: 'horizontal',
    slidesPerView:'auto',
    autoplay: {
      delay: 1500,
    },
    centeredSlides:true,
    centeredSlidesBounds:true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })
}
runSwipe()







