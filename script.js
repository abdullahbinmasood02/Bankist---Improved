'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const navEl = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const buttons = document.getElementsByTagName('button');
console.log(document.getElementById('section--1'));

const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'we use cookies for improved functionality and analytics. <button class= "btn btn--close-cookie">Got it!</button>';

const header = document.querySelector('header');
header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
header.append(message);

// Give the browser a millisecond to render so getComputedStyle is accurate
setTimeout(() => {
  const currentHeight = getComputedStyle(message).height;
  console.log('Current:', currentHeight);

  message.style.height = Number.parseFloat(currentHeight) + 40 + 'px';

  console.log('New:', message.style.height);
}, 0);

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
const buttonScrollTo = document.querySelector('.btn--scroll-to');
const sectionEl = document.querySelector('#section--1');

buttonScrollTo.addEventListener('click', function (e) {
  const s1cords = sectionEl.getBoundingClientRect();

  sectionEl.scrollIntoView({ behavior: 'smooth' });
});

function h1Alert(e) {
  alert('you are reading the heading');
}

//page navigation

const navLinkParent = document.querySelector('.nav__links');
navLinkParent.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
///// TABBED COMPONENT

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return; //GUARD CLAUSE

  //remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  //activate active tab
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////// MENU FADE ANIMATION

function handleOver(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(sib => {
      if (sib !== link) {
        sib.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}

navEl.addEventListener('mouseover', handleOver.bind(0.5));

navEl.addEventListener('mouseout', handleOver.bind(1));
const navHeight = navEl.getBoundingClientRect().height;
//STICKY NAVBAR

function stickyNav(entries) {
  const entry = entries[0];

  if (entry.isIntersecting == false) {
    navEl.classList.add('sticky');
  } else {
    navEl.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// SECTION ANIMATION
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
const allSections = document.querySelectorAll('section');
allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

function revealSection(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
}

//LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

function loadImg(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    //replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () =>
      entry.target.classList.remove('lazy-img'),
    );
    observer.unobserve(entry.target);
  });
}

//slider
let curSlide = 0;

const slides = document.querySelectorAll('.slide');
const maxSlide = slides.length;
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

function nextSlide() {
  curSlide++;
  if (curSlide === maxSlide) curSlide = 0;

  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
  });
  showActiveDot(curSlide);
}

const goToSlide = function (slide) {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${100 * (index - slide)}%)`;
  });
};

function previousSlide() {
  curSlide--;
  if (curSlide === -1) curSlide = maxSlide - 1;

  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
  });
  showActiveDot(curSlide);
}

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  e.key === 'ArrowLeft' && previousSlide();
  e.key === 'ArrowRight' && nextSlide();
});

const dotContainer = document.querySelector('.dots');

function createDots() {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`,
    );
  });
}

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    curSlide = Number(e.target.dataset.slide);
    goToSlide(curSlide);
    showActiveDot(curSlide);
  }
});

function showActiveDot(curSlide) {
  let allDots = document.querySelectorAll('.dots__dot');
  allDots.forEach(dot => dot.classList.remove('dots__dot--active'));
  allDots = Array.from(allDots);
  allDots[curSlide].classList.add('dots__dot--active');
}

function initializeSlider() {
  goToSlide(0);
  createDots();
  showActiveDot(curSlide);
}

initializeSlider();
