---
name: beforesemicolon-intl
description: Build or debug scoped localization with @beforesemicolon/intl. Use for locale switching, translated messages, fallback, and localized number, date, duration, list, name, or plural formatting.
---

# Build with Before Semicolon Intl

## Match the project

1. Read the installed version from package metadata or the lockfile. In a
   no-build app, inspect the script URLs or import map. Report an unknown
   version; do not assume latest.
2. Open that version's `ai/index.json` and the record for the task. For
   browser-only access, use
   `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@VERSION/ai/index.json`.
   For a release without the index, look up its tagged source or docs.
3. Preserve the installation mode. The npm root import registers the Intl
   elements. The `runtime` and `formatters` subpaths work without that
   registration. If selecting individual component subpaths, call each default
   initializer with Web Component. A side-effect import does not register it.
   For classic pages, load Web Component first, then the full Intl client.
   Use `BFS.INTL`; independent classic scripts should not be assumed to share a
   scope with a provider.

## Choose records by task

- Mount a provider, choose a fallback, or switch languages: `intl/intl-locale`
  and `intl/runtime`. The provider record includes a packed locale-switch demo
  with two message files.
- Translate content: `intl/intl-msg`; look up the nearest mounted scope when
  necessary via `intl/provider-runtime` (npm).
- Format values: start with `intl/formatters` for script output, or look up the
  component by tag. Do not invent `format*` aliases.

## Apply the patterns

- Start with one top-level `intl-locale` for the application. Nest providers
  only when a subtree needs a distinct locale or messages. Use
  `update-document` only on the document's top-level provider.
- Use `key` on `intl-msg`, dotted paths for nested messages, and meaningful
  fallback text. Keep translations and templated values trusted. For untrusted
  strings, render through a text-only sink such as `textContent`.
- `fallback-locale` selects a fallback language. The separate `fallback`
  attribute displays slot content before messages load. `src-dir="/locales"`
  loads one JSON file per locale; serve those files over HTTP.
- After mount, switch the runtime with `setLocale(locale, scope)` (omit scope
  only for the default provider). Do not assume changing a provider attribute
  switches the mounted scope. Use `subscribeIntl` for runtime progress and
  unsubscribe on teardown. The 0.5 release has no
  `BFS.INTL.onLocaleMessagesLoaded` function.

## Verify the interaction

Check initial text, change the locale with a labeled control, and confirm the
translated content and document language where applicable. Include a key that
exists only in the fallback language. If the Before Semicolon checker is
installed, run it for static mistakes, then verify the browser behavior.
