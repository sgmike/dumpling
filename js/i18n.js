/**
 * Internationalization (i18n) for Elza's dumpling workshop.
 * Languages: Spanish (es), English (en), Latvian (lv).
 */

export const BRAND = "Elza's dumpling workshop";

const LOCALE_KEY = 'edw-locale';

export const LOCALES = [
  { code: 'es', name: 'Español',  flag: '🇪🇸' },
  { code: 'en', name: 'English',  flag: '🇬🇧' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
];

const STRINGS = {
  es: {
    'tagline':              'Diseña, guarda y comparte',
    'home.create':          'Crear un nuevo dumpling',
    'home.empty.title':     'Aún no tienes dumplings',
    'home.empty.desc':      'Toca el botón de arriba para empezar.',
    'home.confirmDelete':   '¿Borrar a {name}?',
    'home.confirmExit':     '¿Volver al inicio? Los cambios sin guardar se perderán.',
    'design.title':         'Diseña tu dumpling',
    'btn.back':             '← Atrás',
    'btn.next':             'Siguiente →',
    'step.color':           '🎨 Color',
    'step.eyes':            '👀 Ojos',
    'step.mouth':           '👄 Boca',
    'step.blush':           '😊 Cachetes',
    'step.accessories':     '🎀 Accesorios',
    'step.box':             '📦 Cajita',
    'step.boxColor':        '🌈 Color caja',
    'step.name':            '📝 Nombre',
    'section.chooseColor':  'Elige el color de tu dumpling',
    'section.customColor':  '🌈 Color personalizado',
    'section.chooseBox':    'Elige dónde vivirá tu dumpling',
    'section.chooseBoxColor':'Elige el color de la cajita',
    'section.boxPreview':   'Vista previa de la cajita:',
    'name.label':           '📝 ¿Cómo se llama tu dumpling?',
    'name.placeholder':     'Ej. Bao, Mochi, Lulu...',
    'name.hint':            'Máximo 14 letras — quedará escrito en la cajita.',
    'name.toast.required':  'Ponle un nombre a tu dumpling ✨',
    'name.default':         'Mi Dumpling',
    'reveal.tapToOpen':     'Toca para abrir la caja',
    'reveal.share':         '📲 Compartir / Descargar',
    'reveal.save':          '💾 Guardar en mi colección',
    'reveal.createOther':   '✨ Crear otro',
    'reveal.shareText':     '¡Mira mi dumpling "{name}" hecho en {brand}! 🥟✨',
    'reveal.confirmClear':  '¿Borrar todo el dibujo?',
    'reveal.confirmNew':    'Tienes cambios sin guardar. ¿Empezar uno nuevo?',
    'toast.saved':          '¡Guardado en tu colección! 💖',
    'toast.alreadySaved':   'Ya está en tu colección 💖',
    'toast.preparing':      'Preparando imagen...',
    'toast.downloaded':     'Descargado 📥',
    'toast.exportFailed':   'No se pudo exportar 😢',
    'toast.installed':      '¡Instalado! 🎉',
    'toast.loaded':         'Dumpling cargado',
    'install.banner':       '¡Instala la app en tu teléfono!',
    'install.btn':          'Instalar',
    'lang.select':          'Elige tu idioma',
    'lang.tagline':         'Choose your language · Izvēlies valodu',
    'lang.change':          'Cambiar idioma',
    // accesorios
    'cat.Sombreros':        'Sombreros',
    'cat.Pelo':             'Pelo',
    'cat.Lentes':           'Lentes',
    'cat.Aretes':           'Aretes',
    'cat.Extras':           'Extras',
    // colores dumpling
    'color.cream':'Crema','color.pink':'Rosa','color.matcha':'Matcha','color.taro':'Taro',
    'color.choco':'Chocolate','color.yellow':'Amarillo','color.orange':'Naranja',
    'color.sky':'Cielo','color.mint':'Menta','color.lavender':'Lavanda',
    'color.peach':'Durazno','color.red':'Rojo',
    // ojos
    'eyes.sparkle':'Brillantes','eyes.dots':'Puntitos','eyes.happy':'Felices',
    'eyes.heart':'Corazón','eyes.star':'Estrellas','eyes.sleepy':'Dormido',
    'eyes.wink':'Guiño','eyes.kawaii':'Kawaii','eyes.surprised':'Sorpresa','eyes.cat':'Gatito',
    // bocas
    'mouth.smile':'Sonrisa','mouth.big-smile':'Risota','mouth.tongue':'Lengua',
    'mouth.kiss':'Besito','mouth.cat-mouth':'Gatito','mouth.o':'Sorprendido',
    'mouth.tooth':'Dientito','mouth.smirk':'Picarón','mouth.worried':'Preocupado',
    'mouth.none':'Sin boca',
    // blush
    'blush.none':'Sin','blush.pink':'Rositas','blush.red':'Rojitas',
    'blush.heart':'Corazones','blush.stripes':'Rayitas','blush.sparkle':'Brillito',
    // accesorios
    'acc.hat-bow':'Moñito','acc.hat-crown':'Corona','acc.hat-top':'Sombrero',
    'acc.hat-witch':'Bruja','acc.hat-party':'Fiesta','acc.hat-flower':'Florecita',
    'acc.hat-cap':'Gorra',
    'acc.hair-pigtails':'Coletas','acc.hair-long':'Pelo largo',
    'acc.hair-bun':'Chongo','acc.hair-curly':'Rizos',
    'acc.glasses-round':'Redondos','acc.glasses-heart':'Corazón',
    'acc.glasses-star':'Estrella','acc.glasses-sun':'Sol',
    'acc.earrings-pearl':'Perlas','acc.earrings-heart':'Corazoncitos',
    'acc.earrings-star':'Estrellitas','acc.earrings-hoop':'Arillos',
    'acc.scarf':'Bufanda','acc.mustache':'Bigote','acc.freckles':'Pecas','acc.necklace':'Collar',
    // cajitas
    'box.vaporera':'Vaporera','box.regalo':'Regalo','box.bento':'Bento',
    // colores caja
    'boxColor.bamboo':'Bambú','boxColor.red':'Rojo','boxColor.pink':'Rosa',
    'boxColor.blue':'Azul','boxColor.green':'Verde','boxColor.purple':'Morado',
    'boxColor.yellow':'Amarillo','boxColor.mint':'Menta','boxColor.black':'Negro','boxColor.white':'Blanco',
  },
  en: {
    'tagline':              'Design, save and share',
    'home.create':          'Create a new dumpling',
    'home.empty.title':     "You don't have any dumplings yet",
    'home.empty.desc':      'Tap the button above to start.',
    'home.confirmDelete':   'Delete {name}?',
    'home.confirmExit':     'Go back to home? Unsaved changes will be lost.',
    'design.title':         'Design your dumpling',
    'btn.back':             '← Back',
    'btn.next':             'Next →',
    'step.color':           '🎨 Color',
    'step.eyes':            '👀 Eyes',
    'step.mouth':           '👄 Mouth',
    'step.blush':           '😊 Cheeks',
    'step.accessories':     '🎀 Accessories',
    'step.box':             '📦 Box',
    'step.boxColor':        '🌈 Box color',
    'step.name':            '📝 Name',
    'section.chooseColor':  "Choose your dumpling's color",
    'section.customColor':  '🌈 Custom color',
    'section.chooseBox':    'Choose where your dumpling will live',
    'section.chooseBoxColor':'Choose the box color',
    'section.boxPreview':   'Box preview:',
    'name.label':           "📝 What's your dumpling's name?",
    'name.placeholder':     'e.g. Bao, Mochi, Lulu...',
    'name.hint':            'Max 14 letters — it will be written on the box.',
    'name.toast.required':  'Give your dumpling a name ✨',
    'name.default':         'My Dumpling',
    'reveal.tapToOpen':     'Tap to open the box',
    'reveal.share':         '📲 Share / Download',
    'reveal.save':          '💾 Save to my collection',
    'reveal.createOther':   '✨ Create another',
    'reveal.shareText':     'Look at my dumpling "{name}" made at {brand}! 🥟✨',
    'reveal.confirmClear':  'Clear the whole drawing?',
    'reveal.confirmNew':    'You have unsaved changes. Start a new one?',
    'toast.saved':          'Saved to your collection! 💖',
    'toast.alreadySaved':   'Already in your collection 💖',
    'toast.preparing':      'Preparing image...',
    'toast.downloaded':     'Downloaded 📥',
    'toast.exportFailed':   "Couldn't export 😢",
    'toast.installed':      'Installed! 🎉',
    'toast.loaded':         'Dumpling loaded',
    'install.banner':       'Install the app on your phone!',
    'install.btn':          'Install',
    'lang.select':          'Choose your language',
    'lang.tagline':         'Elige tu idioma · Izvēlies valodu',
    'lang.change':          'Change language',
    'cat.Sombreros':'Hats','cat.Pelo':'Hair','cat.Lentes':'Glasses',
    'cat.Aretes':'Earrings','cat.Extras':'Extras',
    'color.cream':'Cream','color.pink':'Pink','color.matcha':'Matcha','color.taro':'Taro',
    'color.choco':'Chocolate','color.yellow':'Yellow','color.orange':'Orange',
    'color.sky':'Sky','color.mint':'Mint','color.lavender':'Lavender',
    'color.peach':'Peach','color.red':'Red',
    'eyes.sparkle':'Sparkly','eyes.dots':'Dots','eyes.happy':'Happy',
    'eyes.heart':'Hearts','eyes.star':'Stars','eyes.sleepy':'Sleepy',
    'eyes.wink':'Wink','eyes.kawaii':'Kawaii','eyes.surprised':'Surprised','eyes.cat':'Kitty',
    'mouth.smile':'Smile','mouth.big-smile':'Laugh','mouth.tongue':'Tongue',
    'mouth.kiss':'Kiss','mouth.cat-mouth':'Kitty','mouth.o':'Surprised',
    'mouth.tooth':'Tooth','mouth.smirk':'Smirk','mouth.worried':'Worried',
    'mouth.none':'No mouth',
    'blush.none':'None','blush.pink':'Pink','blush.red':'Red',
    'blush.heart':'Hearts','blush.stripes':'Stripes','blush.sparkle':'Sparkle',
    'acc.hat-bow':'Bow','acc.hat-crown':'Crown','acc.hat-top':'Top hat',
    'acc.hat-witch':'Witch hat','acc.hat-party':'Party hat','acc.hat-flower':'Flower',
    'acc.hat-cap':'Cap',
    'acc.hair-pigtails':'Pigtails','acc.hair-long':'Long hair',
    'acc.hair-bun':'Bun','acc.hair-curly':'Curly',
    'acc.glasses-round':'Round','acc.glasses-heart':'Hearts',
    'acc.glasses-star':'Star','acc.glasses-sun':'Sunglasses',
    'acc.earrings-pearl':'Pearls','acc.earrings-heart':'Hearts',
    'acc.earrings-star':'Stars','acc.earrings-hoop':'Hoops',
    'acc.scarf':'Scarf','acc.mustache':'Mustache','acc.freckles':'Freckles','acc.necklace':'Necklace',
    'box.vaporera':'Steamer','box.regalo':'Gift box','box.bento':'Bento',
    'boxColor.bamboo':'Bamboo','boxColor.red':'Red','boxColor.pink':'Pink',
    'boxColor.blue':'Blue','boxColor.green':'Green','boxColor.purple':'Purple',
    'boxColor.yellow':'Yellow','boxColor.mint':'Mint','boxColor.black':'Black','boxColor.white':'White',
  },
  lv: {
    'tagline':              'Veido, saglabā un dalies',
    'home.create':          'Izveidot jaunu pelmenīti',
    'home.empty.title':     'Tev vēl nav neviena pelmenīša',
    'home.empty.desc':      'Pieskaries pogai augšā, lai sāktu.',
    'home.confirmDelete':   'Dzēst {name}?',
    'home.confirmExit':     'Atgriezties sākumā? Nesaglabātās izmaiņas tiks zaudētas.',
    'design.title':         'Veido savu pelmenīti',
    'btn.back':             '← Atpakaļ',
    'btn.next':             'Tālāk →',
    'step.color':           '🎨 Krāsa',
    'step.eyes':            '👀 Acis',
    'step.mouth':           '👄 Mute',
    'step.blush':           '😊 Vaigi',
    'step.accessories':     '🎀 Aksesuāri',
    'step.box':             '📦 Kastīte',
    'step.boxColor':        '🌈 Kastītes krāsa',
    'step.name':            '📝 Vārds',
    'section.chooseColor':  'Izvēlies sava pelmenīša krāsu',
    'section.customColor':  '🌈 Pielāgota krāsa',
    'section.chooseBox':    'Izvēlies, kur dzīvos tavs pelmenītis',
    'section.chooseBoxColor':'Izvēlies kastītes krāsu',
    'section.boxPreview':   'Kastītes priekšskatījums:',
    'name.label':           '📝 Kā sauc tavu pelmenīti?',
    'name.placeholder':     'piem. Bao, Mochi, Lulu...',
    'name.hint':            'Maksimums 14 burti — tas tiks uzrakstīts uz kastītes.',
    'name.toast.required':  'Iedod pelmenītim vārdu ✨',
    'name.default':         'Mans pelmenītis',
    'reveal.tapToOpen':     'Pieskaries, lai atvērtu kastīti',
    'reveal.share':         '📲 Dalies / Lejupielādēt',
    'reveal.save':          '💾 Saglabāt manā kolekcijā',
    'reveal.createOther':   '✨ Izveidot citu',
    'reveal.shareText':     'Apskati manu pelmenīti "{name}", radītu {brand}! 🥟✨',
    'reveal.confirmClear':  'Dzēst visu zīmējumu?',
    'reveal.confirmNew':    'Tev ir nesaglabātas izmaiņas. Sākt jaunu?',
    'toast.saved':          'Saglabāts tavā kolekcijā! 💖',
    'toast.alreadySaved':   'Jau ir tavā kolekcijā 💖',
    'toast.preparing':      'Sagatavoju bildi...',
    'toast.downloaded':     'Lejupielādēts 📥',
    'toast.exportFailed':   'Neizdevās eksportēt 😢',
    'toast.installed':      'Instalēts! 🎉',
    'toast.loaded':         'Pelmenītis ielādēts',
    'install.banner':       'Instalē lietotni savā telefonā!',
    'install.btn':          'Instalēt',
    'lang.select':          'Izvēlies valodu',
    'lang.tagline':         'Elige tu idioma · Choose your language',
    'lang.change':          'Mainīt valodu',
    'cat.Sombreros':'Cepures','cat.Pelo':'Mati','cat.Lentes':'Brilles',
    'cat.Aretes':'Auskari','cat.Extras':'Citi',
    'color.cream':'Krēms','color.pink':'Rozā','color.matcha':'Mača','color.taro':'Taro',
    'color.choco':'Šokolāde','color.yellow':'Dzeltens','color.orange':'Oranžs',
    'color.sky':'Debesu','color.mint':'Piparmētra','color.lavender':'Lavanda',
    'color.peach':'Persiks','color.red':'Sarkans',
    'eyes.sparkle':'Mirdzošas','eyes.dots':'Punktiņi','eyes.happy':'Priecīgas',
    'eyes.heart':'Sirsniņas','eyes.star':'Zvaigznes','eyes.sleepy':'Miegainas',
    'eyes.wink':'Mirkšķis','eyes.kawaii':'Kavaii','eyes.surprised':'Pārsteigtas','eyes.cat':'Kaķēns',
    'mouth.smile':'Smaids','mouth.big-smile':'Smiekli','mouth.tongue':'Mēlīte',
    'mouth.kiss':'Skūpsts','mouth.cat-mouth':'Kaķēns','mouth.o':'Pārsteigts',
    'mouth.tooth':'Zobiņš','mouth.smirk':'Šelmīgs','mouth.worried':'Norūpējies',
    'mouth.none':'Bez mutes',
    'blush.none':'Nav','blush.pink':'Rozā','blush.red':'Sarkani',
    'blush.heart':'Sirsniņas','blush.stripes':'Svītriņas','blush.sparkle':'Mirdzums',
    'acc.hat-bow':'Banta','acc.hat-crown':'Kronis','acc.hat-top':'Cilindrs',
    'acc.hat-witch':'Raganas cepure','acc.hat-party':'Svētku cepure','acc.hat-flower':'Puķīte',
    'acc.hat-cap':'Cepure',
    'acc.hair-pigtails':'Bizes','acc.hair-long':'Gari mati',
    'acc.hair-bun':'Mezgls','acc.hair-curly':'Sproguļi',
    'acc.glasses-round':'Apaļas','acc.glasses-heart':'Sirsniņas',
    'acc.glasses-star':'Zvaigzne','acc.glasses-sun':'Saulesbrilles',
    'acc.earrings-pearl':'Pērles','acc.earrings-heart':'Sirsniņas',
    'acc.earrings-star':'Zvaigznītes','acc.earrings-hoop':'Riņķi',
    'acc.scarf':'Šalle','acc.mustache':'Ūsas','acc.freckles':'Vasaras raibumi','acc.necklace':'Kaklarota',
    'box.vaporera':'Tvaicētājs','box.regalo':'Dāvana','box.bento':'Bento',
    'boxColor.bamboo':'Bambuss','boxColor.red':'Sarkans','boxColor.pink':'Rozā',
    'boxColor.blue':'Zils','boxColor.green':'Zaļš','boxColor.purple':'Violets',
    'boxColor.yellow':'Dzeltens','boxColor.mint':'Piparmētra','boxColor.black':'Melns','boxColor.white':'Balts',
  },
};

let currentLocale = 'es';

export function getLocale() { return currentLocale; }

export function setLocale(code) {
  if (!STRINGS[code]) return;
  currentLocale = code;
  try { localStorage.setItem(LOCALE_KEY, code); } catch {}
  document.documentElement.lang = code;
}

export function getStoredLocale() {
  try { return localStorage.getItem(LOCALE_KEY); } catch { return null; }
}

export function detectBestLocale() {
  const navLangs = (navigator.languages || [navigator.language || 'es']).map(l => l.toLowerCase().split('-')[0]);
  for (const l of navLangs) {
    if (STRINGS[l]) return l;
  }
  return 'es';
}

export function t(key, params) {
  const dict = STRINGS[currentLocale] || STRINGS.es;
  let str = dict[key] ?? STRINGS.es[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
  }
  return str;
}
