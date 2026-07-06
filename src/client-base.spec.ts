import { initSingleIntlClient } from './client-base'
import * as WC from '@beforesemicolon/web-component'
import type { WebComponent } from '@beforesemicolon/web-component'

type ClientWindow = Window & {
    BFS?: {
        MARKUP: typeof import('@beforesemicolon/web-component')
        INTL: Record<string, unknown>
        WebComponent: typeof WebComponent
    }
}

describe('initSingleIntlClient', () => {
    beforeEach(() => {
        ;(
            window as unknown as {
                BFS?: ClientWindow['BFS']
            }
        ).BFS = undefined
        jest.clearAllMocks()
    })

    it('throws when required browser deps are missing', () => {
        expect(() =>
            initSingleIntlClient(
                () => {},
                {}
            )
        ).toThrow(
            'BFS.MARKUP and BFS.WebComponent are required in order for BFS.INTL to work.'
        )
    })

    it('stores API registrations and keeps component dependencies', () => {
        const mark = {
            MARKUP: {
                html: WC.html,
                HtmlTemplate: WC.HtmlTemplate,
            } as unknown as typeof import('@beforesemicolon/web-component'),
            WebComponent: WC.WebComponent,
            INTL: {},
        } as ClientWindow['BFS']
        window.BFS = mark

        initSingleIntlClient(() => {}, { test: () => 'ok' })

        expect(window.BFS?.INTL).toMatchObject({
            test: expect.any(Function),
        })
    })
})
