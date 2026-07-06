# Translation Builder Plan

## Objective

Add an optional translation extraction and generation utility for `@beforesemicolon/intl` that keeps the runtime no-build and HTML-first, while giving teams a maintainable way to generate locale files from `<intl-msg>` fallback text.

The package should continue to work with hand-written locale JSON files. The builder should be a developer workflow layer:

1. Scan source files for `<intl-locale>` and `<intl-msg>`.
2. Collect fallback text from `<intl-msg>...</intl-msg>`.
3. Generate stable message keys when a key is missing.
4. Write source locale files, usually English.
5. Optionally generate target locale files through a user-provided translator.
6. Optionally rewrite source markup with generated `key` attributes.
7. Respect locale file routing implied by nearby `<intl-locale>` attributes.

The runtime should not depend on the builder.

---

## Rationale

The runtime already supports readable fallback text:

```html
<intl-msg key="hero.title">Internationalization in plain HTML.</intl-msg>
```

That is a good authoring model because the page has meaningful text before messages load, crawlers can inspect useful content, and users are not left with empty tags.

The fragile version is using raw text as the runtime lookup key:

```html
<intl-msg>Internationalization in plain HTML.</intl-msg>
```

If runtime lookup uses the text directly, changing punctuation or copy silently changes the lookup key. Developers then have to remember to update translation JSON manually. That is easy to miss.

The builder solves this by treating fallback text as source material, not as the durable key. It can generate and preserve stable keys:

```html
<intl-msg key="hero.title">Internationalization in plain HTML.</intl-msg>
```

or, when no semantic key is available:

```html
<intl-msg key="intl_4f7a9c">Internationalization in plain HTML.</intl-msg>
```

The source text stays readable in HTML. The key stays durable in JSON.

---

## Public API

Add a Node-only builder entrypoint:

```ts
import { generateTranslations } from '@beforesemicolon/intl/builder'

await generateTranslations({
    srcDir: 'src',
    targetDir: 'public/locales',
    sourceLocale: 'en',
    locales: ['es', 'fr', 'pt'],
    rewrite: true,
    translate: async ({ text, locale, sourceLocale, key, file, scope }) => {
        return myTranslationProvider.translate(text, {
            from: sourceLocale,
            to: locale,
            context: `${file}:${scope.output}`,
        })
    },
})
```

### Export

Add an export path:

```json
{
  "exports": {
    "./builder": {
      "import": "./dist/esm/builder.js",
      "require": "./dist/cjs/builder.js",
      "default": "./dist/cjs/builder.js",
      "types": "./dist/types/builder.d.ts"
    }
  }
}
```

The builder should be implemented in `src/builder.ts` or `src/builder/index.ts`.

### Function Signature

```ts
export interface GenerateTranslationsOptions {
    srcDir?: string
    files?: string[]
    targetDir?: string
    sourceLocale?: string
    locales?: string[]
    include?: string[]
    exclude?: string[]
    rewrite?: boolean | RewriteOptions
    dryRun?: boolean
    preserveRemoved?: boolean
    keyStrategy?: 'path' | 'hash' | 'text-hash'
    missingTargetValue?: 'empty' | 'source'
    format?: 'nested' | 'flat'
    translate?: TranslateMessage
    logger?: TranslationBuilderLogger
}
```

Defaults:

```ts
{
    srcDir: process.cwd(),
    targetDir: 'locales',
    sourceLocale: 'en',
    locales: [],
    include: ['**/*.html', '**/*.htm'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/website/**'],
    rewrite: false,
    dryRun: false,
    preserveRemoved: true,
    keyStrategy: 'path',
    missingTargetValue: 'empty',
    format: 'nested'
}
```

### Translate Hook

Do not ship a default Google Translate integration inside the core package. A default network translator would add credentials, billing, rate limits, privacy, and quality expectations to a package whose runtime is otherwise small and explicit.

The core builder should default to no network translation:

- source locale values are generated from fallback text
- target locale files are generated with empty values or source text, based on `missingTargetValue`
- users can provide `translate` when they want automatic target-language generation

```ts
export interface TranslateMessageInput {
    text: string
    locale: string
    sourceLocale: string
    key: string
    file: string
    scope: TranslationScope
    description?: string
}

export type TranslateMessage = (
    input: TranslateMessageInput
) => Promise<string | undefined> | string | undefined
```

Later, provider adapters can be separate packages or examples:

- `@beforesemicolon/intl-google-translate`
- `@beforesemicolon/intl-openai-translate`
- docs examples for DeepL, Google Cloud Translate, and custom internal translation memory

---

## CLI

Add a CLI bin so teams can run extraction without writing a script:

```json
{
  "bin": {
    "intl-generate": "./dist/bin/intl-generate.js"
  }
}
```

Usage:

