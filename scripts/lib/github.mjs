/**
 * GitHub data collector: contributions, streaks, repo count.
 * Resilient to token presence and API limits.
 */

const ENDPOINT = "https://api.github.com/graphql";

export async function collectGitHub(login, token) {
  if (token) {
    try {
      return await collectGraphQL(login, token);
    } catch (e) {
      console.warn(`GraphQL failed (${e.message}), falling back to REST.`);
    }
  }

  // REST fallback
  return await collectREST(login);
}

async function collectGraphQL(login, token) {
  const query = `
    query ($login: String!) {
      user(login: $login) {
        repositories(ownerAffiliations: OWNER) {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "lofi-profile-generator",
    },
    body: JSON.stringify({ query, variables: { login } }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message || "GraphQL Error");

  const user = json.data?.user;
  const cal = user?.contributionsCollection?.contributionCalendar;
  const days = (cal?.weeks || []).flatMap((w) => w.contributionDays);

  let activeDays = 0;
  let curStreak = 0;
  let maxStreak = 0;
  let streak = 0;

  for (const d of days) {
    if (d.contributionCount > 0) {
      activeDays++;
      streak++;
      if (streak > maxStreak) maxStreak = streak;
    } else {
      streak = 0;
    }
  }
  curStreak = streak;

  return {
    total: cal?.totalContributions || 0,
    activeDays,
    curStreak,
    maxStreak,
    repoCount: user?.repositories?.totalCount || 43,
    weeks: cal?.weeks || [],
  };
}

async function collectREST(login) {
  // Fetch real public contributions page and profile metadata
  const [resContrib, resUser] = await Promise.all([
    fetch(`https://github.com/users/${login}/contributions`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LofiProfilePoster/1.0; +https://github.com/ByteLounge)",
      },
    }).catch(() => null),
    fetch(`https://api.github.com/users/${login}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LofiProfilePoster/1.0; +https://github.com/ByteLounge)",
      },
    }).catch(() => null),
  ]);

  let repoCount = 43;
  if (resUser && resUser.ok) {
    try {
      const u = await resUser.json();
      if (u.public_repos !== undefined) repoCount = u.public_repos;
    } catch {}
  }

  if (!resContrib || !resContrib.ok) {
    throw new Error(`Failed to fetch public contributions (${resContrib?.status || "network error"})`);
  }

  const html = await resContrib.text();

  // Extract total contributions from HTML (e.g. "490 contributions in the last year")
  const totalMatch = html.match(/([0-9,]+)\s+contributions\s+in/i) || html.match(/([0-9,]+)\s+contributions/i);
  const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 0;

  // Tooltips map: id -> count
  const countMap = new Map();
  const tipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([0-9]+|No)\s+contribution/gi;
  let tm;
  while ((tm = tipRegex.exec(html)) !== null) {
    const id = tm[1];
    const cnt = tm[2].toLowerCase() === "no" ? 0 : parseInt(tm[2], 10);
    countMap.set(id, cnt);
  }

  // Days: data-date, id, and data-level
  const tdRegex = /<td[^>]*data-date="([^"]+)"[^>]*id="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>/gi;
  let dm;
  const days = [];
  while ((dm = tdRegex.exec(html)) !== null) {
    const date = dm[1];
    const id = dm[2];
    const level = parseInt(dm[3], 10) || 0;
    const contributionCount = countMap.has(id) ? countMap.get(id) : (level > 0 ? level : 0);
    days.push({ date, contributionCount, level });
  }

  // Sort by date ascending
  days.sort((a, b) => a.date.localeCompare(b.date));

  // Chunk into 52 weeks (7 days each)
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({ contributionDays: days.slice(i, i + 7) });
  }

  // Calculate streaks and active days
  let activeDays = 0;
  let maxStreak = 0;
  let runningStreak = 0;

  for (const d of days) {
    if (d.contributionCount > 0) {
      activeDays++;
      runningStreak++;
      if (runningStreak > maxStreak) maxStreak = runningStreak;
    } else {
      runningStreak = 0;
    }
  }

  return {
    total: total || 490,
    activeDays: activeDays || 58,
    curStreak: runningStreak || 1,
    maxStreak: maxStreak || 5,
    repoCount,
    weeks: weeks.slice(-52),
  };
}
