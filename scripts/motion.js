(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const desktop = matchMedia('(min-width: 901px)');
 const header = document.querySelector('.header');
 const stage = document.querySelector('.hero-stage');
 const track = document.querySelector('.new-track');
 const banner = document.querySelector('.best-banner');
 const bannerCopy = banner.querySelector('p');
 const bannerFirstLine = document.createElement('span');
 bannerFirstLine.className = 'banner-line banner-first-line';
 bannerCopy.insertBefore(bannerFirstLine, bannerCopy.firstChild);
 [...bannerCopy.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => bannerFirstLine.append(node));
 bannerCopy.querySelector('br').remove();
 bannerCopy.querySelector('.editorial').classList.add('banner-line', 'banner-second-line');
 banner.querySelector('p:last-child').classList.add('banner-line', 'banner-last-line');
 const wrap = (node, className) => {
  const wrapper = document.createElement('div');
  wrapper.className = className;
  node.before(wrapper);
  wrapper.append(node);
  return wrapper;
 };
 const heroScene = wrap(stage, 'hero-scroll-scene');
 const campaign = document.querySelector('.campaign-grid');
 const story = wrap(heroScene, 'hero-story');
 const visual = wrap(heroScene, 'hero-story-visual');
 visual.append(campaign);
 const newScene = wrap(track, 'new-scroll-scene');
 const tutorialTrack = document.querySelector('.tutorial-track');
 const tutorialScene = wrap(tutorialTrack, 'tutorial-scroll-scene');
 tutorialTrack.querySelectorAll('.tutorial-card > img').forEach(image => {
  wrap(image, 'tutorial-image-frame');
 });
 const portrait = document.querySelector('.hero-portrait');
 const center = document.querySelector('.campaign-center');
 const hero = document.querySelector('.hero');
 const cushionTitle = document.querySelector('.cushion-title');
 const cushionLines = [...cushionTitle.children];
 const tutorialTitle = document.querySelector('.tutorials > h2');
 const tutorialTopLine = document.createElement('span');
 tutorialTopLine.className = 'tutorial-title-line';
 tutorialTitle.insertBefore(tutorialTopLine, tutorialTitle.firstChild);
 [...tutorialTitle.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => tutorialTopLine.append(node));
 tutorialTitle.querySelector('br').remove();
 const tutorialLines = [...tutorialTitle.children];
 const flight = document.createElement('div');
 flight.className = 'hero-flight hero-flight-intro';
 flight.addEventListener('animationend', event => {
  if (event.animationName === 'hero-in') flight.classList.remove('hero-flight-intro');
 });
 flight.setAttribute('aria-hidden', 'true');
 flight.hidden = true;
 const firstImage = document.createElement('img');
 firstImage.src = portrait.src;
 firstImage.alt = '';
 const lastImage = document.createElement('img');
 lastImage.src = center.src;
 lastImage.alt = '';
 flight.append(firstImage, lastImage);
 document.body.append(flight);
 let sourceGeometry;
 let landingScroll = 1;
 const clamp = value => Math.max(0, Math.min(1, value));
 const readingBlock = document.querySelector('.cushion-copy');
 const readingWords = [];
 const readingWalker = document.createTreeWalker(readingBlock, NodeFilter.SHOW_TEXT);
 const readingNodes = [];
 while (readingWalker.nextNode()) {
  if (!readingWalker.currentNode.parentElement.closest('.badge')) readingNodes.push(readingWalker.currentNode);
 }
 readingNodes.forEach(node => {
  const fragment = document.createDocumentFragment();
  node.textContent.split(/(\s+)/).forEach(word => {
   if (!word.trim()) { fragment.append(document.createTextNode(word)); return; }
   const span = document.createElement('span');
   span.className = 'reading-word';
   span.textContent = word;
   readingWords.push(span);
   fragment.append(span);
  });
  node.replaceWith(fragment);
 });
 // Preserve nested editorial spans and inline images when splitting title text.
 const manifestoLines = [];
 const splitTitleLines = heading => {
 let currentLine = document.createElement('span');
 const appendLine = () => {
  const mask = document.createElement('span');
  mask.className = 'manifesto-line';
  currentLine.className = 'manifesto-line-content';
  mask.append(currentLine);
  manifestoLines.push(mask);
  currentLine = document.createElement('span');
 };
 const startIndex = manifestoLines.length;
 [...heading.childNodes].forEach(node => {
  if (node.nodeName === 'BR') { node.remove(); appendLine(); }
  else currentLine.append(node);
 });
 appendLine();
 heading.append(...manifestoLines.slice(startIndex));
 };
 splitTitleLines(document.querySelector('.manifesto'));
 splitTitleLines(document.querySelector('.best-products > h2'));
 const headings = [];
 headings.forEach(heading => {
  heading.classList.add('motion-heading');
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  let index = 0;
  nodes.forEach(node => {
   const fragment = document.createDocumentFragment();
   node.textContent.split(/(\s+)/).forEach(word => {
    if (!word.trim()) { fragment.append(document.createTextNode(word)); return; }
    const span = document.createElement('span');
    span.className = 'motion-word';
    span.style.setProperty('--word-delay', Math.min(index++ * 65, 390) + 'ms');
    span.textContent = word;
    fragment.append(span);
   });
   node.replaceWith(fragment);
  });
 });
 const reveals = document.querySelectorAll('.tutorial-card, .footer-top, .footer-wordmark');
 reveals.forEach((node, index) => {
  node.classList.add('motion-reveal');
  node.style.setProperty('--reveal-delay', (index % 3) * 65 + 'ms');
 });
 const bestImages = [...document.querySelectorAll('.best-pair figure img, .best-banner > img')];
 bestImages.forEach(image => image.classList.add('best-image-reveal'));
 const allReveals = [...reveals, ...headings, ...bestImages];
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('is-visible');
  observer.unobserve(entry.target);
 }), {threshold:0, rootMargin:'0px 0px -5% 0px'});
 allReveals.forEach(node => observer.observe(node));
 const lineObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('is-visible');
  lineObserver.unobserve(entry.target);
 }), {rootMargin:'0px 0px -40% 0px', threshold:0});
 manifestoLines.forEach(line => lineObserver.observe(line));
 let scheduled = false;
 let previousY = scrollY;
 let horizontalDistance = 0;
 let tutorialDistance = 0;
 let tutorialPinTop = 75;
 let tutorialHold = 270;
 const active = () => desktop.matches && !reduced.matches;
 const heroActive = () => !reduced.matches;
 const measure = () => {
  horizontalDistance = Math.max(0, track.scrollWidth - track.clientWidth);
  newScene.style.height = active() ? (track.offsetHeight + horizontalDistance) + 'px' : '';
  tutorialDistance = Math.max(0, tutorialTrack.scrollWidth - tutorialTrack.clientWidth);
  tutorialPinTop = Math.max(75, (innerHeight - tutorialTrack.offsetHeight) / 2);
  tutorialHold = Math.min(360, Math.max(200, innerHeight * .3));
  tutorialScene.style.height = active() ? (tutorialTrack.offsetHeight + tutorialDistance + tutorialHold * 3) + 'px' : '';
  tutorialScene.style.setProperty('--tutorial-hold', tutorialHold + 'px');
  tutorialScene.style.setProperty('--tutorial-pin-top', tutorialPinTop + 'px');
  const source = portrait.getBoundingClientRect();
  const target = center.getBoundingClientRect();
  const storyStart = story.getBoundingClientRect().top + scrollY;
  sourceGeometry = {left:source.left, top:storyStart + portrait.offsetTop, width:source.width, height:source.height};
  landingScroll = storyStart + Math.max(1, story.offsetHeight - visual.offsetHeight) * .425;
  hero.classList.toggle('hero-flight-active', heroActive());
  if (!heroActive()) { flight.hidden = true; hero.classList.remove('hero-flight-landed'); }
  if (!active()) {
   cushionTitle.style.removeProperty('--cushion-space');
   cushionLines.forEach(line => line.style.removeProperty('--cushion-x'));
   tutorialTitle.style.removeProperty('--cushion-space');
   tutorialLines.forEach(line => line.style.removeProperty('--cushion-x'));
   stage.style.removeProperty('--hero-y');
   stage.style.removeProperty('--hero-scale');
   stage.style.removeProperty('--logo-y');
   banner.style.removeProperty('--banner-y');
   banner.style.removeProperty('--banner-first-x');
   banner.style.removeProperty('--banner-second-x');
   banner.style.removeProperty('--banner-last-x');
  }
  if (reduced.matches) {
   manifestoLines.forEach(line => line.classList.add('is-visible'));
   flight.classList.remove('hero-flight-intro');
   allReveals.forEach(node => node.classList.add('is-visible'));
  }
  schedule();
 };
 const render = () => {
  scheduled = false;
  const y = scrollY;
  const readingRect = readingBlock.getBoundingClientRect();
  const readingProgress = !active() ? 1 : clamp((innerHeight * .75 - readingRect.top) / (innerHeight * .45 + readingRect.height * .35));
  const readCount = Math.round(readingProgress * readingWords.length);
  readingWords.forEach((word, index) => word.classList.toggle('is-read', index < readCount));
  header.classList.toggle('is-scrolled', y > 30);
  if (Math.abs(y - previousY) > 5) {
   header.classList.toggle('is-hidden', y > previousY && y > 160 && !header.contains(document.activeElement) && !header.classList.contains('menu-open'));
   previousY = y;
  }
  if (!heroActive()) return;
  // Cue's text-to-center sequence: independently offset rows converge on scroll.
  const animateCenteredTitle = (title, lines) => {
  const titleRect = title.getBoundingClientRect();
  const titleProgress = clamp((innerHeight * .8 - titleRect.top) / (innerHeight * .6));
  const titleEase = 1 - Math.pow(1 - titleProgress, 2);
  const directions = [1, -1, 1];
  const distances = [.5, .5, .5];
  lines.forEach((line, index) => {
   const room = Math.max(0, (titleRect.width - line.offsetWidth) / 2 - 8);
   const distance = Math.min(titleRect.width * distances[index], room);
   line.style.setProperty('--cushion-x', ((1 - titleEase) * distance * directions[index]) + 'px');
  });
  title.style.setProperty('--cushion-space', ((1 - titleEase) * 4) + 'cqw');
  };
  if (active()) {
   animateCenteredTitle(cushionTitle, cushionLines);
   animateCenteredTitle(tutorialTitle, tutorialLines);
  }
  const storyStart = story.getBoundingClientRect().top + y;
  const storyDistance = Math.max(1, story.offsetHeight - visual.offsetHeight);
  const timeline = clamp((y - storyStart) / storyDistance);
  const progress = clamp(timeline / .425);
  const eased = 1 - (1 - progress) * (1 - progress);
  const target = center.getBoundingClientRect();
  const mix = (from, to) => from + (to - from) * eased;
  flight.style.width = mix(sourceGeometry.width, target.width) + 'px';
  flight.style.height = mix(sourceGeometry.height, target.height) + 'px';
  const startTop = sourceGeometry.top - Math.min(y, storyStart);
  flight.style.transform = 'translate3d(' + mix(sourceGeometry.left, target.left) + 'px,' + mix(startTop, target.top) + 'px,0)';
  lastImage.style.opacity = String(clamp((progress - .65) / .35));
  flight.hidden = progress >= 1;
  hero.classList.toggle('hero-flight-landed', progress >= 1);
  stage.style.setProperty('--story-logo-y', (-timeline * innerHeight) + 'px');
  stage.style.setProperty('--story-logo-opacity', String(1 - clamp(timeline / .65)));
  const sideProgress = clamp((timeline - .45) / .55);
  const sideEased = 1 - Math.pow(1 - sideProgress, 2);
  campaign.style.setProperty('--side-opacity', String(sideEased));
  campaign.style.setProperty('--side-shift', ((1 - sideEased) * innerWidth * 1.2) + 'px');
  if (!active()) return;
  const rect = newScene.getBoundingClientRect();
  if (rect.top <= 75 && rect.bottom >= track.offsetHeight + 75) {
   track.scrollLeft = clamp((75 - rect.top) / Math.max(1, horizontalDistance)) * horizontalDistance;
  } else if (rect.top > 75) track.scrollLeft = 0;
  else track.scrollLeft = horizontalDistance;
  const tutorialRect = tutorialScene.getBoundingClientRect();
  tutorialTrack.scrollLeft = clamp((tutorialPinTop - tutorialRect.top - tutorialHold) / Math.max(1,tutorialDistance)) * tutorialDistance;
  const bannerRect = banner.getBoundingClientRect();
  if (bannerRect.bottom > 0 && bannerRect.top < innerHeight) {
   const bannerProgress = clamp((innerHeight * .7 - bannerRect.top) / (innerHeight * .45 + bannerRect.height * .3));
   const bannerEase = 1 - Math.pow(1 - bannerProgress, 2);
   banner.style.setProperty('--banner-first-x', (bannerRect.width * .16 * bannerEase) + 'px');
   banner.style.setProperty('--banner-second-x', (bannerRect.width * .21 * bannerEase) + 'px');
   banner.style.setProperty('--banner-last-x', (-bannerRect.width * .2 * bannerEase) + 'px');
   banner.style.setProperty('--banner-y', ((innerHeight / 2 - bannerRect.top - bannerRect.height / 2) * .065) + 'px');
  }
 };
 function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(render); } }
 addEventListener('scroll', schedule, {passive:true});
 addEventListener('resize', measure, {passive:true});
 desktop.addEventListener('change', measure);
 reduced.addEventListener('change', measure);
 new ResizeObserver(measure).observe(track);
 new ResizeObserver(measure).observe(tutorialTrack);
 document.fonts.ready.then(measure);
 tutorialTrack.addEventListener('keydown', event => {
  if (!active() || !['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const start = scrollY + tutorialScene.getBoundingClientRect().top - tutorialPinTop + tutorialHold;
  const delta = event.key === 'ArrowRight' ? tutorialTrack.clientWidth : -tutorialTrack.clientWidth;
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? tutorialDistance : Math.max(0,Math.min(tutorialDistance,tutorialTrack.scrollLeft + delta));
  scrollTo({top:start + next,behavior:'smooth'});
 });
 // Keyboard access also advances the document through the pinned product scene.
 track.addEventListener('keydown', event => {
  if (!active() || !['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const start = scrollY + newScene.getBoundingClientRect().top - 75;
  const delta = event.key === 'ArrowRight' ? track.clientWidth : -track.clientWidth;
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? horizontalDistance : Math.max(0, Math.min(horizontalDistance, track.scrollLeft + delta));
  scrollTo({top:start + next, behavior:'smooth'});
 });
 measure();
})();
