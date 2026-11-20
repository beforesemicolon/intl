# intl-datetime

`@beforesemicolon/intl@0.5.0` · `intl/intl-datetime`

Format a date or time with an optional zone.

## Setup

### npm

The npm root registers its custom elements automatically.

````js
import '@beforesemicolon/intl'
````

### Selective npm registration

The default export of the component subpath is an initializer, not a custom element class. Call it with the public Web Component module. Import the full root instead if the app needs every Intl element.

````js
import * as webComponent from '@beforesemicolon/web-component'
import register from '@beforesemicolon/intl/components/intl-datetime'

register(webComponent)
````

### Classic scripts

- `https://cdn.jsdelivr.net/npm/@beforesemicolon/web-component@1.22.0/dist/client.js`
- `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/dist/client.js`

Load scripts in the listed order. No bundler is needed.

## Element `<intl-datetime>`

Format dates and times using a Date, a millisecond epoch, or a parseable string. Give a zone when consistent cross-time-zone display matters. The element preserves a machine-readable time value.

Initial text takes precedence over value. Use an empty body with a value attribute for dynamic input, or supply raw input as the text. Do not use formatted text as the body.

- `value`: Input date; prefer an ISO string with an explicit offset or a millisecond epoch.
- `locale`: Optional BCP 47 language tag; defaults to the active runtime locale.
- `date-style`: Preset date style: full, long, medium, or short.
- `time-style`: Preset time style: full, long, medium, or short.
- `time-zone`: IANA timezone such as UTC or America/New_York.
- `timezone`: Legacy spelling; prefer time-zone.
- `time-zone-name`: How to display the timezone name.
- `timezone-name`: Legacy spelling; prefer time-zone-name.
- `calendar`: Calendar identifier.
- `hour-cycle`: Hour cycle such as h23.
- `hour12`: Boolean choice of 12-hour time.
- `weekday`: Weekday presentation.
- `era`: Calendar era presentation.
- `year`: Year presentation.
- `month`: Month presentation.
- `day`: Day-of-month presentation.
- `day-period`: Day period presentation.
- `hour`: Hour presentation.
- `minute`: Minute presentation.
- `second`: Second presentation.

````html
<intl-datetime value="2026-01-01T15:00:00Z" date-style="medium" time-style="short" time-zone="UTC"></intl-datetime>
````

## Type-only exports

Import these with `import type` in TypeScript. They are not runtime values.

### `IntlDatetimeProps`

````typescript
export interface IntlDatetimeProps {
    value: string | number | Date | undefined;
    locale: string;
    dateStyle: Intl.DateTimeFormatOptions['dateStyle'];
    timeStyle: Intl.DateTimeFormatOptions['timeStyle'];
    timeZone: string;
    timezone: string;
    timeZoneName: Intl.DateTimeFormatOptions['timeZoneName'];
    timezoneName: Intl.DateTimeFormatOptions['timeZoneName'];
    calendar: string;
    hourCycle: Intl.DateTimeFormatOptions['hourCycle'];
    hour12: boolean | string | undefined;
    weekday: Intl.DateTimeFormatOptions['weekday'];
    era: Intl.DateTimeFormatOptions['era'];
    year: Intl.DateTimeFormatOptions['year'];
    month: Intl.DateTimeFormatOptions['month'];
    day: Intl.DateTimeFormatOptions['day'];
    dayPeriod: Intl.DateTimeFormatOptions['dayPeriod'];
    hour: Intl.DateTimeFormatOptions['hour'];
    minute: Intl.DateTimeFormatOptions['minute'];
    second: Intl.DateTimeFormatOptions['second'];
}
````

## Examples

````js
import '@beforesemicolon/intl'
````

````html
<intl-datetime value="2026-01-01T10:00:00Z" date-style="medium" time-zone="UTC"></intl-datetime>
````

### Classic

````html
<intl-datetime value="2026-01-01T10:00:00Z" date-style="medium" time-zone="UTC"></intl-datetime>
````

[Back to the offline reference index](../index.md)
