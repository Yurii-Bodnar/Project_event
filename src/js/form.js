import countries from '../templates/countries.json';

// let select = function () {
//   let selectItem = document.querySelectorAll('.select__item');
//   let selectCountry = document.querySelectorAll('.select-country');
//   const countryUl = document.querySelector('.select-window');

//   const countriesList = countries
//     .map(
//       country =>
//         ` <li class="select__item" data-value="${country.countryCode}">${country.name}</li>`
//     )
//     .join('');

//   selectCountry.forEach(e => {
//     e.addEventListener('click', selectToggle);
//   });

//   selectItem.forEach(e => {
//     e.addEventListener('click', selectChoose);
//   });

//   async function selectToggle() {
//     this.parentElement.classList.toggle('is-active');
//     countryUl.innerHTML = countriesList;
//   }
//   function selectChoose(e) {
//     console.log(e);
//     let text = this.innerText;

//     let select = this.closest('.select');
//     let currentText = select.querySelector('.select-current-country');
//     currentText.innerText = text;

//     select.classList.remove('is-active');
//     console.dir();
//   }
// };
// select();

///////////////////////////////////////////////

import fetchEventCards, { setKeyword } from './fetch-cards';
import axios from 'axios';
import renderCards from './../index';

import fetchEventCards from './fetch-cards';
// import axios from 'axios';
import renderCards from './../index';

// import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { setKeyword } from './fetch-cards';
import { updatePagination } from './pagination';

const selectItem = document.querySelectorAll('.select__item');
import { setCountry } from './fetch-cards';
import { updatePagination } from './pagination';

const countryUl = document.querySelector('.select-window');
const selectCountry = document.querySelectorAll('.select-country');
const selectEl = document.querySelector("select")

selectCountry.forEach(e => {
  e.addEventListener('click', selectToggle);
});

const countriesList = countries
  .map(
    country =>
      ` <li class="select__item" data-value="${country.countryCode}">${country.name}</li>`
  )
  .join('');


function selectToggle(e) {
  this.parentElement.classList.toggle('is-active');
  countryUl.innerHTML = countriesList;

  selectItem = document.querySelectorAll('.select__item');
  selectItem.forEach(e => {
    e.addEventListener('click', selectChoose);
    console.log('listener');
  });
}

function selectChoose(e) {
  e.preventDefault();
     clouseChoose ()

    let text = e.currentTarget.innerText;
    let countryCode = e.target.dataset.value;
    console.log(countryCode);
    console.log(text);
    let select = e.currentTarget.closest('.select');
    let currentText = select.querySelector('.select-current-country');
    currentText.innerText = text;
    select.classList.remove('is-active');
    fetchEventByCountries(countryCode);

}
// document.onclick = function clouseChoose (e){
//   if(e.target.class = 'is-active'){
//     selectEl.classList.remove('is-active')
//   }
// }

function fetchEventByCountries(newCountryCode) {
  setCountry(newCountryCode);
  fetchEventCards().then(events => {
    updatePagination();
    renderCards(events);
  });
}

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');

const DEBOUNCE_DELAY = 1000;

input.addEventListener('input', debounce(onInputSerch, DEBOUNCE_DELAY));
form.addEventListener('submit', event => {
  event.preventDefault();
});
async function onInputSerch() {
  let search = input.value.trim();
  console.log(search);

  try {
    const respone = await fetchEventCards(search).then(events =>
      renderCards(events)
    );
    console.log(respone);
  } catch (error) {
    setKeyword(search);
    const respone = await fetchEventCards().then(events => {
      updatePagination();
      renderCards(events);
    });
  }
}
