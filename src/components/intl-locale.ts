import { createIntl, IntlRuntime, IntlRuntimeSnapshot } from '../runtime'

interface IntlLocaleProps {
    locale: string
    fallbackLocale: string
    src: string
    srcDir: string
}

export default ({
    WebComponent,
}: typeof import('@beforesemicolon/web-component')) => {
    class IntlLocale extends WebComponent<IntlLocaleProps> {
        static observedAttributes = ['locale', 'fallback-locale', 'src', 'src-dir']
        locale = ''
        fallbackLocale = ''
        src = ''
        srcDir = ''
        runtime?: IntlRuntime

        dispatchLocaleEvent = (type: string, snapshot: IntlRuntimeSnapshot) => {
            this.dispatchEvent(
                new CustomEvent(type, {
                    bubbles: true,
                    composed: true,
                    detail: snapshot,
                })
            )
        }

        createRuntime = () => {
            this.runtime?.destroy()
            this.runtime = createIntl({
                locale: this.props.locale() || undefined,
                fallbackLocale: this.props.fallbackLocale() || undefined,
                src: this.props.src() || undefined,
                srcDir: this.props.srcDir() || undefined,
            })

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

            this.dispatchLocaleEvent('locale-load', snapshot)

            if (snapshot.locale !== previousLocale || snapshot.status === 'ready') {
                this.dispatchLocaleEvent('locale-change', snapshot)
            }

            return snapshot
        }

        onMount() {
            this.loadMessages().catch(err => {
                console.error(err)
            })
        }

        onDestroy() {
            this.runtime?.destroy()
        }

        render() {
            return '<slot></slot>'
        }
    }

    customElements.define('intl-locale', IntlLocale)
}
