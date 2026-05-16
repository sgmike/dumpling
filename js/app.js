/**
 * Controlador principal de Elza's dumpling workshop.
 * - Selección de idioma (es / en / lv)
 * - Navegación entre pantallas: language / home / design / reveal
 * - Estado del dumpling en construcción
 * - Renderizado, exportar, compartir, instalación PWA
 */

import {
  DUMPLING_COLORS, EYES, MOUTHS, BLUSH, ACCESSORIES, BOXES, BOX_COLORS,
} from './parts.js';
import { renderDumplingSVG } from './dumpling.js';
import { renderBoxSVG } from './box.js';
import { Storage } from './storage.js';
import {
  t, BRAND, LOCALES, getLocale, setLocale,
  getStoredLocale, detectBestLocale,
} from './i18n.js';

const STEPS = ['color', 'eyes', 'mouth', 'blush', 'accessories', 'box', 'boxColor', 'name'];
const storage = new Storage();

const state = {
  screen: 'language',
  currentStep: 'color',
  config: defaultConfig(),
  editingId: null,
};

function defaultConfig() {
  return {
    color: 'cream',
    colorCustom: null,
    eyes: 'sparkle',
    mouth: 'smile',
    blush: 'pink',
    accessories: [],
    box: 'vaporera',
    boxColor: 'bamboo',
    name: '',
  };
}

/* ============ Refs ============ */
const screens = document.querySelectorAll('.screen');
const previewEl = document.getElementById('preview-svg');
const optionsEl = document.getElementById('options');
const stepsEl = document.getElementById('steps');
const collectionEl = document.getElementById('collection');
const revealBox = document.getElementById('reveal-box');
const revealName = document.getElementById('reveal-name');
const revealStage = document.getElementById('reveal-stage');
const revealActions = document.getElementById('reveal-actions');
const revealTapHint = document.getElementById('reveal-tap-hint');
const confettiEl = document.getElementById('confetti');

/* ============ Screen routing ============ */
function showScreen(name) {
  state.screen = name;
  screens.forEach(s => {
    s.hidden = s.dataset.screen !== name;
  });
  if (name === 'home') renderCollection();
}

/* ============ I18N: apply translations ============ */
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  renderSteps();
  // Re-render current screen content
  if (state.screen === 'design') renderOptions();
  if (state.screen === 'home') renderCollection();
  updateLangFlags();
}

function updateLangFlags() {
  const loc = LOCALES.find(l => l.code === getLocale());
  const flag = loc ? loc.flag : '🌐';
  const f1 = document.getElementById('flag-home');
  const f2 = document.getElementById('flag-design');
  if (f1) f1.textContent = flag;
  if (f2) f2.textContent = flag;
}

/* ============ LANGUAGE SCREEN ============ */
function renderLanguageScreen() {
  // Logo (mini dumpling) sobre la marca
  document.getElementById('lang-logo').innerHTML = renderDumplingSVG(defaultConfig());

  const btns = document.getElementById('lang-buttons');
  btns.innerHTML = '';
  for (const loc of LOCALES) {
    const b = document.createElement('button');
    b.className = 'lang-btn' + (loc.code === getLocale() ? ' active' : '');
    b.innerHTML = `<span class="flag-emoji">${loc.flag}</span><span class="lang-name">${loc.name}</span>`;
    b.addEventListener('click', () => {
      setLocale(loc.code);
      applyTranslations();
      showScreen('home');
    });
    btns.appendChild(b);
  }
}

/* ============ STEPS (dynamic, translated) ============ */
function renderSteps() {
  if (!stepsEl) return;
  stepsEl.innerHTML = STEPS.map(s => `
    <button class="step-tab ${s === state.currentStep ? 'active' : ''}" data-step="${s}">${t('step.' + s)}</button>
  `).join('');
  stepsEl.querySelectorAll('.step-tab').forEach(tab => {
    tab.addEventListener('click', () => setStep(tab.dataset.step));
  });
}

