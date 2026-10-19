/* =====================  EDIT YOUR DETAILS HERE  ===================== */
const SITE = {
  name: 'Fia Studios',                 // your brand name
  email: 'hello@yourdomain.com',
  phone: '+1 000 000 0000',
  whatsapp: '10000000000',           // digits only, with country code
  formEndpoint: '',                  // optional: Formspree URL, e.g. 'https://formspree.io/f/abcdwxyz'
};

// Portfolio projects. theme: mint | peach | lav | sky | pink | butter
// To use a real screenshot, add  image: 'images/my-project.jpg'  (and  url: 'https://...' to link a live demo,  host: 'shown-in-address-bar')
const PROJECTS = [
  { name: 'FORGE Athletic', cat: 'health', tag: 'Gym', theme: 'lav', image: 'images/forge.jpg', url: 'https://fiastudios.github.io/gym/', host: 'fiastudios.github.io/gym', desc: 'Memberships, a live class board, coaches, and a free-week booking form.' },
];
/* =================================================================== */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
const nav = [['index.html', 'Home'], ['work.html', 'Our Work'], ['pricing.html', 'Pricing'], ['contact.html', 'Contact']];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover: hover)').matches;

/* ---------- Shell: background, nav, footer ---------- */
document.body.insertAdjacentHTML('afterbegin', `
  <div class="aurora"><i></i><i></i><i></i><i></i><i></i></div>
  <div class="cursor-glow"></div><div class="progress"></div>
  <header class="nav"><div class="nav-inner glass">
    <a class="logo" href="index.html"><span class="wm"><b>fia</b>studios<i>.</i></span></a>
    <nav class="nav-links">${nav.map(([h, t]) => `<a href="${h}" class="${h === page ? 'active' : ''}">${t}</a>`).join('')}</nav>
    <a class="btn btn-dark btn-sm nav-cta" href="contact.html">Get a free quote <span class="arr">→</span></a>
    <button class="menu-btn" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
  </div></header>`);
document.body.insertAdjacentHTML('beforeend', `
  <footer class="footer"><div class="container">
    <div class="footer-grid">
      <div><a class="logo" href="index.html"><span class="wm"><b>fia</b>studios<i>.</i></span></a><p>Beautiful, fast websites for businesses that want to grow online.</p></div>
      <div><h4>Pages</h4><ul>${nav.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
      <div><h4>Get in touch</h4><ul><li><a href="mailto:${SITE.email}">${SITE.email}</a></li><li><a href="tel:${SITE.phone.replace(/\s/g, '')}">${SITE.phone}</a></li><li><a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li></ul></div>
    </div>
    <div class="copy"><span>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</span><span>Designed with care.</span></div>
  </div><div class="wordmark" aria-hidden="true">fiastudios.</div></footer>`);

const menuBtn = $('.menu-btn'), links = $('.nav-links');
menuBtn.addEventListener('click', () => menuBtn.setAttribute('aria-expanded', links.classList.toggle('open')));
$$('.nav-links a').forEach(a => a.addEventListener('click', () => { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }));

/* ---------- Mockup generator ---------- */
const mock = (theme, emoji) => `<div class="mock t-${theme}">
  <div class="m-nav"><i class="m-logo"></i><span><b></b><b></b><b></b></span><u class="m-cta"></u></div>
  <div class="m-body"><div class="m-text"><em class="m-tag"></em><h6></h6><h6 class="s"></h6><p></p><p class="s"></p><u class="m-btn"></u></div><div class="m-img"><span>${emoji}</span></div></div>
  <div class="m-cards"><i></i><i></i><i></i></div></div>`;
const browser = (inner, url = '') => `<div class="browser"><div class="browser-bar"><i></i><i></i><i></i><u>${url}</u></div>${inner}</div>`;
$$('[data-mock]').forEach(el => {
  const [theme, emoji] = el.dataset.mock.split('|');
  el.innerHTML = browser(mock(theme, emoji), el.dataset.url || 'yourbusiness.com');
});

