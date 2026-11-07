(function () {
  'use strict';
  var LANGS = ['az', 'ru'];
  var TITLES = {
    az: 'QR menyu və sayt restoranlar üçün — Bakı',
    ru: 'QR-меню и сайт для ресторанов — Баку'
  };

  function pick() {
    var p = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(p) > -1) return p;
    try { var s = localStorage.getItem('site-lang'); if (LANGS.indexOf(s) > -1) return s; } catch (e) {}
    return (navigator.language || '').slice(0, 2) === 'ru' ? 'ru' : 'az';
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.title = TITLES[lang];
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === lang));
    });
    var frame = document.querySelector('.phone iframe');
    if (frame) frame.src = 'demo/?lang=' + lang;
    var demoLink = document.querySelector('a[href^="demo/"]');
    if (demoLink) demoLink.href = 'demo/?lang=' + lang;
  }

  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      var l = b.dataset.setLang;
      try { localStorage.setItem('site-lang', l); } catch (e) {}
      apply(l);
    });
  });

  apply(pick());
})();
