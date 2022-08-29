import fetchEventCards from './js/fetch-cards';

// import './js/pagination';

// event.fetchEventCard('maroon5').then(value => console.log(value));
console.log(fetchEventCards());
const cardList = document.querySelector('.card-box');
function renderCards() {
  const markup = fetchEventCards().then(events =>
    events
      .map(
        event =>
          `<li class="event-card">
        <a href="#" class="event-card__link">
          <div class="event-card__img-wrapper">
            <span class="event-card__border-elem"></span>
            <img src='#' alt="" class="event-card__img" />
          </div>
          <div class="event-card__descr">
            <h2 class="event-card__title">${event.name}</h2>
            <p class="event-card__date">2021-05-13</p>
            <p class="event-card__location">Palace of Ukraine</p>
          </div>
        </a>
      </li>`
      )
      .join('')
  );

  cardList.insertAdjacentHTML('beforeend', markup);
}

console.log(renderCards());
import './js/pagination';
import './js/preloader';
