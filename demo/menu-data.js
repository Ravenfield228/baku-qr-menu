/*
  Данные меню. Чтобы адаптировать под клиента, меняйте только этот файл.
  Всё, что помечено [ЗАМЕНИТЬ], — заглушки вымышленного ресторана.
  Цены в манатах (₼). portion: { v: число, u: 'g' | 'ml' | 'pcs' }.
  tags: 'veg' — вегетарианское, 'hit' — популярное, 'new' — новинка, 'spicy' — острое.
  img: путь к фото (необязательно). Без фото карточка становится компактной.
*/
window.MENU = {
  restaurant: {
    name: 'Nar Bağı',                                   // [ЗАМЕНИТЬ] название
    demo: true,                                         // false — убрать плашку DEMO
    cover: 'img/cover.webp',                            // [ЗАМЕНИТЬ] обложка
    tagline: {                                          // [ЗАМЕНИТЬ]
      az: 'Azərbaycan mətbəxi və manqal',
      ru: 'Азербайджанская кухня и мангал',
      en: 'Azerbaijani cuisine & grill'
    },
    hours: '10:00 – 23:00',                             // [ЗАМЕНИТЬ]
    address: {                                          // [ЗАМЕНИТЬ]
      az: 'Nümunə küç. 1, Bakı',
      ru: 'ул. Примерная, 1, Баку',
      en: '1 Example St, Baku'
    },
    mapUrl: 'https://maps.google.com/?q=Baku',          // [ЗАМЕНИТЬ] ссылка на точку на карте
    phone: '+994 00 000 00 00',                         // [ЗАМЕНИТЬ]
    instagram: '',                                      // [ЗАМЕНИТЬ] например 'narbagi.baku'
    wifi: { name: 'NarBagi_Guest', pass: 'demo2026' },  // [ЗАМЕНИТЬ] или null, чтобы скрыть
    serviceNote: {                                      // [ЗАМЕНИТЬ]
      az: 'Qiymətlər manatla göstərilib. Xidmət haqqı 10%.',
      ru: 'Цены указаны в манатах. Обслуживание 10%.',
      en: 'Prices are in AZN. 10% service charge.'
    }
  },

  categories: [
    { id: 'salads',   name: { az: 'Salatlar',       ru: 'Салаты',          en: 'Salads' } },
    { id: 'soups',    name: { az: 'Şorbalar',       ru: 'Супы',            en: 'Soups' } },
    { id: 'grill',    name: { az: 'Manqal',         ru: 'Мангал',          en: 'Grill' } },
    { id: 'mains',    name: { az: 'Əsas yeməklər',  ru: 'Основные блюда',  en: 'Main dishes' } },
    { id: 'desserts', name: { az: 'Desertlər',      ru: 'Десерты',         en: 'Desserts' } },
    { id: 'drinks',   name: { az: 'İçkilər',        ru: 'Напитки',         en: 'Drinks' } }
  ],

  items: [
    // Салаты
    { cat: 'salads', price: 6, portion: { v: 250, u: 'g' }, tags: ['veg'], img: 'img/coban.webp',
      name: { az: 'Çoban salatı', ru: 'Салат «Чобан»', en: "Shepherd's salad" },
      desc: { az: 'Pomidor, xiyar, soğan, göyərti və zeytun yağı',
              ru: 'Помидоры, огурцы, лук, зелень и оливковое масло',
              en: 'Tomato, cucumber, onion, herbs and olive oil' } },
    { cat: 'salads', price: 12, portion: { v: 300, u: 'g' }, tags: ['veg', 'new'], img: 'img/avocado.webp',
      name: { az: 'Avokado salatı', ru: 'Салат с авокадо', en: 'Avocado bowl' },
      desc: { az: 'Avokado, noxud, təzə tərəvəz və limon sousu',
              ru: 'Авокадо, нут, свежие овощи и лимонный соус',
              en: 'Avocado, chickpeas, fresh vegetables and lemon dressing' } },

    // Супы
    { cat: 'soups', price: 5, portion: { v: 300, u: 'ml' }, tags: ['veg'], img: 'img/mercimek.webp',
      name: { az: 'Mərci şorbası', ru: 'Чечевичный суп', en: 'Lentil soup' },
      desc: { az: 'Qırmızı mərci, kərə yağı və limon dilimi ilə',
              ru: 'Красная чечевица, сливочное масло и долька лимона',
              en: 'Red lentils with butter and a slice of lemon' } },
    { cat: 'soups', price: 4, portion: { v: 300, u: 'ml' }, tags: ['veg'],
      name: { az: 'Dovğa', ru: 'Довга', en: 'Dovga' },
      desc: { az: 'Qatıq, düyü və təzə göyərti ilə soyuq şorba',
              ru: 'Холодный суп из катыка с рисом и свежей зеленью',
              en: 'Chilled yogurt soup with rice and fresh herbs' } },
    { cat: 'soups', price: 12, portion: { v: 450, u: 'g' }, tags: ['hit'], img: 'img/piti.webp',
      name: { az: 'Piti', ru: 'Пити', en: 'Piti' },
      desc: { az: 'Quzu əti, noxud və şabalıd, saxsı qabda',
              ru: 'Баранина, нут и каштаны в глиняном горшочке',
              en: 'Lamb, chickpeas and chestnuts slow-cooked in a clay pot' } },

    // Мангал
    { cat: 'grill', price: 9, portion: { v: 250, u: 'g' }, tags: ['hit'], img: 'img/lule.webp',
      name: { az: 'Lülə kabab', ru: 'Люля-кебаб', en: 'Lula kebab' },
      desc: { az: 'Quzu ətindən, lavaş, soğan və sumaqla',
              ru: 'Из баранины, с лавашом, луком и сумахом',
              en: 'Minced lamb with lavash, onion and sumac' } },
    { cat: 'grill', price: 14, portion: { v: 300, u: 'g' }, tags: [], img: 'img/tike.webp',
      name: { az: 'Tikə kabab (quzu)', ru: 'Тике-кебаб из баранины', en: 'Lamb tike kebab' },
      desc: { az: 'Manqalda quzu tikələri, pomidor və bibər',
              ru: 'Кусочки баранины на мангале, помидоры и перец',
              en: 'Chargrilled lamb chunks with tomato and pepper' } },
    { cat: 'grill', price: 8, portion: { v: 300, u: 'g' }, tags: ['spicy'],
      name: { az: 'Toyuq kababı', ru: 'Куриный кебаб', en: 'Chicken kebab' },
      desc: { az: 'Marinadlı toyuq budu, acılı sousla',
              ru: 'Маринованное куриное бедро с острым соусом',
              en: 'Marinated chicken thigh with a spicy sauce' } },

    // Основные блюда
    { cat: 'mains', price: 13, portion: { v: 400, u: 'g' }, tags: ['hit'], img: 'img/plov.webp',
      name: { az: 'Ət plovu', ru: 'Плов с бараниной', en: 'Lamb pilaf' },
      desc: { az: 'Zəfəranlı düyü, quzu əti, şabalıd, qaysı və kişmiş',
              ru: 'Рис с шафраном, баранина, каштаны, курага и изюм',
              en: 'Saffron rice with lamb, chestnuts, dried apricots and raisins' } },
    { cat: 'mains', price: 9, portion: { v: 10, u: 'pcs' }, tags: [],
      name: { az: 'Yarpaq dolması', ru: 'Долма в виноградных листьях', en: 'Vine leaf dolma' },
      desc: { az: 'Üzüm yarpağında ət və düyü, qatıqla',
              ru: 'Мясо и рис в виноградных листьях, с катыком',
              en: 'Minced meat and rice in vine leaves, served with yogurt' } },
    { cat: 'mains', price: 3, portion: { v: 2, u: 'pcs' }, tags: ['veg'],
      name: { az: 'Göyərti qutabı', ru: 'Кутабы с зеленью', en: 'Herb qutab' },
      desc: { az: 'Nazik xəmirdə təzə göyərti, sumaqla',
              ru: 'Тонкое тесто со свежей зеленью, с сумахом',
              en: 'Thin flatbread filled with fresh herbs, with sumac' } },
    { cat: 'mains', price: 28, portion: { v: 250, u: 'g' }, tags: [], img: 'img/salmon.webp',
      name: { az: 'Qızılbalıq steyki', ru: 'Стейк из лосося', en: 'Salmon steak' },
      desc: { az: 'Qril tərəvəzlər və limon ilə',
              ru: 'С овощами-гриль и лимоном',
              en: 'With grilled vegetables and lemon' } },

    // Десерты
    { cat: 'desserts', price: 6, portion: { v: 4, u: 'pcs' }, tags: ['hit'], img: 'img/paxlava.webp',
      name: { az: 'Paxlava', ru: 'Пахлава', en: 'Baklava' },
      desc: { az: 'Qoz, bal və zəfəranla',
              ru: 'С грецким орехом, мёдом и шафраном',
              en: 'Walnuts, honey and saffron' } },
    { cat: 'desserts', price: 7, portion: { v: 150, u: 'g' }, tags: [], img: 'img/tort.webp',
      name: { az: 'Şokoladlı tort', ru: 'Шоколадный торт', en: 'Chocolate cake' },
      desc: { az: 'Ev üsulu, bir dilim',
              ru: 'Домашний, один кусок',
              en: 'Homemade, one slice' } },
    { cat: 'desserts', price: 6, portion: { v: 200, u: 'g' }, tags: ['new'], img: 'img/blinchik.webp',
      name: { az: 'Blinçik', ru: 'Блинчики', en: 'Crêpes' },
      desc: { az: 'Bal və təzə meyvə ilə',
              ru: 'С мёдом и свежими фруктами',
              en: 'With honey and fresh fruit' } },

    // Напитки
    { cat: 'drinks', price: 8, portion: null, tags: ['hit'], img: 'img/cay.webp',
      name: { az: 'Çay dəsti', ru: 'Чайный набор', en: 'Tea set' },
      desc: { az: 'Armudu stəkanda qara çay, limon, mürəbbə və şirniyyat — 2 nəfərlik',
              ru: 'Чёрный чай в армуду, лимон, варенье и сладости — на двоих',
              en: 'Black tea in armudu glasses with lemon, jam and sweets — for two' } },
    { cat: 'drinks', price: 5, portion: { v: 250, u: 'ml' }, tags: [], img: 'img/kapucino.webp',
      name: { az: 'Kapuçino', ru: 'Капучино', en: 'Cappuccino' },
      desc: { az: 'Espresso və süd köpüyü',
              ru: 'Эспрессо и молочная пенка',
              en: 'Espresso with steamed milk foam' } },
    { cat: 'drinks', price: 6, portion: { v: 500, u: 'ml' }, tags: ['veg'], img: 'img/limonad.webp',
      name: { az: 'Ev limonadı', ru: 'Домашний лимонад', en: 'Homemade lemonade' },
      desc: { az: 'Limon, nanə və tərxun',
              ru: 'Лимон, мята и тархун',
              en: 'Lemon, mint and tarragon' } },
    { cat: 'drinks', price: 2, portion: { v: 300, u: 'ml' }, tags: ['veg'],
      name: { az: 'Ayran', ru: 'Айран', en: 'Ayran' },
      desc: { az: 'Təzə qatıq, su və bir az duz',
              ru: 'Свежий катык, вода и немного соли',
              en: 'Fresh yogurt drink, lightly salted' } }
  ]
};
