import axios from 'axios';

// const cardList = document.querySelector('.card-box');

let page = 0;
let size = 16;

let keyword = '';
let countryCode = '';

const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
const key = 'gq43zGRtwYd9WTdGGX7KlpGS3X1lGFUk';

export default async function fetchEventCards() {
  try {
    const eventsRes = await fetchEvents();
    if (eventsRes.page.totalElements === 0) {
      return [];
    }
    return eventsRes._embedded.events;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchEvents() {
  let options = {
    baseURL: `${baseUrl}?apikey=${key}&size=${size}`,
    method: 'GET',
    params: {
      page: page,
      keyword: keyword,
      countryCode: countryCode,
    },
  };
  try {
    const response = await axios(options);
    localStorage.setItem('totalPage', response.data.page.totalElements);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export function setPage(newPage) {
  page = newPage;
}

export function setKeyword(newKeyword) {
  keyword = newKeyword;
}

export function setCountry(newCountryCode) {
  countryCode = newCountryCode;
}

function renderCards() {
  fetchEventCards().then(events => {
    eventsData = events;
    const markup = events
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
      .join('');

    cardList.insertAdjacentHTML('beforeend', markup);
    addListenerLinks();
  });
}
