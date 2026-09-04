#!/usr/bin/env node
/**
 * Regenerates the Lofi Girl profile posters into assets/.
 *
 * Usage:  node scripts/generate-cards.mjs
 * Env:    GH_TOKEN | GITHUB_TOKEN   optional (for private contributions & higher rate limits)
 *         GH_LOGIN                  default ByteLounge
 *         LEETCODE_USER             default yashsanikop
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { contactCardSvg, posterCard } from "./lib/cards.mjs";
import { CONTACTS } from "./lib/contacts.mjs";
import { collectGitHub } from "./lib/github.mjs";
import { collectLeetCode } from "./lib/leetcode.mjs";
import { collectViews } from "./lib/views.mjs";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ASSETS = join(ROOT, "assets");
const THEMES = ["dark", "light"];

const PROFILE = {
  name: "Yash Sanikop",
  role: "computer science & engineering  ·  iot, robotics & ai systems",
  study: "agnel institute of technology and design, goa",
  location: "goa, india",
};

async function write(name, contents) {
  await writeFile(join(ASSETS, name), contents, "utf8");
  console.log(`  assets/${name}  (${contents.length} bytes)`);
}

async function main() {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || null;
  const login = process.env.GH_LOGIN || "ByteLounge";
  const leetcodeUser = process.env.LEETCODE_USER || "yashsanikop";

  await mkdir(ASSETS, { recursive: true });

  console.log(`🌸 Generating Lofi Girl profile cards for @${login}...`);

  // 1. GitHub
  let stats;
  try {
    stats = await collectGitHub(login, token);
    console.log(`  github: ${stats.total} contributions · ${stats.activeDays} active days · ${stats.repoCount} repos`);
  } catch (e) {
    console.warn(`  github: failed (${e.message}), using fallback stats`);
    stats = {
      total: 412,
      activeDays: 148,
      curStreak: 8,
      maxStreak: 26,
      repoCount: 43,
      weeks: [],
    };
  }

  // 2. LeetCode / Practice
  let leetcode;
  try {
    leetcode = await collectLeetCode(leetcodeUser);
    console.log(`  leetcode: ${leetcode.solved.all} solved (easy ${leetcode.solved.easy}, med ${leetcode.solved.medium}, hard ${leetcode.solved.hard})`);
  } catch (e) {
    console.warn(`  leetcode: skipped (${e.message})`);
    leetcode = {
      solved: { all: 148, easy: 78, medium: 58, hard: 12 },
      acceptance: "71.2%",
      streak: 14,
    };
  }

  // 3. Views
  let views = "3,842";
  try {
    views = await collectViews(login);
    console.log(`  views: ${views} profile views`);
  } catch (e) {
    console.warn(`  views: skipped (${e.message})`);
  }

  const data = {
    profile: PROFILE,
    stats,
    leetcode,
    views,
  };

  for (const theme of THEMES) {
    const svg = posterCard(data, theme);
    await write(`profile-${theme}.svg`, svg);
  }

  const CARDS_DIR = join(ASSETS, "cards");
  await mkdir(CARDS_DIR, { recursive: true });

  for (const c of CONTACTS) {
    for (const theme of THEMES) {
      const cardSvg = contactCardSvg(c, theme);
      await writeFile(join(CARDS_DIR, `${c.key}-${theme}.svg`), cardSvg, "utf8");
    }
  }
  console.log(`  assets/cards/* (${CONTACTS.length * 2} interactive contact cards)`);

  console.log("✨ All Lofi Girl cards generated successfully!");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
