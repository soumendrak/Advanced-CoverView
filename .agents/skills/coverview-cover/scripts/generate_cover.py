#!/usr/bin/env python3
"""Generate a CoverView cover image, varying the title and icon per call.

The constant "house style" (theme, colour, pattern, font, platform, author)
lives in ``assets/style.json``. Each cover only changes its ``title`` and
``icon`` (and optionally the author), which this script overlays before POSTing
to the CoverView API. No third-party dependencies — standard library only.
"""

from __future__ import annotations

import argparse
import json
import os
import urllib.error
import urllib.request
from pathlib import Path

DEFAULT_API = "https://cover.soumendrak.com/api"
DEFAULT_STYLE = Path(__file__).resolve().parent.parent / "assets" / "style.json"


def build_body(
    style: dict,
    title: str,
    icon: str | None,
    author: str | None,
    keyword: str | None,
) -> dict:
    """Overlay the per-cover fields onto the constant house style.

    Args:
        style: The base style dict loaded from a style JSON file.
        title: Cover title; real newlines force exact line wrapping.
        icon: Icon name (built-in or any devicon name), or None.
        author: Author override, or None to keep the style's default.
        keyword: Unsplash search keyword for the background photo (used by the
            ``stylish`` and ``background`` themes), or None.

    Returns:
        The request body for ``POST /generate``.
    """
    body = dict(style)
    body["title"] = title
    if icon:
        body["icon"] = icon
    if author:
        body["authorName"] = author
    if keyword:
        body["unsplashQuery"] = keyword
    return body


def generate(body: dict, api: str, out: Path) -> None:
    """POST the body to the API and write the returned image to ``out``.

    Raises:
        SystemExit: If the API returns an error (non-image response).
    """
    req = urllib.request.Request(
        f"{api.rstrip('/')}/generate",
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            payload = resp.read()
    except urllib.error.HTTPError as exc:
        raise SystemExit(f"API error {exc.code}: {exc.read().decode(errors='replace')}")
    out.write_bytes(payload)
    print(f"Saved {out} ({len(payload)} bytes)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate a CoverView cover image.")
    parser.add_argument("--title", required=True, help=r"Cover title; use \n for line breaks")
    parser.add_argument("--icon", help="Icon name (built-in or any devicon name, e.g. react, tensorflow)")
    parser.add_argument("--keyword", help="Unsplash search keyword for the background photo (stylish/background themes)")
    parser.add_argument("--author", help="Override the author name from the style")
    parser.add_argument("--style", type=Path, default=DEFAULT_STYLE, help="House-style JSON (default: assets/style.json)")
    parser.add_argument("--out", type=Path, default=Path("cover.png"), help="Output image path")
    parser.add_argument("--api", default=os.environ.get("COVERVIEW_API", DEFAULT_API), help="API base URL")
    args = parser.parse_args()

    style = json.loads(args.style.read_text())
    # Allow a literal "\n" typed on the command line to mean a real line break.
    title = args.title.replace("\\n", "\n")
    body = build_body(style, title, args.icon, args.author, args.keyword)
    generate(body, args.api, args.out)


if __name__ == "__main__":
    main()
