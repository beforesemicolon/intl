---
name: Guide & Best Practices
order: 4
title: Intl Guide & Best Practices - Intl by Before Semicolon
description: Practical guidance for building maintainable HTML-first localization with Before Semicolon Intl.
layout: document
---

## Guide & Best Practices

Use this guide to keep localized UIs predictable at scale. The package is most effective when locale scope and content remain explicit.

## 1) Start with one top-level `<intl-locale>`

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales" update-document>
    <h1><intl-msg key="checkout.title">Checkout</intl-msg></h1>
    <intl-number type="currency" currency="USD">1299.99</intl-number>
</intl-locale>
```

Use one top-level provider for the page when possible. It centralizes:

- message loading
- locale fallback behavior
- document direction updates

## 2) Prefer readable fallback text

```html
<intl-msg key="cta.primary">Get started</intl-msg>
<intl-number type="currency" currency="USD">1299.99</intl-number>
<intl-datetime date-style="short">2026-01-01T10:00:00Z</intl-datetime>
<intl-list type="and">shipping tax discounts</intl-list>
```

Keep fallback text meaningful. It helps SEO, JS-disabled rendering, and loading states.

## 3) Build nested locale boundaries intentionally

```html
<intl-locale locale="en-US" src-dir="/locales">
    <h1><intl-msg key="product.title">Product</intl-msg></h1>

    <section>
        <intl-locale locale="fr-FR">
            <h2><intl-msg key="product.title">Produit</intl-msg></h2>
        </intl-locale>
    </section>
</intl-locale>
```

Nested scopes inherit message state from parent and can override values where needed.

## 4) Use API helpers where component markup is not ideal

```ts
import { createIntl, intlMsg, intlNumber, intlDateTime } from '@beforesemicolon/intl'

const preview = createIntl({
  locale: 'ja-JP',
  fallbackLocale: 'en',
  messages: { invoice: { total: 'Total: {amount}' } },
})

intlMsg('invoice.total', { amount: '¥1,000' }, { scope: preview })
intlNumber(1000, { locale: 'ja-JP', style: 'currency', currency: 'JPY' })
intlDateTime('2026-01-01T10:00:00Z', { locale: 'ja-JP', dateStyle: 'full' })
```

Use helpers for server-rendered content, labels in background jobs, and non-DOM workflows.

## 5) Language switching without a page reload

```ts
import { setLocale } from '@beforesemicolon/intl'

const selector = document.querySelector('select#locale')
selector?.addEventListener('change', async (event) => {
  const locale = (event.target as HTMLSelectElement).value
  const snapshot = await setLocale(locale)
  document.documentElement.lang = snapshot.locale
  document.documentElement.dir = snapshot.direction
})
```

Language switching works when components are subscribed to the active runtime.

## 6) Keep translation bundles small

At build time, combine shared keys and page-specific keys into scoped bundles:

```text
locales/common.json
locales/landing-page.json
locales/en.landing-page.json
```

Use `src="/locales/en.landing-page.json"` for the landing page runtime. This avoids loading unrelated pages.

## 7) Prefer SEO-safe content structure

Use clear visible text in HTML and keep formatting decisions close to output:

```html
<h1><intl-msg key="hero.title">Internationalization in plain HTML.</intl-msg></h1>
<intl-datetime date-style="full" time-style="short">2026-01-01T10:00:00Z</intl-datetime>
```

Your parser and crawler both benefit from predictable, localized output in the DOM.

## Production checklist

- one explicit locale provider for each major page boundary
- `src` for exact page bundles, `src-dir` for broad locale bundles
- use child text for simple values
- include `fallback-locale`
- keep `update-document` only on the top-most scope
- keep `intl-msg` fallback text readable
