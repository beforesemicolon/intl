---
name: Why Intl?
order: 1
title: Why Intl? - Intl by Before Semicolon
description: Learn why Intl provides HTML-first localization primitives for Web Components and component-first interfaces.
layout: document
---

## Why Intl?

`@beforesemicolon/intl` gives component-first applications a small, explicit localization layer. It keeps locale state, message lookup, and formatter behavior close to the HTML that needs localized output, while still exposing runtime helpers for application code and tests.

Use it when you want localized UI without adopting a framework-specific i18n plugin or hiding formatting behind implicit global state.

## Component-first localization

Intl starts with Web Components:

- `<intl-locale>` defines the active runtime boundary.
- `<intl-msg>` resolves translated messages with readable fallback text.
- Formatter components render numbers, dates, durations, relative time, lists, display names, and plurals.
- Nested locale scopes make previews, embedded widgets, and language switchers predictable.

## Runtime helpers when markup is not enough

The same formatter behavior is available through JavaScript helpers. Use the browser components for DOM composition, then use runtime APIs for business logic, tests, server-side formatting, or places where a component would be awkward.

## Documentation map

- [Get Started](./get-started/)
- [Installation](./installation/)
- [Guide & Best Practices](./guide-best-practices/)
- [APIs](./apis/create-intl/)
- [Components](./components/intl-locale/)

## Explicit by design

Intl prefers clear runtime boundaries:

- A locale scope is always known.
- Formatters are derived from that scope.
- Components update in response to runtime changes.
- Text content can act as fallback or component input for simple cases.
