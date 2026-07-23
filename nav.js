/**
 * MC Équipe — mobile navigation
 * Injects a hamburger + full-screen panel from existing .nav-links.
 */
(function () {
  function findNavbar() {
    return (
      document.getElementById('navbar') ||
      document.querySelector('nav.fixed, nav.sticky, body > nav')
    );
  }

  function findDesktopLinks(navbar) {
    var desktopLinks = navbar.querySelector('.nav-links');
    if (desktopLinks) return desktopLinks;
    var candidates = navbar.querySelectorAll('div.hidden');
    for (var i = 0; i < candidates.length; i++) {
      if (candidates[i].querySelector('a[href]')) return candidates[i];
    }
    return null;
  }

  function findControls(navbar) {
    var children = navbar.children;
    for (var i = 0; i < children.length; i++) {
      var el = children[i];
      if (el.classList && el.classList.contains('flex') && el.querySelector('[data-lang-set], .lang-toggle')) {
        return el;
      }
    }
    return navbar.querySelector('.flex.items-center');
  }

  function findContact(controls) {
    return (
      controls.querySelector('.nav-btn') ||
      controls.querySelector('a[href*="contact"], a[href*="#contact"]')
    );
  }

  function init() {
    var navbar = findNavbar();
    if (!navbar || navbar.dataset.mobileNavInit) return;
    navbar.dataset.mobileNavInit = '1';
    if (!navbar.id) navbar.id = 'navbar';

    var desktopLinks = findDesktopLinks(navbar);
    var controls = findControls(navbar);
    if (!controls) return;

    // Ensure desktop links use lg breakpoint consistently
    if (desktopLinks) {
      desktopLinks.classList.remove('md:flex');
      desktopLinks.classList.add('hidden', 'lg:flex');
      if (!desktopLinks.classList.contains('nav-links')) {
        desktopLinks.classList.add('nav-links');
      }
    }

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-nav-toggle hover-trigger';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mobile-nav-panel');
    toggle.setAttribute(
      'aria-label',
      document.documentElement.dataset.lang === 'en' ? 'Open menu' : 'Ouvrir le menu'
    );
    toggle.innerHTML = '<span></span><span></span><span></span>';
    controls.appendChild(toggle);

    var panel = document.createElement('div');
    panel.id = 'mobile-nav-panel';
    panel.className = 'mobile-nav-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Menu');
    panel.hidden = true;

    var panelNav = document.createElement('nav');
    panelNav.setAttribute('aria-label', 'Navigation mobile');

    var defaultLinks = [
      { href: 'index.html#services', fr: 'Services', en: 'Services', key: 'nav.services' },
      { href: 'index.html#equipe', fr: "L'Équipe", en: 'The Team', key: 'nav.team' },
      { href: 'international.html', fr: 'International', en: 'International', key: 'nav.international' },
      { href: 'blogue.html', fr: 'Blogue', en: 'Blog', key: 'nav.blogue' },
      { href: 'rejoindre-exp.html', fr: 'Rejoindre', en: 'Join us', key: 'nav.rejoindre' },
      {
        href: 'https://mathieumichaud.expquebec.com/fr/proprietes',
        fr: 'Propriétés',
        en: 'Listings',
        key: 'nav.listings',
        listings: true,
      },
    ];

    var prefix = '';
    if (window.location.pathname.indexOf('/articles/') !== -1) prefix = '../';

    function addLink(href, label, key, listings) {
      var a = document.createElement('a');
      a.href = listings ? href : prefix + href.replace(/^\.\.\//, '');
      if (listings) {
        a.setAttribute('data-i18n-href', 'listings');
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      if (key) a.setAttribute('data-i18n', key);
      a.textContent = label;
      panelNav.appendChild(a);
    }

    if (desktopLinks && desktopLinks.querySelectorAll('a').length) {
      Array.prototype.forEach.call(desktopLinks.querySelectorAll('a'), function (link) {
        var a = link.cloneNode(true);
        a.removeAttribute('class');
        panelNav.appendChild(a);
      });
    } else {
      var isEn = document.documentElement.dataset.lang === 'en';
      defaultLinks.forEach(function (item) {
        addLink(item.href, isEn ? item.en : item.fr, item.key, item.listings);
      });
    }

    panel.appendChild(panelNav);

    var contactBtn = findContact(controls);
    if (contactBtn) {
      contactBtn.classList.add('nav-btn');
      var cta = contactBtn.cloneNode(true);
      cta.className = 'mobile-nav-cta hover-trigger';
      panel.appendChild(cta);
    } else {
      var fallbackCta = document.createElement('a');
      fallbackCta.href = prefix + 'index.html#contact';
      fallbackCta.className = 'mobile-nav-cta hover-trigger';
      fallbackCta.setAttribute('data-i18n', 'nav.contact');
      fallbackCta.textContent =
        document.documentElement.dataset.lang === 'en' ? 'Contact' : 'Contact';
      panel.appendChild(fallbackCta);
    }

    document.body.appendChild(panel);

    function setOpen(open) {
      toggle.classList.toggle('is-open', open);
      panel.classList.toggle('is-open', open);
      navbar.classList.toggle('mobile-nav-active', open);
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      var isEn = document.documentElement.dataset.lang === 'en';
      toggle.setAttribute(
        'aria-label',
        open ? (isEn ? 'Close menu' : 'Fermer le menu') : isEn ? 'Open menu' : 'Ouvrir le menu'
      );
      document.body.classList.toggle('mobile-nav-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(!panel.classList.contains('is-open'));
    });

    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
    });

    document.querySelectorAll('[data-lang-set]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = panel.classList.contains('is-open');
        setTimeout(function () {
          var en = document.documentElement.dataset.lang === 'en';
          toggle.setAttribute(
            'aria-label',
            open ? (en ? 'Close menu' : 'Fermer le menu') : en ? 'Open menu' : 'Ouvrir le menu'
          );
        }, 50);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
