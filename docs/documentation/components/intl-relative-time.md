---
name: '{{t.pages.documentation.components.intl_relative_time.meta.intl_rel_time}}'
order: 5.6
title: '{{t.pages.documentation.components.intl_relative_time.meta.relative_time_formatter}}'
description: '{{t.pages.documentation.components.intl_relative_time.meta.render_relative_timestamps_or_unit_offsets_with_live_updates_and_accessible_labels}}'
layout: document
---

## {{t.pages.documentation.components.intl_relative_time.content.text}}

{{t.pages.documentation.components.intl_relative_time.content.formats_relative_time_with_intl_relativetimeformat_it_renders_a_element_when_unit_auto_can_be_re}}

{{t.pages.documentation.components.intl_relative_time.content.native_reference_intl_relativetimeformat_https_developer_mozilla_org_en_us_docs_web_javascript_r}}

```html
<intl-rel-time live>2026-01-01T00:00:00Z</intl-rel-time>
```

{{t.pages.documentation.components.intl_relative_time.content.the_package_also_registers_as_an_equivalent_element_name}}

## {{t.common.content.attributes_and_properties}}

{{t.common.content.attribute_js_property_type_description}}
|---|---|---|---|
{{t.pages.documentation.components.intl_relative_time.content.value_value_number_string_date_timestamp_or_unit_offset_child_text_is_used_when_omitted}}
{{t.common.content.locale_locale_string_overrides_the_runtime_locale}}
{{t.pages.documentation.components.intl_relative_time.content.unit_unit_auto_or_relative_time_unit_auto_treats_value_as_an_absolute_timestamp_explicit_units_t}}
{{t.pages.documentation.components.intl_relative_time.content.precision_precision_number_string_fraction_precision}}
{{t.pages.documentation.components.intl_relative_time.content.decimals_decimals_boolean_string_convenience_flag_that_sets_precision_to_1_when_precision_is_abs}}
{{t.pages.documentation.components.intl_relative_time.content.numeric_numeric_auto_always_boolean_true_maps_to_always_false_maps_to_auto}}
{{t.pages.documentation.components.intl_relative_time.content.time_style_timestyle_long_short_narrow_output_style}}
{{t.pages.documentation.components.intl_relative_time.content.live_live_boolean_string_re_renders_recent_values_on_an_interval}}

## {{t.common.content.value}}

{{t.pages.documentation.components.intl_relative_time.content.with_the_default_unit_auto_the_value_is_an_absolute_timestamp}}

```html
<intl-rel-time>2026-01-01T00:00:00Z</intl-rel-time>
<intl-rel-time>1767225600000</intl-rel-time>
```

{{t.pages.documentation.components.intl_relative_time.content.use_the_property_from_javascript_when_the_timestamp_is_dynamic}}

```html
<intl-rel-time id="next-refresh" unit="auto">2026-01-01T00:00:00Z</intl-rel-time>

<script>
    document.getElementById('next-refresh').value = Date.now() + 60000
</script>
```

## {{t.common.content.locale}}

{{t.common.content.use_locale_for_a_one_off_override}}

```html
<intl-rel-time locale="en-US" unit="day">-1</intl-rel-time>
<intl-rel-time locale="fr-FR" unit="day">-1</intl-rel-time>
```

## {{t.common.content.unit}}

{{t.pages.documentation.components.intl_relative_time.content.use_unit_auto_for_timestamps_use_an_explicit_unit_when_the_value_is_already_an_offset}}

```html
<intl-rel-time unit="auto">2026-01-01T00:00:00Z</intl-rel-time>
<intl-rel-time unit="day">-2</intl-rel-time>
<intl-rel-time unit="minute">30</intl-rel-time>
<intl-rel-time unit="second">-45</intl-rel-time>
```

{{t.pages.documentation.components.intl_relative_time.content.negative_values_are_in_the_past_positive_values_are_in_the_future}}

## {{t.pages.documentation.components.intl_relative_time.content.precision}}

{{t.pages.documentation.components.intl_relative_time.content.precision_controls_decimal_places_for_relative_values}}

```html
<intl-rel-time unit="hour" precision="0">1.5</intl-rel-time>
<intl-rel-time unit="hour" precision="1">1.5</intl-rel-time>
<intl-rel-time unit="hour" precision="2">1.555</intl-rel-time>
```

## {{t.pages.documentation.components.intl_relative_time.content.decimals}}

{{t.pages.documentation.components.intl_relative_time.content.decimals_is_a_convenience_flag_that_uses_one_decimal_place_when_precision_is_not_set}}

```html
<intl-rel-time unit="hour" decimals>1.5</intl-rel-time>
<intl-rel-time unit="hour" decimals="true">1.5</intl-rel-time>
<intl-rel-time unit="hour" decimals="false">1.5</intl-rel-time>
```

## {{t.pages.documentation.components.intl_relative_time.content.numeric}}

{{t.pages.documentation.components.intl_relative_time.content.numeric_auto_allows_words_such_as_yesterday_when_the_locale_supports_them_numeric_always_keeps_n}}

```html
<intl-rel-time unit="day" numeric="auto">-1</intl-rel-time>
<intl-rel-time unit="day" numeric="always">-1</intl-rel-time>
<intl-rel-time unit="day" numeric="true">-1</intl-rel-time>
<intl-rel-time unit="day" numeric="false">-1</intl-rel-time>
```

## {{t.common.content.time_style}}

{{t.pages.documentation.components.intl_relative_time.content.time_style_controls_output_length}}

```html
<intl-rel-time unit="minute" time-style="long">30</intl-rel-time>
<intl-rel-time unit="minute" time-style="short">30</intl-rel-time>
<intl-rel-time unit="minute" time-style="narrow">30</intl-rel-time>
```

{{t.pages.documentation.components.intl_relative_time.content.for_short_or_narrow_styles_the_component_adds_a_long_form_aria_label_when_it_differs_from_the_vi}}

## {{t.pages.documentation.components.intl_relative_time.content.live}}

{{t.pages.documentation.components.intl_relative_time.content.live_re_renders_recent_timestamp_values_on_an_interval}}

```html
<intl-rel-time live>2026-01-01T00:00:00Z</intl-rel-time>
<intl-rel-time live unit="auto">1767225600000</intl-rel-time>
```

{{t.pages.documentation.components.intl_relative_time.content.use_live_for_changing_values_such_as_just_now_1_minute_ago_or_in_30_seconds_avoid_it_for_old_his}}

## {{t.common.content.see_also}}

- {{t.pages.documentation.components.intl_relative_time.content.intlreltime_documentation_formatters_intl_relative_time}}
