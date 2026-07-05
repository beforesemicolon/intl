---
name: formatDuration
order: 6.13
title: formatDuration - Intl by Before Semicolon
description: Format millisecond durations into localized duration strings.
layout: document
---

## `formatDuration`

`formatDuration(value, options?)` converts a millisecond value into duration parts, then formats those parts with `Intl.DurationFormat` or the package fallback formatter.

```ts
import { formatDuration } from '@beforesemicolon/intl'

formatDuration(3_661_000, {
    locale: 'en-US',
    fields: 'hours minutes seconds',
    style: 'long',
})
```

## Signature

```ts
function formatDuration(
    value: number,
    options?: {
        locale?: string
        scope?: IntlRuntime
        fields?: '*' | string | string[]
        style?: 'long' | 'short' | 'narrow' | 'digital'
    }
): string
```

Invalid numbers return an empty string.

## Field permutations

```ts
formatDuration(90_000, { fields: 'minutes seconds' })
formatDuration(3_600_000, { fields: ['hours'] })
formatDuration(86_400_000, { fields: '*' })
```

## Style permutations

```ts
formatDuration(3_600_000, { fields: 'hours', style: 'long' })
formatDuration(3_600_000, { fields: 'hours', style: 'short' })
formatDuration(3_600_000, { fields: 'hours', style: 'narrow' })
```

## Component equivalent

```html
<intl-duration fields="hours minutes seconds" time-style="short">
    3661000
</intl-duration>
```
