---
name: intlDateTime
order: 6.12
title: intlDateTime - Intl by Before Semicolon
description: Format Date, timestamp, and ISO string values with Intl.DateTimeFormat.
layout: document
---

## `intlDateTime`

`intlDateTime(value, options?)` formats a date-like value as localized date/time text.
Use this for values you already have in JS and want the same output as `<intl-datetime>`.

It uses the same option model as:
[Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
and uses the same runtime locale resolution as components.

Native output context: [HTML `<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time).

## Input shape

`value` can be:

- `Date`
- timestamp number (ms since epoch)
- ISO/string date (`'2026-01-01T10:00:00Z'`)

```ts
import { intlDateTime } from '@beforesemicolon/intl'

intlDateTime('2026-01-01T10:00:00Z')
intlDateTime(1704067200000)
intlDateTime(new Date('2026-01-01T10:00:00Z'))
```

## Signature

```ts
function intlDateTime(
  value: string | number | Date,
  options?: Intl.DateTimeFormatOptions & {
    locale?: string
    scope?: IntlRuntime
  }
): string
```

Invalid date input returns `''`.

## Important options

| Option | Type | Default | Effect |
|---|---|---|---|
| `locale` | `string` | runtime/DOM locale | One-off locale override |
| `scope` | `IntlRuntime` | `getIntl()` | Scope override (when using nested runtimes) |
| `dateStyle` | `full \| long \| medium \| short` | `undefined` | Preset date formatting |
| `timeStyle` | `full \| long \| medium \| short` | `undefined` | Preset time formatting |
| `calendar` | `string` | runtime default | Override calendar |
| `numberingSystem` | `string` | runtime default | Override digit system |
| `timeZone` | `string` | runtime default | IANA zone like `UTC` |
| `timeZoneName` | `long \| short` | `undefined` | Show timezone label |
| `hour12` | `boolean` | runtime default | Force 12h clock |
| `hourCycle` | `h11 \| h12 \| h23 \| h24` | runtime default | Alternative hour formatting |
| `weekday` | `narrow \| short \| long` | `undefined` | Day name output |
| `year` | `numeric \| 2-digit` | `undefined` | Year part |
| `month` | `numeric \| 2-digit \| narrow \| short \| long` | `undefined` | Month part |
| `day` | `numeric \| 2-digit` | `undefined` | Day part |
| `hour` | `numeric \| 2-digit` | `undefined` | Hour part |
| `minute` | `numeric \| 2-digit` | `undefined` | Minute part |
| `second` | `numeric \| 2-digit` | `undefined` | Second part |
| `fractionalSecondDigits` | `1 \| 2 \| 3` | `undefined` | Fractional seconds |
| `era` | `narrow \| short \| long` | `undefined` | Era label |

## Examples

### Presets

```ts
intlDateTime(Date.now(), { dateStyle: 'short' })
intlDateTime(Date.now(), { timeStyle: 'medium' })
intlDateTime(Date.now(), { dateStyle: 'long', timeStyle: 'short' })
```

### Field-level formatting

```ts
intlDateTime('2026-01-01T10:00:00Z', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
})
```

### Locale and timezone variants

```ts
intlDateTime('2026-01-01T10:00:00Z', {
    locale: 'en-US',
    timeZone: 'UTC',
    timeStyle: 'short',
})

intlDateTime('2026-01-01T10:00:00Z', {
    locale: 'fr-FR',
    timeZone: 'Europe/Paris',
    timeZoneName: 'short',
})
```

### Scope integration

```ts
import { createIntl, intlDateTime } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'en-GB', messages: {} })

intlDateTime('2026-01-01T10:00:00Z', { scope: scoped })
```

### Empty output rules

```ts
intlDateTime('bad-date-string') // ''
intlDateTime(NaN as unknown as number) // ''
```

## See also

- [intl-datetime component reference](/documentation/components/intl-datetime)
- [Intl.DateTimeFormat docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
