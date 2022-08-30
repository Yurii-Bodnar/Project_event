import axios from 'axios';

// const cardList = document.querySelector('.card-box');

let page = 1;
let size = 16;
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
