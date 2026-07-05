---
name: intl-rel-time
order: 5.6
title: <intl-rel-time> - Relative Time Formatter
description: Render relative timestamps or unit offsets with live updates and accessible labels.
layout: document
---

## `<intl-rel-time>`

`<intl-rel-time>` formats relative time with `Intl.RelativeTimeFormat`. It renders a `<time>` element when `unit="auto"` can be represented as an absolute timestamp.

```html
<intl-rel-time live>2026-01-01T00:00:00Z</intl-rel-time>
```

The package also registers `<intl-relative-time>` as an equivalent element name.

## Attributes and properties

| Attribute | JS property | Type | Description |
|---|---|---|---|
| `value` | `value` | number/string/Date | Timestamp or unit offset. Child text is used when omitted. |
| `locale` | `locale` | string | Overrides the runtime locale. |
| `unit` | `unit` | `auto` or relative-time unit | `auto` treats value as an absolute timestamp. Explicit units treat value as an offset. |
| `precision` | `precision` | number/string | Fraction precision. |
| `decimals` | `decimals` | boolean/string | Convenience flag that sets precision to `1` when `precision` is absent. |
| `numeric` | `numeric` | `auto` \| `always` \| boolean | `true` maps to `always`; `false` maps to `auto`. |
| `time-style` | `timeStyle` | `long` \| `short` \| `narrow` | Output style. |
| `live` | `live` | boolean/string | Re-renders recent values on an interval. |

## Absolute timestamp

```html
<intl-rel-time live precision="1">2026-01-01T00:00:00Z</intl-rel-time>
<intl-rel-time>1767225600000</intl-rel-time>
```

With `unit="auto"`, the component compares the timestamp to `Date.now()`.

## Explicit unit offset

```html
<intl-rel-time unit="day" numeric="always">-2</intl-rel-time>
<intl-rel-time unit="minute" time-style="short">30</intl-rel-time>
```

With an explicit unit, the value is the offset in that unit. Negative values are in the past; positive values are in the future.

## Accessibility

For `short` or `narrow` styles, the component adds a long-form `aria-label` when it differs from the visible content.

## JavaScript API equivalent

```ts
import { intlRelativeTime, formatRelativeTime } from '@beforesemicolon/intl'

intlRelativeTime(Date.now() + 60_000, {
    unit: 'auto',
    live: true,
})

formatRelativeTime(-2, {
    unit: 'day',
    numeric: 'always',
})
```
