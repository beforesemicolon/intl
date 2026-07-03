export type IntlDirection = 'ltr' | 'rtl'
export type IntlRuntimeStatus = 'idle' | 'loading' | 'ready' | 'error'

export type IntlMessages = Record<string, unknown>

export interface IntlRuntimeSnapshot {
    locale: string
    fallbackLocale?: string
    messages: IntlMessages
    fallbackMessages: IntlMessages
    direction: IntlDirection
    loadedLocales: Set<string>
    status: IntlRuntimeStatus
    error?: unknown
    parentScope?: IntlRuntime
}

export type IntlRuntimeListener = (snapshot: IntlRuntimeSnapshot) => void

export interface IntlRuntimeOptions {
    locale?: string
    fallbackLocale?: string
    messages?: IntlMessages
    fallbackMessages?: IntlMessages
    src?: string
    srcDir?: string
    loader?: (locale: string) => Promise<IntlMessages> | IntlMessages
    parentScope?: IntlRuntime
}

export interface IntlRuntime {
    readonly locale: string
    readonly fallbackLocale?: string
    readonly messages: IntlMessages
    readonly fallbackMessages: IntlMessages
    readonly direction: IntlDirection
    readonly loadedLocales: Set<string>
    readonly status: IntlRuntimeStatus
    readonly error?: unknown
    readonly parentScope?: IntlRuntime
    readonly formatterCache: Map<string, unknown>
    readonly messageCache: Map<string, unknown>

    snapshot(): IntlRuntimeSnapshot
    setLocale(locale: string): Promise<IntlRuntimeSnapshot>
    loadLocale(locale?: string): Promise<IntlRuntimeSnapshot>
    setMessages(messages: IntlMessages, locale?: string): IntlRuntimeSnapshot
    getMessage<T = unknown>(key: string): T | undefined
    subscribe(listener: IntlRuntimeListener): () => void
    destroy(): void
}

const DEFAULT_LOCALE = 'en'
let defaultRuntime: IntlRuntime | null = null

const hasDocument = () => typeof document !== 'undefined'
const hasFetch = () => typeof fetch !== 'undefined'

const getDocumentLocale = () => {
    if (hasDocument() && document.documentElement.lang) {
        return document.documentElement.lang
    }

    return DEFAULT_LOCALE
}

const resolveLocale = (locale?: string, parentScope?: IntlRuntime) => {
    return locale || parentScope?.locale || getDocumentLocale() || DEFAULT_LOCALE
}

export const getLocaleDirection = (locale: string): IntlDirection => {
    try {
        const intlLocale = new Intl.Locale(locale) as Intl.Locale & {
            textInfo?: { direction?: IntlDirection }
        }

        return intlLocale.textInfo?.direction === 'rtl' ? 'rtl' : 'ltr'
    } catch {
        return 'ltr'
    }
}

const isObject = (value: unknown): value is Record<string, unknown> => {
    return !!value && typeof value === 'object' && !Array.isArray(value)
}

const mergeMessages = (...sources: Array<IntlMessages | undefined>) => {
    return sources.reduce<IntlMessages>((acc, source) => {
        if (!source) {
            return acc
        }

        Object.entries(source).forEach(([key, value]) => {
            const current = acc[key]

            if (isObject(current) && isObject(value)) {
                acc[key] = mergeMessages(current, value)
            } else {
                acc[key] = value
            }
        })

        return acc
    }, {})
}

const getByPath = <T = unknown>(source: IntlMessages, path: string): T | undefined => {
    return path.split('.').reduce<unknown>((acc, key) => {
        if (!isObject(acc)) {
            return undefined
        }

        return acc[key]
    }, source) as T | undefined
}

class ScopedIntlRuntime implements IntlRuntime {
    #locale: string
    #fallbackLocale?: string
    #messages: IntlMessages
    #fallbackMessages: IntlMessages
    #loadedLocales = new Set<string>()
    #status: IntlRuntimeStatus = 'idle'
    #error?: unknown
    #subs = new Set<IntlRuntimeListener>()
    #options: IntlRuntimeOptions
    #destroyed = false

    readonly parentScope?: IntlRuntime
    readonly formatterCache = new Map<string, unknown>()
    readonly messageCache = new Map<string, unknown>()

    constructor(options: IntlRuntimeOptions = {}) {
        this.#options = options
        this.parentScope = options.parentScope
        this.#locale = resolveLocale(options.locale, options.parentScope)
        this.#fallbackLocale = options.fallbackLocale || options.parentScope?.fallbackLocale
        this.#messages = mergeMessages(options.parentScope?.messages, options.messages)
        this.#fallbackMessages = mergeMessages(
            options.parentScope?.fallbackMessages,
            options.fallbackMessages
        )

