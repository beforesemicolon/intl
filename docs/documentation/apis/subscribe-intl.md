---
name: '{{t.pages.documentation.apis.subscribe_intl.meta.subscribeintl}}'
order: 7.06
title: '{{t.pages.documentation.apis.subscribe_intl.meta.subscribeintl_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.apis.subscribe_intl.meta.subscribe_to_intl_runtime_snapshots_when_locale_loading_status_or_messages_change}}'
layout: document
---

## {{t.pages.documentation.apis.subscribe_intl.content.subscribeintl}}

{{t.pages.documentation.apis.subscribe_intl.content.subscribeintl_listener_scope_subscribes_to_live_runtime_snapshots}}

{{t.pages.documentation.apis.subscribe_intl.content.it_is_useful_for_ui_that_must_react_to_locale_loading_or_message_load_state_outside_components}}

```ts
import { subscribeIntl } from '@beforesemicolon/intl'

const unsubscribe = subscribeIntl((snapshot) => {
  console.log(snapshot.locale)
  console.log(snapshot.status)
})
```

## {{t.common.content.signature}}

```ts
function subscribeIntl(
  listener: (snapshot: IntlRuntimeSnapshot) => void,
  scope?: IntlRuntime
): () => void
```

## {{t.pages.documentation.apis.subscribe_intl.content.callback_contract}}

{{t.pages.documentation.apis.subscribe_intl.content.subscribeintl_does_two_things_immediately}}

1. {{t.pages.documentation.apis.subscribe_intl.content.adds_the_listener}}
2. {{t.pages.documentation.apis.subscribe_intl.content.calls_it_once_with_the_current_snapshot}}

{{t.pages.documentation.apis.subscribe_intl.content.it_then_calls_the_listener_for_all_future_locale_message_state_updates}}

## {{t.pages.documentation.apis.subscribe_intl.content.snapshot_fields_in_practice}}

- {{t.pages.documentation.apis.subscribe_intl.content.locale_fallbacklocale_for_current_and_fallback_language_resolution}}
- {{t.pages.documentation.apis.subscribe_intl.content.direction_for_ltr_rtl_layout_behavior}}
- {{t.pages.documentation.apis.subscribe_intl.content.messages_and_fallbackmessages_for_resolved_message_layers}}
- {{t.pages.documentation.apis.subscribe_intl.content.loadedlocales_for_cache_awareness}}
- {{t.pages.documentation.apis.subscribe_intl.content.status_lifecycle_idle_loading_ready_error}}
- {{t.pages.documentation.apis.subscribe_intl.content.error_for_failed_loads}}
- {{t.pages.documentation.apis.subscribe_intl.content.parentscope_when_runtime_inherits_from_another_runtime}}

```ts
const unsubscribe = subscribeIntl((snapshot) => {
  if (snapshot.status === 'loading') {
    showSpinner()
    return
  }

  if (snapshot.status === 'error') {
    showWarning(snapshot.error)
    return
  }

  if (snapshot.status === 'ready') {
    render(snapshot.locale)
  }
})
```

## {{t.pages.documentation.apis.subscribe_intl.content.cleanup}}

{{t.pages.documentation.apis.subscribe_intl.content.always_unsubscribe_when_the_listener_is_no_longer_needed}}

```ts
const cleanup = subscribeIntl((snapshot) => {
  // component paint function
})

window.addEventListener('unload', cleanup)
```

{{t.pages.documentation.apis.subscribe_intl.content.for_low_level_component_internals_this_can_replace_manual_polling_for_runtime_state}}
