import '@formatjs/intl-durationformat/polyfill'
import { formatDuration, FormatterOptions } from '../formatters'
import { getIntl, IntlRuntime } from '../runtime'
import { getIntlLocaleRuntime } from './intl-locale'

interface IntlDurationProps {
    locale: string
    value: number | string | undefined
    timeStyle: 'long' | 'short' | 'narrow' | 'digital'
    style: 'long' | 'short' | 'narrow' | 'digital'
    fields: '*' | string
}

type DurationOptions = FormatterOptions & Record<string, unknown>

const fieldAliases: Record<string, string> = {
    year: 'years',
    month: 'months',
    week: 'weeks',
    day: 'days',
    hour: 'hours',
    minute: 'minutes',
    second: 'seconds',
    millisecond: 'milliseconds',
    microsecond: 'microseconds',
    nanosecond: 'nanoseconds',
}

const validFields = new Set([
    'years',
    'months',
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
    'microseconds',
    'nanoseconds',
])

const readValue = <T>(value: T | (() => T)) => {
    return typeof value === 'function' ? (value as () => T)() : value
}

const addDefined = (options: DurationOptions, key: string, value: unknown) => {
    if (value !== undefined && value !== null && value !== '') {
        options[key] = value
    }
}

const normalizeFields = (fields: unknown) => {
    if (!fields || fields === '*') {
        return '*'
    }

    return String(fields)
        .trim()
        .split(/\s+/)
        .map((field) => fieldAliases[field] || field)
        .filter((field) => validFields.has(field))
}

const resolveDurationValue = (value: unknown) => {
    const durationValue = Number(readValue(value))
    return Number.isNaN(durationValue) ? undefined : durationValue
}

const buildOptions = (
    props: Partial<
        Record<
            keyof IntlDurationProps,
            | IntlDurationProps[keyof IntlDurationProps]
            | (() => IntlDurationProps[keyof IntlDurationProps])
        >
    >,
    runtime?: IntlRuntime
) => {
    const options: DurationOptions = {
        scope: runtime,
        fields: normalizeFields(readValue(props.fields)),
        style: readValue(props.timeStyle) || readValue(props.style) || 'long',
    }

    addDefined(options, 'locale', readValue(props.locale))

    return options
}

export default ({
    html,
    WebComponent,
}: typeof import('@beforesemicolon/web-component')) => {
    class IntlDuration extends WebComponent<
        IntlDurationProps,
        { content: string }
    > {
        static observedAttributes = ['value', 'time-style', 'fields', 'locale']
        value = undefined
        timeStyle = 'long' as IntlDurationProps['timeStyle']
        fields = '*'
        locale = ''
        initialState = {
            content: '',
        }
        runtime?: IntlRuntime
        unsubscribe?: () => void
        subscribeTimer?: ReturnType<typeof setTimeout>

        updateDuration = () => {
            const value = resolveDurationValue(
                this.textContent?.trim() || this.props.value()
            )

            if (value === undefined) {
                console.error(
                    'intl-duration: invalid value',
                    this.props.value()
                )
                this.setState({ content: '' })
                return
            }

            this.setState({
                content: formatDuration(
                    value,
                    buildOptions(
                        this.props,
                        this.runtime
                    ) as unknown as FormatterOptions & {
                        fields: '*' | string | string[]
                        style: 'long' | 'short' | 'narrow' | 'digital'
                    }
                ),
            })
        }

        subscribeToRuntime = () => {
            this.unsubscribe?.()
            const provider = this.closest('intl-locale')
            const providerRuntime = getIntlLocaleRuntime(this)

            if (provider && !providerRuntime) {
                this.subscribeTimer = setTimeout(this.subscribeToRuntime, 0)
                return
            }

            this.runtime = providerRuntime || getIntl()
            this.unsubscribe = this.runtime.subscribe(() => {
                this.updateDuration()
            })
        }

        onMount() {
            this.subscribeToRuntime()
        }

        onUpdate() {
            this.updateDuration()
        }

        onDestroy() {
            clearTimeout(this.subscribeTimer)
            this.unsubscribe?.()
        }

        render() {
            return html`${this.state.content}`
        }
    }

    customElements.define('intl-duration', IntlDuration)

    return {
        intlDuration: (props: Partial<IntlDurationProps> = {}) => {
            const value = resolveDurationValue(props.value ?? 0)

            if (value === undefined) {
                return ''
            }

            return formatDuration(
                value,
                buildOptions(props) as unknown as FormatterOptions & {
                    fields: '*' | string | string[]
                    style: 'long' | 'short' | 'narrow' | 'digital'
                }
            )
        },
    }
}
