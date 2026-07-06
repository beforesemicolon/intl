import { intlList } from '../src/formatters'
import initIntlList from '../src/components/intl-list'
import { initSingleIntlClient } from '../src/client-base'

initSingleIntlClient(initIntlList, {
    intlList,
})