/* ============ HOME: collection ============ */
async function renderCollection() {
  if (!collectionEl) return;
  const items = await storage.list();
  collectionEl.innerHTML = '';
  if (!items.length) {
    collectionEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-emoji">🥟</div>
        <h3>${t('home.empty.title')}</h3>
        <p>${t('home.empty.desc')}</p>
      </div>`;
    return;
  }
  items.sort((a, b) => b.id - a.id);
  for (const item of items) {
    const name = item.config.name || t('name.default');
    const card = document.createElement('div');
    card.className = 'collection-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-svg">${renderDumplingSVG(item.config)}</div>
      <div class="card-name">${escapeHtml(name)}</div>
      <button class="delete" aria-label="Delete">
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
      </button>
    `;
    card.querySelector('.delete').addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm(t('home.confirmDelete', { name }))) {
        await storage.remove(item.id);
        renderCollection();
      }
    });
    card.addEventListener('click', () => {
      state.config = { ...item.config };
      state.editingId = item.id;
      openReveal({ fromSaved: true });
    });
    collectionEl.appendChild(card);
  }
}

/* ============ DESIGNER ============ */
function updatePreview() {
  previewEl.innerHTML = renderDumplingSVG(state.config);
}

function setStep(step) {
  state.currentStep = step;
  document.querySelectorAll('.step-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.step === step);
  });
  const activeTab = document.querySelector('.step-tab.active');
  if (activeTab) {
    activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
  renderOptions();
}

