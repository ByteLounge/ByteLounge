/**
 * Lofi aesthetic SVG styling, primitives, and CSS animations.
 */

const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";
const DISPLAY = "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
export const FACES = { mono: MONO, display: DISPLAY };

export const THEMES = {
  dark: {
    bg: "#0f1016",
    cardBg: "#161724",
    border: "#26283b",
    chipBg: "#ffffff",
    chipBorder: "#2d2f45",
    text: "#f7fafc",
    muted: "#8e94a8",
    accent: "#f6ad55",      // Amber Lamp
    accent2: "#b794f4",     // Lofi Lavender
    accent3: "#68d391",     // Matcha Green
    accent4: "#f687b3",     // Sakura Pink
    track: "#1f2033",
    gridZero: "#1a1b2d",
    gridL1: "#3b2d54",
    gridL2: "#6b46c1",
    gridL3: "#f6ad55",
    gridL4: "#f687b3",
  },
  light: {
    bg: "#faf7f2",
    cardBg: "#f3ece1",
    border: "#e5dcd0",
    chipBg: "#000000",
    chipBorder: "#ded4c7",
    text: "#2d3748",
    muted: "#718096",
    accent: "#c05621",      // Caramel Coffee
    accent2: "#805ad5",     // Violet
    accent3: "#2f855a",     // Matcha Leaf
    accent4: "#d53f8c",     // Berry Blush
    track: "#eae1d5",
    gridZero: "#ede5d8",
    gridL1: "#d8b4e2",
    gridL2: "#b794f4",
    gridL3: "#dd6b20",
    gridL4: "#c05621",
  },
};

