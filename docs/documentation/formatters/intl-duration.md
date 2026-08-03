---
name: '{{t.pages.documentation.formatters.intl_duration.meta.intlduration}}'
order: 6.13
title: '{{t.pages.documentation.formatters.intl_duration.meta.intlduration_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.formatters.intl_duration.meta.format_millisecond_durations_into_localized_duration_strings}}'
layout: document
---

## {{t.pages.documentation.formatters.intl_duration.content.intlduration}}

{{t.pages.documentation.formatters.intl_duration.content.intlduration_value_options_converts_milliseconds_to_human_readable_duration_text_use_it_for_time}}

{{t.pages.documentation.formatters.intl_duration.content.it_mirrors_intl_durationformat_https_developer_mozilla_org_en_us_docs_web_javascript_reference_g}}

## {{t.common.content.input_shape}}

{{t.pages.documentation.formatters.intl_duration.content.value_should_be_a_number_in_milliseconds}}

```ts
import { intlDuration } from '@beforesemicolon/intl'

intlDuration(3_661_000)
intlDuration(86_400_000)
```

## {{t.common.content.signature}}

```ts
function intlDuration(
  value: number,
  options?: {
    locale?: string
    scope?: IntlRuntime
    fields?: '*' | string | string[]
    style?: 'long' | 'short' | 'narrow' | 'digital'
  }
): string
```

{{t.common.content.invalid_values_return}}

## {{t.common.content.option_map}}

{{t.common.content.option_type_default_effect}}
|---|---|---|---|
{{t.common.content.locale_string_runtime_locale_one_off_locale_override}}
{{t.pages.documentation.formatters.intl_duration.content.scope_intlruntime_getintl_use_nested_runtime_state}}
{{t.pages.documentation.formatters.intl_duration.content.fields_string_string_hours_minutes_seconds_units_to_include}}
{{t.pages.documentation.formatters.intl_duration.content.style_long_short_narrow_digital_long_output_compactness}}

### {{t.pages.documentation.formatters.intl_duration.content.supported_units}}

{{t.pages.documentation.formatters.intl_duration.content.years_months_weeks_days_hours_minutes_seconds_milliseconds_microseconds_nanoseconds}}

{{t.pages.documentation.formatters.intl_duration.content.singular_unit_names_are_normalized_hour_hours}}

## {{t.common.content.examples}}

### {{t.pages.documentation.formatters.intl_duration.content.field_permutations}}

```ts
intlDuration(90_000, { fields: 'minutes seconds' })
intlDuration(3_600_000, { fields: 'hours' })
intlDuration(86_400_000, { fields: '*' })
intlDuration(3_661_000, { fields: 'hour minute second' }) // normalized to plural
```

### {{t.pages.documentation.formatters.intl_duration.content.style_permutations}}

```ts
intlDuration(3_600_000, { fields: 'hours', style: 'long' })
intlDuration(3_600_000, { fields: 'hours', style: 'short' })
intlDuration(3_600_000, { fields: 'hours', style: 'narrow' })
intlDuration(3_600_000, { fields: 'hours minutes seconds', style: 'digital' })
```

### {{t.pages.documentation.formatters.intl_duration.content.locale_and_scope_overrides}}

```ts
import { createIntl, intlDuration } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'fr-FR', messages: {} })

intlDuration(3661_000, { scope: scoped, locale: 'fr-FR' })
```

### {{t.pages.documentation.formatters.intl_duration.content.empty_input_edge_case}}

```ts
intlDuration(NaN) // ''
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.formatters.intl_duration.content.intl_duration_component_reference_documentation_components_intl_duration}}
- {{t.pages.documentation.formatters.intl_duration.content.intl_durationformat_docs_https_developer_mozilla_org_en_us_docs_web_javascript_reference_global}}
