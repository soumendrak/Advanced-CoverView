#!/usr/bin/env node
"use strict";

/**
 * Sync the canonical skill into this package so it ships inside the npm tarball.
 *
 * The single source of truth is `.agents/skills/coverview-cover/` at the repo
 * root. We copy it into `skill/` here at pack/publish time so the published
 * package is self-contained (npm only includes files inside the package dir).
 */

const fs = require("fs");
const path = require("path");

const pkgRoot = path.resolve(__dirname, "..");
const source = path.resolve(pkgRoot, "..", ".agents", "skills", "coverview-cover");
const dest = path.join(pkgRoot, "skill");

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(src, dst);
    } else if (entry.isFile()) {
      fs.copyFileSync(src, dst);
    }
  }
}

if (!fs.existsSync(path.join(source, "SKILL.md"))) {
  console.error(`[coverview-skill] canonical skill not found at: ${source}`);
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
copyDir(source, dest);
console.log(`[coverview-skill] synced skill from ${source} -> ${dest}`);