export function escape(value) {
  return String(value).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export function rect({ x, y, width, height, rx = 0, fill = "none", stroke = null, strokeWidth = 1, opacity = null, cls = "" }) {
  const strokeAttr = stroke ? ` stroke="${stroke}" stroke-width="${strokeWidth}"` : "";
  const opacityAttr = opacity !== null ? ` fill-opacity="${opacity}"` : "";
  const clsAttr = cls ? ` class="${cls}"` : "";
  return `<rect x="${Math.round(x * 10) / 10}" y="${Math.round(y * 10) / 10}" width="${Math.round(Math.max(0, width) * 10) / 10}" height="${Math.round(height * 10) / 10}" rx="${rx}" fill="${fill}"${opacityAttr}${strokeAttr}${clsAttr} />`;
}

export function text(content, { x, y, size = 12, fill, weight = 400, anchor = "start", spacing = 0, cls = "", face = "mono" }) {
  const letterSpacing = spacing ? ` letter-spacing="${spacing}"` : "";
  const clsAttr = cls ? ` class="${cls}"` : "";
  return `<text x="${x}" y="${y}" font-family="${FACES[face]}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${letterSpacing}${clsAttr}>${escape(content)}</text>`;
}

export function icon(path, { x, y, size = 16, fill = "#ffffff", cls = "" }) {
  const scale = size / 24;
  const clsAttr = cls ? ` class="${cls}"` : "";
  return `<g transform="translate(${x} ${y}) scale(${scale})"><path d="${path}" fill="${fill}"${clsAttr} /></g>`;
}

/**
 * Generate full SVG CSS animation stylesheet
 */
export function getStyles(theme, mode) {
  const isDark = mode === "dark";

  // Stagger delays for entrance cascade (fast smooth flow)
  let staggers = "";
  for (let i = 1; i <= 70; i++) {
    staggers += `.d${i} { animation-delay: ${(i * 0.015).toFixed(3)}s; }\n`;
  }

  return `
    <style><![CDATA[
      /* Entrance animation cascade */
      .rise {
        animation: rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes rise {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }

      .fade {
        animation: fade 0.6s ease-out both;
      }
      @keyframes fade {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* Ambient Breathing Lamp */
      .lamp-pulse {
        animation: lampPulse 4s ease-in-out infinite alternate;
      }
      @keyframes lampPulse {
        0% { opacity: 0.82; transform: scale(0.95); }
        100% { opacity: 1; transform: scale(1.05); }
      }

      .lamp-glow-flicker {
        animation: lampGlow 6s ease-in-out infinite alternate;
      }
      @keyframes lampGlow {
        0% { opacity: 0.85; }
        50% { opacity: 0.95; }
        100% { opacity: 1; }
      }

      /* Cat rhythmic slow breathing (anchored to base at cushion contact) */
      .cat-breathe {
        transform-origin: 20px 20px;
        animation: catBreathe 3.8s ease-in-out infinite alternate;
      }
      @keyframes catBreathe {
        0% { transform: scale(1, 1); }
        100% { transform: scale(1.03, 1.05) translateY(-0.5px); }
      }

      /* Steaming coffee mug */
      .steam-wisp {
        transform-box: fill-box;
        transform-origin: center bottom;
      }
      .steam-wisp.s1 {
        animation: steamRise 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      .steam-wisp.s2 {
        animation: steamRise 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.6s;
      }
      @keyframes steamRise {
        0% {
          opacity: 0;
          transform: translateY(0) scaleX(0.8);
        }
        40% {
          opacity: 0.65;
        }
        100% {
          opacity: 0;
          transform: translateY(-16px) scaleX(1.3);
        }
      }

      /* Writing pen subtle motion */
      .pen-write {
        transform-box: fill-box;
        transform-origin: center center;
        animation: penMotion 2.4s ease-in-out infinite;
      }
      @keyframes penMotion {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(1px, 1px) rotate(1deg); }
        50% { transform: translate(-0.5px, 0.5px) rotate(-1deg); }
        75% { transform: translate(0.5px, -0.5px) rotate(0.5deg); }
      }

      /* Rain falling down window */
      .rain {
        animation: rainFall 2.2s linear infinite;
      }
      .rain.r1 { animation-delay: 0s; }
      .rain.r2 { animation-delay: 0.7s; }
      .rain.r3 { animation-delay: 1.4s; }
      @keyframes rainFall {
        0% { transform: translate(0, -35px); opacity: 0; }
        25% { opacity: 0.8; }
        85% { opacity: 0.8; }
        100% { transform: translate(-10px, 45px); opacity: 0; }
      }

      /* Equalizer dancing bars */
      .eq-bar {
        transform-box: fill-box;
        transform-origin: bottom center;
        animation: eqBounce 1.2s ease-in-out infinite alternate;
      }
      .eq-bar.b1 { animation-duration: 0.8s; animation-delay: 0.1s; }
      .eq-bar.b2 { animation-duration: 1.1s; animation-delay: 0.3s; }
      .eq-bar.b3 { animation-duration: 0.7s; animation-delay: 0.0s; }
      .eq-bar.b4 { animation-duration: 1.3s; animation-delay: 0.4s; }
      .eq-bar.b5 { animation-duration: 0.9s; animation-delay: 0.2s; }
      @keyframes eqBounce {
        0% { transform: scaleY(0.25); }
        50% { transform: scaleY(0.9); }
        100% { transform: scaleY(0.4); }
      }

      /* Subtle breathing stack chips */
      .chip-breathe {
        animation: chipBreathe 5s ease-in-out infinite alternate;
      }
      @keyframes chipBreathe {
        0% { fill-opacity: ${isDark ? '0.05' : '0.04'}; }
        100% { fill-opacity: ${isDark ? '0.12' : '0.09'}; }
      }

      /* Twinkles */
      .tw {
        animation: twinkle 3s ease-in-out infinite alternate;
      }
      @keyframes twinkle {
        0% { opacity: 0.3; }
        100% { opacity: 0.85; }
      }

      /* ---------------- Walking Cat Adventure and Contribution Clicker ---------------- */
      .cat-traveller-mover {
        animation: catWalkJourney 28s ease-in-out infinite;
      }
      @keyframes catWalkJourney {
        /* 1. Curled up sleeping peacefully on desk cushion beside the girl on top right */
        0%, 26% { transform: translate(576px, 166px); }
        /* 2. Wake up & stand on desk */
        27% { transform: translate(576px, 166px); }
        /* 3. Walk across desk surface */
        30% { transform: translate(700px, 182px); }
        /* 4. Descend along right border */
        33% { transform: translate(800px, 260px); }
        36% { transform: translate(800px, 420px); }
        /* 5. Walk left across activity section */
        40% { transform: translate(620px, 505px); }
        43% { transform: translate(380px, 505px); }
        46% { transform: translate(120px, 515px); }
        /* 6. Step down to contribution map */
        48% { transform: translate(80px, 595px); }
        50% { transform: translate(260px, 615px); }
        /* 7. Arrives and sits at Contribution Map */
        52%, 67% { transform: translate(470px, 640px); }
        /* 8. Step down into Problem Solving section */
        71% { transform: translate(280px, 730px); }
        75% { transform: translate(90px, 850px); }
        /* 9. Walk down into Socials and Connect section */
        78% { transform: translate(80px, 975px); }
        81% { transform: translate(380px, 1025px); }
        84% { transform: translate(680px, 1025px); }
        /* 10. Near cozy footer */
        87% { transform: translate(770px, 1055px); }
        /* 11. Ascend back up right edge to desk */
        91% { transform: translate(810px, 720px); }
        94% { transform: translate(800px, 420px); }
        97% { transform: translate(750px, 210px); }
        /* 12. Hops back onto desk cushion right beside the girl! */
        98%, 100% { transform: translate(576px, 166px); }
      }

      /* Horizontal Facing direction (flips around cat local center 20px, 14px) */
      .cat-facer {
        transform-origin: 20px 14px;
        animation: catFacerFlip 28s ease-in-out infinite;
      }
      @keyframes catFacerFlip {
        /* Sleeping on desk facing right toward lamp & girl */
        0%, 37% { transform: scaleX(1); }
        /* Walking left across activity */
        38%, 47% { transform: scaleX(-1); }
        /* Walking right along map and sitting */
        48%, 69% { transform: scaleX(1); }
        /* Walking left into problem solving */
        70%, 79% { transform: scaleX(-1); }
        /* Walking right across socials */
        80%, 89% { transform: scaleX(1); }
        /* Ascending right border */
        90%, 97% { transform: scaleX(-1); }
        /* Curled on cushion facing right */
        98%, 100% { transform: scaleX(1); }
      }

      /* Pose Synchronization: Sleep vs Active */
      .cat-sleep-pose {
        animation: catSleepPoseSync 28s ease-in-out infinite;
      }
      @keyframes catSleepPoseSync {
        0%, 26% { opacity: 1; visibility: visible; }
        26.5%, 97.5% { opacity: 0; visibility: hidden; }
        98%, 100% { opacity: 1; visibility: visible; }
      }

      .cat-sleep-zzz {
        animation: catZzzSync 28s ease-in-out infinite;
      }
      @keyframes catZzzSync {
        0%, 25.5% { opacity: 1; visibility: visible; }
        26.5%, 98% { opacity: 0; visibility: hidden; }
        98.5%, 100% { opacity: 1; visibility: visible; }
      }

      .zzz-letter {
        transform-origin: center center;
        animation: zzzFloat 2.6s ease-in-out infinite;
      }
      .zzz-letter.z2 {
        animation-delay: 1.3s;
      }
      @keyframes zzzFloat {
        0% { opacity: 0; transform: translate(0, 3px) scale(0.65); }
        45% { opacity: 0.9; transform: translate(3px, -7px) scale(1.0); }
        100% { opacity: 0; transform: translate(7px, -17px) scale(1.2); }
      }

      .cat-active-pose {
        animation: catActivePoseSync 28s ease-in-out infinite;
      }
      @keyframes catActivePoseSync {
        0%, 26.5% { opacity: 0; visibility: hidden; }
        27%, 97.5% { opacity: 1; visibility: visible; }
        98%, 100% { opacity: 0; visibility: hidden; }
      }

      /* Leg Walk Cycles: anchored at 0 0 (exact hip/shoulder joint on body) */
      .walk-leg {
        transform-origin: 0px 0px;
      }
      .walk-leg.f1, .walk-leg.b2 {
        animation: legStepA 0.32s ease-in-out infinite alternate;
      }
      .walk-leg.f2, .walk-leg.b1 {
        animation: legStepB 0.32s ease-in-out infinite alternate;
      }
      @keyframes legStepA {
        0% { transform: rotate(-20deg); }
        100% { transform: rotate(20deg); }
      }
      @keyframes legStepB {
        0% { transform: rotate(20deg); }
        100% { transform: rotate(-20deg); }
      }

      .cat-legs-walk {
        animation: catLegsActive 28s ease-in-out infinite;
      }
      @keyframes catLegsActive {
        0%, 51.5% { opacity: 1; visibility: visible; }
        52%, 67% { opacity: 0; visibility: hidden; }
        67.5%, 100% { opacity: 1; visibility: visible; }
      }

      /* Sit pose and clicking paw */
      .cat-sit-pose {
        animation: catSitActive 28s ease-in-out infinite;
      }
      @keyframes catSitActive {
        0%, 51.5% { opacity: 0; visibility: hidden; }
        52%, 67% { opacity: 1; visibility: visible; }
        67.5%, 100% { opacity: 0; visibility: hidden; }
      }

      .cat-eyes-walk {
        animation: catEyesWalkSync 28s ease-in-out infinite;
      }
      @keyframes catEyesWalkSync {
        0%, 51.5% { opacity: 1; visibility: visible; }
        52%, 67% { opacity: 0; visibility: hidden; }
        67.5%, 100% { opacity: 1; visibility: visible; }
      }

      .cat-eyes-sit {
        animation: catEyesSitSync 28s ease-in-out infinite;
      }
      @keyframes catEyesSitSync {
        0%, 51.5% { opacity: 0; visibility: hidden; }
        52%, 67% { opacity: 1; visibility: visible; }
        67.5%, 100% { opacity: 0; visibility: hidden; }
      }

      /* Paw clicker anchored permanently at shoulder joint 0 0 (no translate offset) */
      .cat-paw-clicker {
        transform-origin: 0px 0px;
        animation: pawClick 28s ease-in-out infinite;
      }
      @keyframes pawClick {
        0%, 54.5% { transform: rotate(0deg); }
        55.5% { transform: rotate(-32deg); } /* raises paw */
        56.5% { transform: rotate(18deg); }  /* taps down cleanly */
        58.0%, 67% { transform: rotate(0deg); }
        67.5%, 100% { transform: rotate(0deg); }
      }

      /* Tail Wagging: anchored permanently at body junction (5px 14px) */
      .cat-tail-group {
        transform-origin: 5px 14px;
        animation: tailWag 1.8s ease-in-out infinite alternate;
      }
      @keyframes tailWag {
        0% { transform: rotate(-10deg); }
        100% { transform: rotate(16deg); }
      }

      /* Click Ripple Effect on the Contribution Map */
      .contrib-ripple {
        transform-origin: center center;
        animation: rippleContainer 28s ease-out infinite;
      }
      @keyframes rippleContainer {
        0%, 55.8% { opacity: 0; transform: scale(0.2); }
        56.5% { opacity: 1; transform: scale(0.6); }
        58.5% { opacity: 0.8; transform: scale(1.8); }
        60.5% { opacity: 0; transform: scale(3.2); }
        100% { opacity: 0; }
      }

      .ripple-circle.r1 {
        animation: ringPulse1 1.4s ease-out infinite;
      }
      .ripple-circle.r2 {
        animation: ringPulse2 1.4s ease-out infinite 0.3s;
      }
      @keyframes ringPulse1 {
        0% { r: 3px; opacity: 1; }
        100% { r: 24px; opacity: 0; }
      }
      @keyframes ringPulse2 {
        0% { r: 3px; opacity: 0.9; }
        100% { r: 18px; opacity: 0; }
      }

      /* Clicked Tile Flash Highlight */
      .tile-flash {
        animation: tileFlash 28s ease-in-out infinite;
      }
      @keyframes tileFlash {
        0%, 55.8% { opacity: 0; transform: scale(1); }
        56.5% { opacity: 1; transform: scale(1.35); }
        57.5%, 65.5% { opacity: 1; transform: scale(1.15); }
        66.5%, 100% { opacity: 0; transform: scale(1); }
      }

      /* Cat Speech Bubble Popup */
      .cat-speech-bubble {
        transform-origin: 150px 30px;
        animation: bubblePopup 28s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
      }
      @keyframes bubblePopup {
        0%, 55.8% {
          opacity: 0;
          transform: scale(0.3) translateY(14px);
        }
        56.8% {
          opacity: 1;
          transform: scale(1.06) translateY(-2px);
        }
        57.8%, 65.5% {
          opacity: 1;
          transform: scale(1.0) translateY(0);
        }
        67% {
          opacity: 0;
          transform: scale(0.7) translateY(8px);
        }
        100% {
          opacity: 0;
          transform: scale(0.3);
        }
      }

      .bubble-heart {
        animation: heartPulse 2.2s ease-in-out infinite alternate;
      }
      @keyframes heartPulse {
        0% { transform: translateY(0) scale(0.9); opacity: 0.7; }
        100% { transform: translateY(-5px) scale(1.2); opacity: 1; }
      }

      .bubble-note {
        animation: notePulse 2.4s ease-in-out infinite alternate 0.5s;
      }
      @keyframes notePulse {
        0% { transform: translateY(0) scale(0.9); opacity: 0.6; }
        100% { transform: translateY(-4px) scale(1.15); opacity: 1; }
      }

      /* Interactive Contact Cards (Clickable Links Leading to Socials) */
      .contact-card-link {
        cursor: pointer;
        text-decoration: none;
        outline: none;
      }
      .contact-card {
        pointer-events: all;
      }
      .contact-card .card-bg {
        transition: fill 0.22s ease, stroke 0.22s ease, stroke-width 0.22s ease;
      }
      .contact-card .card-title, .contact-card .card-handle {
        transition: fill 0.22s ease;
      }
      .contact-card .card-arrow {
        transition: opacity 0.22s ease;
      }
      .contact-card-link:hover .card-bg {
        fill: ${isDark ? '#23253b' : '#ede2d5'} !important;
        stroke: ${theme.accent} !important;
        stroke-width: 1.5 !important;
      }
      .contact-card-link:hover .card-title {
        fill: ${theme.accent} !important;
      }
      .contact-card-link:hover .card-handle {
        fill: ${theme.text} !important;
      }
      .contact-card-link:hover .card-arrow {
        opacity: 0.95 !important;
      }
      .contact-card-link:hover .card-arrow path {
        stroke: ${theme.accent} !important;
      }

      ${staggers}
    ]]></style>
  `;
}
