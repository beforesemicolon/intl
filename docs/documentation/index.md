---
name: Why Intl?
order: 1
title: Why Intl? - Intl by Before Semicolon
description: Learn why Intl provides HTML-first localization primitives for Web Components and component-first interfaces.
layout: document
---

## Why Intl?

`@beforesemicolon/intl` gives component-first applications a predictable localization layer.

It combines:

- runtime-aware locale scoping
- message lookup and fallback behavior
- formatting helpers for numbers, dates, durations, relative time, names, lists, and plurals

Everything is explicit, so you can reason about where and how localization changes.

## Why this over framework i18n adapters

With Intl:

- you do not need router-like global context to access locale state
- messages and formatters can live in plain HTML with fallback text
- runtime APIs stay available for business logic and tests
- page-level and component-level locale boundaries are straightforward

## What to read first

- [Get Started](./get-started)
- [Installation](./installation)
- [Guide & Best Practices](./guide-best-practices)
- [Components](./components/intl-locale)
- [APIs](./apis/create-intl)

## Core mental model

Use `<intl-locale>` to define a boundary. Everything inside that boundary uses the same runtime configuration:

- active locale
- fallback locale
- where messages load from
- how the runtime notifies components

Use components for visible output. Use helper APIs where formatting should stay in code.

When the boundary is the root of your page, add `update-document` so document language and direction stay aligned with runtime state.

