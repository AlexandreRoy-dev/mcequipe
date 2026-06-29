/**
 * Formspree AJAX submit + redirect to merci.html
 */
(function () {
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
    if (nextField && nextField.value) return nextField.value;
    return new URL(THANK_YOU_PATH, window.location.href).href;
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
})();
