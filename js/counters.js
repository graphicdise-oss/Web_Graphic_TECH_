/* ============================================================
   COUNTERS.JS — Graphic TECH
   Animates .counter[data-target] number counters upward once
   they scroll into view. Used by the stats section on index.html.
   ============================================================ */

(function () {
  'use strict';

  const counters = Array.from(document.querySelectorAll('.counter'));
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      /* ease-out-quad */
      const eased = 1 - (1 - progress) * (1 - progress);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          o.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { obs.observe(el); });
  } else {
    counters.forEach(animateCounter);
  }

})();
