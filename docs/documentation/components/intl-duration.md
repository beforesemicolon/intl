---
name: intl-duration
order: 5.5
title: <intl-duration> - Duration Formatter
description: Format millisecond durations with selected fields and long, short, narrow, or digital styles.
layout: document
---

## `<intl-duration>`

`<intl-duration>` formats a millisecond duration and breaks the value into duration fields.
It uses `Intl.DurationFormat` when available, otherwise a package fallback formatter.

Native reference: [Intl.DurationFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat)

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

## `value`

Use child text for static durations.

```html
<intl-duration fields="minutes seconds">90061</intl-duration>
```

Use the property from JavaScript for dynamic values.

```html
<intl-duration id="elapsed" fields="hours minutes seconds">0</intl-duration>

<script>
    document.getElementById('elapsed').value = 3661000
</script>
```

## `locale`

Use `locale` for a one-off override.

```html
<intl-duration locale="en-US" fields="hours minutes">3661000</intl-duration>
<intl-duration locale="fr-FR" fields="hours minutes">3661000</intl-duration>
```

## `time-style`

`time-style` controls duration output length.

```html
<intl-duration fields="hours minutes" time-style="long">3661000</intl-duration>
<intl-duration fields="hours minutes" time-style="short">3661000</intl-duration>
<intl-duration fields="hours minutes" time-style="narrow">3661000</intl-duration>
<intl-duration fields="hours minutes seconds" time-style="digital">3661000</intl-duration>
```

For non-long styles, the component adds a long-form `aria-label` when the accessible label differs from the visible output.

## `fields`

Use `fields` to choose which units are included.

```html
<intl-duration fields="minutes seconds">90061</intl-duration>
<intl-duration fields="hours">3600000</intl-duration>
<intl-duration fields="days hours minutes">90061000</intl-duration>
<intl-duration fields="*">90061000</intl-duration>
```

Singular names normalize to plural names.

```html
<intl-duration fields="hour minute second">3661000</intl-duration>
```

## See also

- [intlDuration](/documentation/formatters/intl-duration)
