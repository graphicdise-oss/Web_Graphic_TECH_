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

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span style="display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 1s linear infinite; vertical-align:middle; margin-right:8px; box-sizing:border-box;"></span> กำลังส่งข้อมูล...';
      
      if (!document.getElementById('spinAnim')) {
        const style = document.createElement('style');
        style.id = 'spinAnim';
        style.innerHTML = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
      }
    }

    const existingError = form.querySelector('.form-alert--error');
    if (existingError) existingError.remove();

    fetch('https://formsubmit.co/ajax/graphictech.co.ltd@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    })
    .then(response => response.json())
    .then(data => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
      if (data.success === 'false') throw new Error('API Error');
      if (success) success.classList.add('is-visible');
      form.reset();
      requiredFields.forEach(function (f) {
        const w = f.closest('.field');
        if (w) w.classList.remove('has-error');
      });
      if (success) success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    })
    .catch(error => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
      const errorDiv = document.createElement('div');
      errorDiv.className = 'form-alert form-alert--error is-visible';
      errorDiv.style.backgroundColor = '#ffebee';
      errorDiv.style.color = '#c62828';
      errorDiv.style.padding = '1rem';
      errorDiv.style.borderRadius = '8px';
      errorDiv.style.marginBottom = '1.5rem';
      errorDiv.style.fontSize = '0.95rem';
      errorDiv.style.display = 'flex';
      errorDiv.style.alignItems = 'center';
      errorDiv.style.gap = '0.75rem';
      errorDiv.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง';
      form.insertBefore(errorDiv, form.firstChild);
    });
  });

})();
