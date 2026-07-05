import initLocale from './components/intl-locale'
import initLocaleMsg from './components/intl-msg'
import initLocaleDatetime from './components/intl-datetime'
import initLocaleDuration from './components/intl-duration'
import initLocaleRelativeTime from './components/intl-rel-time'
import initLocaleList from './components/intl-list'
import initLocaleName from './components/intl-name'
import initLocalePlural from './components/intl-plural'
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
    const { intlDatetime } = initLocaleDatetime(BFS)
    const { intlDuration } = initLocaleDuration(BFS)
    const { intlMsg } = initLocaleMsg(BFS)
    const { intlRelativeTime } = initLocaleRelativeTime(BFS)
    const { intlList } = initLocaleList(BFS)
    const { intlName } = initLocaleName(BFS)
    const { intlPlural } = initLocalePlural(BFS)

    window.BFS = {
        ...window.BFS,
        INTL: {
            onLocaleMessagesLoaded,
            intlDatetime,
            intlDuration,
            intlMsg,
            intlRelativeTime,
            intlList,
            intlName,
            intlPlural,
        },
    }
}
