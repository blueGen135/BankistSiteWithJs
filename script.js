"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const header = document.querySelector('.header');
const message = document.createElement('div');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});



//Creating elements

// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true))
// //Delete Element
// document.querySelector('.btn--close-cookie').addEventListener('click',function(){
//   // message.remove();
//   message.parentElement.removeChild(message);
// });

//SmoothScroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click',function(e){
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);
    // window.scrollTo(s1coords.left+window.pageXOffset, s1coords.top + window.pageYOffset);
    // window.scrollTo({
    //   left: s1coords.left + window.pageXOffset,
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: 'smooth'
    // })
    section1.scrollIntoView({behavior: 'smooth'})
});

//Tabs

tabsContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab');
    //Guard class
    if(!clicked) return;
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');
    //Activate Content Area
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

//MEnu fade animation

const handleHover = function(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
}

nav.addEventListener('mouseover', function(e){
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function(e){
  handleHover(e, 1);
});


//Sticky Navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function(){
//   if(window.scrollY > initialCoords.top){
//     nav.classList.add('sticky');
//   }else{
//     nav.classList.remove('sticky');
//   }
// })

//Sticky Navigation Using Intersection Observer API

// const obsCallback = function(entries, observer){
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }
//
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function(entries){
  // console.log(entries);
  const [entry] = entries;
  console.log(entries);
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav, {root: null, threshold: 0, rootMargin: `-${navHeight}px`});
headerObserver.observe(header);

//Reveals Sections

const revealSection = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {root:null, threshold:0.15});
allSections.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//Lazy load Images
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}
const imageObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0,
  rootMargin: '100px',
});
imgTargets.forEach(img => imageObserver.observe(img));

//Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
let maxSlide = slides.length;

const goToSlide = function(slide){
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i-slide)}%)`);

}

// slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`);
goToSlide(0);
//Next Slide
const nextSlide = function(){
  if(curSlide === maxSlide-1){
    curSlide = 0;
  }else{
    curSlide++;
  }
    goToSlide(curSlide);
}
const prevSlide = function(){
  if(curSlide == 0){
    curSlide = maxSlide -1;
  }else{
    curSlide--;
  }
  goToSlide(curSlide);
}
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
