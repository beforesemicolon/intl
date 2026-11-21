---
name: AI reference
order: 5
title: Versioned API reference | Before Semicolon Intl
description: Look up Intl setup, locale scopes, elements, and formatters for the installed version.
layout: document
---

## Versioned API reference

Read `ai/index.json` in the installed package, or open the
[Intl versioned index](https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/ai/index.json).
Use the index to fetch one API record at a time. The index and records come from
the same npm tarball.

For automatic component registration, use the npm root entry or the full classic
client. The classic client requires Web Component first and exposes runtime and
formatter functions through `BFS.INTL`. For a package without an AI index, use
the source tag or commit for that package version. Do not substitute newer docs
for an older installed version.

Check the `intl/intl-locale` record for a browser locale switch. Use
`subscribeIntl` when you need load status, and call the returned function at
teardown.

## Package agent skill

Install or open the [Build with Before Semicolon Intl skill](https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/skills/beforesemicolon-intl/SKILL.md).
The same `skills/beforesemicolon-intl/SKILL.md` file ships in the npm tarball.
Use it to choose the right record for the version in your project.

Copy the full skill directory, including its manifest, local reference pages,
and runnable examples. The complete versioned library works offline.
