import * as WB from '@beforesemicolon/web-component'
import initIntlDateTime from './components/intl-datetime'
import initIntlDuration from './components/intl-duration'
import initIntlList from './components/intl-list'
import initIntlLocale from './components/intl-locale'
import initIntlMsg from './components/intl-msg'
import initIntlName from './components/intl-name'
import initIntlNumber from './components/intl-number'
import initIntlPlural from './components/intl-plural'
import initIntlRelTime from './components/intl-rel-time'

initIntlLocale(WB)
initIntlMsg(WB)
initIntlNumber(WB)
initIntlDateTime(WB)
initIntlDuration(WB)
initIntlRelTime(WB)
initIntlList(WB)
initIntlName(WB)
initIntlPlural(WB)

export * from './components/intl-locale'
export * from './components/intl-msg'
export * from './components/intl-number'
export * from './components/intl-datetime'
export * from './components/intl-duration'
export * from './components/intl-rel-time'
export * from './components/intl-list'
export * from './components/intl-name'
export * from './components/intl-plural'
export * from './runtime'
export * from './formatters'
