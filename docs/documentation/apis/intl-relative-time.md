---
name: intlRelativeTime
order: 6.22
title: intlRelativeTime - Intl by Before Semicolon
description: Helper function that mirrors the intl-rel-time component API.
layout: document
---

## `intlRelativeTime`

`intlRelativeTime(value, props?)` formats a timestamp or relative offset with the same option names as `<intl-rel-time>`.

```ts
import { intlRelativeTime } from '@beforesemicolon/intl'

intlRelativeTime(Date.now() + 60_000, {
    unit: 'auto',
    precision: 0,
})
```

## Signature

```ts
function intlRelativeTime(
    value: number | string | Date,
    props?: Partial<IntlRelTimeProps>
): string
```

## Examples

```ts
intlRelativeTime(-1, { unit: 'day', numeric: true })
intlRelativeTime('2026-01-01T00:00:00Z', { unit: 'auto' })
intlRelativeTime(90, { unit: 'second', precision: 0, timeStyle: 'short' })
```

`numeric: true` maps to `always`; `numeric: false` maps to `auto`.
