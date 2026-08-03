---
name: '{{t.pages.documentation.formatters.intl_relative_time.meta.intlreltime}}'
order: 6.14
title: '{{t.pages.documentation.formatters.intl_relative_time.meta.intlreltime_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.formatters.intl_relative_time.meta.format_relative_timestamps_or_unit_offsets_with_intl_relativetimeformat}}'
layout: document
---

## {{t.pages.documentation.formatters.intl_relative_time.content.intlreltime}}

{{t.pages.documentation.formatters.intl_relative_time.content.intlreltime_value_options_formats_relative_values_for_times_like}}

- {{t.pages.documentation.formatters.intl_relative_time.content.text_0_now_subject_to_locale_rules}}
- {{t.pages.documentation.formatters.intl_relative_time.content.text_1_past}}
- {{t.pages.documentation.formatters.intl_relative_time.content.text_1_future}}

{{t.pages.documentation.formatters.intl_relative_time.content.it_supports}}

- {{t.pages.documentation.formatters.intl_relative_time.content.unit_auto_absolute_timestamp_compared_to_date_now}}
- {{t.pages.documentation.formatters.intl_relative_time.content.explicit_units_year_day_minute_etc}}

{{t.pages.documentation.formatters.intl_relative_time.content.native_reference_intl_relativetimeformat_https_developer_mozilla_org_en_us_docs_web_javascript_r}}

## {{t.common.content.signature}}

```ts
function intlRelTime(
  value: number,
  options?: {
    locale?: string
    scope?: IntlRuntime
    unit?: 'auto' | Intl.RelativeTimeFormatUnit
    precision?: number
    numeric?: 'always' | 'auto'
    style?: 'long' | 'short' | 'narrow'
  }
): string
```

{{t.common.content.invalid_numbers_return}}

## {{t.common.content.option_map}}

{{t.common.content.option_type_default_effect}}
|---|---|---|---|
{{t.common.content.locale_string_runtime_locale_one_off_locale_override}}
{{t.pages.documentation.formatters.intl_relative_time.content.scope_intlruntime_getintl_use_scoped_runtime}}
{{t.pages.documentation.formatters.intl_relative_time.content.unit_auto_intl_relativetimeformatunit_auto_input_interpretation}}
{{t.pages.documentation.formatters.intl_relative_time.content.precision_number_0_decimal_precision_for_computed_deltas}}
{{t.pages.documentation.formatters.intl_relative_time.content.numeric_always_auto_auto_numeric_vs_words_like_yesterday}}
{{t.pages.documentation.formatters.intl_relative_time.content.style_long_short_narrow_long_output_compactness}}

## {{t.common.content.examples}}

### {{t.pages.documentation.formatters.intl_relative_time.content.auto_timestamps}}

```ts
intlRelTime(Date.now() + 60_000, { unit: 'auto' }) // "in 1 minute"
intlRelTime(Date.now() - 60_000, { unit: 'auto' }) // "1 minute ago"
```

### {{t.pages.documentation.formatters.intl_relative_time.content.explicit_unit_offsets}}

```ts
intlRelTime(-2, { unit: 'day' }) // past
intlRelTime(2, { unit: 'day', numeric: 'always' }) // "in 2 days"
intlRelTime(-1, { unit: 'year', locale: 'fr-FR' })
```

### {{t.pages.documentation.formatters.intl_relative_time.content.styles_and_precision}}

```ts
intlRelTime(-30, { unit: 'minute', style: 'short' })
intlRelTime(1.54 * 60 * 60 * 1000, { unit: 'hour', precision: 1 })
intlRelTime(1.2345, { unit: 'second', precision: 2 })
```

### {{t.pages.documentation.formatters.intl_relative_time.content.scoped_runtime_usage}}

```ts
import { createIntl, intlRelTime } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'de-DE', messages: {} })
intlRelTime(Date.now() - 86_400_000, { scope: scoped, unit: 'auto' })
```

## {{t.pages.documentation.formatters.intl_relative_time.content.fallback_and_edge_cases}}

```ts
intlRelTime(Number.NaN) // ''
intlRelTime(1, { unit: 'invalid' as unknown as Intl.RelativeTimeFormatUnit }) // ''
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.formatters.intl_relative_time.content.intl_rel_time_component_reference_documentation_components_intl_relative_time}}
- {{t.pages.documentation.formatters.intl_relative_time.content.intl_relativetimeformat_docs_https_developer_mozilla_org_en_us_docs_web_javascript_reference_glo}}
