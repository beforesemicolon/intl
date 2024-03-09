import * as WC from '@beforesemicolon/web-component'
import initLocale from './components/intl-locale'
import initLocaleMsg from './components/intl-msg'

export const onLocaleMessagesLoaded = initLocale(WC)
export const intlMsg = initLocaleMsg(onLocaleMessagesLoaded, WC)
