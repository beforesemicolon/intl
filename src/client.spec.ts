import type { WebComponent } from '@beforesemicolon/web-component'
import * as WC from '@beforesemicolon/web-component'

type ClientWindow = Window & {
    BFS?: {
        MARKUP: typeof import('@beforesemicolon/web-component')
        INTL: Record<string, unknown>
        WebComponent: typeof WebComponent
    }
}

describe('browser client entrypoint', () => {
    let originalBfs: ClientWindow['BFS']

    beforeEach(() => {
        originalBfs = (window as unknown as ClientWindow).BFS
        ;(
            window as unknown as {
                BFS?: ClientWindow['BFS']
            }
        ).BFS = undefined
        jest.resetModules()
        jest.clearAllMocks()
    })

    afterEach(() => {
        ;(window as ClientWindow).BFS = originalBfs
    })

    it('throws when BFS dependencies are missing', async () => {
        const importClient = () => {
            return import('./client')
        }

        await expect(importClient()).rejects.toThrow(
            'BFS.MARKUP and BFS.WebComponent are required in order for BFS.INTL to work.'
        )
    })

    it('registers INTL helpers when BFS dependencies exist', async () => {
        const initLocale = jest.fn(() => 'on-locale-loaded')
        const initDatetime = jest.fn(() => ({ intlDatetime: 'datetime' }))
        const initDuration = jest.fn(() => ({ intlDuration: 'duration' }))
        const initMsg = jest.fn(() => ({ intlMsg: 'msg' }))
        const initRelative = jest.fn(() => ({ intlRelativeTime: 'relative' }))
        const initList = jest.fn(() => ({ intlList: 'list' }))
        const initName = jest.fn(() => ({ intlName: 'name' }))
        const initPlural = jest.fn(() => ({ intlPlural: 'plural' }))

        jest.doMock('./components/intl-locale', () => ({
            __esModule: true,
            default: initLocale,
        }))
        jest.doMock('./components/intl-datetime', () => ({
            __esModule: true,
            default: initDatetime,
        }))
        jest.doMock('./components/intl-duration', () => ({
            __esModule: true,
            default: initDuration,
        }))
        jest.doMock('./components/intl-msg', () => ({
            __esModule: true,
            default: initMsg,
        }))
        jest.doMock('./components/intl-rel-time', () => ({
            __esModule: true,
            default: initRelative,
        }))
        jest.doMock('./components/intl-list', () => ({
            __esModule: true,
            default: initList,
        }))
        jest.doMock('./components/intl-name', () => ({
            __esModule: true,
            default: initName,
        }))
        jest.doMock('./components/intl-plural', () => ({
            __esModule: true,
            default: initPlural,
        }))

        const bfsMarkup = {
            html: WC.html,
            HtmlTemplate: WC.HtmlTemplate,
        } as unknown as typeof import('@beforesemicolon/web-component')
        const mark = {
            MARKUP: bfsMarkup,
            WebComponent: WC.WebComponent,
            INTL: {} as Record<string, unknown>,
        } as ClientWindow['BFS']
        window.BFS = {
            ...mark,
            MARKUP: bfsMarkup,
        }

        await import('./client')

        expect(initLocale).toHaveBeenCalledWith(
            expect.objectContaining({
                ...mark,
                WebComponent: expect.any(Function),
                html: expect.any(Function),
                INTL: {},
            })
        )
        expect(initDatetime).toHaveBeenCalled()
        expect(initDuration).toHaveBeenCalled()
        expect(initMsg).toHaveBeenCalled()
        expect(initRelative).toHaveBeenCalled()
        expect(initList).toHaveBeenCalled()
        expect(initName).toHaveBeenCalled()
        expect(initPlural).toHaveBeenCalled()

        expect(window.BFS.INTL).toEqual(
            expect.objectContaining({
                onLocaleMessagesLoaded: 'on-locale-loaded',
                intlDatetime: 'datetime',
                intlDuration: 'duration',
                intlMsg: 'msg',
                intlRelativeTime: 'relative',
                intlList: 'list',
                intlName: 'name',
                intlPlural: 'plural',
            })
        )
    })
})
