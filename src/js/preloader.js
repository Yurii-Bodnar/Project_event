window.addEventListener('load', closePreloader);

function closePreloader() {
  setTimeout(() => {
    document.body.classList.add('loaded_hiding');
    setTimeout(() => {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 1500);
  }, 1500);
}