```sh
npx intl-generate --src src --target public/locales --source en --locales es,fr,pt --rewrite
```

Recommended script:

```json
{
  "scripts": {
    "intl:generate": "intl-generate --src src --target public/locales --source en --locales es,fr,pt --rewrite"
  }
}
```

The CLI should also support config files:

```sh
npx intl-generate --config intl.config.js
```

Example config:

```js
export default {
    srcDir: 'src',
    targetDir: 'public/locales',
    sourceLocale: 'en',
    locales: ['es', 'fr', 'pt'],
    rewrite: true,
}
```

---

## Markup Rules

### Basic Extraction

Source:

```html
<intl-locale locale="en" src="/locales/en.json">
    <h1><intl-msg>Internationalization in plain HTML.</intl-msg></h1>
</intl-locale>
```

Generated `public/locales/en.json`:

```json
{
  "intl_4f7a9c": "Internationalization in plain HTML."
}
```

If `rewrite: true`, source becomes:

```html
<intl-locale locale="en" src="/locales/en.json">
    <h1><intl-msg key="intl_4f7a9c">Internationalization in plain HTML.</intl-msg></h1>
</intl-locale>
```

### Existing Keys

Existing keys must be preserved:

```html
<intl-msg key="hero.title">Internationalization in plain HTML.</intl-msg>
```

Generated:

```json
{
  "hero": {
    "title": "Internationalization in plain HTML."
  }
}
```

If `format: 'flat'`:

```json
{
  "hero.title": "Internationalization in plain HTML."
}
```

### Existing Values

If a generated key already exists in the source locale file and the fallback text changed, the source locale should update to the new fallback text by default.

Example before:

```json
{
  "hero": {
    "title": "Old title"
  }
}
```

Current markup:

```html
<intl-msg key="hero.title">New title</intl-msg>
```

Generated:

```json
{
  "hero": {
    "title": "New title"
  }
}
```

Target locale behavior should be conservative. Existing non-empty target translations should not be overwritten unless a future `overwriteTargets` option is added.

### Empty Messages

Do not extract empty tags:

```html
<intl-msg></intl-msg>
```

Emit a warning with file and location.

### Dynamic Messages

Do not extract dynamic-only content:

```html
<intl-msg key="cart.itemCount">
    <span data-count></span>
</intl-msg>
```

The builder should warn that the fallback is not plain text. Runtime support can still render it, but extraction should avoid guessing.

### Message Values

Message interpolation should stay explicit:

```html
<intl-msg key="cart.total" values='{"total":"$120.00"}'>
    Total: {total}
</intl-msg>
```

Generated:

```json
{
  "cart": {
    "total": "Total: {total}"
  }
}
```

The builder does not need to validate ICU syntax in the first version, but it should preserve braces and not HTML-escape message text in JSON.

### Description / Translator Notes

Add optional attributes for translator context:

```html
<intl-msg
    key="nav.open"
    description="Button label that opens the navigation menu"
>
    Open
</intl-msg>
```

The first version can pass `description` to the `translate` hook without writing it into JSON. A later version can write sidecar metadata.

---

## Scope And Output Routing

The builder should understand the nearest `<intl-locale>` ancestor for each `<intl-msg>`.

### Exact `src`

```html
<intl-locale locale="en" src="/locales/en.landing-page.json">
    <intl-msg key="hero.title">Welcome</intl-msg>
</intl-locale>
```

Messages inside the scope write to:

```text
public/locales/en.landing-page.json
```

For target locales, infer sibling files by replacing the source locale segment:

```text
public/locales/es.landing-page.json
public/locales/fr.landing-page.json
```

The locale segment should be replaced only when it is clearly a path segment or filename segment:

- `/locales/en.json` -> `/locales/es.json`
- `/locales/en.landing-page.json` -> `/locales/es.landing-page.json`
- `/locales/landing-page.en.json` -> `/locales/landing-page.es.json`
- `/locales/en/landing-page.json` -> `/locales/es/landing-page.json`

If the builder cannot confidently infer a target path, it should warn and fall back to `targetDir/<locale>.json`.

### `src-dir`

```html
<intl-locale locale="en" src-dir="/locales">
    <intl-msg key="nav.home">Home</intl-msg>
</intl-locale>
```

Messages write to:

```text
public/locales/en.json
public/locales/es.json
public/locales/fr.json
```

### Page-Scoped Bundles

The user can make every page own its own locale bundle by using exact `src`:

```html
<intl-locale locale="en" src="/locales/en.landing-page.json">
    <intl-msg key="hero.title">Welcome</intl-msg>
</intl-locale>
```

The builder can combine shared and page messages before writing:

