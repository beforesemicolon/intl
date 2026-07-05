---
name: intlDuration
order: 6.21
title: intlDuration - Intl by Before Semicolon
description: Helper function that mirrors the intl-duration component API.
layout: document
---

## `intlDuration`

`intlDuration(props?)` formats a millisecond duration using `<intl-duration>` style property names.

```ts
import { intlDuration } from '@beforesemicolon/intl'

intlDuration({
    value: 3_661_000,
    fields: 'hours minutes seconds',
    timeStyle: 'short',
})
```

## Signature

```ts
function intlDuration(props?: Partial<IntlDurationProps>): string
```

## Examples

```ts
intlDuration({ value: 90_000, fields: 'minutes seconds' })
intlDuration({ value: 3_600_000, fields: 'hours', timeStyle: 'long' })
intlDuration({ value: 3_600_000, fields: 'hour', timeStyle: 'narrow' })
```

Singular field names such as `hour` normalize to plural field names.
