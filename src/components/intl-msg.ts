import {
    formatMessage,
    MessageFormatOptions,
    MessageValues,
} from '../formatters'
import { getIntl, IntlRuntime } from '../runtime'
import { warnDeprecatedAlias } from '../utils/deprecation'
import { getIntlLocaleRuntime } from './intl-locale'

interface IntlMsgProps {
    id: string
    key: string
    values: MessageValues
}

export default ({
    html,
    HtmlTemplate,
    WebComponent,
}: typeof import('@beforesemicolon/web-component')) => {
    const toTemplate = (text: string) => {
        return new HtmlTemplate([text] as unknown as TemplateStringsArray, [])
    }

    class IntlMsg extends WebComponent<IntlMsgProps, { content: string }> {
        static observedAttributes = ['id', 'key', 'values']
        id = ''
        key = ''
        values = {}
        config = { shadow: false }
        initialState = {
            content: '',
        }
        runtime?: IntlRuntime
        unsubscribe?: () => void
        sourceText = ''

        getMessageKey = () => {
            const key = this.props.key()
            const id = this.props.id()

            if (!key && id) {
                warnDeprecatedAlias('id', 'key')
            }

            return key || id
        }

        updateMessage = () => {
            const key = this.getMessageKey()
            const values = this.props.values() || {}
            const fallback = this.sourceText
            const setFallback = () => this.setState({ content: fallback || '' })

            if (!key || this.runtime?.status !== 'ready') {
                setFallback()
                return
            }

            const content = formatMessage(key, values, {
                scope: this.runtime,
                missing: (missingKey) => {
                    console.error(
                        `[intl-msg] text for key of "${missingKey}" was not found. Rendering the key itself as backup.`
                    )
                    return fallback || missingKey
                },
            })

            this.setState({ content })
        }

        subscribeToRuntime = () => {
            this.unsubscribe?.()
            this.runtime = getIntlLocaleRuntime(this) || getIntl()
            this.unsubscribe = this.runtime.subscribe((snapshot) => {
                this.lang = snapshot.locale
                this.dir = snapshot.direction
                this.updateMessage()
            })
        }

        onMount() {
            this.subscribeToRuntime()
        }

        onUpdate() {
            this.updateMessage()
        }

        onDestroy() {
            this.unsubscribe?.()
        }

        render() {
            return html`${() => toTemplate(this.state.content())}`
        }
    }

    Object.defineProperty(IntlMsg.prototype, 'connectedCallback', {
        value: function connectedCallback(this: IntlMsg) {
            this.sourceText = this.textContent?.trim() || ''
            ;(
                WebComponent.prototype as unknown as { connectedCallback(): void }
            ).connectedCallback.call(this)
        },
    })

    if (!customElements.get('intl-msg')) {
        customElements.define('intl-msg', IntlMsg)
    }

    return {
        intlMsg: (
            key: string,
            values: MessageValues = {},
            options: MessageFormatOptions = {}
        ) => {
            return formatMessage(key, values, options)
        },
    }
}
