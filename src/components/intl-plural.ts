import { formatPlural, FormatterOptions } from '../formatters'
import { getIntl, IntlRuntime } from '../runtime'
import { getIntlLocaleRuntime } from './intl-locale'

export interface IntlPluralProps {
    value: number | string | undefined
    type: Intl.PluralRuleType
    locale: string
    zero: string
    one: string
    two: string
    few: string
    many: string
    other: string
}

type PluralOptions = FormatterOptions & Record<string, unknown>

const readValue = <T>(value: T | (() => T)) => {
    return typeof value === 'function' ? (value as () => T)() : value
}

const addDefined = (options: PluralOptions, key: string, value: unknown) => {
    if (value !== undefined && value !== null && value !== '') {
        options[key] = value
    }
}

const resolvePluralValue = (value: unknown) => {
    const pluralValue = Number(readValue(value))
    return Number.isNaN(pluralValue) ? undefined : pluralValue
}

const buildOptions = (
    props: Partial<
        Record<
            keyof IntlPluralProps,
            | IntlPluralProps[keyof IntlPluralProps]
            | (() => IntlPluralProps[keyof IntlPluralProps])
        >
    >,
    runtime?: IntlRuntime
) => {
    const options: PluralOptions = {
        scope: runtime,
        type: readValue(props.type) || 'cardinal',
    }

    addDefined(options, 'locale', readValue(props.locale))
    addDefined(options, 'zero', readValue(props.zero))
    addDefined(options, 'one', readValue(props.one))
    addDefined(options, 'two', readValue(props.two))
    addDefined(options, 'few', readValue(props.few))
    addDefined(options, 'many', readValue(props.many))
    addDefined(options, 'other', readValue(props.other))

    return options
}

export default ({
    html,
    WebComponent,
}: typeof import('@beforesemicolon/web-component')) => {
    class IntlPlural extends WebComponent<
        IntlPluralProps,
        { content: string }
    > {
        static observedAttributes = [
            'value',
            'type',
            'locale',
            'zero',
            'one',
            'two',
            'few',
            'many',
            'other',
        ]
        value = undefined
        type = 'cardinal' as IntlPluralProps['type']
        locale = ''
        zero = ''
        one = ''
        two = ''
        few = ''
        many = ''
        other = ''
        config = { shadow: false }
        initialState = {
            content: '',
        }
        runtime?: IntlRuntime
        unsubscribe?: () => void
        subscribeTimer?: ReturnType<typeof setTimeout>
        sourceText = ''

        updatePlural = () => {
            const value = resolvePluralValue(
                this.sourceText || this.props.value()
            )

            if (value === undefined) {
                console.error('intl-plural: invalid value', this.props.value())
                this.setState({ content: '' })
                return
            }

            this.setState({
                content: formatPlural(
                    value,
                    buildOptions(
                        this.props,
                        this.runtime
                    ) as unknown as FormatterOptions & {
                        type: Intl.PluralRuleType
                        zero?: string
                        one?: string
                        two?: string
                        few?: string
                        many?: string
                        other?: string
                    }
                ),
            })
        }

        subscribeToRuntime = () => {
            this.unsubscribe?.()
            const provider = this.closest('intl-locale')
            const providerRuntime = getIntlLocaleRuntime(this)

            /* istanbul ignore next -- depends on custom-element provider mount ordering */
            if (provider && !providerRuntime) {
                this.subscribeTimer = setTimeout(this.subscribeToRuntime, 0)
                return
            }

            this.runtime = providerRuntime || getIntl()
            this.unsubscribe = this.runtime.subscribe((snapshot) => {
                this.lang = this.props.locale() || snapshot.locale
                this.dir = snapshot.direction
                this.updatePlural()
            })
        }

        onMount() {
            this.subscribeToRuntime()
        }

        onUpdate() {
            this.updatePlural()
        }

        onDestroy() {
            clearTimeout(this.subscribeTimer)
            this.unsubscribe?.()
        }

        render() {
            return html`${this.state.content}`
        }
    }

    Object.defineProperty(IntlPlural.prototype, 'connectedCallback', {
        value: function connectedCallback(this: IntlPlural) {
            this.sourceText = this.textContent?.trim() || ''
            ;(
                WebComponent.prototype as unknown as {
                    connectedCallback(): void
                }
            ).connectedCallback.call(this)
        },
    })

    if (!customElements.get('intl-plural')) {
        customElements.define('intl-plural', IntlPlural)
    }

    return {
        intlPlural: (props: Partial<IntlPluralProps> = {}) => {
            const value = resolvePluralValue(props.value ?? 0)

            if (value === undefined) {
                return ''
            }

            return formatPlural(
                value,
                buildOptions(props) as unknown as FormatterOptions & {
                    type: Intl.PluralRuleType
                    zero?: string
                    one?: string
                    two?: string
                    few?: string
                    many?: string
                    other?: string
                }
            )
        },
    }
}
