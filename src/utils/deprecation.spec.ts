import { warnDeprecatedAlias } from './deprecation'

describe('warnDeprecatedAlias', () => {
    const originalProcess = (globalThis as { process?: unknown }).process

    afterEach(() => {
        ;(globalThis as { process?: unknown }).process = originalProcess
        const warn = console.warn as unknown as { mockRestore?: () => void }

        warn.mockRestore?.()
    })

    it('warns once for each deprecated alias', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})

        warnDeprecatedAlias('old-prop', 'new-prop')
        warnDeprecatedAlias('old-prop', 'new-prop')

        expect(warn).toHaveBeenCalledTimes(1)
        expect(warn).toHaveBeenCalledWith(
            '[intl] "old-prop" is deprecated and will be removed in a future release. Use "new-prop" instead.'
        )
    })

    it('does not warn in production', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})

        ;(globalThis as { process?: { env?: { NODE_ENV?: string } } }).process =
            {
                env: { NODE_ENV: 'production' },
            }

        warnDeprecatedAlias('prod-old-prop', 'prod-new-prop')

        expect(warn).not.toHaveBeenCalled()
    })
})
