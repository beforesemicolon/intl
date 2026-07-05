---
name: getLocaleDirection
order: 6.09
title: getLocaleDirection - Intl by Before Semicolon
description: Resolve text direction for a locale using Intl.Locale.
layout: document
---

## `getLocaleDirection`

`getLocaleDirection(locale)` returns `rtl` for right-to-left locales and `ltr` for everything else.

```ts
import { getLocaleDirection } from '@beforesemicolon/intl'

getLocaleDirection('en-US') // "ltr"
getLocaleDirection('ar') // "rtl"
```

## Signature

```ts
function getLocaleDirection(locale: string): 'ltr' | 'rtl'
```

Use this when syncing document direction yourself. `<intl-locale update-document>` does this automatically for component-driven pages.
