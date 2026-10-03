'use strict';
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const active = new Set();
  const ease = 'cubic-bezier(.22,1,.36,1)';
  function play(el, frames, delay = 0, duration = 850) {
    if(preference.matches) return;
    const animation = el.animate(frames,{duration,delay,easing:ease,fill:'backwards'});
    active.add(animation);
    animation.onfinish = animation.oncancel = () => active.delete(animation);
  }
  const effects = {
    card: [{opacity:.15,transform:'perspective(900px) rotateX(12deg) scale(.93)'},{opacity:1,transform:'perspective(900px) rotateX(0) scale(1)'}],
    image: [{clipPath:'inset(0 100% 0 0 round 12px)',transform:'scale(1.04)'},{clipPath:'inset(0 0% 0 0 round 12px)',transform:'scale(1)'}],
    heading: [{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)'}],
    row: [{opacity:0,transform:'translateX(-25px)'},{opacity:1,transform:'translateX(0)'}],
    dashboard: [{opacity:0,transform:'perspective(1000px) rotateY(-10deg) scale(.92)'},{opacity:1,transform:'perspective(1000px) rotateY(0) scale(1)'}]
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({target,isIntersecting}) => {
      if(!isIntersecting) return;
      observer.unobserve(target);
      const type = target.dataset.motion;
      play(target,effects[type],Number(target.dataset.motionDelay || 0),type === 'image' ? 1150 : 850);
      if(target.matches('.dashboard')) {
        target.querySelectorAll('.chat-messages .bubble').forEach((bubble,i) => play(bubble,[{opacity:0,transform:`translateX(${i%2 ? 18 : -18}px) scale(.95)`},{opacity:1,transform:'translateX(0) scale(1)'}],350+i*140,600));
        target.querySelectorAll('.dashboard-stats>div').forEach((stat,i) => play(stat,[{opacity:0,transform:'scale(.85)'},{opacity:1,transform:'scale(1)'}],650+i*80,500));
      }
      if(target.querySelector('.mini-chart')) target.querySelectorAll('.mini-chart i').forEach((bar,i)=>play(bar,[{transform:'scaleY(.05)'},{transform:'scaleY(1)'}],300+i*70,750));
    });
  },{threshold:.16});
  const groups = [
    ['.section-heading h2,.center-heading h2,.faq-section h2,.how-section h2,.benefits-intro h2','heading'],
    ['.feature-card,.price-card,.solution-details article,.benefit-item,.sector-card','card'],
    ['.how-photo,.closing-panel','image'],
    ['.dashboard,.voice-stage','dashboard'],
    ['.more-features article,.steps article,.faq-list details,.channel-option','row']
  ];
  groups.forEach(([selector,type]) => document.querySelectorAll(selector).forEach((el,i) => {
    el.dataset.motion=type;
    el.dataset.motionDelay=String((i% (type==='card' ? 3 : 4))*75);
    observer.observe(el);
  }));
  preference.addEventListener('change',()=>{if(preference.matches) active.forEach(animation=>animation.cancel());});
})();
