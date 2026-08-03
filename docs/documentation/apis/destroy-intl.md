---
name: '{{t.pages.documentation.apis.destroy_intl.meta.destroyintl}}'
order: 7.07
title: '{{t.pages.documentation.apis.destroy_intl.meta.destroyintl_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.apis.destroy_intl.meta.destroy_the_default_or_scoped_intl_runtime_and_clear_subscriptions_caches_and_pending_loads}}'
layout: document
---

## {{t.pages.documentation.apis.destroy_intl.content.destroyintl}}

{{t.pages.documentation.apis.destroy_intl.content.destroyintl_scope_disposes_runtime_resources}}

{{t.pages.documentation.apis.destroy_intl.content.use_this_for_component_page_teardown_in_long_lived_single_page_contexts}}

```ts
import { createIntl, destroyIntl } from '@beforesemicolon/intl'

const preview = createIntl({ locale: 'en-US' })
destroyIntl(preview)
```

## {{t.common.content.signature}}

```ts
function destroyIntl(scope?: IntlRuntime): void
```

## {{t.pages.documentation.apis.destroy_intl.content.what_it_does}}

- {{t.pages.documentation.apis.destroy_intl.content.cancels_pending_loads_via_abortcontroller}}
- {{t.pages.documentation.apis.destroy_intl.content.clears_listeners_loading_maps_and_runtime_caches}}
- {{t.pages.documentation.apis.destroy_intl.content.clears_loaded_locale_maps}}
- {{t.pages.documentation.apis.destroy_intl.content.marks_runtime_as_destroyed}}

{{t.pages.documentation.apis.destroy_intl.content.if_no_scope_is_passed_it_disposes_the_package_default_runtime_only_when_it_is_the_current_defaul}}

```ts
import { destroyIntl } from '@beforesemicolon/intl'

destroyIntl() // remove package default runtime
```

## {{t.pages.documentation.apis.destroy_intl.content.teardown_patterns}}

### {{t.pages.documentation.apis.destroy_intl.content.scoped_runtime}}

{{t.pages.documentation.apis.destroy_intl.content.use_with_modals_widgets_and_editors_that_own_their_own_localization_context}}

```ts
const sidePanelRuntime = createIntl({ locale: 'en-US', messages: { ok: 'OK' } })
// ... modal closes
destroyIntl(sidePanelRuntime)
```

### {{t.pages.documentation.apis.destroy_intl.content.default_runtime}}

{{t.pages.documentation.apis.destroy_intl.content.use_during_app_level_unmount_or_full_page_reload_flows}}

```ts
window.addEventListener('beforeunload', () => destroyIntl())
```

## {{t.pages.documentation.apis.destroy_intl.content.what_it_is_not}}

{{t.pages.documentation.apis.destroy_intl.content.destroyintl_does_not_mutate_any_other_runtime_instances_for_default_runtime_reset_in_test_code_p}}
