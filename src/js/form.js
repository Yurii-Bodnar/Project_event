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
const selectCountry = document.querySelectorAll('.select-country');

selectCountry.forEach(e => {
  e.addEventListener('click', selectToggle);
});

selectItem.forEach(e => {
  e.addEventListener('click', selectChoose);
});

// const countriesList = countries
//   .map(
//     country =>
//       ` <li class="select__item" data-value="${country.countryCode}">${country.name}</li>`
//   )
//   .join('');

function selectToggle(e) {
  this.parentElement.classList.toggle('is-active');
  // countryUl.innerHTML = countriesList;
}

function selectChoose(e) {
  e.preventDefault();
  let text = e.currentTarget.innerText;
  console.log(text);
  // let select = this.closest('.select');
  // let currentText = select.querySelector('.select-current-country');
  // currentText.innerText = text;
  // select.classList.remove('is-active');
  // console.dir();
}

// console.log(countryUl);

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');

const DEBOUNCE_DELAY = 1000;

input.addEventListener('input', debounce(onInputSerch, DEBOUNCE_DELAY));

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
