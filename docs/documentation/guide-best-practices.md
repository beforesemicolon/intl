---
name: '{{t.pages.documentation.guide_best_practices.meta.guide_best_practices}}'
order: 4
title: '{{t.pages.documentation.guide_best_practices.meta.intl_guide_best_practices_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.guide_best_practices.meta.practical_guidance_for_building_maintainable_html_first_localization_with_before_semicolon_intl}}'
layout: document
---

## {{t.pages.documentation.guide_best_practices.content.guide_best_practices}}

{{t.pages.documentation.guide_best_practices.content.use_this_guide_to_keep_localized_uis_predictable_at_scale_the_package_is_most_effective_when_loc}}

## {{t.pages.documentation.guide_best_practices.content.text_1_start_with_one_top_level}}

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales" update-document>
    <h1><intl-msg key="checkout.title">Checkout</intl-msg></h1>
    <intl-number type="currency" currency="USD">1299.99</intl-number>
</intl-locale>
```

{{t.pages.documentation.guide_best_practices.content.use_one_top_level_provider_for_the_page_when_possible_it_centralizes}}

- {{t.pages.documentation.guide_best_practices.content.message_loading}}
- {{t.pages.documentation.guide_best_practices.content.locale_fallback_behavior}}
- {{t.pages.documentation.guide_best_practices.content.document_direction_updates}}

## {{t.pages.documentation.guide_best_practices.content.text_2_prefer_readable_fallback_text}}

```html
<intl-msg key="cta.primary">Get started</intl-msg>
<intl-number type="currency" currency="USD">1299.99</intl-number>
<intl-datetime date-style="short">2026-01-01T10:00:00Z</intl-datetime>
<intl-list type="and">shipping tax discounts</intl-list>
```

{{t.pages.documentation.guide_best_practices.content.keep_fallback_text_meaningful_it_helps_seo_js_disabled_rendering_and_loading_states}}

## {{t.pages.documentation.guide_best_practices.content.text_3_build_nested_locale_boundaries_intentionally}}

```html
<intl-locale locale="en-US" src-dir="/locales">
    <h1><intl-msg key="product.title">Product</intl-msg></h1>

    <section>
        <intl-locale locale="fr-FR">
            <h2><intl-msg key="product.title">Produit</intl-msg></h2>
        </intl-locale>
    </section>
</intl-locale>
```

{{t.pages.documentation.guide_best_practices.content.nested_scopes_inherit_message_state_from_parent_and_can_override_values_where_needed}}

## {{t.pages.documentation.guide_best_practices.content.text_4_use_api_helpers_where_component_markup_is_not_ideal}}

```ts
import { createIntl, intlMsg, intlNumber, intlDateTime } from '@beforesemicolon/intl'

const preview = createIntl({
  locale: 'ja-JP',
  fallbackLocale: 'en',
  messages: { invoice: { total: 'Total: {amount}' } },
})

intlMsg('invoice.total', { amount: '¥1,000' }, { scope: preview })
intlNumber(1000, { locale: 'ja-JP', style: 'currency', currency: 'JPY' })
intlDateTime('2026-01-01T10:00:00Z', { locale: 'ja-JP', dateStyle: 'full' })
```

{{t.pages.documentation.guide_best_practices.content.use_helpers_for_server_rendered_content_labels_in_background_jobs_and_non_dom_workflows}}

## {{t.pages.documentation.guide_best_practices.content.text_5_language_switching_without_a_page_reload}}

```ts
import { setLocale } from '@beforesemicolon/intl'

const selector = document.querySelector('select#locale')
selector?.addEventListener('change', async (event) => {
  const locale = (event.target as HTMLSelectElement).value
  const snapshot = await setLocale(locale)
  document.documentElement.lang = snapshot.locale
  document.documentElement.dir = snapshot.direction
})
```

{{t.pages.documentation.guide_best_practices.content.language_switching_works_when_components_are_subscribed_to_the_active_runtime}}

## {{t.pages.documentation.guide_best_practices.content.text_6_keep_translation_bundles_small}}

{{t.pages.documentation.guide_best_practices.content.at_build_time_combine_shared_keys_and_page_specific_keys_into_scoped_bundles}}

```text
locales/common.json
locales/landing-page.json
locales/en.landing-page.json
```

{{t.pages.documentation.guide_best_practices.content.use_src_locales_en_landing_page_json_for_the_landing_page_runtime_this_avoids_loading_unrelated}}

## {{t.pages.documentation.guide_best_practices.content.text_7_prefer_seo_safe_content_structure}}

{{t.pages.documentation.guide_best_practices.content.use_clear_visible_text_in_html_and_keep_formatting_decisions_close_to_output}}

```html
<h1><intl-msg key="hero.title">Internationalization in plain HTML.</intl-msg></h1>
<intl-datetime date-style="full" time-style="short">2026-01-01T10:00:00Z</intl-datetime>
```

{{t.pages.documentation.guide_best_practices.content.your_parser_and_crawler_both_benefit_from_predictable_localized_output_in_the_dom}}

## {{t.pages.documentation.guide_best_practices.content.production_checklist}}

- {{t.pages.documentation.guide_best_practices.content.one_explicit_locale_provider_for_each_major_page_boundary}}
- {{t.pages.documentation.guide_best_practices.content.src_for_exact_page_bundles_src_dir_for_broad_locale_bundles}}
- {{t.pages.documentation.guide_best_practices.content.use_child_text_for_simple_values}}
- {{t.pages.documentation.guide_best_practices.content.include_fallback_locale}}
- {{t.pages.documentation.guide_best_practices.content.keep_update_document_only_on_the_top_most_scope}}
- {{t.pages.documentation.guide_best_practices.content.keep_intl_msg_fallback_text_readable}}
