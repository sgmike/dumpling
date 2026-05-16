/**
 * Renderiza la cajita con el dumpling dentro y su nombre.
 * 3 tipos: 'vaporera', 'regalo', 'bento'.
 *
 * Capas con clases especiales:
 *   .box-lid-top, .box-lid-left, .box-lid-right -> se mueven al abrir
 *   .dumpling-inside -> el dumpling dentro de la caja
 *
 * El CSS hace la animación de apertura cuando el contenedor tiene .opening.
 */

import { renderDumplingSVG } from './dumpling.js';
import { findBoxColor } from './parts.js';

export function renderBoxSVG(config, dumplingConfig) {
  const c = findBoxColor(config.boxColor);
  const name = (config.name || 'Mi Dumpling').slice(0, 14);
  const type = config.box || 'vaporera';

  if (type === 'regalo') return renderRegalo(c, name, dumplingConfig);
  if (type === 'bento')  return renderBento(c, name, dumplingConfig);
  return renderVaporera(c, name, dumplingConfig);
}

/* ============ Vaporera de bambú ============ */
function renderVaporera(c, name, dumplingConfig) {
  const dumplingSvg = renderDumplingSVG(dumplingConfig);
  const rim = darken(c.fill, 0.12);
  const inside = darken(c.fill, 0.45);
  return `
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="250" cy="455" rx="165" ry="12" fill="rgba(0,0,0,0.28)"/>

      <!-- BASE (no se mueve) -->
      <g>
        <!-- Cuerpo cilíndrico -->
        <path d="M 85 425 L 85 320 Q 250 305, 415 320 L 415 425 Q 250 450, 85 425 Z"
              fill="${c.fill}" stroke="${c.stroke}" stroke-width="3"/>
        ${verticalSlats(c.stroke, 85, 320, 415, 425)}
        <!-- Rim superior -->
        <ellipse cx="250" cy="320" rx="165" ry="20" fill="${rim}" stroke="${c.stroke}" stroke-width="3"/>
        <ellipse cx="250" cy="320" rx="150" ry="15" fill="${inside}"/>
        <!-- Etiqueta con nombre -->
        <g transform="translate(125 360)">
          <rect width="250" height="44" rx="12" fill="#fff" opacity="0.95"
                stroke="${c.stroke}" stroke-width="2"/>
          <text x="125" y="32" text-anchor="middle"
                class="box-label-text" fill="${c.stroke}"
                font-size="22" font-family="Quicksand, 'Comic Sans MS', sans-serif">${escapeXml(name)}</text>
        </g>
      </g>

      <!-- Dumpling (invisible al cerrar, aparece al abrir) -->
      <g class="dumpling-inside" transform="translate(100 90) scale(0.75)">
        ${dumplingSvg}
      </g>

      <!-- TAPA (se mueve hacia arriba al abrir) -->
      <g class="box-lid-top">
        <!-- Faldón cilíndrico de la tapa que abraza el rim de la base -->
        <path d="M 80 315 L 85 250 Q 250 235, 415 250 L 420 315 Q 250 330, 80 315 Z"
              fill="${c.fill}" stroke="${c.stroke}" stroke-width="3"/>
        ${verticalSlats(c.stroke, 85, 250, 415, 315)}
        <!-- Domo superior -->
        <ellipse cx="250" cy="250" rx="170" ry="26" fill="${darken(c.fill, 0.05)}" stroke="${c.stroke}" stroke-width="3"/>
        ${crissCross(c.stroke, 250, 250, 158, 22)}
        <!-- Pomo -->
        <circle cx="250" cy="250" r="13" fill="${c.stroke}"/>
        <circle cx="250" cy="250" r="6" fill="${c.fill}"/>
      </g>
    </svg>
  `;
}

/* ============ Cajita de regalo con moño ============ */
function renderRegalo(c, name, dumplingConfig) {
  const dumplingSvg = renderDumplingSVG(dumplingConfig);
  const ribbon = '#ff3d77';
  const ribbonDark = '#c43370';
  return `
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="250" cy="455" rx="170" ry="12" fill="rgba(0,0,0,0.28)"/>

      <!-- BASE -->
      <g>
        <!-- Caja -->
        <path d="M 80 430 L 80 250 L 420 250 L 420 430 Z"
              fill="${c.fill}" stroke="${c.stroke}" stroke-width="3" stroke-linejoin="round"/>
        <!-- Cinta vertical y horizontal del cuerpo -->
        <rect x="230" y="250" width="40" height="180" fill="${ribbon}" stroke="${ribbonDark}" stroke-width="2"/>

        <!-- Etiqueta -->
        <g transform="translate(120 350)">
          <rect width="260" height="50" rx="10" fill="#fff" stroke="${c.stroke}" stroke-width="2"/>
          <text x="130" y="33" text-anchor="middle"
                class="box-label-text" fill="${c.stroke}"
                font-size="24" font-family="Quicksand, 'Comic Sans MS', sans-serif">${escapeXml(name)}</text>
        </g>
      </g>

      <!-- Dumpling dentro -->
      <g class="dumpling-inside" transform="translate(100 80) scale(0.75)">
        ${dumplingSvg}
      </g>

      <!-- TAPA con moño (sube al abrir) -->
      <g class="box-lid-top">
        <path d="M 70 255 L 70 195 L 430 195 L 430 255 Z"
              fill="${darken(c.fill, 0.06)}" stroke="${c.stroke}" stroke-width="3" stroke-linejoin="round"/>
        <rect x="230" y="195" width="40" height="60" fill="${ribbon}" stroke="${ribbonDark}" stroke-width="2"/>

        <!-- Moño -->
        <g transform="translate(250 170)">
          <path d="M -50 -18 Q -75 -42, -75 6 Q -75 30, -40 22 L 0 14 L 40 22 Q 75 30, 75 6 Q 75 -42, 50 -18 Z"
                fill="${ribbon}" stroke="${ribbonDark}" stroke-width="2.5"/>
          <ellipse cx="-32" cy="4" rx="6" ry="3" fill="${ribbonDark}" opacity="0.4"/>
          <ellipse cx="32" cy="4" rx="6" ry="3" fill="${ribbonDark}" opacity="0.4"/>
          <path d="M -16 -18 L 16 -18 L 22 24 L -22 24 Z" fill="${ribbon}" stroke="${ribbonDark}" stroke-width="2.5"/>
          <circle cx="0" cy="5" r="7" fill="${ribbonDark}" opacity="0.3"/>
        </g>
      </g>
    </svg>
  `;
}

