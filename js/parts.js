/**
 * Catálogo de partes del dumpling.
 *
 * Sistema de coordenadas del dumpling: viewBox 0 0 400 400.
 * Centro del cuerpo aprox: (200, 230). El cuerpo va de y≈90 (pleats) a y≈360.
 * Las partes (ojos, boca, blush, accesorios) se colocan con coordenadas absolutas
 * dentro de ese viewBox.
 *
 * Cada parte exporta el SVG markup como string que se inyecta dentro del SVG principal.
 */

/* ============ Colores del dumpling ============ */
export const DUMPLING_COLORS = [
  { id: 'cream',   name: 'Crema',    fill: '#fff0d4', stroke: '#8a5530' },
  { id: 'pink',    name: 'Rosa',     fill: '#ffd1e0', stroke: '#d97aa1' },
  { id: 'matcha',  name: 'Matcha',   fill: '#cde6b4', stroke: '#7ea863' },
  { id: 'taro',    name: 'Taro',     fill: '#e4d0f5', stroke: '#9577b8' },
  { id: 'choco',   name: 'Chocolate',fill: '#b88b67', stroke: '#6e4a30' },
  { id: 'yellow',  name: 'Amarillo', fill: '#fff0a3', stroke: '#d4ad42' },
  { id: 'orange',  name: 'Naranja',  fill: '#ffc89e', stroke: '#cc8245' },
  { id: 'sky',     name: 'Cielo',    fill: '#cde9ff', stroke: '#6ba0d4' },
  { id: 'mint',    name: 'Menta',    fill: '#c4f0e2', stroke: '#5cb09a' },
  { id: 'lavender',name: 'Lavanda',  fill: '#d9cef5', stroke: '#8b78c2' },
  { id: 'peach',   name: 'Durazno',  fill: '#ffd6b8', stroke: '#d99466' },
  { id: 'red',     name: 'Rojo',     fill: '#ff9e9e', stroke: '#c75050' },
];

/* ============ Ojos ============
   Posición de referencia: ojo izquierdo en (155, 220), ojo derecho en (245, 220).
   Distancia entre ojos ~90px. */
