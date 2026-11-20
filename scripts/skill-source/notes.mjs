const n = (description, example) => ({ description, example })
const component = (behavior, attributes, recipe) => ({
    behavior,
    attributes,
    recipe,
})
const localized =
    'Optional BCP 47 language tag; defaults to the active runtime locale.'
const value =
    'The value to format. Use a stable data value rather than already formatted text.'
const relative = component(
    'Show time relative to now. With unit="auto", supply a timestamp or date. The tag can update while mounted when live is enabled. intl-relative-time is the compatibility spelling; prefer intl-rel-time.',
    {
        live: 'Opt in to updating the label as time passes.',
        decimals:
            'Legacy precision toggle; use precision for an exact number of decimals.',
        precision: 'Decimal places for the numeric difference.',
        value: 'Timestamp in milliseconds or date text for automatic mode.',
        'time-style': 'Display style: long, short, or narrow.',
        numeric:
            'Use auto for words such as tomorrow or always for numeric wording.',
        unit: 'Use auto to select a unit from the timestamp. Otherwise choose a relative-time unit.',
        locale: localized,
    },
    '<intl-rel-time value="2026-01-01T12:00:00Z" unit="auto" numeric="auto" live></intl-rel-time>'
)
export const descriptions = {
    components: {
        'intl-locale': component(
            'Create or mount a locale scope. The outermost provider supplies the default runtime. Nested scopes can inherit the parent messages and fallback. Descendants resolve the nearest provider. Use one provider for each intentional language boundary.',
            {
                locale: 'Active BCP 47 locale, such as pt-CV.',
                'fallback-locale':
                    'Fallback translation locale when a key is missing from active messages.',
                src: 'Exact URL for messages. Use src-dir when switching between separate locale files.',
                'src-dir':
                    'Directory containing one JSON file per locale, e.g. /locales/pt.json.',
                'update-document':
                    'Reflect the active locale and direction on document.documentElement. Reserve this for the outermost provider.',
                fallback:
                    'Render slot content before messages are ready. Does not select a fallback locale.',
            },
            '<intl-locale locale="en" fallback-locale="en" src-dir="/locales" fallback update-document><intl-msg key="home.title">Welcome</intl-msg></intl-locale>'
        ),
        'intl-msg': component(
            'Render the message for a dotted key, with optional interpolation. Visible slot text is the fallback if loading has not finished or lookup fails. Render only trusted translations and interpolated values through this HTML-capable element.',
            {
                id: 'Legacy alias for key; prefer key.',
                key: 'Lookup key, such as home.title.',
                values: 'JSON object mapping interpolation placeholders to values.',
            },
            '<intl-msg key="welcome" values=\'{"name":"Pat"}\'>Welcome, Pat</intl-msg>'
        ),
        'intl-number': component(
            'Format locale-aware numbers using Intl.NumberFormat options. Keep raw numeric data separate from display text. For percentages, 0.25 is 25%.',
            {
                value,
                locale: localized,
                type: 'Style: decimal, currency, percent, or unit.',
                currency: 'ISO 4217 code for currency style.',
                'currency-style':
                    'Map to currencyDisplay (e.g. symbol, code, or name).',
                'currency-sign':
                    'Map to currencySign; use accounting for accounting notation.',
                unit: 'Unit identifier for unit style.',
                'unit-style': 'Map to unitDisplay, e.g. short or long.',
                notation: 'Number notation, e.g. standard or compact.',
                compact: 'Map to compactDisplay when notation=compact.',
                system: 'Map to numberingSystem.',
                grouping: 'Map to useGrouping; use false to omit grouping.',
                sign: 'Map to signDisplay.',
                rounding: 'Map to roundingMode.',
                'rounding-increment': 'Numeric rounding increment.',
                'rounding-priority':
                    'Map to roundingPriority when precision options interact.',
                'trailing-zero': 'Map to trailingZeroDisplay.',
                'min-digits': 'Minimum integer digits.',
                'significant-digits':
                    'Whitespace-separated minimum and maximum significant digits.',
                fractions:
                    'Whitespace-separated minimum and maximum fractional digits.',
            },
            '<intl-number value="39" type="currency" currency="USD"></intl-number>'
        ),
        'intl-datetime': component(
            'Format dates and times using a Date, a millisecond epoch, or a parseable string. Give a zone when consistent cross-time-zone display matters. The element preserves a machine-readable time value.',
            {
                value: 'Input date; prefer an ISO string with an explicit offset or a millisecond epoch.',
                locale: localized,
                'date-style':
                    'Preset date style: full, long, medium, or short.',
                'time-style':
                    'Preset time style: full, long, medium, or short.',
                'time-zone': 'IANA timezone such as UTC or America/New_York.',
                timezone: 'Legacy spelling; prefer time-zone.',
                'time-zone-name': 'How to display the timezone name.',
                'timezone-name': 'Legacy spelling; prefer time-zone-name.',
                calendar: 'Calendar identifier.',
                'hour-cycle': 'Hour cycle such as h23.',
                hour12: 'Boolean choice of 12-hour time.',
                weekday: 'Weekday presentation.',
                era: 'Calendar era presentation.',
                year: 'Year presentation.',
                month: 'Month presentation.',
                day: 'Day-of-month presentation.',
                'day-period': 'Day period presentation.',
                hour: 'Hour presentation.',
                minute: 'Minute presentation.',
                second: 'Second presentation.',
            },
            '<intl-datetime value="2026-01-01T15:00:00Z" date-style="medium" time-style="short" time-zone="UTC"></intl-datetime>'
        ),
        'intl-duration': component(
            'Format a numeric duration, not a timestamp or ISO interval. The input unit is milliseconds. Select fields so an elapsed time uses the units that matter.',
            {
                value: 'Duration in milliseconds.',
                'time-style': 'Use long, short, narrow, or digital.',
                fields: 'An asterisk for all fields or a whitespace-separated list such as hours minutes.',
                locale: localized,
            },
            '<intl-duration value="5400000" fields="hours minutes" time-style="short"></intl-duration>'
        ),
        'intl-rel-time': relative,
        'intl-relative-time': relative,
        'intl-list': component(
            'Join values with locale-aware punctuation and conjunctions. A string value splits at whitespace. Use an array property when a single item contains spaces.',
            {
                locale: localized,
                value: 'List strings (property array or whitespace-separated HTML text).',
                type: 'conjunction, disjunction, unit, or aliases and, or, none.',
                'type-style': 'Style preset, e.g. long, short, narrow.',
            },
            '<intl-list value="pen book pencil" type="and"></intl-list>'
        ),
        'intl-name': component(
            'Display a human-readable name from a code, not a user-supplied name. Pair the code type with its value.',
            {
                value: 'Code appropriate for the chosen type, e.g. PT for region.',
                type: 'DisplayNames type, such as region, language, or currency.',
                'name-style': 'DisplayNames style, such as long or short.',
                locale: localized,
                language:
                    'Language display style, such as dialect or standard.',
            },
            '<intl-name value="PT" type="region"></intl-name>'
        ),
        'intl-plural': component(
            'Select text by plural category. Do not hard-code an English singular/plural rule in a localized app. Cardinal returns the selected category text. Ordinal appends the selected suffix to the numeric value.',
            {
                value: 'Number to classify.',
                type: 'cardinal or ordinal.',
                locale: localized,
                zero: 'Text for category zero.',
                one: 'Text for category one.',
                two: 'Text for category two.',
                few: 'Text for category few.',
                many: 'Text for category many.',
                other: 'Text for category other and the fallback when no selected category text is supplied.',
            },
            '<intl-plural value="2" one="result" other="results"></intl-plural>'
        ),
    },
    symbols: {
        createIntl: n(
            'Create an independent scope without replacing the global default. A scope can use static messages, an async loader, path-based loading, or a parent scope.',
            "const scope = createIntl({ locale: 'en', messages: { title: 'Home' } })"
        ),
        initIntl: n(
            'Replace the module default runtime. Use during application initialization outside a provider; do not call again merely to change languages.',
            "const runtime = initIntl({ locale: 'en', srcDir: '/locales' })"
        ),
        getIntl: n(
            'Return a supplied scope, or get or create the default. Pass a scope explicitly in isolated code so it does not read global state by accident.',
            'const runtime = getIntl()'
        ),
        setLocale: n(
            'Change a scope locale, loading messages as needed. Omit scope only for default-provider workflows. Await the snapshot before reading the selected language.',
            "const snapshot = await setLocale('pt', scope)"
        ),
        loadLocale: n(
            'Load messages using the scope options. For explicit active-language switching use setLocale. Check the returned status and error.',
            "const snapshot = await loadLocale('pt', scope)"
        ),
        subscribeIntl: n(
            'Watch snapshots as the runtime changes. The returned cleanup stops updates; call it on teardown.',
            'const unsubscribe = subscribeIntl(snapshot => console.log(snapshot.locale, snapshot.status), scope)\n// Call unsubscribe() on teardown.'
        ),
        destroyIntl: n(
            'Tear down a scope and abort its pending loads. Omitting the argument destroys the module default.',
            'destroyIntl(scope)'
        ),
        resetIntl: n(
            'Clear and destroy the default runtime for the next initializer. Use in tests or application teardown, not a live language switch.',
            'resetIntl()'
        ),
        getLocaleDirection: n(
            'Resolve writing direction for a locale tag. Use this for server output that cannot read document.dir.',
            "console.log(getLocaleDirection('ar'))"
        ),
        getIntlLocaleRuntime: n(
            'Find the mounted provider scope for an element using the nearest matching provider. Returns undefined before registration or mount. This named export does not appear in BFS.INTL.',
            "const locale = getIntlLocaleRuntime(document.querySelector('intl-locale'))\nif (locale) await locale.setLocale('pt')"
        ),
        intlMsg: n(
            'Look up and interpolate a message. Without a matching key returns a configured missing value or the key. For untrusted content display the returned string with textContent.',
            "const label = intlMsg('checkout.title', { name: 'Pat' }, { scope, missing: 'Checkout' })"
        ),
        intlNumber: n(
            'Format a number with native Intl.NumberFormat options. locale selects a formatting locale; scope associates the formatter cache and usually the default language.',
            "console.log(intlNumber(1200, { locale: 'en-US', style: 'currency', currency: 'USD' }))"
        ),
        intlDateTime: n(
            'Format a Date, date string, or millisecond timestamp. Set a zone for reproducible cross-time-zone output and avoid mixing dateStyle or timeStyle with incompatible granular fields.',
            "console.log(intlDateTime('2026-01-01T15:00:00Z', { locale: 'en-US', dateStyle: 'medium', timeZone: 'UTC' }))"
        ),
        intlDuration: n(
            'Format an elapsed duration in milliseconds. Specify fields and display style. The runtime provides fallback formatting where native Intl.DurationFormat is absent.',
            "console.log(intlDuration(5400000, { locale: 'en-US', fields: ['hours', 'minutes'], style: 'short' }))"
        ),
        intlRelTime: n(
            'With unit auto, pass a timestamp in milliseconds. With an explicit unit, pass an amount relative to now (negative for past, positive for future).',
            "console.log(intlRelTime(-2, { locale: 'en-US', unit: 'day', numeric: 'auto' }))"
        ),
        intlList: n(
            'Format an array of strings using Intl.ListFormat. Prefer arrays for items containing multiple words; a string input is split at whitespace.',
            "console.log(intlList(['red apples', 'pears'], { locale: 'en-US', type: 'conjunction' }))"
        ),
        intlName: n(
            'Format a code as a localized display name. Match the code to a native Intl.DisplayNames type.',
            "console.log(intlName('PT', { locale: 'en-US', type: 'region' }))"
        ),
        intlPlural: n(
            'Select supplied text by Intl.PluralRules category or return the category when no text matches. With ordinal, the number is prepended.',
            "console.log(intlPlural(2, { locale: 'en-US', one: 'result', other: 'results' }))"
        ),
        IntlWithListFormat: n(
            'Typed reference to the Intl namespace with an optional ListFormat constructor. Prefer intlList for ordinary formatting.',
            'const listSupported = Boolean(IntlWithListFormat.ListFormat)'
        ),
        listTypeAliases: n(
            'Map convenience names to native list types. Use native type names for browser APIs outside this package.',
            'console.log(listTypeAliases.and)'
        ),
        getRuntime: n(
            'Resolve an explicit or default runtime for formatting. This support helper is npm-only.',
            'const formattingScope = getRuntime(scope)'
        ),
        getLocale: n(
            'Resolve explicit formatter locale before scope locale. Use this helper only when normal formatter options do not suffice.',
            "const locale = getLocale({ locale: 'pt', scope })"
        ),
        stableStringify: n(
            'Serialize values with stable object key ordering for cache keys. Not intended as a persistence format.',
            "const key = stableStringify({ b: 1, a: 'two' })"
        ),
        getCachedFormatter: n(
            'Reuse or create a formatter under a type, locale, options tuple, attached to a runtime scope.',
            "const format = getCachedFormatter('custom-number', 'en-US', {}, scope, () => new Intl.NumberFormat('en-US'))"
        ),
        interpolateMessage: n(
            'Replace {key} placeholders with values. Missing or null values produce empty text. Treat the result as text unless all input is trusted.',
            "console.log(interpolateMessage('Hello, {name}', { name: 'Pat' }))"
        ),
        normalizeDurationFields: n(
            'Select recognized duration fields from an array, whitespace-separated text, or an asterisk.',
            "console.log([...normalizeDurationFields('hours minutes')])"
        ),
        getRelativeUnitAndValue: n(
            'Convert a signed millisecond delta to a selected unit, rounded value, and optional update interval. Use intlRelTime for a final localized label.',
            'console.log(getRelativeUnitAndValue(-300000, 0))'
        ),
        fallbackDurationFormat: n(
            'Format pre-split numeric duration parts where native duration formatting is unavailable. Prefer intlDuration for app output.',
            "console.log(fallbackDurationFormat({ hours: 1, minutes: 30 }, 'short'))"
        ),
    },
    types: {
        IntlRuntimeOptions:
            'Use messages for existing data, loader for custom async resolution, and srcDir for per-locale URL resolution.',
        IntlRuntimeSnapshot:
            'Check status before treating messages as loaded; inspect error on a failed snapshot. Do not mutate caches from snapshots.',
        IntlRuntime:
            'One scope, one active locale. Retain a runtime reference when switching only one subtree.',
        IntlMessages:
            'A nested JSON-like record. Dotted message keys descend through nested properties.',
        MessageValues:
            'Maps placeholder names to interpolation values; it is not the translation dictionary.',
        FormatterOptions:
            'Use scope for app context and locale to intentionally override formatting language.',
    },
    records: {
        'intl-locale': {
            context:
                'A root locale provider mounts the default runtime. A nested provider can create a child scope; changing the child should not replace the parent runtime. Use update-document only once.',
        },
        'format-utils': {
            context:
                'These support exports exist for lower-level integrations. For everyday interfaces prefer the formatter functions, since they handle native defaults and scope options.',
        },
    },
}
