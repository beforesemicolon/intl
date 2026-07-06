import * as runtimeApis from './runtime'
import * as formatterApis from './formatters'
import initIntlLocale from './components/intl-locale'
import initIntlMsg from './components/intl-msg'
import initIntlNumber from './components/intl-number'
import initIntlDateTime from './components/intl-datetime'
import initIntlDuration from './components/intl-duration'
import initIntlRelTime from './components/intl-rel-time'
import initIntlList from './components/intl-list'
import initIntlName from './components/intl-name'
import initIntlPlural from './components/intl-plural'
import type { WebComponent } from '@beforesemicolon/web-component'
import { initSingleIntlClient } from './client-base'

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
    initSingleIntlClient(initIntlLocale, runtimeApis)
    initSingleIntlClient(initIntlMsg, {
        intlMsg: formatterApis.intlMsg,
    })
    initSingleIntlClient(initIntlNumber, {
        intlNumber: formatterApis.intlNumber,
    })
    initSingleIntlClient(initIntlDateTime, {
        intlDateTime: formatterApis.intlDateTime,
    })
    initSingleIntlClient(initIntlDuration, {
        intlDuration: formatterApis.intlDuration,
    })
    initSingleIntlClient(initIntlRelTime, {
        intlRelTime: formatterApis.intlRelTime,
    })
    initSingleIntlClient(initIntlList, {
        intlList: formatterApis.intlList,
    })
    initSingleIntlClient(initIntlName, {
        intlName: formatterApis.intlName,
    })
    initSingleIntlClient(initIntlPlural, {
        intlPlural: formatterApis.intlPlural,
    })
}
