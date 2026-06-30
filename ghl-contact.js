/**
 * Contact data for GoHighLevel calendar prefill (URL params).
 */
(function (global) {
  const STORAGE_KEY = 'mc-ghl-contact';

  function readField(form, names) {
    for (const name of names) {
      const el = form.querySelector('[name="' + name + '"]');
      if (el && el.value && String(el.value).trim()) {
        return String(el.value).trim();
      }
    }
    return '';
  }

  function splitName(fullName) {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) {
      return { first_name: '', last_name: '' };
    }
    if (parts.length === 1) {
      return { first_name: parts[0], last_name: parts[0] };
    }
    return {
      first_name: parts[0],
      last_name: parts.slice(1).join(' '),
    };
  }

  function normalizePhone(value) {
    const trimmed = String(value || '').trim();
    if (!trimmed) return '';
    const digits = trimmed.replace(/\D/g, '');
    if (!digits) return trimmed;
    if (trimmed.startsWith('+')) return '+' + digits;
    if (digits.length === 10) return '+1' + digits;
    if (digits.length === 11 && digits.startsWith('1')) return '+' + digits;
    return digits;
  }

  function fromForm(form) {
    const hasPrenomField = Boolean(form.querySelector('[name="prenom"]'));
    const prenom = readField(form, ['prenom', 'first_name', 'firstname']);
    const nomRaw = readField(form, ['nom', 'last_name', 'lastname']);
    const fullName = readField(form, ['name', 'full_name', 'fullname']);
    const email = readField(form, ['email', 'courriel']);
    const phone = normalizePhone(readField(form, ['telephone', 'phone', 'tel']));

    let first_name = prenom;
    let last_name = nomRaw;

    if (!hasPrenomField && nomRaw && !prenom) {
      const split = splitName(nomRaw);
      first_name = split.first_name;
      last_name = split.last_name;
    } else if (fullName && !prenom && !nomRaw) {
      const split = splitName(fullName);
      first_name = split.first_name;
      last_name = split.last_name;
    } else if (first_name && !last_name) {
      last_name = first_name;
    } else if (!first_name && last_name) {
      first_name = last_name;
    }

    const contact = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
    };

    return hasMinimum(contact) ? contact : null;
  }

  function fromSearchParams(params) {
    const first =
      params.get('first_name') ||
      params.get('firstname') ||
      params.get('firstName') ||
      params.get('prenom') ||
      '';
    const last =
      params.get('last_name') ||
      params.get('lastname') ||
      params.get('lastName') ||
      params.get('nom') ||
      '';
    const full = params.get('name') || '';
    const split = full ? splitName(full) : { first_name: '', last_name: '' };

    const contact = {
      first_name: first || split.first_name,
      last_name: last || split.last_name,
      email: params.get('email') || params.get('courriel') || '',
      phone: normalizePhone(
        params.get('phone') || params.get('telephone') || params.get('tel') || ''
      ),
    };

    return hasMinimum(contact) ? contact : null;
  }

  function hasMinimum(contact) {
    return Boolean(contact && contact.email && (contact.first_name || contact.last_name));
  }

  function save(contact) {
    if (!hasMinimum(contact)) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(contact));
    } catch {
      /* ignore */
    }
  }

  function load() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const contact = JSON.parse(raw);
      return hasMinimum(contact) ? contact : null;
    } catch {
      return null;
    }
  }

  function clear() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  function getContact() {
    const fromUrl = fromSearchParams(new URLSearchParams(window.location.search));
    if (fromUrl) {
      save(fromUrl);
      return fromUrl;
    }
    return load();
  }

  function appendContactParams(params, contact) {
    if (!contact) return;
    if (contact.first_name) params.set('first_name', contact.first_name);
    if (contact.last_name) params.set('last_name', contact.last_name);
    if (contact.email) params.set('email', contact.email);
    if (contact.phone) params.set('phone', contact.phone);
  }

  function toEmbedQuery(lang) {
    const params = new URLSearchParams();
    params.set('lang', lang === 'en' ? 'en' : 'fr');
    appendContactParams(params, getContact());
    const qs = params.toString();
    return qs ? '?' + qs : '';
  }

  function toQuery(contact) {
    const params = new URLSearchParams();
    appendContactParams(params, contact);
    const qs = params.toString();
    return qs ? '?' + qs : '';
  }

  function saveFromForm(form) {
    const contact = fromForm(form);
    if (contact) save(contact);
    return contact;
  }

  global.MCGhlContact = {
    save,
    load,
    clear,
    getContact,
    toQuery,
    toEmbedQuery,
    saveFromForm,
    fromForm,
  };
})(window);
