/**
 * Master Lofi Girl poster card generator.
 * Produces unified, pixel-perfect, dark & light SVG posters.
 */

import { lofiVignette, lofiPlayer } from "./art.mjs";
import { CONTACTS } from "./contacts.mjs";
import { ICONS } from "./icons.mjs";
import { STACK_GROUPS } from "./stack.mjs";
import { FACES, THEMES, getStyles, icon, rect, text } from "./svg.mjs";

const WIDTH = 880;
const PAD = 34;
const RIGHT = WIDTH - PAD;
const INNER_WIDTH = RIGHT - PAD;

export function posterCard(data, mode = "dark") {
  const theme = THEMES[mode];
  const isDark = mode === "dark";

  const {
    profile = {
      name: "Yash Sanikop",
      role: "computer science & engineering · iot, robotics & ai systems",
      study: "agnel institute of technology and design, goa",
      location: "goa, india",
    },
    stats = {
      total: 412,
      activeDays: 148,
      curStreak: 8,
      maxStreak: 26,
      repoCount: 43,
      weeks: [],
    },
    leetcode = {
      solved: { all: 148, easy: 78, medium: 58, hard: 12 },
      acceptance: "71.2%",
      streak: 14,
    },
    views = "3,842",
  } = data;

  const parts = [];

  // 1. Defs & Styles
  parts.push(getStyles(theme, mode));

  // Ambient room haze (warm gradient behind entire poster)
  const hazeGradId = `haze-${mode}`;
  parts.push(`
    <defs>
      <radialGradient id="${hazeGradId}" cx="85%" cy="8%" r="65%">
        <stop offset="0%" stop-color="${theme.accent}" stop-opacity="${isDark ? '0.14' : '0.10'}" />
        <stop offset="50%" stop-color="${theme.accent2}" stop-opacity="${isDark ? '0.06' : '0.04'}" />
        <stop offset="100%" stop-color="${theme.bg}" stop-opacity="0" />
      </radialGradient>
    </defs>
  `);

  // Outer frame & card background
  // Estimated height: 1480
  const HEIGHT = 1480;
  parts.push(rect({ x: 0, y: 0, width: WIDTH, height: HEIGHT, rx: 16, fill: theme.bg }));
  parts.push(rect({ x: 0, y: 0, width: WIDTH, height: HEIGHT, rx: 16, fill: `url(#${hazeGradId})` }));
  parts.push(rect({ x: 0.5, y: 0.5, width: WIDTH - 1, height: HEIGHT - 1, rx: 15.5, stroke: theme.border, strokeWidth: 1 }));

  /* ------------------------------------------------------------ 1. HEADER */
  let y = 38;

  // Japanese Subtitle / Aesthetic Tag
  parts.push(
    text("放課後勉強中  ·  STUDYING & BUILDING", {
      x: PAD,
      y: y + 8,
      size: 10,
      fill: theme.accent2,
      weight: 600,
      spacing: 1.8,
      cls: "rise d1",
    })
  );

  // Profile Name
  y += 38;
  parts.push(
    text(profile.name.toLowerCase(), {
      x: PAD,
      y,
      size: 28,
      fill: theme.text,
      weight: 700,
      face: "display",
      cls: "rise d2",
    })
  );

  // Role
  y += 24;
  parts.push(
    text(profile.role, {
      x: PAD,
      y,
      size: 12,
      fill: theme.muted,
      weight: 500,
      spacing: 0.5,
      cls: "rise d4",
    })
  );

  // College & Location & Views
  y += 20;
  parts.push(
    text(`${profile.study}  ·  ${profile.location}`, {
      x: PAD,
      y,
      size: 11,
      fill: theme.muted,
      weight: 400,
      cls: "rise d6",
    })
  );

  y += 18;
  parts.push(
    text(`☕ ${views} study sessions logged  ·  listening to lo-fi beats`, {
      x: PAD,
      y,
      size: 10.5,
      fill: theme.accent,
      weight: 500,
      cls: "rise d8",
    })
  );

  // Music Player Widget
  y += 22;
  parts.push(lofiPlayer(PAD, y, theme, mode));

  // Lofi Girl Study Vignette (Right Side)
  parts.push(`
    <g transform="translate(520, 32)" class="rise d10">
      ${lofiVignette(theme, mode)}
    </g>
  `);

  /* ------------------------------------------------------------ 2. STACK */
  y = 268;
  parts.push(divider(y, theme));

  y += 28;
  parts.push(
    label("STUDY ESSENTIALS  ·  TECH STACK", PAD, y, theme, 18)
  );

  y += 24;
  const CHIP_H = 26;
  const CHIP_GAP_X = 8;
  const CHIP_GAP_Y = 10;
  const KEY_X = 135; // Right-anchored group title edge
  const STACK_START_X = 150;

  for (let gIdx = 0; gIdx < STACK_GROUPS.length; gIdx++) {
    const group = STACK_GROUPS[gIdx];
    const delay = 20 + gIdx * 4;

    // Group title (right-anchored)
    parts.push(
      text(group.label, {
        x: KEY_X,
        y: y + 17,
        size: 9.5,
        fill: theme.muted,
        weight: 600,
        anchor: "end",
        spacing: 1.2,
        cls: `rise d${delay}`,
      })
    );

    // Render chips in row
    let chipX = STACK_START_X;
    let rowY = y;

    for (const item of group.items) {
      const p = ICONS[item.icon] || null;
      // Calculate chip width: padding(10) + icon(14) + gap(6) + text(~6.8px/char) + padding(10)
      const labelWidth = item.label.length * 6.8;
      const chipW = Math.round((p ? 30 : 20) + labelWidth);

      // Check wrapping
      if (chipX + chipW > RIGHT) {
        chipX = STACK_START_X;
        rowY += CHIP_H + CHIP_GAP_Y;
      }

      // Chip rectangle
      parts.push(
        rect({
          x: chipX,
          y: rowY,
          width: chipW,
          height: CHIP_H,
          rx: 6,
          fill: theme.chipBg,
          opacity: isDark ? 0.07 : 0.05,
          stroke: theme.chipBorder,
          cls: `chip-breathe rise d${delay}`,
        })
      );

      // Chip icon
      let contentX = chipX + 9;
      if (p) {
        parts.push(icon(p, { x: contentX, y: rowY + 6, size: 14, fill: theme.accent, cls: `rise d${delay}` }));
        contentX += 20;
      }

      // Chip label
      parts.push(
        text(item.label, {
          x: contentX,
          y: rowY + 16.5,
          size: 11,
          fill: theme.text,
          weight: 500,
          cls: `rise d${delay}`,
        })
      );

      chipX += chipW + CHIP_GAP_X;
    }

    y = rowY + CHIP_H + CHIP_GAP_Y + 4;
  }

  /* ------------------------------------------------------------ 3. GITHUB */
  y += 10;
  parts.push(divider(y, theme));

  y += 28;
  parts.push(
    label("STUDY JOURNAL  ·  GITHUB ACTIVITY", PAD, y, theme, 38)
  );

  // 4 Metric highlight boxes
  y += 18;
  const METRIC_W = (INNER_WIDTH - 3 * 12) / 4;
  const METRIC_H = 64;

  const metrics = [
    { label: "YEAR CONTRIBUTIONS", val: `${stats.total}`, sub: "commits & reviews" },
    { label: "ACTIVE DAYS", val: `${stats.activeDays}`, sub: "study sessions" },
    { label: "CURRENT STREAK", val: `${stats.curStreak} days`, sub: `longest ${stats.maxStreak} days` },
    { label: "PUBLIC REPOSITORIES", val: `${stats.repoCount}`, sub: "open-source projects" },
  ];

  metrics.forEach((m, i) => {
    const mx = PAD + i * (METRIC_W + 12);
    const d = 40 + i * 2;

    // Card background
    parts.push(
      rect({
        x: mx,
        y,
        width: METRIC_W,
        height: METRIC_H,
        rx: 8,
        fill: theme.cardBg,
        stroke: theme.border,
        cls: `rise d${d}`,
      })
    );

    // Label
    parts.push(
      text(m.label, {
        x: mx + 14,
        y: y + 20,
        size: 9,
        fill: theme.muted,
        weight: 600,
        spacing: 1.0,
        cls: `rise d${d}`,
      })
    );

    // Value
    parts.push(
      text(m.val, {
        x: mx + 14,
        y: y + 43,
        size: 18,
        fill: theme.accent,
        weight: 700,
        face: "display",
        cls: `rise d${d}`,
      })
    );

    // Subtitle
    parts.push(
      text(m.sub, {
        x: mx + 14,
        y: y + 56,
        size: 8.5,
        fill: theme.muted,
        weight: 400,
        cls: `rise d${d}`,
      })
    );
  });

  // 52-Week Contribution Calendar Grid
  y += METRIC_H + 20;
  const CAL_BG_H = 135;
  parts.push(
    rect({
      x: PAD,
      y,
      width: INNER_WIDTH,
      height: CAL_BG_H,
      rx: 8,
      fill: theme.cardBg,
      stroke: theme.border,
      cls: "rise d46",
    })
  );

  // Month headers
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const mStep = INNER_WIDTH / 12;
  months.forEach((m, idx) => {
    parts.push(
      text(m, {
        x: PAD + 42 + idx * (mStep - 2.5),
        y: y + 22,
        size: 9,
        fill: theme.muted,
        weight: 500,
        cls: "rise d48",
      })
    );
  });

  // Days of week indicators
  parts.push(text("Mon", { x: PAD + 16, y: y + 52, size: 8, fill: theme.muted, cls: "rise d48" }));
  parts.push(text("Wed", { x: PAD + 16, y: y + 74, size: 8, fill: theme.muted, cls: "rise d48" }));
  parts.push(text("Fri", { x: PAD + 16, y: y + 96, size: 8, fill: theme.muted, cls: "rise d48" }));

  // Heatmap squares (52 cols x 7 rows)
  const CELL_SIZE = 10;
  const CELL_GAP = 4.2;
  const GRID_START_X = PAD + 42;
  const GRID_START_Y = y + 33;

  const weeks = stats.weeks.slice(-52);
  for (let w = 0; w < weeks.length; w++) {
    const days = weeks[w].contributionDays || [];
    for (let d = 0; d < 7; d++) {
      const day = days[d];
      const count = day?.contributionCount || 0;
      let cellFill = theme.gridZero;
      if (count >= 8) cellFill = theme.gridL4;
      else if (count >= 5) cellFill = theme.gridL3;
      else if (count >= 2) cellFill = theme.gridL2;
      else if (count >= 1) cellFill = theme.gridL1;

      const cx = GRID_START_X + w * (CELL_SIZE + CELL_GAP);
      const cy = GRID_START_Y + d * (CELL_SIZE + CELL_GAP);

      parts.push(
        rect({
          x: cx,
          y: cy,
          width: CELL_SIZE,
          height: CELL_SIZE,
          rx: 2,
          fill: cellFill,
          cls: `rise d${Math.min(65, 48 + Math.floor(w / 4))}`,
        })
      );
    }
  }

  // Legend at bottom of calendar
  const legY = y + 120;
  parts.push(text("Less", { x: RIGHT - 130, y: legY, size: 8.5, fill: theme.muted }));
  [theme.gridZero, theme.gridL1, theme.gridL2, theme.gridL3, theme.gridL4].forEach((col, i) => {
    parts.push(rect({ x: RIGHT - 104 + i * 14, y: legY - 8, width: 9, height: 9, rx: 1.5, fill: col }));
  });
  parts.push(text("More", { x: RIGHT - 30, y: legY, size: 8.5, fill: theme.muted }));

  /* ------------------------------------------------------------ 4. LEETCODE */
  y += CAL_BG_H + 24;
  parts.push(divider(y, theme));

  y += 28;
  parts.push(
    label("PRACTICE & CHALLENGES  ·  PROBLEM SOLVING", PAD, y, theme, 54)
  );

  y += 18;
  const LC_CARD_H = 92;
  parts.push(
    rect({
      x: PAD,
      y,
      width: INNER_WIDTH,
      height: LC_CARD_H,
      rx: 8,
      fill: theme.cardBg,
      stroke: theme.border,
      cls: "rise d56",
    })
  );

  // Left column: Total solved & acceptance
  parts.push(
    text("SOLVED PROBLEMS", {
      x: PAD + 20,
      y: y + 26,
      size: 9.5,
      fill: theme.muted,
      weight: 600,
      spacing: 1.0,
      cls: "rise d56",
    })
  );
  parts.push(
    text(`${leetcode.solved.all}`, {
      x: PAD + 20,
      y: y + 58,
      size: 28,
      fill: theme.accent,
      weight: 700,
      face: "display",
      cls: "rise d56",
    })
  );
  parts.push(
    text(`acceptance rate: ${leetcode.acceptance}  ·  streak: ${leetcode.streak} days`, {
      x: PAD + 20,
      y: y + 76,
      size: 10,
      fill: theme.muted,
      weight: 500,
      cls: "rise d56",
    })
  );

  // Right column: Easy / Medium / Hard progress breakdown bars
  const BAR_START_X = PAD + 280;
  const BAR_WIDTH = INNER_WIDTH - 300;
  const totalSolved = Math.max(1, leetcode.solved.all);

  const tiers = [
    { name: "EASY", count: leetcode.solved.easy, color: theme.accent3 },
    { name: "MEDIUM", count: leetcode.solved.medium, color: theme.accent },
    { name: "HARD", count: leetcode.solved.hard, color: theme.accent4 },
  ];

  tiers.forEach((tier, i) => {
    const ty = y + 24 + i * 22;
    const pct = Math.round((tier.count / totalSolved) * 100);
    const filledW = Math.round((BAR_WIDTH * tier.count) / totalSolved);

    // Tier name & count
    parts.push(
      text(`${tier.name}  ${tier.count} (${pct}%)`, {
        x: BAR_START_X,
        y: ty,
        size: 9.5,
        fill: theme.text,
        weight: 600,
        cls: "rise d58",
      })
    );

    // Track
    parts.push(
      rect({
        x: BAR_START_X + 130,
        y: ty - 8,
        width: BAR_WIDTH - 130,
        height: 6,
        rx: 3,
        fill: theme.track,
        cls: "rise d58",
      })
    );

    // Filled progress
    parts.push(
      rect({
        x: BAR_START_X + 130,
        y: ty - 8,
        width: Math.max(8, filledW - 40),
        height: 6,
        rx: 3,
        fill: tier.color,
        cls: "rise d58",
      })
    );
  });

  /* ------------------------------------------------------------ 5. CONTACTS */
  y += LC_CARD_H + 24;
  parts.push(divider(y, theme));

  y += 28;
  parts.push(
    label("LO-FI LOUNGE  ·  CONNECT & REACH OUT", PAD, y, theme, 60)
  );

  y += 18;
  const CONTACT_COLS = 4;
  const CARD_W = (INNER_WIDTH - (CONTACT_COLS - 1) * 10) / CONTACT_COLS;
  const CARD_H = 44;

  CONTACTS.forEach((c, i) => {
    const col = i % CONTACT_COLS;
    const row = Math.floor(i / CONTACT_COLS);
    const cx = PAD + col * (CARD_W + 10);
    const cy = y + row * (CARD_H + 10);
    const d = 62 + i * 2;

    // Contact card background
    parts.push(
      rect({
        x: cx,
        y: cy,
        width: CARD_W,
        height: CARD_H,
        rx: 8,
        fill: theme.cardBg,
        stroke: theme.border,
        cls: `rise d${d}`,
      })
    );

    // Icon
    const p = ICONS[c.icon] || null;
    if (p) {
      parts.push(icon(p, { x: cx + 12, y: cy + 14, size: 16, fill: theme.accent, cls: `rise d${d}` }));
    }

    // Title
    parts.push(
      text(c.label, {
        x: cx + 36,
        y: cy + 18,
        size: 10.5,
        fill: theme.text,
        weight: 700,
        face: "display",
        cls: `rise d${d}`,
      })
    );

    // Handle
    parts.push(
      text(c.handle, {
        x: cx + 36,
        y: cy + 32,
        size: 9,
        fill: theme.muted,
        weight: 400,
        cls: `rise d${d}`,
      })
    );
  });

  /* ------------------------------------------------------------ 6. FOOTER */
  y += 2 * (CARD_H + 10) + 24;
  parts.push(
    text("“stay cozy, keep coding, let the beats play.”  ☕ ♪", {
      x: WIDTH / 2,
      y,
      size: 10.5,
      fill: theme.muted,
      weight: 500,
      anchor: "middle",
      cls: "rise d68",
    })
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" role="img" aria-label="${profile.name} — lofi profile poster"><title>${profile.name} — lofi profile poster</title>${parts.join("")}</svg>`;
}

function divider(y, theme) {
  return rect({ x: PAD, y, width: INNER_WIDTH, height: 1, fill: theme.border });
}

function label(content, x, y, theme, delay) {
  return text(content, {
    x,
    y,
    size: 10,
    fill: theme.muted,
    spacing: 1.6,
    weight: 600,
    cls: `rise d${delay}`,
    face: "display",
  });
}
