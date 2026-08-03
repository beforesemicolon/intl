---
name: '{{t.common.content.get_started}}'
order: 2
title: '{{t.pages.documentation.get_started.meta.get_started_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.get_started.meta.build_your_first_multilingual_ui_with_one_runtime_scope_and_reusable_formatters}}'
layout: document
---

## {{t.pages.documentation.get_started.content.get_started}}

{{t.pages.documentation.get_started.content.use_this_page_to_get_a_working_localized_ui_quickly_start_with_a_runtime_scope_then_add_tags_and}}

## {{t.pages.documentation.get_started.content.step_1_initialize_a_locale_scope}}

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales" update-document>
    <header>
        <intl-msg key="header.title">Product</intl-msg>
        <intl-number type="currency" currency="USD">1299.99</intl-number>
    </header>
</intl-locale>
```

{{t.pages.documentation.get_started.content.this_creates_one_locale_runtime_boundary_and_loads_translation_files_from_locales_en_us_json}}

## {{t.pages.documentation.get_started.content.step_2_render_translated_text}}

```html
<intl-msg key="product.name">Default product name</intl-msg>
```

{{t.pages.documentation.get_started.content.first_renders_its_tag_content_then_replaces_it_when_message_lookup_is_available}}

## {{t.pages.documentation.get_started.content.step_3_add_rich_formatting}}

```html
<intl-datetime date-style="long">2026-01-01T10:00:00Z</intl-datetime>
<intl-list type="conjunction">shipping tax discounts</intl-list>
<intl-rel-time live>2026-01-01T00:00:00Z</intl-rel-time>
```

## {{t.pages.documentation.get_started.content.step_4_run_from_code_when_you_need_runtime_logic}}

```ts
import { initIntl, intlPlural, createIntl } from '@beforesemicolon/intl'

const runtime = initIntl({
    locale: 'en-US',
    fallbackLocale: 'en',
    messages: {
        inbox: {
            title: '{value} messages',
        },
    },
})

runtime.getMessage('inbox.title') // direct message read
intlPlural(3, {
    type: 'cardinal',
    one: 'item',
    other: 'items',
    locale: 'en-US',
})
```

## {{t.pages.documentation.get_started.content.step_5_use_nested_scopes_for_sections}}

```html
<intl-locale locale="en-US">
    <intl-msg key="global.cta">Get started</intl-msg>

    <intl-locale locale="fr-FR">
        <intl-msg key="global.cta">Commencer</intl-msg>
    </intl-locale>
</intl-locale>
```

## {{t.pages.documentation.get_started.content.next_step}}

{{t.pages.documentation.get_started.content.if_this_works_move_on_to}}

- {{t.common.content.guide_best_practices_guide_best_practices}}
- {{t.common.content.components_components_intl_locale}}
- {{t.pages.documentation.get_started.content.runtime_apis_apis_create_intl}}
