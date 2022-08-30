/// Відериття вікна з країнами у другому інпуті

let select = function () {
  let selectItem = document.querySelectorAll('.select__item');
  let selectCountry = document.querySelectorAll('.select-country');

  selectCountry.forEach(e => {
    e.addEventListener('click', selectToggle);
  });

  selectItem.forEach(e => {
    e.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle('is-active');
  }
  function selectChoose() {
    let text = this.innerText;

    let select = this.closest('.select');
    let currentText = select.querySelector('.select-current-country');
    currentText.innerText = text;

    select.classList.remove('is-active');
    console.dir();
  }
};
select();

///////////////////////////////////////////////

import fetchEventCards from './fetch-cards';
import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');

const DEBOUNCE_DELAY = 300;

// refs.form.addEventListener('submit', onSearch);

const searchCountry = e => {
  const searchName = input.value.trim();

  fetchCountries(searchName)
    .then(data => {
      countriesData(data);
    })
    .catch(() => {
      if (searchName !== '') {
        Notiflix.Notify.failure('Oops, there is no events with that name');
      }
    });
};

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
