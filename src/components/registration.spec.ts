describe('component registration entrypoints', () => {
    it('does not register components from runtime or formatter modules', async () => {
        await import('../runtime')
        await import('../formatters')

        expect(customElements.get('intl-number')).toBeUndefined()
        expect(customElements.get('intl-msg')).toBeUndefined()
    })

    it('registers a single component entry independently', async () => {
        const initNumber = (await import('./intl-number')).default
        const WC = await import('@beforesemicolon/web-component')

        expect(customElements.get('intl-number')).toBeUndefined()

        initNumber(WC)

        expect(customElements.get('intl-number')).toBeDefined()
        expect(customElements.get('intl-msg')).toBeUndefined()
    })

    it('registers all components from the root index', async () => {
        await import('../index')

        expect(customElements.get('intl-locale')).toBeDefined()
        expect(customElements.get('intl-msg')).toBeDefined()
        expect(customElements.get('intl-number')).toBeDefined()
        expect(customElements.get('intl-datetime')).toBeDefined()
        expect(customElements.get('intl-duration')).toBeDefined()
        expect(customElements.get('intl-rel-time')).toBeDefined()
        expect(customElements.get('intl-list')).toBeDefined()
        expect(customElements.get('intl-name')).toBeDefined()
        expect(customElements.get('intl-plural')).toBeDefined()
    })
})