function renderOptions() {
  if (!optionsEl) return;
  const step = state.currentStep;
  let html = '';

  if (step === 'color') {
    html = `<p class="opt-section-title">${t('section.chooseColor')}</p>
      <div class="opt-grid">
        ${DUMPLING_COLORS.map(c => `
          <button class="opt-card color-card ${state.config.color === c.id && !state.config.colorCustom ? 'active' : ''}"
            data-color="${c.id}" aria-label="${t('color.' + c.id)}" title="${t('color.' + c.id)}">
            <div class="swatch" style="background:${c.fill}; box-shadow: inset 0 0 0 3px ${c.stroke};"></div>
            <span class="check">✓</span>
          </button>
        `).join('')}
      </div>
      <div class="custom-color-row">
        <label for="custom-color-input">${t('section.customColor')}</label>
        <div class="custom-color-wrap">
          <input type="color" id="custom-color-input" value="${state.config.colorCustom || '#ff7eb6'}"/>
        </div>
      </div>`;
  }
  else if (step === 'eyes') {
    html = renderPartGrid(EYES, state.config.eyes, 'eyes');
  }
  else if (step === 'mouth') {
    html = renderPartGrid(MOUTHS, state.config.mouth, 'mouth');
  }
  else if (step === 'blush') {
    html = renderPartGrid(BLUSH, state.config.blush, 'blush');
  }
  else if (step === 'accessories') {
    const categories = [...new Set(ACCESSORIES.map(a => a.category))];
    html = categories.map(cat => `
      <div style="margin-bottom: 20px;">
        <p class="opt-section-title">${t('cat.' + cat)}</p>
        <div class="opt-grid">
          ${ACCESSORIES.filter(a => a.category === cat).map(a => `
            <button class="opt-card ${state.config.accessories.includes(a.id) ? 'active' : ''}"
              data-accessory="${a.id}" aria-label="${t('acc.' + a.id)}" title="${t('acc.' + a.id)}">
              ${renderAccessoryPreview(a)}
              <span class="check">✓</span>
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
  else if (step === 'box') {
    html = `<p class="opt-section-title">${t('section.chooseBox')}</p>
      <div class="opt-grid" style="grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));">
        ${BOXES.map(b => `
          <button class="opt-card ${state.config.box === b.id ? 'active' : ''}"
            data-box="${b.id}" aria-label="${t('box.' + b.id)}" style="aspect-ratio: 1.2; flex-direction: column;">
            <div style="font-size:42px; line-height:1;">${b.emoji}</div>
            <div class="opt-label">${t('box.' + b.id)}</div>
            <span class="check">✓</span>
          </button>
        `).join('')}
      </div>`;
  }
  else if (step === 'boxColor') {
    html = `<p class="opt-section-title">${t('section.chooseBoxColor')}</p>
      <div class="opt-grid">
        ${BOX_COLORS.map(c => `
          <button class="opt-card color-card ${state.config.boxColor === c.id ? 'active' : ''}"
            data-box-color="${c.id}" aria-label="${t('boxColor.' + c.id)}" title="${t('boxColor.' + c.id)}">
            <div class="swatch" style="background:${c.fill}; box-shadow: inset 0 0 0 3px ${c.stroke};"></div>
            <span class="check">✓</span>
          </button>
        `).join('')}
      </div>`;
  }
  else if (step === 'name') {
    html = `
      <div class="name-input-wrap">
        <label for="dumpling-name">${t('name.label')}</label>
        <input type="text" class="name-input" id="dumpling-name"
          maxlength="14" placeholder="${t('name.placeholder')}"
          value="${escapeHtml(state.config.name)}" autocomplete="off"/>
        <p class="name-hint">${t('name.hint')}</p>
      </div>
      <div class="opt-section-title" style="margin-top: 20px;">${t('section.boxPreview')}</div>
      <div class="box-preview-box" style="aspect-ratio: 1; max-width: 280px; margin: 0 auto;">
        ${renderBoxSVG(state.config, state.config)}
      </div>
    `;
  }

  optionsEl.innerHTML = html;
  attachOptionEvents();
}

function renderPartGrid(parts, currentId, kind) {
  return `<div class="opt-grid">
    ${parts.map(p => `
      <button class="opt-card ${currentId === p.id ? 'active' : ''}"
        data-${kind}="${p.id}" aria-label="${t(kind + '.' + p.id)}" title="${t(kind + '.' + p.id)}">
        ${renderPartPreview(p, kind)}
        <span class="check">✓</span>
      </button>
    `).join('')}
  </div>`;
}

function renderPartPreview(part, kind) {
  const baseFill = '#fff0d4';
  const baseStroke = '#8a5530';
  let face = '';
  if (kind === 'eyes') face = part.svg();
  else if (kind === 'mouth') {
    face = `
      <g><circle cx="155" cy="220" r="8" fill="#2a1a3a"/><circle cx="245" cy="220" r="8" fill="#2a1a3a"/></g>
      ${part.svg()}`;
  } else if (kind === 'blush') {
    face = `
      <g><circle cx="155" cy="220" r="8" fill="#2a1a3a"/><circle cx="245" cy="220" r="8" fill="#2a1a3a"/></g>
      <path d="M 175 275 Q 200 295 225 275" fill="none" stroke="#2a1a3a" stroke-width="5" stroke-linecap="round"/>
      ${part.svg()}`;
  }
  return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M 55 232 C 55 150, 112 105, 200 105 C 288 105, 345 150, 345 232 C 345 312, 285 358, 200 358 C 115 358, 55 312, 55 232 Z"
        fill="${baseFill}" stroke="${baseStroke}" stroke-width="6" stroke-linejoin="round"/>
      ${face}
    </svg>
  `;
}

function renderAccessoryPreview(acc) {
  return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M 55 232 C 55 150, 112 105, 200 105 C 288 105, 345 150, 345 232 C 345 312, 285 358, 200 358 C 115 358, 55 312, 55 232 Z"
        fill="#f3e8ef" stroke="#9b8aa1" stroke-width="5"/>
      <g><circle cx="155" cy="220" r="6" fill="#2a1a3a"/><circle cx="245" cy="220" r="6" fill="#2a1a3a"/></g>
      <path d="M 180 280 Q 200 295 220 280" fill="none" stroke="#2a1a3a" stroke-width="4" stroke-linecap="round"/>
      ${acc.svg()}
    </svg>
  `;
}

function attachOptionEvents() {
  optionsEl.querySelectorAll('[data-color]').forEach(el => {
    el.addEventListener('click', () => {
      state.config.color = el.dataset.color;
      state.config.colorCustom = null;
      renderOptions();
      updatePreview();
    });
  });
  const customColorInput = optionsEl.querySelector('#custom-color-input');
  if (customColorInput) {
    customColorInput.addEventListener('input', (e) => {
      state.config.colorCustom = e.target.value;
      updatePreview();
      optionsEl.querySelectorAll('[data-color]').forEach(el => el.classList.remove('active'));
    });
  }

  ['eyes', 'mouth', 'blush'].forEach(kind => {
    optionsEl.querySelectorAll(`[data-${kind}]`).forEach(el => {
      el.addEventListener('click', () => {
        state.config[kind] = el.dataset[kind];
        renderOptions();
        updatePreview();
      });
    });
  });

  optionsEl.querySelectorAll('[data-accessory]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.accessory;
      const acc = ACCESSORIES.find(a => a.id === id);
      if (!acc) return;
      const current = new Set(state.config.accessories);
      if (current.has(id)) {
        current.delete(id);
      } else {
        ACCESSORIES.filter(a => a.category === acc.category).forEach(a => current.delete(a.id));
        current.add(id);
      }
      state.config.accessories = [...current];
      renderOptions();
      updatePreview();
    });
  });

  optionsEl.querySelectorAll('[data-box]').forEach(el => {
    el.addEventListener('click', () => {
      state.config.box = el.dataset.box;
      renderOptions();
    });
  });
  optionsEl.querySelectorAll('[data-box-color]').forEach(el => {
    el.addEventListener('click', () => {
      state.config.boxColor = el.dataset.boxColor;
      renderOptions();
    });
  });

  const nameInput = optionsEl.querySelector('#dumpling-name');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      state.config.name = e.target.value;
      const boxPreview = optionsEl.querySelector('.box-preview-box');
      if (boxPreview) boxPreview.innerHTML = renderBoxSVG(state.config, state.config);
    });
  }
}

