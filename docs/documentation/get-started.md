---
name: Get Started
order: 2
title: Get Started - Intl by Before Semicolon
description: Build your first multilingual UI with one runtime scope and reusable formatters.
layout: document
---

## Get started

Use this page to get a working localized UI quickly. Start with a runtime scope, then add tags and helper calls as you expand the page.

## Step 1 — Initialize a locale scope

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales" update-document>
    <header>
        <intl-msg key="header.title">Product</intl-msg>
        <intl-number type="currency" currency="USD">1299.99</intl-number>
    </header>
</intl-locale>
```

This creates one locale runtime boundary and loads translation files from `/locales/en-US.json`.

## Step 2 — Render translated text

```html
<intl-msg key="product.name">Default product name</intl-msg>
```

`<intl-msg>` first renders its tag content, then replaces it when message lookup is available.

## Step 3 — Add rich formatting

```html
<intl-datetime date-style="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-list type="conjunction">shipping tax discounts</intl-list>
<intl-rel-time live>2026-01-01T00:00:00Z</intl-rel-time>
```

## Step 4 — Run from code when you need runtime logic

```ts
import { initIntl, intlPlural, createIntl } from '@beforesemicolon/intl'

const runtime = initIntl({
    locale: 'en-US',
    fallbackLocale: 'en',
    messages: {
        inbox: {
            title: '{value} messages',
        },
    },
})

runtime.getMessage('inbox.title') // direct message read
intlPlural(3, {
    type: 'cardinal',
    one: 'item',
    other: 'items',
    locale: 'en-US',
})
```

## Step 5 — Use nested scopes for sections

```html
<intl-locale locale="en-US">
    <intl-msg key="global.cta">Get started</intl-msg>

    <intl-locale locale="fr-FR">
        <intl-msg key="global.cta">Commencer</intl-msg>
    </intl-locale>
</intl-locale>
```

## Next step

If this works, move on to:

- [Guide & Best Practices](./guide-best-practices)
- [Components](./components/intl-locale)
- [Runtime APIs](./apis/create-intl)

