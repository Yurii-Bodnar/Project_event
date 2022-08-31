import axios from 'axios';

// const cardList = document.querySelector('.card-box');

let page = 1;
let size = 16;
let countryCode = 'UA';
const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
const key = 'gq43zGRtwYd9WTdGGX7KlpGS3X1lGFUk';

export default async function fetchEventCards(name) {
  let options = {
    baseURL: `${baseUrl}?apikey=${key}&size=${size}`,
    method: 'GET',
    params: {
      page: page,
      keyword: name,
    },
  };
  try {
    const response = await axios(options);
    return response.data._embedded.events;
  } catch (error) {
    console.log(error);
  }
}

function renderCards() {
  fetchEventCards().then(events => {
    console.log(events);
    eventsData = events;
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
// const form = document.querySelector(".search-form")

// form.addEventListener("submit", onFormSubmit)

// function onFormSubmit(e) {
//   e.preventDefault();
//   countryCode = form.searchQuery.value;
// fetchEventCards();
//   renderCards();

// }
