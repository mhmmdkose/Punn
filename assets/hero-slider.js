'use strict';
(() => {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.hero-slide')];
  const dots = [...carousel.querySelectorAll('[data-slide]')];
  const label = carousel.querySelector('.hero-slide-label');
  const captions = ['Sesli asistan', 'Otel deneyimi', 'WhatsApp konuşması'];
  const copy = document.querySelector('.hero-copy');
  const eyebrow = copy.querySelector('.eyebrow');
  const heading = copy.querySelector('h1');
  const description = copy.querySelector('.lead-copy');
  const original = { eyebrow:eyebrow.innerHTML, heading:heading.innerHTML, description:description.textContent };
  const copyBySlide = [original, {
    eyebrow:'<span class="status-dot"></span> Oteller için AI destekli çok kanallı resepsiyon',
    heading:'Misafir mesajlarını <span class="serif-accent">rezervasyona</span> dönüştürün.',
    description:'WhatsApp, Instagram, Messenger ve Web Chat mesajlarını tek panelde toplayın. Digital Reception misafirlerinizi 7/24 karşılar, yanıtlar ve satış fırsatlarını kaçırmaz.'
  }, {
    eyebrow:'<span class="status-dot"></span> WhatsApp üzerinden kesintisiz misafir iletişimi',
    heading:'Bir mesajla <span class="serif-accent">başlayan</span> misafir deneyimi.',
    description:'Misafirleriniz WhatsApp’tan yazsın, Digital Reception karşılasın. Soruları yanıtlasın, konaklama tarihlerini öğrensin ve rezervasyon taleplerini ekibinize iletsin. İlk mesajdan itibaren hızlı ve düzenli iletişim kurun.'
  }];
  let current = 0;
  const hero = document.querySelector('.hero');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ease = 'cubic-bezier(.22,1,.36,1)';
  let paused = reduced.matches;
  let hovered = false;
  let visible = true;
  let timer;
  let progressAnimation;
  const runningAnimations = [];
  const controls = carousel.querySelector('.hero-slider-controls');
  const pauseButton = document.createElement('button');
  pauseButton.className = 'hero-autoplay';
  pauseButton.type = 'button';
  controls.append(pauseButton);
  const progress = document.createElement('div');
  progress.className = 'hero-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<span></span>';
  controls.after(progress);
  function animate(element, frames, duration, delay = 0) {
    if (reduced.matches || !element.animate) return;
    runningAnimations.push(element.animate(frames, {duration, delay, easing:ease, fill:'backwards'}));
  }
  function animateEntrance() {
    runningAnimations.splice(0).forEach(animation => animation.cancel());
    animate(eyebrow, [{opacity:0, transform:'translateX(-24px)'}, {opacity:1, transform:'translateX(0)'}], 650);
    animate(heading, [{clipPath:'inset(0 100% 0 0)', transform:'translateX(-18px)'}, {clipPath:'inset(0 0% 0 0)', transform:'translateX(0)'}], 900, 70);
    animate(description, [{opacity:0, transform:'translateX(-30px)'}, {opacity:1, transform:'translateX(0)'}], 750, 220);
    animate(copy.querySelector('.hero-actions'), [{opacity:0, transform:'scale(.94)', transformOrigin:'left center'}, {opacity:1, transform:'scale(1)', transformOrigin:'left center'}], 650, 320);
    animate(slides[current], [{opacity:0, transform:'perspective(1200px) translateX(50px) rotateY(-9deg) scale(.94)'}, {opacity:1, transform:'perspective(1200px) translateX(0) rotateY(0) scale(1)'}], 1100, 60);
    if (current === 1) {
      animate(slides[1].querySelector('.hero-conversation'), [{opacity:0, scale:'.86'}, {opacity:1, scale:'1'}], 800, 420);
      animate(slides[1].querySelector('.floating-message'), [{opacity:0, scale:'.8'}, {opacity:1, scale:'1'}], 750, 600);
    }
  }
  function schedule() {
    clearTimeout(timer);
    progressAnimation?.cancel();
    pauseButton.textContent = paused ? '▶' : 'Ⅱ';
    pauseButton.setAttribute('aria-label', paused ? 'Otomatik geçişi başlat' : 'Otomatik geçişi duraklat');
    pauseButton.setAttribute('aria-pressed', String(paused));
    label.setAttribute('aria-live', paused ? 'polite' : 'off');
    if (paused || hovered || !visible || document.hidden || reduced.matches) return;
    progressAnimation = progress.firstElementChild.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}], {duration:7000,fill:'forwards'});
    timer = setTimeout(() => showSlide(current + 1), 7000);
  }
  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    eyebrow.innerHTML = copyBySlide[current].eyebrow;
    heading.innerHTML = copyBySlide[current].heading;
    description.textContent = copyBySlide[current].description;
    const voice = current === 0;
    copy.querySelector('.hero-actions .button').innerHTML = `${voice ? 'Sesli Asistan Demosu' : '15 Gün Ücretsiz Demo'} <span aria-hidden="true">↗</span>`;
    const secondary = copy.querySelector('.hero-actions .text-link');
    secondary.href = voice ? '#telefon-asistani' : '#paketler';
    secondary.innerHTML = `${voice ? 'Ürünü Keşfet' : 'Paketleri İncele'} <span aria-hidden="true">→</span>`;
    copy.querySelector('.hero-note').innerHTML = `<span class="tiny-check">✓</span> ${voice ? 'Otelinize uygun arama senaryolarını birlikte değerlendirelim.' : 'Kurulum, temel eğitim ve teknik destek dahil.'}`;
    copy.querySelector('.hero-channels').hidden = voice;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    label.textContent = `0${current + 1} / 0${slides.length} · ${captions[current]}`;
    animateEntrance();
    schedule();
  }
  dots.forEach(dot => dot.addEventListener('click', () => showSlide(Number(dot.dataset.slide))));
  carousel.querySelectorAll('[data-slide-step]').forEach(button => button.addEventListener('click', () => showSlide(current + Number(button.dataset.slideStep))));
  carousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showSlide(current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let start = null;
  carousel.addEventListener('touchstart', event => {
    if (event.touches.length !== 1 || event.target.closest('button')) { start = null; return; }
    start = { x:event.touches[0].clientX, y:event.touches[0].clientY };
  }, { passive:true });
  carousel.addEventListener('touchend', event => {
    if (!start) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) showSlide(current + (dx < 0 ? 1 : -1));
    start = null;
  }, { passive:true });
  carousel.addEventListener('touchcancel', () => { start = null; }, { passive:true });
  pauseButton.addEventListener('click', () => { paused = !paused; schedule(); });
  hero.addEventListener('pointerenter', event => { if(event.pointerType === 'mouse') { hovered = true; schedule(); } });
  hero.addEventListener('pointerleave', event => { if(event.pointerType === 'mouse') { hovered = false; schedule(); } });
  hero.addEventListener('focusin', event => { if(event.target !== pauseButton) { paused = true; schedule(); } });
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => {
    paused = reduced.matches;
    if(reduced.matches) runningAnimations.splice(0).forEach(animation => animation.cancel());
    schedule();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, {threshold:.15});
    observer.observe(hero);
  }
  animateEntrance();
  schedule();
})();
