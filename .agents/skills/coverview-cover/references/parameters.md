# CoverView API parameters

`POST /generate` (JSON body) or `GET /generate` (query params). Only `title` is
required. The authoritative, always-current enums live at
`https://cover.soumendrak.com/api/openapi.json`.

## All parameters

| Param | Type | Notes |
|-------|------|-------|
| `title` | string | **Required.** Embed `\n` to force line breaks (GET: `%0A`). |
| `subtitle` | string | Optional secondary line. |
| `theme` | enum | Layout — see below. Default `basic`. |
| `bgColor` | hex string | Primary background colour, e.g. `#00bcd4`. Drives the whole palette. |
| `colorPreset` | enum | Named palette (sets bg + accent). Overridden by `bgColor`/`colors`. |
| `colors` | object | Advanced override: `{ "bg": "#…", "text": "#…", "accent": "#…" }`. |
| `icon` | string | Built-in name or any devicon name (see below). |
| `iconUrl` | url | Custom icon/logo image (overrides `icon`). |
| `imageUrl` | url | Background photo (`background`/`stylish`) or screenshot (`preview`/`mobile`). |
| `unsplashQuery` | string | Auto-fetch a background photo; only used by `background`/`stylish`. |
| `pattern` | enum | Background pattern overlay (see below). |
| `font` | enum | Font family (see below). |
| `authorName` / `author` | string | Author shown on the cover (aliases). |
| `platform` | enum | Size preset (see below). |
| `width` / `height` | integer | Custom size; overrides `platform`. Max 2400×1800. |
| `format` | `png` \| `svg` | Output format. Default `png`. |

## Themes (layouts)

| theme | Layout |
|-------|--------|
| `background` | Full-bleed photo/colour with text overlaid. Uses `imageUrl`/`unsplashQuery`. |
| `stylish` | Split: text panel on the left, photo on the right. Uses a photo. |
| `basic` | White rounded card centred on a colour. Title centred, author bottom-right. |
| `modern` | Accent disc with the icon on the left, white title card on the right. |
| `outline` | Bordered, centred column. |
| `preview` | macOS browser-window mockup wrapping a screenshot (`imageUrl`). |
| `mobile` | Phone mockup wrapping a screenshot (`imageUrl`). |
| `dark` / `light` / `gradient` | Legacy colour aliases of `basic`. |

## Patterns (18)

`graph-paper`, `jigsaw`, `hideout`, `dots`, `falling-triangles`, `circuit-board`,
`temple`, `anchors`, `brickwall`, `overlapping-circles`, `wiggle`, `tic-tac-toe`,
`leaf`, `bubbles`, `squares`, `explorer`, `jupiter`, `sun`.

Patterns render at full strength on solid backgrounds and are dialled back when
they sit over a photo.

## Fonts

`font-serif`, `font-sans`, `font-mono`, `font-Inter`, `font-Poppins`, `font-Anek`
(short aliases also accepted: `serif`, `sans`, `mono`, `inter`, `poppins`,
`anek`, plus `merriweather`, `fira-code`, `jetbrains`).

## Icons

- **Built-in (accent-coloured):** `react`, `go`, `python`, `rust`, `javascript`,
  `typescript`, `docker`, `kubernetes`, `github`, `postgres`, `aws`, `nodejs`,
  `git`, `grafana`, `css`, `figma`, `terminal`, `code`, `ai`, `database`,
  `security`.
- **Any [devicon](https://devicon.dev) name** also works (e.g. `tensorflow`,
  `vuejs`, `amazonwebservices`, `svelte`) — resolved from the devicon library.
- **Custom logo:** pass `iconUrl` with an image URL instead.

## Color presets

`purple`, `green`, `violet`, `lime`, `orange`, `indigo`, `rose`, `lavender`,
`mint`, `coral`, `sky`, `sunset`.

## Platform sizes (px)

| platform | size | platform | size |
|----------|------|----------|------|
| `hashnode` | 1600×840 | `wordpress` | 1200×628 |
| `dev` | 1000×420 | `tumblr` | 1280×720 |
| `linkedin-post` | 1200×627 | `youtube` | 1280×720 |
| `linkedin-article` | 1280×720 | `instagram` | 1080×1080 |
| `twitter` | 1200×675 | `pinterest` | 1000×1500 |
| `facebook` | 1200×630 | `custom` | 1200×630 |
| `medium` | 1500×750 | | |
