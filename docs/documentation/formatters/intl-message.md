---
name: '{{t.pages.documentation.formatters.intl_message.meta.intlmsg}}'
order: 6.10
title: '{{t.pages.documentation.formatters.intl_message.meta.intlmsg_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.formatters.intl_message.meta.resolve_a_message_key_from_an_intl_runtime_and_interpolate_placeholder_values}}'
layout: document
---

## {{t.pages.documentation.formatters.intl_message.content.intlmsg}}

{{t.pages.documentation.formatters.intl_message.content.intlmsg_key_values_options_resolves_a_message_key_from_runtime_messages_and_returns_a_plain_stri}}

{{t.pages.documentation.formatters.intl_message.content.it_matches_message_behavior_used_by_so_keys_and_placeholders_are_consistent_across_js_components}}

{{t.pages.documentation.formatters.intl_message.content.for_rich_html_output_use_instead_and_keep_html_in_runtime_messages_only_when_trusted}}

## {{t.common.content.signature}}

```ts
function intlMsg(
  key: string,
  values?: Record<string, unknown>,
  options?: {
    scope?: IntlRuntime
    locale?: string
    missing?: string | ((key: string) => string)
  }
): string
```

{{t.pages.documentation.formatters.intl_message.content.key_can_use_dot_notation_checkout_total_for_nested_message_objects}}

## {{t.pages.documentation.formatters.intl_message.content.what_values_means}}

{{t.pages.documentation.formatters.intl_message.content.values_maps_placeholders_to_replacements_in_the_message_template}}

```ts
intlMsg('invoice.total', { amount: '$42.00' }, { scope: runtime })
```

{{t.pages.documentation.formatters.intl_message.content.when_a_placeholder_is_missing_null_undefined_or_omitted_it_renders_as_an_empty_string}}

## {{t.common.content.option_map}}

{{t.common.content.option_type_default_effect}}
|---|---|---|---|
{{t.pages.documentation.formatters.intl_message.content.scope_intlruntime_getintl_use_explicit_runtime_instead_of_default_runtime}}
{{t.pages.documentation.formatters.intl_message.content.locale_string_scope_default_locale_render_with_a_one_off_locale}}
{{t.pages.documentation.formatters.intl_message.content.missing_string_key_string_key_fallback_when_message_is_not_found}}

## {{t.common.content.examples}}

### {{t.pages.documentation.formatters.intl_message.content.basic_message_interpolation}}

```ts
import { createIntl, intlMsg } from '@beforesemicolon/intl'

const runtime = createIntl({
  locale: 'en-US',
  messages: {
    greeting: 'Hello {name}',
    invoice: { total: 'Total: {amount}' },
    items: {
      remaining: 'You have {count} items',
    },
  },
})

intlMsg('greeting', { name: 'Ari' }, { scope: runtime })
intlMsg('items.remaining', { count: 3 }, { scope: runtime })
```

### {{t.pages.documentation.formatters.intl_message.content.nested_key_paths}}

```ts
intlMsg('invoice.total', { amount: '$42.00' }, { scope: runtime })
intlMsg('invoice.total', { amount: '$42.00' }, { locale: 'fr-FR' })
```

### {{t.pages.documentation.formatters.intl_message.content.missing_key_behavior}}

```ts
intlMsg('missing', { name: 'Ari' }, { scope: runtime })
intlMsg('missing', { name: 'Ari' }, { scope: runtime, missing: 'fallback' })
intlMsg('missing', { name: 'Ari' }, {
  scope: runtime,
  missing: (key) => `[${key}]`,
})
```

### {{t.pages.documentation.formatters.intl_message.content.empty_and_invalid_inputs}}

```ts
intlMsg('', { name: 'Ari' }, { scope: runtime }) // ''
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.formatters.intl_message.content.intl_msg_component_reference_documentation_components_intl_msg}}
