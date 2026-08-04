---
name: '{{t.pages.documentation.components.intl_number.meta.intl_number}}'
order: 5.3
title: '{{t.pages.documentation.components.intl_number.meta.number_formatter}}'
description: '{{t.pages.documentation.components.intl_number.meta.format_numbers_currencies_percentages_units_compact_notation_digit_ranges_and_numbering_systems}}'
layout: document
---

## {{t.pages.documentation.components.intl_number.content.text}}

{{t.pages.documentation.components.intl_number.content.formats_a_numeric_value_with_intl_numberformat_prefer_child_text_for_simple_values_so_you_keep_r}}

{{t.pages.documentation.components.intl_number.content.native_reference_intl_numberformat_https_developer_mozilla_org_en_us_docs_web_javascript_referen}}

```html
<intl-number>1299.99</intl-number>
```

## {{t.common.content.attributes_and_properties}}

{{t.common.content.attribute_js_property_type_description}}
|---|---|---|---|
{{t.pages.documentation.components.intl_number.content.value_value_number_string_value_to_format_leave_it_out_when_the_number_is_already_in_the_element}}
{{t.pages.documentation.components.intl_number.content.locale_locale_string_override_the_active_runtime_for_this_one_number_only}}
{{t.pages.documentation.components.intl_number.content.type_type_decimal_currency_percent_unit_choose_the_formatter_family_plain_number_money_percentag}}
{{t.pages.documentation.components.intl_number.content.currency_currency_string_iso_4217_currency_code_such_as_usd_eur_or_jpy_required_for_type_currenc}}
{{t.pages.documentation.components.intl_number.content.currency_style_currencystyle_symbol_narrowsymbol_code_name_control_whether_the_currency_shows_as}}
{{t.pages.documentation.components.intl_number.content.currency_sign_currencysign_standard_accounting_use_accounting_style_when_negative_values_should}}
{{t.pages.documentation.components.intl_number.content.unit_unit_string_measurement_unit_identifier_for_type_unit_such_as_kilometer_liter_or_celsius}}
{{t.pages.documentation.components.intl_number.content.unit_style_unitstyle_long_short_narrow_control_how_much_unit_text_is_shown_beside_the_number}}
{{t.pages.documentation.components.intl_number.content.notation_notation_standard_scientific_engineering_compact_pick_the_numeric_notation_that_best_fi}}
{{t.pages.documentation.components.intl_number.content.compact_compact_short_long_choose_the_compact_suffix_style_when_notation_compact}}
{{t.pages.documentation.components.intl_number.content.system_system_string_use_a_different_digit_system_such_as_arabic_indic_digits}}
{{t.pages.documentation.components.intl_number.content.grouping_grouping_boolean_string_turn_thousands_separators_on_off_or_let_the_browser_choose_a_gr}}
{{t.pages.documentation.components.intl_number.content.sign_sign_auto_always_exceptzero_negative_never_decide_when_positive_negative_or_zero_values_sho}}
{{t.pages.documentation.components.intl_number.content.rounding_rounding_string_choose_the_rounding_behavior_for_values_that_do_not_fit_the_requested_p}}
{{t.pages.documentation.components.intl_number.content.rounding_increment_roundingincrement_number_string_round_to_a_fixed_increment_instead_of_a_stand}}
{{t.pages.documentation.components.intl_number.content.rounding_priority_roundingpriority_string_tell_the_formatter_whether_fraction_digits_or_signific}}
{{t.pages.documentation.components.intl_number.content.trailing_zero_trailingzero_string_keep_or_strip_trailing_zeros_when_the_number_is_already_whole}}
{{t.pages.documentation.components.intl_number.content.min_digits_mindigits_number_string_pad_the_integer_part_with_leading_zeros_until_it_reaches_the}}
{{t.pages.documentation.components.intl_number.content.significant_digits_significantdigits_min_max_limit_the_total_number_of_significant_digits}}
{{t.pages.documentation.components.intl_number.content.fractions_fractions_min_max_control_how_many_digits_appear_after_the_decimal_point}}

