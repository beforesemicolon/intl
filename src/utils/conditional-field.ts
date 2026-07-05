export const conditionalField = (key: string, value: unknown) => {
    if (value === undefined || value === null) {
        return {}
    }

    if (typeof value === 'string' && !value) {
        return {}
    }

    if (Array.isArray(value) && value.length === 0) {
        return {}
    }

    if (value instanceof Set && value.size === 0) {
        return {}
    }

    return { [key]: value }
}
