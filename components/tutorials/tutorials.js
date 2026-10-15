(() => {
 const track = document.querySelector('.tutorial-track');
 document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  track.scrollBy({left: Number(button.dataset.scroll) * (track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap)), behavior: reducedMotion ? 'instant' : 'smooth'});
 }));
})();
