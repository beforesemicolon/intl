---
name: getLocaleDirection
order: 7.09
title: getLocaleDirection - Intl by Before Semicolon
description: Resolve text direction for a locale using Intl.Locale.
layout: document
---

## `getLocaleDirection`

`getLocaleDirection(locale)` returns text direction for a locale tag:

- `'rtl'` for right-to-left locales
- `'ltr'` for left-to-right locales

This function uses [`Intl.Locale`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale).

```ts
import { getLocaleDirection } from '@beforesemicolon/intl'

getLocaleDirection('en-US') // "ltr"
getLocaleDirection('ar') // "rtl"
getLocaleDirection('fa') // "rtl"
getLocaleDirection('zh-Hant') // "ltr"
```

## Signature

```ts
function getLocaleDirection(locale: string): 'ltr' | 'rtl'
```

## Practical notes

- invalid locale values return `'ltr'` instead of throwing
- this is useful for pre-setting `dir` before runtime loading completes
- call this whenever you need a deterministic fallback while a runtime settles

```ts
document.documentElement.dir = getLocaleDirection(selectedLocale)
```

