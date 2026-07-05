---
name: intlDatetime
order: 6.20
title: intlDatetime - Intl by Before Semicolon
description: Helper function that mirrors the intl-datetime component API.
layout: document
---

## `intlDatetime`

`intlDatetime(props?)` formats dates with the same property names used by `<intl-datetime>`.

```ts
import { intlDatetime } from '@beforesemicolon/intl'

intlDatetime({
    value: '2026-01-01T10:00:00Z',
    locale: 'en-US',
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
})
```

## Signature

```ts
function intlDatetime(props?: Partial<IntlDatetimeProps>): string
```

## Examples

```ts
intlDatetime({ value: Date.now(), dateStyle: 'medium' })
intlDatetime({ value: new Date(), hour: '2-digit', minute: '2-digit' })
intlDatetime({ value: '2026-01-01', calendar: 'gregory' })
```

The helper defaults `value` to `new Date()` when no value is provided.
