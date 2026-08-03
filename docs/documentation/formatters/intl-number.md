---
name: '{{t.pages.documentation.formatters.intl_number.meta.intlnumber}}'
order: 6.11
title: '{{t.pages.documentation.formatters.intl_number.meta.intlnumber_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.formatters.intl_number.meta.format_decimal_currency_percent_unit_compact_and_rounded_numbers_with_intl_numberformat}}'
layout: document
---

## {{t.pages.documentation.formatters.intl_number.content.intlnumber}}

{{t.pages.documentation.formatters.intl_number.content.intlnumber_value_options_formats_numeric_values_with_locale_aware_number_patterns_use_this_for_p}}

{{t.pages.documentation.formatters.intl_number.content.native_reference_intl_numberformat_https_developer_mozilla_org_en_us_docs_web_javascript_referen}}

## {{t.common.content.signature}}

```ts
function intlNumber(
  value: number,
  options?: Intl.NumberFormatOptions & {
    locale?: string
    scope?: IntlRuntime
  }
): string
```

{{t.common.content.invalid_numbers_return}}

## {{t.common.content.option_map}}

{{t.common.content.option_type_default_effect}}
|---|---|---|---|
{{t.common.content.locale_string_runtime_locale_one_off_locale_override}}
{{t.pages.documentation.formatters.intl_number.content.scope_intlruntime_getintl_use_runtime_locale}}
{{t.pages.documentation.formatters.intl_number.content.style_decimal_currency_percent_unit_decimal_formatter_mode}}
{{t.pages.documentation.formatters.intl_number.content.currency_string_undefined_required_for_style_currency}}
{{t.pages.documentation.formatters.intl_number.content.unit_string_undefined_required_for_style_unit}}
{{t.pages.documentation.formatters.intl_number.content.unitdisplay_short_narrow_long_short_unit_label_size}}
{{t.pages.documentation.formatters.intl_number.content.currencydisplay_symbol_code_name_narrowsymbol_symbol_currency_label_form}}
{{t.pages.documentation.formatters.intl_number.content.signdisplay_auto_always_never_exceptzero_auto_sign_behavior}}
{{t.pages.documentation.formatters.intl_number.content.minimumintegerdigits_number_1_integer_width}}
{{t.pages.documentation.formatters.intl_number.content.minimumfractiondigits_number_locale_default_fraction_floor}}
{{t.pages.documentation.formatters.intl_number.content.maximumfractiondigits_number_locale_default_fraction_cap}}
{{t.pages.documentation.formatters.intl_number.content.minimumsignificantdigits_number_1_min_significant_digits}}
{{t.pages.documentation.formatters.intl_number.content.maximumsignificantdigits_number_locale_default_max_significant_digits}}
{{t.pages.documentation.formatters.intl_number.content.roundingpriority_auto_moreprecision_lessprecision_auto_precision_control}}
{{t.pages.documentation.formatters.intl_number.content.roundingmode_ceil_floor_expand_trunc_halfceil_halffloor_halfexpand_halfeven_locale_default_round}}
{{t.pages.documentation.formatters.intl_number.content.roundingincrement_1_2_5_1_rounding_step}}
{{t.pages.documentation.formatters.intl_number.content.trailingzerodisplay_auto_stripifinteger_auto_strip_trailing_zeros}}
{{t.pages.documentation.formatters.intl_number.content.notation_standard_scientific_engineering_compact_standard_compact_engineering_mode}}
{{t.pages.documentation.formatters.intl_number.content.compactdisplay_short_long_short_compact_output_style}}
{{t.pages.documentation.formatters.intl_number.content.usegrouping_boolean_auto_always_true_group_separator}}
{{t.pages.documentation.formatters.intl_number.content.numberingsystem_string_runtime_default_digit_system}}

## {{t.common.content.examples}}

### {{t.pages.documentation.formatters.intl_number.content.common_modes}}

```ts
intlNumber(1299.99, { locale: 'en-US' }) // "1,299.99"
intlNumber(1299.99, { locale: 'en-US', style: 'currency', currency: 'USD' })
intlNumber(0.42, { style: 'percent' })
intlNumber(1_234_567, { style: 'unit', unit: 'kilometer', unitDisplay: 'long' })
```

### {{t.pages.documentation.formatters.intl_number.content.precision_control}}

```ts
intlNumber(1.2345, {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

intlNumber(1500, { style: 'compact', compactDisplay: 'short' })
intlNumber(0, { notation: 'scientific' })
```

### {{t.pages.documentation.formatters.intl_number.content.signed_values_and_locales}}

```ts
intlNumber(-12, { signDisplay: 'always' })
intlNumber(1_200.5, { locale: 'de-DE', style: 'currency', currency: 'EUR' })
```

### {{t.pages.documentation.formatters.intl_number.content.runtime_specific_usage}}

```ts
import { createIntl, intlNumber } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'ar-EG', messages: {} })

intlNumber(1299.99, { scope: scoped, style: 'currency', currency: 'EGP' })
intlNumber(1299.99, { scope: scoped, currency: 'EGP', style: 'currency' })
```

## {{t.pages.documentation.formatters.intl_number.content.empty_invalid_output}}

```ts
intlNumber(NaN) // ''
intlNumber('12' as unknown as number) // ''
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.formatters.intl_number.content.intl_number_component_reference_documentation_components_intl_number}}
- {{t.pages.documentation.formatters.intl_number.content.intl_numberformat_docs_https_developer_mozilla_org_en_us_docs_web_javascript_reference_global_ob}}
