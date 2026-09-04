/**
 * Lofi Girl aesthetic vector art & atmospheric vignette.
 * 
 * Includes:
 * - Cozy study window with rainy night or sunset sky & animated raindrops
 * - Ambient warm desk lamp with breathing glow cone
 * - Iconic Lofi Girl studying with headphones, ponytail, cozy sweater & notebook
 * - Sleeping ginger cat with rhythmic breathing animation
 * - Steaming coffee/matcha ceramic mug with animated rising steam
 * - Potted succulent / monstera plant
 * - Cassette tape / audio equalizer visualizer bars
 */

export function lofiVignette(theme, mode = "dark") {
  const isDark = mode === "dark";
  
  // Theme-specific colors
  const skyGrad = isDark
    ? `<linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0b0c16" />
        <stop offset="60%" stop-color="#191a2e" />
        <stop offset="100%" stop-color="#2a223f" />
       </linearGradient>`
    : `<linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fce7f3" />
        <stop offset="50%" stop-color="#fed7aa" />
        <stop offset="100%" stop-color="#e0e7ff" />
       </linearGradient>`;

  const lampConeGrad = isDark
    ? `<linearGradient id="lampCone" x1="0%" y1="0%" x2="40%" y2="100%">
        <stop offset="0%" stop-color="#f6ad55" stop-opacity="0.32" />
        <stop offset="40%" stop-color="#f6ad55" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#f6ad55" stop-opacity="0" />
       </linearGradient>`
    : `<linearGradient id="lampCone" x1="0%" y1="0%" x2="40%" y2="100%">
        <stop offset="0%" stop-color="#dd6b20" stop-opacity="0.22" />
        <stop offset="40%" stop-color="#dd6b20" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#dd6b20" stop-opacity="0" />
       </linearGradient>`;

  const deskColor = isDark ? "#211f30" : "#d8cbbe";
  const deskTopColor = isDark ? "#2c2a3f" : "#ebdcd0";
  const windowFrameColor = isDark ? "#1a1926" : "#c5b8aa";
  const girlSweater = isDark ? "#485b4d" : "#728a78"; // Cozy olive green sweater
  const girlHair = isDark ? "#382820" : "#4a3528";
  const girlSkin = isDark ? "#f3c7a5" : "#fed7aa";
  const catColor = isDark ? "#e08d58" : "#d97742";
  const catBelly = isDark ? "#fbe5d6" : "#fef3c7";
  const mugColor = isDark ? "#d8b4e2" : "#a78bfa";
  const potColor = isDark ? "#b45309" : "#c2410c";

  return `
    <defs>
      ${skyGrad}
      ${lampConeGrad}
      <filter id="cozyGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="lampBloom" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="12" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- VIGNETTE CONTAINER (330x215) -->
    <g class="lofi-vignette" transform="translate(0, 0)">
      <!-- 1. WINDOW WITH VIEW -->
      <g class="lofi-window">
        <!-- Window frame cutout -->
        <rect x="22" y="10" width="180" height="150" rx="8" fill="url(#skyGrad)" stroke="${windowFrameColor}" stroke-width="3" />
        
        <!-- Outside City Lights / Bokeh -->
        <circle cx="50" cy="90" r="3" fill="#fbd38d" opacity="0.6" class="tw d10" />
        <circle cx="85" cy="110" r="2" fill="#f687b3" opacity="0.5" class="tw d25" />
        <circle cx="130" cy="80" r="4" fill="#b794f4" opacity="0.4" class="tw d40" />
        <circle cx="165" cy="100" r="2.5" fill="#fbd38d" opacity="0.7" class="tw d15" />
        <circle cx="110" cy="65" r="1.5" fill="#68d391" opacity="0.5" class="tw d30" />
        
        <!-- Rain Streaks on Window Pane -->
        <g class="rain-streaks" opacity="${isDark ? '0.45' : '0.25'}">
          <line x1="45" y1="20" x2="40" y2="48" stroke="#a5b4fc" stroke-width="1.2" stroke-linecap="round" class="rain r1" />
          <line x1="80" y1="35" x2="75" y2="70" stroke="#a5b4fc" stroke-width="1.2" stroke-linecap="round" class="rain r2" />
          <line x1="120" y1="15" x2="115" y2="55" stroke="#a5b4fc" stroke-width="1.2" stroke-linecap="round" class="rain r3" />
          <line x1="155" y1="40" x2="150" y2="78" stroke="#a5b4fc" stroke-width="1.2" stroke-linecap="round" class="rain r1" />
          <line x1="65" y1="75" x2="60" y2="115" stroke="#a5b4fc" stroke-width="1.2" stroke-linecap="round" class="rain r2" />
          <line x1="140" y1="85" x2="135" y2="125" stroke="#a5b4fc" stroke-width="1.2" stroke-linecap="round" class="rain r3" />
        </g>

        <!-- Window mullions/bars -->
        <line x1="112" y1="10" x2="112" y2="160" stroke="${windowFrameColor}" stroke-width="2" />
        <line x1="22" y1="85" x2="202" y2="85" stroke="${windowFrameColor}" stroke-width="2" />
      </g>

      <!-- 2. HANGING / SILL PLANT -->
      <g class="sill-plant" transform="translate(30, 95)">
        <!-- Terracotta pot -->
        <polygon points="4,25 24,25 21,42 7,42" fill="${potColor}" />
        <rect x="2" y="23" width="24" height="3" rx="1.5" fill="#9a3412" />
        <!-- Cascading Monstera / Vine leaves -->
        <path d="M 14 23 Q 8 12 0 15 C 3 24 10 24 14 23 Z" fill="#48bb78" />
        <path d="M 16 23 Q 22 10 32 14 C 28 22 20 23 16 23 Z" fill="#38a169" />
        <path d="M 14 24 Q 10 35 4 45 C 10 44 14 36 14 24 Z" fill="#68d391" />
        <path d="M 17 24 Q 24 38 28 50 C 23 46 19 36 17 24 Z" fill="#48bb78" />
      </g>

      <!-- 3. DESK SURFACE -->
      <g class="desk-surface">
        <polygon points="10,160 325,160 320,182 5,182" fill="${deskTopColor}" />
        <rect x="5" y="182" width="315" height="18" fill="${deskColor}" />
      </g>

      <!-- 4. AMBIENT DESK LAMP (Left) -->
      <g class="desk-lamp" transform="translate(230, 25)">
        <!-- Lamp Light Cone Projection -->
        <polygon points="12,42 -140,155 40,155" fill="url(#lampCone)" class="lamp-glow-flicker" />
        
        <!-- Lamp Stand & Arm -->
        <path d="M 60 145 L 60 135 Q 60 65 30 50 L 14 44" fill="none" stroke="#d97706" stroke-width="3.5" stroke-linecap="round" />
        <!-- Lamp Base -->
        <ellipse cx="60" cy="145" rx="14" ry="4" fill="#b45309" />
        <!-- Lamp Shade (Conical brass/amber) -->
        <polygon points="5,32 30,42 12,56 -2,46" fill="#f59e0b" stroke="#b45309" stroke-width="1.5" />
        <!-- Bulb & Warm Core Glow -->
        <circle cx="10" cy="48" r="5" fill="#fef3c7" filter="url(#cozyGlow)" class="lamp-pulse" />
      </g>

      <!-- 5. LOFI GIRL (Studying at desk) -->
      <g class="lofi-girl" transform="translate(115, 68)">
        <!-- Back & Torso with cozy oversized sweater -->
        <!-- Sweater body -->
        <path d="M 45 46 Q 35 55 30 85 L 68 85 Q 70 65 62 48 Z" fill="${girlSweater}" />
        <!-- Sweater folds / shading -->
        <path d="M 38 62 Q 44 72 42 85" fill="none" stroke="#223326" stroke-width="1.5" opacity="0.4" />
        
        <!-- Arm reaching forward to write -->
        <!-- Upper arm -->
        <path d="M 52 50 Q 64 60 68 76" fill="none" stroke="${girlSweater}" stroke-width="12" stroke-linecap="round" />
        <!-- Forearm on desk -->
        <path d="M 68 76 L 86 78" fill="none" stroke="${girlSweater}" stroke-width="10" stroke-linecap="round" />
        <!-- Hand holding pen -->
        <circle cx="91" cy="78" r="4.5" fill="${girlSkin}" />
        <!-- Pen / Pencil -->
        <line x1="88" y1="83" x2="96" y2="72" stroke="#d97706" stroke-width="2" stroke-linecap="round" class="pen-write" />

        <!-- Open Study Notebook on Desk -->
        <g class="notebook" transform="translate(85, 78)">
          <polygon points="0,6 26,2 38,12 12,16" fill="#fefce8" stroke="${deskColor}" stroke-width="1" />
          <polygon points="0,6 -22,3 -12,13 12,16" fill="#fffbeb" stroke="${deskColor}" stroke-width="1" />
          <line x1="0" y1="6" x2="12" y2="16" stroke="#d97706" stroke-width="1" />
          <!-- Notebook lines -->
          <line x1="-16" y1="7" x2="-5" y2="9" stroke="#94a3b8" stroke-width="0.8" />
          <line x1="-14" y1="10" x2="-3" y2="12" stroke="#94a3b8" stroke-width="0.8" />
          <line x1="6" y1="9" x2="22" y2="6" stroke="#94a3b8" stroke-width="0.8" />
          <line x1="8" y1="12" x2="25" y2="9" stroke="#94a3b8" stroke-width="0.8" />
        </g>

        <!-- Neck -->
        <rect x="48" y="38" width="8" height="10" rx="3" fill="${girlSkin}" />

        <!-- Head profile -->
        <ellipse cx="56" cy="30" rx="9" ry="11" fill="${girlSkin}" />
        <!-- Cute cheek blush -->
        <circle cx="61" cy="33" r="2.5" fill="#f472b6" opacity="0.6" />
        <!-- Closed studying eye / eyelash -->
        <path d="M 61 29 Q 63 31 65 30" fill="none" stroke="${girlHair}" stroke-width="1.2" stroke-linecap="round" />

        <!-- Hair (Ponytail & bangs) -->
        <!-- Base hair -->
        <path d="M 46 28 Q 50 18 61 21 Q 67 24 64 34 Q 52 38 46 28 Z" fill="${girlHair}" />
        <!-- Bangs / front wisps -->
        <path d="M 58 20 Q 64 24 62 31" fill="none" stroke="${girlHair}" stroke-width="2.5" stroke-linecap="round" />
        <!-- Ponytail Scrunchie -->
        <ellipse cx="44" cy="27" rx="3" ry="4" fill="#e11d48" />
        <!-- Flowing ponytail -->
        <path d="M 44 28 Q 36 34 38 48 Q 44 42 43 32 Z" fill="${girlHair}" />

        <!-- Signature Over-Ear Headphones -->
        <!-- Headband -->
        <path d="M 46 28 Q 51 14 62 17" fill="none" stroke="#a78bfa" stroke-width="3" stroke-linecap="round" />
        <!-- Ear cup -->
        <rect x="49" y="24" width="7" height="12" rx="3.5" fill="#8b5cf6" stroke="#c4b5fd" stroke-width="1" />
        <!-- Inner headphone ring accent -->
        <circle cx="52.5" cy="30" r="2" fill="#ede9fe" />
      </g>

      <!-- 6. SLEEPING GINGER CAT (Curled on desk) -->
      <g class="sleeping-cat" transform="translate(58, 142)">
        <g class="cat-breathe">
          <!-- Soft sleeping cushion / rug -->
          <ellipse cx="22" cy="18" rx="24" ry="7" fill="${isDark ? '#3b2d54' : '#d8b4e2'}" opacity="0.6" />
          
          <!-- Cat Body (curled bean shape) -->
          <ellipse cx="20" cy="12" rx="15" ry="9" fill="${catColor}" />
          <!-- Fluffy belly patch -->
          <ellipse cx="22" cy="13" rx="10" ry="5.5" fill="${catBelly}" />
          <!-- Fur stripes -->
          <path d="M 16 6 Q 18 10 17 14" fill="none" stroke="#b45309" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 22 5 Q 23 9 22 13" fill="none" stroke="#b45309" stroke-width="1.2" stroke-linecap="round" />
          
          <!-- Cat Head -->
          <circle cx="33" cy="10" r="7" fill="${catColor}" />
          <!-- Cat Ears -->
          <polygon points="30,4 34,0 35,6" fill="${catColor}" />
          <polygon points="35,4 39,1 38,7" fill="${catColor}" />
          <polygon points="31,4 34,2 34,5" fill="#fda4af" />
          <!-- Peaceful closed sleeping eyes (^^) -->
          <path d="M 32 10 Q 33.5 12 35 10" fill="none" stroke="#78350f" stroke-width="0.9" stroke-linecap="round" />
          <path d="M 36 10 Q 37.5 12 39 10" fill="none" stroke="#78350f" stroke-width="0.9" stroke-linecap="round" />
          <!-- Tiny nose -->
          <circle cx="36" cy="13" r="0.8" fill="#f43f5e" />

          <!-- Curled Tail -->
          <path d="M 6 12 Q 2 16 6 20 Q 14 20 18 16" fill="none" stroke="${catColor}" stroke-width="3" stroke-linecap="round" />
          <!-- Tail white tip -->
          <circle cx="6" cy="12" r="1.8" fill="${catBelly}" />
        </g>
      </g>

      <!-- 7. STEAMING CERAMIC MUG -->
      <g class="steaming-mug" transform="translate(216, 142)">
        <!-- Mug body -->
        <rect x="0" y="4" width="14" height="14" rx="3" fill="${mugColor}" />
        <!-- Mug handle -->
        <path d="M 14 7 Q 19 7 19 11 Q 19 15 14 15" fill="none" stroke="${mugColor}" stroke-width="2" />
        <!-- Coffee surface -->
        <ellipse cx="7" cy="4" rx="6" ry="2" fill="#451a03" />
        <!-- Heart / decal on mug -->
        <circle cx="7" cy="11" r="2" fill="#ffffff" opacity="0.8" />
        
        <!-- Animated Steam Wisps Rising -->
        <g class="steam-wisp s1">
          <path d="M 5 2 Q 2 -5 6 -11 T 5 -18" fill="none" stroke="#f8fafc" stroke-width="1.2" stroke-linecap="round" opacity="0.6" />
        </g>
        <g class="steam-wisp s2">
          <path d="M 9 2 Q 13 -4 10 -10 T 11 -16" fill="none" stroke="#f8fafc" stroke-width="1.2" stroke-linecap="round" opacity="0.5" />
        </g>
      </g>
    </g>
  `;
}

