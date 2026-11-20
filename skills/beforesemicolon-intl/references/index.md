# Intl offline reference

Complete public surface for `@beforesemicolon/intl@0.5.0`. No web access required. These pages are generated from the same verified release records as the package index. Browse a section or search the symbol list.

[Practical workflows](workflows.md) · [Runnable offline examples](../examples/README.md) · [Skill entry](../SKILL.md)

## Record pages

- [intl-locale](apis/intl-locale.md): Load messages and provide the active locale to descendants.
- [intl-msg](apis/intl-msg.md): Resolve a localized message key and interpolate values.
- [intl-number](apis/intl-number.md): Format a number, currency, percent, or unit.
- [intl-datetime](apis/intl-datetime.md): Format a date or time with an optional zone.
- [intl-duration](apis/intl-duration.md): Format a duration from milliseconds.
- [intl-rel-time](apis/intl-rel-time.md): Format a time relative to now, with optional live updates.
- [intl-relative-time](apis/intl-relative-time.md): Legacy alias for intl-rel-time; prefer the shorter tag.
- [intl-list](apis/intl-list.md): Format a localized list with conjunction, disjunction, or unit style.
- [intl-name](apis/intl-name.md): Display a localized name for a region, language, or currency code.
- [intl-plural](apis/intl-plural.md): Choose localized text by plural category.
- [createIntl / initIntl / setLocale](apis/runtime.md): Create a scoped locale runtime, load messages, or change the current language.
- [intlMsg / intlNumber / intlDateTime and formatters](apis/formatters.md): Format locale-aware values without coupling output to custom elements.
- [Formatter support utilities](apis/format-utils.md): Related utility exports for existing low-level code using the formatter module.
- [getIntlLocaleRuntime](apis/provider-runtime.md): Find the mounted locale scope for an element.

## Symbol locator

- [`createIntl`](apis/runtime.md)
- [`destroyIntl`](apis/runtime.md)
- [`DurationFormatOptions`](apis/formatters.md)
- [`DurationParts`](apis/formatters.md)
- [`fallbackDurationFormat`](apis/format-utils.md)
- [`FormatterOptions`](apis/formatters.md)
- [`getCachedFormatter`](apis/format-utils.md)
- [`getIntl`](apis/runtime.md)
- [`getIntlLocaleRuntime`](apis/provider-runtime.md)
- [`getLocale`](apis/format-utils.md)
- [`getLocaleDirection`](apis/runtime.md)
- [`getRelativeUnitAndValue`](apis/format-utils.md)
- [`getRuntime`](apis/format-utils.md)
- [`initIntl`](apis/runtime.md)
- [`interpolateMessage`](apis/format-utils.md)
- [`intlDateTime`](apis/formatters.md)
- [`IntlDatetimeProps`](apis/intl-datetime.md)
- [`IntlDirection`](apis/runtime.md)
- [`intlDuration`](apis/formatters.md)
- [`IntlDurationProps`](apis/intl-duration.md)
- [`intlList`](apis/formatters.md)
- [`IntlListProps`](apis/intl-list.md)
- [`IntlMessages`](apis/runtime.md)
- [`intlMsg`](apis/formatters.md)
- [`intlName`](apis/formatters.md)
- [`IntlNameProps`](apis/intl-name.md)
- [`intlNumber`](apis/formatters.md)
- [`IntlNumberProps`](apis/intl-number.md)
- [`intlPlural`](apis/formatters.md)
- [`IntlPluralProps`](apis/intl-plural.md)
- [`intlRelTime`](apis/formatters.md)
- [`IntlRelTimeProps`](apis/intl-rel-time.md)
- [`IntlRuntime`](apis/runtime.md)
- [`IntlRuntimeListener`](apis/runtime.md)
- [`IntlRuntimeOptions`](apis/runtime.md)
- [`IntlRuntimeSnapshot`](apis/runtime.md)
- [`IntlRuntimeStatus`](apis/runtime.md)
- [`IntlWithListFormat`](apis/format-utils.md)
- [`ListFormatOptions`](apis/formatters.md)
- [`ListFormatStyle`](apis/formatters.md)
- [`ListFormatType`](apis/formatters.md)
- [`listTypeAliases`](apis/format-utils.md)
- [`loadLocale`](apis/runtime.md)
- [`MessageFormatOptions`](apis/formatters.md)
- [`MessageValues`](apis/formatters.md)
- [`normalizeDurationFields`](apis/format-utils.md)
- [`PluralFormatOptions`](apis/formatters.md)
- [`RelativeTimeFormatOptions`](apis/formatters.md)
- [`resetIntl`](apis/runtime.md)
- [`setLocale`](apis/runtime.md)
- [`stableStringify`](apis/format-utils.md)
- [`subscribeIntl`](apis/runtime.md)