/* ============ Bento (tapa se separa en 2) ============ */
function renderBento(c, name, dumplingConfig) {
  const dumplingSvg = renderDumplingSVG(dumplingConfig);
  return `
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="250" cy="455" rx="170" ry="12" fill="rgba(0,0,0,0.28)"/>

      <!-- BASE -->
      <g>
        <path d="M 75 260 L 85 430 L 415 430 L 425 260 Z"
              fill="${c.fill}" stroke="${c.stroke}" stroke-width="3" stroke-linejoin="round"/>
        <!-- Interior oscuro -->
        <path d="M 95 270 L 100 395 L 400 395 L 405 270 Z" fill="${darken(c.fill, 0.3)}"/>
        <line x1="250" y1="270" x2="250" y2="395" stroke="${c.stroke}" stroke-width="2" opacity="0.5"/>

        <!-- Etiqueta -->
        <g transform="translate(120 405)">
          <rect width="260" height="28" rx="6" fill="#fff" opacity="0.95"
                stroke="${c.stroke}" stroke-width="1.5"/>
          <text x="130" y="20" text-anchor="middle"
                class="box-label-text" fill="${c.stroke}"
                font-size="18" font-family="Quicksand, 'Comic Sans MS', sans-serif">${escapeXml(name)}</text>
        </g>
      </g>

      <!-- Dumpling dentro -->
      <g class="dumpling-inside" transform="translate(100 75) scale(0.75)">
        ${dumplingSvg}
      </g>

      <!-- TAPA en 2 mitades -->
      <g class="box-lid-left">
        <path d="M 75 260 L 80 205 L 250 205 L 250 260 Z"
              fill="${darken(c.fill, 0.05)}" stroke="${c.stroke}" stroke-width="3"/>
        <rect x="100" y="222" width="60" height="6" rx="2" fill="${c.stroke}" opacity="0.55"/>
        <rect x="100" y="236" width="40" height="6" rx="2" fill="${c.stroke}" opacity="0.4"/>
      </g>
      <g class="box-lid-right">
        <path d="M 250 205 L 420 205 L 425 260 L 250 260 Z"
              fill="${darken(c.fill, 0.05)}" stroke="${c.stroke}" stroke-width="3"/>
        <circle cx="355" cy="230" r="13" fill="none" stroke="${c.stroke}" stroke-width="3"/>
        <circle cx="355" cy="230" r="5" fill="${c.stroke}"/>
      </g>
    </svg>
  `;
}

/* ============ helpers ============ */
function verticalSlats(color, x1, y1, x2, y2) {
  let s = '';
  const count = 14;
  for (let i = 1; i < count; i++) {
    const t = i / count;
    const x = x1 + (x2 - x1) * t;
    s += `<line x1="${x.toFixed(1)}" y1="${y1 + 5}" x2="${x.toFixed(1)}" y2="${y2 - 5}" stroke="${color}" stroke-width="1.2" opacity="0.45"/>`;
  }
  return s;
}

function crissCross(color, cx, cy, rx, ry) {
  let s = '';
  for (let i = -6; i <= 6; i++) {
    const xOff = (i / 6) * rx;
    s += `<line x1="${cx + xOff - rx*0.3}" y1="${cy - ry*0.8}" x2="${cx + xOff + rx*0.3}" y2="${cy + ry*0.8}" stroke="${color}" stroke-width="1" opacity="0.4"/>`;
    s += `<line x1="${cx + xOff - rx*0.3}" y1="${cy + ry*0.8}" x2="${cx + xOff + rx*0.3}" y2="${cy - ry*0.8}" stroke="${color}" stroke-width="1" opacity="0.4"/>`;
  }
  return s;
}

function darken(hex, amount) {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  let r = parseInt(v.substring(0, 2), 16);
  let g = parseInt(v.substring(2, 4), 16);
  let b = parseInt(v.substring(4, 6), 16);
  r = Math.max(0, Math.floor(r * (1 - amount)));
  g = Math.max(0, Math.floor(g * (1 - amount)));
  b = Math.max(0, Math.floor(b * (1 - amount)));
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function escapeXml(str) {
  return String(str).replace(/[<>&"']/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;'
  }[c]));
}
