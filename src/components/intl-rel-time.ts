import {
    ONE_HOUR_MS,
    ONE_MINUTE_MS,
    ONE_SECOND_MS,
    ONE_DAY_MS,
} from '../utils/time-in-miliseconds'

export type RelativeUnit =
    | 'year'
    | 'years'
    | 'quarter'
    | 'quarters'
    | 'month'
    | 'months'
    | 'week'
    | 'weeks'
    | 'day'
    | 'days'
    | 'hour'
    | 'hours'
    | 'minute'
    | 'minutes'
    | 'second'
    | 'seconds'

export interface IntlRelTimeProps {
    live: boolean
    decimals: false
    value: number | undefined
    timeStyle: 'long' | 'short' | 'narrow' | undefined
    numeric: boolean
    unit: 'auto' | RelativeUnit
    locale: string | undefined
}

const getUpdateIntervalByUnit = (unit?: IntlRelTimeProps['unit']) => {
    switch (unit) {
        case 'hours':
        case 'hour':
            return ONE_HOUR_MS
        case 'minutes':
        case 'minute':
            return ONE_MINUTE_MS
        case 'seconds':
        case 'second':
            return ONE_SECOND_MS
        default:
            return null
    }
}

const getUnitAndValue = (
    milliseconds: number,
    precision = 0
): {
    val: number
    unit: RelativeUnit
    interval: number | null
} => {
    const inThePast = milliseconds < 0 ? -1 : 1
    milliseconds = Math.abs(milliseconds)
    const days = Number((milliseconds / ONE_DAY_MS).toFixed(precision))

    if (days < 1) {
        if (milliseconds < ONE_MINUTE_MS) {
            return {
                val:
                    Number((milliseconds / ONE_SECOND_MS).toFixed(precision)) *
                    inThePast,
                unit: 'seconds',
                interval: getUpdateIntervalByUnit('seconds'),
            }
        }

        const hours = milliseconds / (ONE_MINUTE_MS * 60)

        if (hours < 1) {
            return {
                val:
                    Number((milliseconds / ONE_MINUTE_MS).toFixed(precision)) *
                    inThePast,
                unit: 'minutes',
                interval: getUpdateIntervalByUnit('minutes'),
            }
        }

        return {
            val: Number(hours.toFixed(precision)) * inThePast,
            unit: 'hours',
            interval: getUpdateIntervalByUnit('hours'),
        }
    }

    if (days < 7) {
        return {
            val: days * inThePast,
            unit: days === 1 ? 'day' : 'days',
            interval: null,
        }
    }

    if (days < 30) {
        return {
            val: Number((days / 7).toFixed(precision)) * inThePast,
            unit: days === 7 ? 'week' : 'weeks',
            interval: null,
        }
    }

    if (days < 365) {
        return {
            val: Number((days / 30).toFixed(precision)) * inThePast, // average a month to 30 days
            unit: days === 30 ? 'month' : 'months',
            interval: null,
        }
    }

    return {
        val: Number((days / 365).toFixed(precision)) * inThePast,
        unit: days === 365 ? 'year' : 'years',
        interval: null,
    }
}

const defaultProps: IntlRelTimeProps = {
    locale: document.documentElement.lang,
    decimals: false,
    live: false,
    value: undefined,
    numeric: false,
    timeStyle: 'long',
    unit: 'auto',
}

const intlRelativeTime = (
    value: IntlRelTimeProps['value'],
    props: Partial<IntlRelTimeProps> = defaultProps
) => {
    if (typeof value !== 'number') {
        console.error('intl-relative-time: invalid value', value)
        return { value: '', interval: null }
    }

    props = { ...defaultProps, ...props }

    const precision = props.decimals ? 1 : 0
    const relative = new Intl.RelativeTimeFormat(defaultProps.locale, {
        style: props.timeStyle,
        numeric: props.numeric ? 'always' : 'auto',
    })

    if (props.unit === 'auto') {
        const rel = getUnitAndValue(value - Date.now(), precision)

        return {
            value: relative.format(rel.val, rel.unit) ?? '',
            interval: rel.interval,
        }
    }

    return {
        value:
            relative.format(
                Number(value.toFixed(precision)),
                props.unit as RelativeUnit
            ) ?? '',
        interval: getUpdateIntervalByUnit(props.unit),
    }
}

export default ({
    html,
    WebComponent,
}: typeof import('@beforesemicolon/web-component')) => {
    class IntlRelTime extends WebComponent<IntlRelTimeProps, { time: string }> {
        static observedAttributes = [
            'live',
            'decimals',
            'value',
            'time-style',
            'numeric',
            'unit',
            'locale',
        ]
        initialState = {
            time: '',
        }
        live = defaultProps.live
        decimals = defaultProps.decimals
        value = defaultProps.value
        timeStyle = defaultProps.timeStyle
        numeric = defaultProps.numeric
        unit = defaultProps.unit
        locale = defaultProps.locale
        #interval: ReturnType<typeof setTimeout> | number = 0

        updateTime = () => {
            const { value, interval } = intlRelativeTime(this.props.value(), {
                locale: this.props.locale(),
                decimals: this.props.decimals(),
                timeStyle: this.props.timeStyle(),
                numeric: this.props.numeric(),
                unit: this.props.unit(),
            })
            this.setState({ time: value })

            if (this.props.live() && interval) {
                clearInterval(this.#interval)
                this.#interval = setTimeout(this.updateTime, interval)
            }
        }

        onMount() {
            this.updateTime()
        }

        onDestroy() {
            clearInterval(this.#interval)
        }

        render() {
            return html`${this.state.time}`
        }
    }

    customElements.define('intl-relative-time', IntlRelTime)

    return {
        intlRelativeTime: (value: number, props: Partial<IntlRelTimeProps>) => {
            return intlRelativeTime(value, props).value
        },
    }
}