/* ---------- Portfolio ---------- */
const bg = { mint: '#d3f7e8', peach: '#ffe3d3', lav: '#e4dbff', sky: '#d3ebff', pink: '#ffd9ec', butter: '#fff3c4' };
const card = p => {
  const media = p.image ? browser(`<img class="shot" src="${p.image}" alt="${p.name} website">`, p.host || '') : browser(mock(p.theme, p.emoji), p.host || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '') + '.com');
  const inner = `<div class="work-media" style="--c-bg:${bg[p.theme]}">${media}</div><div class="work-body"><span class="tg">${p.tag}</span><h3>${p.name}</h3><p>${p.desc}</p></div>`;
  return `<article class="work glass reveal" data-cat="${p.cat}" data-tilt>${p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${inner}</a>` : inner}</article>`;
};
const grid = $('#work-grid');
if (grid) grid.innerHTML = PROJECTS.slice(0, +(grid.dataset.limit || PROJECTS.length)).map(card).join('');
$$('.fchip').forEach(chip => chip.addEventListener('click', () => {
  $$('.fchip').forEach(c => c.classList.remove('active')); chip.classList.add('active');
  $$('.work').forEach(w => w.classList.toggle('hide', chip.dataset.filter !== 'all' && w.dataset.cat !== chip.dataset.filter));
}));

/* ---------- Marquee ---------- */
const track = $('.marquee-track');
if (track) track.innerHTML += track.innerHTML;

/* ---------- Word rotator ---------- */
const rot = $('.rot-in');
if (rot) {
  const words = rot.dataset.words.split(',');
  rot.innerHTML = [...words, words[0]].map(w => `<span>${w}</span>`).join('');
  let i = 0;
  if (!reduce) setInterval(() => {
    i++; rot.style.transform = `translateY(${-i * 1.2}em)`;
    if (i === words.length) setTimeout(() => { rot.style.transition = 'none'; rot.style.transform = 'translateY(0)'; i = 0; rot.offsetHeight; rot.style.transition = ''; }, 800);
  }, 2400);
}

/* ---------- Reveal + counters ---------- */
const count = el => {
  const end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
  const tick = t => { const p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
};
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in'); io.unobserve(e.target);
  $$('[data-count]', e.target).forEach(count); if (e.target.matches('[data-count]')) count(e.target);
}), { threshold: .15 });
$$('.reveal').forEach(el => io.observe(el));

/* ---------- Pointer effects (desktop only) ---------- */
const bar = $('.progress');
addEventListener('scroll', () => { bar.style.transform = `scaleX(${scrollY / (document.body.scrollHeight - innerHeight || 1)})`; }, { passive: true });
if (canHover && !reduce) {
  const glow = $('.cursor-glow');
  addEventListener('pointermove', e => { glow.style.opacity = 1; glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
  const stage = $('.stage');
  if (stage) stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    $$('.px', stage).forEach(p => { const d = +p.dataset.depth || 20; p.style.translate = `${-x * d}px ${-y * d}px`; });
  });
  if (stage) stage.addEventListener('pointerleave', () => $$('.px', stage).forEach(p => p.style.translate = '0 0'));
  document.addEventListener('pointermove', e => {
    $$('[data-tilt]').forEach(el => {
      const r = el.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) { el.style.transform = ''; return; }
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
    });
  });
}

/* ---------- Contact form ---------- */
const params = new URLSearchParams(location.search), planSel = $('#plan');
if (planSel && params.get('plan')) planSel.value = params.get('plan');
const form = $('#contact-form');
if (form) form.addEventListener('submit', async e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const done = () => { form.style.display = 'none'; $('.success').style.display = 'block'; };
  if (SITE.formEndpoint) {
    try {
      const r = await fetch(SITE.formEndpoint, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
      if (r.ok) return done();
    } catch (_) { /* fall back to email */ }
  }
  const body = `Name: ${d.name}\nBusiness: ${d.business || '-'}\nEmail: ${d.email}\nPhone: ${d.phone || '-'}\nPackage: ${d.plan}\n\n${d.message}`;
  location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Website enquiry from ' + d.name)}&body=${encodeURIComponent(body)}`;
  done();
});
