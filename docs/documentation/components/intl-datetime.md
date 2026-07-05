---
name: intl-datetime
order: 5.4
title: <intl-datetime> - Date & Time Formatter
description: Format Date, timestamp, and date string values with Intl.DateTimeFormat options.
layout: document
---

## `<intl-datetime>`

`<intl-datetime>` formats a date value and renders a `<time>` element with a machine-readable `datetime` attribute.

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

## Style shortcuts

```html
<intl-datetime date-style="short">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime date-style="full" time-style="short" time-zone="UTC">
    2026-01-01T10:00:00Z
</intl-datetime>
```

## Field-level formatting

```html
<intl-datetime
    weekday="long"
    year="numeric"
    month="long"
    day="2-digit"
    hour="2-digit"
    minute="2-digit"
>
    2026-01-01T10:00:00Z
</intl-datetime>
```

## Locale override

```html
<intl-datetime locale="fr-FR" date-style="long">
    2026-01-01T10:00:00Z
</intl-datetime>
```

## JavaScript API equivalent

```ts
import { intlDatetime, formatDateTime } from '@beforesemicolon/intl'

intlDatetime({
    value: '2026-01-01T10:00:00Z',
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
})

formatDateTime('2026-01-01T10:00:00Z', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
})
```
