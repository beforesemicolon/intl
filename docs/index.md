---
name: Intl
order: 0
title: Intl by Before Semicolon
description: Drop-in internationalization primitives for Web Components, built for readable, composable, runtime-safe localized interfaces.
layout: landing
---

::: layout landing-hero version="v0.1.0" title="Internationalization" title2="in plain HTML." primaryLabel="Get Started" secondaryLabel="$ npm i @beforesemicolon/intl"

=== copy

Drop-in localization primitives for Web Components. Format messages, numbers, dates, durations, relative time, lists, display names, and plurals with scoped locale runtimes.

=== stat

## 9

WEB COMPONENTS

=== stat

## 1

RUNTIME

=== stat

## Intl

FORMATTERS

=== code filename=index.html lang=html

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales">
    <h1><intl-msg key="checkout.title">Checkout</intl-msg></h1>

    <p>
        <intl-msg key="checkout.total">Total</intl-msg>:
        <intl-number
            type="currency"
            currency="USD"
        >1299.99</intl-number>
    </p>

    <intl-rel-time live>2026-01-01T00:00:00Z</intl-rel-time>
</intl-locale>
```

:::

::: layout landing-ecosystem

=== header

`// THE ECOSYSTEM`

## Powered by Markup & Web Component.

Intl is built for the same Markup family as Router: native Web Components on top of the lightweight Markup rendering model.

=== product title="Markup" package="@beforesemicolon/markup" color=orange icon=reactive href="https://markup.beforesemicolon.com"

The reactive templating system behind the Before Semicolon component stack. Tagged templates, state, effects, repeat, and suspense.

=== product title="Web Component" package="@beforesemicolon/web-component" color=cyan icon=webComponents href="https://web-component.beforesemicolon.com"

The custom-element layer Intl components are built on. Props, state, lifecycle hooks, scoped rendering, and framework-free browser registration.

:::

::: layout landing-features

=== header

`// WHY INTL`

## Localize component-first interfaces without framework lock-in.

Use declarative custom elements for markup-heavy views and runtime-aware formatter functions for application code, tests, and server-side work.

=== feature icon=reactive

### Scoped locale runtime

Set locale and messages once with `<intl-locale>`, then nest independent runtime scopes anywhere in the DOM.

=== feature icon=terminal

### Formatter APIs

Call `formatMessage`, `formatNumber`, `formatDateTime`, `formatDuration`, `formatRelativeTime`, `formatList`, `formatName`, and `formatPlural` directly.

=== feature icon=webComponents

### Accessible output

Components render light DOM text and semantic elements like `<time>`, with language direction metadata applied from the active locale.

=== feature icon=standards

### Explicit component API

Attributes map directly to the underlying `Intl` options, keeping markup readable and predictable from the first release.

=== feature icon=plug

### Component entrypoints

Import all components from the root package or use per-component entrypoints when you want smaller browser bundles.

=== feature icon=surgical

### Cached formatter reuse

Formatter instances are cached by locale and options inside the active runtime scope, avoiding repeated `Intl.*` construction.

:::

::: layout landing-showcase

=== header

`// USE THIS TODAY`

## Five practical localization examples.

Each example works with the same runtime and component model, so teams can mix markup and JavaScript without changing libraries.

=== example label="Currency formatting" color=primary filename=currency.html lang=html

```html
<intl-locale locale="en-US">
    <intl-number
        type="currency"
        currency="USD"
    >1299.99</intl-number>

    <intl-number
        type="currency"
        currency="EUR"
        locale="de-DE"
    >1299.99</intl-number>
</intl-locale>
```

=== example label="Relative time and date" color=green filename=time.html lang=html

```html
<intl-locale locale="en-US">
    <intl-datetime
        date-style="medium"
        time-style="short"
    >2026-06-30T10:15:00Z</intl-datetime>

    <intl-rel-time live>2026-01-01T00:00:00Z</intl-rel-time>
</intl-locale>
```

=== example label="Plural and list" color=cyan filename=plural-list.html lang=html

```html
<intl-locale locale="en-US">
    <intl-plural one="item" other="items">2</intl-plural>
    <intl-list type="and">shipping tax discounts</intl-list>
</intl-locale>
```

=== example label="Runtime messages" color=orange filename=runtime.js lang=javascript

```js
import { initIntl, formatMessage } from '@beforesemicolon/intl'

const runtime = initIntl({
    locale: 'en-US',
    fallbackLocale: 'en',
    messages: {
        checkout: {
            title: 'Checkout',
            cta: 'Continue as {name}',
        },
    },
})

formatMessage('checkout.cta', { name: 'Sam' }, { scope: runtime })
```

=== example label="Full composition" color=primary filename=checkout.html lang=html

```html
<intl-locale locale="en-US" src-dir="/locales">
    <h1><intl-msg key="checkout.title">Checkout</intl-msg></h1>
    <p>
        <intl-msg key="checkout.total">Total</intl-msg>
        <intl-number type="currency" currency="USD">1299.99</intl-number>
    </p>
    <intl-msg key="checkout.items">
        <intl-plural one="item" other="items">2</intl-plural>
    </intl-msg>
</intl-locale>
```

:::

::: layout landing-install

=== header

`// QUICK START`

## Install in seconds.

Use the package entrypoint for all components and helpers, or import individual component entrypoints when you want smaller bundles.

=== tab key=cdn label=CDN command="<script src=&quot;https://unpkg.com/@beforesemicolon/intl/dist/client.js&quot;></script>"

=== tab key=npm label=npm command="npm install @beforesemicolon/intl"

=== tab key=yarn label=yarn command="yarn add @beforesemicolon/intl"

=== tab key=pnpm label=pnpm command="pnpm add @beforesemicolon/intl"

:::

::: layout landing-cta

=== copy

## Build localized interfaces with Web Components.

Read the docs for runtime setup, formatter APIs, browser registration, component props, edge cases, and compatibility notes.

=== actions

[Get Started](/documentation/get-started)
[Read the Docs](/documentation)

:::
