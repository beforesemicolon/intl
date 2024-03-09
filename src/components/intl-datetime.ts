import { conditionalField } from '../utils/conditional-field'
import type { StateGetter } from '@beforesemicolon/web-component'

export interface IntlDatetimeProps {
    hour12: boolean | undefined
    weekday: 'long' | 'short' | 'narrow' | undefined
    era: 'long' | 'short' | 'narrow' | undefined
    dayPeriod: 'long' | 'short' | 'narrow' | undefined
    year: 'numeric' | '2-digit' | undefined
    day: 'numeric' | '2-digit' | undefined
    dateStyle: 'full' | 'long' | 'medium' | 'short' | undefined
    timeStyle: 'full' | 'long' | 'medium' | 'short' | undefined
    hour: 'numeric' | '2-digit' | undefined
    minute: 'numeric' | '2-digit' | undefined
    second: 'numeric' | '2-digit' | undefined
    month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined
    hourCycle: 'h11' | 'h12' | 'h23' | 'h24' | undefined
    timezone: 'UTC' | string | undefined
    timezoneName:
        | 'long'
        | 'short'
        | 'shortOffset'
        | 'longOffset'
        | 'shortGeneric'
        | 'longGeneric'
        | undefined
    value: string | number | Date
    locale: string | undefined
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars#supported_calendar_types
    calendar:
        | 'buddhist'
        | 'chinese'
        | 'coptic'
        | 'dangi'
        | 'ethioaa'
        | 'ethiopic'
        | 'gregory'
        | 'hebrew'
        | 'indian'
        | 'islamic'
        | 'islamic-umalqura'
        | 'islamic-tbla'
        | 'islamic-civil' // instead of islamicc
        | 'islamic-rgsa'
        | 'iso8601'
        | 'japanese'
        | 'persian'
        | 'roc'
        | undefined
}

