(function () {
  function showToast(message) {
    var toast = document.getElementById('article-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'article-toast';
      toast.className = 'article-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2400);
  }

  function toastMessage() {
    return document.documentElement.dataset.lang === 'en'
      ? 'Link copied to clipboard'
      : 'Lien copié dans le presse-papiers';
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy-link]');
    if (!btn) return;
    e.preventDefault();
    var url = btn.getAttribute('data-copy-link') || window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () {
        showToast(toastMessage());
      });
      return;
    }
    var input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(toastMessage());
  });

  function injectArticleSchema() {
    if (!document.querySelector('.article-prose')) return;
    if (document.querySelector('script[data-mc-article]')) return;
    var titleEl = document.querySelector('h1');
    var descEl = document.querySelector('meta[name="description"]');
    var imageEl = document.querySelector('meta[property="og:image"]');
    var urlEl = document.querySelector('link[rel="canonical"], meta[property="og:url"]');
    var headline = titleEl ? titleEl.textContent.replace(/\s+/g, ' ').trim() : document.title;
    var url = urlEl
      ? urlEl.getAttribute('href') || urlEl.getAttribute('content')
      : window.location.href;
    var image = imageEl ? imageEl.getAttribute('content') : 'https://mcequipe.ca/images/equipe-bureau.webp';
    var desc = descEl ? descEl.getAttribute('content') : '';
    var data = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: headline,
      description: desc,
      image: image,
      url: url,
      inLanguage: document.documentElement.lang || 'fr-CA',
      author: {
        '@type': 'Organization',
        name: 'MC Équipe',
        url: 'https://mcequipe.ca/'
      },
      publisher: {
        '@type': 'Organization',
        name: 'MC Équipe',
        url: 'https://mcequipe.ca/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://mcequipe.ca/images/mc-equipe-mark.png'
        }
      }
    };
    var el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-mc-article', '1');
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectArticleSchema();
    var navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 50) navbar.classList.add('nav-scrolled');
        else navbar.classList.remove('nav-scrolled');
      });
    }

    var cursor = document.getElementById('cursor');
    if (cursor && window.matchMedia('(min-width: 1024px)').matches) {
      document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
      document.querySelectorAll('.hover-trigger, a, button').forEach(function (el) {
        el.addEventListener('mouseenter', function () {
          cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', function () {
          cursor.classList.remove('active');
        });
      });
    }

    var reveals = document.querySelectorAll('.reveal-up');
    if (reveals.length && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      reveals.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  });
})();
