import { formatDateTime, FormatterOptions } from '../formatters'
import { getIntl, IntlRuntime } from '../runtime'
import { getIntlLocaleRuntime } from './intl-locale'

export interface IntlDatetimeProps {
    value: string | number | Date | undefined
    locale: string
    dateStyle: Intl.DateTimeFormatOptions['dateStyle']
    timeStyle: Intl.DateTimeFormatOptions['timeStyle']
    timeZone: string
    timezone: string
    timeZoneName: Intl.DateTimeFormatOptions['timeZoneName']
    timezoneName: Intl.DateTimeFormatOptions['timeZoneName']
    calendar: string
    hourCycle: Intl.DateTimeFormatOptions['hourCycle']
    hour12: boolean | string | undefined
    weekday: Intl.DateTimeFormatOptions['weekday']
    era: Intl.DateTimeFormatOptions['era']
    year: Intl.DateTimeFormatOptions['year']
    month: Intl.DateTimeFormatOptions['month']
    day: Intl.DateTimeFormatOptions['day']
    dayPeriod: Intl.DateTimeFormatOptions['dayPeriod']
    hour: Intl.DateTimeFormatOptions['hour']
    minute: Intl.DateTimeFormatOptions['minute']
    second: Intl.DateTimeFormatOptions['second']
}

type DateTimeFormatOptions = FormatterOptions & Record<string, unknown>

const readValue = <T>(value: T | (() => T)) => {
    return typeof value === 'function' ? (value as () => T)() : value
}

const addDefined = (
    options: DateTimeFormatOptions,
    key: string,
    value: unknown
) => {
    if (value !== undefined && value !== null && value !== '') {
        options[key] = value
    }
}

const parseBoolean = (value: unknown) => {
    if (value === 'true') {
        return true
    }

    if (value === 'false') {
        return false
    }

    return value
}

const resolveDateValue = (value: unknown) => {
    const dateValue = readValue(value)

    if (dateValue instanceof Date) {
        return Number.isNaN(dateValue.getTime()) ? undefined : dateValue
    }

    if (typeof dateValue === 'number') {
        const date = new Date(dateValue)
        return Number.isNaN(date.getTime()) ? undefined : dateValue
    }

    if (typeof dateValue === 'string' && dateValue.trim()) {
        const date = /^\d+$/.test(dateValue)
            ? new Date(Number(dateValue))
            : new Date(dateValue)

        return Number.isNaN(date.getTime()) ? undefined : dateValue
    }

    return undefined
}

const getDateTimeAttribute = (value: string | number | Date) => {
    const date =
        value instanceof Date
            ? value
            : typeof value === 'string' && /^\d+$/.test(value)
              ? new Date(Number(value))
              : new Date(value)

    return Number.isNaN(date.getTime()) ? '' : date.toISOString()
}

const buildOptions = (
    props: Partial<
        Record<
            keyof IntlDatetimeProps,
            | IntlDatetimeProps[keyof IntlDatetimeProps]
            | (() => IntlDatetimeProps[keyof IntlDatetimeProps])
        >
    >,
    runtime?: IntlRuntime
) => {
    const options: DateTimeFormatOptions = {
        scope: runtime,
    }

    addDefined(options, 'locale', readValue(props.locale))
    addDefined(options, 'dateStyle', readValue(props.dateStyle))
    addDefined(options, 'timeStyle', readValue(props.timeStyle))
    addDefined(
        options,
        'timeZone',
        readValue(props.timeZone) || readValue(props.timezone)
    )
    addDefined(
        options,
        'timeZoneName',
        readValue(props.timeZoneName) || readValue(props.timezoneName)
    )
    addDefined(options, 'calendar', readValue(props.calendar))
    addDefined(options, 'hourCycle', readValue(props.hourCycle))
    addDefined(options, 'hour12', parseBoolean(readValue(props.hour12)))

    if (!readValue(props.dateStyle) && !readValue(props.timeStyle)) {
        addDefined(options, 'weekday', readValue(props.weekday))
        addDefined(options, 'era', readValue(props.era))
        addDefined(options, 'year', readValue(props.year))
        addDefined(options, 'month', readValue(props.month))
        addDefined(options, 'day', readValue(props.day))
        addDefined(options, 'dayPeriod', readValue(props.dayPeriod))
        addDefined(options, 'hour', readValue(props.hour))
        addDefined(options, 'minute', readValue(props.minute))
        addDefined(options, 'second', readValue(props.second))
    }

    return options
}

export default ({
    html,
    WebComponent,
}: typeof import('@beforesemicolon/web-component')) => {
    class IntlDatetime extends WebComponent<
        IntlDatetimeProps,
        { content: string; datetime: string }
    > {
        static observedAttributes = [
            'value',
            'locale',
            'date-style',
            'time-style',
            'time-zone',
            'timezone',
            'time-zone-name',
            'timezone-name',
            'calendar',
            'hour-cycle',
            'hour12',
            'weekday',
            'era',
            'year',
            'month',
            'day',
            'day-period',
            'hour',
            'minute',
            'second',
        ]
        value = ''
        locale = ''
        dateStyle = undefined
        timeStyle = undefined
        timeZone = ''
        timezone = ''
        timeZoneName = ''
        timezoneName = ''
        calendar = ''
        hourCycle = ''
        hour12 = undefined
        weekday = ''
        era = ''
        year = ''
        month = ''
        day = ''
        dayPeriod = ''
        hour = ''
        minute = ''
        second = ''
        config = { shadow: false }
        initialState = {
            content: '',
            datetime: '',
        }
        runtime?: IntlRuntime
        unsubscribe?: () => void
        subscribeTimer?: ReturnType<typeof setTimeout>
        sourceText = ''

        updateDatetime = () => {
            const value = resolveDateValue(
                this.sourceText || this.props.value()
            )

            if (value === undefined) {
                console.error(
                    'intl-datetime: invalid value',
                    this.props.value()
                )
                this.setState({ content: '', datetime: '' })
                return
            }

            this.setState({
                content: formatDateTime(
                    value,
                    buildOptions(
                        this.props,
                        this.runtime
                    ) as Intl.DateTimeFormatOptions & FormatterOptions
                ),
                datetime: getDateTimeAttribute(value),
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
            this.unsubscribe = this.runtime.subscribe((snapshot) => {
                this.lang = this.props.locale() || snapshot.locale
                this.dir = snapshot.direction
                this.updateDatetime()
            })
        }

        onMount() {
            this.subscribeToRuntime()
        }

        onUpdate() {
            this.updateDatetime()
        }

        onDestroy() {
            clearTimeout(this.subscribeTimer)
            this.unsubscribe?.()
        }

        render() {
            return html`<time datetime="${this.state.datetime}"
                >${this.state.content}</time
            >`
        }
    }

    Object.defineProperty(IntlDatetime.prototype, 'connectedCallback', {
        value: function connectedCallback(this: IntlDatetime) {
            this.sourceText = this.textContent?.trim() || ''
            ;(
                WebComponent.prototype as unknown as {
                    connectedCallback(): void
                }
            ).connectedCallback.call(this)
        },
    })

    if (!customElements.get('intl-datetime')) {
        customElements.define('intl-datetime', IntlDatetime)
    }

    return {
        intlDatetime: (props: Partial<IntlDatetimeProps> = {}) => {
            const value = resolveDateValue(props.value ?? new Date())

            if (value === undefined) {
                return ''
            }

            return formatDateTime(
                value,
                buildOptions(props) as Intl.DateTimeFormatOptions &
                    FormatterOptions
            )
        },
    }
}
