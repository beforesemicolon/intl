const root = '@beforesemicolon/intl'
const runtime = `${root}/runtime`
const formatter = `${root}/formatters`
const component = (
    slug,
    summary,
    keywords,
    attributes,
    markup,
    extra = {}
) => ({
    id: slug,
    name: slug,
    component: slug,
    summary,
    keywords,
    attributes,
    doc: `documentation/components/${slug === 'intl-rel-time' ? 'intl-relative-time' : slug}`,
    npm: {
        example: `// Register in the app entry: import '${root}'\n// In the HTML:\n${markup}`,
    },
    classic: { example: markup },
    ...extra,
})

const localeSwitch = ({ scripts }) => `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Switch locale</title>
${scripts.map((url) => `    <script src="${url}"></script>`).join('\n')}
</head>
<body>
    <intl-locale locale="en" fallback-locale="en" src-dir="/locales" fallback update-document>
        <h1><intl-msg key="home.title">Welcome</intl-msg></h1>
    </intl-locale>
    <label for="language">Language</label>
    <select id="language">
        <option value="en">English</option>
        <option value="pt">Português</option>
    </select>
    <script>
        document.querySelector('#language').addEventListener('change', async (event) => {
            await BFS.INTL.setLocale(event.target.value)
        })
    </script>
</body>
</html>
`
export const records = [
    component(
        'intl-locale',
        'Load messages and provide the active locale to descendants.',
        [
            'provider',
            'scope',
            'locale',
            'language',
            'fallback',
            'switch',
            'translation',
        ],
        [
            'locale',
            'fallback-locale',
            'src-dir',
            'src',
            'fallback',
            'update-document',
        ],
        '<intl-locale locale="en" src-dir="/locales" fallback update-document><intl-msg key="home.title">Welcome</intl-msg></intl-locale>',
        {
            slots: ['default'],
            events: Object.fromEntries(
                ['locale-load', 'locale-change', 'locale-error'].map((name) => [
                    name,
                    {
                        detail: 'IntlRuntimeSnapshot',
                        bubbles: true,
                        composed: true,
                    },
                ])
            ),
            notes: [
                'Serve the two-view or locale-switch demo over HTTP with /locales/en.json and /locales/pt.json served at the host root.',
                'Use one top-level provider. Descendants read the nearest provider; nested scopes inherit parent values and may override them.',
                'Use fallback-locale to choose the fallback language. The fallback attribute instead allows slot content before messages finish loading.',
                'Add update-document only on the main locale provider. Use setLocale to switch the mounted runtime; do not assume that changing the provider attribute reconfigures the runtime.',
                'The provider emits locale-load, locale-change, or locale-error during its load. Use subscribeIntl for runtime-driven changes and unsubscribe on cleanup.',
            ],
            examplePaths: { classic: { path: 'examples/locale-switch.html' } },
            classic: {},
            files: {
                'examples/locale-switch.html': localeSwitch,
                'examples/locales/en.json':
                    '{ "home": { "title": "Welcome" } }\n',
                'examples/locales/pt.json':
                    '{ "home": { "title": "Bem-vindo" } }\n',
            },
            related: ['intl/intl-msg', 'intl/runtime'],
        }
    ),
    component(
        'intl-msg',
        'Resolve a localized message key and interpolate values.',
        [
            'translate',
            'text',
            'message',
            'i18n',
            'interpolate',
            'localized text',
        ],
        ['key', 'values', 'id'],
        `<intl-msg key="home.hello" values='{"name":"Pat"}'>Hello Pat</intl-msg>`,
        {
            notes: [
                'Use key, not the legacy id alias. Dotted keys resolve nested message objects. Keep fallback text meaningful.',
                'Supply only trusted translation content and trusted interpolations; this component renders output as a template. For untrusted strings, use native textContent.',
            ],
            related: ['intl/intl-locale', 'intl/formatters'],
        }
    ),
    component(
        'intl-number',
        'Format a number, currency, percent, or unit.',
        ['currency', 'price', 'number', 'percentage', 'measurement'],
        ['value', 'type', 'currency', 'unit', 'locale'],
        '<intl-number value="1200" type="currency" currency="USD">1200</intl-number>',
        { typeNames: ['IntlNumberProps'] }
    ),
    component(
        'intl-datetime',
        'Format a date or time with an optional zone.',
        ['date', 'time', 'datetime', 'timezone', 'calendar'],
        ['value', 'date-style', 'time-zone'],
        '<intl-datetime value="2026-01-01T10:00:00Z" date-style="medium" time-zone="UTC">January 1, 2026</intl-datetime>',
        { typeNames: ['IntlDatetimeProps'] }
    ),
    component(
        'intl-duration',
        'Format a duration from milliseconds.',
        ['duration', 'hours', 'minutes', 'elapsed'],
        ['value', 'time-style', 'fields', 'locale'],
        '<intl-duration value="3600000" fields="hours" time-style="short">1 hr</intl-duration>',
        { typeNames: ['IntlDurationProps'] }
    ),
    component(
        'intl-rel-time',
        'Format a time relative to now, with optional live updates.',
        ['ago', 'relative', 'live', 'from now', 'time'],
        ['value', 'live', 'locale', 'unit', 'numeric'],
        '<intl-rel-time value="1780000000000" numeric="auto"></intl-rel-time>',
        { typeNames: ['IntlRelTimeProps'] }
    ),
    component(
        'intl-relative-time',
        'Legacy alias for intl-rel-time; prefer the shorter tag.',
        ['legacy', 'alias', 'relative time'],
        ['value', 'live', 'locale'],
        '<intl-rel-time value="1780000000000"></intl-rel-time>',
        { related: ['intl/intl-rel-time'] }
    ),
    component(
        'intl-list',
        'Format a localized list with conjunction, disjunction, or unit style.',
        ['list', 'and', 'or', 'join'],
        ['value', 'type', 'locale', 'type-style'],
        '<intl-list value="book pen pencil" type="and">book, pen, and pencil</intl-list>',
        { typeNames: ['IntlListProps'] }
    ),
    component(
        'intl-name',
        'Display a localized name for a region, language, or currency code.',
        ['country', 'translated language name', 'display name', 'code'],
        ['value', 'type', 'name-style', 'locale'],
        '<intl-name value="PT" type="region">Portugal</intl-name>',
        { typeNames: ['IntlNameProps'] }
    ),
    component(
        'intl-plural',
        'Choose localized text by plural category.',
        ['count', 'plural', 'singular', 'quantity'],
        ['value', 'one', 'other', 'type'],
        '<intl-plural value="2" one="item" other="items">items</intl-plural>',
        { typeNames: ['IntlPluralProps'] }
    ),
    {
        id: 'runtime',
        name: 'createIntl / initIntl / setLocale',
        summary:
            'Create a scoped locale runtime, load messages, or change the current language.',
        keywords: [
            'scope',
            'runtime',
            'set locale',
            'switch language',
            'fallback',
            'initialization',
            'subscribe',
            'cleanup',
        ],
        doc: 'documentation/apis/create-intl',
        typeNames: [
            'IntlDirection',
            'IntlRuntime',
            'IntlRuntimeOptions',
            'IntlRuntimeSnapshot',
            'IntlMessages',
            'IntlRuntimeListener',
            'IntlRuntimeStatus',
        ],
        npm: {
            specifier: runtime,
            names: [
                'createIntl',
                'initIntl',
                'getIntl',
                'setLocale',
                'loadLocale',
                'subscribeIntl',
                'destroyIntl',
                'resetIntl',
                'getLocaleDirection',
            ],
            example: `import { createIntl, setLocale } from '${runtime}'
const messages = { en: { greeting: 'Hello' }, pt: { greeting: 'Olá' } }
const scope = createIntl({ locale: 'en', loader: (locale) => messages[locale] ?? {} })
await setLocale('pt', scope)
console.log(scope.getMessage('greeting'))
scope.destroy()`,
        },
        classic: { example: "await BFS.INTL.setLocale('pt')" },
        notes: [
            'Import the runtime subpath when no Custom Element registration is required.',
            'Use the default runtime or explicit scope consistently. Use initIntl only when you mean to replace the default; a mounted top-level intl-locale sets it up.',
            'Runtime lookup checks active messages, fallback messages, then parent scope. Use subscribeIntl for pending, ready, and error status.',
        ],
        related: ['intl/intl-locale', 'intl/intl-msg', 'intl/formatters'],
    },
    {
        id: 'formatters',
        name: 'intlMsg / intlNumber / intlDateTime and formatters',
        summary:
            'Format locale-aware values without coupling output to custom elements.',
        keywords: [
            'format',
            'translate',
            'message',
            'number',
            'currency',
            'date',
            'time',
            'duration',
            'list',
            'name',
            'plural',
        ],
        doc: 'documentation/formatters/intl-message',
        typeNames: [
            'FormatterOptions',
            'MessageFormatOptions',
            'MessageValues',
            'DurationFormatOptions',
            'RelativeTimeFormatOptions',
            'PluralFormatOptions',
            'DurationParts',
            'ListFormatType',
            'ListFormatStyle',
            'ListFormatOptions',
        ],
        npm: {
            specifier: formatter,
            names: [
                'intlMsg',
                'intlNumber',
                'intlDateTime',
                'intlDuration',
                'intlRelTime',
                'intlList',
                'intlName',
                'intlPlural',
            ],
            example: `import { intlNumber } from '${formatter}'
console.log(intlNumber(1200, { locale: 'en-US', style: 'currency', currency: 'USD' }))`,
        },
        classic: {
            example:
                "console.log(BFS.INTL.intlNumber(1200, { locale: 'en-US', style: 'currency', currency: 'USD' }))",
        },
        notes: [
            'Use the formatter subpath when you do not need custom elements. In classic mode use BFS.INTL.',
            'Pass an explicit scope when formatting outside the top-level application. Native Intl options are used where applicable.',
            'Format functions take the value as the first argument. Do not pass an object with a value field as shown in older examples.',
        ],
        related: ['intl/runtime', 'intl/intl-number'],
    },
    {
        id: 'format-utils',
        name: 'Formatter support utilities',
        summary:
            'Related utility exports for existing low-level code using the formatter module.',
        keywords: [
            'format internals',
            'numeric units',
            'format cache',
            'message interpolation',
        ],
        doc: 'documentation/formatters/intl-message',
        npm: {
            specifier: formatter,
            names: [
                'IntlWithListFormat',
                'listTypeAliases',
                'getRuntime',
                'getLocale',
                'stableStringify',
                'getCachedFormatter',
                'interpolateMessage',
                'normalizeDurationFields',
                'getRelativeUnitAndValue',
                'fallbackDurationFormat',
            ],
            example: `import { interpolateMessage } from '${formatter}'
console.log(interpolateMessage('Hello {name}', { name: 'Pat' }))`,
        },
        notes: [
            'Use these only for explicit low-level integration. Prefer the formatter functions for application code. These names are not classic browser globals.',
        ],
        related: ['intl/formatters'],
    },
    {
        id: 'provider-runtime',
        name: 'getIntlLocaleRuntime',
        summary: 'Find the mounted locale scope for an element.',
        keywords: [
            'component provider',
            'scope',
            'closest',
            'nested',
            'set locale',
        ],
        doc: 'documentation/components/intl-locale',
        npm: {
            names: ['getIntlLocaleRuntime'],
            example: `import { getIntlLocaleRuntime } from '${root}'
const scope = getIntlLocaleRuntime(document.querySelector('intl-locale'))
if (scope) await scope.setLocale('pt')`,
        },
        notes: [
            'This helper is not in BFS.INTL. In classic mode use setLocale for the top-level default provider.',
            'If a provider is not mounted yet, scope may be undefined.',
        ],
        related: ['intl/runtime', 'intl/intl-locale'],
    },
]
