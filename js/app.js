/**
 * Controlador principal de la app.
 * - Navegación entre 3 pantallas: home / design / reveal
 * - Estado del dumpling en construcción
 * - Renderizado de previews y opciones
 * - Animación de apertura de cajita
 * - Exportar a PNG y compartir
 */

import {
  DUMPLING_COLORS, EYES, MOUTHS, BLUSH, ACCESSORIES, BOXES, BOX_COLORS,
} from './parts.js';
import { renderDumplingSVG } from './dumpling.js';
import { renderBoxSVG } from './box.js';
import { Storage } from './storage.js';

const STEPS = ['color', 'eyes', 'mouth', 'blush', 'accessories', 'box', 'boxColor', 'name'];
const storage = new Storage();

/* ============ Estado ============ */
const state = {
  screen: 'home',
  currentStep: 'color',
  config: defaultConfig(),
  editingId: null, // si se está editando uno existente
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
    const visible = s.dataset.screen === name;
    s.hidden = !visible;
  });
}

/* ============ HOME: collection ============ */
async function renderCollection() {
  const items = await storage.list();
  collectionEl.innerHTML = '';
  if (!items.length) {
    collectionEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-emoji">🥟</div>
        <h3>Aún no tienes dumplings</h3>
        <p>Toca <strong>"Crear un nuevo dumpling"</strong> para empezar.</p>
      </div>`;
    return;
  }
  items.sort((a, b) => b.id - a.id);
  for (const item of items) {
    const card = document.createElement('div');
    card.className = 'collection-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-svg">${renderDumplingSVG(item.config)}</div>
      <div class="card-name">${escapeHtml(item.config.name || 'Mi Dumpling')}</div>
      <button class="delete" aria-label="Borrar">
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
      </button>
    `;
    card.querySelector('.delete').addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm(`¿Borrar a ${item.config.name || 'este dumpling'}?`)) {
        await storage.remove(item.id);
        renderCollection();
      }
    });
    card.addEventListener('click', () => {
      // Abrir el reveal de un dumpling guardado
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
  // Asegurarse de que el tab activo sea visible (scroll horizontal)
  const activeTab = document.querySelector('.step-tab.active');
  if (activeTab) {
    activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
  renderOptions();
}

function renderOptions() {
  const step = state.currentStep;
  let html = '';

  if (step === 'color') {
    html = `<p class="opt-section-title">Elige el color de tu dumpling</p>
      <div class="opt-grid">
        ${DUMPLING_COLORS.map(c => `
          <button class="opt-card color-card ${state.config.color === c.id && !state.config.colorCustom ? 'active' : ''}"
            data-color="${c.id}" aria-label="${c.name}">
            <div class="swatch" style="background:${c.fill}; box-shadow: inset 0 0 0 3px ${c.stroke};"></div>
            <span class="check">✓</span>
          </button>
        `).join('')}
      </div>
      <div class="custom-color-row">
        <label for="custom-color-input">🌈 Color personalizado</label>
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
    // Agrupar por categoría
    const categories = [...new Set(ACCESSORIES.map(a => a.category))];
    html = categories.map(cat => `
      <div style="margin-bottom: 20px;">
        <p class="opt-section-title">${cat}</p>
        <div class="opt-grid">
          ${ACCESSORIES.filter(a => a.category === cat).map(a => `
            <button class="opt-card ${state.config.accessories.includes(a.id) ? 'active' : ''}"
              data-accessory="${a.id}" aria-label="${a.name}">
              ${renderAccessoryPreview(a)}
              <span class="check">✓</span>
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
  else if (step === 'box') {
    html = `<p class="opt-section-title">Elige dónde vivirá tu dumpling</p>
      <div class="opt-grid" style="grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));">
        ${BOXES.map(b => `
          <button class="opt-card ${state.config.box === b.id ? 'active' : ''}"
            data-box="${b.id}" aria-label="${b.name}" style="aspect-ratio: 1.2; flex-direction: column;">
            <div style="font-size:42px; line-height:1;">${b.emoji}</div>
            <div class="opt-label">${b.name}</div>
            <span class="check">✓</span>
          </button>
        `).join('')}
      </div>`;
  }
  else if (step === 'boxColor') {
    html = `<p class="opt-section-title">Elige el color de la cajita</p>
      <div class="opt-grid">
        ${BOX_COLORS.map(c => `
          <button class="opt-card color-card ${state.config.boxColor === c.id ? 'active' : ''}"
            data-box-color="${c.id}" aria-label="${c.name}">
            <div class="swatch" style="background:${c.fill}; box-shadow: inset 0 0 0 3px ${c.stroke};"></div>
            <span class="check">✓</span>
          </button>
        `).join('')}
      </div>`;
  }
  else if (step === 'name') {
    html = `
      <div class="name-input-wrap">
        <label for="dumpling-name">📝 ¿Cómo se llama tu dumpling?</label>
        <input type="text" class="name-input" id="dumpling-name"
          maxlength="14" placeholder="Ej. Bao, Mochi, Lulu..."
          value="${escapeHtml(state.config.name)}" autocomplete="off"/>
        <p class="name-hint">Máximo 14 letras — quedará escrito en la cajita.</p>
      </div>
      <div class="opt-section-title" style="margin-top: 20px;">Vista previa de la cajita:</div>
      <div style="aspect-ratio: 1; max-width: 280px; margin: 0 auto;">
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
        data-${kind}="${p.id}" aria-label="${p.name}">
        ${renderPartPreview(p, kind)}
        <span class="check">✓</span>
      </button>
    `).join('')}
  </div>`;
}

/** Genera SVG en miniatura para mostrar una opción de cara */
function renderPartPreview(part, kind) {
  // Cuerpo simplificado + la parte específica
  const baseFill = '#fff0d4';
  const baseStroke = '#d9b277';
  let extra = '';
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
      <path d="M 80 240 C 80 170, 120 110, 200 110 C 280 110, 320 170, 320 240 C 320 320, 270 365, 200 365 C 130 365, 80 320, 80 240 Z"
        fill="${baseFill}" stroke="${baseStroke}" stroke-width="4" stroke-linejoin="round"/>
      ${face}
    </svg>
  `;
}

function renderAccessoryPreview(acc) {
  // muestra el accesorio sobre una silueta gris simple
  return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M 80 240 C 80 170, 120 110, 200 110 C 280 110, 320 170, 320 240 C 320 320, 270 365, 200 365 C 130 365, 80 320, 80 240 Z"
        fill="#f3e8ef" stroke="#c9b5c4" stroke-width="3"/>
      <g><circle cx="155" cy="220" r="6" fill="#2a1a3a"/><circle cx="245" cy="220" r="6" fill="#2a1a3a"/></g>
      <path d="M 180 280 Q 200 295 220 280" fill="none" stroke="#2a1a3a" stroke-width="4" stroke-linecap="round"/>
      ${acc.svg()}
    </svg>
  `;
}

function attachOptionEvents() {
  // Color del dumpling
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

  // Caras
  ['eyes', 'mouth', 'blush'].forEach(kind => {
    optionsEl.querySelectorAll(`[data-${kind}]`).forEach(el => {
      el.addEventListener('click', () => {
        state.config[kind] = el.dataset[kind];
        renderOptions();
        updatePreview();
      });
    });
  });

  // Accesorios (toggle múltiple, máximo 1 por categoría)
  optionsEl.querySelectorAll('[data-accessory]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.accessory;
      const acc = ACCESSORIES.find(a => a.id === id);
      if (!acc) return;

      const current = new Set(state.config.accessories);
      if (current.has(id)) {
        current.delete(id);
      } else {
        // Quitar otros de la misma categoría (solo uno de cada tipo)
        ACCESSORIES.filter(a => a.category === acc.category).forEach(a => current.delete(a.id));
        current.add(id);
      }
      state.config.accessories = [...current];
      renderOptions();
      updatePreview();
    });
  });

  // Caja
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

  // Nombre
  const nameInput = optionsEl.querySelector('#dumpling-name');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      state.config.name = e.target.value;
      // Solo re-renderiza la mini preview de la caja (no la pantalla entera)
      const boxPreview = optionsEl.querySelector('div[style*="aspect-ratio"]');
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
    // último paso: validar nombre y abrir reveal
    if (!state.config.name.trim()) {
      toast('Ponle un nombre a tu dumpling ✨');
      const input = optionsEl.querySelector('#dumpling-name');
      if (input) input.focus();
      return;
    }
    openReveal({ fromSaved: false });
  }
});
document.querySelectorAll('.step-tab').forEach(tab => {
  tab.addEventListener('click', () => setStep(tab.dataset.step));
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
  if (confirm('¿Volver al inicio? Los cambios no guardados se perderán.')) {
    showScreen('home');
    renderCollection();
  }
});

