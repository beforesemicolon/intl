import * as webComponent from '@beforesemicolon/web-component'
import registerLocale, { getIntlLocaleRuntime } from '@beforesemicolon/intl/components/intl-locale'
import registerMessage from '@beforesemicolon/intl/components/intl-msg'
import { setLocale } from '@beforesemicolon/intl/runtime'

registerLocale(webComponent)
registerMessage(webComponent)

const provider = document.querySelector('intl-locale')
const status = document.querySelector('#locale-status')
document.querySelector('#language').addEventListener('change', async (event) => {
    const runtime = getIntlLocaleRuntime(provider)
    if (!runtime) return
    const result = await setLocale(event.target.value, runtime)
    status.textContent = result.status === 'error' ? 'Could not load language.' : ''
})
