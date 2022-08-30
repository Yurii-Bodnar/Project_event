import fetchEventCards from './js/fetch-cards';
import './js/pagination';
import './js/preloader';

import './js/back-to-top';

import './js/form';
import './js/modal';
// import cardById from './js/fetch-card-details';

const cardList = document.querySelector('.card-box');
const modal = document.querySelector('[data-modal]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const byAuthorBtn = document.querySelector('.js-modal-author-btn');

let eventsData = [];

closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  modal.classList.toggle('is-hidden');
}

function renderCards() {
  fetchEventCards().then(events => {
    console.log(events);
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
                src="${event.images[0].url}"
                alt=""
                class="event-card__img"
              />
            </div>
            <div class="event-card__descr">
              <h2 class="event-card__title">${event.name}</h2>
              <p class="event-card__date">${event.dates.start.localDate}</p>
              <p class="event-card__location">
               <svg class="event-card__location-icon" width="7" height="10">
                    <use href="./images/location.svg"></use>
             </svg>
              <span>${event.dates.timezone}</span></p>
            </div>
          </a>
        </li>`;
      })
      .join('');

    cardList.insertAdjacentHTML('beforeend', markup);
    addListenerLinks();
  });
}

renderCards();

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
            src="${event.images[0].url}"
            alt="big-img"
          />
       
      </div>
      <div class="paers__second">
        <ul class="modal__list list">
          <li class="modal__item">
            <h2 class="modal__title">INFO</h2>
            <p class="modal__txt">
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
              <li class="buy__item">
                <ul class="tickets__list">
                  <li class="tickets__item">
                    <svg class="buy__icon" width="29" height="20">
                      <use href="./images/sprite.svg#icon-ticket1"></use>
                    </svg>
                  </li>
                  <li class="tickets__item">
                    <p class="modal__txt">${event.priceRanges[0].type} ${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}</p>
                  </li>
                </ul>
              </li>
              <li class="buy__item">
                <a class="buy__link link" href="">BUY TICKETS</a>
              </li>

              <li class="buy__item">
                <ul class="tickets__list">
                  <li class="tickets__item">
                    <svg class="buy__icon" width="29" height="20">
                      <use href="./images/sprite.svg#icon-ticket1"></use>
                    </svg>
                  </li>
                  <li class="tickets__item">
                    <p class="modal__txt">VIP 1000-1500 UAH</p>
                  </li>
                </ul>
              </li>
              <li class="buy__item">
                <a class="buy__link link" href="">BUY TICKETS</a>
              </li>
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

  const filteredEventsByAuthor = fetchEventCards()
    .then(events =>
      events.filter(event => event._embedded.attractions[0].name == eventAuthor)
    )
    .then(events =>
      events
        .map(event => {
          return `<li class="event-card" data-id="${event.id}">
          <a href="#" class="event-card__link" >
            <div class="event-card__img-wrapper">
              <span class="event-card__border-elem"></span>
              <img
                src="${event.images[0].url}"
                alt=""
                class="event-card__img"
              />
            </div>
            <div class="event-card__descr">
              <h2 class="event-card__title">${event.name}</h2>
              <p class="event-card__date">${event.dates.start.localDate}</p>
              <p class="event-card__location">
               <svg class="event-card__location-icon" width="7" height="10">
                    <use href="./images/location.svg"></use>
             </svg>
              <span>${event.dates.timezone}</span></p>
            </div>
          </a>
        </li>`;
        })
        .join('')
    )
    .then(markup => (cardList.innerHTML = markup));
}
