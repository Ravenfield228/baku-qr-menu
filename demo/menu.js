(function () {
  'use strict';
  var M = window.MENU;
  var R = M.restaurant;
  var LANGS = ['az', 'ru', 'en'];

  var UI = {
    az: { search: 'Menyuda axtar…', notFound: 'Heç nə tapılmadı', call: 'Zəng et', wifi: 'Wi-Fi', copied: 'Şifrə kopyalandı', copyFail: 'Wi-Fi şifrəsi: ', close: 'Bağla',
          veg: 'Vegetarian', hit: 'Populyar', new: 'Yeni', spicy: 'Acılı', g: 'q', ml: 'ml', pcs: 'əd.',
          demo: 'Bu, uydurma restoranın demo menyusudur.', photos: 'Şəkillər:', order: 'Belə menyu sifariş et →', menu: 'Menyu', skip: 'Menyuya keç' },
    ru: { search: 'Поиск по меню…', notFound: 'Ничего не найдено', call: 'Позвонить', wifi: 'Wi-Fi', copied: 'Пароль скопирован', copyFail: 'Пароль Wi-Fi: ', close: 'Закрыть',
          veg: 'Вегетарианское', hit: 'Хит', new: 'Новинка', spicy: 'Острое', g: 'г', ml: 'мл', pcs: 'шт.',
          demo: 'Это демо-меню вымышленного ресторана.', photos: 'Фото:', order: 'Заказать такое меню →', menu: 'Меню', skip: 'Перейти к меню' },
    en: { search: 'Search the menu…', notFound: 'Nothing found', call: 'Call', wifi: 'Wi-Fi', copied: 'Password copied', copyFail: 'Wi-Fi password: ', close: 'Close',
          veg: 'Vegetarian', hit: 'Popular', new: 'New', spicy: 'Spicy', g: 'g', ml: 'ml', pcs: 'pcs',
          demo: 'This is a demo menu of a fictional restaurant.', photos: 'Photos:', order: 'Get a menu like this →', menu: 'Menu', skip: 'Skip to menu' }
  };

  var $ = function (id) { return document.getElementById(id); };
  var lang = pickLang();
  var observer = null;

  function pickLang() {
    var p = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(p) > -1) return p;
    try { var s = localStorage.getItem('menu-lang'); if (LANGS.indexOf(s) > -1) return s; } catch (e) {}
    var n = (navigator.language || '').slice(0, 2);
    return LANGS.indexOf(n) > -1 ? n : 'az';
  }

  function t(key) { return UI[lang][key]; }
  function tr(obj) { return obj ? (obj[lang] || obj.az || '') : ''; }
  function price(p) { return (p % 1 ? p.toFixed(2) : p) + ' ₼'; }
  function portion(p) { return p ? p.v + ' ' + t(p.u) : ''; }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function tagsEl(tags) {
    var wrap = el('span', 'tags');
    (tags || []).forEach(function (tg) {
      wrap.appendChild(el('span', 'tag' + (tg === 'veg' ? ' tag--veg' : ''), t(tg)));
    });
    return wrap;
  }

  function renderStatic() {
    document.documentElement.lang = lang;
    document.title = R.name + ' — ' + t('menu') + (R.demo ? ' (demo)' : '');
    $('rName').textContent = R.name;
    $('rTagline').textContent = tr(R.tagline);
    $('rHours').textContent = R.hours;
    $('rAddress').textContent = tr(R.address);
    $('rMap').href = R.mapUrl;
    $('rPhone').href = 'tel:' + R.phone.replace(/[^+\d]/g, '');
    $('rNote').textContent = tr(R.serviceNote);
    $('demoBadge').hidden = !R.demo;
    $('demoNote').hidden = !R.demo;
    $('demoNote').textContent = t('demo');
    if (R.instagram) { $('rInsta').hidden = false; $('rInsta').href = 'https://instagram.com/' + R.instagram; }
    if (R.wifi) { $('rWifi').hidden = false; $('rWifiText').textContent = 'Wi-Fi: ' + R.wifi.name; }
    $('q').placeholder = t('search');
    document.querySelector('.skip').textContent = t('skip');
    document.querySelectorAll('[data-i18n]').forEach(function (n) { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (n) { n.setAttribute('aria-label', t(n.dataset.i18nAria)); });
    document.querySelectorAll('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
  }

  function renderMenu() {
    var q = $('q').value.trim().toLocaleLowerCase();
    var main = $('menu'), nav = $('cats');
    main.textContent = ''; nav.textContent = '';
    var shown = 0;

    M.categories.forEach(function (c) {
      var items = M.items.filter(function (it) {
        if (it.cat !== c.id) return false;
        if (!q) return true;
        return LANGS.some(function (l) {
          return (it.name[l] + ' ' + it.desc[l]).toLocaleLowerCase().indexOf(q) > -1;
        });
      });
      if (!items.length) return;
      shown += items.length;

      var sec = el('section', 'section'); sec.id = 'c-' + c.id;
      sec.setAttribute('aria-labelledby', 'h-' + c.id);
      var h = el('h2', null, tr(c.name)); h.id = 'h-' + c.id;
      sec.appendChild(h);
      var ul = el('ul', 'items');
      items.forEach(function (it) {
        var li = el('li');
        var b = el('button', 'item'); b.type = 'button';
        var body = el('span', 'item__body');
        if (it.tags && it.tags.length) body.appendChild(tagsEl(it.tags));
        body.appendChild(el('span', 'item__name', tr(it.name)));
        body.appendChild(el('span', 'item__desc', tr(it.desc)));
        var foot = el('span', 'item__foot');
        foot.appendChild(el('span', 'price', price(it.price)));
        if (it.portion) foot.appendChild(el('span', 'portion', portion(it.portion)));
        body.appendChild(foot);
        b.appendChild(body);
        if (it.img) {
          var img = el('img', 'item__img');
          img.src = it.img; img.alt = tr(it.name); img.loading = 'lazy'; img.decoding = 'async';
          img.width = 96; img.height = 96;
          b.appendChild(img);
        }
        b.addEventListener('click', function () { openDish(it); });
        li.appendChild(b); ul.appendChild(li);
      });
      sec.appendChild(ul); main.appendChild(sec);

      var a = el('a', null, tr(c.name)); a.href = '#c-' + c.id; a.dataset.cat = c.id;
      nav.appendChild(a);
    });

    $('empty').hidden = shown > 0;
    $('empty').textContent = t('notFound');
    spy();
  }

  function spy() {
    if (observer) observer.disconnect();
    var links = {};
    document.querySelectorAll('#cats a').forEach(function (a) { links[a.dataset.cat] = a; });
    var first = document.querySelector('#cats a');
    if (first) first.setAttribute('aria-current', 'true');
    if (!('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id.slice(2);
        Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
        var a = links[id];
        if (a) {
          a.setAttribute('aria-current', 'true');
          var nav = $('cats');
          nav.scrollTo({ left: a.offsetLeft - nav.clientWidth / 2 + a.clientWidth / 2, behavior: 'smooth' });
        }
      });
    }, { rootMargin: '-120px 0px -65% 0px' });
    document.querySelectorAll('.section').forEach(function (s) { observer.observe(s); });
  }

  function openDish(it) {
    var d = $('dish'), img = $('dishImg');
    img.hidden = !it.img;
    if (it.img) { img.src = it.img; img.alt = tr(it.name); }
    $('dishName').textContent = tr(it.name);
    $('dishDesc').textContent = tr(it.desc);
    $('dishPortion').textContent = portion(it.portion);
    $('dishPrice').textContent = price(it.price);
    var tags = $('dishTags'); tags.textContent = '';
    tags.appendChild(tagsEl(it.tags));
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
  }

  function toast(msg) {
    var n = $('toast');
    n.textContent = msg; n.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(function () { n.classList.remove('show'); }, 2600);
  }

  function copyWifi() {
    var pass = R.wifi.pass;
    var fail = function () { toast(t('copyFail') + pass); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(pass).then(function () { toast(t('copied') + ' — ' + pass); }, fail);
    } else { fail(); }
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem('menu-lang', l); } catch (e) {}
    var u = new URL(location.href); u.searchParams.set('lang', l);
    history.replaceState(null, '', u);
    renderStatic(); renderMenu();
  }

  // Events
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });
  $('q').addEventListener('input', renderMenu);
  $('rWifi').addEventListener('click', copyWifi);
  $('dish').addEventListener('click', function (e) { if (e.target === this) this.close(); });

  renderStatic();
  renderMenu();
})();
