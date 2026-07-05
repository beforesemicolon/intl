---
name: Get Started
order: 2
title: Get Started - Intl by Before Semicolon
description: Build your first multilingual UI with one runtime scope and reusable formatters.
layout: document
---

## Step 1 — Set up locale provider

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales">
</intl-locale>
```

The provider initializes the runtime and loads messages from `/locales/<locale>.json` by default.

## Step 2 — Add message and number outputs

```html
<intl-locale locale="en-US" src-dir="/locales" update-document>
    <header>
        <intl-msg key="header.title">Site title</intl-msg>
        <intl-number value="1299.99" type="currency" currency="USD"></intl-number>
        <intl-datetime value="1700000000000" date-style="full"></intl-datetime>
    </header>
</intl-locale>
```

## Step 3 — Add runtime-only helpers for logic

```ts
import { initIntl, formatPlural } from '@beforesemicolon/intl'

const runtime = initIntl({ locale: 'en-US', messages: { item: '{count} item(s)' } })

console.log(formatPlural(2, {
  locale: 'en-US',
  one: 'one item',
  other: '{value} items',
  scope: runtime,
}))
```

## Step 4 — Use nested locale providers

```html
<intl-locale locale="en-US" fallback-locale="en">
    <h1>Global</h1>

    <intl-locale locale="fr-FR">
        <intl-msg key="greeting">Bonjour</intl-msg>
    </intl-locale>
</intl-locale>
```

Nested providers inherit messages from their parents unless overridden.

## Step 5 — Prefer text-content for simple value defaults

```html
<intl-number>1299.99</intl-number>
<intl-duration>90061</intl-duration>
<intl-list>apple orange banana</intl-list>
```

If a `value` attribute is not set, components parse content text.
