/* ============================================================
   MAIN.JS — Graphic Tech
   Handles: navbar scroll, mobile nav, hero bg load,
            scroll-reveal, portfolio grid render + load-more
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile nav toggle ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close mobile nav on anchor click */
  navLinks.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── Hero background loaded class ── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    const bgUrl = getComputedStyle(heroBg).backgroundImage
      .replace(/url\(["']?/, '').replace(/["']?\)/, '');
    if (bgUrl && bgUrl !== 'none') {
      const img = new Image();
      img.onload = function () { heroBg.classList.add('loaded'); };
      img.src = bgUrl;
    } else {
      heroBg.classList.add('loaded');
    }
  }

  /* Mark body as loaded for hero entrance animations */
  requestAnimationFrame(function () {
    document.body.classList.add('loaded');
  });

  /* ── Scroll-reveal (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll(
    '.fade-up, .fade-in, .slide-in-right, .scale-in'
  );
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    /* Fallback: show everything */
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Portfolio grid ── */
  const grid       = document.getElementById('portfolioGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  let rendered = 0;

  function placeholderSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21"/>
    </svg>`;
  }

  function renderPortfolioItem(item) {
    const el = document.createElement('div');
    el.className = 'portfolio-item scale-in';

    const hasImg = item.image;
    el.innerHTML = `
      ${hasImg
        ? `<img src="${item.image}" alt="${item.title}" loading="lazy"
               onerror="this.parentElement.querySelector('.portfolio-item-overlay').style.opacity='1';this.style.display='none'">`
        : `<div class="portfolio-placeholder">${placeholderSvg()}<span>${item.category}</span></div>`
      }
      <div class="portfolio-item-overlay">
        <p class="portfolio-item-category">${item.category}</p>
        <p class="portfolio-item-title">${item.title}</p>
      </div>`;

    return el;
  }

  function renderBatch() {
    if (typeof PORTFOLIO_ITEMS === 'undefined') return;
    const pageSize = typeof PORTFOLIO_PAGE_SIZE !== 'undefined' ? PORTFOLIO_PAGE_SIZE : 6;
    const batch = PORTFOLIO_ITEMS.slice(rendered, rendered + pageSize);

    batch.forEach(function (item) {
      grid.appendChild(renderPortfolioItem(item));
    });
    rendered += batch.length;

    /* Re-observe newly added elements */
    grid.querySelectorAll('.scale-in:not(.visible)').forEach(function (el) {
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver(
          function (entries, o) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                o.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );
        obs.observe(el);
      } else {
        el.classList.add('visible');
      }
    });

    if (rendered >= PORTFOLIO_ITEMS.length) {
      loadMoreBtn.style.display = 'none';
    }
  }

  if (grid) renderBatch();

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', renderBatch);
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

})();
