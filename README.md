# @beforesemicolon/intl

Web Component-first internationalization utilities for scoped locale providers,
formatter functions, and lazy component registration.

## Install

```sh
npm install @beforesemicolon/intl
```

## Runtime

```ts
import { createIntl, initIntl, setLocale } from '@beforesemicolon/intl'

const checkoutIntl = createIntl({
    locale: 'en-US',
    fallbackLocale: 'en',
    messages: {
        total: 'Total: {amount}',
    },
})

initIntl({ locale: 'en-US', srcDir: '/locales' })
setLocale('pt-CV')
```

## Formatter API

Formatter functions are the source of truth. Components are thin wrappers around
these functions.

```ts
import {
    formatDateTime,
    formatList,
    formatMessage,
    formatNumber,
    formatPlural,
} from '@beforesemicolon/intl'

formatMessage('total', { amount: '$12.00' }, { scope: checkoutIntl })
formatNumber(1200, { locale: 'pt-CV' })
formatDateTime('2026-01-01T10:00:00Z', {
    dateStyle: 'medium',
    timeZone: 'UTC',
})
formatList(['A', 'B', 'C'], { type: 'conjunction' })
formatPlural(2, { one: 'item', other: 'items' })
```

## Components

```html
<intl-locale locale="en-US" src-dir="/locales" fallback>
    <intl-msg key="home.title"></intl-msg>
    <intl-number value="1200" type="currency" currency="USD"></intl-number>
    <intl-datetime
        value="2026-01-01T10:00:00Z"
        date-style="medium"
        time-zone="UTC"
    ></intl-datetime>

    <intl-locale locale="pt-CV" fallback>
        <intl-msg key="home.title"></intl-msg>
    </intl-locale>
</intl-locale>
```

Components use the nearest `<intl-locale>` scope, re-render on runtime updates,
and support explicit `locale` overrides.

## Lazy Component Imports

Each component has an independent entrypoint.

```ts
import '@beforesemicolon/intl/components/locale'
import '@beforesemicolon/intl/components/msg'
import '@beforesemicolon/intl/components/number'
import '@beforesemicolon/intl/components/datetime'
import '@beforesemicolon/intl/components/duration'
import '@beforesemicolon/intl/components/relative-time'
import '@beforesemicolon/intl/components/list'
import '@beforesemicolon/intl/components/name'
import '@beforesemicolon/intl/components/plural'
```

## Browser Bundle

```html
<script src="https://unpkg.com/@beforesemicolon/web-component/dist/client.js"></script>
<script src="https://unpkg.com/@beforesemicolon/intl/dist/client.js"></script>
<script>
    const {
        intlMsg,
        intlNumber,
        intlDatetime,
        intlDuration,
        intlRelativeTime,
        intlList,
        intlName,
        intlPlural,
    } = BFS.INTL
</script>
```

## Compatibility Aliases

The modern API prefers explicit names, but these aliases are kept temporarily:

- `<intl-msg id="...">` as an alias for `key`.
- `timezone` as an alias for `time-zone`.
- `timezone-name` as an alias for `time-zone-name`.
- `time-style` where older duration and relative-time markup used that name.

Prefer the documented names in new code.
