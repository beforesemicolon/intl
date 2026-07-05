---
name: formatList
order: 6.15
title: formatList - Intl by Before Semicolon
description: Format localized conjunction, disjunction, and unit lists with Intl.ListFormat.
layout: document
---

## `formatList`

`formatList(value, options?)` accepts an array of strings or a whitespace-separated string.

```ts
import { formatList } from '@beforesemicolon/intl'

formatList(['shipping', 'tax', 'discounts'], { locale: 'en-US' })
formatList('apples pears peaches', { type: 'disjunction' })
```

## Signature

```ts
function formatList(
    value: string[] | string,
    options?: {
        locale?: string
        scope?: IntlRuntime
        type?: 'conjunction' | 'disjunction' | 'unit' | 'and' | 'or' | 'none'
        style?: 'long' | 'short' | 'narrow'
        localeMatcher?: 'lookup' | 'best fit'
    }
): string
```

Empty lists return an empty string.

## Type aliases

`and` maps to `conjunction`, `or` maps to `disjunction`, and `none` maps to `unit`.

```ts
formatList('A B C', { type: 'and' })
formatList('A B C', { type: 'or' })
formatList('A B C', { type: 'none', style: 'narrow' })
```

## Component equivalent

```html
<intl-list type="or" type-style="short">A B C</intl-list>
```
