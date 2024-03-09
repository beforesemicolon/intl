export interface LocaleMessage {
    [key: string]: string | LocaleMessage
}

export type LocaleListener = (lang: string, msgs: LocaleMessage) => void

interface IntlLocaleProps {
    src: string
    srcDir: string
    messages: LocaleMessage
}

export default ({
    html,
    WebComponent,
    when,
}: typeof import('@beforesemicolon/web-component')) => {
    const subs: Set<LocaleListener> = new Set()
    const lang = document.documentElement.lang
    let ready = false
    let messages: LocaleMessage = {
        'cube-intl': {
            year: {
                single: 'year',
                plural: 'years',
                narrow: 'yr',
                short: 'year',
            },
            month: {
                single: 'month',
                plural: 'months',
                narrow: 'm',
                short: 'month',
            },
            week: {
                single: 'week',
                plural: 'weeks',
                narrow: 'week',
                short: 'week',
            },
            day: { single: 'day', plural: 'days', narrow: 'day', short: 'day' },
            hour: { single: 'hour', plural: 'hours', narrow: 'h', short: 'hr' },
            minute: {
                single: 'minute',
                plural: 'minutes',
                narrow: 'min',
                short: 'min',
            },
            second: {
                single: 'second',
                plural: 'seconds',
                narrow: 's',
                short: 'sec',
            },
            millisecond: {
                single: 'millisecond',
                plural: 'milliseconds',
                narrow: 'ms',
                short: 'mils',
            },
            nanosecond: {
                single: 'nanosecond',
                plural: 'nanoseconds',
                narrow: 'ns',
                short: 'nano',
            },
            plural: {
                other: 'th',
                zero: 'th',
                one: 'st',
                two: 'nd',
                few: 'rd',
                many: 'th',
            },
        },
    }

    class IntlLocale extends WebComponent<IntlLocaleProps, { ready: boolean }> {
        static observedAttributes = ['src', 'src-dir', 'messages']
        src = ''
        srcDir = ''
        messages = null
        initialState = {
            ready: false,
        }

        broadcast = () => {
            subs.forEach((sub) => sub(lang, messages))
            subs.clear()
            ready = true
            this.setState({ ready: true })
        }

        loadMessages = async () => {
            if (this.props.src()) {
                const res = await fetch(
                    new URL(this.props.src(), location.origin).href
                )

                if (res.status === 200) {
                    const data = (await res.json()) as LocaleMessage
                    messages = { ...messages, ...data }
                } else {
                    throw new Error(
                        `[intl-locale] Loading "${this.props.src()}" locale messages failed with status code ${
                            res.status
                        }`
                    )
                }
            } else if (this.props.srcDir()) {
                const src = `${this.props
                    .srcDir()
                    .replace(/\/$/, '')}/${lang}.json`

                const res = await fetch(new URL(src, location.origin).href)

                if (res.status === 200) {
                    const data = (await res.json()) as LocaleMessage
                    messages = { ...messages, ...data }
                } else {
                    throw new Error(
                        `[intl-locale] Loading "${src}" locale messages failed with status code ${res.status}`
                    )
                }
            }

            this.broadcast()
        }

        onMount() {
            if (this.props.messages()) {
                messages = this.props.messages()
                this.broadcast()
            } else {
                this.loadMessages().catch(console.error)
            }
        }

        render() {
            return html`${when(this.state.ready, html`<slot></slot>`, '')}`
        }
    }

    customElements.define('intl-locale', IntlLocale)

    return (sub: LocaleListener) => {
        if (ready) {
            sub(lang, messages)
        } else {
            subs.add(sub)
        }
    }
}
