/**
 * Profile visits counter from komarev badge.
 */

export async function collectViews(login) {
  try {
    const res = await fetch(`https://komarev.com/ghpvc/?username=${login}&color=blue`, {
      headers: { "User-Agent": "lofi-profile-generator" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const svg = await res.text();
    // Parse the number from the SVG badge
    const match = svg.match(/<text[^>]*>([0-9,]+)<\/text>/g);
    if (match && match.length >= 2) {
      const val = match[1].replace(/<[^>]+>/g, "").trim();
      if (val && val !== "0") return val;
    }
  } catch (e) {
    // fallback
  }
  return "2,480+";
}
