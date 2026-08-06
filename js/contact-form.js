/* ============================================================
   CONTACT-FORM.JS — Graphic TECH
   Client-side validation + submit feedback for #contactForm.

   NOTE: This form has no backend endpoint wired up yet. On
   successful validation it shows a success message and resets
   the form. To go live, replace the TODO block below with a
   fetch() call to your form-handling endpoint / email service
   (e.g. Formspree, a serverless function, or your own API).
   ============================================================ */

(function () {
  'use strict';

  const form    = document.getElementById('contactForm');
  if (!form) return;
  const success = document.getElementById('formSuccess');

  function validateField(field) {
    const wrapper = field.closest('.field');
    if (!wrapper) return true;

    let valid = field.checkValidity();

    /* Extra check: simple email shape for the email field */
    if (field.type === 'email' && field.value.trim()) {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
    }

    wrapper.classList.toggle('has-error', !valid);
    return valid;
  }

  form.querySelectorAll('input[required], textarea[required]').forEach(function (field) {
    field.addEventListener('blur', function () { validateField(field); });
    field.addEventListener('input', function () {
      if (field.closest('.field').classList.contains('has-error')) validateField(field);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (success) success.classList.remove('is-visible');

    const requiredFields = Array.from(form.querySelectorAll('input[required], textarea[required]'));
    const allValid = requiredFields.map(validateField).every(Boolean);
    if (!allValid) {
      const firstError = form.querySelector('.field.has-error input, .field.has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    /* TODO: wire this up to a real endpoint, e.g.:
       fetch('/api/contact', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(Object.fromEntries(new FormData(form)))
       });
    */

    if (success) success.classList.add('is-visible');
    form.reset();
    requiredFields.forEach(function (f) {
      const w = f.closest('.field');
      if (w) w.classList.remove('has-error');
    });

    if (success) success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

})();
