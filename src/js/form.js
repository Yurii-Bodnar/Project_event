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
import renderCards from './../index';
// import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

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
    console.log(error);
  }
}