export default ({
    html,
    helper,
    val,
    WebComponent,
}: typeof import('@beforesemicolon/web-component')) => {
    const intlDatetimeDefaultProps: IntlDatetimeProps = {
        hour12: false,
        hourCycle: 'h23',
        weekday: 'short',
        locale: undefined,
        era: undefined,
        dayPeriod: 'long',
        year: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        month: 'numeric',
        timeStyle: undefined,
        dateStyle: undefined,
        calendar: undefined,
        timezone: undefined,
        timezoneName: 'short',
        value: new Date(),
    }

    const intlDatetime = helper(
        (
            hour12:
                | StateGetter<IntlDatetimeProps['hour12']>
                | IntlDatetimeProps['hour12'] = intlDatetimeDefaultProps[
                'hour12'
            ],
            hourCycle:
                | StateGetter<IntlDatetimeProps['hourCycle']>
                | IntlDatetimeProps['hourCycle'] = intlDatetimeDefaultProps[
                'hourCycle'
            ],
            weekday:
                | StateGetter<IntlDatetimeProps['weekday']>
                | IntlDatetimeProps['weekday'] = intlDatetimeDefaultProps[
                'weekday'
            ],
            locale:
                | StateGetter<IntlDatetimeProps['locale']>
                | IntlDatetimeProps['locale'] = intlDatetimeDefaultProps[
                'locale'
            ],
            era:
                | StateGetter<IntlDatetimeProps['era']>
                | IntlDatetimeProps['era'] = intlDatetimeDefaultProps['era'],
            dayPeriod:
                | StateGetter<IntlDatetimeProps['dayPeriod']>
                | IntlDatetimeProps['dayPeriod'] = intlDatetimeDefaultProps[
                'dayPeriod'
            ],
            year:
                | StateGetter<IntlDatetimeProps['year']>
                | IntlDatetimeProps['year'] = intlDatetimeDefaultProps['year'],
            day:
                | StateGetter<IntlDatetimeProps['day']>
                | IntlDatetimeProps['day'] = intlDatetimeDefaultProps['day'],
            hour:
                | StateGetter<IntlDatetimeProps['hour']>
                | IntlDatetimeProps['hour'] = intlDatetimeDefaultProps['hour'],
            minute:
                | StateGetter<IntlDatetimeProps['minute']>
                | IntlDatetimeProps['minute'] = intlDatetimeDefaultProps[
                'minute'
            ],
            second:
                | StateGetter<IntlDatetimeProps['second']>
                | IntlDatetimeProps['second'] = intlDatetimeDefaultProps[
                'second'
            ],
            month:
                | StateGetter<IntlDatetimeProps['month']>
                | IntlDatetimeProps['month'] = intlDatetimeDefaultProps[
                'month'
            ],
            timeStyle:
                | StateGetter<IntlDatetimeProps['timeStyle']>
                | IntlDatetimeProps['timeStyle'] = intlDatetimeDefaultProps[
                'timeStyle'
            ],
            dateStyle:
                | StateGetter<IntlDatetimeProps['dateStyle']>
                | IntlDatetimeProps['dateStyle'] = intlDatetimeDefaultProps[
                'dateStyle'
            ],
            calendar:
                | StateGetter<IntlDatetimeProps['calendar']>
                | IntlDatetimeProps['calendar'] = intlDatetimeDefaultProps[
                'calendar'
            ],
            timezone:
                | StateGetter<IntlDatetimeProps['timezone']>
                | IntlDatetimeProps['timezone'] = intlDatetimeDefaultProps[
                'timezone'
            ],
            timezoneName:
                | StateGetter<IntlDatetimeProps['timezoneName']>
                | IntlDatetimeProps['timezoneName'] = intlDatetimeDefaultProps[
                'timezoneName'
            ],
            value:
                | StateGetter<IntlDatetimeProps['value']>
                | IntlDatetimeProps['value'] = intlDatetimeDefaultProps['value']
        ) => {
            let dateTimeValue = val(value)

            if (
                !dateTimeValue ||
                (!/string|number/.test(typeof dateTimeValue) &&
                    !(dateTimeValue instanceof Date))
            ) {
                dateTimeValue = new Date()
            }

            const dateTimeOptions = {
                ...conditionalField('weekday', val(weekday)),
                ...conditionalField('era', val(era)),
                ...conditionalField('year', val(year)),
                ...conditionalField('month', val(month)),
                ...conditionalField('day', val(day)),
                ...conditionalField('dayPeriod', val(dayPeriod)),
                ...conditionalField('hour', val(hour)),
                ...conditionalField('minute', val(minute)),
                ...conditionalField('second', val(second)),
            }

            const dt = new Intl.DateTimeFormat(val(locale), {
                hour12: val(hour12),
                ...conditionalField('calendar', val(calendar)),
                ...conditionalField('hourCycle', val(hourCycle)),
                ...conditionalField('timeStyle', val(timeStyle)),
                ...conditionalField('dateStyle', val(dateStyle)),
                ...conditionalField('timeZone', val(timezone)),
                ...conditionalField('timezoneName', val(timezoneName)),
                // if dateStyle or timeStyle is provided we cannot set individual time/date options
                ...(val(dateStyle) || val(timeStyle) ? {} : dateTimeOptions),
            })

            try {
                const date = /string|number/.test(typeof dateTimeValue)
                    ? typeof dateTimeValue === 'string' &&
                      /^[0-9]+$/.test(dateTimeValue)
                        ? new Date(Number(dateTimeValue))
                        : new Date(dateTimeValue as string)
                    : dateTimeValue

                if (!(date instanceof Date)) {
                    throw new Error('Invalid Date')
                }

                return dt.format(date)
            } catch (e) {
                return `[Invalid Date: ${value}]`
            }
        }
    )

    class IntlDatetime extends WebComponent<IntlDatetimeProps> {
        static observedAttributes = [
            'hour12',
            'hour-cycle',
            'weekday',
            'era',
            'day-period',
            'year',
            'day',
            'hour',
            'minute',
            'second',
            'month',
            'time-style',
            'date-style',
            'calendar',
            'timezone',
            'timezone-name',
            'value',
        ]
        hour12 = intlDatetimeDefaultProps['hour12']
        hourCycle = intlDatetimeDefaultProps['hourCycle']
        weekday = intlDatetimeDefaultProps['weekday']
        locale = intlDatetimeDefaultProps['locale']
        era = intlDatetimeDefaultProps['era']
        dayPeriod = intlDatetimeDefaultProps['dayPeriod']
        year = intlDatetimeDefaultProps['year']
        day = intlDatetimeDefaultProps['day']
        hour = intlDatetimeDefaultProps['hour']
        minute = intlDatetimeDefaultProps['minute']
        second = intlDatetimeDefaultProps['second']
        month = intlDatetimeDefaultProps['month']
        timeStyle = intlDatetimeDefaultProps['timeStyle']
        dateStyle = intlDatetimeDefaultProps['dateStyle']
        calendar = intlDatetimeDefaultProps['calendar']
        timezone = intlDatetimeDefaultProps['timezone']
        timezoneName = intlDatetimeDefaultProps['timezoneName']
        value = intlDatetimeDefaultProps['value']

        render() {
            return html`${intlDatetime(
                this.props['hour12'],
                this.props['hourCycle'],
                this.props['weekday'],
                this.props['locale'],
                this.props['era'],
                this.props['dayPeriod'],
                this.props['year'],
                this.props['day'],
                this.props['hour'],
                this.props['minute'],
                this.props['second'],
                this.props['month'],
                this.props['timeStyle'],
                this.props['dateStyle'],
                this.props['calendar'],
                this.props['timezone'],
                this.props['timezoneName'],
                this.textContent || this.props['value']
            )}`
        }
    }

    customElements.define('intl-datetime', IntlDatetime)

    return (props: Partial<IntlDatetimeProps>) => {
        props = { ...intlDatetimeDefaultProps, ...props }
        return intlDatetime(
            props['hour12'],
            props['hourCycle'],
            props['weekday'],
            props['locale'],
            props['era'],
            props['dayPeriod'],
            props['year'],
            props['day'],
            props['hour'],
            props['minute'],
            props['second'],
            props['month'],
            props['timeStyle'],
            props['dateStyle'],
            props['calendar'],
            props['timezone'],
            props['timezoneName'],
            props['value']
            // @ts-expect-error the helper has a value property
        ).value
    }
}
