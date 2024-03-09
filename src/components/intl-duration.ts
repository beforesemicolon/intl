import { millisecondsToTimeParts } from '../utils/milliseconds-to-time-parts'
import type { StateGetter } from '@beforesemicolon/web-component'
import type { LocaleListener, LocaleMessage } from './intl-locale'

const allFields = new Set(['second', 'minute', 'hour', 'day', 'month', 'year'])

export interface IntlDurationProps {
    value: number | undefined
    timeStyle: 'narrow' | 'short' | 'long'
    fields: '*' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'
}

export default (
    onLocaleMessagesLoaded: (sub: LocaleListener) => void,
    {
        html,
        WebComponent,
        val,
        helper,
    }: typeof import('@beforesemicolon/web-component')
) => {
    let messages = {} as LocaleMessage
    let ready = false
    const name = new Intl.DisplayNames('en', {
        style: 'long',
        type: 'dateTimeField',
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const list = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction',
    })

    const getText = (
        value: number,
        key: keyof LocaleMessage['_locale_']['duration'],
        style: IntlDurationProps['timeStyle']
    ) => {
        const _ = messages['_locale_'].duration

        if (_ && _[key]) {
            if (style === 'narrow') {
                return _[key].narrow
            }

            if (style === 'short') {
                return _[key].short
            }

            return value === 1 ? _[key].single : _[key].plural
        }

        return name.of(key)
    }

    const intlDuration = helper(
        (
            ready: StateGetter<boolean> | boolean,
            _value:
                | StateGetter<IntlDurationProps['value']>
                | IntlDurationProps['value'],
            _fields:
                | StateGetter<IntlDurationProps['fields']>
                | IntlDurationProps['fields'] = '*',
            _style:
                | StateGetter<IntlDurationProps['timeStyle']>
                | IntlDurationProps['timeStyle'] = 'long'
        ) => {
            if (ready) {
                const value = val(_value)
                const fields = val(_fields)
                const style = val<IntlDurationProps['timeStyle']>(_style)

                if (typeof value !== 'number' || typeof fields !== 'string') {
                    console.error(
                        "intl.duration: Invalid 'value' or 'fields'. Received: value=",
                        value,
                        ', fields=',
                        fields,
                        ''
                    )
                    return ''
                }

                const parts =
                    fields.trim() === '*'
                        ? allFields
                        : new Set(
                              (fields || '').split(/\s+/g).map((s) => s.trim())
                          )
                const tp = millisecondsToTimeParts(value, parts)
                const gap = style === 'narrow' ? '' : ' '

                return list.format([
                    ...(parts.has('year') && tp.year
                        ? [
                              `${[tp.year]}${gap}${getText(
                                  tp.year,
                                  'year',
                                  style
                              )}`,
                          ]
                        : []),
                    ...(parts.has('month') && tp.month
                        ? [
                              `${[tp.month]}${gap}${getText(
                                  tp.month,
                                  'month',
                                  style
                              )}`,
                          ]
                        : []),
                    ...(parts.has('day') && tp.day
                        ? [`${[tp.day]}${gap}${getText(tp.day, 'day', style)}`]
                        : []),
                    ...(parts.has('hour') && tp.hour
                        ? [
                              `${[tp.hour]}${gap}${getText(
                                  tp.hour,
                                  'hour',
                                  style
                              )}`,
                          ]
                        : []),
                    ...(parts.has('minute') && tp.minute
                        ? [
                              `${[tp.minute]}${gap}${getText(
                                  tp.minute,
                                  'minute',
                                  style
                              )}`,
                          ]
                        : []),
                    ...(parts.has('second') && tp.second
                        ? [
                              `${[tp.second]}${gap}${getText(
                                  tp.second,
                                  'second',
                                  style
                              )}`,
                          ]
                        : []),
                ])
            }

            return ''
        }
    )

    onLocaleMessagesLoaded((_, msgs) => {
        messages = msgs
        ready = true
    })

    class IntlDuration extends WebComponent<
        IntlDurationProps,
        { ready: boolean }
    > {
        static observedAttributes = ['value', 'time-style', 'fields']
        initialState = {
            ready: false,
        }
        value = undefined
        timeStyle = 'long'
        fields = '*'

        onMount() {
            onLocaleMessagesLoaded(() => {
                this.setState({ ready: true })
            })
        }
        render() {
            return html`${intlDuration(
                this.state.ready,
                this.props.value,
                this.props.fields,
                this.props.timeStyle
            )}`
        }
    }

    customElements.define('intl-duration', IntlDuration)

    return {
        intlDuration: (props: Partial<IntlDurationProps>) => {
            props = {
                value: undefined,
                timeStyle: 'long',
                fields: '*',
                ...props,
            }
            if (!ready) {
                throw new Error(
                    'You are calling "intlDuration" before locale messages got loaded.'
                )
            }

            return intlDuration(
                true,
                props.value,
                props.fields,
                props.timeStyle
            ).value
        },
    }
}
