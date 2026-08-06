/* ============================================================
   TESTIMONIALS.JS — Graphic TECH
   Simple slide carousel for the customer reviews section.
   Slides are pre-rendered .t-slide groups inside #testimonialTrack.
   ============================================================ */

(function () {
  'use strict';

  const track = document.getElementById('testimonialTrack');
  if (!track) return;

  const slides   = Array.from(track.querySelectorAll('.t-slide'));
  const dotsWrap = document.getElementById('tDots');
  const dots     = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.t-dot')) : [];
  const prevBtn  = document.getElementById('tPrev');
  const nextBtn  = document.getElementById('tNext');

  let index = 0;
  let autoTimer = null;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(function (d, di) { d.classList.toggle('is-active', di === index); });
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, 6000);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  if (nextBtn) nextBtn.addEventListener('click', function () { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startAuto(); });
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { goTo(i); startAuto(); });
  });

  const wrap = track.closest('.t-track-wrap');
  if (wrap) {
    wrap.addEventListener('mouseenter', stopAuto);
    wrap.addEventListener('mouseleave', startAuto);
  }

  /* Basic touch swipe support */
  let touchStartX = 0;
  track.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', function (e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); startAuto(); }
  }, { passive: true });

  goTo(0);
  startAuto();

})();