/**
 * Animated Audio Equalizer / Music Player Widget.
 */
export function lofiPlayer(x, y, theme, mode = "dark") {
  const isDark = mode === "dark";
  const pillBg = isDark ? "#1f1d2e" : "#efe6da";
  const pillBorder = isDark ? "#35324b" : "#ddd2c4";
  const textColor = isDark ? "#f3e8ff" : "#4a3b32";
  const accentColor = isDark ? "#c084fc" : "#9333ea";

  return `
    <g class="lofi-player rise d15" transform="translate(${x}, ${y})">
      <!-- Player pill frame -->
      <rect x="0" y="0" width="310" height="32" rx="16" fill="${pillBg}" stroke="${pillBorder}" stroke-width="1" />
      
      <!-- Cassette / Headphone Pulse Icon -->
      <g transform="translate(14, 8) scale(0.66)">
        <path d="M12 3a9 9 0 0 0-9 9v7a3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5v-2a7 7 0 0 1 14 0v2h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1a3 3 0 0 0 3-3v-7a9 9 0 0 0-9-9z" fill="${accentColor}" />
      </g>

      <!-- Now Playing Text -->
      <text x="36" y="20" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="11" font-weight="600" fill="${textColor}">
        NOW PLAYING:
      </text>
      <text x="120" y="20" font-family="ui-monospace, SFMono-Regular, monospace" font-size="10.5" font-weight="400" fill="${theme.muted}">
        lofi girl — beats to relax/code to
      </text>

      <!-- Animated Equalizer Bars -->
      <g class="eq-bars" transform="translate(268, 11)">
        <rect x="0" y="0" width="3" height="12" rx="1.5" fill="${accentColor}" class="eq-bar b1" />
        <rect x="5" y="0" width="3" height="12" rx="1.5" fill="#f6ad55" class="eq-bar b2" />
        <rect x="10" y="0" width="3" height="12" rx="1.5" fill="#f687b3" class="eq-bar b3" />
        <rect x="15" y="0" width="3" height="12" rx="1.5" fill="#68d391" class="eq-bar b4" />
        <rect x="20" y="0" width="3" height="12" rx="1.5" fill="${accentColor}" class="eq-bar b5" />
      </g>
    </g>
  `;
}
