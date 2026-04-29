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
const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', h1Alert);

setTimeout(() => {
  h1.removeEventListener('mouseenter', h1Alert);
}, 3000);

//page navigation

const navLinkParent = document.querySelector('.nav__links');
navLinkParent.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

console.log(h1.parent);

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

navEl.addEventListener('mouseout', e => handleOver.bind(0.5));