/* ============ Step navigation ============ */
document.getElementById('btn-prev').addEventListener('click', () => {
  const idx = STEPS.indexOf(state.currentStep);
  if (idx > 0) setStep(STEPS[idx - 1]);
});
document.getElementById('btn-next').addEventListener('click', () => {
  const idx = STEPS.indexOf(state.currentStep);
  if (idx < STEPS.length - 1) {
    setStep(STEPS[idx + 1]);
  } else {
    if (!state.config.name.trim()) {
      toast(t('name.toast.required'));
      const input = optionsEl.querySelector('#dumpling-name');
      if (input) input.focus();
      return;
    }
    openReveal({ fromSaved: false });
  }
});

/* ============ Home buttons ============ */
document.getElementById('btn-create').addEventListener('click', () => {
  state.config = defaultConfig();
  state.editingId = null;
  setStep('color');
  updatePreview();
  showScreen('design');
});
document.getElementById('btn-back-home').addEventListener('click', () => {
  if (confirm(t('home.confirmExit'))) {
    showScreen('home');
  }
});

/* ============ Language buttons in topbar ============ */
function openLanguageScreen() {
  state._returnTo = state.screen;
  renderLanguageScreen();
  showScreen('language');
}
document.getElementById('btn-lang-home').addEventListener('click', openLanguageScreen);
document.getElementById('btn-lang-design').addEventListener('click', openLanguageScreen);

/* ============ REVEAL ============ */
function openReveal({ fromSaved }) {
  showScreen('reveal');
  revealName.classList.remove('show');
  revealName.textContent = state.config.name || t('name.default');
  revealBox.classList.remove('opening');
  revealActions.hidden = true;
  revealTapHint.classList.remove('hidden');
  confettiEl.innerHTML = '';
  revealBox.innerHTML = renderBoxSVG(state.config, state.config);

  if (fromSaved) {
    setTimeout(() => triggerOpenAnimation(true), 400);
  }
}

function triggerOpenAnimation(skipHint) {
  if (revealBox.classList.contains('opening')) return;
  revealBox.classList.add('opening');
  revealTapHint.classList.add('hidden');
  setTimeout(() => revealName.classList.add('show'), 300);
  spawnConfetti();
  setTimeout(() => { revealActions.hidden = false; }, 1400);
}

revealStage.addEventListener('click', () => triggerOpenAnimation(false));

function spawnConfetti() {
  const colors = ['#ff7eb6', '#b86bff', '#ffd23f', '#82d3a7', '#5b8dee', '#ff5470'];
  for (let i = 0; i < 36; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.setProperty('--dur', (1.8 + Math.random() * 1.5) + 's');
    p.style.setProperty('--delay', Math.random() * 0.6 + 's');
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    if (Math.random() < 0.3) p.style.borderRadius = '50%';
    confettiEl.appendChild(p);
  }
  setTimeout(() => { confettiEl.innerHTML = ''; }, 4000);
}

/* ============ REVEAL actions ============ */
document.getElementById('btn-save').addEventListener('click', async () => {
  if (state.editingId) {
    toast(t('toast.alreadySaved'));
  } else {
    const saved = await storage.save(state.config);
    state.editingId = saved.id;
    toast(t('toast.saved'));
  }
});

