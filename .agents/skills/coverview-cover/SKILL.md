---
name: coverview-cover
description: >-
  Generate blog/social cover images through the CoverView HTTP API
  (https://cover.soumendrak.com/api). Each cover keeps a consistent house style
  while the TITLE and ICON change every time. Use this whenever the user wants a
  cover, article header, social card, OG image, or thumbnail for a post — e.g.
  "make a cover for my post titled X with a React icon", "generate the Hashnode
  cover for this article", or any mention of CoverView or cover art. Especially
  use it when given a TITLE and the BLOG POST TEXT and asked to create a cover:
  read the text to pick a fitting icon and a photo keyword, then produce a
  stylish cover. Reach for it even when the user just gives a title and a
  topic/logo without naming CoverView.
---

# CoverView cover generator

Turn a **title** and an **icon** into a branded cover image via one HTTP call.
The look (theme, colour, pattern, font, size, author) stays constant — it's the
*house style* — and only the title and icon change per cover.

- **Base URL:** `https://cover.soumendrak.com/api` (override with `COVERVIEW_API`)
- **Endpoint:** `POST /generate` (JSON) or `GET /generate` (query params)
- **House style:** `assets/style.json` — the constant fields applied to every cover
- **Per-cover inputs:** `title`, `icon`, a photo `keyword`, and the `author`
  (the style supplies a default author; pass `--author` to set it per cover)

## Create a cover from a blog post

When you're given a **title** and the **blog post text** (or a draft/outline)
and asked to make a cover, the post text is only *read to infer* two things —
it never goes onto the image. The cover shows the title, an icon, and a photo.

1. **Title** — keep the user's title verbatim. Add `\n` line breaks so it
   balances over 2–3 short lines (split at natural phrase boundaries, not
   mid-phrase). Engine auto-wrap is unreliable, so set the breaks yourself.
2. **Icon** — pick the post's dominant technology and use its
   [devicon](https://devicon.dev) name: e.g. a piece on the OpenTelemetry
   Collector → `opentelemetry`; React → `react`; Postgres → `postgres`;
   Kubernetes → `kubernetes`. If there's no single clear technology, fall back
   to a built-in concept icon (`code`, `terminal`, `database`, `ai`,
   `security`).
3. **Author** — use the author the user gives for the post; pass it with
   `--author`. Only fall back to the style's default when none is provided.
4. **Photo keyword** — pick ONE concrete, photographable noun that captures the
   post's theme for the Unsplash search. Prefer vivid, literal subjects over
   abstractions: a post about building a data *pipeline* → `pipeline` (or
   `pipes`); databases → `server room`; security → `padlock`; networking →
   `network cables`. Abstract words ("scalability", "architecture") return weak
   photos — translate them into something you can photograph.
5. **Generate** the stylish cover (text panel left, keyword photo right):

```bash
python3 scripts/generate_cover.py \
  --style assets/style-blog.json \
  --title $'Ch8.2: Building\nYour First OTel\nCollector Pipeline' \
  --icon opentelemetry \
  --keyword pipeline \
  --author "Soumendra Kumar Sahoo" \
  --out cover.png
```

The photo comes from an Unsplash keyword *search*, so the exact image varies
each run — that's expected. If the user wants one specific photo, generate a few
and let them choose, or pass that photo's URL as `imageUrl` in the body instead.

## Generate a cover (the common path)

Use the bundled script. It loads `assets/style.json`, overlays the title + icon,
and saves the image. Standard-library Python only — no install needed.

```bash
python3 scripts/generate_cover.py --title "Your Post Title" --icon react --out cover.png
```

More examples (same style, different title + icon each time):

```bash
python3 scripts/generate_cover.py --title "Shipping Faster with Rust" --icon rust
python3 scripts/generate_cover.py --title "Scaling Postgres to 1B Rows" --icon postgres
python3 scripts/generate_cover.py --title "Fine-tuning LLMs on a Budget" --icon tensorflow
```

Useful flags:
- `--icon` — a built-in name (`python`, `docker`, `aws`, …) **or any
  [devicon](https://devicon.dev) name** (`tensorflow`, `vuejs`, `svelte`, …).
  For a custom logo image, edit the body to use `iconUrl` instead (see below).
- `--author "Name"` — override the style's default author.
- `--out path.png` — output file (default `cover.png`).
- `--style other.json` — use a different house style.

### Multi-line titles (exact wrapping)

Auto-wrap differs between rendering engines, so when you need a title to break at
specific points, put the breaks in yourself with `\n`:

```bash
python3 scripts/generate_cover.py \
  --title $'PyConf Hyderabad 2026: A\nHomecoming I Didn\'t Know\nI Needed' \
  --icon python
```

(The script also accepts a literal `\n` in a plain double-quoted string.)

## The house style

`assets/style.json` holds everything that stays the same across covers:

```json
{
  "theme": "basic",
  "bgColor": "#00bcd4",
  "pattern": "temple",
  "font": "font-Anek",
  "platform": "hashnode",
  "authorName": "Soumendra Kumar Sahoo"
}
```

Edit this file to re-brand every future cover at once — change the colour,
pattern, theme, platform size, or default author. The script merges
`{ "title": ..., "icon": ..., "unsplashQuery": ... }` on top of it per call.

Two presets ship with the skill (pass either via `--style`):
- `assets/style.json` — **basic** card on cyan with the `temple` pattern
  (title + icon, no photo). Good when there's no blog text to mine for a photo.
- `assets/style-blog.json` — **stylish** white text panel with a keyword photo
  on the right. The default for the "from a blog post" flow above.

## Without the script (raw API)

`POST` the merged body directly — only `title` is required, the rest is your
house style plus the per-cover icon:

```bash
curl -fsS -X POST https://cover.soumendrak.com/api/generate \
  -H "Content-Type: application/json" -o cover.png -d @- <<'JSON'
{"title":"Your Post Title","icon":"react","theme":"basic","bgColor":"#00bcd4","pattern":"temple","font":"font-Anek","platform":"hashnode","authorName":"Soumendra Kumar Sahoo"}
JSON
```

For a **custom logo** instead of a named icon, drop `icon` and add
`"iconUrl":"https://…/logo.png"`.

## Parameters and options

`references/parameters.md` documents every field, theme, pattern, font, icon, and
platform size — read it when you need a value you don't have memorised (e.g. a
different theme, pattern, or platform). The live, authoritative enums are always
at `https://cover.soumendrak.com/api/openapi.json`.

## Verify the result

Confirm you got an image, not a JSON error:

```bash
file cover.png        # expect: PNG image data, NNNN x NNNN
```

The script already turns an API error into a non-zero exit with the message; if
you call the API directly and get `application/json` back, read the `error`
field and fix the request (the most common cause is a missing `title`).

## Notes

- The API caches renders; add a throwaway param (`&cb=1`) on GET URLs to force a
  fresh render while iterating.
- The `basic` house style centres the title and places the icon and author along
  the bottom of the card. Other themes lay the icon out differently — see
  `references/parameters.md`.
