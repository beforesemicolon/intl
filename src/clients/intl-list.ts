import { intlList } from '../formatters'
import initIntlList from '../components/intl-list'
import { initSingleIntlClient } from '../client-base'

initSingleIntlClient(initIntlList, {
    intlList,
})
