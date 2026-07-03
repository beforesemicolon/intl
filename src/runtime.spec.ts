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
})
