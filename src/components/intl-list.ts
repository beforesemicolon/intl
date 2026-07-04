import { formatList, FormatterOptions } from '../formatters'
import { getIntl, IntlRuntime } from '../runtime'
import { getIntlLocaleRuntime } from './intl-locale'

export interface IntlListProps {
    value: string[] | string | undefined
    locale: string
    type: 'conjunction' | 'disjunction' | 'unit' | 'and' | 'or' | 'none'
    typeStyle: 'long' | 'short' | 'narrow'
}

type ListOptions = FormatterOptions & Record<string, unknown>

const readValue = <T>(value: T | (() => T)) => {
    return typeof value === 'function' ? (value as () => T)() : value
}

const addDefined = (options: ListOptions, key: string, value: unknown) => {
    if (value !== undefined && value !== null && value !== '') {
        options[key] = value
    }
}

const resolveListValue = (value: unknown) => {
    const listValue = readValue(value)

    if (Array.isArray(listValue)) {
        return listValue.map(String).filter(Boolean)
    }

    if (typeof listValue === 'string') {
        return listValue.trim().split(/\s+/).filter(Boolean)
    }

    return []
}

const buildOptions = (
    props: Partial<
        Record<
            keyof IntlListProps,
            | IntlListProps[keyof IntlListProps]
            | (() => IntlListProps[keyof IntlListProps])
        >
    >,
    runtime?: IntlRuntime
) => {
    const options: ListOptions = {
        scope: runtime,
        type: readValue(props.type) || 'conjunction',
        style: readValue(props.typeStyle) || 'long',
    }

    addDefined(options, 'locale', readValue(props.locale))

    return options
}

export default ({
    html,
    WebComponent,
}: typeof import('@beforesemicolon/web-component')) => {
    class IntlList extends WebComponent<IntlListProps, { content: string }> {
        static observedAttributes = ['locale', 'value', 'type', 'type-style']
        value = ''
        type = 'conjunction' as IntlListProps['type']
        typeStyle = 'long' as IntlListProps['typeStyle']
        locale = ''
        config = { shadow: false }
        initialState = {
            content: '',
        }
        runtime?: IntlRuntime
        unsubscribe?: () => void
        subscribeTimer?: ReturnType<typeof setTimeout>
        sourceText = ''

        updateList = () => {
            const value = resolveListValue(
                this.sourceText || this.props.value()
            )

            const options = buildOptions(
                this.props,
                this.runtime
            ) as FormatterOptions & Record<string, unknown>
            const content = formatList(value, options)
            const label =
                options.style && options.style !== 'long'
                    ? formatList(value, { ...options, style: 'long' })
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

            if (provider && !providerRuntime) {
                this.subscribeTimer = setTimeout(this.subscribeToRuntime, 0)
                return
            }

            this.runtime = providerRuntime || getIntl()
            this.unsubscribe = this.runtime.subscribe((snapshot) => {
                this.lang = this.props.locale() || snapshot.locale
                this.dir = snapshot.direction
                this.updateList()
            })
        }

        onMount() {
            this.subscribeToRuntime()
        }

        onUpdate() {
            this.updateList()
        }

        onDestroy() {
            clearTimeout(this.subscribeTimer)
            this.unsubscribe?.()
        }

        render() {
            return html`${this.state.content}`
        }
    }

    Object.defineProperty(IntlList.prototype, 'connectedCallback', {
        value: function connectedCallback(this: IntlList) {
            this.sourceText = this.textContent?.trim() || ''
            ;(
                WebComponent.prototype as unknown as {
                    connectedCallback(): void
                }
            ).connectedCallback.call(this)
        },
    })

    if (!customElements.get('intl-list')) {
        customElements.define('intl-list', IntlList)
    }

    return {
        intlList: (props: Partial<IntlListProps> = {}) => {
            return formatList(
                resolveListValue(props.value ?? ''),
                buildOptions(props) as FormatterOptions &
                    Record<string, unknown>
            )
        },
    }
}
