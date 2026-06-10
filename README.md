<h1 align="center">Advanced CoverView</h1>

<p align="center">Create beautiful cover images for your blogs and social posts — in seconds.</p>

<p align="center">
  <a href="https://github.com/soumendrak/Advanced-CoverView"><img src="https://img.shields.io/github/stars/soumendrak/Advanced-CoverView.svg?style=social&label=Star"></a>
  <a href="https://github.com/soumendrak/Advanced-CoverView"><img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
</p>

<p align="center">
  <img src="./docs/acv-screenshot.webp" width="800" alt="CoverView editor screenshot">
</p>

---

## 🤖 Generate covers from your editor — `npx coverview-skill`

The fastest way to use CoverView is to let your AI coding agent (Claude Code,
Cursor, Codex, …) build covers for you. One command installs the
[agent skill](https://skills.sh) into your repo:

```bash
npx coverview-skill            # auto-detects ./.claude or ./.agents
npx coverview-skill --global   # install for every project (~/.claude/skills)
```

Then just describe your post to your agent:

> *"Create a blog cover. Title: **Ship It Friday: Our Zero-Downtime Postgres
> Migration**. Author: **Priya Sharma**. Here's the draft — we moved a 2 TB
> production Postgres database to a new cluster with zero downtime using logical
> replication, a shadow table, and a final cutover behind a feature flag…"*

The skill reads the post **only to infer** a fitting icon and photo keyword (the
post text never appears on the image), balances the title across lines, keeps
your author, and renders the cover via the API:

```bash
python3 .agents/skills/coverview-cover/scripts/generate_cover.py \
  --style .agents/skills/coverview-cover/assets/style-blog.json \
  --title $'Ship It Friday:\nOur Zero-Downtime\nPostgres Migration' \
  --icon postgres \
  --keyword "server racks" \
  --author "Priya Sharma" \
  --out cover.png
```

**What it generated:**

<p align="center">
  <img src="./docs/example-api-cover.png" width="800" alt="Generated CoverView cover">
</p>

> The right-hand image comes from a live Unsplash keyword search, so every run
> returns a different on-topic photo.

### Customising the skill

Two house-style presets ship with it — edit one to re-brand every cover at once
(default author, colour, font, platform):

- `assets/style.json` — **basic** card on a solid colour with a pattern (title + icon).
- `assets/style-blog.json` — **stylish** text panel with a keyword photo (the blog flow above).

Prefer to install by hand? Copy
[`.agents/skills/coverview-cover/`](.agents/skills/coverview-cover) into your
agent's skills directory. The skill's
[`SKILL.md`](.agents/skills/coverview-cover/SKILL.md) and
[`references/parameters.md`](.agents/skills/coverview-cover/references/parameters.md)
document every option.

---

## ⚡ Features

- 🚀 Super fast and easy to use
- ✨ Unsplash integration to search images
- 🌈 7 different themes, multiple fonts
- 🌠 100+ dev icons, with the option to upload a custom icon
- 💾 Cover sizes per blogging platform (Hashnode, Dev.to, and more)
- 🔌 **HTTP API** — generate covers programmatically, no browser ([docs](#-http-api))
- 🤖 **Agent skill** — let an AI agent build a cover from your title + blog post ([above](#-generate-covers-from-your-editor--npx-coverview-skill))

### 🎨 Enhanced customization
- **Platform presets** — pre-configured dimensions for Hashnode, Dev.to, Medium, LinkedIn, Twitter, Facebook, YouTube, and custom sizes
- **Pattern backgrounds** — 16 SVG pattern options (graph-paper, jigsaw, dots, circuit-board, and more)
- **Color preset swatches** — quick color selection with a collapsible palette

### 🖼️ Enhanced Unsplash integration
- **Pagination** — a "Load More Images" button to browse beyond the initial 30 results
- **Search persistence** — search term preserved when selecting/deselecting images
- **Scroll memory** — returns to your exact scroll position after closing a selected image
- **State caching** — all loaded images cached to avoid re-fetching

---

## 🔌 HTTP API

Every feature of the editor is also available programmatically — no browser
needed. The API is a Cloudflare Pages Function served under `/api`, rendered with
[Satori](https://github.com/vercel/satori) (via `workers-og`).

It supports all **7 layout themes** (including the `preview` browser mockup and
`mobile` phone mockup), the full **devicon** icon library plus custom logo URLs,
**18 background patterns**, single-`bgColor` palettes and presets, **Unsplash**
keyword backgrounds, six fonts, **13 platform sizes**, and PNG or SVG output.

- **Docs (Swagger UI, light/dark):** https://cover.soumendrak.com/api/
- **OpenAPI spec:** https://cover.soumendrak.com/api/openapi.json

### Generate a cover

`GET /api/generate` (query params) or `POST /api/generate` (JSON body). `title`
is required.

```bash
# Quick GET
curl "https://cover.soumendrak.com/api/generate?title=Hello+World&theme=modern&icon=react&bgColor=%230f0c29&author=Jane" -o cover.png

# Full POST
curl -X POST https://cover.soumendrak.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"title":"Async Python","subtitle":"Concurrency made simple","theme":"preview","imageUrl":"https://example.com/screenshot.png","bgColor":"#581b98","author":"Soumendra"}' \
  -o cover.png
```

### Parameters

| Param | Description |
|-------|-------------|
| `title` *(required)* | Cover title |
| `subtitle` | Optional subtitle |
| `theme` | Layout: `background`, `stylish`, `basic`, `modern`, `outline`, `preview` (browser mockup), `mobile` (phone mockup). `dark`/`light`/`gradient` are legacy colour aliases |
| `bgColor` | Primary background colour as hex (e.g. `#949ee5`) — drives the palette, like the editor |
| `colorPreset` | Named preset (`purple`, `sunset`, `mint`, …) |
| `colors` | Advanced override `{bg,text,accent}` (POST only) |
| `icon` | Built-in accent icon (react, python, docker, …) **or any [devicon](https://devicon.dev) name** (tensorflow, vuejs, …) |
| `iconUrl` | URL of a custom icon/logo image (the editor's "upload your own") |
| `imageUrl` | Background photo (`background`/`stylish`) or screenshot (`preview`/`mobile`) |
| `unsplashQuery` | Search Unsplash for a background photo |
| `pattern` | One of 18 background patterns |
| `platform` | Size preset: hashnode, dev, twitter, linkedin-post, instagram, youtube, … |
| `font` | `font-serif`, `font-sans`, `font-mono`, `font-Inter`, `font-Poppins`, `font-Anek` |
| `authorName` / `author` | Author name shown on the cover |
| `format` | `png` (default) or `svg` |
| `width` / `height` | Custom dimensions (override platform) |

---

## 👩‍💻 Developing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```shell
git clone https://github.com/soumendrak/Advanced-CoverView.git
cd Advanced-CoverView/
npm start
```

## 👇 Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

1. Fork it (<https://github.com/soumendrak/Advanced-CoverView/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## 🙏 Acknowledgments

- [dom-to-image](https://github.com/tsayen/dom-to-image)
- [Hero Patterns](https://www.heropatterns.com/)
- [Devicons](https://github.com/devicons/devicon)

---

<p align="center">
  Don't forget to leave a ⭐ if you found this useful!<br>
  Also check out more products I built at <a href="https://soumendrak.com">soumendrak.com</a>.
</p>
