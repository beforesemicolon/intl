import * as WC from '@beforesemicolon/web-component'
import initLocale from './components/intl-locale'
import initLocaleMsg from './components/intl-msg'
import initLocaleDatetime from './components/intl-datetime'
import initLocaleDuration from './components/intl-duration'
import initLocaleRelativeTime from './components/intl-rel-time'

export * from './runtime'
export * from './formatters'

export const onLocaleMessagesLoaded = initLocale(WC)
export const { intlMsg } = initLocaleMsg(WC)
export const { intlDuration } = initLocaleDuration(onLocaleMessagesLoaded, WC)
export const { intlDatetime } = initLocaleDatetime(WC)
export const { intlRelativeTime } = initLocaleRelativeTime(WC)