```ts
await generateTranslations({
    srcDir: 'src',
    targetDir: 'public/locales',
    sourceLocale: 'en',
    bundles: {
        'landing-page': ['locales/common.json', 'locales/landing-page.json'],
    },
})
```

This bundle composition can be phase two. The first version should focus on extracting directly into the file implied by `src`.

### Missing `<intl-locale>`

When an `<intl-msg>` is outside `<intl-locale>`, the builder should still extract it into the default target:

```text
targetDir/en.json
```

Warn that no locale scope was found. This keeps extraction useful for apps that initialize via `initIntl()` instead of markup.

### Nested Scopes

Nested locale scopes should route to their nearest scope:

```html
<intl-locale src="/locales/en.shell.json">
    <intl-msg key="shell.title">Dashboard</intl-msg>

    <intl-locale src="/locales/en.checkout.json">
        <intl-msg key="checkout.title">Checkout</intl-msg>
    </intl-locale>
</intl-locale>
```

Generated:

```text
public/locales/en.shell.json
public/locales/en.checkout.json
```

---

## Key Generation

Generated keys must be stable across runs.

### Preferred Strategy: `path`

Default strategy should derive semantic-ish keys from file path and message order:

```text
landingPage.message1
landingPage.message2
checkout.summary.message1
```

Pros:

- readable
- stable enough when text changes
- easy to inspect in JSON

Cons:

- inserting a new message before old messages can shift numeric suffixes unless the rewrite pass has already written keys

This is acceptable because the recommended workflow is to use `rewrite: true` once keys are generated.

### Hash Strategy

```text
intl_4f7a9c
```

The hash should be based on source file path plus original text plus occurrence index. Do not use text alone, because repeated labels like `Open` need separate keys.

### Existing Key Wins

If `<intl-msg key="...">` exists, never replace it unless a future explicit option asks to normalize keys.

### Collision Handling

If two messages generate the same key in one output file:

1. If their text is identical, keep one JSON entry.
2. If their text differs, append a numeric suffix and warn.

Example:

```json
{
  "intl_4f7a9c": "Open",
  "intl_4f7a9c_2": "Open menu"
}
```

---

## File Parsing

First version should support HTML-like files:

- `.html`
- `.htm`
- optionally `.md` for documentation examples only if needed later

Avoid regex-only parsing for extraction. Use an HTML parser that preserves enough source positions for rewrite mode.

Candidate parser options:

- `parse5` for reliable HTML parsing and source locations
- `htmlparser2` for lighter parsing

Rewrite mode needs accurate attribute insertion. If the parser cannot preserve formatting well, use source-location ranges and targeted string edits:

1. Parse to find `<intl-msg>` start tag offsets.
2. Insert ` key="..."` before `>`.
3. Apply edits from the end of the file to the beginning.

This preserves most user formatting and avoids full-document serialization churn.

---

## JSON Writing

The builder should read existing JSON before writing.

Rules:

1. Preserve existing target translations unless empty.
2. Update source locale values from current fallback text.
3. Keep keys sorted by discovery order for new files.
4. Preserve unknown keys by default when `preserveRemoved: true`.
5. If `preserveRemoved: false`, remove keys not found during the scan.
6. Write files with two-space indentation and trailing newline.

For nested JSON, convert dot paths:

```ts
setMessage(messages, 'hero.title', 'Welcome')
```

to:

```json
{
  "hero": {
    "title": "Welcome"
  }
}
```

If an existing path conflicts with a scalar:

```json
{
  "hero": "Welcome"
}
```

and the builder needs `hero.title`, warn and skip the conflicting key unless `force` is added later.

---

## Translation Generation

For each discovered source message and each requested target locale:

1. If the target key already has a non-empty value, keep it.
2. If `translate` exists, call it.
3. If `translate` returns a string, write it.
4. If `translate` returns `undefined`, write according to `missingTargetValue`.
5. If `translate` throws, warn and continue unless `failFast: true` is added later.

Example:

```ts
await generateTranslations({
    srcDir: 'pages',
    targetDir: 'public/locales',
    sourceLocale: 'en',
    locales: ['pt'],
    missingTargetValue: 'source',
    translate: async ({ text, locale }) => {
        return translateWithInternalService(text, locale)
    },
})
```

---

## Return Value

`generateTranslations()` should return a report.

```ts
export interface GenerateTranslationsReport {
    scannedFiles: number
    changedFiles: string[]
    writtenLocaleFiles: string[]
    rewrittenSourceFiles: string[]
    messages: TranslationMessageRecord[]
    warnings: TranslationBuilderWarning[]
}
```

This makes the API useful in custom build systems and tests.

---

## Implementation Phases

### Phase 1: Core Extraction

