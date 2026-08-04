---
name: '{{t.pages.home.meta.intl}}'
order: 0
title: '{{t.pages.home.meta.intl_by_before_semicolon}}'
description: '{{t.pages.home.meta.drop_in_internationalization_primitives_for_web_components_built_for_readable_composable_runtime}}'
layout: landing
---

::: layout landing-hero version="v0.1.0" title="{{t.pages.home.content.internationalization}}" title2="{{t.pages.home.content.in_plain_html}}" primaryLabel="{{t.common.content.get_started}}" secondaryLabel="$ npm i @beforesemicolon/intl"

=== copy

{{t.pages.home.content.drop_in_localization_primitives_for_web_components_format_messages_numbers_dates_durations_relat}}

=== stat

## 9

{{t.pages.home.content.web_components}}

=== stat

## 1

{{t.pages.home.content.runtime}}

=== stat

## {{t.pages.home.content.intl}}

{{t.pages.home.content.formatters}}

=== code filename=index.html lang=html

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales">
    <h1><intl-msg key="checkout.title">Checkout</intl-msg></h1>

    <p>
        <intl-msg key="checkout.total">Total</intl-msg>:
        <intl-number
            type="currency"
            currency="USD"
        >1299.99</intl-number>
    </p>

    <intl-rel-time live>2026-01-01T00:00:00Z</intl-rel-time>
</intl-locale>
```

:::

::: layout landing-ecosystem

=== header

{{t.pages.home.content.the_ecosystem}}

## {{t.pages.home.content.built_on_web_component_markup}}

{{t.pages.home.content.intl_is_built_on_top_of_web_component_and_markup_same_engine_modular_packages_zero_lock_in}}

=== product title="{{t.pages.home.content.markup}}" package="@beforesemicolon/markup" color=orange icon=reactive href="https://markup.beforesemicolon.com"

{{t.pages.home.content.the_reactive_templating_system_behind_the_before_semicolon_component_stack_tagged_templates_stat}}

=== product title="{{t.pages.home.content.web_component}}" package="@beforesemicolon/web-component" color=cyan icon=webComponents href="https://web-component.beforesemicolon.com"

{{t.pages.home.content.the_custom_element_layer_intl_components_are_built_on_props_state_lifecycle_hooks_scoped_renderi}}

:::

::: layout landing-features

=== header

{{t.pages.home.content.why_intl}}

## {{t.pages.home.content.localize_component_first_interfaces_without_framework_lock_in}}

{{t.pages.home.content.use_declarative_custom_elements_for_markup_heavy_views_and_runtime_aware_formatter_functions_for}}

=== feature icon=reactive

### {{t.pages.home.content.scoped_locale_runtime}}

{{t.pages.home.content.set_locale_and_messages_once_with_switch_language_with_setlocale_and_nest_independent_runtime_sc}}

=== feature icon=terminal

### {{t.pages.home.content.formatter_apis}}

{{t.pages.home.content.call_intlmsg_intlnumber_intldatetime_intlduration_intlreltime_intllist_intlname_and_intlplural_d}}

=== feature icon=webComponents

### {{t.pages.home.content.accessible_output}}

{{t.pages.home.content.components_render_light_dom_text_and_semantic_elements_like_with_language_direction_metadata_app}}

=== feature icon=standards

### {{t.pages.home.content.explicit_component_api}}

{{t.pages.home.content.attributes_map_directly_to_the_underlying_intl_options_keeping_markup_readable_and_predictable_f}}

=== feature icon=plug

### {{t.pages.home.content.component_entrypoints}}

{{t.pages.home.content.import_all_components_from_the_root_package_or_use_per_component_entrypoints_when_you_want_small}}

=== feature icon=surgical

### {{t.pages.home.content.cached_formatter_reuse}}

{{t.pages.home.content.formatter_instances_are_cached_by_locale_and_options_inside_the_active_runtime_scope_avoiding_re}}

:::

::: layout landing-showcase

=== header

{{t.pages.home.content.use_this_today}}

## {{t.pages.home.content.five_practical_localization_examples}}

{{t.pages.home.content.each_example_works_with_the_same_runtime_and_component_model_so_teams_can_mix_markup_and_javascr}}

=== example label="{{t.pages.home.content.currency_formatting}}" color=primary filename=currency.html lang=html

```html
<intl-locale locale="en-US">
    <intl-number
        type="currency"
        currency="USD"
    >1299.99</intl-number>

    <intl-number
        type="currency"
        currency="EUR"
        locale="de-DE"
    >1299.99</intl-number>
</intl-locale>
```

=== example label="{{t.pages.home.content.relative_time_and_date}}" color=green filename=time.html lang=html

```html
<intl-locale locale="en-US">
    <intl-datetime
        date-style="medium"
        time-style="short"
    >2026-06-30T10:15:00Z</intl-datetime>

    <intl-rel-time live>2026-01-01T00:00:00Z</intl-rel-time>
</intl-locale>
```

=== example label="{{t.pages.home.content.plural_and_list}}" color=cyan filename=plural-list.html lang=html

```html
<intl-locale locale="en-US">
    <intl-plural one="item" other="items">2</intl-plural>
    <intl-list type="and">shipping tax discounts</intl-list>
</intl-locale>
```

=== example label="{{t.pages.home.content.language_switcher}}" color=orange filename=language-switcher.html lang=html

```html
<intl-locale id="page-locale" locale="en" src-dir="/locales">
    <select id="language">
        <option value="en">English</option>
        <option value="fr">French</option>
    </select>

    <h1><intl-msg key="hero.title">Welcome</intl-msg></h1>
</intl-locale>

<script>
    language.addEventListener('change', () => {
        pageLocale.runtime.setLocale(language.value)
    })
</script>
```

=== example label="{{t.pages.home.content.full_composition}}" color=primary filename=checkout.html lang=html

```html
<intl-locale locale="en-US" src-dir="/locales">
    <h1><intl-msg key="checkout.title">Checkout</intl-msg></h1>
    <p>
        <intl-msg key="checkout.total">Total</intl-msg>
        <intl-number type="currency" currency="USD">1299.99</intl-number>
    </p>
    <intl-msg key="checkout.items">
        <intl-plural one="item" other="items">2</intl-plural>
    </intl-msg>
</intl-locale>
```

:::

::: layout landing-install

=== header

{{t.pages.home.content.quick_start}}

## {{t.pages.home.content.install_in_seconds}}

{{t.pages.home.content.use_the_package_entrypoint_for_all_components_and_helpers_or_import_individual_component_entrypo}}

=== tab key=cdn label=CDN command="<script src=&quot;https://unpkg.com/@beforesemicolon/intl/dist/client.js&quot;></script>"

=== tab key=npm label=npm command="npm install @beforesemicolon/intl"

=== tab key=yarn label=yarn command="yarn add @beforesemicolon/intl"

=== tab key=pnpm label=pnpm command="pnpm add @beforesemicolon/intl"

:::

::: layout landing-cta

=== copy

## {{t.pages.home.content.build_localized_interfaces_with_web_components}}

{{t.pages.home.content.read_the_docs_for_runtime_setup_formatter_apis_browser_registration_component_props_edge_cases_a}}

=== actions

{{t.pages.home.content.get_started_documentation_get_started_read_the_docs_documentation}}

:::
