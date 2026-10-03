'use strict';
(() => {
  const items = [...document.querySelectorAll('.faq-list details')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const states = new Map(items.map(item => [item, { expanded:item.open, animation:null }]));
  function settle(item) {
    const state = states.get(item);
    if (state.animation) {
      state.animation.onfinish = null;
      state.animation.cancel();
      state.animation = null;
    }
    item.open = state.expanded;
    item.style.removeProperty('height');
    item.style.removeProperty('overflow');
  }
  function change(item, expanded) {
    const state = states.get(item);
    const start = item.getBoundingClientRect().height;
    state.expanded = expanded;
    item.querySelector('summary').setAttribute('aria-expanded', String(expanded));
    item.classList.toggle('faq-expanded', expanded);
    if (state.animation) {
      state.animation.onfinish = null;
      state.animation.cancel();
      state.animation = null;
    }
    if (reduced.matches || !item.animate) { settle(item); return; }
    // Measure the natural target, then keep details open until closing completes.
    item.style.removeProperty('height');
    item.open = expanded;
    const end = item.getBoundingClientRect().height;
    item.open = true;
    item.style.overflow = 'hidden';
    item.style.height = `${start}px`;
    const animation = item.animate([{height:`${start}px`},{height:`${end}px`}], {
      duration:320, easing:'cubic-bezier(.22,1,.36,1)', fill:'forwards'
    });
    state.animation = animation;
    animation.onfinish = () => settle(item);
  }
  items.forEach(item => {
    const summary = item.querySelector('summary');
    summary.setAttribute('aria-expanded', String(item.open));
    item.classList.toggle('faq-expanded', item.open);
    summary.addEventListener('click', event => {
      event.preventDefault();
      const expanded = !states.get(item).expanded;
      if (expanded) items.forEach(other => {
        if (other !== item && states.get(other).expanded) change(other, false);
      });
      change(item, expanded);
    });
  });
  window.addEventListener('resize', () => items.forEach(settle), {passive:true});
  reduced.addEventListener('change', () => items.forEach(settle));
})();
