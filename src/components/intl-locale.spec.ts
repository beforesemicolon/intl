import initLocale, { getIntlLocaleRuntime } from './intl-locale'
import * as WC from '@beforesemicolon/web-component'
import { getIntl, resetIntl } from '../runtime'

initLocale(WC)

const { html } = WC

const waitForLocaleEvent = (type: string) => {
    return new Promise<CustomEvent>((resolve) => {
        document.body.addEventListener(type, resolve as EventListener, {
            once: true,
        })
    })
}

describe('intl-locale', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = 'en'
        document.documentElement.dir = ''
    })

    afterEach(() => {
        resetIntl()
    })

    it('should load translation file with src', async () => {
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ title: 'Title' }),
            } as Response)
        })
        const localeLoad = waitForLocaleEvent('locale-load')

        html`<intl-locale src="/locales/en.json"></intl-locale>`.render(
            document.body
        )
        const event = await localeLoad

        expect(window.fetch).toHaveBeenCalledWith(
            'http://localhost/locales/en.json',
            expect.objectContaining({ signal: expect.any(AbortSignal) })
        )
        expect(event.detail.messages.title).toBe('Title')
        expect(console.error).not.toHaveBeenCalled()
    })

    it('should fail to load translation file with src', async () => {
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
            return Promise.resolve({
                ok: false,
                status: 404,
                json: () => Promise.resolve({}),
            } as Response)
        })
        const localeError = waitForLocaleEvent('locale-error')

        html`<intl-locale src="/locales/en.json"></intl-locale>`.render(
            document.body
        )
        const event = await localeError

        expect(window.fetch).toHaveBeenCalledWith(
            'http://localhost/locales/en.json',
            expect.objectContaining({ signal: expect.any(AbortSignal) })
        )
        expect(event.detail.status).toBe('error')
        await Promise.resolve()
        expect(console.error).toHaveBeenCalledWith(
            new Error(
                '[intl] Loading "http://localhost/locales/en.json" failed with status code 404'
            )
        )
    })

    it('should load translation file with srcDir', async () => {
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ title: 'Title' }),
            } as Response)
        })
        const localeLoad = waitForLocaleEvent('locale-load')

        html`<intl-locale src-dir="/locales"></intl-locale>`.render(
            document.body
        )
        const event = await localeLoad

        expect(window.fetch).toHaveBeenCalledWith(
            'http://localhost/locales/en.json',
            expect.objectContaining({ signal: expect.any(AbortSignal) })
        )
        expect(event.detail.messages.title).toBe('Title')
        expect(console.error).not.toHaveBeenCalled()
    })

    it('should fail to load translation file with srcDir', async () => {
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
            return Promise.resolve({
                ok: false,
                status: 404,
                json: () => Promise.resolve({}),
            } as Response)
        })
        const localeError = waitForLocaleEvent('locale-error')

        document.documentElement.lang = 'pt'

        html`<intl-locale src-dir="/locales"></intl-locale>`.render(
            document.body
        )
        const event = await localeError

        expect(window.fetch).toHaveBeenCalledWith(
            'http://localhost/locales/pt.json',
            expect.objectContaining({ signal: expect.any(AbortSignal) })
        )
        expect(event.detail.status).toBe('error')
        await Promise.resolve()
        expect(console.error).toHaveBeenCalledWith(
            new Error(
                '[intl] Loading "http://localhost/locales/pt.json" failed with status code 404'
            )
        )
    })

    it('should dispatch locale change after loading', async () => {
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ title: 'Titulo' }),
            } as Response)
        })
        const localeChange = waitForLocaleEvent('locale-change')

        html`<intl-locale locale="pt-CV" src-dir="/locales"></intl-locale>`.render(
            document.body
        )
        const event = await localeChange

        expect(event.detail.locale).toBe('pt-CV')
        expect(event.detail.status).toBe('ready')
    })

    it('should create nested runtime scopes that inherit parent messages', async () => {
        jest.spyOn(window, 'fetch').mockImplementation((url) => {
            const href = String(url)

            return Promise.resolve({
                ok: true,
                status: 200,
                json: () =>
                    Promise.resolve(
                        href.endsWith('/pt-CV.json')
                            ? { childOnly: 'Child' }
                            : { shared: 'Shared' }
                    ),
            } as Response)
        })
        const loaded: Array<CustomEvent['detail']> = []
        const allLoaded = new Promise<void>((resolve) => {
            document.body.addEventListener('locale-load', (event) => {
                loaded.push((event as CustomEvent).detail)

                if (loaded.length === 2) {
                    resolve()
                }
            })
        })

        html`
            <intl-locale locale="en-US" src-dir="/locales" fallback>
                <intl-locale locale="pt-CV" src-dir="/locales" fallback>
                    <span id="nested-content"></span>
                </intl-locale>
            </intl-locale>
        `.render(document.body)
        await allLoaded

        const child = loaded.find(({ locale }) => locale === 'pt-CV')

        expect(child.parentScope.locale).toBe('en-US')
        expect(child.messages.shared).toBe('Shared')
        expect(child.messages.childOnly).toBe('Child')
    })

    it('should expose the nearest provider runtime to descendants', async () => {
        const localeChange = waitForLocaleEvent('locale-change')

        html`
            <intl-locale locale="en-US" fallback>
                <span id="inside-provider"></span>
            </intl-locale>
        `.render(document.body)
        await localeChange

        const runtime = getIntlLocaleRuntime(
            document.getElementById('inside-provider')
        )

        expect(runtime?.locale).toBe('en-US')
    })

    it('should initialize the default runtime for a root provider', async () => {
        const localeChange = waitForLocaleEvent('locale-change')

        html`<intl-locale locale="en-US"></intl-locale>`.render(document.body)
        await localeChange

        expect(getIntl().locale).toBe('en-US')
    })

    it('should update document language and direction only when requested', async () => {
        const localeChange = waitForLocaleEvent('locale-change')

        html`<intl-locale locale="ar" update-document></intl-locale>`.render(
            document.body
        )
        await localeChange

        expect(document.documentElement.lang).toBe('ar')
        expect(document.documentElement.dir).toBe('rtl')
    })

    it('should render slotted content after ready unless fallback rendering is enabled', async () => {
        const localeChange = waitForLocaleEvent('locale-change')

        html`
            <intl-locale locale="en-US">
                <span>Ready</span>
            </intl-locale>
        `.render(document.body)
        const provider = document.querySelector('intl-locale') as HTMLElement & {
            contentRoot: HTMLElement
        }

        expect(provider.contentRoot.innerHTML).toBe('')

        await localeChange
        await new Promise((resolve) => setTimeout(resolve, 0))

        expect(provider.contentRoot.innerHTML).toBe('<slot></slot>')
    })
})