export const EYES = [
  {
    id: 'sparkle', name: 'Brillantes',
    svg: () => `
      <g>
        <ellipse cx="155" cy="220" rx="18" ry="22" fill="#2a1a3a"/>
        <ellipse cx="245" cy="220" rx="18" ry="22" fill="#2a1a3a"/>
        <circle cx="161" cy="213" r="6" fill="#fff"/>
        <circle cx="251" cy="213" r="6" fill="#fff"/>
        <circle cx="149" cy="226" r="3" fill="#fff"/>
        <circle cx="239" cy="226" r="3" fill="#fff"/>
      </g>`
  },
  {
    id: 'dots', name: 'Puntitos',
    svg: () => `
      <g fill="#2a1a3a">
        <circle cx="155" cy="220" r="9"/>
        <circle cx="245" cy="220" r="9"/>
      </g>`
  },
  {
    id: 'happy', name: 'Felices',
    svg: () => `
      <g fill="none" stroke="#2a1a3a" stroke-width="6" stroke-linecap="round">
        <path d="M 140 220 Q 155 200 170 220"/>
        <path d="M 230 220 Q 245 200 260 220"/>
      </g>`
  },
  {
    id: 'heart', name: 'Corazón',
    svg: () => `
      <g fill="#ff3d77">
        <path d="M 155 215 c -10 -12, -25 -4, -18 8 c 4 7, 18 16, 18 16 c 0 0, 14 -9, 18 -16 c 7 -12, -8 -20, -18 -8 z"/>
        <path d="M 245 215 c -10 -12, -25 -4, -18 8 c 4 7, 18 16, 18 16 c 0 0, 14 -9, 18 -16 c 7 -12, -8 -20, -18 -8 z"/>
      </g>`
  },
  {
    id: 'star', name: 'Estrellas',
    svg: () => `
      <g fill="#ffd23f" stroke="#c89a2a" stroke-width="1.5">
        <path d="M 155 198 L 161 214 L 178 215 L 165 226 L 169 242 L 155 233 L 141 242 L 145 226 L 132 215 L 149 214 Z"/>
        <path d="M 245 198 L 251 214 L 268 215 L 255 226 L 259 242 L 245 233 L 231 242 L 235 226 L 222 215 L 239 214 Z"/>
      </g>`
  },
  {
    id: 'sleepy', name: 'Dormido',
    svg: () => `
      <g fill="none" stroke="#2a1a3a" stroke-width="6" stroke-linecap="round">
        <path d="M 140 222 Q 155 240 170 222"/>
        <path d="M 230 222 Q 245 240 260 222"/>
      </g>`
  },
  {
    id: 'wink', name: 'Guiño',
    svg: () => `
      <g>
        <ellipse cx="155" cy="220" rx="14" ry="18" fill="#2a1a3a"/>
        <circle cx="160" cy="214" r="5" fill="#fff"/>
        <path d="M 230 222 Q 245 205 260 222" fill="none" stroke="#2a1a3a" stroke-width="6" stroke-linecap="round"/>
      </g>`
  },
  {
    id: 'kawaii', name: 'Kawaii',
    svg: () => `
      <g>
        <path d="M 140 215 Q 155 195 170 215 Q 168 232 155 235 Q 142 232 140 215 Z" fill="#2a1a3a"/>
        <path d="M 230 215 Q 245 195 260 215 Q 258 232 245 235 Q 232 232 230 215 Z" fill="#2a1a3a"/>
        <circle cx="158" cy="208" r="5" fill="#fff"/>
        <circle cx="248" cy="208" r="5" fill="#fff"/>
        <circle cx="150" cy="222" r="3" fill="#fff"/>
        <circle cx="240" cy="222" r="3" fill="#fff"/>
      </g>`
  },
  {
    id: 'surprised', name: 'Sorpresa',
    svg: () => `
      <g>
        <circle cx="155" cy="220" r="14" fill="#fff" stroke="#2a1a3a" stroke-width="3"/>
        <circle cx="245" cy="220" r="14" fill="#fff" stroke="#2a1a3a" stroke-width="3"/>
        <circle cx="155" cy="220" r="6" fill="#2a1a3a"/>
        <circle cx="245" cy="220" r="6" fill="#2a1a3a"/>
      </g>`
  },
  {
    id: 'cat', name: 'Gatito',
    svg: () => `
      <g fill="none" stroke="#2a1a3a" stroke-width="6" stroke-linecap="round">
        <path d="M 138 215 Q 155 235 172 215"/>
        <path d="M 228 215 Q 245 235 262 215"/>
      </g>`
  },
];

/* ============ Bocas ============
   Centro de boca: (200, 280) */
