'use strict';
(() => {
  const nav = document.querySelector('#main-nav');
  const mobileToggle = document.querySelector('.menu-toggle');
  const toggle = document.querySelector('.solutions-toggle');
  const panel = document.querySelector('#solutions-panel');
  const scrim = document.querySelector('.nav-scrim');
  const desktop = matchMedia('(min-width:1200px)');
  const hoverPointer = matchMedia('(hover:hover) and (pointer:fine)');
  const solutions = document.querySelector('.solutions-nav');
  let closeTimer;
  const dialog = document.querySelector('#test-et');
  function syncScrim() { scrim.hidden = panel.hidden && !nav.classList.contains('is-open'); }
  function openSolutions() {
    clearTimeout(closeTimer);
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    syncScrim();
  }
  function closeSolutions(focus = false) {
    clearTimeout(closeTimer);
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    syncScrim();
    if (focus) toggle.focus();
  }
  function closeNavigation(focus = false) {
    closeSolutions();
    nav.classList.remove('is-open');
    mobileToggle.setAttribute('aria-expanded','false');
    mobileToggle.setAttribute('aria-label','Menüyü aç');
    syncScrim();
    if (focus) mobileToggle.focus();
  }
  mobileToggle.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) return closeNavigation();
    nav.classList.add('is-open');
    mobileToggle.setAttribute('aria-expanded','true');
    mobileToggle.setAttribute('aria-label','Menüyü kapat');
    syncScrim();
  });
  solutions.addEventListener('pointerenter', event => {
    if (desktop.matches && hoverPointer.matches && event.pointerType === 'mouse') openSolutions();
  });
  solutions.addEventListener('pointerleave', event => {
    if (!desktop.matches || !hoverPointer.matches || event.pointerType !== 'mouse') return;
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (!panel.contains(document.activeElement)) closeSolutions();
    }, 220);
  });
  toggle.addEventListener('click', event => {
    if (desktop.matches && hoverPointer.matches && event.pointerType === 'mouse') openSolutions();
    else if (panel.hidden) openSolutions();
    else closeSolutions();
  });
  toggle.addEventListener('keydown', event => {
    if(event.key === 'ArrowDown') {
      event.preventDefault(); openSolutions(); panel.querySelector('a').focus();
    }
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeNavigation()));
  document.addEventListener('click', event => { if (!event.target.closest('.nav-wrap')) closeNavigation(); });
  document.addEventListener('keydown', event => {
    if(event.key !== 'Escape' || dialog.open) return;
    if(!panel.hidden) { event.preventDefault(); closeSolutions(true); }
    else if(nav.classList.contains('is-open')) { event.preventDefault(); closeNavigation(true); }
  });
  document.addEventListener('focusin', event => {
    if(!event.target.closest('.nav-wrap')) closeNavigation();
    else if(desktop.matches && !event.target.closest('.solutions-nav')) closeSolutions();
  });
  desktop.addEventListener('change', () => closeNavigation());
  document.querySelectorAll('[data-open-test]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault(); closeNavigation(); dialog.showModal(); document.body.classList.add('test-open');
  }));
  dialog.querySelector('.test-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const r=dialog.getBoundingClientRect();
    if(event.target === dialog && (event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('test-open');
    if(desktop.matches) document.querySelector('.nav-links>[data-open-test]').focus();
    else mobileToggle.focus();
  });
  const answers = {
    channels:'WhatsApp, Instagram DM, Messenger ve Web Chat üzerinden gelen misafir mesajlarını tek panelde yönetmek için tasarlanmıştır.',
    languages:'Evet. Misafir hangi dilde yazarsa yazsın aynı dilde doğal ve profesyonel yanıtlar üretilebilir.',
    support:'Evet. Kurulum, temel eğitim ve teknik destek demo sürecine dahildir.'
  };
  const log = dialog.querySelector('.test-conversation');
  dialog.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => {
    const question = document.createElement('div'); question.className='bubble guest'; question.textContent=button.textContent;
    const answer = document.createElement('div'); answer.className='bubble assistant'; answer.textContent=answers[button.dataset.question];
    log.append(question,answer);
    while(log.children.length > 9) log.firstElementChild.remove();
    log.scrollTop=log.scrollHeight;
  }));
})();
