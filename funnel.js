/**
 * Multi-step qualification funnels for Formspree forms.
 */
(function (global) {
  const PRIVACY_URL = 'politique-confidentialite.html';

  const COPY = {
    fr: {
      stepOf: (c, t) => `Étape ${c} sur ${t}`,
      next: 'Continuer',
      back: 'Retour',
      consentHtml:
        'J\'accepte que MC Équipe collecte et utilise mes renseignements personnels pour me recontacter au sujet de mon projet immobilier, conformément à la <a href="' +
        PRIVACY_URL +
        '" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>.',
      consentError: 'Veuillez accepter la politique de confidentialité pour envoyer votre demande.',
    },
    en: {
      stepOf: (c, t) => `Step ${c} of ${t}`,
      next: 'Continue',
      back: 'Back',
      consentHtml:
        'I agree that MC Équipe may collect and use my personal information to contact me about my real estate project, in accordance with the <a href="' +
        PRIVACY_URL +
        '" target="_blank" rel="noopener noreferrer">privacy policy</a>.',
      consentError: 'Please accept the privacy policy to submit your request.',
    },
  };

  function lang() {
    return document.documentElement.dataset.lang === 'en' ? 'en' : 'fr';
  }

  function t(key) {
    return COPY[lang()][key];
  }

  function isDarkForm(form) {
    return form.dataset.formTheme === 'dark';
  }

  function toneClass(form, light, dark) {
    return isDarkForm(form) ? dark : light;
  }

  function setRequiredForStep(step, active) {
    step.querySelectorAll('input, select, textarea').forEach((el) => {
      if (active) {
        if (el.dataset.funnelRequired === '1') {
          el.required = true;
        }
      } else if (el.required) {
        el.dataset.funnelRequired = '1';
        el.required = false;
      }
    });
  }

  function validateStep(step) {
    let valid = true;
    step.querySelectorAll('input, select, textarea').forEach((el) => {
      if (el.disabled) return;
      if (!el.checkValidity()) {
        valid = false;
        el.reportValidity();
      }
    });
    return valid;
  }

  function buildProgress(form, total) {
    const wrap = document.createElement('div');
    wrap.className = 'funnel-progress mb-8';
    wrap.setAttribute('role', 'progressbar');
    wrap.setAttribute('aria-valuemin', '1');
    wrap.setAttribute('aria-valuemax', String(total));
    wrap.setAttribute('aria-valuenow', '1');

    const label = document.createElement('p');
    label.className =
      'funnel-progress__label text-[10px] uppercase tracking-widest mb-3 ' +
      toneClass(form, 'text-mc-charcoal/50', 'text-white/50');
    label.textContent = t('stepOf')(1, total);

    const track = document.createElement('div');
    track.className = 'funnel-progress__track';

    const fill = document.createElement('div');
    fill.className = 'funnel-progress__fill';
    fill.style.width = `${100 / total}%`;

    track.appendChild(fill);
    wrap.append(label, track);

    return { wrap, label, fill };
  }

  function buildNav(form) {
    const nav = document.createElement('div');
    nav.className =
      'funnel-nav border-t ' + toneClass(form, 'border-mc-charcoal/10', 'border-white/10');

    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className =
      'funnel-btn funnel-btn--back ' + toneClass(form, 'text-mc-charcoal', 'text-white');
    backBtn.dataset.funnelBack = '';
    backBtn.textContent = t('back');
    backBtn.hidden = true;

    const spacer = document.createElement('div');
    spacer.className = 'funnel-nav__spacer';

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className =
      'funnel-btn funnel-btn--next ' + toneClass(form, 'text-mc-charcoal', 'text-mc-sand');
    nextBtn.dataset.funnelNext = '';
    nextBtn.textContent = t('next');

    nav.append(backBtn, spacer, nextBtn);
    return { nav, backBtn, nextBtn };
  }

  function buildConsent(form) {
    const id = `consent-${Math.random().toString(36).slice(2, 9)}`;
    const wrap = document.createElement('div');
    wrap.className = 'funnel-consent';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'consent_loi25';
    checkbox.value = 'oui';
    checkbox.id = id;
    checkbox.required = true;

    const label = document.createElement('label');
    label.className =
      'funnel-consent__text ' + toneClass(form, 'text-mc-charcoal/80', 'text-white/80');
    label.htmlFor = id;
    label.dataset.i18n = 'funnel.consent';
    label.dataset.i18nHtml = '';
    label.innerHTML = t('consentHtml');

    const hiddenDate = document.createElement('input');
    hiddenDate.type = 'hidden';
    hiddenDate.name = 'consent_date';
    hiddenDate.value = '';

    wrap.append(checkbox, label, hiddenDate);

    const hiddenPolicy = document.createElement('input');
    hiddenPolicy.type = 'hidden';
    hiddenPolicy.name = 'consent_politique';
    hiddenPolicy.value = PRIVACY_URL;
    wrap.appendChild(hiddenPolicy);

    return wrap;
  }

  function updateUi(state) {
    const { form, steps, index, progress, nav, total } = state;
    const pct = ((index + 1) / total) * 100;

    progress.label.textContent = t('stepOf')(index + 1, total);
    progress.fill.style.width = `${pct}%`;
    progress.wrap.setAttribute('aria-valuenow', String(index + 1));

    steps.forEach((step, i) => {
      const active = i === index;
      step.hidden = !active;
      setRequiredForStep(step, active);
    });

    nav.backBtn.hidden = index === 0;
    nav.nextBtn.hidden = index === total - 1;

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.hidden = index !== total - 1;
      submitBtn.style.display = index === total - 1 ? '' : 'none';
    }

    const legacyPrivacy = form.querySelector('[data-funnel-hide-privacy]');
    if (legacyPrivacy) {
      legacyPrivacy.hidden = index === total - 1;
    }
  }

  function initForm(form) {
    const steps = [...form.querySelectorAll(':scope > [data-funnel-step]')];
    if (steps.length < 2) return;

    if (isDarkForm(form)) {
      form.classList.add('funnel-form--dark');
    }

    const total = steps.length;
    const progress = buildProgress(form, total);
    form.insertBefore(progress.wrap, steps[0]);

    const lastStep = steps[total - 1];
    if (!lastStep.querySelector('[name="consent_loi25"]')) {
      const submitWrap = lastStep.querySelector('[data-funnel-submit]') || lastStep;
      const consent = buildConsent(form);
      submitWrap.insertBefore(consent, submitWrap.firstChild);
    }

    const nav = buildNav(form);
    form.appendChild(nav.nav);

    let index = 0;
    const state = { form, steps, index, progress, nav, total };

    updateUi(state);

    nav.nextBtn.addEventListener('click', () => {
      const step = steps[index];
      if (!validateStep(step)) return;
      if (index < total - 1) {
        index += 1;
        state.index = index;
        updateUi(state);
        progress.wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    nav.backBtn.addEventListener('click', () => {
      if (index > 0) {
        index -= 1;
        state.index = index;
        updateUi(state);
        progress.wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    form.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' || event.target.tagName === 'TEXTAREA') return;
      if (index >= total - 1) return;
      event.preventDefault();
      nav.nextBtn.click();
    });

    form.addEventListener('funnel:lang', () => {
      nav.backBtn.textContent = t('back');
      nav.nextBtn.textContent = t('next');
      progress.label.textContent = t('stepOf')(index + 1, total);
      const consentLabel = form.querySelector('.funnel-consent__text[data-i18n="funnel.consent"]');
      if (consentLabel) consentLabel.innerHTML = t('consentHtml');
    });
  }

  function initAll() {
    document.querySelectorAll('form[data-funnel]').forEach(initForm);
  }

  global.FunnelForms = {
    refreshLang() {
      document.querySelectorAll('form[data-funnel]').forEach((form) => {
        form.dispatchEvent(new CustomEvent('funnel:lang'));
      });
    },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})(window);
