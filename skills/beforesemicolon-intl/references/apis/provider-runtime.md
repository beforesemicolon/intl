# getIntlLocaleRuntime

`@beforesemicolon/intl@0.5.0` · `intl/provider-runtime`

Find the mounted locale scope for an element.

- This helper is not in BFS.INTL. In classic mode use setLocale for the top-level default provider.
- If a provider is not mounted yet, scope may be undefined.

## Setup

### npm

The npm root registers its custom elements automatically.

````js
import { getIntlLocaleRuntime } from '@beforesemicolon/intl'
````

### Classic scripts

This record does not expose a classic-script API.

## Public values

### `getIntlLocaleRuntime`

````typescript
getIntlLocaleRuntime: (element: Element | null) => IntlRuntime | undefined
````

Find the mounted provider scope for an element using the nearest matching provider. Returns undefined before registration or mount. This named export does not appear in BFS.INTL.

````js
const locale = getIntlLocaleRuntime(document.querySelector('intl-locale'))
if (locale) await locale.setLocale('pt')
````

## Examples

````js
import { getIntlLocaleRuntime } from '@beforesemicolon/intl'
const scope = getIntlLocaleRuntime(document.querySelector('intl-locale'))
if (scope) await scope.setLocale('pt')
````

## Related local reference

[intl/runtime](runtime.md) · [intl/intl-locale](intl-locale.md)

[Back to the offline reference index](../index.md)
