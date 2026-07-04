import {
    createIntl,
    destroyIntl,
    getIntl,
    initIntl,
    loadLocale,
    resetIntl,
    setLocale,
    subscribeIntl,
} from './runtime'

describe('intl runtime', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = ''
    })

    afterEach(() => {
        resetIntl()
    })

    it('creates a runtime using the provided locale and messages', () => {
        const intl = createIntl({
            locale: 'en-US',
            messages: {
                hello: 'Hello',
                nested: { title: 'Dashboard' },
            },
        })

        expect(intl.locale).toBe('en-US')
        expect(intl.status).toBe('ready')
        expect(intl.getMessage('hello')).toBe('Hello')
        expect(intl.getMessage('nested.title')).toBe('Dashboard')
    })

    it('uses document language when no locale is provided', () => {
        document.documentElement.lang = 'pt-CV'

        const intl = createIntl()

        expect(intl.locale).toBe('pt-CV')
    })

    it('defaults fallback locale to en when no fallback locale is provided', async () => {
        const loader = jest.fn((locale: string) => {
            if (locale === 'en') {
                return { fallback: 'Fallback text' }
            }

            return { primary: 'Primary text' }
        })
        const intl = createIntl({
            locale: 'pt-CV',
            loader,
        })

        await intl.loadLocale()

        expect(intl.fallbackLocale).toBe('en')
        expect(loader).toHaveBeenCalledWith('en', expect.any(AbortSignal))
        expect(intl.getMessage('fallback')).toBe('Fallback text')
    })

    it('creates nested runtime scopes that inherit parent locale and messages', () => {
        const parent = createIntl({
            locale: 'en-US',
            messages: {
                shared: 'Shared',
                parentOnly: 'Parent',
            },
        })
        const child = createIntl({
            parentScope: parent,
            messages: {
                childOnly: 'Child',
            },
        })

        expect(child.locale).toBe('en-US')
        expect(child.parentScope).toBe(parent)
        expect(child.getMessage('shared')).toBe('Shared')
        expect(child.getMessage('parentOnly')).toBe('Parent')
        expect(child.getMessage('childOnly')).toBe('Child')
    })

    it('allows child scopes to override parent locale and messages', () => {
        const parent = createIntl({
            locale: 'en-US',
            messages: {
                hello: 'Hello',
            },
        })
        const child = createIntl({
            locale: 'pt-CV',
            parentScope: parent,
            messages: {
                hello: 'Oi',
            },
        })

        expect(child.locale).toBe('pt-CV')
        expect(child.getMessage('hello')).toBe('Oi')
    })

    it('initializes and returns the default runtime', () => {
        const intl = initIntl({
            locale: 'en-US',
            messages: { hello: 'Hello' },
        })

        expect(getIntl()).toBe(intl)
        expect(getIntl().getMessage('hello')).toBe('Hello')
    })

    it('supports global setLocale and loadLocale helpers', async () => {
        const intl = initIntl({
            locale: 'en-US',
            loader: (locale) => ({ hello: locale }),
        })

        await loadLocale('en-US')
        expect(intl.getMessage('hello')).toBe('en-US')

        await setLocale('pt-CV')
        expect(intl.locale).toBe('pt-CV')
        expect(intl.getMessage('hello')).toBe('pt-CV')
    })

    it('notifies subscribers and returns an unsubscribe function', async () => {
        const intl = initIntl({
            locale: 'en-US',
            loader: (locale) => ({ locale }),
        })
        const listener = jest.fn()
        const unsubscribe = subscribeIntl(listener)

        await intl.setLocale('pt-CV')
        unsubscribe()
        await intl.setLocale('fr-FR')

        expect(listener).toHaveBeenCalled()
        expect(listener.mock.calls.some(([snapshot]) => snapshot.locale === 'pt-CV')).toBe(true)
        expect(listener.mock.calls.some(([snapshot]) => snapshot.locale === 'fr-FR')).toBe(false)
    })

    it('destroys the default runtime', () => {
        const intl = initIntl({ locale: 'en-US' })
        destroyIntl()

        expect(getIntl()).not.toBe(intl)
    })

    it('loads locale messages from a loader and caches loaded locales', async () => {
        const loader = jest.fn((locale: string) => ({ hello: locale }))
        const intl = createIntl({
            locale: 'en-US',
            loader,
        })

        await intl.loadLocale()
        await intl.loadLocale()

        expect(loader).toHaveBeenCalledTimes(1)
        expect(intl.status).toBe('ready')
        expect(intl.loadedLocales.has('en-US')).toBe(true)
        expect(intl.getMessage('hello')).toBe('en-US')
    })

    it('loads locale messages from src', async () => {
        ;(window.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ hello: 'Hello' }),
        })

        const intl = createIntl({
            locale: 'en-US',
            src: '/locales/en-US.json',
        })

        await intl.loadLocale()

        expect(window.fetch).toHaveBeenCalledWith(
            'http://localhost/locales/en-US.json',
            expect.objectContaining({ signal: expect.any(AbortSignal) })
        )
        expect(intl.getMessage('hello')).toBe('Hello')
    })

    it('loads locale messages from srcDir', async () => {
        ;(window.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ hello: 'Oi' }),
        })

        const intl = createIntl({
            locale: 'pt-CV',
            srcDir: '/locales',
        })

        await intl.loadLocale()

        expect(window.fetch).toHaveBeenCalledWith(
            'http://localhost/locales/pt-CV.json',
            expect.objectContaining({ signal: expect.any(AbortSignal) })
        )
        expect(intl.getMessage('hello')).toBe('Oi')
    })

    it('defaults srcDir to /locales when loading locale messages', async () => {
        ;(window.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ hello: 'Hello' }),
        })

        const intl = createIntl({ locale: 'en-US' })

        await intl.loadLocale()

        expect(window.fetch).toHaveBeenCalledWith(
            'http://localhost/locales/en-US.json',
            expect.objectContaining({ signal: expect.any(AbortSignal) })
        )
    })

    it('loads fallback locale messages', async () => {
        const loader = jest.fn((locale: string) => {
            return locale === 'pt-CV'
                ? { hello: 'Oi' }
                : { fallbackOnly: 'Fallback' }
        })
        const intl = createIntl({
            locale: 'pt-CV',
            fallbackLocale: 'en',
            loader,
        })

        await intl.loadLocale()

        expect(loader).toHaveBeenCalledWith('pt-CV', expect.any(AbortSignal))
        expect(loader).toHaveBeenCalledWith('en', expect.any(AbortSignal))
        expect(intl.getMessage('hello')).toBe('Oi')
        expect(intl.getMessage('fallbackOnly')).toBe('Fallback')
    })

    it('falls back to parent scope messages', async () => {
        const parent = createIntl({
            locale: 'en-US',
            messages: { parentOnly: 'Parent' },
        })
        const child = createIntl({
            locale: 'pt-CV',
            parentScope: parent,
            loader: () => ({ childOnly: 'Child' }),
        })

        await child.loadLocale()

        expect(child.getMessage('childOnly')).toBe('Child')
        expect(child.getMessage('parentOnly')).toBe('Parent')
    })

    it('exposes error status when locale loading fails', async () => {
        const error = new Error('No locale')
        const intl = createIntl({
            locale: 'en-US',
            loader: () => Promise.reject(error),
        })
        const snapshot = await intl.loadLocale()

        expect(snapshot.status).toBe('error')
        expect(snapshot.error).toBe(error)
        expect(intl.status).toBe('error')
    })

    it('aborts stale locale loads', async () => {
        const signals: AbortSignal[] = []
        const resolvers = new Map<string, (messages: Record<string, unknown>) => void>()
        const intl = createIntl({
            locale: 'en-US',
            loader: (locale, signal) => {
                if (signal) {
                    signals.push(signal)
                }

                return new Promise((resolve) => {
                    resolvers.set(locale, resolve)
                })
            },
        })

        const staleLoad = intl.loadLocale()
        const currentLoad = intl.setLocale('pt-CV')

        resolvers.get('en-US')?.({ hello: 'stale' })
        resolvers.get('pt-CV')?.({ hello: 'current' })

        await staleLoad
        await currentLoad

        expect(signals[0].aborted).toBe(true)
        expect(intl.locale).toBe('pt-CV')
        expect(intl.getMessage('hello')).toBe('current')
    })
})
