'use strict';

/**--add event on element--*/
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**--navbar toggle--*/
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
}

addEventOnElem(navTogglers, 'click', toggleNavbar);

const closeNavbar = () => {
  navbar.classList.remove('active');
  overlay.classList.remove('active');
}

addEventOnElem(navbarLinks, 'click', closeNavbar);

/*--header sticky & back top btn active--*/
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = () => {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = () => {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);


function showCartItems() {
  const cartIDs = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCounter = document.querySelector('.btn-badge');

  cartCounter.innerText = cartIDs.length;
}

showCartItems();



let videodiv = document.querySelector(".video");
let close = document.querySelector(".close");
let more = document.querySelector(".play_video");
let video = document.querySelector("#videoPlayer");


more.addEventListener("click", () => {
  videodiv.style.display = "block";
  video.play();
})

close.addEventListener("click", () => {
  videodiv.style.display = "none";
  video.load();
})