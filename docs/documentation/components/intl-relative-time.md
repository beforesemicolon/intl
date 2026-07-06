---
name: intl-rel-time
order: 5.6
title: <intl-rel-time> - Relative Time Formatter
description: Render relative timestamps or unit offsets with live updates and accessible labels.
layout: document
---

## `<intl-rel-time>`

`<intl-rel-time>` formats relative time with `Intl.RelativeTimeFormat`.
It renders a `<time>` element when `unit="auto"` can be represented as an absolute timestamp.

Native reference: [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)

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

## `value`

With the default `unit="auto"`, the value is an absolute timestamp.

```html
<intl-rel-time>2026-01-01T00:00:00Z</intl-rel-time>
<intl-rel-time>1767225600000</intl-rel-time>
```

Use the property from JavaScript when the timestamp is dynamic.

```html
<intl-rel-time id="next-refresh" unit="auto">2026-01-01T00:00:00Z</intl-rel-time>

<script>
    document.getElementById('next-refresh').value = Date.now() + 60000
</script>
```

## `locale`

Use `locale` for a one-off override.

```html
<intl-rel-time locale="en-US" unit="day">-1</intl-rel-time>
<intl-rel-time locale="fr-FR" unit="day">-1</intl-rel-time>
```

## `unit`

Use `unit="auto"` for timestamps. Use an explicit unit when the value is already an offset.

```html
<intl-rel-time unit="auto">2026-01-01T00:00:00Z</intl-rel-time>
<intl-rel-time unit="day">-2</intl-rel-time>
<intl-rel-time unit="minute">30</intl-rel-time>
<intl-rel-time unit="second">-45</intl-rel-time>
```

Negative values are in the past. Positive values are in the future.

## `precision`

`precision` controls decimal places for relative values.

```html
<intl-rel-time unit="hour" precision="0">1.5</intl-rel-time>
<intl-rel-time unit="hour" precision="1">1.5</intl-rel-time>
<intl-rel-time unit="hour" precision="2">1.555</intl-rel-time>
```

## `decimals`

`decimals` is a convenience flag that uses one decimal place when `precision` is not set.

```html
<intl-rel-time unit="hour" decimals>1.5</intl-rel-time>
<intl-rel-time unit="hour" decimals="true">1.5</intl-rel-time>
<intl-rel-time unit="hour" decimals="false">1.5</intl-rel-time>
```

## `numeric`

`numeric="auto"` allows words such as `yesterday` when the locale supports them. `numeric="always"` keeps numeric output.

```html
<intl-rel-time unit="day" numeric="auto">-1</intl-rel-time>
<intl-rel-time unit="day" numeric="always">-1</intl-rel-time>
<intl-rel-time unit="day" numeric="true">-1</intl-rel-time>
<intl-rel-time unit="day" numeric="false">-1</intl-rel-time>
```

## `time-style`

`time-style` controls output length.

```html
<intl-rel-time unit="minute" time-style="long">30</intl-rel-time>
<intl-rel-time unit="minute" time-style="short">30</intl-rel-time>
<intl-rel-time unit="minute" time-style="narrow">30</intl-rel-time>
```

For `short` or `narrow` styles, the component adds a long-form `aria-label` when it differs from the visible content.

## `live`

`live` re-renders recent timestamp values on an interval.

```html
<intl-rel-time live>2026-01-01T00:00:00Z</intl-rel-time>
<intl-rel-time live unit="auto">1767225600000</intl-rel-time>
```

Use `live` for changing values such as `just now`, `1 minute ago`, or `in 30 seconds`. Avoid it for old historical timestamps that do not need frequent updates.

## See also

- [intlRelTime](/documentation/formatters/intl-relative-time)
