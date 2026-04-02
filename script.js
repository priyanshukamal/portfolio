// Custom Cursor
const cursor = document.getElementById('cursor');
const dot    = document.getElementById('cursor-dot');
let mx=0,my=0,cx=0,cy=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.transform = `translate(${mx}px,${my}px)`;
});
(function loop() {
  cx += (mx - cx) * 0.1;
  cy += (my - cy) * 0.1;
  cursor.style.transform = `translate(${cx}px,${cy}px)`;
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,.tech-tag,.project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='54px'; cursor.style.height='54px'; cursor.style.borderColor='var(--accent2)'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='36px'; cursor.style.height='36px'; cursor.style.borderColor='var(--accent)'; });
});

// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Scroll Reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }});
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .exp-item').forEach(el => io.observe(el));

// Skill Bars
const barIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const bar = e.target.querySelector('.skill-bar');
      if (bar) setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 150);
      barIO.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(c => barIO.observe(c));

// Counter Animation
function countUp(el, target) {
  let n = 0;
  const step = () => {
    n += Math.ceil(target / 28);
    if (n >= target) { el.textContent = target + '+'; return; }
    el.textContent = n;
    requestAnimationFrame(step);
  };
  step();
}
const statsIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(n => countUp(n, +n.dataset.target));
      statsIO.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsIO.observe(heroStats);

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
  navAs.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : ''; });
});