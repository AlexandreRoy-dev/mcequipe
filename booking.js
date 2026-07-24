/**
 * GoHighLevel calendar  -  French contact layer, then calendar with prefill.
 */
(function () {
  const EMBED_BASE = 'https://api.leadconnectorhq.com/widget/booking/';
  const EMBED_ORIGIN = 'https://api.leadconnectorhq.com';
  const EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js';

  function config() {
    return window.MC_SITE_CONFIG && window.MC_SITE_CONFIG.ghl
      ? window.MC_SITE_CONFIG.ghl
      : {};
  }

  function pageLang() {
    return document.documentElement.dataset.lang === 'en' ? 'en' : 'fr';
  }

  function buildEmbedQuery() {
    if (window.MCGhlContact && typeof window.MCGhlContact.toEmbedQuery === 'function') {
      return window.MCGhlContact.toEmbedQuery(pageLang());
    }
    const params = new URLSearchParams();
    params.set('lang', pageLang() === 'en' ? 'en' : 'fr');
    const qs = params.toString();
    return qs ? '?' + qs : '';
  }

  function bookingHref(ghl) {
    const qs = buildEmbedQuery();
    if (ghl.bookingUrl) return ghl.bookingUrl + qs;
    if (ghl.bookingCalendarId) {
      return EMBED_BASE + encodeURIComponent(ghl.bookingCalendarId) + qs;
    }
    return '';
  }

  function isConfigured(ghl) {
    return Boolean(ghl.bookingCalendarId || ghl.bookingUrl);
  }

  function hasStoredContact() {
    return Boolean(
      window.MCGhlContact &&
        typeof window.MCGhlContact.getContact === 'function' &&
        window.MCGhlContact.getContact()
    );
  }

  function loadEmbedScript() {
    if (document.querySelector('script[data-ghl-embed-script]')) return;
    const script = document.createElement('script');
    script.src = EMBED_SCRIPT;
    script.type = 'text/javascript';
    script.dataset.ghlEmbedScript = '';
    script.async = true;
    document.body.appendChild(script);
  }

  function parseHeightMessage(data) {
    if (!data) return null;

    if (typeof data === 'string') {
      try {
        return parseHeightMessage(JSON.parse(data));
      } catch {
        return null;
      }
    }

    if (Array.isArray(data)) {
      const tag = data[0];
      const payload = data[1];
      if (tag === 'iFrameSizer' && payload && payload.height) {
        return Number(payload.height);
      }
      if (tag === 'setHeight' && payload && payload.height) {
        return Number(payload.height);
      }
    }

    if (typeof data === 'object') {
      if (data.height) return Number(data.height);
      if (data.type === 'setHeight' && data.height) return Number(data.height);
      if (data.data && data.data.height) return Number(data.data.height);
    }

    return null;
  }

  function setupIframeResize(iframe) {
    const applyHeight = (raw) => {
      const height = parseHeightMessage(raw);
      if (!height || height < 200) return;
      const padded = Math.ceil(height + 24);
      iframe.style.height = padded + 'px';
      iframe.style.minHeight = padded + 'px';
    };

    window.addEventListener('message', (event) => {
      if (event.origin !== EMBED_ORIGIN) return;
      applyHeight(event.data);
    });
  }

  function mountCalendar(container, calendarId) {
    container.innerHTML = '';
    container.hidden = false;
    container.classList.remove('flex', 'items-center', 'justify-center', 'min-h-[120px]');
    container.classList.add('ghl-booking-mount');

    const wrap = document.createElement('div');
    wrap.className = 'ghl-booking-embed';

    const iframe = document.createElement('iframe');
    iframe.src = EMBED_BASE + encodeURIComponent(calendarId) + buildEmbedQuery();
    iframe.title = container.dataset.bookingTitle || 'Réserver un rendez-vous';
    iframe.id = 'msgsndr-calendar';
    iframe.setAttribute('scrolling', 'yes');
    iframe.setAttribute('allow', 'fullscreen');
    iframe.loading = 'lazy';

    wrap.appendChild(iframe);
    container.appendChild(wrap);

    setupIframeResize(iframe);
    loadEmbedScript();
  }

  function mountFallback(container, href) {
    container.innerHTML = '';
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className =
      'inline-block bg-mc-ocean text-white px-10 py-4 text-xs uppercase tracking-widest rounded-full hover:bg-mc-charcoal transition-all duration-300';
    link.dataset.i18n = 'booking.cta';
    link.textContent = pageLang() === 'en' ? 'Book an appointment' : 'Réserver un rendez-vous';
    container.appendChild(link);
  }

  function prefillContactForm(form, contact) {
    if (!form || !contact) return;
    const map = {
      prenom: contact.first_name,
      nom: contact.last_name,
      email: contact.email,
      telephone: contact.phone,
    };
    Object.keys(map).forEach((name) => {
      const el = form.querySelector('[name="' + name + '"]');
      if (el && map[name]) el.value = map[name];
    });
  }

  function openCalendarStep(flow, calendarEl, ghl) {
    const formStep = flow.querySelector('[data-booking-contact-step]');
    const slotHint = flow.querySelector('[data-booking-slot-hint]');

    if (formStep) formStep.hidden = true;
    if (slotHint) slotHint.hidden = false;
    flow.classList.add('booking-flow--calendar');

    if (calendarEl.dataset.ghlMounted === '1') return;

    calendarEl.dataset.ghlMounted = '1';
    if (ghl.bookingCalendarId) {
      mountCalendar(calendarEl, ghl.bookingCalendarId);
    } else if (ghl.bookingUrl) {
      mountFallback(calendarEl, bookingHref(ghl));
    }
  }

  function initBookingFlow() {
    const flow = document.querySelector('[data-booking-flow]');
    if (!flow) return;

    const ghl = config();
    if (!isConfigured(ghl)) return;

    const form = flow.querySelector('[data-booking-contact-form]');
    const calendarEl = flow.querySelector('[data-ghl-booking]');
    if (!calendarEl) return;

    calendarEl.hidden = true;

    if (hasStoredContact()) {
      if (form) prefillContactForm(form, window.MCGhlContact.getContact());
      openCalendarStep(flow, calendarEl, ghl);
      return;
    }

    if (!form) {
      openCalendarStep(flow, calendarEl, ghl);
      return;
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const consent = form.querySelector('[name="consent_loi25"]');
      if (consent && !consent.checked) {
        consent.reportValidity();
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const contact =
        window.MCGhlContact && typeof window.MCGhlContact.saveFromForm === 'function'
          ? window.MCGhlContact.saveFromForm(form)
          : null;

      if (!contact) return;

      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
      }

      delete calendarEl.dataset.ghlMounted;
      openCalendarStep(flow, calendarEl, ghl);
    });
  }

  function initMounts() {
    const ghl = config();
    const configured = isConfigured(ghl);

    document.querySelectorAll('[data-ghl-booking-section]').forEach((section) => {
      section.hidden = !configured;
    });

    if (!configured) return;

    document.querySelectorAll('[data-ghl-booking-link]').forEach((el) => {
      el.href = 'merci.html#rdv';
      el.removeAttribute('target');
      el.removeAttribute('rel');
    });

    document.querySelectorAll('[data-ghl-booking]').forEach((container) => {
      if (container.closest('[data-booking-flow]')) return;
      if (container.dataset.ghlMounted === '1') return;
      container.dataset.ghlMounted = '1';
      if (ghl.bookingCalendarId) {
        mountCalendar(container, ghl.bookingCalendarId);
      } else if (ghl.bookingUrl) {
        mountFallback(container, ghl.bookingUrl);
      }
    });
  }

  function injectFunnelBookingOption() {
    const ghl = config();
    if (!isConfigured(ghl)) return;

    document.querySelectorAll('[data-funnel-submit]').forEach((step) => {
      if (step.querySelector('[data-funnel-booking]')) return;

      const block = document.createElement('div');
      block.className = 'funnel-booking-option text-center mt-8 pt-6 border-t border-current/10';
      block.dataset.funnelBooking = '';

      const isDark = step.closest('[data-form-theme="dark"]');
      const tone = isDark ? 'text-white/60' : 'text-mc-charcoal/60';

      block.innerHTML =
        '<p class="text-[10px] uppercase tracking-widest ' +
        tone +
        ' mb-3" data-i18n="booking.or">Ou réservez directement</p>' +
        '<a href="merci.html#rdv" class="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b pb-1 transition-colors ' +
        (isDark
          ? 'text-mc-sand border-mc-sand/40 hover:text-white'
          : 'text-mc-ocean border-mc-ocean/40 hover:text-mc-charcoal') +
        '" data-i18n="booking.cta">Réserver un rendez-vous →</a>';

      const submitWrap = step.querySelector('button[type="submit"], [type="submit"]');
      if (submitWrap && submitWrap.parentElement) {
        step.insertBefore(block, submitWrap.parentElement);
      } else {
        step.appendChild(block);
      }
    });
  }

  function init() {
    initBookingFlow();
    initMounts();
    injectFunnelBookingOption();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.MCBooking = {
    refresh() {
      document.querySelectorAll('[data-ghl-booking][data-ghl-mounted]').forEach((el) => {
        delete el.dataset.ghlMounted;
      });
      init();
    },
  };
})();
