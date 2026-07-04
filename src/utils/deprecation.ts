const warnedAliases = new Set<string>()

const isProduction = () => {
    return (
        (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process
            ?.env?.NODE_ENV === 'production'
    )
}

export const warnDeprecatedAlias = (alias: string, replacement: string) => {
    const key = `${alias}:${replacement}`

    if (isProduction() || warnedAliases.has(key)) {
        return
    }

    warnedAliases.add(key)
    console.warn(
        `[intl] "${alias}" is deprecated and will be removed in a future release. Use "${replacement}" instead.`
    )
}
