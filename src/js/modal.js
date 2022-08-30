
const modal = document.querySelector("[data-modal]");
const closeModalBtn = document.querySelector("[data-modal-close]");
const backdrop = document.querySelector(".js-modal-backdrop")
const modalContainer = document.querySelector(".modal")



closeModalBtn.addEventListener("click", toggleModal);
backdrop.addEventListener("click", backdropCloseModal)

export default function toggleModal() {
    modal.classList.toggle("is-hidden");
}

function backdropCloseModal(e){
  if(e.target === backdrop){
    toggleModal()
  }
  
 
}