/* ============ REVEAL ============ */
function openReveal({ fromSaved }) {
  showScreen('reveal');
  revealName.classList.remove('show');
  revealName.textContent = state.config.name || 'Mi Dumpling';
  revealBox.classList.remove('opening');
  revealActions.hidden = true;
  revealTapHint.classList.remove('hidden');
  confettiEl.innerHTML = '';

  // Renderizar caja cerrada
  revealBox.innerHTML = renderBoxSVG(state.config, state.config);

  // Si viene de guardados, abrir automáticamente sin pedir tap
  if (fromSaved) {
    setTimeout(() => triggerOpenAnimation(true), 400);
  }
}

function triggerOpenAnimation(skipHint) {
  if (revealBox.classList.contains('opening')) return;
  revealBox.classList.add('opening');
  revealTapHint.classList.add('hidden');
  // Mostrar nombre con un pequeño retraso
  setTimeout(() => revealName.classList.add('show'), 300);
  // Confetti
  spawnConfetti();
  // Mostrar acciones después de la animación
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
    // ya está guardado, no duplicar
    toast('Ya está en tu colección 💖');
  } else {
    const saved = await storage.save(state.config);
    state.editingId = saved.id;
    toast('¡Guardado en tu colección! 💖');
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
  toast('Preparando imagen...');
  const blob = await exportImage();
  if (!blob) {
    toast('No se pudo exportar 😢');
    return;
  }
  const file = new File([blob], `${(state.config.name || 'dumpling').replace(/\s+/g, '-')}.png`, { type: 'image/png' });

  // Intentar compartir nativo (Android/iOS modernos)
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: state.config.name || 'Mi Dumpling',
        text: `¡Mira mi dumpling "${state.config.name}"! 🥟✨`,
      });
      return;
    } catch (e) {
      // usuario canceló o falló: caer a descarga
    }
  }

  // Fallback: descargar
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
  toast('Descargado 📥');
}

