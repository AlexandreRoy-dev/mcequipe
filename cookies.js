/**
 * Subtle cookie consent banner — Quebec / Law 25
 */
(function () {
  const CONSENT_KEY = 'mc-cookie-consent';

  function injectStyles() {
    if (document.getElementById('cookie-consent-styles')) return;
    const s = document.createElement('style');
    s.id = 'cookie-consent-styles';
    s.textContent =
      '#cookie-consent{position:fixed;bottom:0;left:0;right:0;z-index:9998;padding:0 1rem 1rem;pointer-events:none;transform:translateY(110%);opacity:0;transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .45s ease}' +
      '#cookie-consent.is-visible{transform:translateY(0);opacity:1}' +
      '#cookie-consent.cookie-consent--hide{transform:translateY(110%);opacity:0}' +
      '#cookie-consent .cookie-consent__inner{pointer-events:auto;max-width:56rem;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.25rem;background:rgba(61,49,44,.94);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.08);border-radius:.5rem;box-shadow:0 8px 32px rgba(0,0,0,.2)}' +
      '#cookie-consent p{font-size:11px;line-height:1.5;letter-spacing:.04em;color:rgba(255,255,255,.75);font-weight:300;flex:1;min-width:200px}' +
      '#cookie-consent a{color:#bbab9a;text-decoration:underline;text-underline-offset:2px}' +
      '#cookie-consent a:hover{color:#fff}' +
      '#cookie-consent .cookie-consent__actions{display:flex;align-items:center;gap:.75rem;flex-shrink:0}' +
      '#cookie-consent button{font-size:10px;letter-spacing:.15em;text-transform:uppercase;padding:.5rem 1.25rem;border-radius:9999px;transition:background .2s,color .2s}' +
      '#cookie-consent [data-cookie-accept]{background:#bbab9a;color:#3d312c;font-weight:500}' +
      '#cookie-consent [data-cookie-accept]:hover{background:#fff}';
    document.head.appendChild(s);
  }

  function showBanner() {
    if (localStorage.getItem(CONSENT_KEY)) return;

    injectStyles();

    const bar = document.createElement('div');
    bar.id = 'cookie-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-live', 'polite');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML =
      '<div class="cookie-consent__inner">' +
      '<p><span data-i18n="cookies.message">Ce site utilise des témoins (cookies) essentiels et des services tiers pour son fonctionnement.</span> ' +
      '<a href="politique-confidentialite.html" data-i18n="cookies.learnMore">En savoir plus</a></p>' +
      '<div class="cookie-consent__actions">' +
      '<button type="button" data-cookie-accept class="hover-trigger" data-i18n="cookies.accept">Compris</button>' +
      '</div></div>';

    document.body.appendChild(bar);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => bar.classList.add('is-visible'));
    });

    if (window.I18n && typeof window.I18n.refresh === 'function') {
      window.I18n.refresh();
    }

    bar.querySelector('[data-cookie-accept]').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, '1');
      bar.classList.remove('is-visible');
      bar.classList.add('cookie-consent--hide');
      setTimeout(() => bar.remove(), 500);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
