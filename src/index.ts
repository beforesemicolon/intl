import * as WC from '@beforesemicolon/web-component'
import initLocale from './components/intl-locale'
import initLocaleMsg from './components/intl-msg'
import initLocaleDatetime from './components/intl-datetime'

export const onLocaleMessagesLoaded = initLocale(WC)
export const intlMsg = initLocaleMsg(onLocaleMessagesLoaded, WC)
export const intlDatetime = initLocaleDatetime(WC)
