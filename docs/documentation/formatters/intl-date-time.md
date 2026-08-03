---
name: '{{t.pages.documentation.formatters.intl_date_time.meta.intldatetime}}'
order: 6.12
title: '{{t.pages.documentation.formatters.intl_date_time.meta.intldatetime_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.formatters.intl_date_time.meta.format_date_timestamp_and_iso_string_values_with_intl_datetimeformat}}'
layout: document
---

## {{t.pages.documentation.formatters.intl_date_time.content.intldatetime}}

{{t.pages.documentation.formatters.intl_date_time.content.intldatetime_value_options_formats_a_date_like_value_as_localized_date_time_text_use_this_for_va}}

{{t.pages.documentation.formatters.intl_date_time.content.it_uses_the_same_option_model_as_intl_datetimeformat_https_developer_mozilla_org_en_us_docs_web}}

{{t.pages.documentation.formatters.intl_date_time.content.native_output_context_html_https_developer_mozilla_org_en_us_docs_web_html_reference_elements_ti}}

## {{t.common.content.input_shape}}

{{t.common.content.value_can_be}}

- {{t.pages.documentation.formatters.intl_date_time.content.date}}
- {{t.pages.documentation.formatters.intl_date_time.content.timestamp_number_ms_since_epoch}}
- {{t.pages.documentation.formatters.intl_date_time.content.iso_string_date_2026_01_01t10_00_00z}}

```ts
import { intlDateTime } from '@beforesemicolon/intl'

intlDateTime('2026-01-01T10:00:00Z')
intlDateTime(1704067200000)
intlDateTime(new Date('2026-01-01T10:00:00Z'))
```

## {{t.common.content.signature}}

```ts
function intlDateTime(
  value: string | number | Date,
  options?: Intl.DateTimeFormatOptions & {
    locale?: string
    scope?: IntlRuntime
  }
): string
```

{{t.pages.documentation.formatters.intl_date_time.content.invalid_date_input_returns}}

## {{t.pages.documentation.formatters.intl_date_time.content.important_options}}

{{t.common.content.option_type_default_effect}}
|---|---|---|---|
{{t.pages.documentation.formatters.intl_date_time.content.locale_string_runtime_dom_locale_one_off_locale_override}}
{{t.pages.documentation.formatters.intl_date_time.content.scope_intlruntime_getintl_scope_override_when_using_nested_runtimes}}
{{t.pages.documentation.formatters.intl_date_time.content.datestyle_full_long_medium_short_undefined_preset_date_formatting}}
{{t.pages.documentation.formatters.intl_date_time.content.timestyle_full_long_medium_short_undefined_preset_time_formatting}}
{{t.pages.documentation.formatters.intl_date_time.content.calendar_string_runtime_default_override_calendar}}
{{t.pages.documentation.formatters.intl_date_time.content.numberingsystem_string_runtime_default_override_digit_system}}
{{t.pages.documentation.formatters.intl_date_time.content.timezone_string_runtime_default_iana_zone_like_utc}}
{{t.pages.documentation.formatters.intl_date_time.content.timezonename_long_short_undefined_show_timezone_label}}
{{t.pages.documentation.formatters.intl_date_time.content.hour12_boolean_runtime_default_force_12h_clock}}
{{t.pages.documentation.formatters.intl_date_time.content.hourcycle_h11_h12_h23_h24_runtime_default_alternative_hour_formatting}}
{{t.pages.documentation.formatters.intl_date_time.content.weekday_narrow_short_long_undefined_day_name_output}}
{{t.pages.documentation.formatters.intl_date_time.content.year_numeric_2_digit_undefined_year_part}}
{{t.pages.documentation.formatters.intl_date_time.content.month_numeric_2_digit_narrow_short_long_undefined_month_part}}
{{t.pages.documentation.formatters.intl_date_time.content.day_numeric_2_digit_undefined_day_part}}
{{t.pages.documentation.formatters.intl_date_time.content.hour_numeric_2_digit_undefined_hour_part}}
{{t.pages.documentation.formatters.intl_date_time.content.minute_numeric_2_digit_undefined_minute_part}}
{{t.pages.documentation.formatters.intl_date_time.content.second_numeric_2_digit_undefined_second_part}}
{{t.pages.documentation.formatters.intl_date_time.content.fractionalseconddigits_1_2_3_undefined_fractional_seconds}}
{{t.pages.documentation.formatters.intl_date_time.content.era_narrow_short_long_undefined_era_label}}

## {{t.common.content.examples}}

### {{t.pages.documentation.formatters.intl_date_time.content.presets}}

```ts
intlDateTime(Date.now(), { dateStyle: 'short' })
intlDateTime(Date.now(), { timeStyle: 'medium' })
intlDateTime(Date.now(), { dateStyle: 'long', timeStyle: 'short' })
```

### {{t.pages.documentation.formatters.intl_date_time.content.field_level_formatting}}

```ts
intlDateTime('2026-01-01T10:00:00Z', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
})
```

### {{t.pages.documentation.formatters.intl_date_time.content.locale_and_timezone_variants}}

```ts
intlDateTime('2026-01-01T10:00:00Z', {
    locale: 'en-US',
    timeZone: 'UTC',
    timeStyle: 'short',
})

intlDateTime('2026-01-01T10:00:00Z', {
    locale: 'fr-FR',
    timeZone: 'Europe/Paris',
    timeZoneName: 'short',
})
```

### {{t.pages.documentation.formatters.intl_date_time.content.scope_integration}}

```ts
import { createIntl, intlDateTime } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'en-GB', messages: {} })

intlDateTime('2026-01-01T10:00:00Z', { scope: scoped })
```

### {{t.common.content.empty_output_rules}}

```ts
intlDateTime('bad-date-string') // ''
intlDateTime(NaN as unknown as number) // ''
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.formatters.intl_date_time.content.intl_datetime_component_reference_documentation_components_intl_datetime}}
- {{t.pages.documentation.formatters.intl_date_time.content.intl_datetimeformat_docs_https_developer_mozilla_org_en_us_docs_web_javascript_reference_global}}
