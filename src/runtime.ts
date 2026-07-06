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
    baseUrl?: string
    loader?: (
        locale: string,
        signal?: AbortSignal
    ) => Promise<IntlMessages> | IntlMessages
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
    setFallbackMessages(
        messages: IntlMessages,
        locale?: string
    ): IntlRuntimeSnapshot
    getMessage<T = unknown>(key: string): T | undefined
    subscribe(listener: IntlRuntimeListener): () => void
    destroy(): void
}

const DEFAULT_LOCALE = 'en'
const DEFAULT_FALLBACK_LOCALE = 'en'
const DEFAULT_SRC_DIR = '/locales'
let defaultRuntime: IntlRuntime | null = null

const hasDocument = () => typeof document !== 'undefined'
const hasFetch = () => typeof fetch !== 'undefined'
const hasAbortController = () => typeof AbortController !== 'undefined'

const getDocumentLocale = () => {
    if (hasDocument() && document.documentElement.lang) {
        return document.documentElement.lang
    }

    return undefined
}

const normalizeLocaleFromDocument = (locale?: string) => {
    return locale || DEFAULT_LOCALE
}

const resolveLocale = (locale?: string, parentScope?: IntlRuntime) => {
    if (locale) {
        return locale
    }

    if (parentScope?.locale) {
        return parentScope.locale
    }

    return normalizeLocaleFromDocument(getDocumentLocale())
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

const getByPath = <T = unknown>(
    source: IntlMessages,
    path: string
): T | undefined => {
    return path.split('.').reduce<unknown>((acc, key) => {
        if (!isObject(acc)) {
            return undefined
        }

        return acc[key]
    }, source) as T | undefined
}

const resolveSourceUrl = (
    locale: string,
    { src, srcDir, baseUrl }: IntlRuntimeOptions
) => {
    const normalizedSrcDir = srcDir
        ? srcDir.replace(/^\/+/, '').replace(/\/$/, '')
        : srcDir

    const path = src || `${normalizedSrcDir}/${locale}.json`

    if (/^https?:\/\//.test(path)) {
        return path
    }

    const base = baseUrl || globalThis.location?.origin || 'http://localhost'
    return new URL(path, base).href
}

class ScopedIntlRuntime implements IntlRuntime {
    #locale: string
    #fallbackLocale?: string
    #messages: IntlMessages
    #fallbackMessages: IntlMessages
    #localeMessages = new Map<string, IntlMessages>()
    #loadedLocales = new Set<string>()
    #loadingLocales = new Map<string, Promise<IntlRuntimeSnapshot>>()
    #status: IntlRuntimeStatus = 'idle'
    #error?: unknown
    #subs = new Set<IntlRuntimeListener>()
    #options: IntlRuntimeOptions
    #destroyed = false
    #abortController?: AbortController

    readonly parentScope?: IntlRuntime
    readonly formatterCache = new Map<string, unknown>()
    readonly messageCache = new Map<string, unknown>()

    constructor(options: IntlRuntimeOptions) {
        this.#options = options
        this.parentScope = options.parentScope
        this.#locale = resolveLocale(options.locale, options.parentScope)
        this.#fallbackLocale =
            options.fallbackLocale || options.parentScope?.fallbackLocale
        this.#messages = mergeMessages(
            options.parentScope?.messages,
            options.messages
        )
        this.#fallbackMessages = mergeMessages(
            options.parentScope?.fallbackMessages,
            options.fallbackMessages
        )

        if (options.messages) {
            this.#localeMessages.set(this.#locale, options.messages)
            this.#loadedLocales.add(this.#locale)
            this.#status = 'ready'
        }

        if (options.fallbackMessages && this.#fallbackLocale) {
            this.#localeMessages.set(
                this.#fallbackLocale,
                options.fallbackMessages
            )
            this.#loadedLocales.add(this.#fallbackLocale)
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

    #clearCaches = () => {
        this.messageCache.clear()
        this.formatterCache.clear()
    }

    #applyLocaleMessages = (locale: string) => {
        const parentMessages = this.parentScope?.messages
        const currentMessages = this.#localeMessages.get(locale) || {}
        this.#messages = mergeMessages(parentMessages, currentMessages)

        const fallbackMessages = this.#fallbackLocale
            ? this.#localeMessages.get(this.#fallbackLocale)
            : undefined

        this.#fallbackMessages = mergeMessages(
            this.parentScope?.fallbackMessages,
            fallbackMessages,
            this.#fallbackMessages
        )
        this.#clearCaches()
    }

    #loadMessages = async (
        locale: string,
        signal?: AbortSignal
    ): Promise<IntlMessages> => {
        if (this.#options.loader) {
            return this.#options.loader(locale, signal)
        }

        if (this.#options.src || this.#options.srcDir) {
            if (!hasFetch()) {
                throw new Error(
                    '[intl] fetch is not available for locale loading.'
                )
            }

            const url = resolveSourceUrl(locale, this.#options)
            const response = await fetch(url, { signal })

            if (!response.ok) {
                throw new Error(
                    `[intl] Loading "${url}" failed with status code ${response.status}`
                )
            }

            return (await response.json()) as IntlMessages
        }

        return {}
    }

    setMessages = (messages: IntlMessages, locale = this.#locale) => {
        this.#localeMessages.set(locale, messages)
        this.#loadedLocales.add(locale)
        this.#applyLocaleMessages(this.#locale)
        this.#status = 'ready'
        this.#error = undefined
        return this.#notify()
    }

    setFallbackMessages = (
        messages: IntlMessages,
        locale = this.#fallbackLocale
    ) => {
        if (locale) {
            this.#localeMessages.set(locale, messages)
            this.#loadedLocales.add(locale)
        }

        this.#fallbackMessages = mergeMessages(
            this.parentScope?.fallbackMessages,
            messages
        )
        this.#clearCaches()
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
            this.#applyLocaleMessages(this.#locale)
            this.#status = 'ready'
            this.#error = undefined
            return this.#notify()
        }

        const existingLoad = this.#loadingLocales.get(locale)
        if (existingLoad) {
            return existingLoad
        }

        if (hasAbortController()) {
            this.#abortController?.abort()
            this.#abortController = new AbortController()
        }

        const signal = this.#abortController?.signal
        this.#status = 'loading'
        this.#error = undefined
        this.#notify()

        const load = (async () => {
            try {
                const messages = await this.#loadMessages(locale, signal)

                if (signal?.aborted || this.#destroyed) {
                    return this.snapshot()
                }

                this.#localeMessages.set(locale, messages || {})
                this.#loadedLocales.add(locale)

                if (locale === this.#fallbackLocale) {
                    this.#fallbackMessages = mergeMessages(
                        this.parentScope?.fallbackMessages,
                        messages || {}
                    )
                }

                if (locale === this.#locale) {
                    this.#applyLocaleMessages(locale)
                }

                if (
                    this.#fallbackLocale &&
                    this.#fallbackLocale !== locale &&
                    !this.#loadedLocales.has(this.#fallbackLocale)
                ) {
                    try {
                        const fallbackMessages = await this.#loadMessages(
                            this.#fallbackLocale,
                            signal
                        )

                        if (!signal?.aborted && !this.#destroyed) {
                            this.#localeMessages.set(
                                this.#fallbackLocale,
                                fallbackMessages || {}
                            )
                            this.#loadedLocales.add(this.#fallbackLocale)
                            this.#fallbackMessages = mergeMessages(
                                this.parentScope?.fallbackMessages,
                                fallbackMessages || {}
                            )
                            this.#applyLocaleMessages(this.#locale)
                        }
                    } catch {
                        // Fallback locale loading should not fail the primary locale load.
                    }
                }

                this.#status = 'ready'
                this.#error = undefined
                return this.#notify()
            } catch (error) {
                if (signal?.aborted || this.#destroyed) {
                    return this.snapshot()
                }

                this.#status = 'error'
                this.#error = error
                return this.#notify()
            } finally {
                this.#loadingLocales.delete(locale)
            }
        })()

        this.#loadingLocales.set(locale, load)
        return load
    }

    setLocale = async (locale: string) => {
        if (!locale || locale === this.#locale) {
            return this.snapshot()
        }

        this.#locale = locale
        this.#clearCaches()
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
        this.#abortController?.abort()
        this.#subs.clear()
        this.#loadingLocales.clear()
        this.formatterCache.clear()
        this.messageCache.clear()
        this.#loadedLocales.clear()
        this.#localeMessages.clear()
    }
}

export const createIntl = (options: IntlRuntimeOptions = {}): IntlRuntime => {
    const defaultedOptions: IntlRuntimeOptions = {
        ...options,
        fallbackLocale:
            options.fallbackLocale ??
            options.parentScope?.fallbackLocale ??
            DEFAULT_FALLBACK_LOCALE,
        srcDir: options.srcDir ?? DEFAULT_SRC_DIR,
    }

    return new ScopedIntlRuntime(defaultedOptions)
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
