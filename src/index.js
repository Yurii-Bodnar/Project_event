import fetchEventCards from './js/fetch-cards';
import './js/pagination';
import './js/preloader';
import './js/back-to-top';



// import './js/pagination';

// event.fetchEventCard('maroon5').then(value => console.log(value));
console.log(fetchEventCards());
const cardList = document.querySelector('.card-box');
function renderCards() {
  fetchEventCards().then(events => {
    const markup = events
      .map(
        event =>
          `<li class="event-card">
          <a href="#" class="event-card__link">
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
        </li>`
      )
      .join('');
    cardList.insertAdjacentHTML('beforeend', markup);
  });
}

console.log(renderCards());
import './js/pagination';
import './js/preloader';


import './js/form';

import './js/modal';

import './js/modal';
import './js/form';

renderCards();


