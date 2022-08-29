
// import axios from 'axios';

// // const cardList = document.querySelector('.card-box');

// let page = 1;
// let size = 1;
// const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
// const key = 'gq43zGRtwYd9WTdGGX7KlpGS3X1lGFUk';

// export default async function fetchEventCards(name) {
//   let options = {
//     baseURL: `${baseUrl}?apikey=${key}&size=${size}`,
//     method: 'GET',
//     params: {
//       page: page,
//       keyword: name,
//     },
//   };
//   try {
//     const response = await axios(options);
//     return response.data._embedded.events;
//   } catch (error) {
//     console.log(error);
//   }
// }





(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }

  document.addEventListener("keydown", removeEscape)

    // function removeEscape(even) { 
    //     if (even.code !== "Escape") {
    //         return
    //     }
    //     else {
    //         refs.modal.classList.toggle("is-hidden") 
    //         document.removeEventListener("keydown", removeEscape)
    //     }
    
    // }
})();










// import * as basicLightbox from 'basiclightbox'

// document.querySelector('.event-card__link').onclick = () => {

// 	basicLightbox.create(`
// 		<h1>HTML</h1>
// 		<p>HTML inside a lightbox.</p>
// 	`).show()

// }


// const openEl = document.querySelector(".event-card");
// const closeEl = document.querySelectorAll("[data-close]");
// const isVisible = "is-visible";


//   openEl.addEventListener("click", function() {
//     const modalId = this.dataset.open;
//     document.getElementById(modalId).classList.add(isVisible);
//   });



//   closeEl.addEventListener("click", function() {
//     this.parentElement.parentElement.parentElement.classList.remove(isVisible);
//   });


// document.addEventListener("click", e => {
//   if (e.target == document.querySelector(".modal.is-visible")) {
//     document.querySelector(".modal.is-visible").classList.remove(isVisible);
//   }
// });

// document.addEventListener("keyup", e => {
//   // if we press the ESC
//   if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
//     document.querySelector(".modal.is-visible").classList.remove(isVisible);
//   }
// });