## Public npm entry points

### `@beforesemicolon/intl`

**Values:** [`IntlWithListFormat`](apis/format-utils.md), [`createIntl`](apis/runtime.md), [`destroyIntl`](apis/runtime.md), [`fallbackDurationFormat`](apis/format-utils.md), [`getCachedFormatter`](apis/format-utils.md), [`getIntl`](apis/runtime.md), [`getIntlLocaleRuntime`](apis/provider-runtime.md), [`getLocale`](apis/format-utils.md), [`getLocaleDirection`](apis/runtime.md), [`getRelativeUnitAndValue`](apis/format-utils.md), [`getRuntime`](apis/format-utils.md), [`initIntl`](apis/runtime.md), [`interpolateMessage`](apis/format-utils.md), [`intlDateTime`](apis/formatters.md), [`intlDuration`](apis/formatters.md), [`intlList`](apis/formatters.md), [`intlMsg`](apis/formatters.md), [`intlName`](apis/formatters.md), [`intlNumber`](apis/formatters.md), [`intlPlural`](apis/formatters.md), [`intlRelTime`](apis/formatters.md), [`listTypeAliases`](apis/format-utils.md), [`loadLocale`](apis/runtime.md), [`normalizeDurationFields`](apis/format-utils.md), [`resetIntl`](apis/runtime.md), [`setLocale`](apis/runtime.md), [`stableStringify`](apis/format-utils.md), [`subscribeIntl`](apis/runtime.md)

**Types:** [`DurationFormatOptions`](apis/formatters.md), [`DurationParts`](apis/formatters.md), [`FormatterOptions`](apis/formatters.md), [`IntlDatetimeProps`](apis/intl-datetime.md), [`IntlDirection`](apis/runtime.md), [`IntlDurationProps`](apis/intl-duration.md), [`IntlListProps`](apis/intl-list.md), [`IntlMessages`](apis/runtime.md), [`IntlNameProps`](apis/intl-name.md), [`IntlNumberProps`](apis/intl-number.md), [`IntlPluralProps`](apis/intl-plural.md), [`IntlRelTimeProps`](apis/intl-rel-time.md), [`IntlRuntime`](apis/runtime.md), [`IntlRuntimeListener`](apis/runtime.md), [`IntlRuntimeOptions`](apis/runtime.md), [`IntlRuntimeSnapshot`](apis/runtime.md), [`IntlRuntimeStatus`](apis/runtime.md), [`ListFormatOptions`](apis/formatters.md), [`ListFormatStyle`](apis/formatters.md), [`ListFormatType`](apis/formatters.md), [`MessageFormatOptions`](apis/formatters.md), [`MessageValues`](apis/formatters.md), [`PluralFormatOptions`](apis/formatters.md), [`RelativeTimeFormatOptions`](apis/formatters.md)

### `@beforesemicolon/intl/runtime`

**Values:** [`createIntl`](apis/runtime.md), [`destroyIntl`](apis/runtime.md), [`getIntl`](apis/runtime.md), [`getLocaleDirection`](apis/runtime.md), [`initIntl`](apis/runtime.md), [`loadLocale`](apis/runtime.md), [`resetIntl`](apis/runtime.md), [`setLocale`](apis/runtime.md), [`subscribeIntl`](apis/runtime.md)

**Types:** [`IntlDirection`](apis/runtime.md), [`IntlMessages`](apis/runtime.md), [`IntlRuntime`](apis/runtime.md), [`IntlRuntimeListener`](apis/runtime.md), [`IntlRuntimeOptions`](apis/runtime.md), [`IntlRuntimeSnapshot`](apis/runtime.md), [`IntlRuntimeStatus`](apis/runtime.md)

### `@beforesemicolon/intl/formatters`