document.getElementById('btn-share').addEventListener('click', async () => {
  await shareOrDownload();
});

document.getElementById('btn-new-after').addEventListener('click', () => {
  state.config = defaultConfig();
  state.editingId = null;
  setStep('color');
  updatePreview();
  showScreen('design');
});

/* ============ Export PNG / Share ============ */
async function shareOrDownload() {
  toast(t('toast.preparing'));
  const blob = await exportImage();
  if (!blob) { toast(t('toast.exportFailed')); return; }
  const dumplingName = (state.config.name || t('name.default')).replace(/\s+/g, '-');
  const file = new File([blob], `${dumplingName}-${BRAND.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`, { type: 'image/png' });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `${state.config.name || t('name.default')} — ${BRAND}`,
        text: t('reveal.shareText', { name: state.config.name || t('name.default'), brand: BRAND }),
      });
      return;
    } catch (e) {}
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
  toast(t('toast.downloaded'));
}

async function exportImage() {
  const svgString = renderOpenBoxForExport();
  const size = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Fondo
  const grad = ctx.createRadialGradient(size/2, size*0.3, 50, size/2, size/2, size*0.7);
  grad.addColorStop(0, '#fff5f7');
  grad.addColorStop(0.6, '#ffe9f1');
  grad.addColorStop(1, '#f0d8e8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Brand: header arriba
  ctx.fillStyle = '#b8478e';
  ctx.font = 'bold 38px -apple-system, "Quicksand", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(BRAND, size / 2, 70);

  // Dumpling's name debajo del brand
  if (state.config.name) {
    ctx.fillStyle = '#3a2540';
    ctx.font = 'bold 56px -apple-system, "Quicksand", sans-serif';
    ctx.fillText(state.config.name, size / 2, 145);
  }

  // SVG de la caja abierta
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  try {
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const padX = 60;
        const top = 170;
        const bottom = 80;
        const drawW = size - padX * 2;
        const drawH = size - top - bottom;
        const drawSize = Math.min(drawW, drawH);
        const dx = (size - drawSize) / 2;
        const dy = top + (drawH - drawSize) / 2;
        ctx.drawImage(img, dx, dy, drawSize, drawSize);
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }

  // Footer
  ctx.fillStyle = 'rgba(58, 37, 64, 0.45)';
  ctx.font = 'bold 24px -apple-system, sans-serif';
  ctx.fillText('🥟 ' + BRAND, size / 2, size - 36);

  return await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 0.95));
}

function renderOpenBoxForExport() {
  const baseSvg = renderBoxSVG(state.config, state.config);
  return baseSvg
    .replace(/<g class="box-lid-top">/g,
      '<g class="box-lid-top" transform="translate(0 -260) rotate(-8 250 200)">')
    .replace(/<g class="box-lid-left">/g,
      '<g class="box-lid-left" transform="translate(-90 -50) rotate(-25 75 175)">')
    .replace(/<g class="box-lid-right">/g,
      '<g class="box-lid-right" transform="translate(90 -50) rotate(25 425 175)">')
    .replace(/<g class="dumpling-inside"([^>]*)>/g,
      '<g class="dumpling-inside"$1 style="transform: translate(0px, -40px);">');
}

/* ============ Toast ============ */
const toastEl = document.getElementById('toast');
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
}

/* ============ PWA install ============ */
let deferredPrompt = null;
const installBanner = document.getElementById('install-banner');
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (!localStorage.getItem('install-dismissed')) installBanner.hidden = false;
});
document.getElementById('btn-install').addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  installBanner.hidden = true;
  deferredPrompt = null;
});
document.getElementById('btn-dismiss-install').addEventListener('click', () => {
  installBanner.hidden = true;
  localStorage.setItem('install-dismissed', '1');
});
window.addEventListener('appinstalled', () => { installBanner.hidden = true; });

/* ============ Service Worker ============ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

/* ============ utils ============ */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault());

/* ============ Init ============ */
(function init() {
  const stored = getStoredLocale();
  if (stored) {
    setLocale(stored);
    applyTranslations();
    showScreen('home');
    updatePreview();
  } else {
    setLocale(detectBestLocale());
    applyTranslations();
    renderLanguageScreen();
    showScreen('language');
    updatePreview();
  }
})();
