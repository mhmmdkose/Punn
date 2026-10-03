'use strict';
(() => {
  const stage = document.querySelector('.voice-stage');
  if (!stage) return;
  const examples = [
    ['YAPAY ZEKÂ SESLİ ASİSTAN', 'Merhaba, otelimize hoş geldiniz. Ben yapay zekâ sesli asistanınız. Size nasıl yardımcı olabilirim?'],
    ['MİSAFİR', 'Merhaba, hafta sonu için konaklama hakkında bilgi almak istiyorum.'],
    ['YAPAY ZEKÂ SESLİ ASİSTAN', 'Memnuniyetle yardımcı olurum. Hangi tarihler arasında konaklamayı düşünüyorsunuz?']
  ];
  let index = 0;
  const button = stage.querySelector('.voice-next');
  button.addEventListener('click', () => {
    index = (index + 1) % examples.length;
    stage.querySelector('.voice-speaker').textContent = examples[index][0];
    stage.querySelector('.voice-transcript p').textContent = examples[index][1];
    stage.querySelector('.voice-step').textContent = `0${index + 1} / 03`;
    button.textContent = index === 2 ? 'Örneği yeniden göster' : 'Konuşmaya devam et';
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) stage.querySelector('.voice-transcript').animate([{opacity:.3,transform:'translateX(12px)'},{opacity:1,transform:'translateX(0)'}],{duration:400,easing:'ease-out'});
  });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    stage.dataset.active = String(entries[0].isIntersecting);
  }).observe(stage);
})();