## {{t.common.content.value}}

{{t.pages.documentation.components.intl_number.content.use_child_text_for_static_values_or_examples_that_should_still_read_well_before_js_runs}}

```html
<intl-number>1299.99</intl-number>
```

{{t.pages.documentation.components.intl_number.content.use_the_property_from_javascript_when_the_number_is_dynamic}}

```html
<intl-number id="cart-total" type="currency" currency="USD">0</intl-number>

<script>
    document.getElementById('cart-total').value = 1299.99
</script>
```

## {{t.common.content.locale}}

{{t.pages.documentation.components.intl_number.content.use_locale_when_a_single_number_needs_a_different_locale_than_the_surrounding_page}}

```html
<intl-number locale="fr-FR">1299.99</intl-number>
<intl-number locale="ar-EG">1299.99</intl-number>
```

## {{t.common.content.type}}

{{t.pages.documentation.components.intl_number.content.type_chooses_the_output_family_the_browser_rules_for_these_styles_come_from_intl_numberformat}}

```html
<intl-number type="decimal">1299.99</intl-number>
<intl-number type="percent">0.42</intl-number>
<intl-number type="currency" currency="USD">1299.99</intl-number>
<intl-number type="unit" unit="kilometer">12</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.currency}}

{{t.pages.documentation.components.intl_number.content.provide_the_iso_4217_code_for_the_money_you_are_formatting_the_locale_and_currency_together_deci}}

```html
<intl-number type="currency" currency="USD">1299.99</intl-number>
<intl-number type="currency" currency="EUR">1299.99</intl-number>
<intl-number type="currency" currency="JPY">1299.99</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.currency_style}}

{{t.pages.documentation.components.intl_number.content.currency_style_controls_how_much_currency_text_appears_next_to_the_amount_use_symbol_for_compact}}

```html
<intl-number type="currency" currency="USD" currency-style="symbol">42</intl-number>
<intl-number type="currency" currency="USD" currency-style="narrowSymbol">42</intl-number>
<intl-number type="currency" currency="USD" currency-style="code">42</intl-number>
<intl-number type="currency" currency="USD" currency-style="name">42</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.currency_sign}}

{{t.pages.documentation.components.intl_number.content.use_currency_sign_accounting_when_negatives_should_look_like_financial_statements_not_raw_math}}

```html
<intl-number type="currency" currency="USD" currency-sign="standard">-42</intl-number>
<intl-number type="currency" currency="USD" currency-sign="accounting">-42</intl-number>
```

## {{t.common.content.unit}}

{{t.pages.documentation.components.intl_number.content.provide_the_measurement_unit_you_want_the_browser_to_localize_such_as_distance_weight_or_tempera}}

```html
<intl-number type="unit" unit="kilometer">12</intl-number>
<intl-number type="unit" unit="liter">2.5</intl-number>
<intl-number type="unit" unit="celsius">21</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.unit_style}}

{{t.pages.documentation.components.intl_number.content.unit_style_controls_the_length_of_the_unit_label_use_narrow_in_dense_layouts_and_long_when_reada}}

```html
<intl-number type="unit" unit="kilometer" unit-style="long">12</intl-number>
<intl-number type="unit" unit="kilometer" unit-style="short">12</intl-number>
<intl-number type="unit" unit="kilometer" unit-style="narrow">12</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.notation}}

{{t.pages.documentation.components.intl_number.content.notation_changes_how_the_browser_writes_the_number_for_human_scanning_use_compact_for_dashboards}}

```html
<intl-number notation="standard">1200000</intl-number>
<intl-number notation="scientific">1200000</intl-number>
<intl-number notation="engineering">1200000</intl-number>
<intl-number notation="compact">1200000</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.compact}}

{{t.pages.documentation.components.intl_number.content.use_compact_with_notation_compact_to_choose_between_short_and_long_shorthand_output_such_as_1_2k}}

