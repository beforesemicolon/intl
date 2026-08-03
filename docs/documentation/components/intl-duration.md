---
name: '{{t.pages.documentation.components.intl_duration.meta.intl_duration}}'
order: 5.5
title: '{{t.pages.documentation.components.intl_duration.meta.duration_formatter}}'
description: '{{t.pages.documentation.components.intl_duration.meta.format_millisecond_durations_with_selected_fields_and_long_short_narrow_or_digital_styles}}'
layout: document
---

## {{t.pages.documentation.components.intl_duration.content.text}}

{{t.pages.documentation.components.intl_duration.content.formats_a_millisecond_duration_and_breaks_the_value_into_duration_fields_it_uses_intl_durationfo}}

{{t.pages.documentation.components.intl_duration.content.native_reference_intl_durationformat_https_developer_mozilla_org_en_us_docs_web_javascript_refer}}

```html
<intl-duration fields="hours minutes seconds">3661000</intl-duration>
```

## {{t.common.content.attributes_and_properties}}

{{t.common.content.attribute_js_property_type_description}}
|---|---|---|---|
{{t.pages.documentation.components.intl_duration.content.value_value_number_string_milliseconds_to_format_child_text_is_used_when_omitted}}
{{t.common.content.locale_locale_string_overrides_the_runtime_locale}}
{{t.pages.documentation.components.intl_duration.content.time_style_timestyle_long_short_narrow_digital_output_style}}
{{t.pages.documentation.components.intl_duration.content.fields_fields_or_space_separated_units_units_to_include}}

{{t.pages.documentation.components.intl_duration.content.valid_fields_are_years_months_weeks_days_hours_minutes_seconds_milliseconds_microseconds_and_nan}}

## {{t.common.content.value}}

{{t.pages.documentation.components.intl_duration.content.use_child_text_for_static_durations}}

```html
<intl-duration fields="minutes seconds">90061</intl-duration>
```

{{t.pages.documentation.components.intl_duration.content.use_the_property_from_javascript_for_dynamic_values}}

```html
<intl-duration id="elapsed" fields="hours minutes seconds">0</intl-duration>

<script>
    document.getElementById('elapsed').value = 3661000
</script>
```

## {{t.common.content.locale}}

{{t.common.content.use_locale_for_a_one_off_override}}

```html
<intl-duration locale="en-US" fields="hours minutes">3661000</intl-duration>
<intl-duration locale="fr-FR" fields="hours minutes">3661000</intl-duration>
```

## {{t.common.content.time_style}}

{{t.pages.documentation.components.intl_duration.content.time_style_controls_duration_output_length}}

```html
<intl-duration fields="hours minutes" time-style="long">3661000</intl-duration>
<intl-duration fields="hours minutes" time-style="short">3661000</intl-duration>
<intl-duration fields="hours minutes" time-style="narrow">3661000</intl-duration>
<intl-duration fields="hours minutes seconds" time-style="digital">3661000</intl-duration>
```

{{t.pages.documentation.components.intl_duration.content.for_non_long_styles_the_component_adds_a_long_form_aria_label_when_the_accessible_label_differs}}

## {{t.pages.documentation.components.intl_duration.content.fields}}

{{t.pages.documentation.components.intl_duration.content.use_fields_to_choose_which_units_are_included}}

```html
<intl-duration fields="minutes seconds">90061</intl-duration>
<intl-duration fields="hours">3600000</intl-duration>
<intl-duration fields="days hours minutes">90061000</intl-duration>
<intl-duration fields="*">90061000</intl-duration>
```

{{t.pages.documentation.components.intl_duration.content.singular_names_normalize_to_plural_names}}

```html
<intl-duration fields="hour minute second">3661000</intl-duration>
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.components.intl_duration.content.intlduration_documentation_formatters_intl_duration}}
