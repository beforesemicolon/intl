import { createIntl, setLocale } from '@beforesemicolon/intl/runtime'
import { intlMsg } from '@beforesemicolon/intl/formatters'

const messages = {
    en: { item: { label: 'Book' } },
    pt: { item: { title: 'Livro' } },
}
const scope = createIntl({
    locale: 'en',
    fallbackLocale: 'en',
    loader: (locale) => messages[locale] ?? {},
})
try {
    await setLocale('pt', scope)
    console.log(intlMsg('item.title', undefined, { scope }))
    console.log(intlMsg('item.label', undefined, { scope }))
} finally {
    scope.destroy()
}
