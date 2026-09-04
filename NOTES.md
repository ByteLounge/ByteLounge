# Lofi Girl Profile Poster — Architecture & Maintenance Notes

Inspired by [Spacey6849/Spacey6849](https://github.com/Spacey6849/Spacey6849), this repository transforms the space/retro-futurist theme into a cozy, late-night **Lofi Girl study room** aesthetic.

Only `README.md` renders on your GitHub profile. Everything else generates and updates the two adaptive vector posters (`profile-dark.svg` and `profile-light.svg`) in `assets/`.

---

## 🌸 Repository Requirement

For this profile to show on your GitHub account ([github.com/ByteLounge](https://github.com/ByteLounge)):
1. The repository must be named exactly **`ByteLounge`** (`ByteLounge/ByteLounge`).
2. The repository must be **Public**.
3. `README.md` and `assets/` must be at the root of the `main` branch.

---

## 🎧 How the Cards Work

Unlike third-party card services that can go down, rate-limit, or look inconsistent, **everything is unified in a single high-definition SVG poster**:

```
assets/
  ├── profile-dark.svg       # "Late Night Study Session" theme
  └── profile-light.svg      # "Sunny Afternoon Café" theme
scripts/
  ├── generate-cards.mjs     # Main data collector & card renderer
  └── lib/
      ├── art.mjs            # Lofi Girl vector art, sleeping cat & animations
      ├── cards.mjs          # Master 880x1480 layout & coordinate flow
      ├── contacts.mjs       # Social profiles & handles
      ├── github.mjs         # GitHub GraphQL & resilient REST fallback
      ├── icons.mjs          # Clean Simple Icons vector paths
      ├── leetcode.mjs       # Problem solving stats collector
      ├── stack.mjs          # Tech stack chip categories
      ├── svg.mjs            # Theme palettes, SVG primitives & CSS keyframes
      └── views.mjs          # Live profile visits counter
.github/workflows/
  └── update-cards.yml       # Daily automated GitHub Action updater
```

### ☕ The Lofi Girl Aesthetic

1. **The Study Vignette**:
   - **Lofi Girl**: Studious silhouette with signature over-ear headphones, cozy oversized sweater, ponytail with scrunchie, hand writing in her open study notebook.
   - **Curled Ginger Cat**: Snoozing peacefully on her desk, with a smooth, rhythmic slow-breathing animation (`@keyframes cat-breathe`).
   - **Desk Lamp**: Conical brass lamp casting a warm amber cone of light with an ambient breathing glow (`@keyframes lampPulse`).
   - **Steaming Ceramic Mug**: Hot coffee/matcha with spiraling steam wisps rising upwards (`@keyframes steamRise`).
   - **Rainy Window**: Droplets trickling down the window pane with soft glowing city bokeh lights outside.
   - **Now Playing Audio Visualizer**: A retro cassette/headphone player with 5 equalizer sound bars dancing to the beat (`@keyframes eqBounce`).

2. **Dual-Theme Support**:
   - **Dark Mode ("Lofi Night")**: Deep midnight indigo background (`#0f1016`), soft slate violet borders, amber lamp glow, gentle lavender, matcha green, and sakura pink accents.
   - **Light Mode ("Lofi Café")**: Warm washi paper / cream background (`#faf7f2`), toasted caramel coffee accents, rich cocoa borders, matcha leaf green, and berry rose.

3. **Sections**:
   - **Header & Identity**: Japanese aesthetic tag, name, title, university, location, study sessions counter.
   - **Tech Stack / Study Essentials**: Grouped chips (Languages, Frontend, Backend & Cloud, Embedded & Robotics, Creative & Tools) with breathing fill opacity.
   - **GitHub Activity / Study Journal**: Total contributions, active days, current streak, public repo count, and a 52-week contribution heatmap calendar.
   - **Daily Practice / Problem Solving**: Total solved count, acceptance rate, practice streak, and Easy / Medium / Hard progress bars.
   - **Lo-Fi Lounge / Reach Out**: Clean cards for GitHub, LinkedIn, Portfolio, Discord, Twitter/X, HackerRank, Instagram, and Email.

---

## ⚡ Interactive Links

In standard GitHub profile SVGs embedded via `<img>`, inner `<a>` anchor tags are inactive due to GitHub's markdown image sanitization. To give visitors instant clickable navigation, `README.md` includes a matching row of clickable shields badges directly below the poster for:
- 🌐 Portfolio
- 💼 LinkedIn
- 🐦 Twitter / X
- 💬 Discord
- 💻 HackerRank
- ✉️ Email

---

## 🔄 Daily Automated Updates (GitHub Actions)

`.github/workflows/update-cards.yml` automatically runs every day at 00:30 UTC (06:00 IST) and commits updated stats to `assets/`.

### Setting up Private Contributions (Optional)
By default, the workflow uses GitHub's built-in `GITHUB_TOKEN` to read public contributions. If you want your private contributions counted too:
1. Go to GitHub **Settings** → **Developer Settings** → **Personal access tokens** → **Tokens (classic)**.
2. Generate a token with `read:user` and `repo` scopes.
3. In your `ByteLounge/ByteLounge` repo, go to **Settings** → **Secrets and variables** → **Actions**.
4. Add a repository secret named **`PROFILE_TOKEN`** with your generated token.

---

## 🛠️ Local Build & Customization

To regenerate the cards locally at any time:

```bash
# Run the generator
npm run build

# Or with Node directly
node scripts/generate-cards.mjs
```

### Customizing Tech Stack
Edit `scripts/lib/stack.mjs` to add, reorder, or update your tech chips.

### Customizing Contact Links
Edit `scripts/lib/contacts.mjs` to adjust handles or add new socials.
