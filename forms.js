/**
 * Formspree AJAX submit — avoids GitHub Pages 405 on native POST fallbacks.
 */
(function () {
  const MESSAGES = {
    success: {
      fr: 'Merci! Votre message a été envoyé. Nous vous répondrons sous peu.',
      en: 'Thank you! Your message has been sent. We will respond shortly.',
    },
    error: {
      fr: 'Une erreur est survenue. Veuillez réessayer ou nous appeler directement.',
      en: 'Something went wrong. Please try again or call us directly.',
    },
  };

  function lang() {
    return document.documentElement.dataset.lang === 'en' ? 'en' : 'fr';
  }

  function showStatus(form, type) {
    let el = form.querySelector('.form-status');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-status';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      form.appendChild(el);
    }

    const dark = form.dataset.formTheme === 'dark';
    const base = 'form-status text-sm mt-4 font-light tracking-wide';
    const tone =
      type === 'success'
        ? dark
          ? 'text-mc-sand'
          : 'text-mc-ocean'
        : dark
          ? 'text-red-300'
          : 'text-red-600';

    el.className = `${base} ${tone}`;
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
        form.reset();
        showStatus(form, 'success');
      } else {
        showStatus(form, 'error');
      }
    } catch {
      showStatus(form, 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
      }
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
