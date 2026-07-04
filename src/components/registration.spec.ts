describe('component registration entrypoints', () => {
    it('does not register components from runtime or formatter modules', async () => {
        await import('../runtime')
        await import('../formatters')

        expect(customElements.get('intl-number')).toBeUndefined()
        expect(customElements.get('intl-msg')).toBeUndefined()
    })

    it('registers a single component entry independently', async () => {
        const { intlNumber } = await import('./number')

        expect(typeof intlNumber).toBe('function')
        expect(customElements.get('intl-number')).toBeDefined()
        expect(customElements.get('intl-msg')).toBeUndefined()
    })

    it('registers all components from the root bundle', async () => {
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