- Add `src/builder.ts`.
- Add `generateTranslations()` API.
- Add HTML file discovery.
- Parse `<intl-locale>` and `<intl-msg>`.
- Extract plain fallback text.
- Preserve existing `key` attributes.
- Generate keys for missing keys.
- Resolve output path from `src`, `src-dir`, or `targetDir`.
- Write source locale JSON only.
- Return a detailed report.

### Phase 2: Rewrite Mode

- Add `rewrite: true`.
- Insert generated keys into source files.
- Preserve existing keys.
- Avoid full-file reformatting.
- Add `dryRun` support that reports pending rewrites without writing.

### Phase 3: Target Locale Generation

- Add `locales`.
- Add `translate` hook.
- Preserve existing non-empty target translations.
- Support `missingTargetValue: 'empty' | 'source'`.
- Report translated, skipped, and failed messages.

### Phase 4: CLI

- Add `bin/intl-generate.ts` or equivalent.
- Support direct flags.
- Support `intl.config.js`.
- Print useful summaries:
    - scanned files
    - extracted messages
    - written locale files
    - rewritten source files
    - warnings

### Phase 5: Build Integration

- Update package build scripts so the builder and CLI are emitted to ESM, CJS, and types.
- Add `./builder` export.
- Add `bin` entry.
- Ensure browser bundles do not include Node-only builder code.

### Phase 6: Documentation

Add docs pages:

- `/documentation/apis/generate-translations`
- Add a best-practices section for generated keys and page-scoped bundles.
- Add examples for:
    - source-only extraction
    - rewrite mode
    - page-scoped bundle output
    - custom translation provider
    - CI check with `dryRun`

### Phase 7: Provider Adapters Or Recipes

Keep this outside core unless there is a strong reason to bundle it.

Possible docs recipes:

- Google Cloud Translate
- DeepL
- OpenAI
- internal translation service

---

## Testing Plan

Add builder tests that use temporary directories.

Required cases:

1. Extracts keyed messages into `en.json`.
2. Generates a key for `<intl-msg>` without `key`.
3. Rewrites missing `key` without changing existing keys.
4. Respects exact `<intl-locale src="/locales/en.landing-page.json">`.
5. Respects `<intl-locale src-dir="/locales">`.
6. Routes nested scopes to nearest locale provider.
7. Extracts unscoped messages into `targetDir/en.json` with warning.
8. Preserves existing non-empty target translations.
9. Calls `translate` only for missing target keys.
10. Keeps existing source keys not found in scan when `preserveRemoved: true`.
11. Removes old keys when `preserveRemoved: false`.
12. Warns for empty `<intl-msg>`.
13. Warns for non-plain fallback content.
14. Supports `dryRun` without writing.
15. Produces stable output across repeated runs.

---

## Documentation Examples

### Source-Only Generation

```js
import { generateTranslations } from '@beforesemicolon/intl/builder'

await generateTranslations({
    srcDir: 'src',
    targetDir: 'public/locales',
    sourceLocale: 'en',
    rewrite: true,
})
```

### Page-Scoped Source

```html
<intl-locale locale="en" src="/locales/en.landing-page.json">
    <h1><intl-msg key="hero.title">Welcome</intl-msg></h1>
</intl-locale>
```

Output:

```text
public/locales/en.landing-page.json
```

### Target Locale Generation

```js
await generateTranslations({
    srcDir: 'src',
    targetDir: 'public/locales',
    sourceLocale: 'en',
    locales: ['es', 'fr'],
    rewrite: true,
    translate: async ({ text, locale }) => {
        return translateText(text, locale)
    },
})
```

### CI Check

```js
const report = await generateTranslations({
    srcDir: 'src',
    targetDir: 'public/locales',
    sourceLocale: 'en',
    dryRun: true,
})

if (report.changedFiles.length > 0) {
    throw new Error('Locale files are out of date. Run npm run intl:generate.')
}
```

---

## Open Decisions

1. Default key strategy: `path` is more readable, but `hash` is less likely to shift before rewrite mode is used.
2. Parser dependency: choose `parse5` for correctness or `htmlparser2` for a smaller dependency.
3. JSON shape: nested should probably be default because current docs use dotted semantic keys, but flat JSON is simpler to diff.
4. Metadata: decide whether `description` should only go to `translate`, or also be written to a sidecar file.
5. Framework templates: decide whether to support JSX, TSX, Vue, Svelte, and Astro later. First version should stay HTML-focused.
6. Bundle composition: decide whether builder-level `bundles` belongs in phase one or after extraction is stable.

---

## Non-Goals For First Version

- Runtime translation through external services.
- Browser-side extraction.
- Automatic default Google Translate calls.
- Full ICU message validation.
- Full formatting preservation for arbitrary malformed HTML.
- Framework-specific AST transforms.
- Replacing the runtime `key` API.

The runtime remains small and explicit. The builder is optional tooling for teams that want generated locale files and stable keys from readable HTML.
