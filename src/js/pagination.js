const Pagination = require('tui-pagination'); /* CommonJS */

const container = document.getElementById('tui-pagination-container');
import renderCards, { initializeEvents } from '../index'
import fetchEventCards from './fetch-cards';
import { setPage } from './fetch-cards'
import {setKeyword} from './fetch-cards'


const options = {
  // below default value of options
  totalItems: 464,
  itemsPerPage: 16,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

// const pagination = new Pagination(container, options);

const pagination = new Pagination(container, options);

// instance.getCurrentPage();


 pagination.on('afterMove', loadMorePages );

async function loadMorePages(event) {
  const currentPage = event.page;
  console.log(currentPage);
  setPage(currentPage)
  const response = await fetchEventCards().then(event => {
    renderCards(event)
  })
}


export function updatePagination() {
 let totalItems = localStorage.getItem("totalPage")
  if (totalItems > 800) totalItems = 800;
  options.totalItems  = totalItems  
  const pagination = new Pagination(container, options);
   pagination.on('afterMove', loadMorePages );
}