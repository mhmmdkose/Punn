'use strict';

// Inline icons keep the static page independent of external icon libraries.
const icons = {
  hotel: '<path d="M5 21V3h14v18M3 21h18M9 21v-5h6v5M8 7h2m4 0h2M8 11h2m4 0h2"/>',
  car: '<path d="m4 10 2-6h12l2 6M3 10h18v8H3zM5 18v3m14-3v3M6 14h2m8 0h2"/>',
  store: '<path d="M4 10v11h16V10M2 10l3-7h14l3 7M2 10a3 3 0 0 0 5 2 3 3 0 0 0 5 0 3 3 0 0 0 5 0 3 3 0 0 0 5-2M9 21v-6h6v6"/>',
  cart: '<path d="M2 3h3l3 13h11l3-9H6M9 20h.01M18 20h.01"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>',
  bus: '<rect x="4" y="3" width="16" height="16" rx="3"/><path d="M4 12h16M8 3v9m8 7v3M8 19v3M7 16h2m6 0h2"/>',
  municipality: '<path d="m3 9 9-6 9 6H3ZM5 10v9m5-9v9m4-9v9m5-9v9M2 21h20M12 3V1h5"/>',
  restaurant: '<path d="M4 3v6a3 3 0 0 0 6 0V3M7 3v18M20 21V3c-4 2-5 7-5 10h5"/>',
  coffee: '<path d="M4 8h13v8a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 1h2a3 3 0 0 1 0 6h-2M7 2v3m4-3v3m4-3v3M2 21h18"/>',
  phone: '<path d="M5 3h4l2 5-3 2a14 14 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z"/><path d="M15 3a7 7 0 0 1 6 6m-6-2a3 3 0 0 1 2 2"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v3"/>',
  whatsapp: '<path d="M21 11.5a9 9 0 0 1-13.4 7.8L3 21l1.6-4.5A9 9 0 1 1 21 11.5Z"/><path d="m8 7 1.5 3-1 1c1 2 2 3 4 4l1-1 3 1.5c-1 3-4 2-7-1s-4-6-1.5-7.5Z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
  messenger: '<path d="M21 11.5c0 5-4 8.5-9 8.5a11 11 0 0 1-3-.4L5 22v-4A8 8 0 0 1 3 11.5C3 6.8 7 3 12 3s9 3.8 9 8.5Z"/><path d="m7 14 4-5 3 3 3-2-4 5-3-3Z" fill="currentColor" stroke="none"/>',
  chat: '<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H3l1.8-4.2A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 10h8M8 14h5"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8Z"/><path d="m2 12 10 5 10-5M2 16l10 5 10-5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  chart: '<path d="M4 3v17h17M8 15v-4m5 4V7m5 8V4"/>',
  zap: '<path d="m13 2-9 12h7l-1 8 10-13h-7Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6Z"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h4"/>',
  star: '<path d="m12 3 2.8 5.6 6.2.9-4.5 4.4 1.1 6.1-5.6-2.9L6.4 20l1.1-6.1L3 9.5l6.2-.9Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-13 5 3 2 5-4"/>',
  link: '<path d="m10 13 4-4m-5 6-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 2 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0" transform="translate(1 1)"/>',
  sliders: '<path d="M4 7h8m5 0h3M4 17h3m5 0h8"/><circle cx="14" cy="7" r="3"/><circle cx="10" cy="17" r="3"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-16a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v3"/>'
};
document.querySelectorAll('[data-icon]').forEach(element => {
  if (icons[element.dataset.icon]) element.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[element.dataset.icon]}</svg>`;
});

const header = document.querySelector('.site-header');
function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 12); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelectorAll('[data-channel]').forEach(button => {
  button.addEventListener('click', () => {
    const channel = button.dataset.channel;
    document.querySelectorAll('[data-channel]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-inbox]').forEach(item => item.classList.toggle('selected', item.dataset.inbox === channel));
    document.querySelector('#active-channel').textContent = channel;
  });
});

