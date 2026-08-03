---
name: '{{t.pages.documentation.components.intl_datetime.meta.intl_datetime}}'
order: 5.4
title: '{{t.pages.documentation.components.intl_datetime.meta.date_time_formatter}}'
description: '{{t.pages.documentation.components.intl_datetime.meta.format_date_timestamp_and_date_string_values_with_intl_datetimeformat_options}}'
layout: document
---

## {{t.pages.documentation.components.intl_datetime.content.text}}

{{t.pages.documentation.components.intl_datetime.content.formats_a_date_value_and_renders_a_element_with_a_machine_readable_datetime_attribute}}

{{t.pages.documentation.components.intl_datetime.content.native_references_intl_datetimeformat_https_developer_mozilla_org_en_us_docs_web_javascript_refe}}

```html
<intl-datetime date-style="full">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.common.content.attributes_and_properties}}

{{t.common.content.attribute_js_property_type_description}}
|---|---|---|---|
{{t.pages.documentation.components.intl_datetime.content.value_value_string_number_date_date_value_child_text_is_used_when_omitted}}
{{t.common.content.locale_locale_string_overrides_the_runtime_locale}}
{{t.pages.documentation.components.intl_datetime.content.date_style_datestyle_full_long_medium_short_date_style_shortcut}}
{{t.pages.documentation.components.intl_datetime.content.time_style_timestyle_full_long_medium_short_time_style_shortcut}}
{{t.pages.documentation.components.intl_datetime.content.time_zone_timezone_string_iana_time_zone_such_as_utc_or_america_new_york}}
{{t.pages.documentation.components.intl_datetime.content.time_zone_name_timezonename_string_time_zone_label_style}}
{{t.pages.documentation.components.intl_datetime.content.calendar_calendar_string_calendar_identifier}}
{{t.pages.documentation.components.intl_datetime.content.hour_cycle_hourcycle_string_hour_cycle_such_as_h12_h23}}
{{t.pages.documentation.components.intl_datetime.content.hour12_hour12_boolean_string_forces_12_hour_or_24_hour_output}}
{{t.pages.documentation.components.intl_datetime.content.weekday_weekday_string_weekday_field_style}}
{{t.pages.documentation.components.intl_datetime.content.era_era_string_era_field_style}}
{{t.pages.documentation.components.intl_datetime.content.year_year_string_year_field_style}}
{{t.pages.documentation.components.intl_datetime.content.month_month_string_month_field_style}}
{{t.pages.documentation.components.intl_datetime.content.day_day_string_day_field_style}}
{{t.pages.documentation.components.intl_datetime.content.day_period_dayperiod_string_day_period_field_style}}
{{t.pages.documentation.components.intl_datetime.content.hour_hour_string_hour_field_style}}
{{t.pages.documentation.components.intl_datetime.content.minute_minute_string_minute_field_style}}
{{t.pages.documentation.components.intl_datetime.content.second_second_string_second_field_style}}

{{t.pages.documentation.components.intl_datetime.content.when_date_style_or_time_style_is_set_field_level_options_such_as_weekday_year_and_hour_are_not_a}}

## {{t.common.content.value}}

{{t.pages.documentation.components.intl_datetime.content.use_child_text_for_static_dates}}

```html
<intl-datetime>2026-01-01T10:00:00Z</intl-datetime>
```

{{t.pages.documentation.components.intl_datetime.content.use_the_property_from_javascript_when_the_value_is_dynamic}}

```html
<intl-datetime id="last-updated" date-style="medium">2026-01-01</intl-datetime>

<script>
    document.getElementById('last-updated').value = new Date()
</script>
```

## {{t.common.content.locale}}

{{t.common.content.use_locale_for_a_one_off_override}}

```html
<intl-datetime locale="en-US" date-style="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime locale="fr-FR" date-style="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime locale="ja-JP" date-style="long">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.date_style}}

{{t.pages.documentation.components.intl_datetime.content.date_style_provides_browser_defined_date_presets}}

```html
<intl-datetime date-style="full">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime date-style="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime date-style="medium">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime date-style="short">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.common.content.time_style}}

{{t.pages.documentation.components.intl_datetime.content.time_style_provides_browser_defined_time_presets}}

```html
<intl-datetime time-style="full">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime time-style="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime time-style="medium">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime time-style="short">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.time_zone}}

