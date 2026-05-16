// ============================================================
// DANIEL MACÊDO PASSOS — Portfolio JS
// ============================================================

// ── Year ────────────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar scroll shrink ────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Hamburger menu ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Code Rain (hero background) ─────────────────────────────
(function buildCodeRain() {
  const container = document.getElementById('codeRain');
  if (!container) return;

  const chars = '01アイウエオカキクケコサシスセソ{}[];()=>function const let var if else return import export class extends{}[]</>データ解析';
  const columns = Math.floor(window.innerWidth / 28);

  for (let i = 0; i < columns; i++) {
    const col = document.createElement('div');
    col.classList.add('code-column');

    // Random string of chars
    let text = '';
    const len = 20 + Math.floor(Math.random() * 30);
    for (let j = 0; j < len; j++) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }
    col.textContent = text;

    col.style.left    = `${i * 28 + Math.random() * 14}px`;
    col.style.animationDuration = `${6 + Math.random() * 14}s`;
    col.style.animationDelay   = `${-Math.random() * 15}s`;
    col.style.opacity = `${0.04 + Math.random() * 0.1}`;

    container.appendChild(col);
  }
})();

// ── Scroll reveal ───────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.skill-card, .timeline-item, .edu-card, .lang-card, .contact-item, .section-header'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Staggered delay based on sibling order
      const siblings = [...entry.target.parentElement.children];
      const order    = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${order * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── Skill bar animation ─────────────────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');

skillFills.forEach(fill => {
  const targetWidth = fill.style.width;
  fill.style.setProperty('--target-width', targetWidth);
  fill.style.width = '0';
});

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => barObserver.observe(fill));

// ── Active nav link on scroll ───────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchs  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchs.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