async function exportImage() {
  // Renderizar la caja ABIERTA con el dumpling visible
  const svgString = renderOpenBoxForExport();
  const size = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Fondo bonito con gradiente
  const grad = ctx.createRadialGradient(size/2, size*0.3, 50, size/2, size/2, size*0.7);
  grad.addColorStop(0, '#fff5f7');
  grad.addColorStop(0.6, '#ffe9f1');
  grad.addColorStop(1, '#f0d8e8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Pinta el SVG
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  try {
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const pad = 60;
        const drawSize = size - pad * 2;
        ctx.drawImage(img, pad, pad, drawSize, drawSize);
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }

  // Marca de agua sutil
  ctx.fillStyle = 'rgba(58, 37, 64, 0.4)';
  ctx.font = 'bold 28px -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🥟 Mi Dumpling', size / 2, size - 36);

  return await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 0.95));
}

function renderOpenBoxForExport() {
  // Renderiza la caja con las transformaciones de apertura aplicadas inline
  // para que el PNG exportado muestre la caja abierta con el dumpling.
  const baseSvg = renderBoxSVG(state.config, state.config);
  // Inserta atributos transform inline en los grupos animados
  const opened = baseSvg
    .replace(
      /<g class="box-lid-top">/g,
      '<g class="box-lid-top" transform="translate(0 -260) rotate(-8 250 200)">'
    )
    .replace(
      /<g class="box-lid-left">/g,
      '<g class="box-lid-left" transform="translate(-90 -50) rotate(-25 75 175)">'
    )
    .replace(
      /<g class="box-lid-right">/g,
      '<g class="box-lid-right" transform="translate(90 -50) rotate(25 425 175)">'
    )
    .replace(
      /<g class="dumpling-inside"([^>]*)>/g,
      '<g class="dumpling-inside"$1 style="transform: translate(0px, -40px);">'
    );
  return opened;
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

/* ============ Prevent iOS zoom gestures ============ */
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault());

/* ============ Init ============ */
showScreen('home');
renderCollection();
updatePreview();
