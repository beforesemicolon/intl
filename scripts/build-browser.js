import { buildBrowser } from '@beforesemicolon/builder'

const builds = [
    { entry: 'src/client.ts', out: 'dist/client.js' },
    { entry: 'clients/intl-locale.ts', out: 'dist/intl-locale.js' },
    { entry: 'clients/intl-msg.ts', out: 'dist/intl-msg.js' },
    { entry: 'clients/intl-number.ts', out: 'dist/intl-number.js' },
    { entry: 'clients/intl-datetime.ts', out: 'dist/intl-datetime.js' },
    { entry: 'clients/intl-duration.ts', out: 'dist/intl-duration.js' },
    { entry: 'clients/intl-rel-time.ts', out: 'dist/intl-rel-time.js' },
    { entry: 'clients/intl-list.ts', out: 'dist/intl-list.js' },
    { entry: 'clients/intl-name.ts', out: 'dist/intl-name.js' },
    { entry: 'clients/intl-plural.ts', out: 'dist/intl-plural.js' },
]

Promise.all(builds.map(({ entry, out }) => buildBrowser({ entry, out }))).catch(
    (error) => {
        console.error(error)
        process.exit(1)
    }
)
