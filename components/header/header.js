(() => {
 const toggle = document.querySelector('.menu-toggle');
 const menu = document.querySelector('#site-menu');
 const header = document.querySelector('.header');
 const content = [...document.querySelectorAll('main, footer')];
 let closingTimer;
 let savedOverflow = '';
 const close = (restoreFocus = false) => {
  if (menu.hidden || toggle.getAttribute('aria-expanded') === 'false') return;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', '메뉴 열기');
  menu.classList.add('is-closing');
  header.classList.remove('menu-open');
  document.body.style.overflow = savedOverflow;
  content.forEach(node => { node.inert = false; });
  if (restoreFocus) toggle.focus();
  closingTimer = setTimeout(() => { menu.hidden = true; menu.classList.remove('is-closing'); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280);
 };
 toggle.addEventListener('click', () => {
  if (toggle.getAttribute('aria-expanded') === 'true') { close(true); return; }
  clearTimeout(closingTimer);
  menu.classList.remove('is-closing');
  menu.hidden = false;
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', '메뉴 닫기');
  header.classList.add('menu-open');
  header.classList.remove('is-hidden');
  savedOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  content.forEach(node => { node.inert = true; });
  menu.querySelector('a').focus({preventScroll:true});
 });
 menu.addEventListener('click', (event) => { if (event.target.closest('a')) close(); });
 document.addEventListener('keydown', (event) => {
  if (toggle.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') { close(true); return; }
  if (event.key !== 'Tab') return;
  const targets = [toggle, ...menu.querySelectorAll('a')];
  const current = targets.indexOf(document.activeElement);
  event.preventDefault();
  targets[(current + (event.shiftKey ? -1 : 1) + targets.length) % targets.length].focus();
 });
 document.addEventListener('click', (event) => { if (!event.target.closest('.header')) close(); });
 document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => {
  const dialog = document.querySelector('#preview-dialog');
  dialog.querySelector('h2').textContent = button.dataset.dialog;
  dialog.showModal();
 }));
})();
