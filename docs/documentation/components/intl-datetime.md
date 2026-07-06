---
name: intl-datetime
order: 5.4
title: <intl-datetime> - Date & Time Formatter
description: Format Date, timestamp, and date string values with Intl.DateTimeFormat options.
layout: document
---

## `<intl-datetime>`

`<intl-datetime>` formats a date value and renders a `<time>` element with a machine-readable `datetime` attribute.

Native references: [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) and [`<time>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time)

```html
<intl-datetime date-style="full">2026-01-01T10:00:00Z</intl-datetime>
```

## Attributes and properties

| Attribute | JS property | Type | Description |
|---|---|---|---|
| `value` | `value` | string/number/Date | Date value. Child text is used when omitted. |
| `locale` | `locale` | string | Overrides the runtime locale. |
| `date-style` | `dateStyle` | `full` \| `long` \| `medium` \| `short` | Date style shortcut. |
| `time-style` | `timeStyle` | `full` \| `long` \| `medium` \| `short` | Time style shortcut. |
| `time-zone` | `timeZone` | string | IANA time zone, such as `UTC` or `America/New_York`. |
| `time-zone-name` | `timeZoneName` | string | Time zone label style. |
| `calendar` | `calendar` | string | Calendar identifier. |
| `hour-cycle` | `hourCycle` | string | Hour cycle such as `h12`, `h23`. |
| `hour12` | `hour12` | boolean/string | Forces 12-hour or 24-hour output. |
| `weekday` | `weekday` | string | Weekday field style. |
| `era` | `era` | string | Era field style. |
| `year` | `year` | string | Year field style. |
| `month` | `month` | string | Month field style. |
| `day` | `day` | string | Day field style. |
| `day-period` | `dayPeriod` | string | Day period field style. |
| `hour` | `hour` | string | Hour field style. |
| `minute` | `minute` | string | Minute field style. |
| `second` | `second` | string | Second field style. |

When `date-style` or `time-style` is set, field-level options such as `weekday`, `year`, and `hour` are not applied.

## `value`

Use child text for static dates.

```html
<intl-datetime>2026-01-01T10:00:00Z</intl-datetime>
```

Use the property from JavaScript when the value is dynamic.

```html
<intl-datetime id="last-updated" date-style="medium">2026-01-01</intl-datetime>

<script>
    document.getElementById('last-updated').value = new Date()
</script>
```

## `locale`

Use `locale` for a one-off override.

```html
<intl-datetime locale="en-US" date-style="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime locale="fr-FR" date-style="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime locale="ja-JP" date-style="long">2026-01-01T10:00:00Z</intl-datetime>
```

## `date-style`

`date-style` provides browser-defined date presets.

```html
<intl-datetime date-style="full">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime date-style="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime date-style="medium">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime date-style="short">2026-01-01T10:00:00Z</intl-datetime>
```

## `time-style`

`time-style` provides browser-defined time presets.

```html
<intl-datetime time-style="full">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime time-style="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime time-style="medium">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime time-style="short">2026-01-01T10:00:00Z</intl-datetime>
```

## `time-zone`

`time-zone` controls which time zone the date is rendered in.

```html
<intl-datetime time-style="short" time-zone="UTC">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime time-style="short" time-zone="America/New_York">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime time-style="short" time-zone="Asia/Tokyo">2026-01-01T10:00:00Z</intl-datetime>
```

## `time-zone-name`

Use `time-zone-name` when the rendered text should include the zone label.

```html
<intl-datetime hour="numeric" time-zone="UTC" time-zone-name="short">
    2026-01-01T10:00:00Z
</intl-datetime>

<intl-datetime hour="numeric" time-zone="UTC" time-zone-name="long">
    2026-01-01T10:00:00Z
</intl-datetime>
```

## `calendar`

`calendar` requests a calendar system supported by the browser.

```html
<intl-datetime calendar="gregory" date-style="full">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime calendar="buddhist" date-style="full">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime calendar="japanese" date-style="full">2026-01-01T10:00:00Z</intl-datetime>
```

## `hour-cycle`

`hour-cycle` requests a specific clock cycle.

```html
<intl-datetime hour="numeric" minute="2-digit" hour-cycle="h12">
    2026-01-01T22:30:00Z
</intl-datetime>

<intl-datetime hour="numeric" minute="2-digit" hour-cycle="h23">
    2026-01-01T22:30:00Z
</intl-datetime>
```

## `hour12`

`hour12` forces 12-hour or 24-hour output.

```html
<intl-datetime hour="numeric" minute="2-digit" hour12="true">
    2026-01-01T22:30:00Z
</intl-datetime>

<intl-datetime hour="numeric" minute="2-digit" hour12="false">
    2026-01-01T22:30:00Z
</intl-datetime>
```

## `weekday`

`weekday` controls the weekday field.

```html
<intl-datetime weekday="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime weekday="short">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime weekday="narrow">2026-01-01T10:00:00Z</intl-datetime>
```

## `era`

`era` controls the era field.

```html
<intl-datetime era="long" year="numeric">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime era="short" year="numeric">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime era="narrow" year="numeric">2026-01-01T10:00:00Z</intl-datetime>
```

## `year`

`year` controls the year field.

```html
<intl-datetime year="numeric">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime year="2-digit">2026-01-01T10:00:00Z</intl-datetime>
```

## `month`

`month` controls the month field.

```html
<intl-datetime month="numeric">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime month="2-digit">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime month="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime month="short">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime month="narrow">2026-01-01T10:00:00Z</intl-datetime>
```

## `day`

`day` controls the day field.

```html
<intl-datetime day="numeric">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime day="2-digit">2026-01-01T10:00:00Z</intl-datetime>
```

## `day-period`

`day-period` controls localized day-period labels in browsers that support it.

```html
<intl-datetime hour="numeric" day-period="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime hour="numeric" day-period="short">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime hour="numeric" day-period="narrow">2026-01-01T10:00:00Z</intl-datetime>
```

## `hour`

`hour` controls the hour field.

```html
<intl-datetime hour="numeric">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime hour="2-digit">2026-01-01T10:00:00Z</intl-datetime>
```

## `minute`

`minute` controls the minute field.

```html
<intl-datetime hour="numeric" minute="numeric">2026-01-01T10:05:00Z</intl-datetime>
<intl-datetime hour="numeric" minute="2-digit">2026-01-01T10:05:00Z</intl-datetime>
```

## `second`

`second` controls the second field.

```html
<intl-datetime hour="numeric" minute="2-digit" second="numeric">
    2026-01-01T10:05:09Z
</intl-datetime>

<intl-datetime hour="numeric" minute="2-digit" second="2-digit">
    2026-01-01T10:05:09Z
</intl-datetime>
```

## See also

- [intlDateTime](/documentation/formatters/intl-date-time)
