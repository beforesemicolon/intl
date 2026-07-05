---
name: formatPlural
order: 6.17
title: formatPlural - Intl by Before Semicolon
description: Select cardinal or ordinal plural output with Intl.PluralRules.
layout: document
---

## `formatPlural`

`formatPlural(value, options?)` selects a plural category and returns the matching text.

```ts
import { formatPlural } from '@beforesemicolon/intl'

formatPlural(1, { one: 'item', other: 'items' }) // "item"
formatPlural(2, { one: 'item', other: 'items' }) // "items"
```

## Signature

```ts
function formatPlural(
    value: number,
    options?: {
        locale?: string
        scope?: IntlRuntime
        type?: 'cardinal' | 'ordinal'
        zero?: string
        one?: string
        two?: string
        few?: string
        many?: string
        other?: string
    }
): string
```

Invalid numbers return an empty string. If no matching text is supplied, the selected plural category is returned.

## Ordinals

For `type: 'ordinal'`, the function prepends the numeric value to the selected suffix.

```ts
formatPlural(1, { type: 'ordinal', one: 'st', two: 'nd', few: 'rd', other: 'th' })
formatPlural(3, { type: 'ordinal', one: 'st', two: 'nd', few: 'rd', other: 'th' })
```

## Component equivalent

```html
<intl-plural one="item" other="items">2</intl-plural>
```
