import fetchEventCards, { setKeyword } from './js/fetch-cards';
import './js/pagination';
import './js/preloader';

import './js/back-to-top';
import './js/form';
import './js/modal';
import './js/bored';
import toggleModal from './js/modal';
import {setKeyword} from './js/fetch-cards'
import { updatePagination } from './js/pagination';

let eventsData = [];

const cardList = document.querySelector('.card-box');
const byAuthorBtn = document.querySelector('.js-modal-author-btn');


export function initializeEvents() {
  
  fetchEventCards().then(events => {

    updatePagination()
    renderCards(events)
  });

}
export default function renderCards(events) {
  eventsData = events;
  // author = events.options.params._embedded.attractions.name;

  const markup = events
    .map(event => {
      //eventsData[event.id] = event;
      //console.log(eventsData);
      return `<li class="event-card" data-id="${event.id}">
          <a href="#" class="event-card__link" >
            <div class="event-card__img-wrapper">
              <span class="event-card__border-elem"></span>
              <img
                src="${event.images[6].url}"
                alt=""
                class="event-card__img"
              />
            </div>
            <div class="event-card__descr">
              <h2 class="event-card__title">${event.name}</h2>
              <p class="event-card__date">${event.dates.start.localDate}</p>
              <p class="event-card__location">
                <svg width="8" height="10" viewBox="0 0 8 10" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
<path d="M3.77344 0C1.69278 0 0 1.55933 0 3.47595C0 5.88495 3.77715 10 3.77715 10C3.77715 10 7.54687 5.76648 7.54687 3.47595C7.54687 1.55933 5.85416 0 3.77344 0ZM4.91196 4.49371C4.59803 4.78284 4.18577 4.92743 3.77344 4.92743C3.36118 4.92743 2.94878 4.78284 2.63498 4.49371C2.00718 3.91547 2.00718 2.97455 2.63498 2.39624C2.93897 2.11609 3.34335 1.96179 3.77344 1.96179C4.20352 1.96179 4.60783 2.11615 4.91196 2.39624C5.53976 2.97455 5.53976 3.91547 4.91196 4.49371Z" fill="white"/>
</svg>
              <span>${event._embedded.venues[0].name}</span></p>
            </div>
          </a>
        </li>`;
    })
    .join('');
  cardList.innerHTML = markup;
  addListenerLinks();
}

function addListenerLinks() {
  const eventCards = document.querySelectorAll('.event-card');
  console.log(eventCards);
  for (let eventCard of eventCards) {
    eventCard.addEventListener('click', renderModal);
  }
}

function renderModal(e) {
  e.preventDefault();
  toggleModal();
  console.log(e.currentTarget);
  const li = e.currentTarget;
  const modalContainer = document.querySelector('.modal__container');
  const eventId = li.getAttribute('data-id');
  //const event = eventsData[eventId];
  const event = eventsData.filter(ev => ev.id == eventId)[0];
  console.log(event);
  const murcupModal = `     
      <img
        class="ltl-img"
        src="${event.images[2].url}"
        alt="little-img"
      />
  
    <div class="parts">
      <div class="parts__first">
          <img
            class="big-img"
            src="${event.images[6].url}"
            alt="big-img"
          />
       
      </div>
      <div class="paers__second">
        <ul class="modal__list list">
          <li class="modal__item">
            <h2 class="modal__title">INFO</h2>
            <p class="modal__txt txt">
              ${event.info}
            </p>
          </li>
          <li class="modal__item">
            <h2 class="modal__title">WHEN</h2>
            <p class="modal__txt">
              ${event.dates.start.localDate} <br />
              ${event.dates.start.localTime} ${event.dates.timezone} 
            </p>
          </li>
          <li class="modal__item">
            <h2 class="modal__title">WHERE</h2>
            <p class="modal__txt">${event._embedded.venues[0].country.name} <br />${event._embedded.venues[0].name}</p>
          </li>
          <li class="modal__item">
            <h2 class="modal__title">WHO</h2>
            <p class="modal__txt js-author" >${event._embedded.attractions[0].name}</p>
          </li>

          <li class="modal__item">
            <h2 class="modal__title buy__title">PRICES</h2>
            <ul class="buy__list list">
              ${getPrices(event)}
            </ul>
          </li>
        </ul>`;

  // modal.insertAdjacentHTML('beforeend', murcupModal);
  modalContainer.innerHTML = murcupModal;
  byAuthorBtn.addEventListener('click', fetchEventByAuthor);
}
// let authorNameArr = [];
async function fetchEventByAuthor() {
  toggleModal();
  const author = document.querySelector('.js-author');
  const eventAuthor = author.textContent;
  setKeyword(eventAuthor)
  fetchEventCards()
    .then(events => {
      updatePagination();
      renderCards(events)
    })
}


initializeEvents();

// function getPrices() {

// }
/*
<li class="buy__item">
                <ul class="tickets__list">
                  <li class="tickets__item">
                    <svg width="24px" height="20px" viewBox="0 0 29 21" fill="#0E0E0E" xmlns="http://www.w3.org/2000/svg">
<path d="M3.222.833H0v19.334h3.222V.833ZM11.327.833H8.104v19.334h3.223V.833ZM16.209.833h-3.222v19.334h3.222V.833ZM29 .833h-4.785v19.334H29V.833ZM6.444.833H4.882v19.334h1.562V.833ZM19.333.833h-1.562v19.334h1.562V.833ZM22.555.833h-1.562v19.334h1.563V.833Z" fill="#0E0E0E"/>
</svg>
                  </li>
                  <li class="tickets__item">
                    <p class="modal__txt">${event.priceRanges[0].type} ${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}</p>
                  </li>
                </ul>
              </li>
              <li class="buy__item">
                <a class="buy__link link" href="${event.products[0].url}">BUY TICKETS</a>
              </li>

              <li class="buy__item">
                <ul class="tickets__list">
                  <li class="tickets__item">
                   <svg width="24px" height="20px" viewBox="0 0 29 21" fill="#0E0E0E" xmlns="http://www.w3.org/2000/svg">
<path d="M3.222.833H0v19.334h3.222V.833ZM11.327.833H8.104v19.334h3.223V.833ZM16.209.833h-3.222v19.334h3.222V.833ZM29 .833h-4.785v19.334H29V.833ZM6.444.833H4.882v19.334h1.562V.833ZM19.333.833h-1.562v19.334h1.562V.833ZM22.555.833h-1.562v19.334h1.563V.833Z" fill="#0E0E0E"/>
</svg>
                  </li>
                  <li class="tickets__item">
                    <p class="modal__txt">VIP 1000-1500 UAH</p>
                  </li>
                </ul>
              </li>
              <li class="buy__item">
                <a class="buy__link link" href="${/*event.products[0].url1}">BUY TICKETS</a>
              </li>


*/

