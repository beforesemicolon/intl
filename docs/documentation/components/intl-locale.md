---
name: intl-locale
order: 5.1
title: <intl-locale> - Runtime Scope
description: Define locale runtime boundaries, load messages, update document language, and scope child Intl components.
layout: document
---

## `<intl-locale>`

`<intl-locale>` creates the runtime scope used by every Intl component inside it.
Use it around the part of the page that should share a locale, message source, fallback locale, and text direction.

Native mapping: locale detection and direction follow [Intl.Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale).

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales">
    <intl-msg key="checkout.title">Checkout</intl-msg>
    <intl-number type="currency" currency="USD">1299.99</intl-number>
</intl-locale>
```

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `locale` | `string` | `html[lang]` or `en` | Active locale for this scope. |
| `fallback-locale` | `string` | `en` | Locale used for fallback message loading and message lookup. |
| `src` | `string` | `undefined` | Exact JSON endpoint for this locale scope. |
| `src-dir` | `string` | `/locales` | Directory used as `${srcDir}/${locale}.json` when `src` is not set. |
| `update-document` | boolean attribute | absent | Updates `document.documentElement.lang` and `dir` from the runtime snapshot. |
| `fallback` | boolean attribute | absent | Renders children immediately while locale messages load. Without it, children render after the runtime is ready. |

## Lifecycle events

Events bubble and are composed, so you can listen from a parent container or `document.body`.

| Event | When it fires | `event.detail` |
|---|---|---|
| `locale-load` | Message loading completes. | `IntlRuntimeSnapshot` |
| `locale-change` | The locale is ready after load or change. | `IntlRuntimeSnapshot` |
| `locale-error` | Message loading fails. | `IntlRuntimeSnapshot` with `error` |

## `locale`

`locale` sets the active locale for every Intl component inside the scope.

```html
<intl-locale locale="en-US" src-dir="/locales">
    <intl-msg key="home.title">Home</intl-msg>
    <intl-number>1299.99</intl-number>
</intl-locale>

<intl-locale locale="fr-FR" src-dir="/locales">
    <intl-msg key="home.title">Home</intl-msg>
    <intl-number>1299.99</intl-number>
</intl-locale>
```

When `locale` is omitted, the runtime uses `document.documentElement.lang` when available, then falls back to `en`.

## `fallback-locale`

`fallback-locale` is used when messages for the active locale are missing or incomplete.

```html
<intl-locale locale="pt-CV" fallback-locale="pt" src-dir="/locales">
    <intl-msg key="home.title">Home</intl-msg>
</intl-locale>
```

With this setup, the runtime loads `/locales/pt-CV.json` and can use `/locales/pt.json` as fallback messages.

## `src`

Use `src` when the locale scope should load one exact JSON endpoint.

```html
<intl-locale locale="en-US" src="/api/messages/current-user">
    <intl-msg key="dashboard.title">Dashboard</intl-msg>
</intl-locale>
```

`src` can also point to a page-specific JSON file.

```html
<intl-locale locale="en" src="/locales/en.landing-page.json">
    <section>
        <h1><intl-msg key="hero.title">Internationalization in plain HTML.</intl-msg></h1>
        <p><intl-msg key="hero.summary">Format messages close to the UI.</intl-msg></p>
    </section>
</intl-locale>
```

Use this for route-level or page-level message splitting when a page should load a smaller locale file.

## `src-dir`

Use `src-dir` when every locale follows the same directory convention.

```html
<intl-locale locale="pt-CV" fallback-locale="en" src-dir="/locales">
    <intl-msg key="home.title">Home</intl-msg>
</intl-locale>
```

This loads:

```text
/locales/pt-CV.json
/locales/en.json
```

Use `src-dir` for app-wide bundles. Use `src` for exact files such as `/locales/en.landing-page.json`.

## `update-document`

`update-document` keeps the page-level `lang` and `dir` attributes synchronized with this runtime.

```html
<intl-locale locale="ar" src-dir="/locales" update-document>
    <intl-msg key="home.title">Home</intl-msg>
</intl-locale>
```

After loading, the document can be updated like this:

```html
<html lang="ar" dir="rtl">
```

Use this on the root page locale. Avoid using it on small nested scopes unless that nested scope should control the whole document language.

## `fallback`

By default, children render after the runtime is ready. Add `fallback` when fallback text should render immediately while messages load.

```html
<intl-locale locale="en-US" src-dir="/locales" fallback>
    <h1><intl-msg key="home.title">Home</intl-msg></h1>
</intl-locale>
```

Without `fallback`, the slot waits for the runtime. With `fallback`, child components can render their child text first and update when messages arrive.

## `locale-load`

Listen for `locale-load` when you need to know that a load attempt completed.

```html
<intl-locale id="app-locale" locale="fr-FR" src-dir="/locales"></intl-locale>

<script>
    document.getElementById('app-locale').addEventListener('locale-load', (event) => {
        console.log(event.detail.locale)
        console.log(event.detail.status)
    })
</script>
```

## `locale-change`

Listen for `locale-change` when UI should react to a ready locale.

```html
<intl-locale id="settings-locale" locale="en" src-dir="/locales" fallback>
    <select id="language">
        <option value="en">English</option>
        <option value="fr">French</option>
    </select>

    <intl-msg key="settings.title">Settings</intl-msg>
</intl-locale>

<script>
    const locale = document.getElementById('settings-locale')
    const language = document.getElementById('language')

    language.addEventListener('change', () => {
        locale.runtime.setLocale(language.value)
    })

    locale.addEventListener('locale-change', (event) => {
        language.value = event.detail.locale
    })
</script>
```

## `locale-error`

Listen for `locale-error` when you want custom error handling for failed message loads.

```html
<intl-locale id="app-locale" locale="fr-FR" src="/missing/fr.json">
    <intl-msg key="home.title">Home</intl-msg>
</intl-locale>

<script>
    document.getElementById('app-locale').addEventListener('locale-error', (event) => {
        console.error(event.detail.error)
    })
</script>
```

## Nested locale scopes

A nested provider uses the nearest scope. It can inherit parent messages and fallback configuration, then override them with its own loaded messages.

```html
<intl-locale locale="en-US" src-dir="/locales">
    <intl-msg key="product.name">Product</intl-msg>

    <intl-locale locale="fr-FR" src-dir="/locales">
        <intl-msg key="product.name">Produit</intl-msg>
    </intl-locale>
</intl-locale>
```

Nested scopes are useful for previews, embedded widgets, language switchers, and side-by-side localization QA.

## Page-scoped locale bundles

Page-scoped bundles let each page load only the messages it needs instead of fetching one large locale bundle for the whole site.

For example, keep shared and page messages separate in source:

```text
locales/common.json
locales/landing-page.json
```

At build time, merge those files for each locale and emit a page bundle:

```text
locales/en.landing-page.json
```

Then wrap the landing page with an exact source:

```html
<intl-locale locale="en" src="/locales/en.landing-page.json">
    <h1><intl-msg key="hero.title">Internationalization in plain HTML.</intl-msg></h1>
</intl-locale>
```

## See also

- [createIntl](/documentation/apis/create-intl)
- [initIntl](/documentation/apis/init-intl)
- [setLocale](/documentation/apis/set-locale)
- [loadLocale](/documentation/apis/load-locale)