{{t.pages.documentation.components.intl_datetime.content.time_zone_controls_which_time_zone_the_date_is_rendered_in}}

```html
<intl-datetime time-style="short" time-zone="UTC">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime time-style="short" time-zone="America/New_York">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime time-style="short" time-zone="Asia/Tokyo">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.time_zone_name}}

{{t.pages.documentation.components.intl_datetime.content.use_time_zone_name_when_the_rendered_text_should_include_the_zone_label}}

```html
<intl-datetime hour="numeric" time-zone="UTC" time-zone-name="short">
    2026-01-01T10:00:00Z
</intl-datetime>

<intl-datetime hour="numeric" time-zone="UTC" time-zone-name="long">
    2026-01-01T10:00:00Z
</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.calendar}}

{{t.pages.documentation.components.intl_datetime.content.calendar_requests_a_calendar_system_supported_by_the_browser}}

```html
<intl-datetime calendar="gregory" date-style="full">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime calendar="buddhist" date-style="full">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime calendar="japanese" date-style="full">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.hour_cycle}}

{{t.pages.documentation.components.intl_datetime.content.hour_cycle_requests_a_specific_clock_cycle}}

```html
<intl-datetime hour="numeric" minute="2-digit" hour-cycle="h12">
    2026-01-01T22:30:00Z
</intl-datetime>

<intl-datetime hour="numeric" minute="2-digit" hour-cycle="h23">
    2026-01-01T22:30:00Z
</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.hour12}}

{{t.pages.documentation.components.intl_datetime.content.hour12_forces_12_hour_or_24_hour_output}}

```html
<intl-datetime hour="numeric" minute="2-digit" hour12="true">
    2026-01-01T22:30:00Z
</intl-datetime>

<intl-datetime hour="numeric" minute="2-digit" hour12="false">
    2026-01-01T22:30:00Z
</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.weekday}}

{{t.pages.documentation.components.intl_datetime.content.weekday_controls_the_weekday_field}}

```html
<intl-datetime weekday="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime weekday="short">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime weekday="narrow">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.era}}

{{t.pages.documentation.components.intl_datetime.content.era_controls_the_era_field}}

```html
<intl-datetime era="long" year="numeric">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime era="short" year="numeric">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime era="narrow" year="numeric">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.year}}

{{t.pages.documentation.components.intl_datetime.content.year_controls_the_year_field}}

```html
<intl-datetime year="numeric">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime year="2-digit">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.month}}

{{t.pages.documentation.components.intl_datetime.content.month_controls_the_month_field}}

```html
<intl-datetime month="numeric">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime month="2-digit">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime month="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime month="short">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime month="narrow">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.day}}

{{t.pages.documentation.components.intl_datetime.content.day_controls_the_day_field}}

```html
<intl-datetime day="numeric">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime day="2-digit">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.day_period}}

{{t.pages.documentation.components.intl_datetime.content.day_period_controls_localized_day_period_labels_in_browsers_that_support_it}}

```html
<intl-datetime hour="numeric" day-period="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime hour="numeric" day-period="short">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime hour="numeric" day-period="narrow">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.hour}}

{{t.pages.documentation.components.intl_datetime.content.hour_controls_the_hour_field}}

```html
<intl-datetime hour="numeric">2026-01-01T10:00:00Z</intl-datetime>
<intl-datetime hour="2-digit">2026-01-01T10:00:00Z</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.minute}}

{{t.pages.documentation.components.intl_datetime.content.minute_controls_the_minute_field}}

```html
<intl-datetime hour="numeric" minute="numeric">2026-01-01T10:05:00Z</intl-datetime>
<intl-datetime hour="numeric" minute="2-digit">2026-01-01T10:05:00Z</intl-datetime>
```

## {{t.pages.documentation.components.intl_datetime.content.second}}

{{t.pages.documentation.components.intl_datetime.content.second_controls_the_second_field}}

```html
<intl-datetime hour="numeric" minute="2-digit" second="numeric">
    2026-01-01T10:05:09Z
</intl-datetime>

<intl-datetime hour="numeric" minute="2-digit" second="2-digit">
    2026-01-01T10:05:09Z
</intl-datetime>
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.components.intl_datetime.content.intldatetime_documentation_formatters_intl_date_time}}
