import countries from '../templates/countries.json';
import fetchEventCards, { setKeyword } from './fetch-cards';
import renderCards from './../index';
import debounce from 'lodash.debounce';
import { setCountry } from './fetch-cards';
import { updatePagination } from './pagination';


const countryUl = document.querySelector('.select-window');
const selectCountry = document.querySelectorAll('.select-country');
const selectEl = document.querySelector(".select")
const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const body = document.querySelector("body")
 let selectItem = document.querySelectorAll('.select__item');

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
let selectItem = document.querySelectorAll('.select__item');
  selectItem.forEach(e => {
    e.addEventListener('click', selectChoose);
  });
   
}

document.addEventListener("click", ((e) => {
  if (!selectEl.contains(e.target)) {
    selectEl.classList.remove("is-active");
  }
}))

function selectChoose(e) {
  e.preventDefault();
    
    let text = e.currentTarget.innerText;
    let countryCode = e.target.dataset.value;
    let select = e.currentTarget.closest('.select');
    let currentText = select.querySelector('.select-current-country');
    currentText.innerText = text;
    select.classList.remove('is-active');
    fetchEventByCountries(countryCode);

}

function fetchEventByCountries(newCountryCode) {
  setCountry(newCountryCode);
  fetchEventCards().then(events => {
    updatePagination();
    renderCards(events);
  });
}



const DEBOUNCE_DELAY = 1000;

input.addEventListener('input', debounce(onInputSerch, DEBOUNCE_DELAY));
form.addEventListener('submit', event => {
  event.preventDefault();
});
async function onInputSerch() {
  let search = input.value.trim();

  try {
    setKeyword(search);
    const respone = await fetchEventCards().then(events => {
      updatePagination();
      renderCards(events);
    });
  } catch (error) {
    console.log(error);
  }
}