export const MOUTHS = [
  {
    id: 'smile', name: 'Sonrisa',
    svg: () => `<path d="M 175 275 Q 200 295 225 275" fill="none" stroke="#2a1a3a" stroke-width="5" stroke-linecap="round"/>`
  },
  {
    id: 'big-smile', name: 'Risota',
    svg: () => `
      <g>
        <path d="M 170 270 Q 200 305 230 270 Q 230 285 200 290 Q 170 285 170 270 Z" fill="#3a1820"/>
        <path d="M 178 281 Q 200 292 222 281 Q 215 295 200 296 Q 185 295 178 281 Z" fill="#ff6b8a"/>
      </g>`
  },
  {
    id: 'tongue', name: 'Lengua',
    svg: () => `
      <g>
        <path d="M 180 273 Q 200 287 220 273" fill="none" stroke="#2a1a3a" stroke-width="5" stroke-linecap="round"/>
        <path d="M 192 283 Q 200 302 210 290 Q 215 282 208 280 Z" fill="#ff7ba0" stroke="#c25072" stroke-width="2"/>
      </g>`
  },
  {
    id: 'kiss', name: 'Besito',
    svg: () => `
      <g>
        <path d="M 190 275 Q 200 268 210 275 Q 210 285 200 287 Q 190 285 190 275 Z" fill="#ff4d7c"/>
        <ellipse cx="200" cy="275" rx="3" ry="2" fill="#ffaecb" opacity="0.7"/>
      </g>`
  },
  {
    id: 'cat-mouth', name: 'Gatito',
    svg: () => `
      <g fill="none" stroke="#2a1a3a" stroke-width="4.5" stroke-linecap="round">
        <path d="M 200 273 L 200 280"/>
        <path d="M 200 280 Q 192 290 184 282"/>
        <path d="M 200 280 Q 208 290 216 282"/>
      </g>`
  },
  {
    id: 'o', name: 'Sorprendido',
    svg: () => `<ellipse cx="200" cy="282" rx="9" ry="12" fill="#3a1820"/>`
  },
  {
    id: 'tooth', name: 'Dientito',
    svg: () => `
      <g>
        <path d="M 178 273 Q 200 292 222 273" fill="none" stroke="#2a1a3a" stroke-width="5" stroke-linecap="round"/>
        <rect x="194" y="280" width="9" height="11" rx="2" fill="#ffffff" stroke="#2a1a3a" stroke-width="2"/>
      </g>`
  },
  {
    id: 'smirk', name: 'Picarón',
    svg: () => `<path d="M 180 280 Q 200 288 222 272" fill="none" stroke="#2a1a3a" stroke-width="5" stroke-linecap="round"/>`
  },
  {
    id: 'worried', name: 'Preocupado',
    svg: () => `<path d="M 178 286 Q 200 270 222 286" fill="none" stroke="#2a1a3a" stroke-width="5" stroke-linecap="round"/>`
  },
  {
    id: 'none', name: 'Sin boca',
    svg: () => ``
  },
];

/* ============ Blush / Cachetes ============
   Mejilla izquierda (130, 260), derecha (270, 260) */
export const BLUSH = [
  {
    id: 'none', name: 'Sin',
    svg: () => ``
  },
  {
    id: 'pink', name: 'Rositas',
    svg: () => `
      <g fill="#ff8fb5" opacity="0.7">
        <ellipse cx="125" cy="265" rx="18" ry="10"/>
        <ellipse cx="275" cy="265" rx="18" ry="10"/>
      </g>`
  },
  {
    id: 'red', name: 'Rojitas',
    svg: () => `
      <g fill="#ff5470" opacity="0.7">
        <circle cx="125" cy="265" r="11"/>
        <circle cx="275" cy="265" r="11"/>
      </g>`
  },
  {
    id: 'heart', name: 'Corazones',
    svg: () => `
      <g fill="#ff5491">
        <path d="M 125 258 c -8 -10, -22 -2, -16 8 c 4 6, 16 14, 16 14 c 0 0, 12 -8, 16 -14 c 6 -10, -8 -18, -16 -8 z"/>
        <path d="M 275 258 c -8 -10, -22 -2, -16 8 c 4 6, 16 14, 16 14 c 0 0, 12 -8, 16 -14 c 6 -10, -8 -18, -16 -8 z"/>
      </g>`
  },
  {
    id: 'stripes', name: 'Rayitas',
    svg: () => `
      <g stroke="#e87597" stroke-width="3" stroke-linecap="round">
        <line x1="115" y1="262" x2="135" y2="262"/>
        <line x1="118" y1="270" x2="132" y2="270"/>
        <line x1="265" y1="262" x2="285" y2="262"/>
        <line x1="268" y1="270" x2="282" y2="270"/>
      </g>`
  },
  {
    id: 'sparkle', name: 'Brillito',
    svg: () => `
      <g fill="#ff8fb5" opacity="0.65">
        <ellipse cx="125" cy="265" rx="16" ry="9"/>
        <ellipse cx="275" cy="265" rx="16" ry="9"/>
      </g>
      <g fill="#fff">
        <path d="M 122 260 l 1.5 3 l 3 1.5 l -3 1.5 l -1.5 3 l -1.5 -3 l -3 -1.5 l 3 -1.5 z"/>
        <path d="M 278 268 l 1.5 3 l 3 1.5 l -3 1.5 l -1.5 3 l -1.5 -3 l -3 -1.5 l 3 -1.5 z"/>
      </g>`
  },
];

