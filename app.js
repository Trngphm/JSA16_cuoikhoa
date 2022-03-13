const zodiacData = [
  {
    name: "Aries",
    date: "21/3 - 19/4",
    img: "./assets/image/img1.jpg",
  },
  {
    name: "Taurus",
    date: "20/4 - 20/5",
    img: "./assets/image/img2.jpg",
  },
  {
    name: "Gemini",
    date: "21/5 - 21/6",
    img: "./assets/image/img3.jpg",
  },
  {
    name: "Cancer",
    date: "22/6 - 23/7",
    img: "./assets/image/img4.jpg",
  },
  {
    name: "Leo",
    date: "24/7 - 23/8",
    img: "./assets/image/img5.jpg",
  },
  {
    name: "Virgo",
    date: "24/8 - 22/9",
    img: "./assets/image/img6.jpg",
  },
  {
    name: "Libra",
    date: "23/9 - 22/10",
    img: "./assets/image/img7.jpg",
  },
  {
    name: "Scorpio",
    date: "23/10 - 22/11",
    img: "./assets/image/img8.jpg",
  },
  {
    name: "Sagittarius",
    date: "23/11 - 20/12",
    img: "./assets/image/img9.jpg",
  },
  {
    name: "Capricorn",
    date: "21/12 - 20/1",
    img: "./assets/image/img10.jpg",
  },
  {
    name: "Aquarius",
    date: "21/1 - 19/2",
    img: "./assets/image/img11.jpg",
  },
  {
    name: "Pisces",
    date: "20/2 20/3",
    img: "./assets/image/img12.jpg",
  },
];

const baseURL = "https://sameer-kumar-aztro-v1.p.rapidapi.com/";
// select
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);
const loader = select("lottie-player");


// render
function renderList() {
  let list = select(".astro-list .swiper-wrapper");
  list.innerHTML = "";
  for (item of zodiacData) {
    list.innerHTML += `
    <div class="astro-item swiper-slide">
      <img srcset="${item.img} 2x" alt="img">
      <p class="astro-name">${item.name}</p>
      <p class="astro-date">${item.date}</p>
    </div>
    `;
  }
}
renderList();

// page 2
const astroList = selectAll(".astro-item");
const informMain = select(".inform-header--main");
const astroInform = select(".astro-inform");
const astroMain = select(".astro-main");
let isDrag = false;
let pos, pos_m;
const body = select("body");

const openModal = () => {
  astroInform.style.top = 0;
  body.style.overflow = "hidden";
};
const propertyList = select(".property-list .swiper-wrapper");
const cardTemplate = select(".template");

// * render page2
function renderPage2(img, name, day) {
  informMain.innerHTML = `
    <div class="inform-icon">
      <img srcset="${img}" alt="">
    </div>
    <div class="inform-content">
      <div class="inform-name">${name}</div>
      <div class="inform-date--zodiac">${day}</div>
    </div>
        `;
}

function renderProperty(data) {
  propertyList.innerHTML = "";
  for (i in data) {
    if (i != "date_range" && i != "current_date") {
      propertyList.innerHTML += `
          <div class="property-${i} property-item swiper-slide">
            <h3 class="property-title" data-title>${i.replace("_", " ")}</h3>
            <p class="property-text" data-body>${data[i]}</p>
          </div>
        `;
    }
  }
}

// --------------------

// * skeleton loading
function skeletonLoading() {
  propertyList.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    propertyList.innerHTML += `
    <div class="property-item swiper-slide">
      <h3 class="skeleton-text skeleton" data-title></h3>
      <p class="property-text skeleton-text skeleton" data-body></p>
      <p class="property-text skeleton-text skeleton" data-body></p>
    </div>
  `;
  }
}

// * api
function api(url) {
  fetch(url, {
    method: "POST",
    headers: {
      "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
      "x-rapidapi-key": "5a876162femshb4da2e0ce597fddp1faad6jsnbf9f5d289c4a",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      renderProperty(data);
      loader.style.display = "none";
    })
    .catch((err) => {
      console.error(err);
    });
}

astroList.forEach((astroItem) => {
  astroItem.onclick = () => {
    let day = "today";
    let dayActive = select(".active");
    let img = astroItem.children[0].srcset;
    let informName = astroItem.children[1].innerText;
    let informDay = astroItem.children[2].innerText;
    let url = baseURL + "?" + `sign=${informName}` + "&" + `day=${day}`;
    renderPage2(img, informName, informDay);
    if (loader.style.display == "none") {
      skeletonLoading();
    }
    api(url);
    // day
    const dayTitle = selectAll(".day-title");
    dayActive.classList.remove("active");
    dayTitle[1].classList.add("active");
    dayTitle.forEach((item) => {
      item.onclick = () => {
        dayActive = select(".active");
        if (dayActive != item) {
          dayActive.classList.remove("active");
          item.classList.add("active");
          day = item.innerText;
          let url = baseURL + "?" + `sign=${informName}` + "&" + `day=${day}`;
          skeletonLoading();
          api(url);
        }
      };
    });
    openModal();
  };
});

const handleDown = (e) => {
  isDrag = true;
  astroInform.style.transition = "";
  pos_m = e.clientY;
};

const handleMove = (e) => {
  if (!isDrag) return;
  let newPos = e.clientY - pos_m;
  if (newPos < 0) {
    astroInform.style.top = 0;
    return;
  }
  const closePos =
    window.innerHeight / 2 - 50 > 200 ? 200 : window.innerHeight / 2 - 50;
  if (newPos >= closePos) {
    astroInform.style.transition = "0.8s top";
    astroInform.style.top = "100%";
    body.style.overflow = "auto";
    isDrag = false;
    return;
  }
  astroInform.style.top = newPos + "px";
};

const handleUp = () => {
  isDrag = false;
  astroInform.style.transition = "0.4s top";
  if (astroInform.style.top != "100%") {
    astroInform.style.top = 0;
  }
};

// Desktop
astroInform.onmousedown = handleDown;
astroInform.onmousemove = handleMove;
astroInform.onmouseup = handleUp;
// Mobile
astroInform.onpointerdown = handleDown;
astroInform.onpointermove = handleMove;
astroInform.onpointerup = handleUp;

// ------------------

// destination of page
const dots = selectAll(".dot");
let page = 0
let oldScroll = 0
let isScroll
function getPosition() {
  isScroll = document.documentElement.scrollTop
  if (isScroll < oldScroll) {
    // scroll di len
    if (isScroll < innerHeight * page - 200) {
      page -= 1
      dots.forEach(dot => {
        dot.style.background = `rgba(255, 255, 255, 0.4)`
      })
      dots[page].style.background = `rgba(255, 255, 255, 1)`
    }
  } else {
    if (isScroll != 0) {
      // scroll di xuong
      if (isScroll > innerHeight * page) {
        page +=1
        dots.forEach(dot => {
          dot.style.background = `rgba(255, 255, 255, 0.4)`
        })
        dots[page].style.background = `rgba(255, 255, 255, 1)`
      }
    }
  }
  oldScroll = isScroll
}

window.onscroll = getPosition
getPosition()



