import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const ICONS_TO_FETCH = [
  "c", "cplusplus", "python", "javascript", "typescript", "html5", "css3",
  "react", "tailwindcss", "flutter",
  "nodedotjs", "django", "dotnet", "firebase", "googlecloud",
  "arduino", "raspberrypi", "cmake", "linux", "ubuntu",
  "git", "github", "visualstudiocode", "blender", "figma", "canva", "adobephotoshop",
  "linkedin", "x", "discord", "instagram", "hackerrank", "stackoverflow", "gmail",
  "leetcode"
];

async function getIconPath(slug) {
  try {
    const res = await fetch(`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${slug}.svg`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const match = text.match(/<path\s+d="([^"]+)"/);
    if (match) return match[1];
  } catch (e) {
    console.error(`Failed ${slug}:`, e.message);
  }
  return null;
}

async function main() {
  const result = {};
  for (const slug of ICONS_TO_FETCH) {
    const p = await getIconPath(slug);
    if (p) {
      result[slug] = p;
      console.log(`Fetched ${slug}`);
    }
  }

  const content = `/**
 * Simple Icons SVG paths (CC0) 24x24 viewBox.
 */
export const ICONS = ${JSON.stringify(result, null, 2)};
`;

  await writeFile(join("scripts", "lib", "icons.mjs"), content, "utf8");
  console.log("Successfully wrote scripts/lib/icons.mjs");
}

main();
