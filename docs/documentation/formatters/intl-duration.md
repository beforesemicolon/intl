---
name: intlDuration
order: 6.13
title: intlDuration - Intl by Before Semicolon
description: Format millisecond durations into localized duration strings.
layout: document
---

## `intlDuration`

`intlDuration(value, options?)` converts milliseconds to human-readable duration text.
Use it for time spans (API delays, countdowns, file-size elapsed windows, etc.).

It mirrors [Intl.DurationFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat)
behavior and falls back to a package implementation when that API is unavailable.

## Input shape

`value` should be a number in milliseconds.

```ts
import { intlDuration } from '@beforesemicolon/intl'

intlDuration(3_661_000)
intlDuration(86_400_000)
```

## Signature

```ts
function intlDuration(
  value: number,
  options?: {
    locale?: string
    scope?: IntlRuntime
    fields?: '*' | string | string[]
    style?: 'long' | 'short' | 'narrow' | 'digital'
  }
): string
```

Invalid values return `''`.

## Option map

| Option | Type | Default | Effect |
|---|---|---|---|
| `locale` | `string` | runtime locale | One-off locale override |
| `scope` | `IntlRuntime` | `getIntl()` | Use nested runtime state |
| `fields` | `string` \| `string[]` \| `'*'` | `['hours', 'minutes', 'seconds']` | Units to include |
| `style` | `long \| short \| narrow \| digital` | `long` | Output compactness |

### Supported units

`years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, `milliseconds`, `microseconds`, `nanoseconds`.

Singular unit names are normalized (`hour` → `hours`).

## Examples

### Field permutations

```ts
intlDuration(90_000, { fields: 'minutes seconds' })
intlDuration(3_600_000, { fields: 'hours' })
intlDuration(86_400_000, { fields: '*' })
intlDuration(3_661_000, { fields: 'hour minute second' }) // normalized to plural
```

### Style permutations

```ts
intlDuration(3_600_000, { fields: 'hours', style: 'long' })
intlDuration(3_600_000, { fields: 'hours', style: 'short' })
intlDuration(3_600_000, { fields: 'hours', style: 'narrow' })
intlDuration(3_600_000, { fields: 'hours minutes seconds', style: 'digital' })
```

### Locale and scope overrides

```ts
import { createIntl, intlDuration } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'fr-FR', messages: {} })

intlDuration(3661_000, { scope: scoped, locale: 'fr-FR' })
```

### Empty input edge case

```ts
intlDuration(NaN) // ''
```

## See also

- [intl-duration component reference](/documentation/components/intl-duration)
- [Intl.DurationFormat docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat)
