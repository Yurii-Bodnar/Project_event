import axios from 'axios';

// const cardList = document.querySelector('.card-box');

export default async function fetchImages(page) {
  const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
  const apiKey = 'gq43zGRtwYd9WTdGGX7KlpGS3X1lGFUk';
  //   const apiFilter = `?key=${apiKey}&id=${id}}&page=${page}`;
  try {
    const response = await axios.get(
      `${baseUrl}?apikey=${apiKey}&size=16&page=7`
    );
    return response.data._embedded;
  } catch (error) {
    console.log(error);
  }
}
fetchImages(3).then(value => console.log(value));
console.log(fetchImages(3));

// function renderImageCard(name) {
//   const markup = name._embedded.events
//     .map(
//       ({
//         dates: { starts },
//         images: [{ url }],
//         _embedded: {
//           venues: [{ name }],
//         },
//       }) =>
//         `<li class="event-card">
//       <a href="#" class="event-card__link">
//         <div class="event-card__img-wrapper">
//           <span class="event-card__border-elem"></span>
//           <img src=${images[{ url }]} alt="" class="event-card__img" />
//         </div>
//         <div class="event-card__descr">
//           <h2 class="event-card__title">Eurovision 2021 finals!</h2>
//           <p class="event-card__date">2021-05-13</p>
//           <p class="event-card__location">Palace of Ukraine</p>
//         </div>
//       </a>
//     </li>`
//     )
//     .join('');
//   cardList.insertAdjacentHTML('beforeend', markup);
//   console.log(markup);
// }

// renderImageCard('Los Angeles Angels vs. New York Yankees');
