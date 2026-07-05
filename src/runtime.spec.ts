import {
    createIntl,
    destroyIntl,
    getLocaleDirection,
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

    it('falls back locale direction to ltr when direction cannot be resolved', () => {
        expect(getLocaleDirection('not-a-valid-locale@@')).toBe('ltr')
    })

    it('covers empty keys and non-object path access in messages', () => {
        const intl = createIntl({
            locale: 'en-US',
            messages: {
                flat: 'Flat',
                nested: { value: 'Nested' },
            },
        })

        expect(intl.getMessage('')).toBeUndefined()
        expect(intl.getMessage('flat')).toBe('Flat')
        expect(intl.getMessage('flat.value')).toBeUndefined()
        expect(intl.getMessage('nested.value')).toBe('Nested')
        expect(intl.getMessage('nested.value.missing')).toBeUndefined()
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

    it('supports explicit fallback messages and fallback locale from constructor options', () => {
        const intl = createIntl({
            locale: 'en-US',
            fallbackLocale: 'en',
            fallbackMessages: { nested: { hello: 'Fallback' } },
        })

        expect(intl.fallbackLocale).toBe('en')
        expect(intl.getMessage('nested.hello')).toBe('Fallback')
        expect(intl.getMessage('missing')).toBeUndefined()
    })

    it('sets fallback messages without requiring an explicit locale', () => {
        const intl = createIntl({
            locale: 'en-US',
            fallbackLocale: 'en',
        })

        intl.setFallbackMessages({ fallback: 'Fallback message' })

        expect(intl.getMessage('fallback')).toBe('Fallback message')
        expect(intl.fallbackMessages.fallback).toBe('Fallback message')
    })

    it('loads locale messages from explicit absolute src URLs', async () => {
        ;(window.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ hello: 'Hello' }),
        })

        const intl = createIntl({
            locale: 'en-US',
            src: 'https://cdn.example.com/en.json',
            srcDir: '',
        })

        await intl.loadLocale()

        expect(window.fetch).toHaveBeenCalledWith(
            'https://cdn.example.com/en.json',
            expect.objectContaining({ signal: expect.any(AbortSignal) })
        )
        expect(intl.getMessage('hello')).toBe('Hello')
    })

    it('uses empty source config to return empty locale messages', async () => {
        const intl = createIntl({
            locale: 'en-US',
            srcDir: '',
        })

        await intl.loadLocale()

        expect(intl.status).toBe('ready')
        expect(intl.getMessage('anything')).toBeUndefined()
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
        expect(initIntl().locale).toBe('en')
        resetIntl()

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

    it('reuses an in-flight locale load when called repeatedly', async () => {
        const loader = jest.fn(
            () =>
                new Promise<Record<string, string>>((resolve) => {
                    setTimeout(() => resolve({ ok: 'value' }), 0)
                })
        )
        const intl = createIntl({
            locale: 'en-US',
            loader,
        })

        const pending1 = intl.loadLocale()
        const pending2 = intl.loadLocale()

        const [snapshot1, snapshot2] = await Promise.all([pending1, pending2])

        expect(snapshot1).toEqual(snapshot2)
        expect(loader).toHaveBeenCalledWith('en-US', expect.any(AbortSignal))
        expect(loader).toHaveBeenCalledWith('en', expect.any(AbortSignal))
        expect(loader).toHaveBeenCalledTimes(2)
    })

    it('reads from cached messages on second lookup', () => {
        const intl = createIntl({
            locale: 'en-US',
            messages: {
                nested: {
                    title: 'Title',
                },
            },
        })

        expect(intl.getMessage('nested')).toEqual({ title: 'Title' })
        expect(intl.getMessage('nested.title')).toBe('Title')

        const nested = intl.messages.nested as Record<string, string>
        nested.title = 'Updated Title'

        expect(intl.getMessage('nested.title')).toBe('Title')
        expect(intl.getMessage('nested')).toEqual({ title: 'Updated Title' })
    })

    it('returns the current snapshot when loading a locale on a destroyed runtime', async () => {
        const loader = jest.fn(() => ({ title: 'Loaded' }))
        const intl = createIntl({
            locale: 'en-US',
            loader,
        })

        intl.destroy()

        const snapshot = await intl.loadLocale()

        expect(snapshot.status).toBe('idle')
        expect(loader).not.toHaveBeenCalled()
    })

    it('supports nested object message merges across parent-child runtime scopes', () => {
        const parent = createIntl({
            locale: 'en-US',
            messages: {
                nested: {
                    title: 'Parent',
                    shared: {
                        section: 'shared',
                    },
                },
            },
        })

        const child = createIntl({
            parentScope: parent,
            messages: {
                nested: {
                    body: 'Child',
                    shared: {
                        item: 'child-shared',
                    },
                },
            },
        })

        expect(child.getMessage('nested.title')).toBe('Parent')
        expect(child.getMessage('nested.body')).toBe('Child')
        expect(child.getMessage('nested.shared.item')).toBe('child-shared')
        expect(child.getMessage('nested.shared.section')).toBe('shared')
    })

    it('returns an error snapshot when fetch is not available for source loading', async () => {
        const originalFetch = window.fetch
        delete (window as unknown as { fetch?: typeof fetch }).fetch

        const intl = createIntl({
            locale: 'en-US',
            src: '/locales/en-US.json',
        })

        const snapshot = await intl.loadLocale()

        expect(snapshot.status).toBe('error')
        expect(snapshot.error).toBeInstanceOf(Error)
        expect((snapshot.error as Error).message).toContain(
            'fetch is not available for locale loading.'
        )

        window.fetch = originalFetch
    })

    it('returns in-flight locale load snapshot when runtime is destroyed', async () => {
        const aborts: AbortSignal[] = []
        const intl = createIntl({
            locale: 'en-US',
            loader: (_locale, signal) => {
                if (signal) {
                    aborts.push(signal)
                }

                return new Promise((_, reject) => {
                    signal?.addEventListener('abort', () => reject(new Error('aborted')))
                })
            },
        })

        const snapshotPromise = intl.loadLocale()
        await Promise.resolve()

        intl.destroy()

        const snapshot = await snapshotPromise

        expect(snapshot).toBeDefined()
        expect(snapshot.status).toBe('loading')
        expect(aborts.some((signal) => signal.aborted)).toBe(true)
    })

    it('returns existing snapshot when setLocale receives unchanged locale', async () => {
        const intl = createIntl({
            locale: 'en-US',
            messages: { hello: 'Hello' },
        })

        const snapshot = await intl.setLocale('en-US')

        expect(snapshot.locale).toBe('en-US')
        expect(snapshot.status).toBe('ready')
    })

    it('allows setLocale to skip updates when locale is empty', async () => {
        const intl = createIntl({
            locale: 'en-US',
        })
        const snapshot = await intl.setLocale('')

        expect(snapshot.locale).toBe('en-US')
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
        const loader = jest.fn((locale: string) => {
            if (locale === 'en') {
                return { fallback: 'Fallback text' }
            }

            return { hello: locale }
        })
        const intl = createIntl({
            locale: 'en-US',
            loader,
        })

        await intl.loadLocale()
        await intl.loadLocale()

        expect(loader).toHaveBeenCalledTimes(2)
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
        const waitForLoader = async (locale: string) => {
            while (!resolvers.get(locale)?.length) {
                await new Promise((resolve) => setTimeout(resolve, 0))
            }

            return resolvers.get(locale) as Array<
                (messages: Record<string, unknown>) => void
            >
        }
        const resolvers = new Map<
            string,
            Array<(messages: Record<string, unknown>) => void>
        >()
        const intl = createIntl({
            locale: 'en-US',
            loader: (locale, signal) => {
                if (signal) {
                    signals.push(signal)
                }

                return new Promise((resolve) => {
                    const list = resolvers.get(locale) || []
                    list.push(resolve)
                    resolvers.set(locale, list)
                })
            },
        })

        const staleLoad = intl.loadLocale()
        const currentLoad = intl.setLocale('pt-CV')

        ;(await waitForLoader('en-US')).shift()?.({ hello: 'stale' })
        ;(await waitForLoader('pt-CV')).shift()?.({ hello: 'current' })
        ;(await waitForLoader('en')).shift()?.({ fallback: 'fallback' })

        await staleLoad
        await currentLoad

        expect(signals[0].aborted).toBe(true)
        expect(intl.locale).toBe('pt-CV')
        expect(intl.getMessage('hello')).toBe('current')
        expect(intl.getMessage('fallback')).toBe('fallback')
    })
})
