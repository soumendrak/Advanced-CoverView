# coverview-skill

Install the **CoverView cover-image agent skill** into any repository so your
coding agent (Claude Code and other agents that read `SKILL.md` skills) can
generate branded blog/social cover images.

## Quick start

From the root of your blog or app repo:

```bash
npx coverview-skill
```

That copies the skill into your project's skills directory. Then just ask your
agent:

> "Make a cover for my post titled *Scaling Postgres to 1B Rows* with a postgres icon"

The agent reads the skill and runs the bundled script for you.

## What gets installed

A self-contained skill directory:

```
<skills-dir>/coverview-cover/
  SKILL.md                     # instructions the agent reads
  scripts/generate_cover.py    # stdlib-only; POSTs to the CoverView API
  assets/style.json            # the constant "house style"
  assets/style-blog.json       # stylish photo preset
  references/parameters.md     # every theme/pattern/font/platform option
```

## Where it installs

By default it auto-detects:

- `./.claude/skills` if a `.claude` directory exists (Claude Code)
- else `./.agents/skills` if a `.agents` directory exists
- otherwise it creates `./.claude/skills`

Override the location:

```bash
npx coverview-skill --claude     # ./.claude/skills
npx coverview-skill --agents     # ./.agents/skills
npx coverview-skill --global     # ~/.claude/skills (all projects)
npx coverview-skill --dir=path/to/skills
npx coverview-skill --force      # overwrite an existing install
```

## Prerequisites

- **python3** — the generator script uses the standard library only (no
  `pip install`).
- Network access to `https://cover.soumendrak.com/api` (override with the
  `COVERVIEW_API` environment variable).

## Using it without an agent

```bash
python3 .claude/skills/coverview-cover/scripts/generate_cover.py \
  --title "Shipping Faster with Rust" --icon rust --out cover.png
```

## Maintainers

The canonical skill lives at `.agents/skills/coverview-cover/` in the
[CoverView](https://github.com/soumendrak/CoverView) repo. `npm pack` /
`npm publish` runs `scripts/sync-skill.js`, which copies that directory into
`skill/` here so the published package is self-contained.

```bash
npm run sync     # refresh the local ./skill copy
npm pack         # build a tarball to test locally
```