**Values:** [`IntlWithListFormat`](apis/format-utils.md), [`fallbackDurationFormat`](apis/format-utils.md), [`getCachedFormatter`](apis/format-utils.md), [`getLocale`](apis/format-utils.md), [`getRelativeUnitAndValue`](apis/format-utils.md), [`getRuntime`](apis/format-utils.md), [`interpolateMessage`](apis/format-utils.md), [`intlDateTime`](apis/formatters.md), [`intlDuration`](apis/formatters.md), [`intlList`](apis/formatters.md), [`intlMsg`](apis/formatters.md), [`intlName`](apis/formatters.md), [`intlNumber`](apis/formatters.md), [`intlPlural`](apis/formatters.md), [`intlRelTime`](apis/formatters.md), [`listTypeAliases`](apis/format-utils.md), [`normalizeDurationFields`](apis/format-utils.md), [`stableStringify`](apis/format-utils.md)

**Types:** [`DurationFormatOptions`](apis/formatters.md), [`DurationParts`](apis/formatters.md), [`FormatterOptions`](apis/formatters.md), [`ListFormatOptions`](apis/formatters.md), [`ListFormatStyle`](apis/formatters.md), [`ListFormatType`](apis/formatters.md), [`MessageFormatOptions`](apis/formatters.md), [`MessageValues`](apis/formatters.md), [`PluralFormatOptions`](apis/formatters.md), [`RelativeTimeFormatOptions`](apis/formatters.md)

### `@beforesemicolon/intl/components/intl-locale`

**Values:** [`default`](apis/intl-locale.md), [`getIntlLocaleRuntime`](apis/provider-runtime.md)

### `@beforesemicolon/intl/components/intl-msg`

**Values:** [`default`](apis/intl-msg.md)

### `@beforesemicolon/intl/components/intl-number`

**Values:** [`default`](apis/intl-number.md)

**Types:** [`IntlNumberProps`](apis/intl-number.md)

### `@beforesemicolon/intl/components/intl-datetime`

**Values:** [`default`](apis/intl-datetime.md)

**Types:** [`IntlDatetimeProps`](apis/intl-datetime.md)

### `@beforesemicolon/intl/components/intl-duration`

**Values:** [`default`](apis/intl-duration.md)

**Types:** [`IntlDurationProps`](apis/intl-duration.md)

### `@beforesemicolon/intl/components/intl-rel-time`

**Values:** [`default`](apis/intl-rel-time.md)

**Types:** [`IntlRelTimeProps`](apis/intl-rel-time.md)

### `@beforesemicolon/intl/components/intl-list`

**Values:** [`default`](apis/intl-list.md)

**Types:** [`IntlListProps`](apis/intl-list.md)

### `@beforesemicolon/intl/components/intl-name`

**Values:** [`default`](apis/intl-name.md)

**Types:** [`IntlNameProps`](apis/intl-name.md)

### `@beforesemicolon/intl/components/intl-plural`

**Values:** [`default`](apis/intl-plural.md)

**Types:** [`IntlPluralProps`](apis/intl-plural.md)

## Classic browser script order

- `https://cdn.jsdelivr.net/npm/@beforesemicolon/web-component@1.22.0/dist/client.js`
- `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/dist/client.js`

## Classic browser global members

- [`BFS.INTL.createIntl`](apis/runtime.md)
- [`BFS.INTL.destroyIntl`](apis/runtime.md)
- [`BFS.INTL.getIntl`](apis/runtime.md)
- [`BFS.INTL.getLocaleDirection`](apis/runtime.md)
- [`BFS.INTL.initIntl`](apis/runtime.md)
- [`BFS.INTL.intlDateTime`](apis/formatters.md)
- [`BFS.INTL.intlDuration`](apis/formatters.md)
- [`BFS.INTL.intlList`](apis/formatters.md)
- [`BFS.INTL.intlMsg`](apis/formatters.md)
- [`BFS.INTL.intlName`](apis/formatters.md)
- [`BFS.INTL.intlNumber`](apis/formatters.md)
- [`BFS.INTL.intlPlural`](apis/formatters.md)
- [`BFS.INTL.intlRelTime`](apis/formatters.md)
- [`BFS.INTL.loadLocale`](apis/runtime.md)
- [`BFS.INTL.resetIntl`](apis/runtime.md)
- [`BFS.INTL.setLocale`](apis/runtime.md)
- [`BFS.INTL.subscribeIntl`](apis/runtime.md)
