import './components/intl-locale'
import initLocale from './components/intl-locale'
import initLocaleMsg from './components/intl-msg'
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

if (!window.BFS?.MARKUP || !window.BFS.WebComponent) {
    throw new Error(
        `BFS.MARKUP and BFS.WebComponent are required in order for BFS.INTL to work. Please add the following script to the HTML head tag "<script src="https://unpkg.com/@beforesemicolon/web-component/dist/client.js"></script>"`
    )
}

if (window.BFS) {
    const BFS = { ...window.BFS, ...window.BFS?.MARKUP }
    
    const onLocaleMessagesLoaded = initLocale(BFS)
    const intlMsg = initLocaleMsg(onLocaleMessagesLoaded, BFS)

    window.BFS = {
        ...(window.BFS || {}),
        INTL: {
            onLocaleMessagesLoaded,
            intlMsg
        },
    }
}
