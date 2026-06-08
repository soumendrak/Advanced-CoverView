#!/usr/bin/env node
"use strict";

/**
 * coverview-skill — install the CoverView cover-image agent skill into a repo.
 *
 * Copies the bundled skill into the project's agent-skills directory so a
 * coding agent (Claude Code, etc.) can discover it and generate cover images.
 * Zero runtime dependencies — pure Node fs.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const SKILL_NAME = "coverview-cover";
const bundledSkill = path.resolve(__dirname, "..", "skill");

function parseArgs(argv) {
  const opts = { force: false, target: null, dir: null, help: false };
  for (const arg of argv) {
    switch (arg) {
      case "-h":
      case "--help":
        opts.help = true;
        break;
      case "-f":
      case "--force":
        opts.force = true;
        break;
      case "--claude":
        opts.target = "claude";
        break;
      case "--agents":
        opts.target = "agents";
        break;
      case "--global":
        opts.target = "global";
        break;
      default:
        if (arg.startsWith("--dir=")) {
          opts.dir = arg.slice("--dir=".length);
        } else {
          console.error(`Unknown option: ${arg}\n`);
          opts.help = true;
        }
    }
  }
  return opts;
}

function usage() {
  console.log(`coverview-skill — install the CoverView cover-image agent skill

Usage:
  npx coverview-skill [options]

Options:
  --claude        Install into ./.claude/skills (Claude Code)
  --agents        Install into ./.agents/skills (cross-agent convention)
  --global        Install into ~/.claude/skills (available to every project)
  --dir=<path>    Install into a custom skills directory
  -f, --force     Overwrite an existing install
  -h, --help      Show this help

With no target flag it auto-detects: ./.claude if present, else ./.agents,
otherwise it defaults to ./.claude/skills.
`);
}

function resolveSkillsDir(opts) {
  if (opts.dir) return path.resolve(opts.dir);
  if (opts.target === "global") return path.join(os.homedir(), ".claude", "skills");
  if (opts.target === "claude") return path.resolve(".claude", "skills");
  if (opts.target === "agents") return path.resolve(".agents", "skills");
  // Auto-detect from what already exists in the project.
  if (fs.existsSync(path.resolve(".claude"))) return path.resolve(".claude", "skills");
  if (fs.existsSync(path.resolve(".agents"))) return path.resolve(".agents", "skills");
  return path.resolve(".claude", "skills");
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dst);
    else if (entry.isFile()) fs.copyFileSync(src, dst);
  }
}

function relativeFromCwd(p) {
  const rel = path.relative(process.cwd(), p);
  return rel.startsWith("..") ? p : rel || ".";
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    usage();
    return;
  }

  if (!fs.existsSync(path.join(bundledSkill, "SKILL.md"))) {
    console.error(
      "Error: bundled skill is missing. This package was built incorrectly."
    );
    process.exit(1);
  }

  const skillsDir = resolveSkillsDir(opts);
  const target = path.join(skillsDir, SKILL_NAME);

  if (fs.existsSync(target) && !opts.force) {
    console.error(
      `Skill already installed at ${relativeFromCwd(target)}\n` +
        "Re-run with --force to overwrite."
    );
    process.exit(1);
  }

  fs.rmSync(target, { recursive: true, force: true });
  copyDir(bundledSkill, target);

  const shown = relativeFromCwd(target);
  console.log(`\n  ✓ Installed CoverView skill -> ${shown}\n`);
  console.log("  Prerequisites: python3 (standard library only) + network access");
  console.log("  to https://cover.soumendrak.com/api\n");
  console.log("  Your coding agent will now auto-discover it. Try asking:");
  console.log('    "Make a cover for my post titled X with a React icon"\n');
  console.log("  Or run the bundled script directly:");
  console.log(
    `    python3 ${path.join(shown, "scripts", "generate_cover.py")} \\\n` +
      '      --title "Your Post Title" --icon react --out cover.png\n'
  );
}

main();
