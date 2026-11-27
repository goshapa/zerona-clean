const names = [...document.querySelectorAll('summary strong')];
const select = document.querySelector('#service');
const language = document.querySelector('.language');
const translations = {
  'nav a': ['Xizmatlar', 'Qanday ishlaymiz', 'Aloqa'],
  '.eyebrow': ['PROFESSIONAL TOZALASH · TOSHKENT', 'XIZMATLAR', 'QANDAY ISHLAYMIZ', 'TOSHKENT'],
  'h1': ['Har bir detalda<br><em>tozalik.</em>'],
  '.intro': ['Uylar va tijorat binolarini tozalaymiz. Interyerga ehtiyotkorlik bilan yondashib, har bir detalga e’tibor beramiz.'],
  '.hero-actions .button': ['Narxni hisoblash <span>↗</span>'],
  '.text-link': ['Barcha xizmatlar <span>↓</span>'],
  'figcaption > span:last-child': ['Uy va biznes<br>uchun tozalash'],
  '.strip p': ['Uy va xonadonlar', 'Ofis va binolar', 'Mebel kimyoviy tozalovi', 'Ta’mirdan keyingi tozalash'],
  'h2': ['Sizga mos<br><em>tozalash xizmati.</em>', 'So‘rovdan <em>tozalashgacha.</em>', 'Tozalashni<br><em>muhokama qilamizmi?</em>'],
  '.section-head > p': ['Xizmatni tanlang, ish hajmi va narxini aniqlaymiz.'],
  'summary strong': ['Umumiy tozalash', 'Ta’mirdan keyingi tozalash', 'Biznes uchun tozalash', 'Mebel va gilamlarni tozalash', 'Fasadlarni yuvish'],
  'details p': ['Oshxona, sanuzel va xonalarni chuqur tozalaymiz. Yuzalar va yetish qiyin bo‘lgan joylarga e’tibor beramiz.', 'Qurilish changini tozalab, xonani ko‘chib kirish yoki ochilishga tayyorlaymiz.', 'Ofis va tijorat binolarini tozalaymiz. Hududlar, ish hajmi va qulay vaqtni kelishamiz.', 'Divan, kreslo, matras va gilamlarni materialiga mos usulda chuqur tozalaymiz.', 'Fasadlarni professional uskunalar bilan yuvamiz. Sirt va obyektga kirish imkoniyatini baholaymiz.'],
  'details a': Array(5).fill('Xizmatni tanlash ↗'),
  '.steps h3': ['Obyekt haqida yozing', 'Tafsilotlarni kelishamiz', 'Tozalash uchun kelamiz'],
  '.steps p': ['Xizmat, taxminiy maydon va istaklaringizni yozing.', 'Ish hajmi, narx va qulay vaqtni aniqlaymiz.', 'Jamoa uskunalar bilan kelib, kelishilgan ishlarni bajaradi.'],
  'form label': ['Xizmat', 'Maydon, m² <span>(ma’lum bo‘lsa)</span>', 'Istaklaringiz <span>(ixtiyoriy)</span>'],
  'form .button': ['Telegramda davom etish <span>↗</span>'],
  '.form-note': ['Tayyor so‘rov matni bilan chat ochiladi. Narxni bilish uchun xabarni yuboring.'],
  'footer p': ['© Zerona Clean · Toshkent'],
  'footer a:last-child': ['Yuqoriga ↑']
};
const localized = Object.entries(translations).flatMap(([selector, values]) =>
  [...document.querySelectorAll(selector)].map((element, index) => ({
    element,
    ru: element.innerHTML,
    uz: element.matches('.eyebrow') ? '<span></span> ' + values[index] : values[index]
  }))
);

function setLanguage(lang) {
  document.documentElement.lang = lang;
  const uz = lang === 'uz';
  for (const item of localized) item.element.innerHTML = item[lang];
  language.textContent = uz ? 'RU' : 'UZ';
  language.setAttribute('aria-label', uz ? 'Русский' : 'O‘zbekcha');
  document.querySelector('nav').setAttribute('aria-label', uz ? 'Asosiy menyu' : 'Основное меню');
  document.title = uz ? 'Zerona Clean — Toshkentda tozalash xizmati' : 'Zerona Clean — клининг в Ташкенте';
  document.querySelector('.hero-visual img').alt = uz ? 'Yorug‘ mehmonxona va yumshoq mebel' : 'Светлая гостиная с мягкой мебелью';
  document.querySelector('.service-image img').alt = uz ? 'Zamonaviy yorug‘ interyer' : 'Современный интерьер со светлыми поверхностями';
  const selected = select.value;
  select.replaceChildren(new Option(uz ? 'Xizmatni tanlang' : 'Выберите услугу', ''));
  names.forEach((name, index) => select.add(new Option(name.textContent, index)));
  select.value = selected;
  document.querySelector('#area').placeholder = uz ? 'Masalan, 80' : 'Например, 80';
  document.querySelector('#notes').placeholder = uz ? 'Tuman, sana yoki tafsilotlar' : 'Район, удобная дата или детали';
}
setLanguage('ru');
language.addEventListener('click', () => setLanguage(document.documentElement.lang === 'ru' ? 'uz' : 'ru'));
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => { select.value = link.dataset.service; });
});
document.querySelector('#quote').addEventListener('submit', event => {
  event.preventDefault();
  const uz = document.documentElement.lang === 'uz';
  const area = document.querySelector('#area').value;
  const notes = document.querySelector('#notes').value.trim();
  const message = [
    uz ? 'Assalomu alaykum! Tozalash narxini bilmoqchiman.' : 'Здравствуйте! Хочу рассчитать стоимость уборки.',
    (uz ? 'Xizmat: ' : 'Услуга: ') + select.selectedOptions[0].textContent,
    area && (uz ? 'Maydon: ' : 'Площадь: ') + area + ' м²',
    notes && (uz ? 'Tafsilotlar: ' : 'Детали: ') + notes
  ].filter(Boolean).join('\n');
  window.open('https://t.me/zerona_clean1?text=' + encodeURIComponent(message), '_blank', 'noopener');
});
