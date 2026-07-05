---
name: intl-duration
order: 5.5
title: <intl-duration> - Duration Formatter
description: Format millisecond durations with selected fields and long, short, narrow, or digital styles.
layout: document
---

## `<intl-duration>`

`<intl-duration>` formats a millisecond duration. It breaks the value into duration fields, then formats those fields with `Intl.DurationFormat` or the package fallback formatter.

```html
<intl-duration fields="hours minutes seconds">3661000</intl-duration>
```

## Attributes and properties

| Attribute | JS property | Type | Description |
|---|---|---|---|
| `value` | `value` | number/string | Milliseconds to format. Child text is used when omitted. |
| `locale` | `locale` | string | Overrides the runtime locale. |
| `time-style` | `timeStyle` | `long` \| `short` \| `narrow` \| `digital` | Output style. |
| `fields` | `fields` | `*` or space-separated units | Units to include. |

Valid fields are `years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, `milliseconds`, `microseconds`, and `nanoseconds`. Singular names such as `hour` normalize to plural names.

## Field selection

```html
<intl-duration fields="minutes seconds">90061</intl-duration>
<intl-duration fields="hours">3600000</intl-duration>
<intl-duration fields="*">90061000</intl-duration>
```

## Styles

```html
<intl-duration fields="hours" time-style="long">3600000</intl-duration>
<intl-duration fields="hours" time-style="short">3600000</intl-duration>
<intl-duration fields="hours" time-style="narrow">3600000</intl-duration>
```

For non-long styles, the component adds a long-form `aria-label` when the accessible label differs from the visible output.

## JavaScript API equivalent

```ts
import { intlDuration, formatDuration } from '@beforesemicolon/intl'

intlDuration({
    value: 3_661_000,
    fields: 'hours minutes seconds',
    timeStyle: 'short',
})

formatDuration(3_661_000, {
    fields: 'hours minutes seconds',
    style: 'short',
})
```