```html
<intl-number notation="compact" compact="short">1200000</intl-number>
<intl-number notation="compact" compact="long">1200000</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.system}}

{{t.pages.documentation.components.intl_number.content.system_maps_to_numberingsystem_which_changes_the_digit_set_without_changing_the_locale_itself}}

```html
<intl-number system="latn">123456</intl-number>
<intl-number system="arab">123456</intl-number>
<intl-number system="deva">123456</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.grouping}}

{{t.pages.documentation.components.intl_number.content.grouping_controls_digit_grouping_use_min2_when_you_only_want_separators_on_values_large_enough_t}}

```html
<intl-number grouping="true">1200000</intl-number>
<intl-number grouping="false">1200000</intl-number>
<intl-number grouping="min2">1200000</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.sign}}

{{t.pages.documentation.components.intl_number.content.sign_maps_to_signdisplay_this_matters_when_you_need_to_show_positives_explicitly_or_suppress_sig}}

```html
<intl-number sign="auto">42</intl-number>
<intl-number sign="always">42</intl-number>
<intl-number sign="exceptZero">0</intl-number>
<intl-number sign="negative">-42</intl-number>
<intl-number sign="never">-42</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.rounding}}

{{t.pages.documentation.components.intl_number.content.rounding_maps_to_roundingmode_use_it_when_the_default_browser_rounding_rule_is_not_the_one_your}}

```html
<intl-number rounding="ceil" fractions="0 0">1.2</intl-number>
<intl-number rounding="floor" fractions="0 0">1.8</intl-number>
<intl-number rounding="trunc" fractions="0 0">1.8</intl-number>
<intl-number rounding="halfExpand" fractions="0 0">1.5</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.rounding_increment}}

{{t.pages.documentation.components.intl_number.content.rounding_increment_rounds_to_a_supported_increment_such_as_5_or_25_this_is_useful_for_pricing_in}}

```html
<intl-number rounding-increment="5" fractions="2 2">1.23</intl-number>
<intl-number rounding-increment="25" fractions="2 2">1.37</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.rounding_priority}}

{{t.pages.documentation.components.intl_number.content.use_rounding_priority_when_both_significant_digits_and_fraction_digits_are_configured_this_decid}}

```html
<intl-number
    significant-digits="2 4"
    fractions="0 2"
    rounding-priority="auto"
>
    12345.678
</intl-number>

<intl-number
    significant-digits="2 4"
    fractions="0 2"
    rounding-priority="morePrecision"
>
    12345.678
</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.trailing_zero}}

{{t.pages.documentation.components.intl_number.content.trailing_zero_maps_to_trailingzerodisplay_use_it_to_avoid_showing_useless_0_values_in_summary_ui}}

```html
<intl-number fractions="0 2" trailing-zero="auto">1</intl-number>
<intl-number fractions="0 2" trailing-zero="stripIfInteger">1</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.min_digits}}

{{t.pages.documentation.components.intl_number.content.min_digits_maps_to_minimumintegerdigits_common_use_pad_ids_counters_or_clock_style_values_with_l}}

```html
<intl-number min-digits="2">7</intl-number>
<intl-number min-digits="4">7</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.significant_digits}}

{{t.pages.documentation.components.intl_number.content.significant_digits_accepts_minimum_maximum_use_it_when_you_care_about_total_precision_more_than}}

```html
<intl-number significant-digits="2 4">12345.678</intl-number>
<intl-number significant-digits="3 3">12.345</intl-number>
```

## {{t.pages.documentation.components.intl_number.content.fractions}}

{{t.pages.documentation.components.intl_number.content.fractions_accepts_minimum_maximum_use_it_for_consistent_decimal_precision_in_prices_measurements}}

```html
<intl-number fractions="2 2">1299.9</intl-number>
<intl-number fractions="0 1">1299.95</intl-number>
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.components.intl_number.content.intlnumber_documentation_formatters_intl_number}}
