import assert from 'node:assert/strict'
import { createIntl, setLocale } from '@beforesemicolon/intl/runtime'
import { intlMsg } from '@beforesemicolon/intl/formatters'

const dictionaries = {
    'en/common': { common: { cancel: 'Cancel' } },
    'pt/common': { common: { cancel: 'Cancelar' } },
    'en/orders': { orders: { heading: 'Orders' } },
    'pt/orders': { orders: { heading: 'Encomendas' } },
}
// Stand-in for fetch('/locales/' + key + '.json'), checked before parsing.
const requests = []
let finishEnglishOrders
const slowEnglishOrders = new Promise((resolve) => {
    finishEnglishOrders = resolve
})
async function readFile(key) {
    requests.push(key)
    if (!dictionaries[key]) throw new Error('Unknown locale file')
    if (key === 'en/orders') await slowEnglishOrders
    return dictionaries[key]
}

const scope = createIntl({
    locale: 'en',
    fallbackLocale: 'en',
    messages: dictionaries['en/common'],
})
const files = new Map()
let currentRequest = 0

function readOnce(locale, file) {
    const key = locale + '/' + file
    if (!files.has(key)) {
        files.set(
            key,
            readFile(key).catch((error) => {
                files.delete(key) // A later attempt can retry a failed read.
                throw error
            })
        )
    }
    return files.get(key)
}

async function showPage(locale, feature) {
    const request = ++currentRequest
    const [common, page] = await Promise.all([
        readOnce(locale, 'common'),
        readOnce(locale, feature),
    ])
    if (request !== currentRequest) return false

    // Each file owns a top-level namespace. Pass a complete active page map;
    // setMessages replaces that scope's stored dictionary for the locale.
    scope.setMessages({ ...common, ...page }, locale)
    await setLocale(locale, scope)
    return request === currentRequest
}

try {
    // Shared controls work before any feature dictionary has loaded.
    assert.equal(intlMsg('common.cancel', undefined, { scope }), 'Cancel')

    const oldView = showPage('en', 'orders')
    assert.equal(await showPage('pt', 'orders'), true)
    assert.equal(intlMsg('common.cancel', undefined, { scope }), 'Cancelar')
    assert.equal(intlMsg('orders.heading', undefined, { scope }), 'Encomendas')

    finishEnglishOrders()
    assert.equal(await oldView, false)
    assert.equal(scope.locale, 'pt')
    assert.equal(intlMsg('orders.heading', undefined, { scope }), 'Encomendas')

    assert.equal(await showPage('pt', 'orders'), true)
    assert.deepEqual(requests, [
        'en/common',
        'en/orders',
        'pt/common',
        'pt/orders',
    ])
    console.log(
        'Shared and route dictionaries, cache reuse, and stale navigation verified.'
    )
} finally {
    scope.destroy()
}
