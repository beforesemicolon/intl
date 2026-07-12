import { getRuntime, interpolateMessage } from './shared'
import type {
    FormatterOptions,
    MessageFormatOptions,
    MessageValues,
} from './shared'

export const intlMsg = (
    key: string,
    values: MessageValues = {},
    options: MessageFormatOptions = {}
) => {
    if (!key) {
        return ''
    }

    const runtime = getRuntime(options.scope)
    const message = runtime.getMessage(key)

    if (message === undefined || message === null) {
        if (typeof options.missing === 'function') {
            return options.missing(key)
        }

        return options.missing ?? key
    }

    return interpolateMessage(String(message), values)
}

export type { FormatterOptions, MessageFormatOptions, MessageValues }
