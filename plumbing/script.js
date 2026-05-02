const siteHeader = document.querySelector('#site-header');
const menuToggle = document.querySelector('#menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const smoothLinks = document.querySelectorAll('a[href^="#"]');

const updateScrolledState = () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 40);
};

updateScrolledState();
window.addEventListener('scroll', updateScrolledState);

if (menuToggle && siteHeader) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
}

for (const link of smoothLinks) {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (siteHeader?.classList.contains('menu-open')) {
      siteHeader.classList.remove('menu-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Open menu');
    }
  });
}

if (mobileMenu) {
  mobileMenu.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (!event.target.closest('a')) return;
    siteHeader?.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open menu');
  });
}

const animatedSelectors = [
  '.services-topline',
  '.services-intro > *',
  '.service-card',
  '.trust-topline',
  '.trust-ticker',
  '.trust-stat',
  '.about-topline',
  '.about-media',
  '.about-content > *',
  '.contact-topline',
  '.contact-left > *',
  '.contact-right > *',
  '.site-footer-grid > *',
  '.site-footer-bottom > *',
];

const animatedNodes = document.querySelectorAll(animatedSelectors.join(', '));
const heroAnimatedNodes = document.querySelectorAll(
  '.section-index, .scroll-hint, .emergency-tab'
);

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  for (const node of animatedNodes) node.classList.add('in-view');
} else {
  for (const node of animatedNodes) node.classList.add('reveal-on-view');

  heroAnimatedNodes.forEach((node, index) => {
    node.style.setProperty('--reveal-delay', `${index * 90}ms`);
  });

  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    const columnOffset = index % 3;
    const rowOffset = Math.floor(index / 3) * 70;
    const delay = 90 + rowOffset + columnOffset * 70;
    card.style.setProperty('--reveal-delay', `${delay}ms`);
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
  );

  for (const node of animatedNodes) observer.observe(node);

  // Trigger hero reveal immediately on first load.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      for (const node of heroAnimatedNodes) {
        node.classList.add('in-view');
      }
    });
  });
}

const runHeroLoadAnimation = () => {
  document.documentElement.classList.add('hero-ready');
};

if (document.readyState === 'complete') {
  requestAnimationFrame(runHeroLoadAnimation);
} else {
  window.addEventListener('load', () => {
    requestAnimationFrame(runHeroLoadAnimation);
  });
}
