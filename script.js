// ============================================================
// DANIEL MACÊDO PASSOS — Portfolio JS (Terminal Edition)
// ============================================================

// ── Year ────────────────────────────────────────────────────
const yr = new Date().getFullYear();
document.getElementById('year').textContent = yr;

// ── Navbar scroll ───────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger ───────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav on scroll ────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchs  = document.querySelectorAll('.nav-links a');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchs.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObs.observe(s));

// ── Scroll reveal ───────────────────────────────────────────
document.querySelectorAll(
  '.skill-card, .git-entry, .edu-card, .lang-card, .contact-item'
).forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children];
      const i = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${i * 60}ms`;
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Typewriter effect on hero terminal lines ─────────────── 
// Adds a subtle "typed" appearance to terminal commands on load
(function typewriterHero() {
  const cmds = document.querySelectorAll('.t-cmd');
  cmds.forEach((cmd, i) => {
    const text = cmd.textContent;
    cmd.textContent = '';
    let j = 0;
    setTimeout(() => {
      const iv = setInterval(() => {
        cmd.textContent += text[j];
        j++;
        if (j >= text.length) clearInterval(iv);
      }, 28);
    }, 400 + i * 600);
  });
})();
