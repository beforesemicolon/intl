import { formatName, FormatterOptions } from '../formatters'
import { getIntl, IntlRuntime } from '../runtime'
import { getIntlLocaleRuntime } from './intl-locale'

export interface IntlNameProps {
    value: string | undefined
    type: Intl.DisplayNamesOptions['type']
    nameStyle: Intl.DisplayNamesOptions['style']
    locale: string
    language: Intl.DisplayNamesOptions['languageDisplay']
}

type NameOptions = FormatterOptions & Record<string, unknown>

const readValue = <T>(value: T | (() => T)) => {
    return typeof value === 'function' ? (value as () => T)() : value
}

const addDefined = (options: NameOptions, key: string, value: unknown) => {
    if (value !== undefined && value !== null && value !== '') {
        options[key] = value
    }
}

const resolveNameValue = (value: unknown) => {
    const nameValue = readValue(value)
    return typeof nameValue === 'string' && nameValue.trim()
        ? nameValue.trim()
        : ''
}

const buildOptions = (
    props: Partial<
        Record<
            keyof IntlNameProps,
            | IntlNameProps[keyof IntlNameProps]
            | (() => IntlNameProps[keyof IntlNameProps])
        >
    >,
    runtime?: IntlRuntime
) => {
    const options: NameOptions = {
        scope: runtime,
        type: readValue(props.type) || 'region',
        style: readValue(props.nameStyle) || 'long',
    }

    addDefined(options, 'locale', readValue(props.locale))
    addDefined(options, 'languageDisplay', readValue(props.language))

    return options
}

export default ({
    html,
    WebComponent,
}: typeof import('@beforesemicolon/web-component')) => {
    class IntlName extends WebComponent<IntlNameProps, { content: string }> {
        static observedAttributes = [
            'value',
            'type',
            'name-style',
            'locale',
            'language',
        ]

        value = ''
        type = 'region' as IntlNameProps['type']
        nameStyle = 'long' as IntlNameProps['nameStyle']
        language = 'dialect' as IntlNameProps['language']
        locale = ''
        config = { shadow: false }
        initialState = {
            content: '',
        }
        runtime?: IntlRuntime
        unsubscribe?: () => void
        subscribeTimer?: ReturnType<typeof setTimeout>
        sourceText = ''

        updateName = () => {
            const value = resolveNameValue(
                this.sourceText || this.props.value()
            )

            if (!value) {
                console.error('intl-name: invalid value', value)
                this.setState({ content: '' })
                return
            }

            const options = buildOptions(
                this.props,
                this.runtime
            ) as unknown as Intl.DisplayNamesOptions & FormatterOptions
            const content = formatName(value, options)
            const label =
                options.style && options.style !== 'long'
                    ? formatName(value, { ...options, style: 'long' })
                    : ''

            if (label && label !== content) {
                this.setAttribute('aria-label', label)
            } else {
                this.removeAttribute('aria-label')
            }

            this.setState({ content })
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
                this.updateName()
            })
        }

        onMount() {
            this.subscribeToRuntime()
        }

        onUpdate() {
            this.updateName()
        }

        onDestroy() {
            clearTimeout(this.subscribeTimer)
            this.unsubscribe?.()
        }

        render() {
            return html`${this.state.content}`
        }
    }

    Object.defineProperty(IntlName.prototype, 'connectedCallback', {
        value: function connectedCallback(this: IntlName) {
            this.sourceText = this.textContent?.trim() || ''
            ;(
                WebComponent.prototype as unknown as {
                    connectedCallback(): void
                }
            ).connectedCallback.call(this)
        },
    })

    if (!customElements.get('intl-name')) {
        customElements.define('intl-name', IntlName)
    }

    return {
        intlName: (props: Partial<IntlNameProps> = {}) => {
            const value = resolveNameValue(props.value ?? '')

            if (!value) {
                return ''
            }

            return formatName(
                value,
                buildOptions(props) as unknown as Intl.DisplayNamesOptions &
                    FormatterOptions
            )
        },
    }
}
