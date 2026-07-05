---
name: formatDateTime
order: 6.12
title: formatDateTime - Intl by Before Semicolon
description: Format Date, timestamp, and ISO string values with Intl.DateTimeFormat.
layout: document
---

## `formatDateTime`

`formatDateTime(value, options?)` accepts a `Date`, timestamp number, numeric timestamp string, or parseable date string.

```ts
import { formatDateTime } from '@beforesemicolon/intl'

formatDateTime('2026-01-01T10:00:00Z', {
    locale: 'en-US',
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
})
```

## Signature

```ts
function formatDateTime(
    value: string | number | Date,
    options?: Intl.DateTimeFormatOptions & {
        locale?: string
        scope?: IntlRuntime
    }
): string
```

Invalid dates return an empty string.

## Style shortcuts

```ts
formatDateTime(Date.now(), { dateStyle: 'short' })
formatDateTime(Date.now(), { timeStyle: 'medium' })
formatDateTime(Date.now(), { dateStyle: 'long', timeStyle: 'short' })
```

## Field-level formatting

Do not combine `dateStyle` or `timeStyle` with field-level options.

```ts
formatDateTime('2026-01-01T10:00:00Z', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
})
```

## Component equivalent

```html
<intl-datetime date-style="full" time-style="short" time-zone="UTC">
    2026-01-01T10:00:00Z
</intl-datetime>
```