        if (options.messages) {
            this.#loadedLocales.add(this.#locale)
            this.#status = 'ready'
        }
    }

    get locale() {
        return this.#locale
    }

    get fallbackLocale() {
        return this.#fallbackLocale
    }

    get messages() {
        return this.#messages
    }

    get fallbackMessages() {
        return this.#fallbackMessages
    }

    get direction() {
        return getLocaleDirection(this.#locale)
    }

    get loadedLocales() {
        return new Set(this.#loadedLocales)
    }

    get status() {
        return this.#status
    }

    get error() {
        return this.#error
    }

    snapshot = (): IntlRuntimeSnapshot => {
        return {
            locale: this.locale,
            fallbackLocale: this.fallbackLocale,
            messages: this.messages,
            fallbackMessages: this.fallbackMessages,
            direction: this.direction,
            loadedLocales: this.loadedLocales,
            status: this.status,
            error: this.error,
            parentScope: this.parentScope,
        }
    }

    #notify = () => {
        const snapshot = this.snapshot()
        this.#subs.forEach((sub) => sub(snapshot))
        return snapshot
    }

    setMessages = (messages: IntlMessages, locale = this.#locale) => {
        this.#messages = mergeMessages(this.parentScope?.messages, messages)
        this.#loadedLocales.add(locale)
        this.#status = 'ready'
        this.#error = undefined
        this.messageCache.clear()
        return this.#notify()
    }

    getMessage = <T = unknown>(key: string): T | undefined => {
        if (!key) {
            return undefined
        }

        if (this.messageCache.has(key)) {
            return this.messageCache.get(key) as T | undefined
        }

        const value =
            getByPath<T>(this.#messages, key) ??
            getByPath<T>(this.#fallbackMessages, key) ??
            this.parentScope?.getMessage<T>(key)

        this.messageCache.set(key, value)
        return value
    }

    loadLocale = async (locale = this.#locale) => {
        if (this.#destroyed) {
            return this.snapshot()
        }

        if (this.#loadedLocales.has(locale)) {
            this.#status = 'ready'
            return this.#notify()
        }

        this.#status = 'loading'
        this.#error = undefined
        this.#notify()

        try {
            let messages: IntlMessages | undefined

            if (this.#options.loader) {
                messages = await this.#options.loader(locale)
            } else if (this.#options.src || this.#options.srcDir) {
                if (!hasFetch()) {
                    throw new Error('[intl] fetch is not available for locale loading.')
                }

                const src = this.#options.src || `${this.#options.srcDir?.replace(/\/$/, '')}/${locale}.json`
                const response = await fetch(new URL(src, location.origin).href)

                if (!response.ok) {
                    throw new Error(
                        `[intl] Loading "${src}" failed with status code ${response.status}`
                    )
                }

                messages = (await response.json()) as IntlMessages
            } else {
                messages = {}
            }

            return this.setMessages(messages || {}, locale)
        } catch (error) {
            this.#status = 'error'
            this.#error = error
            return this.#notify()
        }
    }

    setLocale = async (locale: string) => {
        if (!locale || locale === this.#locale) {
            return this.snapshot()
        }

        this.#locale = locale
        this.formatterCache.clear()
        this.messageCache.clear()
        return this.loadLocale(locale)
    }

    subscribe = (listener: IntlRuntimeListener) => {
        this.#subs.add(listener)
        listener(this.snapshot())

        return () => {
            this.#subs.delete(listener)
        }
    }

    destroy = () => {
        this.#destroyed = true
        this.#subs.clear()
        this.formatterCache.clear()
        this.messageCache.clear()
        this.#loadedLocales.clear()
    }
}

export const createIntl = (options: IntlRuntimeOptions = {}): IntlRuntime => {
    return new ScopedIntlRuntime(options)
}

export const initIntl = (options: IntlRuntimeOptions = {}) => {
    defaultRuntime?.destroy()
    defaultRuntime = createIntl(options)
    return defaultRuntime
}

export const getIntl = (scope?: IntlRuntime) => {
    if (scope) {
        return scope
    }

    if (!defaultRuntime) {
        defaultRuntime = createIntl()
    }

    return defaultRuntime
}

export const setLocale = (locale: string, scope?: IntlRuntime) => {
    return getIntl(scope).setLocale(locale)
}

export const loadLocale = (locale?: string, scope?: IntlRuntime) => {
    return getIntl(scope).loadLocale(locale)
}

export const subscribeIntl = (
    listener: IntlRuntimeListener,
    scope?: IntlRuntime
) => {
    return getIntl(scope).subscribe(listener)
}

export const destroyIntl = (scope?: IntlRuntime) => {
    const runtime = getIntl(scope)
    runtime.destroy()

    if (!scope && runtime === defaultRuntime) {
        defaultRuntime = null
    }
}

export const resetIntl = () => {
    defaultRuntime?.destroy()
    defaultRuntime = null
}
