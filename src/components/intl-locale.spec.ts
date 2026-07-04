import initLocale from './intl-locale'
import * as WC from '@beforesemicolon/web-component'

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
})
