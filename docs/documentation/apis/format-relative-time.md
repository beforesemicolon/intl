---
name: formatRelativeTime
order: 6.14
title: formatRelativeTime - Intl by Before Semicolon
description: Format relative timestamps or unit offsets with Intl.RelativeTimeFormat.
layout: document
---

## `formatRelativeTime`

`formatRelativeTime(value, options?)` has two modes.

- With `unit: 'auto'`, `value` is an absolute timestamp in milliseconds and the function compares it to `Date.now()`.
- With an explicit unit, `value` is the numeric offset for that unit.

```ts
formatRelativeTime(Date.now() + 60_000, { unit: 'auto' }) // "in 1 minute"
formatRelativeTime(-2, { unit: 'day' }) // "2 days ago"
```

## Signature

```ts
function formatRelativeTime(
    value: number,
    options?: {
        locale?: string
        scope?: IntlRuntime
        unit?: 'auto' | Intl.RelativeTimeFormatUnit
        precision?: number
        numeric?: 'always' | 'auto'
        style?: 'long' | 'short' | 'narrow'
    }
): string
```

## Numeric options

```ts
formatRelativeTime(-1, { unit: 'day', numeric: 'auto' }) // "yesterday"
formatRelativeTime(-1, { unit: 'day', numeric: 'always' }) // "1 day ago"
```

## Precision

```ts
formatRelativeTime(Date.now() + 90_000, {
    unit: 'auto',
    precision: 1,
})
```

## Component equivalent

```html
<intl-rel-time live precision="1">2026-01-01T00:00:00Z</intl-rel-time>
```
