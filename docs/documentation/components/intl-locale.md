---
name: intl-locale
order: 5.1
title: <intl-locale> - Runtime Scope
description: Define locale runtime boundaries, load messages, update document language, and scope child Intl components.
layout: document
---

## `<intl-locale>`

`<intl-locale>` creates the runtime scope used by every Intl component inside it. Put it around the part of the page that should share a locale, message source, fallback locale, and text direction.

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

```html
<intl-locale id="app-locale" locale="fr-FR" src-dir="/locales"></intl-locale>

<script>
    document.getElementById('app-locale').addEventListener('locale-load', (event) => {
        console.log(event.detail.locale)
    })
</script>
```

## Load from `/locales`

```html
<intl-locale locale="pt-CV" fallback-locale="en" src-dir="/locales">
    <intl-msg key="home.title">Home</intl-msg>
</intl-locale>
```

This loads `/locales/pt-CV.json`, then tries `/locales/en.json` for fallback messages.

## Use one exact source

```html
<intl-locale locale="en-US" src="/api/messages/current-user">
    <intl-msg key="dashboard.title">Dashboard</intl-msg>
</intl-locale>
```

Use `src` when your backend decides which messages to return.

## Nested locale scopes

```html
<intl-locale locale="en-US" src-dir="/locales">
    <intl-msg key="product.name">Product</intl-msg>

    <intl-locale locale="fr-FR" src-dir="/locales">
        <intl-msg key="product.name">Produit</intl-msg>
    </intl-locale>
</intl-locale>
```

A nested provider inherits parent messages and fallback configuration, then overrides them with its own loaded messages.

## JavaScript API equivalent

```ts
import { createIntl, initIntl, loadLocale } from '@beforesemicolon/intl'

const globalRuntime = initIntl({
    locale: 'en-US',
    fallbackLocale: 'en',
    srcDir: '/locales',
})

await loadLocale(undefined, globalRuntime)

const previewRuntime = createIntl({
    locale: 'fr-FR',
    parentScope: globalRuntime,
    srcDir: '/locales',
})
```
