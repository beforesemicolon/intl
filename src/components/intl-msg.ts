import { LocaleListener, LocaleMessage } from './intl-locale'
import { StateGetter } from '@beforesemicolon/web-component'

export interface IntlMsgProps {
    id: string
    values: LocaleMessage
}

export default (
    onLocaleMessagesLoaded: (sub: LocaleListener) => void,
    {
        html,
        WebComponent,
        helper,
        element,
        val,
    }: typeof import('@beforesemicolon/web-component')
) => {
    let locale = new Intl.Locale(document.documentElement.lang)
    let messages = {} as LocaleMessage
    let ready = false

    const text = helper(
        (
            ready: StateGetter<boolean> | boolean,
            _id: StateGetter<IntlMsgProps['id']> | IntlMsgProps['id'],
            _values:
                | StateGetter<IntlMsgProps['values']>
                | IntlMsgProps['values'],
            asHtml = true
        ) =>
            () => {
                if (val(ready)) {
                    const id = val<string>(_id)
                    const values = val<IntlMsgProps['values']>(_values)
                    const txtParts: Array<string> = []
                    const txtValues: Array<Element> = []
                    const text = messages[id]

                    if (text === undefined) {
                        console.error(
                            `[intl-msg] text for id of "${id}" was not found. Rendering the "id" itself as backup.`
                        )
                        return id
                    }

                    if (asHtml) {
                        const pattern = /\{\s*([a-z0-9]+)\s*\}/g
                        let txt = String(text)
                        let match = null

                        while ((match = pattern.exec(String(txt))) !== null) {
                            const [, key] = match
                            const before = txt.substring(0, match.index)

                            before && txtParts.push(before)
                            txtValues.push(
                                element('slot', {
                                    attributes: {
                                        name: key,
                                    },
                                    textContent: values[key] as string,
                                })
                            )
                            txt = txt.substring(pattern.lastIndex)
                        }

                        txtParts.push(txt)

                        const markup = html(
                            txtParts as unknown as TemplateStringsArray,
                            txtValues
                        )

                        return markup
                    }

                    return (text as string).replace(
                        /\{\s*([a-z0-9]+)\s*\}/g,
                        (_: string, key: string) => {
                            return values[key] as string
                        }
                    )
                }

                return ''
            }
    )

    onLocaleMessagesLoaded((lang, msgs) => {
        locale = new Intl.Locale(lang)
        messages = msgs
        ready = true
    })

    class IntlMsg extends WebComponent<IntlMsgProps, { ready: boolean }> {
        static observedAttributes = ['id', 'values']
        id = ''
        values = {}
        initialState = {
            ready: false,
        }

        onMount() {
            onLocaleMessagesLoaded(() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.setAttribute('dir', locale.textInfo.direction)
                this.setState({ ready: true })
            })
        }

        render() {
            return html`${text(
                this.state.ready,
                this.props.id,
                this.props.values
            )}`
        }
    }

    customElements.define('intl-msg', IntlMsg)

    return {
        intlMsg: (id: string, values = {} as LocaleMessage) => {
            if (!ready) {
                throw new Error(
                    'You are calling "intlMsg" before locale messages got loaded.'
                )
            }

            // @ts-expect-error the helper has a value property
            return text(true, id, values, false).value
        },
    }
}
