import { buildBrowser, buildModules } from '@beforesemicolon/builder'

const browserBuilds = [
    { entry: 'src/client.ts', out: 'dist/client.js' },
    { entry: 'src/clients/intl-locale.ts', out: 'dist/intl-locale.js' },
    { entry: 'src/clients/intl-msg.ts', out: 'dist/intl-msg.js' },
    { entry: 'src/clients/intl-number.ts', out: 'dist/intl-number.js' },
    { entry: 'src/clients/intl-datetime.ts', out: 'dist/intl-datetime.js' },
    { entry: 'src/clients/intl-duration.ts', out: 'dist/intl-duration.js' },
    { entry: 'src/clients/intl-rel-time.ts', out: 'dist/intl-rel-time.js' },
    { entry: 'src/clients/intl-list.ts', out: 'dist/intl-list.js' },
    { entry: 'src/clients/intl-name.ts', out: 'dist/intl-name.js' },
    { entry: 'src/clients/intl-plural.ts', out: 'dist/intl-plural.js' },
]

await Promise.all([
    buildModules({
        esbuildOptions: {
            keepNames: false,
        },
    }),
    ...browserBuilds.map(({ entry, out }) =>
        buildBrowser({
            entry,
            out,
            esbuildOptions: {
                keepNames: false,
                sourcemap: false,
            },
        })
    ),
])
