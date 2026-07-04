import initLocale from './intl-locale'
import initMsg from './intl-msg'
import * as WC from '@beforesemicolon/web-component'
import { initIntl, resetIntl } from '../runtime'

initLocale(WC)
const { intlMsg } = initMsg(WC)

const { html } = WC

const wait = () => new Promise((resolve) => setTimeout(resolve, 0))
const waitForLocaleLoad = () => {
    return new Promise((resolve) => {
        document.body.addEventListener('locale-load', resolve, { once: true })
    })
}

describe('intl-msg', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = 'en'
    })

    afterEach(() => {
        resetIntl()
    })

    it('should format messages programmatically', () => {
        const scope = initIntl({
            locale: 'en',
            messages: {
                title: 'Greetings {name}',
                description: 'Welcome to the test app',
                rich: '<em>New</em>',
            },
        })

        expect(intlMsg('description', {}, { scope })).toBe(
            'Welcome to the test app'
        )
        expect(intlMsg('title', { name: 'John Doe' }, { scope })).toBe(
            'Greetings John Doe'
        )
        expect(intlMsg('rich', {}, { scope })).toBe('<em>New</em>')
    })

    it('should render text from the nearest locale provider scope', async () => {
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () =>
                    Promise.resolve({
                        title: 'Greetings {name}',
                        description: 'Welcome to the test app',
                        rich: '<em>New</em>',
                    }),
            } as Response)
        })
        const localeLoad = waitForLocaleLoad()

        html`
            <intl-locale locale="en" src="/locales/en.json" fallback>
                <intl-msg key="title" values="${{ name: 'John Doe' }}"></intl-msg>
                <intl-msg id="description"></intl-msg>
                <intl-msg key="rich"></intl-msg>
            </intl-locale>
        `.render(document.body)
        await localeLoad
        await wait()

        const msgs = [...document.querySelectorAll('intl-msg')] as Array<
            HTMLElement & { contentRoot: HTMLElement }
        >

        expect(msgs.map((msg) => msg.contentRoot.innerHTML)).toEqual([
            'Greetings John Doe',
            'Welcome to the test app',
            '<em>New</em>',
        ])
        expect(msgs.at(-1)?.contentRoot.querySelector('em')).not.toBeNull()
    })

    it('should render the key if no message is found', async () => {
        initIntl({ locale: 'en', messages: {} })

        html`<intl-msg key="missing"></intl-msg>`.render(document.body)
        await wait()

        const el = document.body.firstElementChild as HTMLElement & {
            contentRoot: HTMLElement
        }

        expect(el.contentRoot.textContent).toBe('missing')
        expect(console.error).toHaveBeenCalledWith(
            '[intl-msg] text for key of "missing" was not found. Rendering the key itself as backup.'
        )
    })

    it('should render fallback text when child text content exists', async () => {
        initIntl({ locale: 'en', messages: {} })

        html`<intl-msg key="missing">Fallback text</intl-msg>`.render(
            document.body
        )
        await wait()

        const el = document.body.firstElementChild as HTMLElement & {
            contentRoot: HTMLElement
        }

        expect(el.contentRoot.textContent).toBe('Fallback text')
    })

    it('should re-render when the runtime messages update', async () => {
        const runtime = initIntl({
            locale: 'en',
            messages: { title: 'Before' },
        })

        html`<intl-msg key="title"></intl-msg>`.render(document.body)
        await wait()

        const el = document.body.firstElementChild as HTMLElement & {
            contentRoot: HTMLElement
        }

        expect(el.contentRoot.textContent).toBe('Before')

        runtime.setMessages({ title: 'After' })
        await wait()

        expect(el.contentRoot.textContent).toBe('After')
    })
})
