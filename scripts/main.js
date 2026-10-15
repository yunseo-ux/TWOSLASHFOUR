document.querySelector('#preview-dialog .dialog-close').addEventListener('click', () => document.querySelector('#preview-dialog').close());
// Mouse dragging complements native touch swiping and keyboard scrolling.
(() => {
 const track = document.querySelector('.tutorial-track');
 let drag = null;
 track.addEventListener('pointerdown', event => {
  if (event.pointerType !== 'mouse' || event.button !== 0) return;
  drag = {id:event.pointerId, x:event.clientX, left:track.scrollLeft};
  track.setPointerCapture(event.pointerId);
 });
 track.addEventListener('pointermove', event => {
  if (!drag || event.pointerId !== drag.id) return;
  const distance = event.clientX - drag.x;
  if (Math.abs(distance) > 5) track.classList.add('is-dragging');
  track.scrollLeft = drag.left - distance;
  const scene = track.closest('.tutorial-scroll-scene');
  if (scene?.style.height) {
   const pinTop = parseFloat(scene.style.getPropertyValue('--tutorial-pin-top')) || 75;
   const hold = parseFloat(scene.style.getPropertyValue('--tutorial-hold')) || 0;
   const start = scrollY + scene.getBoundingClientRect().top - pinTop + hold;
   scrollTo({top:start + track.scrollLeft,behavior:'instant'});
  }
 });
 const end = () => { drag = null; track.classList.remove('is-dragging'); };
 track.addEventListener('pointerup', end);
 track.addEventListener('pointercancel', end);
 track.addEventListener('lostpointercapture', end);
})();
