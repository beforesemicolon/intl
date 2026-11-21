# Runnable Intl examples

- [Bundled selective component registration](npm-scoped/index.html):
  [entry](npm-scoped/app.js), [package.json](npm-scoped/package.json),
  [en messages](npm-scoped/locales/en.json), [pt messages](npm-scoped/locales/pt.json).
- [Runtime-only npm example](npm-runtime/app.js) with [package.json](npm-runtime/package.json).
- [Lazy common and route dictionaries](npm-runtime/route-locales.js), a runtime-only example with a reproducible out-of-order language change.
- [No-build locale switching](classic/locale-switch.html) with
  [en messages](classic/locales/en.json) and [pt messages](classic/locales/pt.json).
- [Offline API reference](../references/index.md) and [workflows](../references/workflows.md).

## npm

Copy one npm example directory to a writable location. After the exact
candidate versions are available on npm, run `npm install` then `npm start`.
The scoped UI serves a local page; change its Language control to Portuguese.
Expect the heading to change and text missing in Portuguese to fall back to
English. The runtime-only example bundles one script for Node and prints the
active and fallback messages. It does not require a DOM. From that same
`npm-runtime` directory, run `npm run start:routes` to check shared and
page messages, the per-language cache, and an out-of-order route response.

Before publication, install the matching Intl, Web Component and Markup
candidate tarballs instead of requesting unpublished versions from the npm
registry. Do not add the browser script bundle to the npm example.

## Classic

Serve the `classic` folder as the web root, for example
`python3 -m http.server 8000` from that directory. Open `/locale-switch.html`.
Do not open the page as a `file://` URL: translations are fetched over HTTP.
File paths in the local demo deliberately start at `/locales`.

The HTML pins Web Component and Intl from npm via CDN. Offline, extract the
matching browser files from the package tarballs and use local script paths
in the same order. The localized fallback text stays in the page until the
active locale is loaded.
