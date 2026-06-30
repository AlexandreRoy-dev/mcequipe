/**
 * Formspree AJAX submit + redirect to merci.html
 */
(function (global) {
  const THANK_YOU_PATH = 'merci.html';

  const MESSAGES = {
    error: {
      fr: 'Une erreur est survenue. Veuillez réessayer ou nous appeler directement.',
      en: 'Something went wrong. Please try again or call us directly.',
    },
  };

  function lang() {
    return document.documentElement.dataset.lang === 'en' ? 'en' : 'fr';
  }

  function thankYouUrl(form) {
    const nextField = form.querySelector('[name="_next"]');
    let url;
    if (nextField && nextField.value) {
      url = nextField.value;
    } else {
      url = new URL(THANK_YOU_PATH, window.location.href).href;
    }

    const ghl = window.MC_SITE_CONFIG && window.MC_SITE_CONFIG.ghl;
    if (ghl && (ghl.bookingCalendarId || ghl.bookingUrl)) {
      const base = url.split('#')[0];
      return base + '#rdv';
    }
    return url;
  }

  function showError(form, type) {
    let el = form.querySelector('.form-status');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-status';
      el.setAttribute('role', 'alert');
      el.setAttribute('aria-live', 'assertive');
      form.appendChild(el);
    }

    const dark = form.dataset.formTheme === 'dark';
    const tone = dark ? 'text-red-300' : 'text-red-600';
    el.className = `form-status text-sm mt-4 font-light tracking-wide ${tone}`;
    el.textContent = MESSAGES[type][lang()];
  }

  async function handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();

    const consent = form.querySelector('[name="consent_loi25"]');
    if (consent && !consent.checked) {
      consent.reportValidity();
      return;
    }

    const consentDate = form.querySelector('[name="consent_date"]');
    if (consentDate && consent && consent.checked) {
      consentDate.value = new Date().toISOString();
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const statusEl = form.querySelector('.form-status');
    if (statusEl) statusEl.textContent = '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        if (global.MCGhlContact && typeof global.MCGhlContact.saveFromForm === 'function') {
          global.MCGhlContact.saveFromForm(form);
        }
        window.location.href = thankYouUrl(form);
        return;
      }
      showError(form, 'error');
    } catch {
      showError(form, 'error');
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
    }
  }

  function initForms() {
    document.querySelectorAll('form[action*="formspree.io"]').forEach((form) => {
      form.addEventListener('submit', handleSubmit);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForms);
  } else {
    initForms();
  }
})(window);