/* ============ Accesorios (cada uno con su categoría y posición) ============ */
export const ACCESSORIES = [
  // ---- HATS (encima del cuerpo, ~y=40-110) ----
  {
    id: 'hat-bow', name: 'Moñito', category: 'Sombreros',
    svg: () => `
      <g transform="translate(200 90)">
        <path d="M -30 -10 Q -45 -25, -45 0 Q -45 15, -22 8 L 0 5 L 22 8 Q 45 15, 45 0 Q 45 -25, 30 -10 Z" fill="#ff5491" stroke="#c43370" stroke-width="2"/>
        <path d="M -8 -10 L 8 -10 L 12 12 L -12 12 Z" fill="#ff5491" stroke="#c43370" stroke-width="2"/>
        <circle cx="0" cy="0" r="5" fill="#fff" opacity="0.4"/>
      </g>`
  },
  {
    id: 'hat-crown', name: 'Corona', category: 'Sombreros',
    svg: () => `
      <g transform="translate(140 50)">
        <path d="M 0 40 L 10 10 L 25 30 L 40 5 L 55 30 L 70 10 L 80 35 L 80 50 L 0 50 Z"
              fill="#ffd23f" stroke="#cc9a1d" stroke-width="3" stroke-linejoin="round"/>
        <circle cx="40" cy="8" r="4" fill="#ff5491"/>
        <circle cx="10" cy="13" r="3" fill="#5fa8ff"/>
        <circle cx="70" cy="13" r="3" fill="#7ed957"/>
      </g>`
  },
  {
    id: 'hat-top', name: 'Sombrero', category: 'Sombreros',
    svg: () => `
      <g transform="translate(155 30)">
        <rect x="0" y="50" width="90" height="10" rx="3" fill="#2a1a3a"/>
        <rect x="15" y="0" width="60" height="55" rx="4" fill="#2a1a3a"/>
        <rect x="15" y="40" width="60" height="8" fill="#ff5491"/>
      </g>`
  },
  {
    id: 'hat-witch', name: 'Bruja', category: 'Sombreros',
    svg: () => `
      <g transform="translate(140 10)">
        <ellipse cx="50" cy="80" rx="55" ry="9" fill="#3a1840"/>
        <path d="M 50 0 L 90 80 L 10 80 Z" fill="#5a2860" stroke="#3a1840" stroke-width="3"/>
        <path d="M 25 65 Q 35 60, 50 62 Q 65 60, 75 65 L 75 72 Q 50 78, 25 72 Z" fill="#ffd23f"/>
        <path d="M 45 25 L 55 25 L 50 35 Z" fill="#ffd23f"/>
      </g>`
  },
  {
    id: 'hat-party', name: 'Fiesta', category: 'Sombreros',
    svg: () => `
      <g transform="translate(160 20)">
        <path d="M 40 0 L 75 70 L 5 70 Z" fill="#ff5491" stroke="#c43370" stroke-width="2"/>
        <circle cx="20" cy="55" r="3" fill="#fff"/>
        <circle cx="50" cy="40" r="3" fill="#ffd23f"/>
        <circle cx="55" cy="60" r="3" fill="#7ed957"/>
        <circle cx="40" cy="0" r="6" fill="#ffd23f"/>
      </g>`
  },
  {
    id: 'hat-flower', name: 'Florecita', category: 'Sombreros',
    svg: () => `
      <g transform="translate(170 60)">
        <g transform="translate(30 30)">
          <circle r="10" cx="0" cy="-12" fill="#ff7eb6"/>
          <circle r="10" cx="-12" cy="0" fill="#ff7eb6"/>
          <circle r="10" cx="12" cy="0" fill="#ff7eb6"/>
          <circle r="10" cx="-7" cy="9" fill="#ff7eb6"/>
          <circle r="10" cx="7" cy="9" fill="#ff7eb6"/>
          <circle r="7" fill="#ffd23f"/>
        </g>
      </g>`
  },
  {
    id: 'hat-cap', name: 'Gorra', category: 'Sombreros',
    svg: () => `
      <g transform="translate(140 65)">
        <path d="M 0 40 Q 0 10, 40 8 Q 80 10, 80 35 L 80 45 L 0 45 Z" fill="#5b8dee" stroke="#3068c4" stroke-width="2"/>
        <path d="M 60 45 Q 80 50, 95 50 L 95 55 L 60 55 Z" fill="#3068c4"/>
        <circle cx="40" cy="28" r="6" fill="#fff"/>
      </g>`
  },

  // ---- HAIR (debajo del top, alrededor del cuerpo) ----
  {
    id: 'hair-pigtails', name: 'Coletas', category: 'Pelo',
    svg: () => `
      <g>
        <path d="M 70 200 Q 50 240 60 290 Q 70 320 95 320 Q 85 290 95 260 Z" fill="#6a3a1a" stroke="#3a1a08" stroke-width="2"/>
        <path d="M 330 200 Q 350 240 340 290 Q 330 320 305 320 Q 315 290 305 260 Z" fill="#6a3a1a" stroke="#3a1a08" stroke-width="2"/>
        <path d="M 110 130 Q 200 90 290 130 Q 280 110 200 100 Q 120 110 110 130 Z" fill="#6a3a1a"/>
      </g>`
  },
  {
    id: 'hair-long', name: 'Pelo largo', category: 'Pelo',
    svg: () => `
      <g>
        <path d="M 70 180 Q 60 260 70 340 Q 80 360 100 340 Q 110 270 120 200 Z" fill="#3a1f10" stroke="#1a0e06" stroke-width="2"/>
        <path d="M 330 180 Q 340 260 330 340 Q 320 360 300 340 Q 290 270 280 200 Z" fill="#3a1f10" stroke="#1a0e06" stroke-width="2"/>
        <path d="M 110 120 Q 200 80 290 120 L 285 145 Q 200 105 115 145 Z" fill="#3a1f10"/>
      </g>`
  },
  {
    id: 'hair-bun', name: 'Chongo', category: 'Pelo',
    svg: () => `
      <g>
        <circle cx="200" cy="65" r="32" fill="#4a2818" stroke="#2a1208" stroke-width="2"/>
        <path d="M 130 130 Q 200 100 270 130 Q 260 110 200 105 Q 140 110 130 130 Z" fill="#4a2818"/>
        <circle cx="200" cy="65" r="6" fill="#ff7eb6" opacity="0.8"/>
      </g>`
  },
  {
    id: 'hair-curly', name: 'Rizos', category: 'Pelo',
    svg: () => `
      <g fill="#ffb84d" stroke="#cc8a2a" stroke-width="2">
        <circle cx="120" cy="125" r="18"/>
        <circle cx="155" cy="105" r="18"/>
        <circle cx="200" cy="98" r="20"/>
        <circle cx="245" cy="105" r="18"/>
        <circle cx="280" cy="125" r="18"/>
        <circle cx="100" cy="155" r="15"/>
        <circle cx="300" cy="155" r="15"/>
      </g>`
  },

  // ---- GLASSES ----
  {
    id: 'glasses-round', name: 'Redondos', category: 'Lentes',
    svg: () => `
      <g fill="none" stroke="#2a1a3a" stroke-width="5">
        <circle cx="155" cy="220" r="28"/>
        <circle cx="245" cy="220" r="28"/>
        <line x1="183" y1="220" x2="217" y2="220"/>
      </g>`
  },
  {
    id: 'glasses-heart', name: 'Corazón', category: 'Lentes',
    svg: () => `
      <g fill="none" stroke="#ff3d77" stroke-width="5">
        <path d="M 155 240 c -22 -16, -38 -38, -25 -50 c 10 -10, 20 -2, 25 4 c 5 -6, 15 -14, 25 -4 c 13 12, -3 34, -25 50 Z"/>
        <path d="M 245 240 c -22 -16, -38 -38, -25 -50 c 10 -10, 20 -2, 25 4 c 5 -6, 15 -14, 25 -4 c 13 12, -3 34, -25 50 Z"/>
        <line x1="180" y1="220" x2="220" y2="220" stroke="#ff3d77"/>
      </g>`
  },
  {
    id: 'glasses-star', name: 'Estrella', category: 'Lentes',
    svg: () => `
      <g fill="none" stroke="#ffd23f" stroke-width="4">
        <path d="M 155 195 L 162 215 L 184 215 L 167 228 L 173 250 L 155 237 L 137 250 L 143 228 L 126 215 L 148 215 Z"/>
        <path d="M 245 195 L 252 215 L 274 215 L 257 228 L 263 250 L 245 237 L 227 250 L 233 228 L 216 215 L 238 215 Z"/>
        <line x1="184" y1="222" x2="216" y2="222" stroke="#ffd23f"/>
      </g>`
  },
  {
    id: 'glasses-sun', name: 'Sol', category: 'Lentes',
    svg: () => `
      <g>
        <rect x="125" y="200" width="60" height="36" rx="8" fill="#2a1a3a" stroke="#000" stroke-width="2"/>
        <rect x="215" y="200" width="60" height="36" rx="8" fill="#2a1a3a" stroke="#000" stroke-width="2"/>
        <line x1="185" y1="218" x2="215" y2="218" stroke="#000" stroke-width="4"/>
        <rect x="135" y="208" width="14" height="10" rx="2" fill="#fff" opacity="0.35"/>
        <rect x="225" y="208" width="14" height="10" rx="2" fill="#fff" opacity="0.35"/>
      </g>`
  },

  // ---- EARRINGS (a los lados del cuerpo) ----
  {
    id: 'earrings-pearl', name: 'Perlas', category: 'Aretes',
    svg: () => `
      <g>
        <circle cx="90" cy="245" r="8" fill="#fff" stroke="#d0c0d8" stroke-width="2"/>
        <circle cx="90" cy="245" r="3" fill="#fff8" />
        <circle cx="310" cy="245" r="8" fill="#fff" stroke="#d0c0d8" stroke-width="2"/>
        <circle cx="310" cy="245" r="3" fill="#fff8" />
      </g>`
  },
  {
    id: 'earrings-heart', name: 'Corazoncitos', category: 'Aretes',
    svg: () => `
      <g fill="#ff3d77">
        <path d="M 90 240 c -7 -8, -18 -2, -13 6 c 3 5, 13 12, 13 12 c 0 0, 10 -7, 13 -12 c 5 -8, -6 -14, -13 -6 z"/>
        <path d="M 310 240 c -7 -8, -18 -2, -13 6 c 3 5, 13 12, 13 12 c 0 0, 10 -7, 13 -12 c 5 -8, -6 -14, -13 -6 z"/>
      </g>`
  },
  {
    id: 'earrings-star', name: 'Estrellitas', category: 'Aretes',
    svg: () => `
      <g fill="#ffd23f" stroke="#c89a2a" stroke-width="1.5">
        <path d="M 90 235 L 94 246 L 105 247 L 96 254 L 99 264 L 90 258 L 81 264 L 84 254 L 75 247 L 86 246 Z"/>
        <path d="M 310 235 L 314 246 L 325 247 L 316 254 L 319 264 L 310 258 L 301 264 L 304 254 L 295 247 L 306 246 Z"/>
      </g>`
  },
  {
    id: 'earrings-hoop', name: 'Arillos', category: 'Aretes',
    svg: () => `
      <g fill="none" stroke="#ffd23f" stroke-width="3">
        <circle cx="90" cy="250" r="10"/>
        <circle cx="310" cy="250" r="10"/>
      </g>`
  },

  // ---- EXTRA ----
  {
    id: 'scarf', name: 'Bufanda', category: 'Extras',
    svg: () => `
      <g>
        <path d="M 105 320 Q 200 350 295 320 L 295 348 Q 200 372 105 348 Z" fill="#ff5491" stroke="#c43370" stroke-width="2"/>
        <path d="M 200 350 L 215 395 L 240 392 L 220 350 Z" fill="#ff5491" stroke="#c43370" stroke-width="2"/>
        <line x1="118" y1="333" x2="282" y2="333" stroke="#fff" stroke-width="3" stroke-dasharray="6 8" opacity="0.6"/>
      </g>`
  },
  {
    id: 'mustache', name: 'Bigote', category: 'Extras',
    svg: () => `
      <g fill="#2a1a3a">
        <path d="M 200 268 Q 175 258, 165 268 Q 170 280, 200 275 Q 230 280, 235 268 Q 225 258, 200 268 Z"/>
      </g>`
  },
  {
    id: 'freckles', name: 'Pecas', category: 'Extras',
    svg: () => `
      <g fill="#a87349" opacity="0.7">
        <circle cx="135" cy="252" r="2"/>
        <circle cx="142" cy="262" r="2"/>
        <circle cx="128" cy="267" r="2"/>
        <circle cx="265" cy="252" r="2"/>
        <circle cx="258" cy="262" r="2"/>
        <circle cx="272" cy="267" r="2"/>
      </g>`
  },
  {
    id: 'necklace', name: 'Collar', category: 'Extras',
    svg: () => `
      <g>
        <path d="M 115 330 Q 200 360 285 330" fill="none" stroke="#ffd23f" stroke-width="3"/>
        <circle cx="200" cy="362" r="7" fill="#ff3d77" stroke="#c43370" stroke-width="1.5"/>
      </g>`
  },
];

