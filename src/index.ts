import * as WC from '@beforesemicolon/web-component'
import initLocale from './components/intl-locale'
import initLocaleMsg from './components/intl-msg'
import initLocaleDatetime from './components/intl-datetime'
import initLocaleDuration from './components/intl-duration'
import initLocaleRelativeTime from './components/intl-rel-time'
import initLocaleList from './components/intl-list'
import initLocaleName from './components/intl-name'
import initLocalePlural from './components/intl-plural'

export * from './runtime'
export * from './formatters'

export const onLocaleMessagesLoaded = initLocale(WC)
export const { intlMsg } = initLocaleMsg(WC)
export const { intlDuration } = initLocaleDuration(WC)
export const { intlDatetime } = initLocaleDatetime(WC)
export const { intlRelativeTime } = initLocaleRelativeTime(WC)
export const { intlList } = initLocaleList(WC)
export const { intlName } = initLocaleName(WC)
export const { intlPlural } = initLocalePlural(WC)
