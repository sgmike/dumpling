/**
 * Renderiza el SVG completo del dumpling según su config.
 * viewBox 400x400. Cuerpo centrado en (200, 230).
 */

import {
  findColor, findEyes, findMouth, findBlush, findAccessory,
  ACCESSORIES,
} from './parts.js';

/**
 * config = {
 *   color: 'cream' | 'pink' | ...,
 *   eyes: 'sparkle' | ...,
 *   mouth: 'smile' | ...,
 *   blush: 'pink' | 'none' | ...,
 *   accessories: ['hat-bow', 'glasses-heart', ...],
 *   colorCustom?: '#hexstring'  // si se eligió color personalizado
 * }
 */
export function renderDumplingSVG(config, { interactive = false } = {}) {
  const color = config.colorCustom
    ? { fill: config.colorCustom, stroke: darken(config.colorCustom, 0.35) }
    : findColor(config.color);

  const eyes = findEyes(config.eyes);
  const mouth = findMouth(config.mouth);
  const blush = findBlush(config.blush);

  // Separar accesorios por categoría para ordenar las capas correctamente
  const selectedAccs = (config.accessories || [])
    .map(id => findAccessory(id))
    .filter(Boolean);

  // El pelo se renderiza ANTES del cuerpo (atrás), todo lo demás encima.
  const hairAccs = selectedAccs.filter(a => a.category === 'Pelo');
  const frontAccs = selectedAccs.filter(a => a.category !== 'Pelo' && a.category !== 'Sombreros');
  const hatAccs = selectedAccs.filter(a => a.category === 'Sombreros');

  return `
    <svg class="dumpling-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <!-- Pelo detrás del cuerpo -->
      ${hairAccs.map(a => a.svg()).join('')}

      <!-- Sombra base -->
      <ellipse cx="200" cy="372" rx="118" ry="11" fill="rgba(40,20,50,0.20)"/>

      <!-- Cuerpo: forma de bao/dumpling kawaii (más ancho que alto) -->
      <g class="body">
        <path d="
          M 55 232
          C 55 150, 112 105, 200 105
          C 288 105, 345 150, 345 232
          C 345 312, 285 358, 200 358
          C 115 358, 55 312, 55 232 Z"
          fill="${color.fill}"
          stroke="${color.stroke}"
          stroke-width="7"
          stroke-linejoin="round"/>

        <!-- Brillito tipo sticker en el cuerpo -->
        <ellipse cx="138" cy="195" rx="42" ry="22" fill="#ffffff" opacity="0.4" transform="rotate(-22 138 195)"/>

        <!-- Pliegues: líneas que salen de un nudito central arriba -->
        <g class="pleat" stroke="${color.stroke}" stroke-width="5.5" stroke-linecap="round" fill="none">
          <path d="M 200 116 C 172 134, 122 150, 76 202"/>
          <path d="M 200 116 C 186 132, 148 150, 124 188"/>
          <path d="M 200 116 C 196 128, 175 150, 170 182"/>
          <path d="M 200 116 C 204 128, 225 150, 230 182"/>
          <path d="M 200 116 C 214 132, 252 150, 276 188"/>
          <path d="M 200 116 C 228 134, 278 150, 324 202"/>
        </g>

        <!-- Nudito central donde se juntan los pliegues -->
        <ellipse cx="200" cy="112" rx="7" ry="5" fill="${color.stroke}"/>
      </g>

      <!-- Cara: blush, ojos, boca -->
      ${blush.svg()}
      ${eyes.svg()}
      ${mouth.svg()}

      <!-- Accesorios frontales (lentes, aretes, bufanda, etc.) -->
      ${frontAccs.map(a => a.svg()).join('')}

      <!-- Sombreros encima de todo -->
      ${hatAccs.map(a => a.svg()).join('')}
    </svg>
  `;
}

/** Oscurece un color hex en una proporción (0-1) */
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

/** Versión miniatura para la galería: SVG dentro de un fondo de cajita simplificado */
export function renderThumbnail(config) {
  return renderDumplingSVG(config);
}
