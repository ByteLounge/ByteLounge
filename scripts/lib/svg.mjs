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
        /* 6. Step down to contribution map entrance */
        48% { transform: translate(100px, 600px); }
        49.5% { transform: translate(200px, 663px); }
        /* 7. Steps across the 7 rows of the heatmap, tapping one tile on each line */
        50.4%, 51.4% { transform: translate(325px, 663px); } /* Tap Row 0 (Sun): tile (360, 690) */
        52.4%, 53.4% { transform: translate(481px, 677px); } /* Tap Row 1 (Mon): tile (516.2, 704.2) */
        54.4%, 55.4% { transform: translate(524px, 691px); } /* Tap Row 2 (Tue): tile (558.8, 718.4) */
        56.4%, 57.4% { transform: translate(666px, 705px); } /* Tap Row 3 (Wed): tile (700.8, 732.6) */
        58.4%, 59.4% { transform: translate(708px, 720px); } /* Tap Row 4 (Thu): tile (743.4, 746.8) */
        60.4%, 61.4% { transform: translate(680px, 734px); } /* Tap Row 5 (Fri): tile (715.0, 761.0) */
        62.4%, 63.4% { transform: translate(666px, 748px); } /* Tap Row 6 (Sat): tile (700.8, 775.2) */
        /* Sits admiring all 490 contributions! */
        64.0%, 67.0% { transform: translate(666px, 748px); }
        /* 8. Step down into Problem Solving section */
        69% { transform: translate(480px, 830px); }
        73% { transform: translate(160px, 850px); }
        /* 9. Walk down and stroll along the bottom quote */
        78% { transform: translate(120px, 945px); }
        82% { transform: translate(430px, 945px); }
        86% { transform: translate(720px, 945px); }
        /* 10. Ascend back up right edge to desk */
        89% { transform: translate(805px, 760px); }
        92% { transform: translate(805px, 480px); }
        95% { transform: translate(750px, 220px); }
        /* 11. Hops back onto desk cushion right beside the girl! */
        97.8%, 100% { transform: translate(576px, 166px); }
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
        /* Walking right along map and tapping tiles */
        48%, 68% { transform: scaleX(1); }
        /* Walking left into problem solving */
        69%, 76% { transform: scaleX(-1); }
        /* Walking right along bottom quote */
        77%, 87% { transform: scaleX(1); }
        /* Ascending right border */
        88%, 97.4% { transform: scaleX(-1); }
        /* Curled on cushion facing right */
        97.8%, 100% { transform: scaleX(1); }
      }

      /* Pose Synchronization: Sleep vs Active */
      .cat-sleep-pose {
        animation: catSleepPoseSync 28s ease-in-out infinite;
      }
      @keyframes catSleepPoseSync {
        0%, 26% { opacity: 1; visibility: visible; }
        26.5%, 97.4% { opacity: 0; visibility: hidden; }
        97.8%, 100% { opacity: 1; visibility: visible; }
      }

      .cat-sleep-zzz {
        animation: catZzzSync 28s ease-in-out infinite;
      }
      @keyframes catZzzSync {
        0%, 25.5% { opacity: 1; visibility: visible; }
        26.5%, 98.0% { opacity: 0; visibility: hidden; }
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
        27%, 97.4% { opacity: 1; visibility: visible; }
        97.8%, 100% { opacity: 0; visibility: hidden; }
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
        0%, 50.2% { opacity: 1; visibility: visible; }
        50.4%, 51.4% { opacity: 0; visibility: hidden; }
        51.6%, 52.2% { opacity: 1; visibility: visible; }
        52.4%, 53.4% { opacity: 0; visibility: hidden; }
        53.6%, 54.2% { opacity: 1; visibility: visible; }
        54.4%, 55.4% { opacity: 0; visibility: hidden; }
        55.6%, 56.2% { opacity: 1; visibility: visible; }
        56.4%, 57.4% { opacity: 0; visibility: hidden; }
        57.6%, 58.2% { opacity: 1; visibility: visible; }
        58.4%, 59.4% { opacity: 0; visibility: hidden; }
        59.6%, 60.2% { opacity: 1; visibility: visible; }
        60.4%, 61.4% { opacity: 0; visibility: hidden; }
        61.6%, 62.2% { opacity: 1; visibility: visible; }
        62.4%, 67.0% { opacity: 0; visibility: hidden; }
        67.2%, 100% { opacity: 1; visibility: visible; }
      }

      /* Sit pose and clicking paw */
      .cat-sit-pose {
        animation: catSitActive 28s ease-in-out infinite;
      }
      @keyframes catSitActive {
        0%, 50.2% { opacity: 0; visibility: hidden; }
        50.4%, 51.4% { opacity: 1; visibility: visible; }
        51.6%, 52.2% { opacity: 0; visibility: hidden; }
        52.4%, 53.4% { opacity: 1; visibility: visible; }
        53.6%, 54.2% { opacity: 0; visibility: hidden; }
        54.4%, 55.4% { opacity: 1; visibility: visible; }
        55.6%, 56.2% { opacity: 0; visibility: hidden; }
        56.4%, 57.4% { opacity: 1; visibility: visible; }
        57.6%, 58.2% { opacity: 0; visibility: hidden; }
        58.4%, 59.4% { opacity: 1; visibility: visible; }
        59.6%, 60.2% { opacity: 0; visibility: hidden; }
        60.4%, 61.4% { opacity: 1; visibility: visible; }
        61.6%, 62.2% { opacity: 0; visibility: hidden; }
        62.4%, 67.0% { opacity: 1; visibility: visible; }
        67.2%, 100% { opacity: 0; visibility: hidden; }
      }

      .cat-eyes-walk {
        animation: catEyesWalkSync 28s ease-in-out infinite;
      }
      @keyframes catEyesWalkSync {
        0%, 50.2% { opacity: 1; visibility: visible; }
        50.4%, 67.0% { opacity: 0; visibility: hidden; }
        67.2%, 100% { opacity: 1; visibility: visible; }
      }

      .cat-eyes-sit {
        animation: catEyesSitSync 28s ease-in-out infinite;
      }
      @keyframes catEyesSitSync {
        0%, 50.2% { opacity: 0; visibility: hidden; }
        50.4%, 67.0% { opacity: 1; visibility: visible; }
        67.2%, 100% { opacity: 0; visibility: hidden; }
      }

      /* Paw clicker anchored permanently at shoulder joint 0 0 */
      .cat-paw-clicker {
        transform-origin: 0px 0px;
        animation: pawMultiClick 28s ease-in-out infinite;
      }
      @keyframes pawMultiClick {
        0%, 50.2% { transform: rotate(0deg); }
        50.5% { transform: rotate(-30deg); }
        50.8% { transform: rotate(18deg); }  /* tap row 0 */
        51.2% { transform: rotate(0deg); }

        52.5% { transform: rotate(-30deg); }
        52.8% { transform: rotate(18deg); }  /* tap row 1 */
        53.2% { transform: rotate(0deg); }

        54.5% { transform: rotate(-30deg); }
        54.8% { transform: rotate(18deg); }  /* tap row 2 */
        55.2% { transform: rotate(0deg); }

        56.5% { transform: rotate(-30deg); }
        56.8% { transform: rotate(18deg); }  /* tap row 3 */
        57.2% { transform: rotate(0deg); }

        58.5% { transform: rotate(-30deg); }
        58.8% { transform: rotate(18deg); }  /* tap row 4 */
        59.2% { transform: rotate(0deg); }

        60.5% { transform: rotate(-30deg); }
        60.8% { transform: rotate(18deg); }  /* tap row 5 */
        61.2% { transform: rotate(0deg); }

        62.5% { transform: rotate(-30deg); }
        62.8% { transform: rotate(18deg); }  /* tap row 6 */
        63.2%, 100% { transform: rotate(0deg); }
      }

      /* Tail Wagging: anchored permanently at body joint (0 0 inside translate(10, 14)) */
      .cat-tail-group {
        transform-origin: 0px 0px;
        animation: tailWag 2s ease-in-out infinite alternate;
      }
      @keyframes tailWag {
        0% { transform: rotate(-10deg); }
        100% { transform: rotate(14deg); }
      }

      /* Dynamic Heatmap Row Reveal on Cat Paws Tapping */
      .contrib-cell {
        transform-box: fill-box;
        transform-origin: center center;
      }
      .contrib-cell.row-0 { animation: rowReveal0 28s ease-in-out infinite; }
      .contrib-cell.row-1 { animation: rowReveal1 28s ease-in-out infinite; }
      .contrib-cell.row-2 { animation: rowReveal2 28s ease-in-out infinite; }
      .contrib-cell.row-3 { animation: rowReveal3 28s ease-in-out infinite; }
      .contrib-cell.row-4 { animation: rowReveal4 28s ease-in-out infinite; }
      .contrib-cell.row-5 { animation: rowReveal5 28s ease-in-out infinite; }
      .contrib-cell.row-6 { animation: rowReveal6 28s ease-in-out infinite; }

      @keyframes rowReveal0 {
        0%, 26.0% { opacity: 1; transform: scale(1); }
        27.0%, 50.4% { opacity: 0; transform: scale(0.2); }
        50.8% { opacity: 1; transform: scale(1.3); }
        51.4%, 100% { opacity: 1; transform: scale(1); }
      }
      @keyframes rowReveal1 {
        0%, 26.0% { opacity: 1; transform: scale(1); }
        27.0%, 52.4% { opacity: 0; transform: scale(0.2); }
        52.8% { opacity: 1; transform: scale(1.3); }
        53.4%, 100% { opacity: 1; transform: scale(1); }
      }
      @keyframes rowReveal2 {
        0%, 26.0% { opacity: 1; transform: scale(1); }
        27.0%, 54.4% { opacity: 0; transform: scale(0.2); }
        54.8% { opacity: 1; transform: scale(1.3); }
        55.4%, 100% { opacity: 1; transform: scale(1); }
      }
      @keyframes rowReveal3 {
        0%, 26.0% { opacity: 1; transform: scale(1); }
        27.0%, 56.4% { opacity: 0; transform: scale(0.2); }
        56.8% { opacity: 1; transform: scale(1.3); }
        57.4%, 100% { opacity: 1; transform: scale(1); }
      }
      @keyframes rowReveal4 {
        0%, 26.0% { opacity: 1; transform: scale(1); }
        27.0%, 58.4% { opacity: 0; transform: scale(0.2); }
        58.8% { opacity: 1; transform: scale(1.3); }
        59.4%, 100% { opacity: 1; transform: scale(1); }
      }
      @keyframes rowReveal5 {
        0%, 26.0% { opacity: 1; transform: scale(1); }
        27.0%, 60.4% { opacity: 0; transform: scale(0.2); }
        60.8% { opacity: 1; transform: scale(1.3); }
        61.4%, 100% { opacity: 1; transform: scale(1); }
      }
      @keyframes rowReveal6 {
        0%, 26.0% { opacity: 1; transform: scale(1); }
        27.0%, 62.4% { opacity: 0; transform: scale(0.2); }
        62.8% { opacity: 1; transform: scale(1.3); }
        63.4%, 100% { opacity: 1; transform: scale(1); }
      }

      /* Ripple Animations for each tapped row */
      .contrib-ripple {
        transform-origin: 0px 0px;
        opacity: 0;
      }
      .contrib-ripple.r0 { animation: rippleAnim0 28s ease-out infinite; }
      .contrib-ripple.r1 { animation: rippleAnim1 28s ease-out infinite; }
      .contrib-ripple.r2 { animation: rippleAnim2 28s ease-out infinite; }
      .contrib-ripple.r3 { animation: rippleAnim3 28s ease-out infinite; }
      .contrib-ripple.r4 { animation: rippleAnim4 28s ease-out infinite; }
      .contrib-ripple.r5 { animation: rippleAnim5 28s ease-out infinite; }
      .contrib-ripple.r6 { animation: rippleAnim6 28s ease-out infinite; }

      @keyframes rippleAnim0 {
        0%, 50.4% { opacity: 0; transform: scale(0.2); }
        50.8% { opacity: 1; transform: scale(0.6); }
        51.6% { opacity: 0.8; transform: scale(1.8); }
        52.4% { opacity: 0; transform: scale(3.2); }
        100% { opacity: 0; }
      }
      @keyframes rippleAnim1 {
        0%, 52.4% { opacity: 0; transform: scale(0.2); }
        52.8% { opacity: 1; transform: scale(0.6); }
        53.6% { opacity: 0.8; transform: scale(1.8); }
        54.4% { opacity: 0; transform: scale(3.2); }
        100% { opacity: 0; }
      }
      @keyframes rippleAnim2 {
        0%, 54.4% { opacity: 0; transform: scale(0.2); }
        54.8% { opacity: 1; transform: scale(0.6); }
        55.6% { opacity: 0.8; transform: scale(1.8); }
        56.4% { opacity: 0; transform: scale(3.2); }
        100% { opacity: 0; }
      }
      @keyframes rippleAnim3 {
        0%, 56.4% { opacity: 0; transform: scale(0.2); }
        56.8% { opacity: 1; transform: scale(0.6); }
        57.6% { opacity: 0.8; transform: scale(1.8); }
        58.4% { opacity: 0; transform: scale(3.2); }
        100% { opacity: 0; }
      }
      @keyframes rippleAnim4 {
        0%, 58.4% { opacity: 0; transform: scale(0.2); }
        58.8% { opacity: 1; transform: scale(0.6); }
        59.6% { opacity: 0.8; transform: scale(1.8); }
        60.4% { opacity: 0; transform: scale(3.2); }
        100% { opacity: 0; }
      }
      @keyframes rippleAnim5 {
        0%, 60.4% { opacity: 0; transform: scale(0.2); }
        60.8% { opacity: 1; transform: scale(0.6); }
        61.6% { opacity: 0.8; transform: scale(1.8); }
        62.4% { opacity: 0; transform: scale(3.2); }
        100% { opacity: 0; }
      }
      @keyframes rippleAnim6 {
        0%, 62.4% { opacity: 0; transform: scale(0.2); }
        62.8% { opacity: 1; transform: scale(0.6); }
        63.6% { opacity: 0.8; transform: scale(1.8); }
        64.4% { opacity: 0; transform: scale(3.2); }
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

      /* Clicked Tile Flash Highlight for each row */
      .tile-flash {
        opacity: 0;
        transform-origin: 5px 5px;
      }
      .tile-flash.t0 { animation: tileFlash0 28s ease-in-out infinite; }
      .tile-flash.t1 { animation: tileFlash1 28s ease-in-out infinite; }
      .tile-flash.t2 { animation: tileFlash2 28s ease-in-out infinite; }
      .tile-flash.t3 { animation: tileFlash3 28s ease-in-out infinite; }
      .tile-flash.t4 { animation: tileFlash4 28s ease-in-out infinite; }
      .tile-flash.t5 { animation: tileFlash5 28s ease-in-out infinite; }
      .tile-flash.t6 { animation: tileFlash6 28s ease-in-out infinite; }

      @keyframes tileFlash0 {
        0%, 50.4% { opacity: 0; transform: scale(1); }
        50.8% { opacity: 1; transform: scale(1.4); }
        51.4%, 66.0% { opacity: 1; transform: scale(1.15); }
        66.8%, 100% { opacity: 0; transform: scale(1); }
      }
      @keyframes tileFlash1 {
        0%, 52.4% { opacity: 0; transform: scale(1); }
        52.8% { opacity: 1; transform: scale(1.4); }
        53.4%, 66.0% { opacity: 1; transform: scale(1.15); }
        66.8%, 100% { opacity: 0; transform: scale(1); }
      }
      @keyframes tileFlash2 {
        0%, 54.4% { opacity: 0; transform: scale(1); }
        54.8% { opacity: 1; transform: scale(1.4); }
        55.4%, 66.0% { opacity: 1; transform: scale(1.15); }
        66.8%, 100% { opacity: 0; transform: scale(1); }
      }
      @keyframes tileFlash3 {
        0%, 56.4% { opacity: 0; transform: scale(1); }
        56.8% { opacity: 1; transform: scale(1.4); }
        57.4%, 66.0% { opacity: 1; transform: scale(1.15); }
        66.8%, 100% { opacity: 0; transform: scale(1); }
      }
      @keyframes tileFlash4 {
        0%, 58.4% { opacity: 0; transform: scale(1); }
        58.8% { opacity: 1; transform: scale(1.4); }
        59.4%, 66.0% { opacity: 1; transform: scale(1.15); }
        66.8%, 100% { opacity: 0; transform: scale(1); }
      }
      @keyframes tileFlash5 {
        0%, 60.4% { opacity: 0; transform: scale(1); }
        60.8% { opacity: 1; transform: scale(1.4); }
        61.4%, 66.0% { opacity: 1; transform: scale(1.15); }
        66.8%, 100% { opacity: 0; transform: scale(1); }
      }
      @keyframes tileFlash6 {
        0%, 62.4% { opacity: 0; transform: scale(1); }
        62.8% { opacity: 1; transform: scale(1.4); }
        63.4%, 66.0% { opacity: 1; transform: scale(1.15); }
        66.8%, 100% { opacity: 0; transform: scale(1); }
      }

      /* Cat Speech Bubble Popup */
      .cat-speech-bubble {
        transform-origin: 148px 16px;
        animation: bubblePopup 28s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
      }
      @keyframes bubblePopup {
        0%, 50.4% {
          opacity: 0;
          transform: scale(0.3) translateY(12px);
        }
        51.2% {
          opacity: 1;
          transform: scale(1.06) translateY(-2px);
        }
        52.0%, 65.5% {
          opacity: 1;
          transform: scale(1.0) translateY(0);
        }
        66.8% {
          opacity: 0;
          transform: scale(0.7) translateY(8px);
        }
        100% {
          opacity: 0;
          transform: scale(0.3);
        }
      }

      /* Floating Thought Cloud from Cat Saying "meoww~ 🐾" Before Sleeping */
      .cat-meow-cloud {
        transform-origin: 43px 20px;
        animation: meowCloud 28s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
      }
      @keyframes meowCloud {
        0% {
          opacity: 1;
          transform: translateY(-1.5px) scale(1.0);
        }
        1.6% {
          opacity: 0.95;
          transform: translateY(-3px) scale(1.0);
        }
        2.8% {
          opacity: 0;
          transform: translateY(-8px) scale(0.75);
        }
        3.2%, 97.4% {
          opacity: 0;
          transform: translateY(12px) scale(0.35);
        }
        98.0% {
          opacity: 1;
          transform: translateY(-3px) scale(1.06);
        }
        98.8% {
          opacity: 1;
          transform: translateY(0) scale(1.0);
        }
        100% {
          opacity: 1;
          transform: translateY(-1.5px) scale(1.0);
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
