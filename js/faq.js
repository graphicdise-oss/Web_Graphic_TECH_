/* ============================================================
   FAQ.JS — Graphic TECH
   Accordion behaviour for the FAQ section (#faqAccordion).
   ============================================================ */

(function () {
  'use strict';

  const accordion = document.getElementById('faqAccordion');
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll('.acc-item'));

  function setPanelHeight(item, open) {
    const panel = item.querySelector('.acc-panel');
    if (!panel) return;
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
  }

  function openItem(item) {
    item.classList.add('is-open');
    const trigger = item.querySelector('.acc-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    setPanelHeight(item, true);
  }

  function closeItem(item) {
    item.classList.remove('is-open');
    const trigger = item.querySelector('.acc-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    setPanelHeight(item, false);
  }

  items.forEach(function (item) {
    const trigger = item.querySelector('.acc-trigger');
    if (!trigger) return;

    /* Initialise open state (first item ships open in markup) */
    if (item.classList.contains('is-open')) {
      /* Wait a tick so scrollHeight is measured after layout/fonts */
      requestAnimationFrame(function () { setPanelHeight(item, true); });
    }

    trigger.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');
      items.forEach(closeItem);
      if (!isOpen) openItem(item);
    });
  });

  /* Recalculate open panel height on resize (e.g. text reflow) */
  window.addEventListener('resize', function () {
    const openItem = accordion.querySelector('.acc-item.is-open');
    if (openItem) setPanelHeight(openItem, true);
  });

})();
