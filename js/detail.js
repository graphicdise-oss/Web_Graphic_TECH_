/* ============================================================
   DETAIL.JS — Graphic Tech
   Handles the overlay panel: open, close, fetch /pages/*.html
   and inject content. Also loads detail.css lazily.
   ============================================================ */

(function () {
  'use strict';

  const overlay        = document.getElementById('overlay');
  const overlayBackdrop = document.getElementById('overlayBackdrop');
  const overlayPanel   = document.getElementById('overlayPanel');
  const overlayContent = document.getElementById('overlayContent');
  const overlayClose   = document.getElementById('overlayClose');

  let currentPage   = null;
  let detailCssLoaded = false;

  /* ---------- Load detail.css once ---------- */
  function ensureDetailCss() {
    if (detailCssLoaded) return;
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'css/detail.css';
    document.head.appendChild(link);
    detailCssLoaded = true;
  }

  /* ---------- Open overlay ---------- */
  async function openOverlay(page) {
    if (page === currentPage) { showOverlay(); return; }

    ensureDetailCss();
    showOverlay();
    setLoading(true);

    try {
      const res  = await fetch(`pages/${page}.html`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();

      const parser = new DOMParser();
      const doc    = parser.parseFromString(html, 'text/html');

      /* Support both fragment files and full HTML files */
      const main = doc.querySelector('main') || doc.body;
      overlayContent.innerHTML = main ? main.innerHTML : html;

      currentPage = page;
    } catch (err) {
      overlayContent.innerHTML = `
        <div style="text-align:center;padding:60px 20px;color:var(--muted)">
          <p style="font-size:2rem;margin-bottom:16px">⚠️</p>
          <p>ไม่สามารถโหลดหน้านี้ได้ในขณะนี้</p>
          <p style="font-size:0.82rem;margin-top:8px;opacity:0.5">${err.message}</p>
        </div>`;
    }

    overlayContent.scrollTop = 0;
  }

  function showOverlay() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    overlayClose.focus();
  }

  function closeOverlay() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function setLoading(on) {
    if (on) {
      overlayContent.innerHTML = `
        <div class="overlay-loading">
          <div class="spinner"></div>
          <p>กำลังโหลด...</p>
        </div>`;
    }
  }

  /* ---------- Event delegation: anything with data-page ---------- */
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-page]');
    if (!trigger) return;
    e.preventDefault();

    const page = trigger.dataset.page;
    if (!page) return;

    /* Close mobile nav if open */
    const navLinks  = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    if (navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle && navToggle.classList.remove('open');
      document.body.style.overflow = '';
    }

    openOverlay(page);
  });

  /* ---------- Keyboard: Enter / Space on service cards ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const trigger = e.target.closest('[data-page]');
    if (trigger) {
      e.preventDefault();
      openOverlay(trigger.dataset.page);
    }
  });

  /* ---------- Close handlers ---------- */
  overlayClose.addEventListener('click', closeOverlay);
  overlayBackdrop.addEventListener('click', closeOverlay);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeOverlay();
    }
  });

})();
