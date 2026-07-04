import { formatRelativeTime, FormatterOptions } from '../formatters'
import { getIntl, IntlRuntime } from '../runtime'
import {
    ONE_HOUR_MS,
    ONE_MINUTE_MS,
    ONE_SECOND_MS,
} from '../utils/time-in-miliseconds'
import { getIntlLocaleRuntime } from './intl-locale'

export interface IntlRelTimeProps {
    live: boolean | string
    decimals: boolean | string
    precision: number | string | undefined
    value: number | string | Date | undefined
    style: Intl.RelativeTimeFormatStyle
    timeStyle: Intl.RelativeTimeFormatStyle
    numeric: Intl.RelativeTimeFormatNumeric | boolean | string
    unit:
        | 'auto'
        | Intl.RelativeTimeFormatUnit
        | Intl.RelativeTimeFormatUnitSingular
    locale: string
}

type RelativeTimeOptions = FormatterOptions & Record<string, unknown>

const unitAliases: Record<string, Intl.RelativeTimeFormatUnitSingular> = {
    years: 'year',
    quarters: 'quarter',
    months: 'month',
    weeks: 'week',
    days: 'day',
    hours: 'hour',
    minutes: 'minute',
    seconds: 'second',
}

const readValue = <T>(value: T | (() => T)) => {
    return typeof value === 'function' ? (value as () => T)() : value
}

const parseBoolean = (value: unknown) => {
    if (value === '') {
        return true
    }

    if (value === 'true') {
        return true
    }

    if (value === 'false') {
        return false
    }

    return value
}

const parsePrecision = (props: Partial<IntlRelTimeProps>) => {
    const precision = Number(readValue(props.precision))

    if (!Number.isNaN(precision)) {
        return precision
    }

    return parseBoolean(readValue(props.decimals)) ? 1 : 0
}

const parseNumeric = (value: unknown): Intl.RelativeTimeFormatNumeric => {
    const numeric = parseBoolean(value)

    if (numeric === true) {
        return 'always'
    }

    if (numeric === false || !numeric) {
        return 'auto'
    }

    return numeric as Intl.RelativeTimeFormatNumeric
}

const normalizeUnit = (value: unknown) => {
    const unit = String(value || 'auto')
    return unitAliases[unit] || unit
}

const addDefined = (
    options: RelativeTimeOptions,
    key: string,
    value: unknown
) => {
    if (value !== undefined && value !== null && value !== '') {
        options[key] = value
    }
}

const resolveTimeValue = (value: unknown) => {
    const timeValue = readValue(value)

    if (timeValue instanceof Date) {
        return Number.isNaN(timeValue.getTime())
            ? undefined
            : timeValue.getTime()
    }

    if (typeof timeValue === 'number') {
        return Number.isNaN(timeValue) ? undefined : timeValue
    }

    if (typeof timeValue === 'string' && timeValue.trim()) {
        const numberValue = Number(timeValue)

        if (!Number.isNaN(numberValue)) {
            return numberValue
        }

        const date = new Date(timeValue)
        return Number.isNaN(date.getTime()) ? undefined : date.getTime()
    }

    return undefined
}

const getDateTimeAttribute = (value: number | undefined, unit: string) => {
    if (value === undefined || unit !== 'auto') {
        return ''
    }

    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? '' : date.toISOString()
}

const getUpdateInterval = (unit: string, live: unknown) => {
    if (!parseBoolean(live)) {
        return null
    }

    switch (unit) {
        case 'hour':
            return ONE_HOUR_MS
        case 'minute':
            return ONE_MINUTE_MS
        case 'second':
            return ONE_SECOND_MS
        case 'auto':
            return ONE_SECOND_MS
        default:
            return null
    }
}

const buildOptions = (
    props: Partial<
        Record<
            keyof IntlRelTimeProps,
            | IntlRelTimeProps[keyof IntlRelTimeProps]
            | (() => IntlRelTimeProps[keyof IntlRelTimeProps])
        >
    >,
    runtime?: IntlRuntime
) => {
    const options: RelativeTimeOptions = {
        scope: runtime,
        unit: normalizeUnit(readValue(props.unit)),
        precision: parsePrecision(props as Partial<IntlRelTimeProps>),
        numeric: parseNumeric(readValue(props.numeric)),
        style: readValue(props.timeStyle) || readValue(props.style) || 'long',
    }

    addDefined(options, 'locale', readValue(props.locale))

    return options
}

