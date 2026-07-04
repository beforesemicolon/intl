import {
    createIntl,
    destroyIntl,
    initIntl,
    IntlRuntime,
    IntlRuntimeSnapshot,
} from '../runtime'

interface IntlLocaleProps {
    locale: string
    fallbackLocale: string
    src: string
    srcDir: string
    updateDocument: boolean
    fallback: boolean
}

const providerScopes = new WeakMap<Element, IntlRuntime>()

const getParentProvider = (element: Element) => {
    return element.parentElement?.closest('intl-locale') || null
}

export const getIntlLocaleRuntime = (element: Element | null) => {
    const provider = element?.closest('intl-locale')
    return provider ? providerScopes.get(provider) : undefined
}

export default ({
    html,
    WebComponent,
    when,
}: typeof import('@beforesemicolon/web-component')) => {
    class IntlLocale extends WebComponent<IntlLocaleProps, { ready: boolean }> {
        static observedAttributes = [
            'locale',
            'fallback-locale',
            'src',
            'src-dir',
            'update-document',
            'fallback',
        ]
        locale = ''
        fallbackLocale = ''
        src = ''
        srcDir = ''
        updateDocument = false
        fallback = false
        initialState = {
            ready: false,
        }
        runtime?: IntlRuntime
        isDefaultRuntime = false
        unsubscribe?: () => void

        dispatchLocaleEvent = (type: string, snapshot: IntlRuntimeSnapshot) => {
            this.dispatchEvent(
                new CustomEvent(type, {
                    bubbles: true,
                    composed: true,
                    detail: snapshot,
                })
            )
        }

        updateDocumentLocale = (snapshot: IntlRuntimeSnapshot) => {
            if (!this.hasAttribute('update-document')) {
                return
            }

            document.documentElement.lang = snapshot.locale
            document.documentElement.dir = snapshot.direction
        }

        subscribeToRuntime = (runtime: IntlRuntime) => {
            this.unsubscribe?.()
            this.unsubscribe = runtime.subscribe((snapshot) => {
                this.updateDocumentLocale(snapshot)

                if (snapshot.status === 'ready') {
                    this.setState({ ready: true })
                }
            })
        }

        createRuntime = () => {
            this.destroyRuntime()
            const parentScope = getParentProvider(this)
            const options = {
                locale: this.props.locale() || undefined,
                fallbackLocale: this.props.fallbackLocale() || undefined,
                src: this.props.src() || undefined,
                srcDir: this.props.srcDir() || undefined,
                parentScope: parentScope
                    ? providerScopes.get(parentScope)
                    : undefined,
            }

            this.isDefaultRuntime = !options.parentScope
            this.runtime = this.isDefaultRuntime
                ? initIntl(options)
                : createIntl(options)
            providerScopes.set(this, this.runtime)
            this.subscribeToRuntime(this.runtime)

            return this.runtime
        }

        loadMessages = async () => {
            const runtime = this.runtime || this.createRuntime()
            const previousLocale = runtime.locale
            const snapshot = await runtime.loadLocale()

            if (snapshot.status === 'error') {
                this.dispatchLocaleEvent('locale-error', snapshot)
                throw snapshot.error
            }

            if (snapshot.status === 'ready') {
                this.setState({ ready: true })
            }

            this.dispatchLocaleEvent('locale-load', snapshot)

            if (
                snapshot.locale !== previousLocale ||
                snapshot.status === 'ready'
            ) {
                this.dispatchLocaleEvent('locale-change', snapshot)
            }

            return snapshot
        }

        onMount() {
            this.loadMessages().catch((err) => {
                console.error(err)
            })
        }

        destroyRuntime = () => {
            this.unsubscribe?.()
            this.unsubscribe = undefined

            if (!this.runtime) {
                return
            }

            if (this.isDefaultRuntime) {
                destroyIntl()
            } else {
                this.runtime.destroy()
            }

            providerScopes.delete(this)
            this.runtime = undefined
            this.isDefaultRuntime = false
        }

        onDestroy() {
            this.destroyRuntime()
        }

        render() {
            if (this.hasAttribute('fallback')) {
                return html`<slot></slot>`
            }

            return html`${when(this.state.ready, html`<slot></slot>`, '')}`
        }
    }

    if (!customElements.get('intl-locale')) {
        customElements.define('intl-locale', IntlLocale)
    }
}