/* ============ Cajitas ============ */
export const BOXES = [
  { id: 'vaporera', name: 'Vaporera', emoji: '🥢' },
  { id: 'regalo',   name: 'Regalo',   emoji: '🎁' },
  { id: 'bento',    name: 'Bento',    emoji: '🍱' },
];

/* ============ Colores de cajita ============ */
export const BOX_COLORS = [
  { id: 'bamboo', name: 'Bambú',    fill: '#d9a877', stroke: '#9b6e3f' },
  { id: 'red',    name: 'Rojo',     fill: '#e74c5c', stroke: '#a92938' },
  { id: 'pink',   name: 'Rosa',     fill: '#ff8fb5', stroke: '#cc5e85' },
  { id: 'blue',   name: 'Azul',     fill: '#5b8dee', stroke: '#3068c4' },
  { id: 'green',  name: 'Verde',    fill: '#7ed957', stroke: '#4fa12a' },
  { id: 'purple', name: 'Morado',   fill: '#b066ff', stroke: '#7a3fcc' },
  { id: 'yellow', name: 'Amarillo', fill: '#ffd23f', stroke: '#c89a2a' },
  { id: 'mint',   name: 'Menta',    fill: '#7ee2c6', stroke: '#3da88f' },
  { id: 'black',  name: 'Negro',    fill: '#3a2a44', stroke: '#1a0e22' },
  { id: 'white',  name: 'Blanco',   fill: '#ffffff', stroke: '#cccccc' },
];

/* Resolvers para encontrar opciones por id */
export const findColor = (id) => DUMPLING_COLORS.find(c => c.id === id) || DUMPLING_COLORS[0];
export const findEyes = (id) => EYES.find(e => e.id === id) || EYES[0];
export const findMouth = (id) => MOUTHS.find(m => m.id === id) || MOUTHS[0];
export const findBlush = (id) => BLUSH.find(b => b.id === id) || BLUSH[0];
export const findAccessory = (id) => ACCESSORIES.find(a => a.id === id);
export const findBox = (id) => BOXES.find(b => b.id === id) || BOXES[0];
export const findBoxColor = (id) => BOX_COLORS.find(c => c.id === id) || BOX_COLORS[0];