export default ({
    html,
    WebComponent,
}: typeof import('@beforesemicolon/web-component')) => {
    class IntlRelTime extends WebComponent<
        IntlRelTimeProps,
        { content: string; datetime: string }
    > {
        static observedAttributes = [
            'live',
            'decimals',
            'precision',
            'value',
            'time-style',
            'numeric',
            'unit',
            'locale',
        ]
        live = false
        decimals = false
        precision = undefined
        value = undefined
        timeStyle = 'long' as IntlRelTimeProps['timeStyle']
        numeric = 'auto' as IntlRelTimeProps['numeric']
        unit = 'auto' as IntlRelTimeProps['unit']
        locale = ''
        config = { shadow: false }
        initialState = {
            content: '',
            datetime: '',
        }
        runtime?: IntlRuntime
        unsubscribe?: () => void
        subscribeTimer?: ReturnType<typeof setTimeout>
        updateTimer?: ReturnType<typeof setTimeout>
        sourceText = ''

        scheduleUpdate = () => {
            clearTimeout(this.updateTimer)
            const interval = getUpdateInterval(
                normalizeUnit(this.props.unit()),
                this.props.live()
            )

            if (interval) {
                this.updateTimer = setTimeout(this.updateTime, interval)
            }
        }

        updateTime = () => {
            const value = resolveTimeValue(
                this.sourceText || this.props.value()
            )

            if (value === undefined) {
                console.error(
                    'intl-rel-time: invalid value',
                    this.props.value()
                )
                this.setState({ content: '', datetime: '' })
                return
            }

            const options = buildOptions(
                this.props,
                this.runtime
            ) as unknown as Intl.RelativeTimeFormatOptions &
                FormatterOptions & {
                    unit: IntlRelTimeProps['unit']
                    precision: number
                }

            const content = formatRelativeTime(value, options)
            const label =
                options.style && options.style !== 'long'
                    ? formatRelativeTime(value, { ...options, style: 'long' })
                    : ''

            if (label && label !== content) {
                this.setAttribute('aria-label', label)
            } else {
                this.removeAttribute('aria-label')
            }

            this.setState({
                content,
                datetime: getDateTimeAttribute(value, String(options.unit)),
            })
            this.scheduleUpdate()
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
            this.unsubscribe = this.runtime.subscribe((snapshot) => {
                this.lang = this.props.locale() || snapshot.locale
                this.dir = snapshot.direction
                this.updateTime()
            })
        }

        onMount() {
            this.subscribeToRuntime()
        }

        onUpdate() {
            this.updateTime()
        }

        onDestroy() {
            clearTimeout(this.subscribeTimer)
            clearTimeout(this.updateTimer)
            this.unsubscribe?.()
        }

        render() {
            return html`<time datetime="${this.state.datetime}"
                >${this.state.content}</time
            >`
        }
    }

    Object.defineProperty(IntlRelTime.prototype, 'connectedCallback', {
        value: function connectedCallback(this: IntlRelTime) {
            this.sourceText = this.textContent?.trim() || ''
            ;(
                WebComponent.prototype as unknown as {
                    connectedCallback(): void
                }
            ).connectedCallback.call(this)
        },
    })

    if (!customElements.get('intl-rel-time')) {
        customElements.define('intl-rel-time', IntlRelTime)
    }

    if (!customElements.get('intl-relative-time')) {
        customElements.define(
            'intl-relative-time',
            class IntlRelativeTime extends IntlRelTime {}
        )
    }

    return {
        intlRelativeTime: (
            value: number | string | Date,
            props: Partial<IntlRelTimeProps> = {}
        ) => {
            const timeValue = resolveTimeValue(value)

            if (timeValue === undefined) {
                return ''
            }

            return formatRelativeTime(
                timeValue,
                buildOptions(props) as Intl.RelativeTimeFormatOptions &
                    FormatterOptions
            )
        },
    }
}
