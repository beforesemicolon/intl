import { conditionalField } from './conditional-field'

describe('conditionalField', () => {
    it('returns an empty object when value is nullish, empty, or empty collection', () => {
        expect(conditionalField('title', undefined)).toEqual({})
        expect(conditionalField('title', '')).toEqual({})
        expect(conditionalField('title', [])).toEqual({})
        expect(conditionalField('title', new Set())).toEqual({})
    })

    it('returns key/value pair for truthy values', () => {
        expect(conditionalField('title', 'Dashboard')).toEqual({
            title: 'Dashboard',
        })

        expect(conditionalField('count', 1)).toEqual({
            count: 1,
        })

        expect(conditionalField('items', ['a', 'b'])).toEqual({
            items: ['a', 'b'],
        })
    })
})
