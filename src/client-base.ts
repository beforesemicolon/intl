import type { WebComponent } from '@beforesemicolon/web-component'

declare global {
    interface Window {
        BFS: {
            MARKUP: typeof import('@beforesemicolon/web-component')
            INTL: Record<string, unknown>
            WebComponent: typeof WebComponent
        }
    }
}

type IntlComponentInit = (
    deps: typeof import('@beforesemicolon/web-component')
) => void

export const initSingleIntlClient = (
    init: IntlComponentInit,
    apis: Record<string, unknown>
) => {
    if (!window.BFS?.MARKUP || !window.BFS.WebComponent) {
        throw new Error(
            `BFS.MARKUP and BFS.WebComponent are required in order for BFS.INTL to work. Please add the following script to the HTML head tag "<script src="https://unpkg.com/@beforesemicolon/web-component/dist/client.js"></script>"`
        )
    }

    const deps = { ...window.BFS, ...window.BFS.MARKUP }
    init(deps as typeof import('@beforesemicolon/web-component'))

    window.BFS = {
        ...window.BFS,
        INTL: {
            ...(window.BFS.INTL || {}),
            ...apis,
        },
    }
}
