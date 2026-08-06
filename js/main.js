/* ============================================================
   MAIN.JS — Graphic TECH
   Handles: navbar scroll/mega menu/mobile nav, scroll progress,
            scroll-reveal, portfolio grid render + filter +
            load-more, back-to-top, admin theme panel,
            smooth anchor scroll
   ============================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------------------
     NAVBAR: sticky shadow + scroll progress
     ------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('is-stuck', y > 30);

    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (y / docH) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = pct + '%';

    if (toTop) toTop.classList.toggle('is-visible', y > 480);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ------------------------------------------------------------
     MOBILE NAV
     ------------------------------------------------------------ */
  const navToggle  = document.getElementById('navToggle');
  const navMenu    = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');

  function closeMobileNav() {
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navBackdrop.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }

  function toggleMobileNav() {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navBackdrop.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  }

  if (navToggle) navToggle.addEventListener('click', toggleMobileNav);
  if (navBackdrop) navBackdrop.addEventListener('click', closeMobileNav);

  /* Mega menu: expand-in-place on mobile, hover on desktop (CSS handles hover) */
  document.querySelectorAll('.nav__item').forEach(function (item) {
    const link = item.querySelector(':scope > .nav__link');
    const mega = item.querySelector('.nav__mega');
    if (!link || !mega) return;

    link.addEventListener('click', function (e) {
      if (window.innerWidth > 900) return; /* desktop uses hover */
      e.preventDefault();
      e.stopImmediatePropagation(); /* block the smooth-scroll handler on this same anchor */
      const isExpanded = item.classList.toggle('is-expanded');
      link.setAttribute('aria-expanded', String(isExpanded));
    });
  });

  /* Close mobile nav when a normal link/anchor inside it is clicked */
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (link.closest('.nav__mega')) return; /* mega links handled by detail.js */
      closeMobileNav();
    });
  });

  /* ------------------------------------------------------------
     SCROLL REVEAL (IntersectionObserver)
     ------------------------------------------------------------ */
  const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade';
  const revealEls = Array.from(document.querySelectorAll(revealSelectors));

  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Expose a helper other modules (counters.js) can reuse */
  window.GTObserveReveal = function (el) {
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(function (entries, o) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            o.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      obs.observe(el);
    } else {
      el.classList.add('is-visible');
    }
  };

  /* ------------------------------------------------------------
     BACK TO TOP
     ------------------------------------------------------------ */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    toTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  onScroll();

  /* ------------------------------------------------------------
     ADMIN THEME PANEL
     ------------------------------------------------------------ */
  const adminFab   = document.getElementById('adminFab');
  const adminPanel = document.getElementById('adminPanel');

  if (adminFab && adminPanel) {
    adminFab.addEventListener('click', function () {
      const isOpen = adminPanel.classList.toggle('is-open');
      adminFab.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', function (e) {
      if (!adminPanel.contains(e.target) && !adminFab.contains(e.target)) {
        adminPanel.classList.remove('is-open');
        adminFab.setAttribute('aria-expanded', 'false');
      }
    });

    document.querySelectorAll('.swatch').forEach(function (sw) {
      sw.addEventListener('click', function () {
        document.querySelectorAll('.swatch').forEach(function (s) { s.classList.remove('is-active'); });
        sw.classList.add('is-active');
        document.documentElement.setAttribute('data-theme-swatch', sw.dataset.swatch || 'blue');
      });
    });
  }

  /* ------------------------------------------------------------
     PORTFOLIO GRID: render, filter, load-more
     ------------------------------------------------------------ */
  const grid        = document.getElementById('portfolioGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const filterWrap  = document.getElementById('portfolioFilters');

  let activeFilter = 'all';
  let rendered = 0;

  /* Map portfolio category -> service detail page (for "ดูรายละเอียด") */
  const CATEGORY_PAGE_MAP = {
    'UI/UX Design': 'service-uiux',
    'Graphic Design': 'service-graphic',
    'Web Development': 'service-web',
    'Digital Marketing': 'service-marketing',
    'ERP System': 'service-erp',
    'Branding': 'service-branding',
  };

  function placeholderSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21"/>
    </svg>`;
  }

  function filteredItems() {
    if (typeof PORTFOLIO_ITEMS === 'undefined') return [];
    if (activeFilter === 'all') return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter(function (item) { return item.category === activeFilter; });
  }

  function renderPortfolioItem(item) {
    const el = document.createElement('div');
    el.className = 'portfolio-item reveal-scale';
    el.tabIndex = 0;

    const page = CATEGORY_PAGE_MAP[item.category] || '';
    const hasImg = item.image;

    el.innerHTML = `
      ${hasImg ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : ''}
      <div class="portfolio-placeholder" style="${hasImg ? 'display:none' : ''}">
        ${placeholderSvg()}<span>${item.category}</span>
      </div>
      <div class="portfolio-item__overlay">
        <p class="portfolio-item__category">${item.category}</p>
        <p class="portfolio-item__title">${item.title}</p>
        <span class="portfolio-item__link" ${page ? `data-page="${page}"` : ''}>
          ดูรายละเอียด
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>`;

    const img = el.querySelector('img');
    if (img) {
      img.addEventListener('error', function () {
        img.style.display = 'none';
        const ph = el.querySelector('.portfolio-placeholder');
        if (ph) ph.style.display = '';
      });
    }

    if (page) {
      el.dataset.page = page;
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', item.title + ' — ดูรายละเอียด');
    }

    return el;
  }

  function observeNewReveal(container) {
    container.querySelectorAll('.reveal-scale:not(.is-visible)').forEach(function (el) {
      window.GTObserveReveal(el);
    });
  }

  function renderBatch(reset) {
    if (!grid || typeof PORTFOLIO_ITEMS === 'undefined') return;
    if (reset) {
      grid.innerHTML = '';
      rendered = 0;
    }
    const items = filteredItems();
    const pageSize = typeof PORTFOLIO_PAGE_SIZE !== 'undefined' ? PORTFOLIO_PAGE_SIZE : 6;
    const batch = items.slice(rendered, rendered + pageSize);

    batch.forEach(function (item) { grid.appendChild(renderPortfolioItem(item)); });
    rendered += batch.length;
    observeNewReveal(grid);

    if (loadMoreBtn) {
      loadMoreBtn.style.display = rendered >= items.length ? 'none' : '';
    }
  }

  if (grid) renderBatch(true);
  if (loadMoreBtn) loadMoreBtn.addEventListener('click', function () { renderBatch(false); });

  if (filterWrap) {
    filterWrap.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterWrap.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      activeFilter = btn.dataset.filter || 'all';
      renderBatch(true);
    });
  }

  /* ------------------------------------------------------------
     SMOOTH SCROLL for in-page anchors
     ------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]:not([data-page])').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

})();
