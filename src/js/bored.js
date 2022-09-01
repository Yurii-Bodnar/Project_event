const boredEl = document.querySelector(".bored")

let timerId = null;
function showBored() {
  boredEl.classList.remove("is-hidden")
  clearTimeout(timerId)
}

 function closeBored() {
  boredEl.classList.add("is-hidden")
}

  timerId = setTimeout(() => {
  showBored()
}, 6000)



boredEl.addEventListener("click", closeBored)