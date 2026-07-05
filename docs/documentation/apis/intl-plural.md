---
name: intlPlural
order: 6.25
title: intlPlural - Intl by Before Semicolon
description: Helper function that mirrors the intl-plural component API.
layout: document
---

## `intlPlural`

`intlPlural(props?)` selects a plural category and returns the matching phrase.

```ts
import { intlPlural } from '@beforesemicolon/intl'

intlPlural({
    value: 2,
    one: 'item',
    other: 'items',
})
```

## Signature

```ts
function intlPlural(props?: Partial<IntlPluralProps>): string
```

## Examples

```ts
intlPlural({ value: 0, zero: 'no items', one: 'item', other: 'items' })
intlPlural({ value: 1, one: 'file', other: 'files' })
intlPlural({ value: 2, type: 'ordinal', one: 'st', two: 'nd', few: 'rd', other: 'th' })
```
