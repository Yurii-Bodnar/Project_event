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

let refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-input'),
};

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
}
